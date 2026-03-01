import {
    Users,
    Code,
    Handshake,
    GitBranch,
    Shield,
    Globe,
    Cpu,
    CheckCircle,
    Zap,
    Building,
    Network,
    FileCode,
    Award,
    Target
} from "lucide-react"

import { coinsult_logo, scrl_logo, goplus_logo } from "../assets";

const WhitepaperTeam = () => {
    return (
        <>
            {/* Team Section - Community Driven with Credentials */}
            <section className="wp-team">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        Built By Believers, Backed By <span className="wp-emoji">🔥</span> Expertise
                    </h2>

                    <div className="wp-team-intro">
                        <p className="wp-lead">
                            MetaMemeVault combines the power of community-driven development
                            with battle-tested expertise from DeFi veterans. We're pseudonymous,
                            but our track record speaks louder than LinkedIn profiles.
                        </p>
                    </div>

                    {/* Core Contributors with Credentials */}
                    <div className="wp-core-team">
                        <h3>Core Contributors</h3>
                        <div className="wp-team-grid">
                            <div className="wp-team-member">
                                <div className="wp-member-avatar">
                                    <Code className="wp-avatar-icon" />
                                </div>
                                <h4>Lead Developer</h4>
                                <div className="wp-member-badge">Pseudonymous</div>
                                <ul className="wp-member-credentials">
                                    <li><CheckCircle size={14} /> 8+ years Solidity development</li>
                                    <li><CheckCircle size={14} /> Former engineer at Top 20 DeFi protocol</li>
                                    <li><CheckCircle size={14} /> Secured $200M+ in smart contracts</li>
                                    <li><CheckCircle size={14} /> Zero security incidents across all projects</li>
                                </ul>
                            </div>

                            <div className="wp-team-member">
                                <div className="wp-member-avatar">
                                    <Shield className="wp-avatar-icon" />
                                </div>
                                <h4>Treasury Architect</h4>
                                <div className="wp-member-badge">Pseudonymous</div>
                                <ul className="wp-member-credentials">
                                    <li><CheckCircle size={14} /> Built 3 yield farms ($50M+ TVL)</li>
                                    <li><CheckCircle size={14} /> Specialized in treasury management</li>
                                    <li><CheckCircle size={14} /> 5 years in crypto asset optimization</li>
                                    <li><CheckCircle size={14} /> Track record: 0 treasury exploits</li>
                                </ul>
                            </div>

                            <div className="wp-team-member">
                                <div className="wp-member-avatar">
                                    <Users className="wp-avatar-icon" />
                                </div>
                                <h4>Community Lead</h4>
                                <div className="wp-member-badge">Pseudonymous</div>
                                <ul className="wp-member-credentials">
                                    <li><CheckCircle size={14} /> Grew 3 projects to 100K+ members</li>
                                    <li><CheckCircle size={14} /> Expert in meme coin marketing</li>
                                    <li><CheckCircle size={14} /> 4+ years community management</li>
                                    <li><CheckCircle size={14} /> Managed $5M+ presale campaigns</li>
                                </ul>
                            </div>

                            <div className="wp-team-member">
                                <div className="wp-member-avatar">
                                    <Target className="wp-avatar-icon" />
                                </div>
                                <h4>Operations Manager</h4>
                                <div className="wp-member-badge">Pseudonymous</div>
                                <ul className="wp-member-credentials">
                                    <li><CheckCircle size={14} /> 10+ successful token launches</li>
                                    <li><CheckCircle size={14} /> CEX listing specialist</li>
                                    <li><CheckCircle size={14} /> Partnership development expert</li>
                                    <li><CheckCircle size={14} /> $100M+ in exchange liquidity managed</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Security Partners with Logos */}
                    <div className="wp-security-partners">
                        <h3>Security Partners (Verified)</h3>
                        <div className="wp-partners-grid">
                            <div className="wp-partner-card">
                                <div className="wp-partner-logo-wrapper">
                                    <img src={coinsult_logo} alt="Coinsult" className="wp-partner-logo" />
                                </div>
                                <h4>Coinsult</h4>
                                <div className="wp-partner-status">
                                    <Award size={16} />
                                    <span>Full Audit Completed</span>
                                </div>
                                <p>Leading blockchain security firm with 500+ audits</p>
                                <a
                                    href="/audit"
                                    className="wp-partner-link"
                                >
                                    View Audit Report →
                                </a>
                            </div>

                            <div className="wp-partner-card">
                                <div className="wp-partner-logo-wrapper">
                                    <img src={scrl_logo} alt="SCRL" className="wp-partner-logo" />
                                </div>
                                <h4>SCRL.io</h4>
                                <div className="wp-partner-status">
                                    <Award size={16} />
                                    <span>Certified Secure</span>
                                </div>
                                <p>Advanced smart contract analysis & formal verification</p>
                                <a
                                    href="/audit"
                                    className="wp-partner-link"
                                >
                                    View Certification →
                                </a>
                            </div>

                            <div className="wp-partner-card">
                                <div className="wp-partner-logo-wrapper">
                                    <img src={goplus_logo} alt="GoPlus Labs" className="wp-partner-logo" />
                                </div>
                                <h4>GoPlus Labs</h4>
                                <div className="wp-partner-status">
                                    <Zap size={16} />
                                    <span>Active Monitoring</span>
                                </div>
                                <p>Real-time security monitoring & threat detection</p>
                                <a
                                    href="/audit"
                                    className="wp-partner-link"
                                >
                                    Live Security Status →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Philosophy Section */}
                    <div className="wp-team-philosophy">
                        <div className="wp-philosophy-card">
                            <Globe className="wp-philosophy-icon" />
                            <h3>Decentralized Leadership</h3>
                            <p>
                                No single point of failure. No CEO who can rug you.
                                The protocol is governed by smart contracts and community consensus.
                                Code is law, and the law is public.
                            </p>
                        </div>

                        <div className="wp-philosophy-card">
                            <Code className="wp-philosophy-icon" />
                            <h3>Open Source Everything</h3>
                            <p>
                                Every line of code is on GitHub. Every transaction is on-chain.
                                Every decision is made in public. This isn't just transparency -
                                it's radical openness.
                            </p>
                        </div>

                        <div className="wp-philosophy-card">
                            <Shield className="wp-philosophy-icon" />
                            <h3>Trust Through Verification</h3>
                            <p>
                                You don't need to trust us. Trust the code. Trust the audits.
                                Trust the immutable blockchain. We built MMV so you never have
                                to take anyone's word for anything.
                            </p>
                        </div>
                    </div>

                    {/* Governance Structure */}
                    <div className="wp-team-structure">
                        <h3>Decentralized Governance</h3>
                        <div className="wp-structure-grid">
                            <div className="wp-structure-card">
                                <div className="wp-structure-header">
                                    <Shield className="wp-structure-icon" />
                                    <h4>Multi-Sig Treasury</h4>
                                </div>
                                <p>
                                    3 out of 5 signatures required for ANY treasury action.
                                    Signers from different continents, different backgrounds.
                                    Geographic and ideological distribution prevents collusion.
                                </p>
                            </div>

                            <div className="wp-structure-card">
                                <div className="wp-structure-header">
                                    <Users className="wp-structure-icon" />
                                    <h4>Community Guardians</h4>
                                </div>
                                <p>
                                    Top 100 holders get weighted voting rights. Major decisions
                                    go to community vote. Your voice matters proportionally
                                    to your stake. True decentralization.
                                </p>
                            </div>

                            <div className="wp-structure-card">
                                <div className="wp-structure-header">
                                    <GitBranch className="wp-structure-icon" />
                                    <h4>Transparent Operations</h4>
                                </div>
                                <p>
                                    All treasury movements visible on Etherscan. Weekly
                                    community calls. Monthly financial reports. Quarterly audits.
                                    We operate in the open.
                                </p>
                            </div>

                            <div className="wp-structure-card">
                                <div className="wp-structure-header">
                                    <Zap className="wp-structure-icon" />
                                    <h4>Emergency Protocols</h4>
                                </div>
                                <p>
                                    Circuit breakers for abnormal activity. Pause mechanisms
                                    for critical bugs. Insurance fund for worst-case scenarios.
                                    We plan for the unplannable.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="wp-team-message">
                        <p className="wp-message-highlight">
                            "We're not hiding. We're everywhere and nowhere.
                            We're the community, and the community is us."
                        </p>
                        <p className="wp-message-sub">
                            - The MetaMemeVault Collective
                        </p>
                    </div>
                </div>
            </section>

            {/* Partnerships Section */}
            <section className="wp-partnerships">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        Strategic Alliances & Future Partnerships
                        <Handshake className="wp-title-icon" />
                    </h2>

                    <div className="wp-partnerships-intro">
                        <p className="wp-lead">
                            We're not alone in this revolution. The biggest names in crypto
                            are watching, and many are ready to join forces. Here's who's
                            on our radar and who's already in talks.
                        </p>
                    </div>

                    <div className="wp-partnerships-current">
                        <h3>In Development</h3>
                        <div className="wp-partner-grid">
                            <div className="wp-partner-card">
                                <div className="wp-partner-type">Exchange Listings</div>
                                <h4>Major CEXs & DEXs</h4>
                                <p>
                                    Active discussions with Tier 1 exchanges.
                                    Uniswap pool ready at launch. Targeting 2-3 CEX
                                    listings within first 60 days.
                                </p>
                                <div className="wp-partner-status">
                                    <Zap className="wp-status-icon" />
                                    <span>Negotiating</span>
                                </div>
                            </div>

                            <div className="wp-partner-card">
                                <div className="wp-partner-type">DeFi Integration</div>
                                <h4>Yield Aggregators</h4>
                                <p>
                                    Talks with major yield platforms to integrate MMV.
                                    Potential partnerships with lending protocols for
                                    utility expansion.
                                </p>
                                <div className="wp-partner-status">
                                    <Network className="wp-status-icon" />
                                    <span>Exploring</span>
                                </div>
                            </div>

                            <div className="wp-partner-card">
                                <div className="wp-partner-type">Media & Marketing</div>
                                <h4>Influencer Network</h4>
                                <p>
                                    Building relationships with crypto's biggest voices.
                                    Real endorsements, not paid shills. Authentic partnerships
                                    only.
                                </p>
                                <div className="wp-partner-status">
                                    <Users className="wp-status-icon" />
                                    <span>In Progress</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wp-partnerships-future">
                        <h3>Future Vision (2026+)</h3>
                        <div className="wp-future-grid">
                            <div className="wp-future-card">
                                <Building className="wp-future-icon" />
                                <h4>Institutional Partnerships</h4>
                                <p>
                                    Opening doors to institutional liquidity providers
                                    and market makers post-launch.
                                </p>
                            </div>

                            <div className="wp-future-card">
                                <Globe className="wp-future-icon" />
                                <h4>Cross-Chain Bridges</h4>
                                <p>
                                    Expanding MMV to Solana, BSC, and Arbitrum
                                    through strategic bridge partnerships.
                                </p>
                            </div>

                            <div className="wp-future-card">
                                <Handshake className="wp-future-icon" />
                                <h4>Ecosystem Collaborations</h4>
                                <p>
                                    Joint ventures with other meme projects.
                                    Growing the pie for everyone, not competing.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="wp-partner-cta">
                        <p className="wp-partner-message">
                            Want to partner with MetaMemeVault?
                            We're always open to proposals that benefit our community.
                        </p>
                        <a href="mailto:mmv@metamemevault.com" className="wp-partner-button">
                            Get In Touch
                        </a>
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive - Simplified */}
            <section className="wp-technical">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        Under The Hood (Without The Headache)
                        <Cpu className="wp-title-icon" />
                    </h2>

                    <div className="wp-tech-intro">
                        <p className="wp-lead">
                            You don't need a PhD to understand how MMV works.
                            Here's the technical stuff explained like you're five
                            (a very smart five-year-old who knows about crypto).
                        </p>
                    </div>

                    <div className="wp-tech-architecture">
                        <h3>The MMV Tech Stack</h3>
                        <div className="wp-tech-grid">
                            <div className="wp-tech-card">
                                <FileCode className="wp-tech-icon" />
                                <h4>Smart Contracts</h4>
                                <div className="wp-tech-details">
                                    <p><strong>Language:</strong> Solidity 0.8.20</p>
                                    <p><strong>Standard:</strong> ERC-20 + Custom Extensions</p>
                                    <p><strong>Optimizer:</strong> Enabled (200 runs)</p>
                                </div>
                                <p className="wp-tech-desc">
                                    Battle-tested code that's been audited, re-audited,
                                    and then audited again. No fancy experimental stuff -
                                    just solid, proven patterns.
                                </p>
                            </div>

                            <div className="wp-tech-card">
                                <GitBranch className="wp-tech-icon" />
                                <h4>Contract Architecture</h4>
                                <div className="wp-tech-flow">
                                    <div className="wp-flow-item">MMV Token Contract</div>
                                    <span className="wp-flow-arrow">↓</span>
                                    <div className="wp-flow-item">Treasury Vault</div>
                                    <span className="wp-flow-arrow">↓</span>
                                    <div className="wp-flow-item">Reward Distributor</div>
                                    <span className="wp-flow-arrow">↓</span>
                                    <div className="wp-flow-item">Your Wallet</div>
                                </div>
                            </div>

                            <div className="wp-tech-card">
                                <Shield className="wp-tech-icon" />
                                <h4>Security Features</h4>
                                <ul className="wp-tech-list">
                                    <li>Reentrancy Guards (no double-spending)</li>
                                    <li>Overflow Protection (math can't break)</li>
                                    <li>Access Controls (only authorized actions)</li>
                                    <li>Time Locks (no rush decisions)</li>
                                    <li>Emergency Pause (circuit breaker)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="wp-tech-rewards">
                        <h3>How Rewards Actually Work</h3>
                        <div className="wp-rewards-explanation">
                            <div className="wp-reward-step">
                                <span className="wp-step-num">1</span>
                                <div className="wp-step-content">
                                    <h4>Lock Happens</h4>
                                    <p>When you buy MMV, it goes straight to the treasury vault.
                                        No manual staking needed.</p>
                                </div>
                            </div>
                            <div className="wp-reward-step">
                                <span className="wp-step-num">2</span>
                                <div className="wp-step-content">
                                    <h4>Math Magic</h4>
                                    <p>Smart contract calculates your share based on:
                                        amount locked × time × bonus multiplier</p>
                                </div>
                            </div>
                            <div className="wp-reward-step">
                                <span className="wp-step-num">3</span>
                                <div className="wp-step-content">
                                    <h4>Daily Distribution</h4>
                                    <p>Every 24 hours, the contract allocates meme rewards
                                        proportionally to all holders</p>
                                </div>
                            </div>
                            <div className="wp-reward-step">
                                <span className="wp-step-num">4</span>
                                <div className="wp-step-content">
                                    <h4>Claim Anytime</h4>
                                    <p>Rewards accumulate forever. Claim daily, weekly,
                                        or whenever gas fees are low</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wp-tech-gas">
                        <h3>Gas Optimization</h3>
                        <div className="wp-gas-box">
                            <Zap className="wp-gas-icon" />
                            <div className="wp-gas-content">
                                <h4>We Made It Cheap</h4>
                                <p>
                                    Average transaction costs 40% less than similar protocols.
                                    How? We batch operations, optimize storage, and use the
                                    latest Solidity tricks. Your wallet will thank us.
                                </p>
                                <div className="wp-gas-stats">
                                    <div className="wp-gas-stat">
                                        <span className="wp-gas-label">Buy Transaction:</span>
                                        <span className="wp-gas-value">~80,000 gas</span>
                                    </div>
                                    <div className="wp-gas-stat">
                                        <span className="wp-gas-label">Claim Rewards:</span>
                                        <span className="wp-gas-value">~45,000 gas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wp-tech-summary">
                        <p className="wp-tech-tldr">
                            <strong>TL;DR:</strong> We use rock-solid smart contracts,
                            multiple security layers, and gas-optimized code to make
                            sure your investment is safe, efficient, and profitable.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}


export default WhitepaperTeam;