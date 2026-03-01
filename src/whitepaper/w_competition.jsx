import {
    TrendingUp,
    CheckCircle,
    XCircle,
    MinusCircle,
    Shield,
    Coins,
    Users,
    Zap
} from "lucide-react"

const CompetitorComparison = () => {
    const comparisonData = [
        {
            feature: "Passive Income Generation",
            mmv: { status: "yes", text: "Earn 4 top memecoins automatically" },
            shib: { status: "partial", text: "Staking available but limited returns" },
            pepe: { status: "no", text: "No passive income mechanism" },
            neiro: { status: "no", text: "No staking or rewards system" }
        },
        {
            feature: "Diversified Rewards",
            mmv: { status: "yes", text: "SHIB, PEPE, NEIRO, BONK - choose which you want to earn" },
            shib: { status: "no", text: "Only SHIB rewards" },
            pepe: { status: "no", text: "No reward system" },
            neiro: { status: "no", text: "No reward distribution" }
        },
        {
            feature: "Early Investor Bonus",
            mmv: { status: "yes", text: "Up to 200% bonus tokens" },
            shib: { status: "no", text: "No presale bonuses" },
            pepe: { status: "no", text: "Fair launch, no bonuses" },
            neiro: { status: "no", text: "No early bird benefits" }
        },
        {
            feature: "Treasury Management",
            mmv: { status: "yes", text: "Multi-sig controlled, 13% allocated" },
            shib: { status: "partial", text: "Community fund exists" },
            pepe: { status: "no", text: "No treasury system" },
            neiro: { status: "partial", text: "Basic fund allocation" }
        },
        {
            feature: "Security Audits",
            mmv: { status: "yes", text: "3 independent audits (Coinsult, SCRL, GoPlus)" },
            shib: { status: "yes", text: "Audited by CertiK" },
            pepe: { status: "partial", text: "Code verified, not fully audited" },
            neiro: { status: "partial", text: "Basic security review" }
        },
        {
            feature: "Liquidity Lock",
            mmv: { status: "yes", text: "2+ years locked, team tokens 12 months vested" },
            shib: { status: "yes", text: "Liquidity burned" },
            pepe: { status: "yes", text: "LP burned" },
            neiro: { status: "partial", text: "Partial lock implemented" }
        },
        {
            feature: "Referral System",
            mmv: { status: "yes", text: "5% commission on referrals" },
            shib: { status: "no", text: "No referral program" },
            pepe: { status: "no", text: "No referral system" },
            neiro: { status: "no", text: "No referral rewards" }
        },
        {
            feature: "Buy/Sell Tax",
            mmv: { status: "yes", text: "0% tax - completely free" },
            shib: { status: "yes", text: "0% tax" },
            pepe: { status: "yes", text: "0% tax" },
            neiro: { status: "yes", text: "0% tax" }
        }
    ];

    const projectComparison = [
        {
            name: "MetaMemeVault (MMV)",
            logo: "💎",
            marketCap: "$10M (Target at Launch)",
            utility: "Multi-memecoin rewards treasury",
            stage: "Presale - Stage 1 Live",
            strength: "Only project offering diversified meme rewards with 200% early bonus",
            color: "#4b5ae4"
        },
        {
            name: "Shiba Inu (SHIB)",
            logo: "🐕",
            marketCap: "$15B",
            utility: "ShibaSwap DEX, Shibarium L2",
            stage: "Established",
            strength: "Massive community, ecosystem development",
            color: "#ff6b00"
        },
        {
            name: "Pepe (PEPE)",
            logo: "🐸",
            marketCap: "$8B",
            utility: "Pure memecoin, viral marketing",
            stage: "Established",
            strength: "Strong meme culture, high liquidity",
            color: "#00b300"
        },
        {
            name: "Neiro (NEIRO)",
            logo: "🐶",
            marketCap: "$500M",
            utility: "Community-driven memecoin",
            stage: "Growing",
            strength: "New dog narrative, strong community backing",
            color: "#ff9500"
        }
    ];

    const StatusIcon = ({ status }) => {
        switch (status) {
            case "yes":
                return <CheckCircle className="wp-comp-icon-yes" size={20} />;
            case "no":
                return <XCircle className="wp-comp-icon-no" size={20} />;
            case "partial":
                return <MinusCircle className="wp-comp-icon-partial" size={20} />;
            default:
                return null;
        }
    };

    return (
        <>
            {/* Competitive Landscape Overview */}
            <section className="wp-competitor">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        How We Stack Up Against The <span className="wp-emoji">🥊</span> Competition
                    </h2>

                    <div className="wp-competitor-intro">
                        <p className="wp-lead">
                            The meme coin space is crowded. But most projects are one-trick ponies.
                            Here's an honest comparison of MMV vs the established players.
                        </p>
                    </div>

                    {/* Project Cards Comparison */}
                    <div className="wp-project-cards">
                        {projectComparison.map((project, index) => (
                            <div
                                key={index}
                                className={`wp-project-card ${index === 0 ? 'wp-project-highlight' : ''}`}
                                style={{ '--project-color': project.color }}
                            >
                                <div className="wp-project-logo">{project.logo}</div>
                                <h3 className="wp-project-name">{project.name}</h3>

                                <div className="wp-project-details">
                                    <div className="wp-project-detail">
                                        <Coins size={16} />
                                        <span>{project.marketCap}</span>
                                    </div>
                                    <div className="wp-project-detail">
                                        <Zap size={16} />
                                        <span>{project.utility}</span>
                                    </div>
                                    <div className="wp-project-detail">
                                        <TrendingUp size={16} />
                                        <span>{project.stage}</span>
                                    </div>
                                </div>

                                <div className="wp-project-strength">
                                    <Shield size={16} />
                                    <p>{project.strength}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Feature Comparison Table */}
                    <div className="wp-comparison-table-wrapper">
                        <h3 className="wp-comparison-subtitle">Feature-by-Feature Breakdown</h3>

                        <div className="wp-comparison-table">
                            {/* Header Row */}
                            <div className="wp-comp-row wp-comp-header">
                                <div className="wp-comp-cell">Feature</div>
                                <div className="wp-comp-cell">MMV</div>
                                <div className="wp-comp-cell">SHIB</div>
                                <div className="wp-comp-cell">PEPE</div>
                                <div className="wp-comp-cell">NEIRO</div>
                            </div>

                            {/* Data Rows */}
                            {comparisonData.map((row, index) => (
                                <div key={index} className="wp-comp-row">
                                    <div className="wp-comp-cell wp-comp-feature">
                                        {row.feature}
                                    </div>
                                    <div className="wp-comp-cell wp-comp-mmv">
                                        <StatusIcon status={row.mmv.status} />
                                        <span>{row.mmv.text}</span>
                                    </div>
                                    <div className="wp-comp-cell">
                                        <StatusIcon status={row.shib.status} />
                                        <span>{row.shib.text}</span>
                                    </div>
                                    <div className="wp-comp-cell">
                                        <StatusIcon status={row.pepe.status} />
                                        <span>{row.pepe.text}</span>
                                    </div>
                                    <div className="wp-comp-cell">
                                        <StatusIcon status={row.neiro.status} />
                                        <span>{row.neiro.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Differentiators */}
                    <div className="wp-differentiators">
                        <h3>What Makes MMV Different</h3>
                        <div className="wp-diff-grid">
                            <div className="wp-diff-card">
                                <div className="wp-diff-icon">🎯</div>
                                <h4>First Meme-to-Earn-Memes</h4>
                                <p>
                                    SHIB, PEPE, NEIRO are great. But you can only earn THEIR token.
                                    MMV lets you earn from ALL top memecoins. That's the key difference.
                                </p>
                            </div>

                            <div className="wp-diff-card">
                                <div className="wp-diff-icon">🔥</div>
                                <h4>200% Early Bird Advantage</h4>
                                <p>
                                    Most projects launch fair with no bonuses. We reward early believers
                                    massively. Stage 1 gets 3X their investment in tokens.
                                </p>
                            </div>

                            <div className="wp-diff-card">
                                <div className="wp-diff-icon">🛡️</div>
                                <h4>Triple-Audited Security</h4>
                                <p>
                                    Three independent audits before launch. PEPE launched with just
                                    code verification. We go the extra mile for safety.
                                </p>
                            </div>

                            <div className="wp-diff-card">
                                <div className="wp-diff-icon">💰</div>
                                <h4>Passive Income From Day 1</h4>
                                <p>
                                    Buy, hold, earn. No complicated staking or farming. Your MMV
                                    automatically generates memecoin rewards. Set it and forget it.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="wp-competitor-conclusion">
                        <div className="wp-conclusion-box">
                            <Users className="wp-conclusion-icon" />
                            <h3>The Bottom Line</h3>
                            <p>
                                SHIB and PEPE dominated 2021-2023. NEIRO is making waves as the new dog.
                                But none offer what MMV does: <strong>diversified passive income from
                                    the entire meme sector</strong>.
                            </p>
                            <p>
                                We're not trying to replace them. We're letting you <strong>earn from them</strong>.
                                That's what makes MMV different.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CompetitorComparison;