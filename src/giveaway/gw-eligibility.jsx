import { useState } from "react";
import { Lock, Check, AlertCircle, Wallet, ShoppingCart, Zap, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const GiveawayEligibility = ({
    isConnected,
    isEligible,
    isEntered,
    isEntering,
    purchaseValue,
    amountNeeded,
    minRequired,
    onConnect,
    onEnter,
    onSuccess
}) => {
    const handleEnterClick = async () => {
        const result = await onEnter();
        
        if (result.success) {
            toast.success('Successfully entered giveaway! 🎉', {
                style: {
                    background: 'linear-gradient(135deg, #4b5ae4, #6d7aff)',
                    color: '#fff',
                }
            });
            onSuccess();
        } else {
            toast.error(result.error || 'Failed to enter giveaway', {
                style: {
                    background: '#ef4444',
                    color: '#fff',
                }
            });
        }
    };

    return (
        <section id="gw-entry-section" className="gw-eligibility">
            <div className="gw-eligibility-card">
                {!isConnected ? (
                    // Not connected
                    <div className="gw-eligibility-content">
                        <div className="gw-eligibility-icon locked">
                            <Wallet size={48} />
                        </div>
                        <h3 className="gw-eligibility-title">Connect Wallet to Enter</h3>
                        <p className="gw-eligibility-desc">
                            Connect your wallet to enter the $350K giveaway
                        </p>
                        <button className="gw-entry-btn" onClick={onConnect}>
                            <Wallet size={20} />
                            Connect Wallet
                        </button>
                    </div>
                ) : isEntered ? (
                    // Already entered
                    <div className="gw-eligibility-content success">
                        <div className="gw-eligibility-icon success">
                            <Check size={48} />
                        </div>
                        <h3 className="gw-eligibility-title">You're In! 🎉</h3>
                        <p className="gw-eligibility-desc">
                          Complete tasks below to boost your points and move up the leaderboard
                        </p>
                        <div className="gw-entry-indicator">
                            <Zap size={18} />
                            <span>Active Participant</span>
                        </div>
                    </div>
                ) : !isEligible ? (
                    // Not eligible (under $50)
                    <div className="gw-eligibility-content">
                        <div className="gw-eligibility-icon locked">
                            <Lock size={48} />
                        </div>
                        <h3 className="gw-eligibility-title"> Unlock $350K Entry</h3>
            
                          <div className="gw-progress-section">
                            <div className="gw-progress-bar">
                                <div 
                                    className="gw-progress-fill" 
                                    style={{ width: `${Math.min((purchaseValue / minRequired) * 100, 100)}%` }}
                                ></div>
                            </div>
                            <div className="gw-progress-text">
                                <span className="current">${purchaseValue.toFixed(2)}</span>
                                <span className="separator">/</span>
                                <span className="required">${minRequired} needed</span>
                            </div>
                        </div>

                        <div className="gw-unlock-message">
                            <TrendingUp size={18} className="gw-unlock-icon" />
                            <div className="gw-unlock-text">
                                <strong>${amountNeeded.toFixed(2)} more</strong> to compete for top prize of $75K
                            </div>
                        </div>

                        <a href="/" className="gw-entry-btn">
                            <ShoppingCart size={20} />
                            Buy $MMV to Enter
                        </a>
                    </div>
                ) : (
                    // Eligible but not entered yet
                    <div className="gw-eligibility-content">
                        <div className="gw-eligibility-icon ready">
                            <Check size={48} />
                        </div>
                        <h3 className="gw-eligibility-title">You're Eligible! ✨</h3>
                        <p className="gw-eligibility-desc">
                            You have ${purchaseValue.toFixed(2)} in $MMV. Click below to enter and compete for prizes.
                        </p>

                        <button 
                            className="gw-entry-btn" 
                            onClick={handleEnterClick}
                            disabled={isEntering}>
                            {isEntering ? (
                                <>
                                    <div className="gw-spinner"></div>
                                    Entering...
                                </>
                            ) : (
                                <>
                                    <Zap size={20} />
                                    Enter Giveaway Now
                                </>
                            )}
                        </button>

                        <p className="gw-eligibility-note">
                            Free to enter • No hidden fees • Fully transparent
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GiveawayEligibility;