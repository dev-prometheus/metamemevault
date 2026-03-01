import React, { useState, useEffect, useRef } from "react";
import { Share2, Gift, TrendingUp, DollarSign, Star, Copy, ArrowRight, Zap } from "lucide-react"
import "../styles/home/referral.css";
import { Link } from "react-router-dom";

const referralBenefits = [
    {
        icon: Gift,
        title: "5% Instant Rewards",
        description: "Get 5% in $MMV tokens for each friend who purchases through your referral link. Payments are instant, no waiting period.",
        highlight: "Instant Payment",
        color: "from-green-400 to-emerald-500"
    },
    {
        icon: TrendingUp,
        title: "No Earning Limits", 
        description: "There's no cap on referral rewards. The more people you invite, the more $MMV tokens you earn.",
        highlight: "Unlimited",
        color: "from-blue-400 to-cyan-500"
    },
    {
        icon: Share2,
        title: "Easy Link Sharing",
        description: "Get your personal referral link instantly. Share it on social media, Discord, Telegram, or anywhere your network is active.",
        highlight: "One-Click",
        color: "from-purple-400 to-violet-500"
    }
];

const ReferralHome = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredBenefit, setHoveredBenefit] = useState(null);
    const sectionRef = useRef(null);

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

    return (
        <>
            <section className="ref-section" ref={sectionRef}>
                {/* Background Elements */}
                <div className="ref-bg-wrapper">
                    <div className="ref-grid-pattern"></div>
                    <div className="ref-glow-orb ref-orb-1"></div>
                    <div className="ref-glow-orb ref-orb-2"></div>
                </div>

                <div className="container">
                    <div className="ref-content">
                        {/* Header */}
                        <div className="ref-header">
                            <div className="ref-badge">
                                <Share2 size={16} />
                                <span>Network & Earn</span>
                            </div>
                            <h2 className="ref-title">Referral Program</h2>
                            <p className="ref-subtitle">
                                Invite friends to join the presale and earn 5% in $MMV tokens for every purchase. 
                                Simple referral system with instant rewards and no earning limits.
                            </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="ref-benefits-grid">
                            {referralBenefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <div 
                                        key={index}
                                        className={`ref-benefit-card ${hoveredBenefit === index ? 'ref-hovered' : ''}`}
                                        onMouseEnter={() => setHoveredBenefit(index)}
                                        onMouseLeave={() => setHoveredBenefit(null)}
                                        style={{'--animation-delay': `${index * 0.2}s`}}
                                    >
                                        {/* Card Glow */}
                                        <div className={`ref-card-glow bg-gradient-to-r ${benefit.color}`}></div>
                                        
                                        {/* Highlight Badge */}
                                        <div className="ref-highlight-badge">
                                            <Star size={12} />
                                            <span>{benefit.highlight}</span>
                                        </div>

                                        {/* Icon */}
                                        <div className="ref-benefit-icon">
                                            <Icon size={32} />
                                        </div>

                                        {/* Content */}
                                        <h3 className="ref-benefit-title">{benefit.title}</h3>
                                        <p className="ref-benefit-description">{benefit.description}</p>

                                        {/* Progress Indicator */}
                                        <div className="ref-benefit-progress">
                                            <div className="ref-progress-bar">
                                                <div 
                                                    className="ref-progress-fill"
                                                    style={{width: isVisible ? '100%' : '0%'}}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Section */}
                        <div className="ref-cta-section">
                            <div className="ref-cta-card">
                                <div className="ref-cta-content">
                                    <div className="ref-cta-icon">
                                        <Zap size={48} />
                                    </div>
                                    <h3>Get Your Referral Link</h3>
                                    <p>
                                        Start earning $MMV tokens by sharing your personalized referral link. 
                                        Each successful referral earns you 5% in tokens with no limits on earnings.
                                    </p>
                                    
                                    <div className="ref-cta-features">
                                        <div className="ref-feature-item">
                                            <Copy size={16} />
                                            <span>Personal referral link</span>
                                        </div>
                                        <div className="ref-feature-item">
                                            <DollarSign size={16} />
                                            <span>5% reward per referral</span>
                                        </div>
                                        <div className="ref-feature-item">
                                            <TrendingUp size={16} />
                                            <span>No earning limits</span>
                                        </div>
                                    </div>

                                    <Link to="/referral" className="ref-cta-button">
                                        <span>Get Your Referral Link</span>
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ReferralHome;