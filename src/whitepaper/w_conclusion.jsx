import {
    Rocket,
    CheckCircle,
    Clock,
    AlertTriangle,
    TrendingUp,
    Users,
    Globe,
    Heart,
    Target
} from "lucide-react"
import { TELEGRAM_LINK, TWITTER_LINK } from "../config/social_helpers";

const WhitepaperConclusion = () => {
    return (
        <>
            {/* Roadmap Section - REALISTIC VERSION */}
            <section className="wp-roadmap">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        The Execution Plan
                        <Rocket className="wp-title-icon" />
                    </h2>

                    <div className="wp-roadmap-intro">
                        <p className="wp-lead">
                            We're not promising the moon. We're building a sustainable business
                            with realistic milestones. Here's exactly how we're taking MMV from
                            zero to established player.
                        </p>
                    </div>

                    <div className="wp-roadmap-timeline">
                        <div className="wp-phase wp-phase-complete">
                            <div className="wp-phase-marker">
                                <CheckCircle className="wp-phase-icon" />
                            </div>
                            <div className="wp-phase-content">
                                <h3>Phase 1: Foundation</h3>
                                <span className="wp-phase-status">Completed</span>
                                <ul className="wp-phase-list">
                                    <li>Smart contracts deployed & verified ✓</li>
                                    <li>Website & presale platform live ✓</li>
                                    <li>Community channels opened (Telegram/Twitter) ✓</li>
                                    <li>Initial marketing campaign launched ✓</li>
                                    <li>Security audits initiated ✓</li>
                                </ul>
                            </div>
                        </div>

                        <div className="wp-phase wp-phase-active">
                            <div className="wp-phase-marker">
                                <Clock className="wp-phase-icon" />
                            </div>
                            <div className="wp-phase-content">
                                <h3>Phase 2: Presale Growth</h3>
                                <span className="wp-phase-status">In Progress</span>
                                <ul className="wp-phase-list">
                                    <li>Presale stages 1-5 (Target: $9.13M raised) 🔥</li>
                                    <li>Community growth to 10,000+ holders</li>
                                    <li>Influencer partnerships & marketing blitz</li>
                                    <li>Complete all security audits</li>
                                    <li>Finalize CEX listing applications</li>
                                    <li>Prepare liquidity pools for launch</li>
                                </ul>
                            </div>
                        </div>

                        <div className="wp-phase">
                            <div className="wp-phase-marker">
                                <TrendingUp className="wp-phase-icon" />
                            </div>
                            <div className="wp-phase-content">
                                <h3>Phase 3: Launch & Listing</h3>
                                <span className="wp-phase-status">Q1 2026</span>
                                <ul className="wp-phase-list">
                                    <li>MemeTreasury rewards go live (3 days post-presale)</li>
                                    <li>DEX launch on Uniswap</li>
                                    <li>CoinGecko & CoinMarketCap listings</li>
                                    <li>First Tier-2 CEX listing (Target: 30-60 days)</li>
                                    <li>$50M-$100M market cap milestone</li>
                                    <li>Referral system fully operational</li>
                                </ul>
                            </div>
                        </div>

                        <div className="wp-phase">
                            <div className="wp-phase-marker">
                                <Globe className="wp-phase-icon" />
                            </div>
                            <div className="wp-phase-content">
                                <h3>Phase 4: Ecosystem Expansion</h3>
                                <span className="wp-phase-status">Q2-Q3 2026</span>
                                <ul className="wp-phase-list">
                                    <li>2-3 additional CEX listings (Tier 1 targets)</li>
                                    <li>DAO governance framework launch</li>
                                    <li>Mobile app for easy reward claiming</li>
                                    <li>Strategic partnerships with DeFi protocols</li>
                                    <li>$250M-$500M market cap target</li>
                                    <li>Enhanced staking tiers activation</li>
                                </ul>
                            </div>
                        </div>

                        <div className="wp-phase">
                            <div className="wp-phase-marker">
                                <Target className="wp-phase-icon" />
                            </div>
                            <div className="wp-phase-content">
                                <h3>Phase 5: Maturity & Scale</h3>
                                <span className="wp-phase-status">Q4 2026 & Beyond</span>
                                <ul className="wp-phase-list">
                                    <li>Major CEX listings (Binance/Coinbase applications)</li>
                                    <li>Cross-chain expansion (BSC, Arbitrum, Solana)</li>
                                    <li>Institutional partnership discussions</li>
                                    <li>MMV ecosystem development (V2 features)</li>
                                    <li>$500M-$1B market cap aspiration</li>
                                    <li>Position as top 3 meme-to-earn protocol</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="wp-roadmap-note">
                        <AlertTriangle className="wp-note-icon" />
                        <p>
                            <strong>Reality Check:</strong> This roadmap is ambitious but achievable.
                            Timelines may shift based on market conditions, regulatory environment,
                            and execution speed. We're not overpromising - we're planning smart.
                        </p>
                    </div>
                </div>
            </section>

            {/* Risk Disclosure */}
            <section className="wp-risks">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        Real Talk: The Risks
                        <AlertTriangle className="wp-title-icon" />
                    </h2>

                    <div className="wp-risks-intro">
                        <p className="wp-lead">
                            We're bullish on $MMV, but we're giving you the full picture.
                            Every investment has risks. Here's what you need to know.
                        </p>
                    </div>

                    <div className="wp-risks-grid">
                        <div className="wp-risk-card">
                            <div className="wp-risk-header">
                                <span className="wp-risk-level wp-risk-high">High Risk</span>
                                <h4>Market Volatility</h4>
                            </div>
                            <p>
                                Crypto markets are volatile. $MMV could increase significantly or crash to zero.
                                We're doing everything to ensure it's the former, but no guarantees.
                                Meme sector is especially volatile.
                            </p>
                        </div>

                        <div className="wp-risk-card">
                            <div className="wp-risk-header">
                                <span className="wp-risk-level wp-risk-medium">Medium Risk</span>
                                <h4>Regulatory Changes</h4>
                            </div>
                            <p>
                                Governments are still figuring out crypto. New laws could affect
                                how we operate, especially rewards distribution. We're staying compliant,
                                but rules can change overnight.
                            </p>
                        </div>

                        <div className="wp-risk-card">
                            <div className="wp-risk-header">
                                <span className="wp-risk-level wp-risk-low">Low Risk</span>
                                <h4>Smart Contract Bugs</h4>
                            </div>
                            <p>
                                Our contracts are triple-audited, but nothing is 100% perfect.
                                We have emergency pause mechanisms and insurance protocols.
                                Zero critical vulnerabilities found, but bugs can emerge.
                            </p>
                        </div>

                        <div className="wp-risk-card">
                            <div className="wp-risk-header">
                                <span className="wp-risk-level wp-risk-medium">Medium Risk</span>
                                <h4>Competition & Copycats</h4>
                            </div>
                            <p>
                                Other projects will try to copy us. Some might even do it well.
                                But we have first-mover advantage, better team, and the strongest
                                community. Still, competition is real.
                            </p>
                        </div>

                        <div className="wp-risk-card">
                            <div className="wp-risk-header">
                                <span className="wp-risk-level wp-risk-high">High Risk</span>
                                <h4>Memecoin Sector Collapse</h4>
                            </div>
                            <p>
                                If the entire meme sector loses popularity (unlikely but possible),
                                MMV would be impacted. We diversify across 4 memes, but sector-wide
                                downturns affect all meme projects.
                            </p>
                        </div>

                        <div className="wp-risk-card">
                            <div className="wp-risk-header">
                                <span className="wp-risk-level wp-risk-medium">Medium Risk</span>
                                <h4>Execution Challenges</h4>
                            </div>
                            <p>
                                Building what we promised takes skill, time, and luck. Delays happen.
                                Features may take longer than expected. We're transparent about progress,
                                but execution risk is real in any startup.
                            </p>
                        </div>
                    </div>

                    <div className="wp-risk-disclaimer">
                        <AlertTriangle className="wp-disclaimer-icon" />
                        <div className="wp-disclaimer-content">
                            <h3>Critical Disclaimer</h3>
                            <p>
                                <strong>This is NOT financial advice.</strong> Seriously. Don't invest
                                more than you can afford to lose. Don't mortgage your house. Don't borrow money.
                                Do your own research. Talk to a financial advisor if you need to.
                            </p>
                            <p>
                                Cryptocurrency investments are <strong>extremely risky and volatile</strong>.
                                Past performance doesn't guarantee future results. The value of $MMV
                                could go to zero. Meme coins are especially speculative. By investing,
                                you accept <strong>ALL RISKS</strong> and acknowledge you could lose your
                                entire investment.
                            </p>
                            <p>
                                We're building something real, but we're also realistic about the challenges.
                                This whitepaper represents our vision and plan, not guaranteed outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="wp-conclusion">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        The Choice Is Yours
                        <Heart className="wp-title-icon" />
                    </h2>

                    <div className="wp-conclusion-content">
                        <p className="wp-conclusion-lead">
                            You made it to the end. You've seen the vision. You understand the opportunity
                            AND the risks. Now you have a choice to make.
                        </p>

                        <div className="wp-conclusion-cards">
                            <div className="wp-conclusion-card">
                                <h3>Option A: Watch From The Sidelines</h3>
                                <p>
                                    Close this tab. Go back to scrolling Twitter. Watch as $MMV
                                    launches and early investors celebrate their gains. Wonder
                                </p>
                            </div>

                            <div className="wp-conclusion-card wp-conclusion-highlight">
                                <h3>Option B: Join Stage 1 Presale</h3>
                                <p>
                                    Join early investors who see the opportunity. Buy
                                    tokens at the lowest price. Earn passive income in memecoins.
                                    Be the person others wish they listened to. Take calculated risk
                                    for exponential reward potential.
                                </p>
                            </div>
                        </div>

                        <div className="wp-conclusion-stats">
                            <h3>Remember The Numbers</h3>
                            <div className="wp-final-stats">
                                <div className="wp-final-stat">
                                    <span className="wp-final-value">200%</span>
                                    <span className="wp-final-label">Stage 1 Bonus</span>
                                </div>
                                <div className="wp-final-stat">
                                    <span className="wp-final-value">$0.008</span>
                                    <span className="wp-final-label">Current Price</span>
                                </div>
                                <div className="wp-final-stat">
                                    <span className="wp-final-value">$0.068</span>
                                    <span className="wp-final-label">Target Listing</span>
                                </div>
                                <div className="wp-final-stat">
                                    <span className="wp-final-value">750%</span>
                                    <span className="wp-final-label">Potential ROI</span>
                                </div>
                            </div>
                        </div>

                        <div className="wp-conclusion-message">
                            <p className="wp-message-text">
                                The memecoin market is worth $100B today. Projected $220B by 2026.
                                The question isn't whether memes will keep growing. It's whether you'll
                                be earning from them while others are just holding.
                            </p>
                            <p className="wp-message-highlight">
                                MetaMemeVault isn't just an investment.<br />
                                It's your automated income from the meme economy.
                            </p>
                        </div>

                        <div className="wp-conclusion-cta">
                            <a href="https://www.metamemevault.com" className="wp-cta-button">
                                Join The Presale Now
                                <Rocket className="wp-cta-icon" />
                            </a>
                            <p className="wp-cta-subtitle">
                                Stage 1 ends when tokens sell out. Early bird bonus decreases each stage.
                            </p>
                        </div>

                        <div className="wp-conclusion-social">
                            <h4>Join The Community</h4>
                            <div className="wp-social-links">
                                <a href={TELEGRAM_LINK} className="wp-social-link" target="_blank" rel="noopener noreferrer">
                                    <Users className="wp-social-icon" />
                                    <span>Telegram</span>
                                </a>
                                <a href={TWITTER_LINK} className="wp-social-link" target="_blank" rel="noopener noreferrer">
                                    <Globe className="wp-social-icon" />
                                    <span>Twitter/X</span>
                                </a>
                                <a href="https://www.metamemevault.com" className="wp-social-link">
                                    <Rocket className="wp-social-icon" />
                                    <span>Website</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="wp-footer">
                <div className="wp-container">
                    <div className="wp-footer-content">
                        <p className="wp-footer-text">
                            © 2025 MetaMemeVault. All rights reserved.
                        </p>
                        <p className="wp-footer-version">
                            Whitepaper Version 2.1 | Last Updated: October 2025
                        </p>
                        <div className="wp-footer-links">
                            <a href="/terms-and-conditions">Terms</a>
                            <span>•</span>
                            <a href="/privacy-policy">Privacy</a>
                            <span>•</span>
                            <a href="#top">Back to Top</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default WhitepaperConclusion;