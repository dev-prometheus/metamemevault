// Complete Referral System Diagnostic & Fix Tool
// This will help identify and fix why referrals aren't being registered

import { BrowserProvider, Contract, formatEther } from "ethers";
import { PRESALE_CONTRACT_ABI } from "../config/abi_configs/presale_contracts_abi";
import { PRESALE_CONTRACT_ADDRESS, REFERRAL_REWARDS_ADDRESS } from "../config/contract_helpers";
import { PRESALE_REFERRALS_ABI } from "../config/abi_configs/presale_referrals_abi";

class ReferralDiagnostic {
    constructor(presaleAddress, referralAddress, provider) {
        this.presaleAddress = presaleAddress;
        this.referralAddress = referralAddress;
        this.provider = provider;
    }

    async runFullDiagnostic() {
        console.log("🔍 REFERRAL SYSTEM DIAGNOSTIC");
        console.log("=" . repeat(50));
        
        const issues = [];
        const fixes = [];

        try {
            // 1. Check Contract Addresses
            console.log("\n1️⃣ Checking Contract Configuration...");
            const configOk = await this.checkContractConfig();
            if (!configOk.success) {
                issues.push(configOk.issue);
                fixes.push(configOk.fix);
            }

            // 2. Check Token Setup
            console.log("\n2️⃣ Checking Token Setup...");
            const tokenOk = await this.checkTokenSetup();
            if (!tokenOk.success) {
                issues.push(tokenOk.issue);
                fixes.push(tokenOk.fix);
            }

            // 3. Check Gas Limit
            console.log("\n3️⃣ Checking Gas Configuration...");
            const gasOk = await this.checkGasLimit();
            if (!gasOk.success) {
                issues.push(gasOk.issue);
                fixes.push(gasOk.fix);
            }

            // 4. Check Claim Configuration
            console.log("\n4️⃣ Checking Claim Settings...");
            const claimOk = await this.checkClaimSettings();
            if (!claimOk.success) {
                issues.push(claimOk.issue);
                fixes.push(claimOk.fix);
            }

            // 5. Test Referral Registration
            console.log("\n5️⃣ Testing Referral Registration...");
            const regOk = await this.testReferralRegistration();
            if (!regOk.success) {
                issues.push(regOk.issue);
                fixes.push(regOk.fix);
            }

            // Summary
            console.log("\n" + "=" . repeat(50));
            console.log("📊 DIAGNOSTIC SUMMARY");
            console.log("=" . repeat(50));

            if (issues.length === 0) {
                console.log("✅ All systems operational!");
                console.log("Referral system should be working correctly.");
            } else {
                console.log(`❌ Found ${issues.length} issue(s):\n`);
                issues.forEach((issue, i) => {
                    console.log(`Issue ${i + 1}: ${issue}`);
                });
                
                console.log("\n🔧 REQUIRED FIXES:");
                fixes.forEach((fix, i) => {
                    console.log(`\nFix ${i + 1}:`);
                    console.log(fix);
                });
            }

            return { issues, fixes };
        } catch (error) {
            console.error("❌ Diagnostic failed:", error);
            return { 
                issues: ["Diagnostic tool failed to run"], 
                fixes: ["Check contract addresses and network connection"] 
            };
        }
    }

    async checkContractConfig() {
        const presaleContract = new Contract(
            this.presaleAddress,
            PRESALE_CONTRACT_ABI,
            this.provider
        );
        const referralContract = new Contract(
            this.referralAddress,
            PRESALE_REFERRALS_ABI,
            this.provider
        );

        // Check if presale has correct referral address
        const presaleReferralAddr = await presaleContract.referralRewards();
        console.log(`  Presale -> Referral: ${presaleReferralAddr}`);
        
        // Check if referral has correct presale address
        const referralPresaleAddr = await referralContract.presaleContract();
        console.log(`  Referral -> Presale: ${referralPresaleAddr}`);
        
        // Check if locked
        const isLocked = await referralContract.presaleContractLocked();
        console.log(`  Presale Contract Locked: ${isLocked}`);

        if (presaleReferralAddr.toLowerCase() !== this.referralAddress.toLowerCase()) {
            return {
                success: false,
                issue: "Presale contract has wrong referral address",
                fix: `Presale contract needs to be redeployed with correct referral address: ${this.referralAddress}`
            };
        }

        if (referralPresaleAddr.toLowerCase() !== this.presaleAddress.toLowerCase()) {
            return {
                success: false,
                issue: "Referral contract doesn't have presale contract set",
                fix: `As owner, call: referralContract.setPresaleContract("${this.presaleAddress}")`
            };
        }

        console.log("  ✅ Contract configuration correct");
        return { success: true };
    }

    async checkTokenSetup() {
        const referralContract = new Contract(
            this.referralAddress,
            PRESALE_REFERRALS_ABI,
            this.provider
        );

        const tokenSet = await referralContract.tokenSet();
        console.log(`  Token Set: ${tokenSet}`);

        if (!tokenSet) {
            const presaleContract = new Contract(
                this.presaleAddress,
                PRESALE_CONTRACT_ABI,
                this.provider
            );
            const mmvToken = await presaleContract.mmvToken();
            
            return {
                success: false,
                issue: "MMV token not set in referral contract",
                fix: `As owner, call: referralContract.setToken("${mmvToken}")`
            };
        }

        const mmvToken = await referralContract.mmvToken();
        console.log(`  MMV Token: ${mmvToken}`);
        console.log("  ✅ Token setup correct");
        return { success: true };
    }

    async checkGasLimit() {
        const presaleContract = new Contract(
            this.presaleAddress,
            PRESALE_CONTRACT_ABI,
            this.provider
        );

        const gasLimit = await presaleContract.referralGasLimit();
        console.log(`  Current Gas Limit: ${gasLimit}`);

        if (gasLimit < 200000n) {
            return {
                success: false,
                issue: `Gas limit too low: ${gasLimit}`,
                fix: `As owner, call: presaleContract.setReferralGasLimit(250000)`
            };
        }

        console.log("  ✅ Gas limit sufficient");
        return { success: true };
    }

    async checkClaimSettings() {
        const referralContract = new Contract(
            this.referralAddress,
            PRESALE_REFERRALS_ABI,
            this.provider
        );

        const [claimEnabled, claimTime, canClaim] = await Promise.all([
            referralContract.claimingEnabled(),
            referralContract.claimStartTime(),
            referralContract.canClaim()
        ]);

        console.log(`  Claiming Enabled: ${claimEnabled}`);
        console.log(`  Claim Start Time: ${new Date(Number(claimTime) * 1000).toLocaleString()}`);
        console.log(`  Can Claim Now: ${canClaim}`);

        // Check presale claiming too
        const presaleContract = new Contract(
            this.presaleAddress,
            PRESALE_CONTRACT_ABI,
            this.provider
        );

        const [presaleClaimEnabled, baseClaimTime, bonusClaimTime] = await Promise.all([
            presaleContract.claimingEnabled(),
            presaleContract.claimStartTime(),
            presaleContract.bonusUnlockTime()
        ]);

        console.log(`  Presale Claiming Enabled: ${presaleClaimEnabled}`);
        console.log(`  Base Claim Time: ${new Date(Number(baseClaimTime) * 1000).toLocaleString()}`);
        console.log(`  Bonus Claim Time: ${new Date(Number(bonusClaimTime) * 1000).toLocaleString()}`);

        console.log("  ✅ Claim settings checked");
        return { success: true };
    }

    async testReferralRegistration() {
        const referralContract = new Contract(
            this.referralAddress,
            PRESALE_REFERRALS_ABI,
            this.provider
        );

        try {
            // Simulate a referral registration from presale contract
            const testBuyer = "0x1234567890123456789012345678901234567890";
            const testReferrer = "0x0987654321098765432109876543210987654321";
            const testAmount = "1000000000000000000"; // 1 token

            // This will revert but tell us why
            await referralContract.registerReferral.staticCall(
                testBuyer,
                testReferrer,
                testAmount,
                { from: this.presaleAddress }
            );

            console.log("  ✅ Referral registration would succeed");
            return { success: true };
        } catch (error) {
            const errorMsg = error.message;
            let issue = "Unknown referral registration error";
            let fix = "Check contract logs for details";

            if (errorMsg.includes("OnlyPresaleContract")) {
                issue = "Presale contract not authorized to register referrals";
                fix = "Ensure presaleContract is set correctly in referral contract";
            } else if (errorMsg.includes("PresaleContractNotSet")) {
                issue = "Presale contract address not set";
                fix = `Call: referralContract.setPresaleContract("${this.presaleAddress}")`;
            } else if (errorMsg.includes("TokenNotSet")) {
                issue = "Token not set in referral contract";
                fix = "Set MMV token address in referral contract";
            } else if (errorMsg.includes("InsufficientAllocation")) {
                issue = "Referral allocation exhausted";
                fix = "No more referral rewards available";
            }

            console.log(`  ❌ Registration test failed: ${issue}`);
            return { success: false, issue, fix };
        }
    }

    // Check specific transaction
    async checkTransaction(txHash) {
        console.log(`\n🔍 Checking transaction: ${txHash}`);
        
        try {
            const tx = await this.provider.getTransaction(txHash);
            const receipt = await this.provider.getTransactionReceipt(txHash);
            
            console.log("Transaction Details:");
            console.log(`  From: ${tx.from}`);
            console.log(`  To: ${tx.to}`);
            console.log(`  Status: ${receipt.status === 1 ? "Success" : "Failed"}`);
            console.log(`  Gas Used: ${receipt.gasUsed}`);
            
            // Decode logs to find referral events
            const referralContract = new Contract(
                this.referralAddress,
                PRESALE_REFERRALS_ABI,
                this.provider
            );
            
            const referralEvents = receipt.logs
                .filter(log => log.address.toLowerCase() === this.referralAddress.toLowerCase())
                .map(log => {
                    try {
                        return referralContract.interface.parseLog(log);
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean);

            if (referralEvents.length > 0) {
                console.log("\n✅ Referral Events Found:");
                referralEvents.forEach(event => {
                    console.log(`  Event: ${event.name}`);
                    console.log(`  Data:`, event.args);
                });
            } else {
                console.log("\n❌ No referral events found in this transaction");
                console.log("This means the referral registration failed silently!");
            }
            
            return receipt;
        } catch (error) {
            console.error("Failed to check transaction:", error);
            return null;
        }
    }
}

// Usage Example
async function diagnoseReferralSystem(provider) {
    const diagnostic = new ReferralDiagnostic(
        PRESALE_CONTRACT_ADDRESS,
        REFERRAL_REWARDS_ADDRESS,
        provider
    );
    
    // Run full diagnostic
    const result = await diagnostic.runFullDiagnostic();
    
    // Check a specific transaction if you have one
    // await diagnostic.checkTransaction("0xYOUR_TX_HASH");
    
    return result;
}

export { ReferralDiagnostic, diagnoseReferralSystem };