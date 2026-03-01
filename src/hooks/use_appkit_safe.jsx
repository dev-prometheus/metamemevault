import { useAppKitProvider, useAppKitNetworkCore } from "@reown/appkit/react";

export const useAppKitSafe = () => {
    let walletProvider = null;
    let chainId = null;

    try {
        const providerData = useAppKitProvider("eip155");
        if (providerData && typeof providerData === 'object' && !Array.isArray(providerData)) {
            walletProvider = providerData.walletProvider || null;
        }
    } catch (e) { 
        // Silent fail - AppKit not ready yet
    }

    try {
        const networkData = useAppKitNetworkCore();
        if (networkData && typeof networkData === 'object' && !Array.isArray(networkData)) {
            chainId = networkData.chainId || null;
        }
    } catch (e) {
        // Silent fail - AppKit not ready yet
    }

    return { walletProvider, chainId };
};