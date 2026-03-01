import React from "react";
import { Coins, Sparkles, TrendingUp, Lock, ArrowRight } from "lucide-react";
import "../styles/home/what-is.css";
import { bonk_logo, icon_money, icon_profit, neiro_logo, pepe_logo, shib_logo } from "../assets";

const WhatIsMMV = ({ scrollToPresale }) => {
    return (
        <section className="mmv-what-section">
            <div className="mmv-what-bg-gradient"></div>
            <div className="mmv-what-particle mmv-particle-1"></div>
            <div className="mmv-what-particle mmv-particle-2"></div>
            <div className="mmv-what-particle mmv-particle-3"></div>

            <div className="mmv-what-container">
                <div className="mmv-what-wrapper">
                    <div className="mmv-what-content">
                        <div className="mmv-what-header">
                            <div className="mmv-what-badge">
                                <Sparkles size={14} />
                                <span>MEME-TO-EARN PROTOCOL</span>
                            </div>
                            <h2 className="mmv-what-title">
                                What is <span className="mmv-what-gradient">MetaMemeVault?</span>
                            </h2>
                        </div>

                        <div className="mmv-what-description">
                            <p className="mmv-what-lead">
                                MetaMemeVault ($MMV) lets you earn top memecoins by locking your tokens. Buy $MMV in presale, lock them in our MemeTreasury, and earn rewards in NEIRO, SHIB, PEPE, and BONK.
                            </p>
                            <p className="mmv-what-text">
                                Our MemeTreasury vault distributes NEIRO, SHIB, PEPE, and BONK to users who lock their $MMV. No staking pools. No complicated DeFi. Just buy, lock, and earn.
                            </p>
                        </div>

                        <div className="mmv-what-highlight-box">
                            <div className="mmv-what-highlight-glow"></div>
                            <TrendingUp className="mmv-what-highlight-icon" />
                            <div className="mmv-what-highlight-content">
                                <h3>Early Buyer Advantage</h3>
                                <p>Early buyers get up to 200% bonus tokens. Lower stages = bigger rewards. Do your own research. Not financial advice.</p>
                            </div>
                        </div>

                        <div className="mmv-what-features">
                            <div className="mmv-what-feature">
                                <div className="mmv-what-feature-icon">
                                    <img src={icon_money} alt="Earn" />
                                </div>
                                <div className="mmv-what-feature-content">
                                    <h4>Earn Top Memecoins</h4>
                                    <p>Passive income in blue-chip memes</p>
                                </div>
                            </div>
                            <div className="mmv-what-feature">
                                <div className="mmv-what-feature-icon">
                                    <img src={icon_profit} alt="Lock" />
                                </div>
                                <div className="mmv-what-feature-content">
                                    <h4>Choose Your Strategy</h4>
                                    <p>Lock what you want, earn what you need</p>
                                </div>
                            </div>
                        </div>

                        <div className="mmv-what-cta-group">
                            <a href="/whitepaper" target="_blank" className="mmv-what-btn mmv-btn-primary">
                                Read Docs
                                <ArrowRight size={18} />
                            </a>
                            <button onClick={scrollToPresale} className="mmv-what-btn mmv-btn-secondary">
                                Buy $MMV
                                <Sparkles size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="mmv-what-visual">
                        <div className="mmv-what-visual-container">
                            <div className="mmv-what-visual-glow"></div>
                            <div className="mmv-what-center-logo">
                                <div className="mmv-what-logo-pulse"></div>
                            </div>
                            <div className="mmv-what-coins-orbit">
                                {[
                                    { logo: shib_logo, name: "shib" },
                                    { logo: pepe_logo, name: "pepe" },
                                    { logo: neiro_logo, name: "neiro" },
                                    { logo: bonk_logo, name: "bonk" }
                                ].map((coin, index) => (
                                    <div key={index} className={`mmv-what-coin mmv-coin-${index}`}>
                                        <div className="mmv-what-coin-inner">
                                            <img src={coin.logo} alt={coin.name} />
                                            <div className="mmv-what-coin-glow"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhatIsMMV;