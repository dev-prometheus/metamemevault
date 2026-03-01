// hooks/use_purchase_capacity.js
import { useState, useEffect } from 'react';
import { BrowserProvider, Contract, formatEther } from 'ethers';
import { PRESALE_CONTRACT_ABI } from '../config/abi_configs/presale_contracts_abi';
import { PRESALE_CONTRACT_ADDRESS } from '../config/contract_helpers';

export const usePurchaseCapacity = (walletProvider, chainId, address, isConnected, userPurchased, stagePrice, bonusPercent) => {
    const [capacity, setCapacity] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkCapacity = async () => {
        if (!walletProvider || !address || !isConnected) {
            setCapacity(null);
            return null;
        }

        setLoading(true);
        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            const contract = new Contract(
                PRESALE_CONTRACT_ADDRESS,
                PRESALE_CONTRACT_ABI,
                provider
            );

            // Get user's current holdings
            const userInfo = await contract.users(address);
            const currentBase = BigInt(userInfo.baseTokens);
            const currentBonus = BigInt(userInfo.bonusTokens);
            const currentTotal = currentBase + currentBonus;

            // Get max limit
            const maxLimit = await contract.maxTokensPerBuyer();

            // Calculate remaining capacity
            const remainingCapacity = maxLimit > currentBase ? maxLimit - currentBase : 0n;
            // Solve for baseTokens: baseTokens = remainingCapacity / (1 + bonusPercent/100)
            const maxBasePurchasable = remainingCapacity;

            const data = {
                currentBase: Number(formatEther(currentBase)),
                currentBonus: Number(formatEther(currentBonus)),
                currentTotal: Number(formatEther(currentTotal)),
                maxLimit: Number(formatEther(maxLimit)),
                remainingCapacity: Number(formatEther(remainingCapacity)),
                maxBasePurchasable: Number(formatEther(maxBasePurchasable)),
                percentUsed: Number(maxLimit) > 0 ?
                    (Number(currentBase) / Number(maxLimit) * 100) : 0,
                canPurchase: remainingCapacity > 0n,
                isNearLimit: Number(currentBase) / Number(maxLimit) > 0.8,
                isAtLimit: remainingCapacity === 0n
            };

            // Calculate max USD value user can purchase
            if (stagePrice && data.maxBasePurchasable > 0) {
                data.maxPurchaseUSD = data.maxBasePurchasable * parseFloat(stagePrice);
            }

            setCapacity(data);
            return data;
        } catch (error) {
            console.error("Error checking capacity:", error);
            setCapacity(null);
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected && address) {
            checkCapacity();
        } else {
            setCapacity(null);
        }
    }, [isConnected, address, userPurchased, walletProvider, chainId, stagePrice, bonusPercent]);

    return { capacity, loading, refreshCapacity: checkCapacity };
};