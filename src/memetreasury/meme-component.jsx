import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Clock, Award, Rocket, ChevronRight, Star, Gem, Lock } from "lucide-react";
import { icons_placeholder } from "../assets";
import toast from "react-hot-toast";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { MEME_TREASURY_ADDRESS, MMV_EST_PRICE, REWARD_PERCENTAGE_PER_HOUR } from "../config/contract_helpers";
import { TREASURY_CONTRACT_ABI } from "../config/abi_configs/treasury_contracts_abi";
import { useTokenPrices } from "../hooks/use_token_prices";

const TreasuryMemeComponent = ({ walletAddress, REWARD_TOKENS, mmvLocked, formatLargeNumber, walletProvider, chainId, refreshSignal }) => {
    const { prices: tokenPrices, loading: pricesLoading, lastUpdated } = useTokenPrices();
    const [earnedRewards, setEarnedRewards] = useState({});
    const [lockedMemeData, setLockedMemeData] = useState([]);
    const [totalEarnedUSD, setTotalEarnedUSD] = useState(0);
    const [claimingToken, setClaimingToken] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const getTokenPrice = (tokenId) => {
        return tokenPrices[tokenId] || 0.00001;
    };

    // calculate rewards for meme
    const calculateRewards = async (wallet_address, memeId, memeTreasuryContract) => {
        if (!wallet_address || !memeId || !memeTreasuryContract) return;
        try {
            const lockedEntries = await memeTreasuryContract.getLockedEntries(wallet_address, memeId);
            let totalRewards = 0;

            for (const entry of lockedEntries) {
                const timeElapsed = (Date.now() / 1000) - Number(entry.timeLocked);
                if (timeElapsed <= 0) continue;
                const hoursElapsed = timeElapsed / 3600;
                const memePrice = tokenPrices[memeId] || 0.00001;
                const mmvValue = Number(formatUnits(entry.mmvLocked, 18)) * MMV_EST_PRICE;
                const hourlyRewardUSD = mmvValue * REWARD_PERCENTAGE_PER_HOUR;
                const rewardAmount = (hourlyRewardUSD / memePrice) * hoursElapsed;
                totalRewards += rewardAmount;
            }

            return totalRewards;

        } catch (error) {
            console.error("Error calculating rewards:", error);
            return 0;
        }
    }

    // Calculate total USD value whenever earnedRewards or tokenPrices change
    useEffect(() => {
        if (pricesLoading || !tokenPrices || Object.keys(earnedRewards).length === 0) return;

        let totalUSD = 0;
        Object.entries(earnedRewards).forEach(([tokenId, amount]) => {
            const price = tokenPrices[tokenId] || 0;
            totalUSD += amount * price;
        });
        setTotalEarnedUSD(totalUSD);
    }, [earnedRewards, tokenPrices, pricesLoading]);

    // Placeholder for claiming rewards
    const claimRewards = async (tokenId) => {
        setClaimingToken(tokenId);
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.error("Claiming opens 3 days after presale ends. Keep stacking!");
        setClaimingToken(null);
    };

    const fetchTreasuryData = async (wallet_address) => {
        if (!wallet_address) return;

        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            const memeTreasuryContract = new Contract(MEME_TREASURY_ADDRESS, TREASURY_CONTRACT_ABI, provider);
            // fetch locked meme ids and amounts
            const lockedMemeTokens = await memeTreasuryContract.getLockedMemeTokens(wallet_address);
            const lockedData = await Promise.all(
                lockedMemeTokens.map(async (memeId) => {
                    const entries = await memeTreasuryContract.getLockedEntries(wallet_address, memeId);
                    const total = entries.reduce((sum, entry) => sum + Number(formatUnits(entry.mmvLocked, 18)), 0);
                    return { memeId, lockedAmount: total };
                })
            );
            setLockedMemeData(lockedData);

            // Fetch earned rewards for each meme token - only if tokenPrices are available
            if (!pricesLoading && tokenPrices && Object.keys(tokenPrices).length > 0) {
                const rewardsArray = await Promise.all(
                    REWARD_TOKENS.map(async (token) => {
                        const earned = await calculateRewards(wallet_address, token.id, memeTreasuryContract);
                        return { [token.id]: earned };
                    })
                );

                // Convert array to an object
                const rewards = Object.assign({}, ...rewardsArray);
                setEarnedRewards(rewards);
            }

        } catch (error) {
            console.error("Error fetching meme treasury data:", error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (walletAddress && !pricesLoading) {
                fetchTreasuryData(walletAddress);
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [walletAddress, refreshSignal, pricesLoading, lastUpdated]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        if (!walletAddress) return;
        const interval = setInterval(() => {
            if (!pricesLoading) {
                fetchTreasuryData(walletAddress);
            }
        }, 120000);
        return () => clearInterval(interval);
    }, [walletAddress, pricesLoading]);

    const hasActivePositions = Object.values(earnedRewards).some(amount => amount > 0) ||
        lockedMemeData.some(data => data.lockedAmount > 0);

    return (
        <>
            <div className="mmt-dashboard-card">
                <div className="mmt-dashboard-header">
                    <div className="mmt-dashboard-title">
                        <DollarSign className="mmt-dashboard-icon" />
                        <h2>Your Meme Earnings Dashboard</h2>
                        {refreshing && <div className="mmt-refresh-spinner"></div>}
                    </div>
                    <div className="mmt-dashboard-stats">
                        <div className="mmt-dashboard-stat">  {/* Changed from mmt-stat */}
                            <span className="mmt-dashboard-stat-label">Total Locked</span>
                            <span className="mmt-dashboard-stat-value">{formatLargeNumber(mmvLocked)} $MMV</span>
                        </div>
                        <div className="mmt-dashboard-stat">  {/* Changed from mmt-stat */}
                            <span className="mmt-dashboard-stat-label">Total Earned</span>
                            <span className="mmt-dashboard-stat-value">${formatLargeNumber(totalEarnedUSD)}</span>
                        </div>
                    </div>
                </div>

                {!hasActivePositions ? (
                    <div className="mmt-empty-state">
                        <Rocket className="mmt-empty-icon" />
                        <h3>No Active Positions Yet</h3>
                        <p>Lock your $MMV to start earning meme rewards!</p>
                        <button className="mmt-empty-cta" onClick={() => document.querySelector('.mmt-tab').click()}>
                            Start Earning
                            <ChevronRight size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="treasury-earnings-grid">
                        {REWARD_TOKENS.map((token) => {
                            const memeEntry = lockedMemeData.find((meme) => meme.memeId === token.id) || {};
                            const lockedAmount = memeEntry.lockedAmount || 0;
                            const earnedAmount = earnedRewards[token.id] || 0;
                            const claimableAmount = Math.floor(earnedAmount * 0.92); // 90% of earned amount
                            const earnedUSD = earnedAmount * (tokenPrices[token.id] || 0);
                            const isActive = lockedAmount > 0 || earnedAmount > 0;

                            if (!isActive) return null;

                            return (
                                <div key={token.id} className="mmt-earnings-card" style={{ '--token-color': token.color }}>
                                    <div className="mmt-earnings-header">
                                        <div className="mmt-earnings-token">
                                            <img src={token.icon || icons_placeholder} alt={token.name} />
                                            <div className="mmt-earnings-info">
                                                <h4>{token.name}</h4>
                                            </div>
                                        </div>
                                        <div className="mmt-earnings-badge">
                                            {earnedAmount > 100000 ? <Gem /> : <Star />}
                                        </div>
                                    </div>

                                    <div className="mmt-earnings-stats">
                                        <div className="mmt-stat-row">
                                            <span className="mmt-stat-label">
                                                <Lock size={14} />
                                                Locked
                                            </span>
                                            <span className="mmt-stat-value">
                                                {formatLargeNumber(lockedAmount)} MMV
                                            </span>
                                        </div>
                                        <div className="mmt-stat-row">
                                            <span className="mmt-stat-label">
                                                <TrendingUp size={14} />
                                                Earned
                                            </span>
                                            <span className="mmt-stat-value highlight">
                                                {formatLargeNumber(earnedAmount)} {token.name}
                                            </span>
                                        </div>
                                        <div className="mmt-stat-row">
                                            <span className="mmt-stat-label">
                                                <DollarSign size={14} />
                                                Value
                                            </span>
                                            <span className="mmt-stat-value">
                                                ${formatLargeNumber(earnedUSD)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        className={`mmt-claim-button ${claimingToken === token.id ? "claiming" : ""}`}
                                        onClick={() => claimRewards(token.id)}
                                        disabled={claimingToken === token.id}>
                                        {claimingToken === token.id ? (
                                            <>
                                                <div className="mmt-button-spinner"></div>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Award size={18} />
                                                <span>Claim {token.name}</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {hasActivePositions && (
                    <div className="mmt-dashboard-footer">
                        <div className="mmt-footer-item">
                            <Clock size={16} />
                            <span>Rewards update every block</span>
                        </div>
                        <div className="mmt-footer-item">
                            <Award size={16} />
                            <span>Claiming opens post-presale</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default TreasuryMemeComponent;