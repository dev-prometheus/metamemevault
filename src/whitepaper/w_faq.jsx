import {
    HelpCircle,
    ChevronDown,
    Wallet,
    Clock,
    Shield,
    Gift,
    TrendingUp,
    AlertCircle
} from "lucide-react"
import { useState } from "react"
import { TELEGRAM_LINK } from "../config/social_helpers";

const WhitepaperFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: "Presale & Purchase",
            icon: <Wallet size={20} />,
            questions: [
                {
                    q: "How do I buy $MMV during the presale?",
                    a: "You can buy $MMV using three methods: (1) ETH - connect your wallet and pay with Ethereum, (2) USDT - stable and predictable pricing, or (3) Credit/Debit Card - direct fiat purchase through our payment processor. Minimum purchase is $20."
                },
                {
                    q: "When does each presale stage end?",
                    a: "Stages are TOKEN-BASED, not time-based. Each stage ends when all tokens allocated to that stage are sold out. Stage 1 has 48M tokens at $0.008, once those sell out, Stage 2 automatically begins at $0.012. This creates urgency and rewards early buyers."
                },
                {
                    q: "Can I claim my MMV tokens immediately?",
                    a: "BASE MMV tokens: Claimable immediately after presale ends. BONUS MMV tokens: Available 30 days after presale ends. This prevents dumping and ensures long-term holder commitment."
                },
                {
                    q: "What if I want to buy more in multiple stages?",
                    a: "Absolutely! You can buy in any stage, but remember - early stages get bigger bonuses. Your total MMV accumulates across all purchases, and all tokens go into the MemeTreasury for rewards."
                }
            ]
        },
        {
            category: "MemeTreasury & Rewards",
            icon: <Gift size={20} />,
            questions: [
                {
                    q: "When do I start earning rewards?",
                    a: "You start earning rewards IMMEDIATELY when you lock your MMV in the MemeTreasury. However, rewards become available for claiming 3 days after the presale ends. This gives us time to set up the infrastructure and load the treasury with memecoins."
                },
                {
                    q: "How are rewards calculated?",
                    a: "Your share = (Your MMV Tokens / Total Locked MMV) × Daily Reward Pool. Example: You hold 100,000 MMV (0.01% of supply), treasury distributes $10,000 in SHIB daily, you get $10 worth of SHIB. Simple math, transparent distribution."
                },
                {
                    q: "Can I change my reward token choice?",
                    a: "Absolutely! You can choose to earn SHIB, PEPE, NEIRO, or BONK. Even better - you can earn multiple memecoins at once! Simply select which memecoins you want to earn when you lock your MMV. You have complete flexibility."
                },

            ]
        },
        {
            category: "Security & Safety",
            icon: <Shield size={20} />,
            questions: [
                {
                    q: "Who controls the treasury funds?",
                    a: "Multi-sig wallet requiring 3 out of 5 signatures. No single person can move funds. Treasury movements are public on Etherscan. 100% transparency, zero trust required."
                },
                {
                    q: "What if the smart contract has a bug?",
                    a: "All contracts are audited by Coinsult, SCRL.io, and monitored by GoPlus Labs. We have emergency pause mechanisms and insurance protocols. Zero critical vulnerabilities found in audits."
                },
                {
                    q: "Can the team mint more tokens?",
                    a: "NO. The contract has NO mint function. Total supply is fixed at 1 billion MMV forever. This is verifiable in the source code on Etherscan."
                }
            ]
        },
        {
            category: "Tokenomics & Bonus",
            icon: <TrendingUp size={20} />,
            questions: [
                {
                    q: "Why is the Stage 1 bonus so high (200%)?",
                    a: "Early risk = bigger reward. Stage 1 buyers take the most risk, so they get 3X their purchase (1X base + 2X bonus). This is standard aggressive marketing for presales, not desperation. It rewards belief and early support."
                },
                {
                    q: "What happens to unsold tokens?",
                    a: "Any unsold presale tokens are burned forever. We're not keeping extra supply. What doesn't sell, doesn't exist. This maintains scarcity and protects token value."
                },
                {
                    q: "When will MMV be listed on exchanges?",
                    a: "DEX listing (Uniswap): 3-7 days after presale ends. First CEX: Target within 30-60 days. Major CEX (Binance/Coinbase): Q3-Q4 2026 as volume grows. We don't rush - we build sustainable momentum."
                },
                {
                    q: "What's the expected price at listing?",
                    a: "Target listing price: $0.068 (8.5X from Stage 1). This is based on raised capital, market cap goals, and comparable projects. Not guaranteed, but mathematically achievable with proper execution."
                }
            ]
        },
        {
            category: "Risks & Reality Check",
            icon: <AlertCircle size={20} />,
            questions: [
                {
                    q: "Can I lose money investing in MMV?",
                    a: "YES. Crypto is volatile. MMV could go down, sideways, or even to zero. We're building something real, but there are NO GUARANTEES. Only invest what you can afford to lose. This is not financial advice."
                },
                {
                    q: "What if the meme market crashes?",
                    a: "The treasury diversifies across 4 top memecoins (SHIB, PEPE, NEIRO, BONK). If one crashes, others may increase. But yes, if the entire meme sector collapses, MMV will feel it. That's the risk/reward trade-off."
                },
                {
                    q: "Is the team anonymous?",
                    a: "Core contributors are pseudonymous but have verifiable track records in DeFi. We prioritize trust through CODE, not faces. Multi-sig governance ensures no single point of failure. Community-driven from day one."
                },
                {
                    q: "What's the realistic timeline for profit?",
                    a: "Immediate gains: Possible at DEX listing if you bought early stages. Sustainable returns: 6-12 months as the ecosystem matures and rewards accumulate. Get-rich-quick: Wrong project. We're building long-term value."
                }
            ]
        }
    ];

    const toggleFAQ = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenIndex(openIndex === key ? null : key);
    };

    return (
        <section className="wp-faq">
            <div className="wp-container">
                <h2 className="wp-section-title">
                    Frequently Asked <span className="wp-emoji">❓</span> Questions
                </h2>

                <div className="wp-faq-intro">
                    <p className="wp-lead">
                        Real questions. Honest answers. Here's everything investors
                        actually want to know before putting money in.
                    </p>
                </div>

                <div className="wp-faq-categories">
                    {faqs.map((category, catIndex) => (
                        <div key={catIndex} className="wp-faq-category">
                            <div className="wp-faq-category-header">
                                {category.icon}
                                <h3>{category.category}</h3>
                            </div>

                            <div className="wp-faq-list">
                                {category.questions.map((faq, qIndex) => {
                                    const key = `${catIndex}-${qIndex}`;
                                    const isOpen = openIndex === key;

                                    return (
                                        <div
                                            key={qIndex}
                                            className={`wp-faq-item ${isOpen ? 'wp-faq-open' : ''}`}
                                        >
                                            <button
                                                className="wp-faq-question"
                                                onClick={() => toggleFAQ(catIndex, qIndex)}
                                            >
                                                <span>{faq.q}</span>
                                                <ChevronDown
                                                    className={`wp-faq-icon ${isOpen ? 'wp-faq-icon-rotated' : ''}`}
                                                    size={20}
                                                />
                                            </button>

                                            {isOpen && (
                                                <div className="wp-faq-answer">
                                                    <p>{faq.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="wp-faq-footer">
                    <HelpCircle className="wp-faq-footer-icon" />
                    <div className="wp-faq-footer-content">
                        <h4>Still Have Questions?</h4>
                        <p>
                            Join our Telegram community and ask the team directly.
                            We're active 24/7 and actually respond to DMs.
                        </p>
                        <div className="wp-faq-footer-buttons">
                            <a href={TELEGRAM_LINK} className="wp-faq-cta-btn">
                                Join Telegram Community
                            </a>
                            <a href="/contact" className="wp-faq-cta-btn wp-faq-cta-secondary">
                                Email Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhitepaperFAQ;