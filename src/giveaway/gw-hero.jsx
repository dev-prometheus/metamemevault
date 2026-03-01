import { useState, useEffect } from "react";
import { Gift, Zap, TrendingUp, Wallet } from "lucide-react";
import { useCountdown } from "../hooks/use_countdown";

const GiveawayHero = ({ isConnected, onConnect }) => {

    const timeLeft = useCountdown('2026-04-07T23:59:59Z', 1000);

    const scrollToEntry = () => {
        document.getElementById('gw-entry-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    return (
        <section className="gw-hero">
            {/* Background Effects */}
            <div className="gw-hero-bg">
                <div className="gw-orb gw-orb-1"></div>
                <div className="gw-orb gw-orb-2"></div>
                <div className="gw-orb gw-orb-3"></div>
                <div className="gw-grid"></div>
            </div>

            <div className="gw-hero-content">
                {/* Active Badge */}
                <div className="gw-hero-badge">
                    <Gift className="gw-badge-icon" />
                    <span>ENDING APR 7 - {timeLeft.days} DAYS LEFT</span>
                </div>

                {/* Main Title */}
                <h1 className="gw-hero-title">
                    Win Up To
                    <span className="gw-gradient-text"> $75K USDT</span>
                </h1>

                <p className="gw-hero-subtitle">
                    $350K prize pool • 110+ winners
                </p>

                {/* Countdown Timer */}
                <div className="gw-countdown">
                    <div className="gw-countdown-item">
                        <span className="gw-countdown-value">{timeLeft.days}</span>
                        <span className="gw-countdown-label">Days</span>
                    </div>
                    <div className="gw-countdown-separator">:</div>
                    <div className="gw-countdown-item">
                        <span className="gw-countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="gw-countdown-label">Hours</span>
                    </div>
                    <div className="gw-countdown-separator">:</div>
                    <div className="gw-countdown-item">
                        <span className="gw-countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="gw-countdown-label">Minutes</span>
                    </div>
                    <div className="gw-countdown-separator">:</div>
                    <div className="gw-countdown-item">
                        <span className="gw-countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="gw-countdown-label">Seconds</span>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="gw-hero-actions">
                    {isConnected ? (
                        <button className="gw-cta-btn primary" onClick={scrollToEntry}>
                            <TrendingUp size={20} />
                            Check My Points
                        </button>
                    ) : (
                        <button className="gw-cta-btn primary" onClick={onConnect}>
                            <Wallet size={20} />
                            Connect Wallet to Enter
                        </button>
                    )}
                    <a href="#prizes" className="gw-cta-btn secondary">
                        <Gift size={20} />
                        View Prizes
                    </a>
                </div>

                {/* Trust Indicators */}
                <div className="gw-hero-features">
                    <div className="gw-feature-item">
                        <Zap className="gw-feature-icon" />
                        <span>Verified on-chain</span>
                    </div>
                    <div className="gw-feature-item">
                        <Gift className="gw-feature-icon" />
                        <span>Fair & transparent</span>
                    </div>
                    <div className="gw-feature-item">
                        <TrendingUp className="gw-feature-icon" />
                        <span>Live leaderboard</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiveawayHero;