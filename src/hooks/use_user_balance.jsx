import { useCallback, useEffect, useState } from "react";
import { BrowserProvider, Contract, formatEther, formatUnits } from "ethers";
import { useAppKitAccount } from "@reown/appkit/react";
import { USDT_ABI } from "../config/abi_configs/usdt_contracts_abi";
import { USDTAddress } from "../config/contract_helpers";
import { useAppKitSafe } from "./use_appkit_safe";

export const useUserBalance = () => {
    const { walletProvider, chainId } = useAppKitSafe();
    const { status, address } = useAppKitAccount();
    const [ethBalance, setEthBalance] = useState("0");
    const [usdtBalance, setUsdtBalance] = useState("0");

    const updateBalance = useCallback(async () => {
        if (status !== "connected" || !walletProvider || !address || !chainId) return;

        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            // diagnoseReferralSystem(provider);
            // fetch eth Balance
            const rawEth = await provider.getBalance(address);
            const eth = formatEther(rawEth);
            setEthBalance(eth);

            // fetch usdt balance
            const usdtContract = new Contract(USDTAddress, USDT_ABI, provider);
            const rawUsdt = await usdtContract.balanceOf(address);
            const usdt = formatUnits(rawUsdt, 6);
            setUsdtBalance(usdt);

        } catch (err) {
            console.error("Failed to fetch balances:", err);
            setEthBalance("0");
            setUsdtBalance("0");
        }
    }, [status, walletProvider, address, chainId]);

    // auto-refresh when wallet or chain changes
    useEffect(() => {
        if (status === "connected") {
            updateBalance();
        } else if (status === "disconnected") {
            setEthBalance("0");
            setUsdtBalance("0");
        }
    }, [status, updateBalance]);

    return { ethBalance, usdtBalance, updateBalance };
};