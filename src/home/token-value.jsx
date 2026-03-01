import React, { useState } from "react";
import { TrendingUp, Zap, Layers, ChartBar, Coins, Rocket } from "lucide-react";
import "../styles/home/token-value.css";
import { icon_gas, icon_growth, icon_stake } from "../assets";

const TokenValue = () => {
    const [activeTab, setActiveTab] = useState("growth");

    const valueCards = [
        {
            icon: icon_growth,
            title: "Unique Value Proposition",
            description: "First meme-vault on ETH. Earn SHIB, PEPE, NEIRO & BONK just by locking. No complex DeFi needed.",
            gradient: "gradient-1"
        },
        {
            icon: icon_stake,
            title: "Early Stage Advantages",
            description: "Stage 1 buyers get 200% bonus. That's 3x tokens before listing.",
            gradient: "gradient-2"
        },
        {
            icon: icon_gas,
            title: "Future Gas Optimization",
            description: "Post-presale: Use MMV for gas fees on claims. Save ETH for what matters.",
            gradient: "gradient-3"
        }
    ];

    const tabContent = {
        growth: {
            title: "Growth Potential",
            points: [
                "850% price increase from Stage 1 to listing ($0.008 → $0.068)",
                "Pursuing exchange listings to increase accessibility",
                "MemeTreasury creates constant buy pressure",
                "13% of supply locked for rewards distribution",
                "Deflationary mechanics kick in post-launch"
            ]
        },
        rewards: {
            title: "Your Returns Breakdown",
            points: [
                "Stage 1: 200% bonus + 850% listing gains",
                "Passive income from 4 blue-chip memecoins",
                "Referral rewards: 5% of total supply allocated",
                "Compound or claim anytime - you're in control",
                "No impermanent loss like traditional farms"
            ]
        },
        utility: {
            title: "Real Utility Roadmap",
            points: [
                "Q1 2026: MMV gas fee system goes live",
                "Governance voting on treasury allocations",
                "Exclusive access to new meme launches",
                "Staking tiers unlock higher reward multipliers",
                "Cross-chain expansion to BSC and Base"
            ]
        }
    };

    return (
        <section className="mmv-value-section">
            {/* Background effects */}
            <div className="mmv-value-bg-mesh"></div>
            <div className="mmv-value-orb mmv-orb-1"></div>
            <div className="mmv-value-orb mmv-orb-2"></div>

            <div className="mmv-value-container">
                {/* Header */}
                <div className="mmv-value-header">
                    <div className="mmv-value-badge">
                        <Rocket size={14} />
                        <span>TOKEN ECONOMICS</span>
                    </div>
                    <h2 className="mmv-value-title">
                        Why <span className="mmv-value-gradient">$MMV</span> Has Value
                    </h2>
                    <p className="mmv-value-subtitle">
                        Built on sustainable tokenomics and real utility.
                    </p>
                </div>

                {/* Value Cards Grid */}
                <div className="mmv-value-grid">
                    {valueCards.map((card, index) => (
                        <div key={index} className="mmv-value-card">
                            <div className="mmv-value-card-glow"></div>
                            <div className="mmv-value-card-content">
                                <div className={`mmv-value-icon ${card.gradient}`}>
                                    <img src={card.icon} alt={card.title} />
                                </div>
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <div className="mmv-value-card-shine"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs Section */}
                <div className="mmv-value-tabs-section">
                    <div className="mmv-value-tabs">
                        <button
                            className={`mmv-value-tab ${activeTab === 'growth' ? 'active' : ''}`}
                            onClick={() => setActiveTab('growth')}
                        >
                            <ChartBar size={16} />
                            Price Action
                        </button>
                        <button
                            className={`mmv-value-tab ${activeTab === 'rewards' ? 'active' : ''}`}
                            onClick={() => setActiveTab('rewards')}
                        >
                            <Coins size={16} />
                            Returns
                        </button>
                        <button
                            className={`mmv-value-tab ${activeTab === 'utility' ? 'active' : ''}`}
                            onClick={() => setActiveTab('utility')}
                        >
                            <Zap size={16} />
                            Roadmap
                        </button>
                    </div>

                    <div className="mmv-value-tab-content">
                        <div className="mmv-value-tab-panel">
                            <h4>{tabContent[activeTab].title}</h4>
                            <ul className="mmv-value-list">
                                {tabContent[activeTab].points.map((point, index) => (
                                    <li key={index}>
                                        <span className="mmv-value-bullet">▸</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA with real tokenomics */}
                <div className="mmv-value-bottom">
                    <div className="mmv-value-stat-row">
                        <div className="mmv-value-stat">
                            <span className="mmv-value-stat-label">Total Supply</span>
                            <span className="mmv-value-stat-value">1B MMV</span>
                        </div>
                        <div className="mmv-value-stat">
                            <span className="mmv-value-stat-label">Current Stage</span>
                            <span className="mmv-value-stat-value">$0.008</span>
                        </div>
                        <div className="mmv-value-stat">
                            <span className="mmv-value-stat-label">Listing Price</span>
                            <span className="mmv-value-stat-value">$0.068</span>
                        </div>
                        <div className="mmv-value-stat">
                            <span className="mmv-value-stat-label">Potential ROI</span>
                            <span className="mmv-value-stat-value">2,450%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TokenValue;