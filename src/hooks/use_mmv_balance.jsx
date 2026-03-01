import { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatEther } from "ethers";
import { PRESALE_CONTRACT_ADDRESS } from "../config/contract_helpers";
import { PRESALE_CONTRACT_ABI } from "../config/abi_configs/presale_contracts_abi";

export const useMMVBalance = (walletProvider, chainId, address) => {
    const [mmvBalance, setMMVBalance] = useState(0);
    const [baseTokens, setBaseTokens] = useState(0);
    const [bonusTokens, setBonusTokens] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchBalance = async () => {
            if (!walletProvider || !chainId || !address) {
                setMMVBalance(0);
                setBaseTokens(0);
                setBonusTokens(0);
                return;
            }

            setLoading(true);
            try {
                const provider = new BrowserProvider(walletProvider, chainId);
                const contract = new Contract(
                    PRESALE_CONTRACT_ADDRESS,
                    PRESALE_CONTRACT_ABI,
                    provider
                );

                const userInfo = await contract.users(address);
                
                if (!isMounted) return;

                const base = Number(formatEther(userInfo.baseTokens));
                const bonus = Number(formatEther(userInfo.bonusTokens));
                const total = base + bonus;

                setBaseTokens(base);
                setBonusTokens(bonus);
                setMMVBalance(base);
                setError(null);
            } catch (err) {
                console.error("MMV balance fetch error:", err);
                if (isMounted) {
                    setError(err.message);
                    setMMVBalance(0);
                    setBaseTokens(0);
                    setBonusTokens(0);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchBalance();
        return () => {
            isMounted = false;
        };
    }, [walletProvider, chainId, address]);

    return { mmvBalance, baseTokens, bonusTokens, loading, error };
};