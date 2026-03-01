import React, { useState, useEffect, useRef } from "react";
import { Wallet, CreditCard, ShoppingCart, ArrowRight, CheckCircle, Clock, Zap } from "lucide-react"
import "../styles/home/how.css";
import { Link } from "react-router-dom";

const HowToBuySection = ({ scrollToPresale }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const steps = [
        {
            title: "Connect Your Wallet",
            description: "Use MetaMask, Trust Wallet, or any Web3 wallet. New to crypto? No problem—we'll guide you through setting up your first wallet.",
            icon: Wallet,
            color: "from-blue-400 to-cyan-500",
            time: "2 mins",
            tips: [
                "MetaMask recommended",
                "Mobile wallets supported",
                "Beginner friendly"
            ]
        },
        {
            title: "Fund Your Purchase",
            description: "Pay with ETH, USDT, or credit card. Multiple payment options available to make buying $MMV as simple as possible.",
            icon: CreditCard,
            color: "from-green-400 to-emerald-500",
            time: "1 min",
            tips: [
                "Credit card accepted",
                "Crypto payments",
                "Instant processing"
            ]
        },
        {
            title: "Buy & Earn Rewards",
            description: "Choose your $MMV amount, complete purchase, and start earning meme rewards immediately. Your tokens will appear in your wallet.",
            icon: ShoppingCart,
            color: "from-purple-400 to-violet-500",
            time: "30 secs",
            tips: [
                "Instant rewards",
                "Secure transaction",
                "Bonus tiers available"
            ]
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(() => {
                setActiveStep(prev => (prev + 1) % steps.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isVisible, steps.length]);

    return (
        <>
            <section className="htb-section" ref={sectionRef}>
                <div className="htb-bg-wrapper">
                    <div className="htb-grid-pattern"></div>
                    <div className="htb-glow-orb htb-orb-1"></div>
                    <div className="htb-glow-orb htb-orb-2"></div>
                </div>

                <div className="container">
                    <div className="htb-content">
                        <div className="htb-header">
                            <div className="htb-badge">
                                <Zap size={16} />
                                <span>Quick & Easy</span>
                            </div>
                            <h2 className="htb-title">How to Buy $MMV</h2>
                            <p className="htb-subtitle">
                                Get your $MMV tokens in under 5 minutes. Simple process, multiple payment options, instant rewards. No complex steps or hidden fees.
                            </p>

                            <div className="htb-stats">
                                <div className="htb-stat-item">
                                    <span className="htb-stat-value">3</span>
                                    <span className="htb-stat-label">Simple Steps</span>
                                </div>
                                <div className="htb-stat-item">
                                    <span className="htb-stat-value">&lt;5</span>
                                    <span className="htb-stat-label">Minutes</span>
                                </div>
                                <div className="htb-stat-item">
                                    <span className="htb-stat-value">24/7</span>
                                    <span className="htb-stat-label">Available</span>
                                </div>
                            </div>
                        </div>

                        <div className="htb-progress-bar">
                            <div
                                className="htb-progress-fill"
                                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="htb-steps-container">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = index === activeStep;
                                const isCompleted = index < activeStep;

                                return (
                                    <div
                                        key={index}
                                        className={`htb-step-card ${isActive ? 'htb-active' : ''} ${isCompleted ? 'htb-completed' : ''}`}
                                        onClick={() => setActiveStep(index)}
                                        style={{ '--animation-delay': `${index * 0.2}s` }}
                                    >
                                        <div className={`htb-card-glow bg-gradient-to-r ${step.color}`}></div>

                                        <div className="htb-step-number">
                                            {isCompleted ? (
                                                <CheckCircle size={24} />
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>

                                        <div className="htb-time-badge">
                                            <Clock size={12} />
                                            <span>{step.time}</span>
                                        </div>

                                        <div className="htb-step-icon">
                                            <Icon size={40} />
                                        </div>

                                        <div className="htb-step-content">
                                            <h3 className="htb-step-title">{step.title}</h3>
                                            <p className="htb-step-description">{step.description}</p>

                                            <div className="htb-step-tips">
                                                {step.tips.map((tip, tipIndex) => (
                                                    <span key={tipIndex} className="htb-tip-tag">
                                                        {tip}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {index < steps.length - 1 && (
                                            <div className="htb-step-arrow">
                                                <ArrowRight size={24} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="htb-payment-methods">
                            <h3 className="htb-payment-title">Supported Payment Methods</h3>
                            <div className="htb-payment-grid">
                                <div className="htb-payment-item">
                                    <div className="htb-payment-icon">💳</div>
                                    <span>Credit Card</span>
                                </div>
                                <div className="htb-payment-item">
                                    <div className="htb-payment-icon">Ξ</div>
                                    <span>Ethereum</span>
                                </div>
                                <div className="htb-payment-item">
                                    <div className="htb-payment-icon">₮</div>
                                    <span>USDT</span>
                                </div>
                                <div className="htb-payment-item">
                                    <div className="htb-payment-icon">💼</div>
                                    <span>Web3 Wallets</span>
                                </div>
                            </div>
                        </div>

                        <div className="htb-cta-section">
                            <div className="htb-cta-content">
                                <h3>Ready to Get Started?</h3>
                                <p>Join thousands of investors already earning meme rewards with $MMV. The process is simple, secure, and takes less than 5 minutes.</p>

                                <div className="htb-cta-buttons">
                                    <Link to="/how-to-buy" className="htb-primary-btn">
                                        <span>Complete Guide</span>
                                        <ArrowRight size={20} />
                                    </Link>
                                    <button className="htb-secondary-btn" onClick={scrollToPresale}>
                                        Start Buying Now
                                    </button>
                                </div>

                                <div className="htb-trust-indicators">
                                    <div className="htb-trust-item">
                                        <CheckCircle size={16} />
                                        <span>Secure & Verified</span>
                                    </div>
                                    <div className="htb-trust-item">
                                        <CheckCircle size={16} />
                                        <span>Instant Processing</span>
                                    </div>
                                    <div className="htb-trust-item">
                                        <CheckCircle size={16} />
                                        <span>24/7 Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HowToBuySection;