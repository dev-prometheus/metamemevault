import React, { useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp, Users, DollarSign, Star, Flame, Award } from "lucide-react"
import "../styles/home/featured-memes.css";
import { bonk_logo, neiro_logo, pepe_logo, shib_logo } from "../assets";

const featuredMemes = [
    {
        name: "NEIRO",
        symbol: "$NEIRO",
        description: "The legendary successor to Doge with massive community backing. Endorsed by Vitalik Buterin and backed by 100% community ownership.",
        icon: neiro_logo,
        link: "https://www.neiroeth.io/",
        marketCap: "$122.9M",
        holders: "420K+",
        change: "+34.8%",
        rank: "#320",
        isPositive: true,
        isHot: true,
        highlights: ["Vitalik Endorsed", "Community Owned", "$350K+ Donated"],
        color: "from-yellow-400 to-orange-500"
    },
    {
        name: "SHIB",
        symbol: "$SHIB",
        description: "The established Shiba ecosystem with Shibarium L2, significant adoption, and the dedicated 'Shib Army' community driving innovation.",
        icon: shib_logo,
        link: "https://shibatoken.com/",
        marketCap: "$7.18B",
        holders: "1.3M+",
        change: "+2.1%",
        rank: "#22",
        isPositive: true,
        isHot: false,
        highlights: ["Shibarium L2", "ShibaSwap DEX", "Massive Ecosystem"],
        color: "from-orange-400 to-red-500"
    },
    {
        name: "PEPE",
        symbol: "$PEPE",
        description: "The internet's most recognized meme token with strong community support. Zero taxes, burned LP, and significant cultural impact.",
        icon: pepe_logo,
        link: "https://www.pepe.vip/",
        marketCap: "$4.07B",
        holders: "289K+",
        change: "+12.7%",
        rank: "#32",
        isPositive: true,
        isHot: true,
        highlights: ["Zero Taxes", "LP Burned", "Pure Meme"],
        color: "from-green-400 to-blue-500"
    },
    {
        name: "BONK",
        symbol: "$BONK",
        description: "Solana's community champion with 750K+ holders and 150+ integrations. Built for the people, by the people, with explosive growth.",
        icon: bonk_logo,
        link: "https://bonkcoin.com/",
        marketCap: "$1.65B",
        holders: "750K+",
        change: "+8.9%",
        rank: "#61",
        isPositive: true,
        isHot: true,
        highlights: ["Solana Native", "150+ Integrations", "Community First"],
        color: "from-purple-400 to-pink-500"
    },
]

const FeaturedMemes = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [animatedStats, setAnimatedStats] = useState({});

    useEffect(() => {
        // Animate stats on mount
        const animateValue = (start, end, duration, key) => {
            const startTime = performance.now();
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = start + (end - start) * progress;
                setAnimatedStats(prev => ({ ...prev, [key]: current }));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        };

        // Animate key metrics
        animateValue(0, 4, 2000, 'totalTokens');
        animateValue(0, 13.9, 2500, 'combinedValue');
        animateValue(0, 2.8, 3000, 'totalHolders');
    }, []);

    return (
        <>
            <section className="featured-memes-enhanced">
                {/* Background Elements */}
                <div className="fm-bg-wrapper">
                    <div className="fm-grid-pattern"></div>
                    <div className="fm-glow-orb fm-orb-1"></div>
                    <div className="fm-glow-orb fm-orb-2"></div>
                    <div className="fm-floating-particles"></div>
                </div>

                <div className="container">
                    <div className="fm-content-wrapper">
                        {/* Header Section */}
                        <div className="fm-header">
                            <div className="fm-badge">
                                <Star size={16} />
                                <span>Handpicked Champions</span>
                            </div>
                            <h2 className="fm-title">Featured Meme Treasury</h2>
                            <p className="fm-subtitle">
                                The elite squad of battle-tested memecoins that fuel your $MMV rewards.
                                Each one a proven legend with massive communities and explosive potential.
                            </p>

                            {/* Live Treasury Stats */}
                            <div className="fm-stats-bar">
                                <div className="fm-stat">
                                    <div className="fm-stat-icon">
                                        <Award size={20} />
                                    </div>
                                    <div className="fm-stat-content">
                                        <div className="fm-stat-value">
                                            {Math.floor(animatedStats.totalTokens || 0)}
                                        </div>
                                        <div className="fm-stat-label">Elite Tokens</div>
                                    </div>
                                </div>
                                <div className="fm-stat">
                                    <div className="fm-stat-icon">
                                        <DollarSign size={20} />
                                    </div>
                                    <div className="fm-stat-content">
                                        <div className="fm-stat-value">
                                            ${(animatedStats.combinedValue || 0).toFixed(1)}B
                                        </div>
                                        <div className="fm-stat-label">Combined Value</div>
                                    </div>
                                </div>
                                <div className="fm-stat">
                                    <div className="fm-stat-icon">
                                        <Users size={20} />
                                    </div>
                                    <div className="fm-stat-content">
                                        <div className="fm-stat-value">
                                            {(animatedStats.totalHolders || 0).toFixed(1)}M+
                                        </div>
                                        <div className="fm-stat-label">Total Army</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Memes Grid */}
                        <div className="fm-grid">
                            {featuredMemes.map((meme, index) => (
                                <div
                                    key={meme.name}
                                    className={`fm-card ${hoveredCard === index ? 'fm-hovered' : ''}`}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{ '--animation-delay': `${index * 0.15}s` }}
                                >
                                    {/* Card Glow Effect */}
                                    <div className={`fm-card-glow bg-gradient-to-r ${meme.color}`}></div>

                                    {/* Status Badges */}
                                    <div className="fm-badges">
                                        {meme.isHot && (
                                            <div className="fm-badge-hot">
                                                <Flame size={12} />
                                                <span>Hot</span>
                                            </div>
                                        )}
                                        <div className="fm-rank-badge">
                                            {meme.rank}
                                        </div>
                                    </div>

                                    {/* Card Header */}
                                    <div className="fm-card-header">
                                        <div className="fm-icon-wrapper">
                                            <img
                                                src={meme.icon || "/placeholder.svg"}
                                                alt={meme.name}
                                                className="fm-icon"
                                            />
                                            <div className="fm-icon-ring"></div>
                                        </div>
                                        <div className="fm-token-info">
                                            <h3 className="fm-token-name">{meme.name}</h3>
                                            <p className="fm-token-symbol">{meme.symbol}</p>
                                        </div>
                                        <div className={`fm-price-change ${meme.isPositive ? 'positive' : 'negative'}`}>
                                            <TrendingUp size={16} />
                                            <span>{meme.change}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="fm-description">{meme.description}</p>

                                    {/* Key Highlights */}
                                    <div className="fm-highlights">
                                        {meme.highlights.map((highlight, idx) => (
                                            <span key={idx} className="fm-highlight-tag">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Market Data */}
                                    <div className="fm-market-data">
                                        <div className="fm-data-row">
                                            <span className="fm-data-label">Market Cap</span>
                                            <span className="fm-data-value">{meme.marketCap}</span>
                                        </div>
                                        <div className="fm-data-row">
                                            <span className="fm-data-label">Holders</span>
                                            <span className="fm-data-value">{meme.holders}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <a
                                        href={meme.link}
                                        className="fm-cta-btn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span>Explore Project</span>
                                        <ArrowUpRight size={18} />
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Info Section */}
                        <div className="fm-bottom-section">
                            <div className="fm-info-card">
                                <div className="fm-info-header">
                                    <Award size={24} />
                                    <h3>Why These Legends?</h3>
                                </div>
                                <p className="fm-info-text">
                                    We don't mess around when selecting our treasury. These aren't just any memecoins—they're the
                                    absolute legends with proven track records, massive communities, and real staying power.
                                    When you earn rewards in $MMV, you're earning the best of the best.
                                </p>
                                <div className="fm-features">
                                    <div className="fm-feature">
                                        <div className="fm-feature-icon">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div className="fm-feature-content">
                                            <h4>Battle-Tested Performance</h4>
                                            <p>Each token has survived multiple market cycles with proven resilience</p>
                                        </div>
                                    </div>
                                    <div className="fm-feature">
                                        <div className="fm-feature-icon">
                                            <Users size={20} />
                                        </div>
                                        <div className="fm-feature-content">
                                            <h4>Massive Communities</h4>
                                            <p>Combined army of 2.8M+ dedicated holders across all platforms</p>
                                        </div>
                                    </div>
                                    <div className="fm-feature">
                                        <div className="fm-feature-icon">
                                            <Star size={20} />
                                        </div>
                                        <div className="fm-feature-content">
                                            <h4>Expert Curation</h4>
                                            <p>Handpicked by our team for maximum utility and growth potential</p>
                                        </div>
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

export default FeaturedMemes;