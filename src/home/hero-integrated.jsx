import React, { useEffect, useState, useRef } from "react";
import { BrowserProvider, Contract, formatEther, JsonRpcProvider } from "ethers";
import { useAppKitSafe } from "../hooks/use_appkit_safe";
import { useWallet } from "../metawalletprovider";
import { usePresaleContext } from "../metawalletprovider/presale_provider";
import { PRESALE_CONTRACT_ADDRESS, PUBLIC_RPC_URL } from "../config/contract_helpers";
import { PRESALE_CONTRACT_ABI } from "../config/abi_configs/presale_contracts_abi";
import EnhancedHero from "./hero-enhanced";
import PresaleForm from "./hero-presale-form";
import "../styles/home/hero-main.css";
import "../styles/home/hero-content.css";
import "../styles/home/hero-presale.css";

const IntegratedHeroSection = ({ onDataLoaded }) => {
    const [totalRaised, setTotalRaised] = useState("0");
    const [totalHolders, setTotalHolders] = useState("0");
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdateTime, setLastUpdateTime] = useState(0);
    const [dataLoadedCalled, setDataLoadedCalled] = useState(false); 

    const isInitialLoad = useRef(true);
    const abortControllerRef = useRef(null);
    const timeoutRef = useRef(null);

    const { walletProvider, chainId } = useAppKitSafe();
    const { isConnected } = useWallet(); 
    const {
        currentStage,
        stagePrice,
        bonusPercent,
        progress,
        tokensLeft,
        refreshPresale,
        isExtendedPeriod,
        getExtensionPeriod,
    } = usePresaleContext();

    // Check if essential data is loaded and call onDataLoaded
    useEffect(() => {
        const checkDataReady = () => {
            const globalStatsReady = !isLoading && totalRaised !== "0";
            const presaleDataReady = stagePrice && stagePrice > 0 && currentStage && currentStage > 0;

            const allDataReady = globalStatsReady && presaleDataReady;

            if (allDataReady && !dataLoadedCalled && onDataLoaded) {
                setDataLoadedCalled(true);
                onDataLoaded();
                console.log('Essential data loaded - calling onDataLoaded');
            }
        };

        checkDataReady();
    }, [isLoading, totalRaised, stagePrice, currentStage, dataLoadedCalled, onDataLoaded]);

    // REDUCED cache duration for more real-time updates
    const CACHE_DURATION = 270000; // 1 minute instead of 2 minutes
    const CACHE_KEY = 'globalStats_v2';

    // Cleanup function for async operations
    const cleanup = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    // Fetch global stats from contract
    const fetchGlobalStats = async (forceRefresh = false, isPageLoad = false) => {
        if (isLoading) return;

        const shouldUseFreshData = forceRefresh || isPageLoad || isInitialLoad.current;

        if (!shouldUseFreshData) {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) {
                try {
                    const { data, timestamp } = JSON.parse(cached);
                    const cacheAge = Date.now() - timestamp;

                    if (cacheAge < CACHE_DURATION) {
                        // Batch update for performance
                        setTotalRaised(data.totalRaised);
                        setTotalHolders(data.totalHolders);
                        setLastUpdateTime(timestamp);
                        return;
                    }
                } catch (error) {
                    console.warn("Invalid cache data, fetching fresh");
                }
            }
        }

        // Cleanup any existing requests
        cleanup();

        // Create new abort controller and timeout
        abortControllerRef.current = new AbortController();
        timeoutRef.current = setTimeout(() => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        }, 300000); // 30 second timeout

        try {
            setIsLoading(true);
            // Use either wallet provider or public RPC
            const provider = (walletProvider && isConnected)
                ? new BrowserProvider(walletProvider, chainId)
                : new JsonRpcProvider(PUBLIC_RPC_URL);

            const contract = new Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_CONTRACT_ABI, provider);
            const stats = await contract.getPresaleStats();

            // Check if request was aborted
            if (abortControllerRef.current?.signal.aborted) {
                console.log('Request aborted');
                return;
            }

            const [baseSold, bonusAllocated, baseClaimed, bonusClaimed, raised, stage, ended] = stats;
            const formattedRaised = Number(formatEther(raised)).toFixed(0);
            // Estimate holders based on tokens sold
            const totalTokensSold = Number(formatEther(baseSold));
            const averagePurchase = 50000; // Assume average purchase of 50k tokens
            const estimatedHolders = Math.max(1, Math.floor(totalTokensSold / averagePurchase));

            const timestamp = Date.now();

            // Batch all state updates for performance
            setTotalRaised(formattedRaised || "0");
            setTotalHolders(estimatedHolders.toString());
            setLastUpdateTime(timestamp);

            // Cache the results with timestamp
            const cacheData = {
                data: {
                    totalRaised: formattedRaised,
                    totalHolders: estimatedHolders.toString()
                },
                timestamp
            };
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            // Mark initial load as complete
            if (isInitialLoad.current) {
                isInitialLoad.current = false;
            }

            // Clear timeout on success
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

        } catch (error) {
            // Clear timeout on error
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            if (error.name === 'AbortError') {
                console.log('Request aborted');
                return;
            }

            if (import.meta.env.DEV) console.error("Error fetching global stats:", error);

            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached && !isInitialLoad.current) {
                try {
                    const { data } = JSON.parse(cached);
                    setTotalRaised(data.totalRaised);
                    setTotalHolders(data.totalHolders);
                    return;
                } catch (e) {
                    console.warn("Cache also invalid");
                }
            }
            // Use fallback values on error
            if (!totalRaised || totalRaised === "0") {
                setTotalRaised("500000");
                setTotalHolders("575");
            }
        } finally {
            setIsLoading(false);
            abortControllerRef.current = null;
        }
    };

    // Enhanced refresh function that invalidates cache
    const handlePurchaseSuccess = async () => {
        sessionStorage.removeItem(CACHE_KEY);
        localStorage.removeItem("mmv_presale_data");

        await Promise.all([
            fetchGlobalStats(true), // Force refresh
            refreshPresale()
        ]);

        setTimeout(() => {
            fetchGlobalStats(true);
        }, 300000);
    };

    // Fetch global stats
    useEffect(() => {
        fetchGlobalStats(false, true); // isPageLoad = true

        // Update every 2 minutes
        const interval = setInterval(() => {
            fetchGlobalStats(); // Will use cache if fresh
        }, CACHE_DURATION);

        return () => {
            clearInterval(interval);
            cleanup();

        };
    }, []); // Only run on mount

    // Listen for wallet/provider changes and refresh
    useEffect(() => {
        if (!isInitialLoad.current) {
            const hasSignificantChange = walletProvider || chainId !== undefined;
            if (hasSignificantChange) {
                const timeoutId = setTimeout(() => {
                    fetchGlobalStats(true);
                }, 270000);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [walletProvider?.request, chainId, isConnected]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && Date.now() - lastUpdateTime > 600000) {
                fetchGlobalStats(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [lastUpdateTime]);

    // Add window focus event for additional freshness
    useEffect(() => {
        const handleWindowFocus = () => {
            if (Date.now() - lastUpdateTime > 300000) {
                fetchGlobalStats(true);
            }
        };

        window.addEventListener('focus', handleWindowFocus);
        return () => window.removeEventListener('focus', handleWindowFocus);
    }, [lastUpdateTime]);

    return (
        <section className="enhanced-hero-section">
            {/* Animated Background */}
            <div className="hero-background">
                <div className="gradient-mesh"></div>
                <div className="particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle"></div>
                    ))}
                </div>
            </div>

            <div className="hero-container">
                <div className="hero-content-wrapper">
                    {/* Left Side - Hero Content */}
                    <EnhancedHero
                        currentStage={currentStage}
                        stagePrice={stagePrice}
                        bonusPercent={bonusPercent}
                        totalRaised={totalRaised}
                        totalHolders={totalHolders}
                        progress={progress}
                        tokensLeft={tokensLeft}
                        isLoading={isLoading}
                    />

                    {/* Right Side - Presale Form */}
                    <div id="mmv-presale" className="presale-form-wrapper">
                        <PresaleForm onPurchaseSuccess={handlePurchaseSuccess} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntegratedHeroSection;