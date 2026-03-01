import React, { useState, useEffect } from 'react';
import { TrendingUp, Lock, X } from 'lucide-react';
import '../styles/activity-notification.css';

// Token logos mapping
const TOKEN_LOGOS = {
    mmv: '💎',
    shib: '🐕',
    pepe: '🐸',
    bonk: '🦴',
    neiro: '🐾' 
};

const ActivityNotification = ({ notification, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        setTimeout(() => setIsVisible(true), 10);

        // Auto-close after 6 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for exit animation
        }, 6000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatAmount = (amount) => {
        if (amount >= 1000000) {
            return `${(amount / 1000000).toFixed(1)}M`;
        }
        if (amount >= 1000) {
            return `${(amount / 1000).toFixed(1)}k`;
        }
        return amount.toFixed(0);
    };

    const { type, address, mmvAmount, usdAmount, memeToken, memeAmount } = notification;

    return (
        <div className={`activity-notif ${isVisible ? 'show' : ''}`}>
            <div className="activity-notif-glow"></div>

            <div className="activity-notif-content">
                <div className="activity-notif-icon">
                    {type === 'buy' ? (
                        <TrendingUp size={20} />
                    ) : (
                        <Lock size={20} />
                    )}
                </div>

                <div className="activity-notif-details">
                    {type === 'buy' ? (
                        <>
                            <div className="activity-notif-address">{formatAddress(address)}</div>
                            <div className="activity-notif-action">
                                bought <span className="highlight">{formatAmount(mmvAmount)} $MMV</span>
                                <span className="usd-amount">(${usdAmount?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })})</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="activity-notif-address">{formatAddress(address)}</div>
                            <div className="activity-notif-action">
                                locked <span className="highlight">{formatAmount(mmvAmount)} $MMV</span>
                            </div>
                            <div className="activity-notif-reward">
                                to earn {TOKEN_LOGOS[memeToken]} <span className="highlight">{formatAmount(memeAmount)} ${memeToken?.toUpperCase()}</span>
                            </div>
                        </>
                    )}
                </div>

                <button
                    className="activity-notif-close"
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    aria-label="Close notification">
                    <X size={16} />
                </button>
            </div>

            <div className="activity-notif-progress"></div>
        </div>
    );
};

export default ActivityNotification;