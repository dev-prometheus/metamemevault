import { useEffect, useState } from "react";
import { mmv_logo_round } from "../assets";
import toast from "react-hot-toast";
import { Lock, TrendingUp, Sparkles, Info } from "lucide-react";
import { BrowserProvider, Contract, JsonRpcSigner, parseUnits } from "ethers";
import { MEME_TREASURY_ADDRESS, MMV_CURRENT_PRICE, MMV_EST_PRICE } from "../config/contract_helpers";
import { TREASURY_CONTRACT_ABI } from "../config/abi_configs/treasury_contracts_abi";
import { useDebounce } from "../hooks/use_debounce";
import { useTokenPrices } from "../hooks/use_token_prices";

const TreasuryLockComponent = ({
    walletAddress, mmvBalance, isConnected, REWARD_TOKENS, formatLargeNumber, chainId, walletProvider, onLockComplete,
    setSelectedRewardToken }) => {
    const [lockAmount, setLockAmount] = useState("");
    const [selectedReward, setSelectedReward] = useState("");
    const [estimatedReward, setEstimatedReward] = useState(0);
    const [saveToken, setSavingToken] = useState(false);
    const debouncedLockAmount = useDebounce(lockAmount, 300);
    const [rewardPercentage, setRewardPercentage] = useState(() => {
        return Math.random() * (0.4 - 0.3) + 0.3; // random between 35% - 45%
    });
    const { prices: tokenPrices, loading, refresh } = useTokenPrices();

    // function for locking tokens
    const lockTokens = async () => {
        if (saveToken) return;
        if (!isConnected || !lockAmount || !selectedReward) {
            toast.error("Please enter a valid amount and select a meme reward.");
            return;
        }
        setSavingToken(true);
        try {
            if (Number(lockAmount) > mmvBalance) {
                toast.error("Insufficient MMV balance!");
                return;
            }
            const provider = new BrowserProvider(walletProvider, chainId);
            const signer = new JsonRpcSigner(provider, walletAddress);
            const memeTreasuryContract = new Contract(MEME_TREASURY_ADDRESS, TREASURY_CONTRACT_ABI, signer);

            const transaction = await memeTreasuryContract.lockTokens(selectedReward, parseUnits(lockAmount, 18));
            await transaction.wait();
            if (!transaction?.hash) {
                toast.error("Transaction failed or rejected");
                return;
            }
            toast.success(`Locked ${lockAmount} MMV!`);

            setLockAmount("");
            setSelectedReward("");
            setEstimatedReward(0);
            if (setSelectedRewardToken) {
                setSelectedRewardToken("");
            }

            // ✅ Trigger balance refresh after successful lock
            if (typeof onLockComplete === "function") {
                onLockComplete();
            }

        } catch (error) {
            console.error("Error locking MMV tokens:", error);
            toast.error("Failed to lock MMV tokens.");
        } finally {
            setSavingToken(false);
        }
    };

    // function to handle max amount of mmv
    const handleMaxAmount = () => {
        if (!mmvBalance || mmvBalance <= 0) {
            setLockAmount("0");
            return;
        }

        const balanceFloat = parseFloat(mmvBalance);
        const maxAmount = Math.max(0, balanceFloat - 5).toFixed(2);

        setLockAmount(maxAmount);
    }

    // use effect to update meme token prices
    useEffect(() => {
        const checkPrices = async () => {
            if (loading) return;

            const priceValues = Object.values(tokenPrices);
            const hasInvalid = priceValues.some(p => !p || p <= 0.0000001);
            if (hasInvalid) {
                toast.error("some token prices for lock page could not be fetched. Please refresh");
            }
        };
        checkPrices();

        const interval = setInterval(() => {
            refresh();
            checkPrices();
        }, 600_000); // every 10 minutes
        return () => clearInterval(interval); // cleanup interval on unmount
    }, [tokenPrices, loading]);

    useEffect(() => {
        const newRandom = Math.random() * (0.4 - 0.3) + 0.3;
        setRewardPercentage(newRandom);
    }, [selectedReward]);

    //calculate estimated reward in real-time
    useEffect(() => {
        if (!lockAmount || !selectedReward || !tokenPrices[selectedReward]) {
            setEstimatedReward(0);
            return;
        }

        const mmvValueInUSD = parseFloat(debouncedLockAmount) * MMV_EST_PRICE; // mmv total value in USD 
        const rewardInUSD = mmvValueInUSD * rewardPercentage;
        const selectedTokenPrice = tokenPrices[selectedReward] || 1; // default to avoid divide by zero
        const estimatedTokens = rewardInUSD / selectedTokenPrice;

        setEstimatedReward(estimatedTokens);
    }, [debouncedLockAmount, selectedReward, tokenPrices, rewardPercentage]);

    return (
        <>
            <div className="mmt-lock-card">
                <div className="mmt-lock-header">
                    <div className="mmt-lock-title">
                        <Lock className="mmt-lock-icon" />
                        <h2>Lock & Earn Station</h2>
                    </div>
                    <div className="mmt-lock-balance">
                        <span className="mmt-balance-label">Available:</span>
                        <span className="mmt-balance-value">{formatLargeNumber(mmvBalance)} $MMV</span>
                    </div>
                </div>

                {/* Lock Amount Input */}
                <div className="mmt-form-group">
                    <label className="mmt-form-label">
                        <span>Amount to Lock</span>
                        <button className="mmt-max-btn" onClick={handleMaxAmount}>
                            MAX
                        </button>
                    </label>
                    <div className="mmt-input-wrapper">
                        <input
                            type="text"
                            placeholder="0.0"
                            value={lockAmount}
                            onChange={(e) => setLockAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                            className="mmt-input"
                        />
                        <div className="mmt-input-addon">
                            <img src={mmv_logo_round} alt="MMV" className="mmt-token-img" />
                            <span>$MMV</span>
                        </div>
                    </div>
                    {lockAmount && (
                        <span className="mmt-input-usd">
                            ≈ ${(parseFloat(lockAmount) * MMV_CURRENT_PRICE).toFixed(2)} USD
                        </span>
                    )}
                </div>

                {/* Reward Token Selector */}
                <div className="mmt-form-group">
                    <label className="mmt-form-label">
                        <span>Select Your Meme Reward</span>
                    </label>
                    <div className="mmt-token-selector">
                        {REWARD_TOKENS.map((token) => (
                            <button
                                key={token.id}
                                className={`mmt-token-option ${selectedReward === token.id ? "selected" : ""}`}
                                onClick={() => {
                                    setSelectedReward(token.id);
                                    if (setSelectedRewardToken) {
                                        setSelectedRewardToken(token.id);
                                    }
                                }}
                                style={{ '--token-color': token.color }}>
                                <img src={token.icon} alt={token.name} />
                                <span className="mmt-token-name">{token.name}</span>
                                {selectedReward === token.id && (
                                    <div className="mmt-token-selected">
                                        <Sparkles size={16} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Estimated Rewards Display */}
                {lockAmount && selectedReward && (
                    <div className="mmt-rewards-preview">
                        <div className="mmt-rewards-header">
                            <span>Estimated Total Rewards</span>
                            <Info size={16} className="mmt-info-icon" />
                        </div>
                        <div className="mmt-rewards-amount">
                            <span className="mmt-rewards-value">
                                {formatLargeNumber(estimatedReward)}
                            </span>
                            <span className="mmt-rewards-token">
                                {REWARD_TOKENS.find(t => t.id === selectedReward)?.name}
                            </span>
                        </div>
                        <div className="mmt-rewards-details">
                            <div className="mmt-detail-item">
                                <span>Lock Value:</span>
                                <span>${(parseFloat(lockAmount) * MMV_CURRENT_PRICE).toFixed(2)}</span>
                            </div>
                            <div className="mmt-detail-item">
                                <span>Daily Est:</span>
                                <span>{formatLargeNumber(estimatedReward / 90)}</span>
                            </div>
                        </div>
                        {/* Lock Period Info */}
                        <div className="mmt-lock-info">
                            <div className="mmt-info-header">
                                <Info size={16} />
                                <span>Lock Period</span>
                            </div>
                            <div className="mmt-info-content">
                                <p>Your $MMV will be locked until presale ends. Rewards accumulate every block and can be claimed 3 days after presale completion.</p>
                            </div>
                        </div>
                    </div>
                )}
                {/* Lock Button */}
                <button
                    className={`mmt-lock-button ${saveToken ? "loading" : ""}`}
                    disabled={!isConnected || !lockAmount || !selectedReward || saveToken}
                    onClick={lockTokens}>
                    {saveToken ? (
                        <>
                            <div className="mmt-button-spinner"></div>
                            <span>Locking...</span>
                        </>
                    ) : isConnected ? (
                        <>
                            <Lock size={18} />
                            <span>Lock $MMV & Start Earning</span>
                        </>
                    ) : (
                        <span>Connect Wallet to Lock</span>
                    )}
                </button>

                {/* Tips Section */}
                <div className="mmt-tips">
                    <div className="mmt-tip">
                        <TrendingUp size={16} />
                        <span>Rewards start accumulating immediately</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TreasuryLockComponent;