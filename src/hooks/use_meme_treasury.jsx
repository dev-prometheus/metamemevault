import { Contract, formatUnits, BrowserProvider } from "ethers";
import { useState } from "react";
import { MEME_TREASURY_ADDRESS, PRESALE_CONTRACT_ADDRESS } from "../config/contract_helpers";
import { TREASURY_CONTRACT_ABI } from "../config/abi_configs/treasury_contracts_abi";
import { PRESALE_CONTRACT_ABI } from "../config/abi_configs/presale_contracts_abi";
 
export const useMemeTreasury = (walletProvider, chainId, walletAddress) => {
    const [mmvBalance, setMMVBalance] = useState(0);
    const [mmvLocked, setMMVLocked] = useState(0);

    const refreshTreasuryStats = async () => {
        if (!walletAddress || !walletProvider || !chainId) return; 
        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            const memeTreasury = new Contract(MEME_TREASURY_ADDRESS, TREASURY_CONTRACT_ABI, provider);
            const presale = new Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_CONTRACT_ABI, provider);

            const totalLocked = await memeTreasury.getTotalLockedMMV(walletAddress);
            const userInfo = await presale.users(walletAddress);

            const locked = Number(formatUnits(totalLocked, 18));
            const purchased = Number(formatUnits(userInfo.baseTokens, 18));

            setMMVLocked(locked);
            setMMVBalance(purchased - locked);
        } catch (err) {
            console.error("Failed to fetch treasury stats:", err);
        }
    };

    return { mmvBalance, mmvLocked, refreshTreasuryStats };
};