import { 
    BookOpen, 
    TrendingUp, 
    BarChart3, 
    DollarSign,
    AlertCircle,
    Target
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const marketData = [
    { year: "2021", value: 10, growth: 0 },
    { year: "2022", value: 30, growth: 200 },
    { year: "2023", value: 60, growth: 100 },
    { year: "2024", value: 100, growth: 66 },
    { year: "2025", value: 150, growth: 50 },
    { year: "2026*", value: 220, growth: 46 }
]

const WhitepaperTable = () => {
    return (
        <>
            {/* Table of Contents */}
            <section className="wp-toc">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        What's Inside This Whitepaper?
                    </h2>
                    
                    <div className="wp-toc-grid">
                        <div className="wp-toc-card">
                            <div className="wp-toc-number">01</div>
                            <h3>The Meme Gold Rush</h3>
                            <p>Why memecoins aren't just jokes anymore - they're a $100B+ opportunity</p>
                        </div>

                        <div className="wp-toc-card">
                            <div className="wp-toc-number">02</div>
                            <h3>The MMV Master Plan</h3>
                            <p>How we're turning chaos into cash flow with our MemeTreasury system</p>
                        </div>

                        <div className="wp-toc-card">
                            <div className="wp-toc-number">03</div>
                            <h3>Show Me The Money</h3>
                            <p>Tokenomics, presale stages, and why early investors get significant rewards</p>
                        </div>

                        <div className="wp-toc-card">
                            <div className="wp-toc-number">04</div>
                            <h3>The Tech Stack</h3>
                            <p>Smart contracts, security audits, and how your funds are protected</p>
                        </div>

                        <div className="wp-toc-card">
                            <div className="wp-toc-number">05</div>
                            <h3>Your Earning Engine</h3>
                            <p>Step-by-step guide to earning SHIB, PEPE, NEIRO, and BONK on autopilot</p>
                        </div>

                        <div className="wp-toc-card">
                            <div className="wp-toc-number">06</div>
                            <h3>The Exit Strategy</h3>
                            <p>Roadmap, exchange listings, and our growth strategy</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Market Analysis */}
            <section className="wp-market">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        The Meme Economy Is Exploding 
                        <span className="wp-emoji">🚀</span>
                    </h2>

                    <div className="wp-market-intro">
                        <p className="wp-lead">
                            Remember when Bitcoin skeptics laughed at Dogecoin? Now DOGE has a $50B market cap 
                            and Elon tweets move billions. The meme economy isn't coming - it's already here, 
                            and it's hungry for innovation.
                        </p>
                    </div>

                    <div className="wp-market-stats">
                        <div className="wp-stat-card wp-stat-primary">
                            <DollarSign className="wp-stat-icon" />
                            <div className="wp-stat-content">
                                <span className="wp-stat-value">$100B+</span>
                                <span className="wp-stat-label">Current Market Cap</span>
                                <span className="wp-stat-detail">That's bigger than Ford Motor Company</span>
                            </div>
                        </div>

                        <div className="wp-stat-card">
                            <TrendingUp className="wp-stat-icon" />
                            <div className="wp-stat-content">
                                <span className="wp-stat-value">2,100%</span>
                                <span className="wp-stat-label">Growth Since 2021</span>
                                <span className="wp-stat-detail">Fastest growing crypto sector</span>
                            </div>
                        </div>

                        <div className="wp-stat-card">
                            <BarChart3 className="wp-stat-icon" />
                            <div className="wp-stat-content">
                                <span className="wp-stat-value">$72.3B</span>
                                <span className="wp-stat-label">Daily Volume</span>
                                <span className="wp-stat-detail">More than most stock exchanges</span>
                            </div>
                        </div>
                    </div>

                    <div className="wp-market-chart">
                        <h3>Memecoin Market Cap Evolution</h3>
                        <p className="wp-chart-subtitle">From joke to juggernaut in 5 years</p>
                        <div className="wp-chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={marketData}>
                                    <XAxis dataKey="year" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            background: '#1a1c24', 
                                            border: '1px solid #4b5ae4',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#4b5ae4" 
                                        strokeWidth={3}
                                        dot={{ fill: '#4b5ae4', r: 6 }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="wp-market-problems">
                        <h3>But Here's The Problem...</h3>
                        <div className="wp-problem-grid">
                            <div className="wp-problem-card">
                                <AlertCircle className="wp-problem-icon" />
                                <h4>95% Fail Rate</h4>
                                <p>
                                    For every SHIB millionaire, there are thousands who got rugged. 
                                    The odds are worse than Vegas.
                                </p>
                            </div>

                            <div className="wp-problem-card">
                                <AlertCircle className="wp-problem-icon" />
                                <h4>No Passive Income</h4>
                                <p>
                                    You either sell at the perfect time or watch your investment decline. 
                                    There's no middle ground.
                                </p>
                            </div>

                            <div className="wp-problem-card">
                                <AlertCircle className="wp-problem-icon" />
                                <h4>Rug Pull Roulette</h4>
                                <p>
                                    Every new launch could be the next 1000x or the next scam. 
                                    It's exhausting trying to tell the difference.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="wp-market-solution">
                        <div className="wp-solution-box">
                            <Target className="wp-solution-icon" />
                            <h3>Enter MetaMemeVault</h3>
                            <p className="wp-solution-text">
                                What if you could earn from ALL the top memecoins without buying a single one? 
                                What if your tokens generated rewards automatically, whether the market rises or falls?
                            </p>
                            <p className="wp-solution-highlight">
                                That's not a dream. That's $MMV.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhitepaperTable