import React, { useState, useEffect, useRef } from "react";
import { PieChart, TrendingUp, Lock, Users, Zap, Gift, DollarSign, Shield } from "lucide-react"
import "../styles/home/tokenomics.css";

const tokenAllocations = [
    {
        title: "Presale",
        percentage: 40,
        icon: DollarSign,
        color: "from-blue-400 to-blue-600",
        description: "Preferential rates for early participants. Get in before the masses with best pricing and exclusive bonuses.",
        benefits: ["Best Pricing", "Bonus Rewards", "Priority Access"]
    },
    {
        title: "Bonus Rewards",
        percentage: 22,
        icon: Gift,
        color: "from-purple-400 to-purple-600",
        description: "Bonuses for early adopters and loyal community members. The earlier you join, the bigger the rewards.",
        benefits: ["Tier Bonuses", "Early Adopter Perks", "Loyalty Rewards"]
    },
    {
        title: "MemeTreasury",
        percentage: 13,
        icon: Zap,
        color: "from-yellow-400 to-orange-500",
        description: "The engine that powers your rewards. Allocated to distribute SHIB, PEPE, NEIRO, and BONK to holders.",
        benefits: ["Auto Rewards", "Multi-Token", "Sustainable"]
    },
    {
        title: "Liquidity",
        percentage: 10,
        icon: TrendingUp,
        color: "from-green-400 to-emerald-500",
        description: "Stable trading foundation across major exchanges. Transparent liquidity management for smooth trading.",
        benefits: ["Deep Liquidity", "Stable Price", "Major Exchanges"]
    },
    {
        title: "Team & Development",
        percentage: 7,
        icon: Users,
        color: "from-indigo-400 to-indigo-600",
        description: "Locked with vesting schedule. Team gets paid when project succeeds—complete alignment with your success.",
        benefits: ["Vested Tokens", "Long-term Commitment", "Aligned Interests"]
    },
    {
        title: "Marketing",
        percentage: 6,
        icon: Zap,
        color: "from-pink-400 to-red-500",
        description: "Strategic growth plan to expand in the meme token market. Influencer partnerships, campaigns, and community growth.",
        benefits: ["Viral Marketing", "Influencer Network", "Mass Adoption"]
    },
    {
        title: "Referral",
        percentage: 2,
        icon: Gift,
        color: "from-cyan-400 to-blue-500",
        description: "Community-driven growth rewards. Bring your friends and earn together—everyone wins in the MMV ecosystem.",
        benefits: ["Community Rewards", "Referral Bonuses", "Network Effects"]
    },
];

const tokenInfo = [
    { label: "Token Name", value: "MetaMemeVault", icon: Shield },
    { label: "Symbol", value: "$MMV", icon: Zap },
    { label: "Total Supply", value: "1B Tokens", icon: PieChart },
    { label: "Blockchain", value: "Ethereum", icon: Lock },
]

const Tokenomics = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [animatedPercentages, setAnimatedPercentages] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isVisible && Object.keys(animatedPercentages).length === 0) {
            // Animate percentages when visible
            tokenAllocations.forEach((allocation, index) => {
                setTimeout(() => {
                    const animateValue = (start, end, duration, key) => {
                        const startTime = performance.now();
                        const animate = (currentTime) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeProgress = 1 - Math.pow(1 - progress, 3);
                            const current = start + (end - start) * easeProgress;
                            setAnimatedPercentages(prev => ({ ...prev, [key]: current }));
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        };
                        requestAnimationFrame(animate);
                    };
                    animateValue(0, allocation.percentage, 1500, allocation.title);
                }, index * 200);
            });
        }
    }, [isVisible]);

    return (
        <>
            <section id="tokenomics" className="tk-section" ref={sectionRef}>
                {/* Background Elements */}
                <div className="tk-bg-wrapper">
                    <div className="tk-grid-pattern"></div>
                    <div className="tk-glow-orb tk-orb-1"></div>
                    <div className="tk-glow-orb tk-orb-2"></div>
                </div>

                <div className="container">
                    <div className="tk-content">
                        {/* Header */}
                        <div className="tk-header">
                            <div className="tk-badge">
                                <PieChart size={16} />
                                <span>Fair Distribution</span>
                            </div>
                            <h2 className="tk-title">Tokenomics Breakdown</h2>
                            <p className="tk-subtitle">
                                Carefully designed for maximum sustainability, fair distribution, and explosive growth.
                                Every allocation serves a purpose in building the ultimate meme ecosystem.
                            </p>
                        </div>

                        {/* Token Info Cards */}
                        <div className="tk-info-grid">
                            {tokenInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <div
                                        key={index}
                                        className="tk-info-card"
                                        style={{ '--animation-delay': `${index * 0.1}s` }}>
                                        <div className="tk-info-icon">
                                            <Icon size={24} />
                                        </div>
                                        <div className="tk-info-content">
                                            <span className="tk-info-label">{info.label}</span>
                                            <span className="tk-info-value">{info.value}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Distribution Visualization */}
                        <div className="tk-distribution">
                            <h3 className="tk-distribution-title">Supply Distribution</h3>

                            {/* Main Progress Ring */}
                            <div className="tk-chart-container">
                                <div className="tk-progress-ring">
                                    <svg className="tk-ring-svg" viewBox="0 0 200 200">
                                        <defs>
                                            <linearGradient id="tkGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#4b5ae4" />
                                                <stop offset="100%" stopColor="#6d7aff" />
                                            </linearGradient>
                                            <linearGradient id="tkGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#894be4" />
                                                <stop offset="100%" stopColor="#a855f7" />
                                            </linearGradient>
                                        </defs>
                                        {tokenAllocations.map((allocation, index) => {
                                            const radius = 80;
                                            const circumference = 2 * Math.PI * radius;
                                            const offset = tokenAllocations.slice(0, index).reduce((sum, alloc) => sum + alloc.percentage, 0);
                                            const dashArray = `${(allocation.percentage / 100) * circumference} ${circumference}`;
                                            const dashOffset = -((offset / 100) * circumference);

                                            return (
                                                <circle
                                                    key={allocation.title}
                                                    cx="100"
                                                    cy="100"
                                                    r={radius}
                                                    fill="none"
                                                    stroke={index % 2 === 0 ? "url(#tkGradient1)" : "url(#tkGradient2)"}
                                                    strokeWidth="12"
                                                    strokeDasharray={dashArray}
                                                    strokeDashoffset={dashOffset}
                                                    className="tk-ring-segment"
                                                    style={{
                                                        '--animation-delay': `${index * 0.2}s`,
                                                        opacity: isVisible ? 1 : 0,
                                                        transform: isVisible ? 'scale(1)' : 'scale(0.8)'
                                                    }}
                                                />
                                            );
                                        })}
                                    </svg>
                                    <div className="tk-chart-center">
                                        <div className="tk-center-content">
                                            <span className="tk-center-value">1B</span>
                                            <span className="tk-center-label">$MMV Tokens</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Allocation Cards */}
                        <div className="tk-allocations-grid">
                            {tokenAllocations.map((allocation, index) => {
                                const Icon = allocation.icon;
                                const animatedPercentage = animatedPercentages[allocation.title] || 0;

                                return (
                                    <div
                                        key={allocation.title}
                                        className={`tk-allocation-card ${hoveredCard === index ? 'tk-hovered' : ''}`}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{ '--card-delay': `${index * 0.1}s` }}
                                    >
                                        {/* Card Glow */}
                                        <div className={`tk-card-glow bg-gradient-to-r ${allocation.color}`}></div>

                                        {/* Card Header */}
                                        <div className="tk-card-header">
                                            <div className="tk-card-icon">
                                                <Icon size={24} />
                                            </div>
                                            <div className="tk-card-title-section">
                                                <h4 className="tk-card-title">{allocation.title}</h4>
                                                <div className="tk-percentage-display">
                                                    <span className="tk-percentage">
                                                        {Math.round(animatedPercentage)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="tk-progress-container">
                                            <div
                                                className="tk-progress-bar"
                                                style={{
                                                    width: `${animatedPercentage}%`,
                                                    background: `linear-gradient(90deg, var(--primary-color), var(--primary-color-2))`
                                                }}
                                            />
                                        </div>

                                        {/* Description */}
                                        <p className="tk-card-description">{allocation.description}</p>

                                        {/* Benefits */}
                                        <div className="tk-benefits">
                                            {allocation.benefits.map((benefit, idx) => (
                                                <span key={idx} className="tk-benefit-tag">
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Token Amount */}
                                        <div className="tk-token-amount">
                                            <span className="tk-amount-value">
                                                {(allocation.percentage * 10).toFixed(0)}M
                                            </span>
                                            <span className="tk-amount-label">$MMV Tokens</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Info */}
                        <div className="tk-bottom-section">
                            <div className="tk-trust-indicators">
                                <div className="tk-trust-item">
                                    <Lock size={24} />
                                    <div className="tk-trust-content">
                                        <h4>Locked Liquidity</h4>
                                        <p>LP tokens permanently burned for maximum security</p>
                                    </div>
                                </div>
                                <div className="tk-trust-item">
                                    <Shield size={24} />
                                    <div className="tk-trust-content">
                                        <h4>Team Vesting</h4>
                                        <p>Team tokens locked with gradual release schedule</p>
                                    </div>
                                </div>
                                <div className="tk-trust-item">
                                    <TrendingUp size={24} />
                                    <div className="tk-trust-content">
                                        <h4>Sustainable Growth</h4>
                                        <p>Designed for long-term value creation and community rewards</p>
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

export default Tokenomics;