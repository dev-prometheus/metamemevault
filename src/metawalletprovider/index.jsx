import { createAppKit, useAppKit, useAppKitAccount, useAppKitNetworkCore } from "@reown/appkit/react";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { ethersAdapter, getReferralUid, metadata, networks, projectId } from "../config";
import axios from "axios";
import toast from "react-hot-toast";

// 🔧 AppKit init 
createAppKit({
    adapters: [ethersAdapter],
    networks: networks,
    metadata: metadata,
    projectId: projectId,
    features: {
        analytics: true,
        onramp: true,
        connectMethodsOrder: ["wallet"],
        swaps: false,
        send: false,
        history: false,
        email: false,
        socials: false,

    },
    themeMode: "dark",
    themeVariables: {
        "--w3m-z-index": "1030",
    },

});

const WalletContext = createContext({
    address: null,
    isConnected: false,
    connectionStatus: "disconnected",
    open: async () => { },
    referralUid: "",
    referralLoading: false,
});

export const useWallet = () => useContext(WalletContext);

export const MetaWalletProvider = ({ children }) => {
    const [referralUid, setReferralUid] = useState("");
    const [referralLoading, setReferralLoading] = useState(false);
    const [localConnectionStatus, setLocalConnectionStatus] = useState("disconnected");

    // Track if this is initial page load vs user action
    const isInitialLoadRef = useRef(true);
    const hasShownNetworkToastRef = useRef(false);

    const { open } = useAppKit();
    const { chainId } = useAppKitNetworkCore();
    const { address, isConnected, status } = useAppKitAccount();

    // CAPTURE REFERRAL CODE ON MOUNT (before wallet connection)
    useEffect(() => {
        const captureReferralFromURL = () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const refFromURL = urlParams.get("ref");

                if (refFromURL && refFromURL.trim().length > 0) {
                    localStorage.setItem("referralCode", refFromURL.trim());

                    // Clean URL to remove ref parameter (optional)
                    const newURL = new URL(window.location);
                    newURL.searchParams.delete("ref");
                    window.history.replaceState({}, '', newURL.toString());
                }
            } catch (error) {
                console.error("Error capturing referral code:", error);
            }
        };

        captureReferralFromURL();

        // Mark initial load as complete after 2 seconds
        const timer = setTimeout(() => {
            isInitialLoadRef.current = false;
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (status === "connected" && isConnected) {
                setLocalConnectionStatus("connected");
            } else if (status === "connecting") {
                setLocalConnectionStatus("connecting");
            } else {
                setLocalConnectionStatus("disconnected");
            }
        }, 100)

        if (status === "disconnected") {
            localStorage.removeItem("hasConnectedBefore");
            hasShownNetworkToastRef.current = false;
        }

        return () => clearTimeout(timeoutId);
    }, [status, isConnected]);

    useEffect(() => {
        if (localConnectionStatus === "connecting") {
            const timeout = setTimeout(() => {
                if (localConnectionStatus === "connecting") {
                    console.warn("Connection timeout - resetting state");
                    setLocalConnectionStatus("disconnected");
                }
            }, 15000); // 15 second timeout

            return () => clearTimeout(timeout);
        }
    }, [localConnectionStatus]);

    useEffect(() => {
        if (status === "connected" && isConnected && address) {
            const hasConnectedBefore = localStorage.getItem("hasConnectedBefore");

            if (!hasConnectedBefore) {
                processReferral(address);
                localStorage.setItem("hasConnectedBefore", "true");
            }

            const storedReferralUid = getReferralUid();
            if (storedReferralUid) {
                setReferralUid(storedReferralUid);
            } else if (!hasConnectedBefore && address) {
                const existingUid = localStorage.getItem("referralUid");
                if (existingUid) {
                    setReferralUid(existingUid);
                }
            }
        }
    }, [status, address, isConnected]);

    useEffect(() => {
        const requiredChainId = 1; // mainent: "1" "0x1"
        if (status === "connected" && Number(chainId) && Number(chainId) !== requiredChainId) {
            if (isInitialLoadRef.current) {
                return;
            }

            if (hasShownNetworkToastRef.current) {
                return;
            }
            hasShownNetworkToastRef.current = true;
            toast.error("Please switch to Ethereum Mainnet", {
                duration: 5000,
                icon: "⚠️"
            });
        } else if (Number(chainId) === requiredChainId) {
            // Reset flag when on correct network
            hasShownNetworkToastRef.current = false;
        }
    }, [status, chainId]);

    const processReferral = async (userAddress) => {
        setReferralLoading(true);
        try {
            const refCode = localStorage.getItem("referralCode");
            if (!userAddress) return;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const { data } = await axios.post('/api/register', {
                walletAddress: userAddress,
                refCode: refCode || null, // Handle undefined refCode
            }, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (data?.referralUID) {
                if (data.referralUID.length === 8) {
                    localStorage.setItem("referralUid", data.referralUID);
                    setReferralUid(data.referralUID);

                    // Success message with referrer info
                    if (refCode) {
                        toast.success(`Welcome! Referred by: ${refCode}`, {
                            duration: 4000,
                            icon: "🎉"
                        });
                    }
                } else if (import.meta.env.DEV) {
                    console.error("Invalid referralUID format:", data.referralUID);
                }
            }
        } catch (error) {
            if (error.name === 'AbortError' || error.message === 'canceled') {
                if (import.meta.env.DEV) console.error("Referral registration timeout");
                if (userAddress) {
                    setTimeout(() => processReferral(userAddress), 2000);
                }
            } else if (error.response?.status === 500) {
                if (import.meta.env.DEV) console.error("Server error during referral registration");
            } else {
                console.error("Referral processing error:", error);
            }
        } finally {
            setReferralLoading(false);
        }
    };

    // Enhanced open function that handles connection state properly
    const handleWalletOpen = async () => {
        if (localConnectionStatus === "connecting") return;

        // Mark this as a user action, not auto-reconnect
        isInitialLoadRef.current = false;

        setLocalConnectionStatus("connecting");
        try {
            await open();
        } catch (error) {
            console.error("Failed to open wallet modal:", error);
            setLocalConnectionStatus("disconnected");
            toast.error("Failed to connect wallet. Please try again.");
        }
    };

    return (
        <WalletContext.Provider
            value={{
                address,
                isConnected,
                connectionStatus: localConnectionStatus,
                open: handleWalletOpen,
                referralUid,
                referralLoading,
            }}>
            {children}
        </WalletContext.Provider>
    );
}; 