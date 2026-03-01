import { ArrowRight, Lock, Rocket, Gift, Coins, Zap, Globe, TrendingUp, Clock } from "lucide-react";
import "../styles/home/meme-treasury.css";
import { bonk_logo, neiro_logo, pepe_logo, shib_logo } from "../assets";
import { Link } from "react-router-dom";

const CURRENT_REWARDS = [
    { name: "NEIRO", icon: neiro_logo, apy: "Variable" },
    { name: "SHIB", icon: shib_logo, apy: "Variable" },
    { name: "PEPE", icon: pepe_logo, apy: "Variable" },
    { name: "BONK", icon: bonk_logo, apy: "Variable" },
];

const FUTURE_NETWORKS = [
    { name: "TON", status: "Q2 2026" },
    { name: "SOL", status: "Q2 2026" },
    { name: "Base", status: "Q3 2026" },
    { name: "BNB", status: "Q3 2026" }
];

const MemeTreasuryHome = () => {
    return (
        <section className="mmv-treasury-section">
            {/* Background effects */}
            <div className="mmv-treasury-bg-mesh"></div>
            <div className="mmv-treasury-orb mmv-treasury-orb-1"></div>
            <div className="mmv-treasury-orb mmv-treasury-orb-2"></div>
            
            <div className="mmv-treasury-container">
                {/* Header */}
                <div className="mmv-treasury-header">
                    <div className="mmv-treasury-badge">
                        <Coins size={14} />
                        <span>PASSIVE INCOME VAULT</span>
                    </div>
                    
                    <h2 className="mmv-treasury-title">
                        <span className="mmv-treasury-gradient">MemeTreasury</span>
                    </h2>
                    
                    <p className="mmv-treasury-subtitle">
                        Lock MMV. Earn memes. Simple as that.
                    </p>
                    
                    <div className="mmv-treasury-intro">
                        <h3>The Vault That Pays You In Memes</h3> 
                        <p>
                            Stake your MMV and earn the top memecoins automatically. 
                            No complex farming. No impermanent loss. Just pure meme rewards.
                        </p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="mmv-treasury-grid">
                    {/* Current Rewards Card */}
                    <div className="mmv-treasury-rewards-card">
                        <div className="mmv-treasury-card-glow"></div>
                        <div className="mmv-treasury-card-content">
                            <div className="mmv-treasury-card-header">
                                <Gift size={24} />
                                <h3>Live Rewards</h3>
                                <span className="mmv-treasury-network-badge">
                                    <Zap size={12} /> ETH
                                </span>
                            </div>
                            
                            <div className="mmv-treasury-coins-grid">
                                {CURRENT_REWARDS.map((coin, index) => (
                                    <div key={coin.name} className="mmv-treasury-coin" style={{animationDelay: `${index * 0.1}s`}}>
                                        <div className="mmv-treasury-coin-icon">
                                            <img src={coin.icon} alt={coin.name} />
                                            <div className="mmv-treasury-coin-glow"></div>
                                        </div>
                                        <span className="mmv-treasury-coin-name">{coin.name}</span>
                                        <span className="mmv-treasury-coin-apy">{coin.apy}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mmv-treasury-reward-info">
                                <Clock size={14} />
                                <span>Claims open 3 days after presale ends</span>
                            </div>
                        </div>
                    </div>

                    {/* How It Works */}
                    <div className="mmv-treasury-steps">
                        <h3 className="mmv-treasury-steps-title">How It Works</h3>
                        
                        <div className="mmv-treasury-step">
                            <div className="mmv-treasury-step-number">1</div>
                            <div className="mmv-treasury-step-content">
                                <h4>Buy & Lock</h4>
                                <p>Purchase MMV in presale and lock in the treasury</p>
                            </div>
                        </div>
                        
                        <div className="mmv-treasury-step">
                            <div className="mmv-treasury-step-number">2</div>
                            <div className="mmv-treasury-step-content">
                                <h4>Pick Your Memes</h4>
                                <p>Choose which memecoins you want to earn</p>
                            </div>
                        </div>
                        
                        <div className="mmv-treasury-step">
                            <div className="mmv-treasury-step-number">3</div>
                            <div className="mmv-treasury-step-content">
                                <h4>Stack & Chill</h4>
                                <p>Sit back and watch your meme portfolio grow</p>
                            </div>
                        </div>
                    </div>

                    {/* Future Expansion */}
                    <div className="mmv-treasury-expansion">
                        <div className="mmv-treasury-expansion-header">
                            <Rocket size={20} />
                            <h3>Multi-Chain Alpha</h3>
                        </div>
                        
                        <p className="mmv-treasury-expansion-text">
                            MemeTreasury is going cross-chain. Earn memes on every major network.
                        </p>
                        
                        <div className="mmv-treasury-networks">
                            <h4>
                                <Globe size={16} />
                                Coming Soon
                            </h4>
                            <div className="mmv-treasury-network-list">
                                {FUTURE_NETWORKS.map((network) => (
                                    <div key={network.name} className="mmv-treasury-network-item">
                                        <span className="mmv-treasury-network-name">{network.name}</span>
                                        <span className="mmv-treasury-network-status">{network.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mmv-treasury-future-tokens">
                            <h4>
                                <TrendingUp size={16} />
                                Next Memes
                            </h4>
                            <div className="mmv-treasury-token-tags">
                                <span className="mmv-treasury-token-tag">$DEGEN</span>
                                <span className="mmv-treasury-token-tag">$WIF</span>
                                <span className="mmv-treasury-token-tag">$TRUMP</span>
                                <span className="mmv-treasury-token-tag">+More</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mmv-treasury-stats">
                    <div className="mmv-treasury-stat">
                        <span className="mmv-treasury-stat-label">Treasury Allocation</span>
                        <span className="mmv-treasury-stat-value">13%</span>
                    </div>
                    <div className="mmv-treasury-stat">
                        <span className="mmv-treasury-stat-label">Of Total Supply</span>
                        <span className="mmv-treasury-stat-value">130M MMV</span>
                    </div>
                    <div className="mmv-treasury-stat">
                        <span className="mmv-treasury-stat-label">For Rewards</span>
                        <span className="mmv-treasury-stat-value">100%</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="mmv-treasury-cta">
                    <Link to="/memetreasury" className="mmv-treasury-cta-button">
                        <span>Explore Full Treasury</span>
                        <ArrowRight size={18} />
                        <span className="mmv-treasury-button-glow"></span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MemeTreasuryHome;