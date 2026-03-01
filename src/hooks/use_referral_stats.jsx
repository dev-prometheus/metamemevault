import { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatEther } from "ethers";
import { toast } from "react-hot-toast";
import { REFERRAL_REWARDS_ADDRESS } from "../config/contract_helpers";
import { PRESALE_REFERRALS_ABI } from "../config/abi_configs/presale_referrals_abi";

export const useReferralStats = (walletProvider, chainId, address) => {
    const [referralInfo, setReferralInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchStats = async () => {
            if (!walletProvider || !chainId || !address) return;

            setLoading(true);
            try {
                const provider = new BrowserProvider(walletProvider, chainId);
                const contract = new Contract(REFERRAL_REWARDS_ADDRESS, PRESALE_REFERRALS_ABI, provider);

                // Call getReferralData which returns all the info we need
                const referralData = await contract.getReferralData(address);

                // Also get the claiming status
                const [claimingEnabled, canClaimNow] = await Promise.all([
                    contract.claimingEnabled(),
                    contract.canClaim()
                ]);

                if (!isMounted) return;

                const [totalRewards, referralVolume, totalReferrals, claimableRewards] = referralData;

                setReferralInfo({
                    // Number of unique referrals (people who used this address as referrer)
                    active_referrals: totalReferrals.toString(),
                    // Total MMV purchased by referrals (referralVolume)
                    mmv_ref_purchased: Number(formatEther(referralVolume)).toFixed(2),
                    mmv_earned: Number(formatEther(totalRewards)).toFixed(2),
                    claimable_rewards: Number(formatEther(claimableRewards)).toFixed(2),
                    // Claim status
                    claim_status: canClaimNow ? "ready" : (claimingEnabled ? "enabled" : "pending"),
                    // Raw values if needed
                    raw: {
                        totalRewards: totalRewards.toString(),
                        referralVolume: referralVolume.toString(),
                        totalReferrals: totalReferrals.toString(),
                        claimableRewards: claimableRewards.toString()
                    }
                });
                setError(null);
            } catch (err) {
                console.error("Referral stats error:", err);

                // More specific error messages
                if (err.message?.includes("network")) {
                    toast.error("Network error. Please check your connection.");
                } else if (err.message?.includes("user rejected")) {
                    toast.error("Transaction cancelled.");
                } else {
                    toast.error("Failed to load referral stats.");
                }

                if (isMounted) {
                    setError(err.message);
                    // Set default values on error
                    setReferralInfo({
                        active_referrals: "10",
                        mmv_ref_purchased: "0.00",
                        mmv_earned: "0.00",
                        claimable_rewards: "0.00",
                        claim_status: "pending"
                    });
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchStats();
        return () => {
            isMounted = false;
        };
    }, [walletProvider, chainId, address]);

    return { referralInfo, loading, error }
};