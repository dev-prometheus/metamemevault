import { Shield, CheckCircle, Users, DollarSign, Gift, Calendar, Award } from "lucide-react";

const GiveawayRules = () => {
    const howItWorks = [
        {
            icon: <DollarSign />,
            title: "Buy $50+ of $MMV",
            description: "Minimum purchase required to enter the giveaway"
        },
        {
            icon: <CheckCircle />,
            title: "Enter Giveaway",
            description: "Click the entry button to officially join"
        },
        {
            icon: <Gift />,
            title: "Complete Tasks",
            description: "Earn points through purchases, referrals & social tasks"
        },
        {
            icon: <Award />,
            title: "Win Prizes",
            description: "Top 110 win USDT or $MMV, plus random draws"
        }
    ];

    const rules = [
        "Minimum $50 worth of $MMV required to enter",
        "One entry per wallet address",
        "Points updated automatically from on-chain data",
        "Social task completions verified at giveaway end",
        "Winners announced within 7 days after January 7, 2026",
        "Prizes distributed within 14 days of winner announcement",
        "USDT prizes sent to winner's wallet address",
        "MetaMemeVault reserves the right to disqualify fraudulent entries"
    ];

    return (
        <section className="gw-rules">
            {/* How It Works */}
            <div className="gw-rules-section">
                <h2 className="gw-section-title">
                    <CheckCircle className="gw-title-icon" />
                    How It Works
                </h2>

                <div className="gw-how-it-works">
                    {howItWorks.map((step, index) => (
                        <div key={index} className="gw-how-step">
                            <div className="gw-how-number">{index + 1}</div>
                            <div className="gw-how-icon">{step.icon}</div>
                            <h4 className="gw-how-title">{step.title}</h4>
                            <p className="gw-how-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rules & Terms */}
            <div className="gw-rules-section">
                <h2 className="gw-section-title">
                    <Shield className="gw-title-icon" />
                    Rules & Terms
                </h2>

                <div className="gw-rules-list">
                    {rules.map((rule, index) => (
                        <div key={index} className="gw-rule-item">
                            <CheckCircle className="gw-rule-icon" />
                            <span>{rule}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Important Dates */}
            <div className="gw-rules-section">
                <h2 className="gw-section-title">
                    <Calendar className="gw-title-icon" />
                    Important Dates
                </h2>

                <div className="gw-dates-grid">
                    <div className="gw-date-card">
                        <div className="gw-date-icon">
                            <Calendar />
                        </div>
                        <div className="gw-date-content">
                            <span className="gw-date-label">Giveaway Ends</span>
                            <span className="gw-date-value">January 7, 2026</span>
                        </div>
                    </div>

                    <div className="gw-date-card">
                        <div className="gw-date-icon">
                            <Award />
                        </div>
                        <div className="gw-date-content">
                            <span className="gw-date-label">Winners Announced</span>
                            <span className="gw-date-value">Within 7 days</span>
                        </div>
                    </div>

                    <div className="gw-date-card">
                        <div className="gw-date-icon">
                            <Gift />
                        </div>
                        <div className="gw-date-content">
                            <span className="gw-date-label">Prizes Distributed</span>
                            <span className="gw-date-value">Within 14 days</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fair Play Notice */}
            <div className="gw-fair-play">
                <Shield size={24} />
                <div className="gw-fair-play-content">
                    <h4>Fair Play Commitment</h4>
                    <p>
                        All data is tracked on-chain for transparency. Social tasks are verified at giveaway end. 
                        We're committed to a fair, transparent giveaway for all participants.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default GiveawayRules;