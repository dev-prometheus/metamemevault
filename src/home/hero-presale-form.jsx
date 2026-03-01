import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import TransactionModal from "./transaction-modal";
import { Copy, Loader2, TrendingUp } from "lucide-react";
import { icon_ethereum, icon_usdt, icon_card, mmv_logo_round } from "../assets";
import { useWallet } from "../metawalletprovider";
import { usePresaleContext } from "../metawalletprovider/presale_provider";
import { useEthPrices } from "../hooks/use_eth_price";
import { useUserBalance } from "../hooks/use_user_balance";
import { formatNumberWithCommas } from "../utils/formatfunctions";
import { parseTxError } from "../utils/paresetxerror";
import { USDT_ABI } from "../config/abi_configs/usdt_contracts_abi";
import { PRESALE_CONTRACT_ABI } from "../config/abi_configs/presale_contracts_abi";
import { PRESALE_CONTRACT_ADDRESS, USDTAddress, formatTokenAmount } from "../config/contract_helpers";
import { BrowserProvider, Contract, formatEther, JsonRpcSigner, parseUnits, ZeroAddress } from "ethers";
import { useAppKitSafe } from "../hooks/use_appkit_safe";
import { usePurchaseCapacity } from "../hooks/use_purchase_capacity";
import PurchaseCapacityBadge from "../components/purchaseCapacity";

const PresaleForm = ({ onPurchaseSuccess }) => {
    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Form States
    const [paymentMethod, setPaymentMethod] = useState("ETH");
    const [payAmount, setPayAmount] = useState("");
    const [receiveAmount, setReceiveAmount] = useState("");
    const [bonusAmount, setBonusAmount] = useState("0");
    const [totalAmount, setTotalAmount] = useState("0");

    // Transaction Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userPurchased, setUserPurchased] = useState("0.00");
    const [userBonus, setUserBonus] = useState("0.00");

    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(1);

    // Get context data
    const { walletProvider, chainId } = useAppKitSafe();
    const { isConnected, open, address, connectionStatus, referralUid, referralLoading } = useWallet();
    const {
        currentStage,
        stagePrice,
        bonusPercent,
        progress,
        nextPrice,
        tokensLeft,
        stageEndTime,
        refreshPresale,
        isExtendedPeriod,
        getExtensionPeriod
    } = usePresaleContext();
    const { ethPrice } = useEthPrices(walletProvider, chainId, isConnected);
    const { ethBalance, usdtBalance, updateBalance } = useUserBalance();
    const { capacity, loading: capacityLoading, refreshCapacity } = usePurchaseCapacity(
        walletProvider, chainId, address, isConnected, userPurchased, stagePrice, bonusPercent);

    // Countdown timer logic using stageEndTime from context
    useEffect(() => {
        if (!stageEndTime) return;

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = stageEndTime - now;

            if (distance > 0) {
                return {
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [stageEndTime]);


    // Fetch user stats
    useEffect(() => {
        if (walletProvider && isConnected && address) {
            fetchUserPresaleStats();
        }
    }, [walletProvider, isConnected, address]);

    const fetchUserPresaleStats = async () => {
        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            const contract = new Contract(
                PRESALE_CONTRACT_ADDRESS,
                PRESALE_CONTRACT_ABI,
                provider
            );

            const userInfo = await contract.users(address);
            const purchased = userInfo.baseTokens;
            const bonus = userInfo.bonusTokens;

            setUserPurchased(Number(formatEther(purchased)).toFixed(2));
            setUserBonus(Number(formatEther(bonus)).toFixed(2));
        } catch (error) {
            if (import.meta.env.DEV) console.error("Error fetching user stats:", error);
        }
    };

    // Fetch referrer
    const fetchReferrer = async (wallet_address) => {
        try {
            const { data } = await axios.get(
                `/api/get_referrer?wallet=${wallet_address}`
            );
            return data.referrer || ZeroAddress;
        } catch (error) {
            if (import.meta.env.DEV) console.error("Error fetching referrer:", error);
            return ZeroAddress;
        }
    };

    // ADD this helper function at the top of the file:
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle payment amount change with debouncing
    const handlePaymentAmountChange = useCallback((e) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        const parts = value.split('.');
        const formattedValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : value;

        setPayAmount(formattedValue);

        if (!formattedValue || isNaN(parseFloat(formattedValue)) || parseFloat(formattedValue) === 0) {
            setReceiveAmount("0");
            setBonusAmount("0");
            setTotalAmount("0");
            return;
        }

        let usdAmount = parseFloat(formattedValue);
        if (paymentMethod === "ETH" && ethPrice > 0) {
            usdAmount *= ethPrice;
        }

        const price = parseFloat(stagePrice);
        if (!price || price === 0) {
            setReceiveAmount("0");
            setBonusAmount("0");
            setTotalAmount("0");
            return;
        }

        const mmvAmount = usdAmount / price;
        const bonus = (mmvAmount * (bonusPercent || 0)) / 100;
        const total = mmvAmount + bonus;

        setReceiveAmount(mmvAmount.toFixed(2));
        setBonusAmount(bonus.toFixed(2));
        setTotalAmount(total.toFixed(2));
    }, [paymentMethod, ethPrice, stagePrice, bonusPercent]);

    // Handle payment method change
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setPayAmount("");
        setReceiveAmount("0");
        setBonusAmount("0");
        setTotalAmount("0");
    };

    // Format balances
    const formatEtherBalance = (balance) => {
        if (!balance) return "0.00000";
        return parseFloat(balance).toFixed(5);
    };

    const formatUsdtBalance = (balance) => {
        if (!balance) return "0.00";
        return parseFloat(balance).toFixed(2);
    };

    // Handle max amount
    const handleMaxAmount = () => {
        const maxAmount = paymentMethod === "ETH"
            ? Math.max(0, parseFloat(ethBalance || 0) - 0.002).toFixed(5)
            : (parseFloat(usdtBalance || 0)).toFixed(2);

        setPayAmount(maxAmount);
        handlePaymentAmountChange({ target: { value: maxAmount } });
    };

    // Copy referral link
    const copyReferralLink = () => {
        const referralLink = `https://metamemevault.com?ref=${referralUid || ""}`;
        navigator.clipboard.writeText(referralLink)
            .then(() => toast.success("Referral link copied!"))
            .catch(() => toast.error("Failed to copy link"));
    };

    // Add this validation helper function before processPurchase:
    const validatePurchaseAmount = () => {
        if (!payAmount || parseFloat(payAmount) <= 0) {
            toast.error("Please enter a valid amount");
            return false;
        }
        // Check capacity if available
        if (capacity && capacity.isAtLimit) {
            toast.error(
                "You've reached the 10M token wallet limit. Please use a different wallet to continue purchasing.",
                { duration: 5000 }
            );
            return false;
        }
        // Check if purchase would exceed limit
        if (capacity && parseFloat(receiveAmount) > capacity.maxBasePurchasable) {
            toast.error(
                `This purchase would exceed your wallet limit. Maximum you can buy: ${capacity.maxBasePurchasable.toFixed(2)} MMV ($${(capacity.maxPurchaseUSD || 0).toFixed(2)})`,
                { duration: 5000 }
            );
            return false;
        }

        return true;
    };

    // Process ETH Purchase
    const processEthPurchase = async (referrerAddress) => {
        if (!receiveAmount || isNaN(parseFloat(receiveAmount)) || parseFloat(receiveAmount) <= 0) {
            throw new Error("Invalid MMV amount");
        }

        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            const signer = new JsonRpcSigner(provider, address);
            const presaleContract = new Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_CONTRACT_ABI, signer);

            const tokensToBuy = parseUnits(receiveAmount, 18);
            // Validation checks
            const userInfo = await presaleContract.users(address);
            const stageIndex = await presaleContract.currentStage();
            const stage = await presaleContract.stages(stageIndex);
            const maxCap = await presaleContract.maxTokensPerBuyer();

            const userSoFar = BigInt(userInfo.baseTokens);
            const maxAllowed = maxCap - userSoFar;
            const availableInStage = BigInt(stage.tokensToSell);

            if (tokensToBuy > maxAllowed) {
                throw new Error(
                    `You can only purchase up to ${formatNumberWithCommas(
                        formatEther(maxAllowed)
                    )} MMV tokens more.`
                );
            }

            if (tokensToBuy > availableInStage) {
                throw new Error(
                    `Only ${formatNumberWithCommas(
                        formatEther(availableInStage)
                    )} MMV tokens left in this stage.`
                );
            }

            // Get latest ETH price from contract
            const latestPrice = await presaleContract.lastKnownETHPrice();
            const ethPriceForCalc = latestPrice > 0n ? latestPrice : BigInt(Math.floor(ethPrice * 1e8));

            // Calculate ETH required using contract's formula
            const pricePerToken = BigInt(stage.pricePerTokenUSD);
            const usdRequired = (tokensToBuy * pricePerToken) / BigInt(1e18);
            const ethRequired = (usdRequired * BigInt(1e8)) / ethPriceForCalc;

            // Add 1% buffer for price fluctuations
            const ethWithBuffer = ethRequired + (ethRequired / 100n);

            // Execute transaction with minTokensOut
            const minTokensOut = tokensToBuy;

            const tx = await presaleContract.buyWithETH(referrerAddress, minTokensOut, {
                value: ethWithBuffer,
            });

            await tx.wait();
            return tx.hash;
        } catch (error) {
            if (import.meta.env.DEV) console.error("ETH Purchase Error:", error);
            throw error;
        }
    };

    // Process USDT Purchase
    const processUSDTPurchase = async (referrerAddress) => {
        if (!receiveAmount || isNaN(parseFloat(receiveAmount)) || parseFloat(receiveAmount) <= 0) {
            throw new Error("Invalid MMV amount");
        }

        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            const signer = new JsonRpcSigner(provider, address);

            const presaleContract = new Contract(PRESALE_CONTRACT_ADDRESS, PRESALE_CONTRACT_ABI, signer);
            const usdtContract = new Contract(USDTAddress, USDT_ABI, signer);

            const tokensToBuy = parseUnits(receiveAmount, 18);

            // Validation checks
            const userInfo = await presaleContract.users(address);
            const stageIndex = await presaleContract.currentStage();
            const stage = await presaleContract.stages(stageIndex);
            const maxCap = await presaleContract.maxTokensPerBuyer();

            const userSoFar = BigInt(userInfo.baseTokens);
            const maxAllowed = maxCap - userSoFar;
            const availableInStage = BigInt(stage.tokensToSell);

            if (tokensToBuy > maxAllowed) {
                throw new Error(
                    `You can only purchase up to ${formatNumberWithCommas(
                        formatEther(maxAllowed)
                    )} MMV tokens.`
                );
            }

            if (tokensToBuy > availableInStage) {
                throw new Error(
                    `Only ${formatNumberWithCommas(
                        formatEther(availableInStage)
                    )} MMV tokens left in this stage.`
                );
            }

            // Calculate USDT required
            const pricePerToken = BigInt(stage.pricePerTokenUSD);
            const usdtRequired18 = (tokensToBuy * pricePerToken) / BigInt(1e18);
            const usdtAmountToSend = usdtRequired18 / BigInt(1e12); // Convert to 6 decimals
            const usdtBalanceInWei = BigInt(Math.floor(usdtBalance * 1e6));

            if (usdtBalanceInWei < usdtAmountToSend) {
                throw new Error(
                    `Insufficient USDT! You need at least ${formatTokenAmount(
                        usdtAmountToSend,
                        6
                    )} USDT`
                );
            }

            // Check and set approval
            const currentAllowance = await usdtContract.allowance(address, PRESALE_CONTRACT_ADDRESS);

            if (BigInt(currentAllowance) < usdtAmountToSend) {
                setTotalSteps(2);
                setCurrentStep(1);
                setTransactionStatus("approving");

                const approveTx = await usdtContract.approve(PRESALE_CONTRACT_ADDRESS, usdtAmountToSend);
                await approveTx.wait();

                // Move to step 2
                setCurrentStep(2);
                setTransactionStatus("processing");
            } else {
                // No approval needed, single step
                setTotalSteps(1);
                setCurrentStep(1);
                setTransactionStatus("processing");
            }

            // Execute transaction
            const tx = await presaleContract.buyWithUSDT(usdtAmountToSend, referrerAddress);
            await tx.wait();
            return tx.hash;
        } catch (error) {
            if (import.meta.env.DEV) console.error("USDT Purchase Error:", error);
            throw error;
        }
    };

    // Main purchase process
    const processPurchase = async () => {
        if (!validatePurchaseAmount()) {
            return;
        }

        // Reset steps
        setCurrentStep(1);
        setTotalSteps(1);
        setIsModalOpen(true);
        setTransactionStatus("processing");
        setErrorMessage("");

        try {
            if (!payAmount || parseFloat(payAmount) <= 0) {
                throw new Error("Enter a valid amount");
            }
            const referrerAddress = await fetchReferrer(address);
            let transactionHash;

            if (paymentMethod === "ETH") {
                transactionHash = await processEthPurchase(referrerAddress);
            } else if (paymentMethod === "USDT") {
                transactionHash = await processUSDTPurchase(referrerAddress);
            }

            if (transactionHash) {
                setTransactionStatus("success");
                toast.success("Purchase successful!");

                // Reset form
                setPayAmount("");
                setReceiveAmount("0");
                setBonusAmount("0");
                setTotalAmount("0");

                // Refresh data
                fetchUserPresaleStats();
                updateBalance();
                refreshPresale();
                refreshCapacity();

                // Refresh global stats if callback provided
                if (onPurchaseSuccess) {
                    setTimeout(() => {
                        onPurchaseSuccess();
                    }, 5000);
                }
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error("Transaction failed:", error);
            const errorMsg = parseTxError(error);
            setTransactionStatus("error");
            setErrorMessage(errorMsg);
        }
    };

    return (
        <>
            <div className="mmv-presale-form-card">
                {/* Price Information - More Prominent */}
                <div className="mmv-price-display">
                    <div className="mmv-price-item mmv-current">
                        <span className="mmv-price-label">Current Price</span>
                        <span className="mmv-price-value">1 MMV = ${stagePrice || "0.000"}</span>
                    </div>
                    <div className="mmv-price-divider"></div>
                    <div className="mmv-price-item mmv-next">
                        <span className="mmv-price-label">Next Stage</span>
                        <span className="mmv-price-value">${nextPrice || "0.000"}</span>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="mmv-countdown-timer">
                    <div className="mmv-countdown-label">
                        Stage {currentStage || 1} Ends In:
                        {isExtendedPeriod && isExtendedPeriod() && (
                            <span className="mmv-extended-label">
                                {' '}(Round {getExtensionPeriod ? getExtensionPeriod() : 1})
                            </span>
                        )}
                    </div>
                    <div className="mmv-countdown-boxes">
                        <div className="mmv-time-box">
                            <span className="mmv-time-value">
                                {String(timeLeft.days).padStart(2, '0')}
                            </span>
                            <span className="mmv-time-label">Days</span>
                        </div>
                        <div className="mmv-time-box">
                            <span className="mmv-time-value">
                                {String(timeLeft.hours).padStart(2, '0')}
                            </span>
                            <span className="mmv-time-label">Hours</span>
                        </div>
                        <div className="mmv-time-box">
                            <span className="mmv-time-value">
                                {String(timeLeft.minutes).padStart(2, '0')}
                            </span>
                            <span className="mmv-time-label">Mins</span>
                        </div>
                        <div className="mmv-time-box">
                            <span className="mmv-time-value">
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                            <span className="mmv-time-label">Secs</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div style={{ display: "none" }} className="mmv-progress-section">
                    <div className="mmv-progress-info">
                        <span>Progress</span>
                        <span>{progress || 0}% Complete</span>
                    </div>
                    <div className="mmv-progress-bar">
                        <div className="mmv-progress-fill" style={{ width: `${progress || 0}%` }}>
                            <div className="mmv-progress-glow"></div>
                        </div>
                    </div>
                    {tokensLeft && (
                        <div className="mmv-tokens-left">
                            {tokensLeft} MMV left in this stage
                        </div>
                    )}
                </div>

                {/* User Stats - Only show when connected */}
                {isConnected && parseFloat(userPurchased) > 0 && (
                    <div className="mmv-user-stats">
                        <div className="mmv-stat">
                            <span className="mmv-stat-label">Your $MMV</span>
                            <span className="mmv-stat-value">{formatNumberWithCommas(userPurchased)}</span>
                        </div>
                        <div className="mmv-stat">
                            <span className="mmv-stat-label">Your Bonus</span>
                            <span className="mmv-stat-value">{formatNumberWithCommas(userBonus)}</span>
                        </div>
                    </div>
                )}

                {isConnected && <PurchaseCapacityBadge capacity={capacity} stagePrice={stagePrice} />}

                {/* Payment Methods - Horizontal Layout */}
                <div className="mmv-payment-methods">
                    <button
                        className={`mmv-payment-btn ${paymentMethod === "ETH" ? "mmv-active" : ""}`}
                        onClick={() => handlePaymentMethodChange("ETH")}>
                        <img src={icon_ethereum} alt="ETH" className="mmv-payment-icon" />
                        <span>ETH</span>
                    </button>
                    <button
                        className={`mmv-payment-btn ${paymentMethod === "USDT" ? "mmv-active" : ""}`}
                        onClick={() => handlePaymentMethodChange("USDT")}>
                        <img src={icon_usdt} alt="USDT" className="mmv-payment-icon" />
                        <span>USDT</span>
                    </button>
                    <Link to="/how-to-buy" className="mmv-payment-btn">
                        <img src={icon_card} alt="Card" className="mmv-payment-icon" />
                        <span>CARD</span>
                    </Link>
                </div>

                {/* Balance Display */}
                {isConnected && (
                    <div className="mmv-balance-display">
                        Balance: {paymentMethod === "ETH"
                            ? `${formatEtherBalance(ethBalance)} ETH`
                            : `${formatUsdtBalance(usdtBalance)} USDT`}
                    </div>
                )}

                {/* Input Fields */}
                <div className="mmv-form-inputs">
                    <div className="mmv-input-group">
                        <label>You Pay</label>
                        <div className="mmv-input-wrapper">
                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="0"
                                value={payAmount}
                                onChange={handlePaymentAmountChange}
                            />
                            <button className="mmv-max-btn" onClick={handleMaxAmount}>
                                MAX
                            </button>
                            <div className="mmv-currency-badge">
                                <img
                                    src={paymentMethod === "ETH" ? icon_ethereum : icon_usdt}
                                    alt={paymentMethod}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mmv-input-group">
                        <label>You Receive</label>
                        <div className="mmv-input-wrapper">
                            <input
                                type="text"
                                placeholder="0"
                                value={receiveAmount}
                                readOnly
                            />
                            <div className="mmv-currency-badge">
                                <img src={mmv_logo_round} alt="MMV" className="mmv-mmv-icon" />
                            </div>
                        </div>
                        {parseFloat(bonusAmount) > 0 && (
                            <div className="mmv-bonus-info">
                                <TrendingUp size={14} />
                                <span>+{formatNumberWithCommas(bonusAmount)} Bonus ({bonusPercent}%)</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Total Display */}
                {parseFloat(totalAmount) > 0 && (
                    <div className="mmv-total-display">
                        <span>Total $MMV:</span>
                        <span className="mmv-total-value">{formatNumberWithCommas(totalAmount)}</span>
                    </div>
                )}

                {/* Action Button */}
                <button
                    className="mmv-buy-button"
                    onClick={isConnected ? processPurchase : open}
                    disabled={
                        transactionStatus === "processing" ||
                        connectionStatus === "connecting" ||
                        referralLoading ||
                        capacityLoading ||
                        (capacity && capacity.isAtLimit)
                    }>
                    {isConnected ? (
                        capacity && capacity.isAtLimit ? (
                            <>Wallet Limit Reached</>
                        ) : transactionStatus === "processing" ? (
                            <> <Loader2 className="mmv-spin" size={18} /> Processing...</>
                        ) : (
                            <>Buy $MMV Now</>
                        )
                    ) : connectionStatus === "connecting" ? (
                        <> <Loader2 className="mmv-spin" size={18} /> Connecting</>
                    ) : (
                        <>Connect Wallet</>
                    )}
                </button>

                {/* Referral Link */}
                {isConnected ? (
                    <button className="mmv-referral-button" onClick={copyReferralLink} disabled={referralLoading}>
                        {referralLoading ? (
                            <span className="mmv-referral-text">
                                <Loader2 className="mmv-spin" size={16} /> Generating link...
                            </span>
                        ) : (
                            <>
                                <span className="mmv-referral-text">
                                    metamemevault.com?ref={referralUid || ""}
                                </span>
                                <Copy size={16} />
                            </>
                        )}
                    </button>
                ) : (
                    <button className="mmv-referral-button" onClick={open}>
                        Connect wallet to get referral link
                    </button>
                )}

                {/* Help Links */}
                <div className="mmv-help-links">
                    <Link to="/how-to-buy" className="mmv-help-link">How to buy?</Link>
                    <Link to="/referral" className="mmv-help-link">Referral</Link>
                    <Link to="/help" className="mmv-help-link">Need help?</Link>
                </div>
            </div>

            {/* Transaction Modal */}
            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    // Reset transaction state when closing
                    if (transactionStatus !== "success") {
                        setTransactionStatus("");
                        setErrorMessage("");
                        setCurrentStep(1);
                        setTotalSteps(1);
                    }
                }}
                status={transactionStatus}
                errorMessage={errorMessage}
                currentStep={currentStep}
                totalSteps={totalSteps}
            />
        </>
    );
};

export default PresaleForm;