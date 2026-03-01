import { 
    PieChart as PieIcon, 
    Coins, 
    Gift,
    Clock,
    Zap
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const tokenData = [
    { name: "Presale", value: 40, color: "#4b5ae4" },
    { name: "Bonus Pool", value: 22, color: "#6574ff" },
    { name: "Treasury", value: 13, color: "#8490ff" },
    { name: "Liquidity", value: 10, color: "#a3acff" },
    { name: "Team", value: 7, color: "#c2c8ff" },
    { name: "Marketing", value: 6, color: "#e1e4ff" },
    { name: "Referrals", value: 2, color: "#f0f1ff" } 
]

const presaleStages = [
    { stage: 1, price: 0.008, bonus: 200, tokens: "48M", raised: "$384K", status: "live" },
    { stage: 2, price: 0.012, bonus: 90, tokens: "64M", raised: "$768K", status: "upcoming" },
    { stage: 3, price: 0.018, bonus: 45, tokens: "72M", raised: "$1.3M", status: "upcoming" },
    { stage: 4, price: 0.025, bonus: 22, tokens: "88M", raised: "$2.2M", status: "upcoming" },
    { stage: 5, price: 0.035, bonus: 11.25, tokens: "128M", raised: "$4.5M", status: "upcoming" }
]

const WhitepaperTokenomics = () => {
    return (
        <>
            {/* Tokenomics */}
            <section className="wp-tokenomics">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        The Money Talk 
                        <span className="wp-emoji">💰</span>
                    </h2>

                    <div className="wp-token-intro">
                        <p className="wp-lead">
                            Let's talk numbers. Real numbers. Not "maybe someday" promises, 
                            but exactly how your investment turns into passive income.
                        </p>
                    </div>

                    <div className="wp-token-main">
                        <div className="wp-token-specs">
                            <h3>The Basics</h3>
                            <div className="wp-spec-list">
                                <div className="wp-spec-item">
                                    <span className="wp-spec-label">Total Supply</span>
                                    <span className="wp-spec-value">1,000,000,000 MMV</span>
                                </div>
                                <div className="wp-spec-item">
                                    <span className="wp-spec-label">Network</span>
                                    <span className="wp-spec-value">Ethereum (ERC-20)</span>
                                </div>
                                <div className="wp-spec-item">
                                    <span className="wp-spec-label">Presale Target</span>
                                    <span className="wp-spec-value">$9.13M</span>
                                </div>
                                <div className="wp-spec-item">
                                    <span className="wp-spec-label">Starting Price</span>
                                    <span className="wp-spec-value">$0.008</span>
                                </div>
                                <div className="wp-spec-item">
                                    <span className="wp-spec-label">Listing Price</span>
                                    <span className="wp-spec-value">$0.068</span>
                                </div>
                            </div>
                        </div>

                        <div className="wp-token-chart">
                            <h3>Token Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={tokenData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {tokenData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            
                            <div className="wp-chart-legend">
                                {tokenData.map((item, index) => (
                                    <div key={index} className="wp-legend-item">
                                        <span 
                                            className="wp-legend-color" 
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="wp-legend-name">{item.name}</span>
                                        <span className="wp-legend-value">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="wp-token-breakdown">
                        <h3>Where Every Token Goes</h3>
                        <div className="wp-breakdown-grid">
                            <div className="wp-breakdown-card">
                                <Coins className="wp-breakdown-icon" />
                                <h4>40% Presale</h4>
                                <p>
                                    40% allocated to presale investors who receive up to 200% bonus tokens. 
                                    Early stages get the lowest prices before DEX listing at $0.068.
                                </p>
                            </div>
                            <div className="wp-breakdown-card">
                                <Gift className="wp-breakdown-icon" />
                                <h4>22% Bonus Rewards</h4>
                                <p>
                                    22% reserved for bonus tokens. Stage 1 investors get 200% bonus (3X total). 
                                    Later stages receive smaller bonuses, rewarding early commitment.
                                </p>
                            </div>
                            <div className="wp-breakdown-card">
                                <PieIcon className="wp-breakdown-icon" />
                                <h4>13% MemeTreasury</h4>
                                <p>
                                    13% funds the MemeTreasury that buys SHIB, PEPE, NEIRO, and BONK. 
                                    These rewards are distributed daily to MMV holders based on their share.
                                </p>
                            </div>
                            <div className="wp-breakdown-card">
                                <Zap className="wp-breakdown-icon" />
                                <h4>10% Liquidity</h4>
                                <p>
                                    10% provides initial DEX liquidity, locked for 2 years to prevent rug pulls. 
                                    You can sell your tokens anytime after launch.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Presale Structure */}
            <section className="wp-presale">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        The Presale Playbook
                        <span className="wp-emoji">📈</span>
                    </h2>

                    <div className="wp-presale-intro"> 
                        <p className="wp-lead">
                            Five stages. Increasing prices. Decreasing bonuses. 
                            The math is simple: earlier = more profit.
                        </p>
                    </div>

                    <div className="wp-presale-stages">
                        {presaleStages.map((stage, index) => (
                            <div 
                                key={index} 
                                className={`wp-stage-card ${stage.status === 'live' ? 'wp-stage-active' : ''}`}>
                                {stage.status === 'live' && (
                                    <div className="wp-stage-badge">LIVE NOW</div>
                                )}
                                <div className="wp-stage-header">
                                    <span className="wp-stage-number">Stage {stage.stage}</span>
                                    <span className="wp-stage-price">${stage.price}</span>
                                </div>
                                <div className="wp-stage-bonus">
                                    <span className="wp-bonus-value">{stage.bonus}%</span>
                                    <span className="wp-bonus-label">Bonus</span>
                                </div>
                                <div className="wp-stage-info">
                                    <div className="wp-stage-stat">
                                        <span className="wp-stat-label">Tokens</span>
                                        <span className="wp-stat-value">{stage.tokens}</span>
                                    </div>
                                    <div className="wp-stage-stat">
                                        <span className="wp-stat-label">Raises</span>
                                        <span className="wp-stat-value">{stage.raised}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="wp-presale-math">
                        <h3>Let's Do The Math</h3>
                        <div className="wp-math-example">
                            <div className="wp-math-card">
                                <h4>Stage 1 Investor (You?)</h4>
                                <ul className="wp-math-list">
                                    <li>Invests: $1,000</li>
                                    <li>Gets: 125,000 MMV base</li>
                                    <li>Bonus: +250,000 MMV (200%)</li>
                                    <li>Total: 375,000 MMV</li>
                                    <li className="wp-math-highlight">
                                        At listing ($0.068): <span>$25,500</span>
                                    </li>
                                    <li className="wp-math-roi">ROI: 2,450% 🚀</li>
                                </ul>
                            </div>
                            <div className="wp-math-card">
                                <h4>Stage 5 Investor (Too Late)</h4>
                                <ul className="wp-math-list">
                                    <li>Invests: $1,000</li>
                                    <li>Gets: 28,571 MMV base</li>
                                    <li>Bonus: +3,214 MMV (11.25%)</li>
                                    <li>Total: 31,785 MMV</li>
                                    <li className="wp-math-highlight">
                                        At listing ($0.068): <span>$2,161</span>
                                    </li>
                                    <li className="wp-math-roi">ROI: 116% 📉</li>
                                </ul>
                            </div>
                        </div>
                        <div className="wp-math-bottom">
                            <p className="wp-math-message">
                                See the difference? That's why smart money moves early. 
                                That's why you're reading this right now.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhitepaperTokenomics