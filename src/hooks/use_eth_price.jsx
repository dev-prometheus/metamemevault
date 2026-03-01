import { BrowserProvider, Contract, JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";
import { PRESALE_CONTRACT_ADDRESS, PUBLIC_RPC_URL } from "../config/contract_helpers";
import { PRESALE_CONTRACT_ABI } from "../config/abi_configs/presale_contracts_abi";
import toast from "react-hot-toast";

const CACHE_KEY = "cached_eth_price";
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const useEthPrices = (walletProvider, chainId, isConnected) => {
    const [ethPrice, setEthPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchEthPrice = async () => {
        setLoading(true);
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { value, timestamp } = JSON.parse(cached);
                const now = Date.now();
                if (now - timestamp < CACHE_DURATION) {
                    setEthPrice(value);
                    setLoading(false);
                    return;
                }
            }

            let provider;

            if (walletProvider && isConnected) {
                provider = new BrowserProvider(walletProvider, chainId);
            } else {
                provider = new JsonRpcProvider(PUBLIC_RPC_URL);
            }

            const contract = new Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_CONTRACT_ABI, provider);
            const onChainPrice = await contract.lastKnownETHPrice();
            const formatted = Number(onChainPrice) / 1e8; // Contract stores price with 8 decimals

            if (!formatted || isNaN(formatted) || formatted < 1000) {
                throw new Error("Contract price invalid or too low");
            }

            setEthPrice(formatted);
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                value: formatted,
                timestamp: Date.now()
            }));

        } catch (onChainError) {
            console.warn("Contract fetch failed:", onChainError.message);

            //fallback to coingecko 
            try {
                const res = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
                    {
                        headers: {
                            'Accept': 'application/json',
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const json = await res.json();
                const apiPrice = json?.ethereum?.usd;

                if (!apiPrice || isNaN(apiPrice) || apiPrice < 1000) {
                    throw new Error("Invalid API response");
                }

                setEthPrice(apiPrice);
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    value: apiPrice,
                    timestamp: Date.now()
                }));
            } catch (apiErr) {
                console.error("CoinGecko API failed:", apiErr.message);
                // Final fallback - use a reasonable default
                const fallbackPrice = 4500; // Conservative ETH price
                setEthPrice(fallbackPrice);
                console.warn("Using fallback ETH price:", fallbackPrice);
                // Show toast only if both contract and API failed
                toast.error("Unable to fetch live ETH price. Using estimated price.");
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchEthPrice();
        // auto refresh every 5 minutes
        const interval = setInterval(() => {
            fetchEthPrice();
        }, 20 * 60 * 1000);

        return () => clearInterval(interval);
    }, [walletProvider, isConnected, chainId]);

    return { ethPrice, loading, refresh: fetchEthPrice };
};