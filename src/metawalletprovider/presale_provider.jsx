import { BrowserProvider, Contract, formatEther, JsonRpcProvider } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { PRESALE_CONTRACT_ADDRESS, PUBLIC_RPC_URL } from "../config/contract_helpers";
import { PRESALE_CONTRACT_ABI } from "../config/abi_configs/presale_contracts_abi";

export const PresaleContext = createContext();

const PRESALE_CACHE_KEY = "mmv_presale_data";
const STAGE_PROGRESSION_KEY = "mmv_stage_progression";
const CACHE_DURATION_MS = 60 * 1000; // 1 minutes
const STAGE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds 

// INITIAL STAGE START TIME - Only Stage 1 has a fixed start
const PRESALE_START_TIME = new Date('2026-06-18T19:00:00Z').getTime();

export const PresaleProvider = ({ children, walletProvider, chainId, isConnected }) => {
    const [presaleData, setPresaleData] = useState(() => {
        try {
            const cachedRaw = localStorage.getItem(PRESALE_CACHE_KEY);
            if (!cachedRaw) throw new Error("No cache found");

            const cached = JSON.parse(cachedRaw);
            if (!cached.data || !cached.timestamp) throw new Error("invalid structure");
            const isFresh = Date.now() - cached.timestamp < CACHE_DURATION_MS;
            if (isFresh) {
                return cached.data;
            }
        } catch (error) {
            console.warn("invalid or missing cache, falling back to default");
        }

        return {
            currentStage: 1,
            stagePrice: 0.0089,
            bonusPercent: 200,
            progress: 0,
            tokensRemaining: 48000000,
            tokensLeft: "48,000,000",
            maxTokensPerWallet: 0,
            paused: false,
            nextPrice: 0.012,
        };
    });

    // Load stage progression data
    const [stageProgression, setStageProgression] = useState(() => {
        try {
            const cached = localStorage.getItem(STAGE_PROGRESSION_KEY);
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (error) {
            console.warn("Invalid stage progression cache");
        }

        return {
            stageStartTimes: {
                1: PRESALE_START_TIME // Only Stage 1 has initial fixed time
            },
            stageCompletionTimes: {},
            lastKnownStage: 1
        };
    });

    // Calculate when a stage should start based on actual progression
    const calculateStageStartTime = (stage, currentStageFromContract, stageProgression) => {
        if (stage === 1) {
            return PRESALE_START_TIME;
        }
        if (stageProgression.stageStartTimes[stage]) {
            return stageProgression.stageStartTimes[stage];
        }

        if (currentStageFromContract >= stage) {
            const previousStageStart = stageProgression.stageStartTimes[stage - 1] || PRESALE_START_TIME;
            return previousStageStart + STAGE_DURATION_MS;
        }

        const previousStageStart = stageProgression.stageStartTimes[stage - 1] ||
            calculateStageStartTime(stage - 1, currentStageFromContract, stageProgression);
        return previousStageStart + STAGE_DURATION_MS;
    };


    // Calculate stage end time with extension logic
    const calculateStageEndTime = (stage, stageStartTime) => {
        const now = Date.now();
        const timeSinceStart = now - stageStartTime;
        const periodsElapsed = Math.floor(timeSinceStart / STAGE_DURATION_MS);
        return stageStartTime + ((periodsElapsed + 1) * STAGE_DURATION_MS);
    };

    // Update stage progression when stages advance
    const updateStageProgression = (newStage, oldStage) => {
        if (newStage <= oldStage) return stageProgression;

        const now = Date.now();
        const updatedProgression = { ...stageProgression };

        if (oldStage > 0) {
            updatedProgression.stageCompletionTimes[oldStage] = now;
        }

        updatedProgression.stageStartTimes[newStage] = now;
        updatedProgression.lastKnownStage = newStage;

        localStorage.setItem(STAGE_PROGRESSION_KEY, JSON.stringify(updatedProgression));
        setStageProgression(updatedProgression);

        return updatedProgression;
    };

    let lastFetchTime = 0;
    const MIN_FETCH_INTERVAL = 5000;

    const fetchPresaleState = async (forceRefresh = false) => {
        const now = Date.now();
        if (!forceRefresh && now - lastFetchTime < MIN_FETCH_INTERVAL) {
            return;
        }
        lastFetchTime = now;
        try {

            if (!forceRefresh) {
                const cached = localStorage.getItem(PRESALE_CACHE_KEY);
                if (cached) {
                    try {
                        const { data, timestamp } = JSON.parse(cached);
                        const cacheAge = Date.now() - timestamp;
                        if (cacheAge < CACHE_DURATION_MS) {
                            setPresaleData(data);
                            return;
                        }
                    } catch (error) {
                        console.warn("Invalid presale cache");
                    }
                }
            }

            const provider = walletProvider && isConnected ?
                new BrowserProvider(walletProvider, chainId)
                : new JsonRpcProvider(PUBLIC_RPC_URL);

            const contract = new Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_CONTRACT_ABI, provider);

            const [
                currentStageInfo,
                maxTokensPerBuyer,
                paused,
                currentStageIndex
            ] = await Promise.all([
                contract.getCurrentStageInfo(),
                contract.maxTokensPerBuyer(),
                contract.paused(),
                contract.currentStage()
            ]);

            const [pricePerToken, tokensLeft, bonusPercent, stageNumber] = currentStageInfo;

            // Convert to readable format
            const currentStage = Number(stageNumber) + 1; // Convert 0-indexed to 1-indexed
            const stagePrice = Number(formatEther(pricePerToken));
            const tokensRemaining = Number(formatEther(tokensLeft));

            // Check if stage has advanced and update progression
            let currentProgression = stageProgression;
            if (currentStage > stageProgression.lastKnownStage) {
                currentProgression = updateStageProgression(currentStage, stageProgression.lastKnownStage);
            }

            // Calculate next stage price
            const stagePrices = [0.008, 0.012, 0.018, 0.025, 0.035];
            const nextPrice = currentStage < 5 ? stagePrices[currentStage] : stagePrice;

            // Calculate progress 
            const stageTokenAllocations = [48000000, 64000000, 72000000, 88000000, 128000000];
            const currentStageAllocation = stageTokenAllocations[stageNumber] || 48000000;
            const tokensSold = currentStageAllocation - tokensRemaining;
            const progress = currentStageAllocation > 0 ?
                ((tokensSold / currentStageAllocation) * 100).toFixed(2) : "0.00";

            // Calculate stage timing using dynamic progression
            const stageStartTime = calculateStageStartTime(currentStage, currentStage, currentProgression);
            const stageEndTime = calculateStageEndTime(currentStage, stageStartTime);

            // Check if we're in an extended period
            const timeSinceStart = Date.now() - stageStartTime;
            const isExtended = timeSinceStart > STAGE_DURATION_MS;
            const extensionPeriod = Math.floor(timeSinceStart / STAGE_DURATION_MS) + 1;

            const newData = {
                currentStage,
                stagePrice,
                bonusPercent: Number(bonusPercent),
                progress: parseFloat(progress),
                tokensRemaining,
                tokensLeft: tokensRemaining.toLocaleString(),
                maxTokensPerWallet: Number(formatEther(maxTokensPerBuyer)),
                paused,
                nextPrice,
                // Dynamic countdown data
                stageEndTime: stageEndTime,
                stageStartTime: stageStartTime,
                isExtended: isExtended,
                extensionPeriod: extensionPeriod,
                // Additional info for debugging
                actualStageStartTime: currentProgression.stageStartTimes[currentStage],
                stageCompletionHistory: currentProgression.stageCompletionTimes,
                lastUpdate: Date.now()
            };

            setPresaleData(newData);
            localStorage.setItem(PRESALE_CACHE_KEY, JSON.stringify({
                data: newData,
                timestamp: Date.now()
            }));

        } catch (err) {
            console.error("Presale context fetch failed:", err);

            // Even on error, provide consistent countdown based on current progression
            const fallbackStage = presaleData.currentStage || 1;
            const stageStartTime = calculateStageStartTime(fallbackStage, fallbackStage, stageProgression);
            const stageEndTime = calculateStageEndTime(fallbackStage, stageStartTime);
            const timeSinceStart = Date.now() - stageStartTime;
            const isExtended = timeSinceStart > STAGE_DURATION_MS;
            const extensionPeriod = Math.floor(timeSinceStart / STAGE_DURATION_MS) + 1;

            setPresaleData(prev => ({
                ...prev,
                stageEndTime: stageEndTime,
                stageStartTime: stageStartTime,
                isExtended: isExtended,
                extensionPeriod: extensionPeriod,
                lastUpdate: Date.now()
            }));
        }
    };

    useEffect(() => {
        fetchPresaleState();
        // Refresh presale data every 3 minutes
        const dataInterval = setInterval(() => {
            fetchPresaleState();
        }, 180000);

        return () => {
            clearInterval(dataInterval);
        };
    }, [walletProvider, chainId, isConnected]);

    const refreshPresale = async () => {
        await fetchPresaleState(true);
    };

    // Method to manually record stage completion (if needed)
    const recordStageCompletion = (stage, completionTime = Date.now()) => {
        const updatedProgression = { ...stageProgression };
        updatedProgression.stageCompletionTimes[stage] = completionTime;

        const nextStage = stage + 1;
        if (nextStage <= 5) {
            updatedProgression.stageStartTimes[nextStage] = completionTime;
            updatedProgression.lastKnownStage = nextStage;
        }

        localStorage.setItem(STAGE_PROGRESSION_KEY, JSON.stringify(updatedProgression));
        setStageProgression(updatedProgression);
        fetchPresaleState(true);
    };

    // Clear cache method (useful for debugging or forced refreshes)
    const clearCache = () => {
        localStorage.removeItem(PRESALE_CACHE_KEY);
        sessionStorage.removeItem('globalStats'); // Also clear hero stats cache
    };

    return (
        <PresaleContext.Provider value={{
            ...presaleData,
            refreshPresale,
            recordStageCompletion,
            clearCache,
            stageProgression,
            // Helper method to check if countdown should show "Extended" message
            isExtendedPeriod: () => {
                return presaleData.isExtended || false;
            },
            // Get the current extension period number
            getExtensionPeriod: () => {
                return presaleData.extensionPeriod || 1;
            },
            getStageHistory: () => {
                return {
                    startTimes: stageProgression.stageStartTimes,
                    completionTimes: stageProgression.stageCompletionTimes
                };
            },
            isDataFresh: () => {
                const lastUpdate = presaleData.lastUpdate || 0;
                return Date.now() - lastUpdate < CACHE_DURATION_MS;
            }
        }}>
            {children}
        </PresaleContext.Provider>
    );
};

export const usePresaleContext = () => useContext(PresaleContext);
