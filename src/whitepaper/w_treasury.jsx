import {
    Lock,
    Shield,
    Wallet,
    ArrowRight,
    CheckCircle,
    Database,
    Key,
    AlertTriangle,
    Calculator,
    Clock,
    TrendingUp
} from "lucide-react"

const WhitepaperTreasury = () => {
    return (
        <>
            {/* MemeTreasury Section */}
            <section className="wp-treasury">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        The Money Machine: MemeTreasury
                    </h2>

                    <div className="wp-treasury-intro">
                        <p className="wp-lead">
                            The MemeTreasury generates passive income by distributing SHIB, PEPE, NEIRO, and BONK
                            to MMV holders daily.
                        </p>
                    </div>

                    <div className="wp-treasury-how">
                        <h3>How Your Money Multiplies</h3>

                        <div className="wp-treasury-steps">
                            <div className="wp-step">
                                <div className="wp-step-number">1</div>
                                <Lock className="wp-step-icon" />
                                <h4>Buy & Auto-Lock</h4>
                                <p>
                                    Purchase $MMV with ETH, USDT, or Credit Card (min $20).
                                    Your tokens are AUTOMATICALLY locked in the treasury.
                                    No extra steps, no confusion.
                                </p>
                            </div>

                            <div className="wp-step-arrow">
                                <ArrowRight />
                            </div>

                            <div className="wp-step">
                                <div className="wp-step-number">2</div>
                                <Database className="wp-step-icon" />
                                <h4>Choose Your Reward</h4>
                                <p>
                                    Pick SHIB, PEPE, NEIRO, or BONK. Can't decide? Change it
                                    anytime before claiming. Your choice, your rewards.
                                </p>
                            </div>

                            <div className="wp-step-arrow">
                                <ArrowRight />
                            </div>

                            <div className="wp-step">
                                <div className="wp-step-number">3</div>
                                <Wallet className="wp-step-icon" />
                                <h4>Claim Your Earnings</h4>
                                <p>
                                    3 days after presale ends, rewards start flowing.
                                    Claim daily, weekly, or let them accumulate. Your call.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* REWARD DISTRIBUTION FORMULA - DETAILED */}
                    <div className="wp-reward-formula">
                        <h3>The Math Behind Your Rewards</h3>

                        <div className="wp-formula-box">
                            <Calculator className="wp-formula-icon" />
                            <h4>Reward Calculation Formula</h4>

                            <div className="wp-formula-equation">
                                <div className="wp-equation">
                                    Your Daily Reward = <span className="wp-highlight">(Your MMV / Total Locked MMV)</span> × Daily Reward Pool
                                </div>
                            </div>

                            <div className="wp-formula-breakdown">
                                <h5>What This Means:</h5>
                                <ul>
                                    <li><strong>Your MMV:</strong> Base tokens + Bonus tokens you own</li>
                                    <li><strong>Total Locked MMV:</strong> All tokens in the treasury</li>
                                    <li><strong>Daily Reward Pool:</strong> 13% of treasury allocated to buy memecoins daily</li>
                                </ul>
                            </div>
                        </div>

                        <div className="wp-reward-examples">
                            <div className="wp-treasury-funding-note" style={{ background: '#1a1c24', padding: '15px', borderLeft: '3px solid #4b5ae4', marginBottom: '20px' }}>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}><strong>How Treasury Funding Works:</strong> 13% of presale funds ($1.18M from $9.13M target) seeds the MemeTreasury. This capital generates yield through strategic DeFi investments. Daily rewards come from treasury growth, not spending the principal. Examples below assume full presale success.</p>
                            </div>

                            <h4>Real-World Examples</h4>

                            <div className="wp-example-grid">
                                <div className="wp-example-card">
                                    <div className="wp-example-header">
                                        <span className="wp-example-label">Small Investor</span>
                                        <TrendingUp size={20} />
                                    </div>
                                    <div className="wp-example-scenario">
                                        <p><strong>You Hold:</strong> 10,000 MMV (0.001% of supply)</p>
                                        <p><strong>Treasury Distributes:</strong> $100,000 in SHIB daily</p>
                                        <p><strong>Your Daily Reward:</strong> $1 in SHIB</p>
                                        <p><strong>Your Monthly Reward:</strong> ~$30 in SHIB</p>
                                        <p><strong>Your Yearly Reward:</strong> ~$365 in SHIB</p>
                                    </div>
                                    <div className="wp-example-note">
                                        Initial investment: ~$80 @ Stage 1 prices
                                    </div>
                                </div>

                                <div className="wp-example-card">
                                    <div className="wp-example-header">
                                        <span className="wp-example-label">Medium Investor</span>
                                        <TrendingUp size={20} />
                                    </div>
                                    <div className="wp-example-scenario">
                                        <p><strong>You Hold:</strong> 100,000 MMV (0.01% of supply)</p>
                                        <p><strong>Treasury Distributes:</strong> $100,000 in PEPE daily</p>
                                        <p><strong>Your Daily Reward:</strong> $10 in PEPE</p>
                                        <p><strong>Your Monthly Reward:</strong> ~$300 in PEPE</p>
                                        <p><strong>Your Yearly Reward:</strong> ~$3,650 in PEPE</p>
                                    </div>
                                    <div className="wp-example-note">
                                        Initial investment: ~$800 @ Stage 1 prices
                                    </div>
                                </div>

                                <div className="wp-example-card wp-example-highlight">
                                    <div className="wp-example-header">
                                        <span className="wp-example-label">Large Investor</span>
                                        <TrendingUp size={20} />
                                    </div>
                                    <div className="wp-example-scenario">
                                        <p><strong>You Hold:</strong> 1,000,000 MMV (0.1% of supply)</p>
                                        <p><strong>Treasury Distributes:</strong> $100,000 in NEIRO daily</p>
                                        <p><strong>Your Daily Reward:</strong> $100 in NEIRO</p>
                                        <p><strong>Your Monthly Reward:</strong> ~$3,000 in NEIRO</p>
                                        <p><strong>Your Yearly Reward:</strong> ~$36,500 in NEIRO</p>
                                    </div>
                                    <div className="wp-example-note">
                                        Initial investment: ~$8,000 @ Stage 1 prices
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wp-formula-disclaimer">
                            <AlertTriangle size={20} />
                            <p>
                                <strong>Important:</strong> These are ILLUSTRATIVE examples based on
                                projected treasury size. Actual rewards will vary based on total MMV
                                locked, treasury performance, and market conditions. Not guaranteed returns.
                            </p>
                        </div>
                    </div>

                    {/* CLARIFIED CLAIMING MECHANICS */}
                    <div className="wp-claim-mechanics">
                        <h3>Token Claiming Details</h3>

                        <div className="wp-mechanics-grid">
                            <div className="wp-mechanics-card">
                                <Clock className="wp-mechanics-icon" />
                                <h4>Base MMV Tokens</h4>
                                <p className="wp-mechanics-timing">Available: Immediately after presale ends</p>
                                <ul className="wp-mechanics-list">
                                    <li>These are your purchased tokens (not bonus)</li>
                                    <li>Claimable as soon as presale closes</li>
                                    <li>Can be held or traded on DEX</li>
                                    <li>Must remain locked for rewards</li>
                                </ul>
                            </div>

                            <div className="wp-mechanics-card">
                                <Clock className="wp-mechanics-icon" />
                                <h4>Bonus MMV Tokens</h4>
                                <p className="wp-mechanics-timing">Available: 30 days after presale ends</p>
                                <ul className="wp-mechanics-list">
                                    <li>These are your bonus tokens (50%-200%)</li>
                                    <li>30-day lock prevents dumping</li>
                                    <li>Ensures long-term holder commitment</li>
                                    <li>Claimable after vesting period</li>
                                </ul>
                            </div>

                            <div className="wp-mechanics-card wp-mechanics-highlight">
                                <Clock className="wp-mechanics-icon" />
                                <h4>Reward Tokens (SHIB/PEPE/etc)</h4>
                                <p className="wp-mechanics-timing">Available: 3 days after presale ends</p>
                                <ul className="wp-mechanics-list">
                                    <li>MemeTreasury goes live 3 days post-presale</li>
                                    <li>Rewards accumulate from day 1</li>
                                    <li>Claim anytime - no lock period</li>
                                    <li>Switch reward token before claiming</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="wp-treasury-rewards">
                        <h3>Your Reward Options</h3>
                        <div className="wp-rewards-grid">
                            <div className="wp-reward-card">
                                <div className="wp-reward-header">
                                    <span className="wp-reward-symbol">SHIB</span>
                                    <span className="wp-reward-badge">Ethereum</span>
                                </div>
                                <p className="wp-reward-desc">
                                    The OG meme giant with a $15B+ market cap and its own blockchain
                                </p>
                            </div>
                            <div className="wp-reward-card">
                                <div className="wp-reward-header">
                                    <span className="wp-reward-symbol">PEPE</span>
                                    <span className="wp-reward-badge">Ethereum</span>
                                </div>
                                <p className="wp-reward-desc">
                                    The frog that turned meme culture into a multi-billion dollar asset
                                </p>
                            </div>
                            <div className="wp-reward-card">
                                <div className="wp-reward-header">
                                    <span className="wp-reward-symbol">NEIRO</span>
                                    <span className="wp-reward-badge">Ethereum</span>
                                </div>
                                <p className="wp-reward-desc">
                                    The new dog in town making waves with explosive growth potential
                                </p>
                            </div>
                            <div className="wp-reward-card">
                                <div className="wp-reward-header">
                                    <span className="wp-reward-symbol">BONK</span>
                                    <span className="wp-reward-badge">Ethereum</span>
                                </div>
                                <p className="wp-reward-desc">
                                    Solana's favorite meme with massive community backing
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="wp-treasury-tiers">
                        <h3>Staking Tiers (Coming Post-Launch)</h3>
                        <div className="wp-tiers-table">
                            <div className="wp-tier">
                                <span className="wp-tier-name">Bronze</span>
                                <span className="wp-tier-req">1K - 10K MMV</span>
                                <span className="wp-tier-apy">120% APY</span>
                            </div>
                            <div className="wp-tier">
                                <span className="wp-tier-name">Silver</span>
                                <span className="wp-tier-req">10K - 50K MMV</span>
                                <span className="wp-tier-apy">150% APY</span>
                            </div>
                            <div className="wp-tier">
                                <span className="wp-tier-name">Gold</span>
                                <span className="wp-tier-req">50K - 250K MMV</span>
                                <span className="wp-tier-apy">200% APY</span>
                            </div>
                            <div className="wp-tier wp-tier-best">
                                <span className="wp-tier-name">Platinum</span>
                                <span className="wp-tier-req">250K+ MMV</span>
                                <span className="wp-tier-apy">250% APY</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section className="wp-security">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        Multi-Layer Security Protection
                        <Shield className="wp-title-icon" />
                    </h2>

                    <div className="wp-security-intro">
                        <p className="wp-lead">
                            Smart contract security is our top priority. Multiple independent audits,
                            locked liquidity, and transparent on-chain verification protect your investment.
                            
                        </p>
                    </div>

                    <div className="wp-security-features">
                        <div className="wp-security-card">
                            <Key className="wp-security-icon" />
                            <h4>Multi-Sig Treasury</h4>
                            <p>
                                3 out of 5 signatures required for any treasury movement.
                                No single person can run with the funds. Ever.
                            </p>
                            <div className="wp-security-detail">
                                <strong>Transparency:</strong> All multi-sig addresses publicly
                                verifiable on Etherscan. View transaction history anytime.
                            </div>
                        </div>

                        <div className="wp-security-card">
                            <Shield className="wp-security-icon" />
                            <h4>Triple Audited Contracts</h4>
                            <p>
                                Audited by Coinsult, SCRL.io, and monitored by GoPlus Labs.
                                Every vulnerability patched before launch.
                            </p>
                            <div className="wp-security-detail">
                                <strong>Result:</strong> Zero critical or high-severity issues found.
                                <a href="/audit"> View full audit reports →</a>
                            </div>
                        </div>

                        <div className="wp-security-card">
                            <Lock className="wp-security-icon" />
                            <h4>Liquidity Locked</h4>
                            <p>
                                100% of DEX liquidity locked for 2 years minimum through
                                reputable lock services. This prevents rug pulls.
                            </p>
                            <div className="wp-security-detail">
                                <strong>Proof:</strong> Lock contract address and duration
                                verifiable on-chain. Full transparency.
                            </div>
                        </div>

                        <div className="wp-security-card">
                            <Database className="wp-security-icon" />
                            <h4>On-Chain Transparency</h4>
                            <p>
                                Every transaction visible on Etherscan.
                                Track treasury movements in real-time. Zero secrets.
                            </p>
                            <div className="wp-security-detail">
                                <strong>Contract:</strong> 0x8e737F5E206d5E94c2890e83b2D4Df82fC7c089C
                                <a href="https://etherscan.io/address/0x8e737f5e206d5e94c2890e83b2d4df82fc7c089c" target="_blank" rel="noopener noreferrer"> Verify →</a>
                            </div>
                        </div>
                    </div>

                    <div className="wp-security-promise">
                        <div className="wp-promise-box">
                            <CheckCircle className="wp-promise-icon" />
                            <h3>Our Security Promise</h3>
                            <ul className="wp-promise-list">
                                <li>No team tokens unlocked for 6 months</li>
                                <li>No hidden wallets or backdoors</li>
                                <li>No ability to mint new tokens</li>
                                <li>No pause or freeze functions on user wallets</li>
                                <li>No honeypot mechanics</li>
                                <li>100% open-source code on GitHub</li>
                            </ul>
                            <p className="wp-promise-footer">
                                Sleep easy. Your investment is protected by code, not promises.
                                Everything is verifiable on-chain.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Buy Section */}
            <section className="wp-how-to-buy">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        How to Buy $MMV Tokens
                    </h2>

                    <div className="wp-htb-intro">
                        <p className="wp-lead">
                            Five minutes. That's all it takes to secure your spot in the
                            future of meme investing. Here's your step-by-step guide.
                        </p>
                    </div>

                    <div className="wp-htb-steps">
                        <div className="wp-htb-card">
                            <div className="wp-htb-header">
                                <span className="wp-htb-step">Step 1</span>
                                <Wallet className="wp-htb-icon" />
                            </div>
                            <h4>Get a Wallet</h4>
                            <p>Download MetaMask (desktop) or Trust Wallet (mobile)</p>
                            <ul className="wp-htb-list">
                                <li>Create new wallet</li>
                                <li>Save your seed phrase (seriously, save it)</li>
                                <li>Set a strong password</li>
                            </ul>
                        </div>

                        <div className="wp-htb-card">
                            <div className="wp-htb-header">
                                <span className="wp-htb-step">Step 2</span>
                                <Database className="wp-htb-icon" />
                            </div>
                            <h4>Get ETH or USDT</h4>
                            <p>You'll need crypto or use your credit card</p>
                            <ul className="wp-htb-list">
                                <li><strong>Option A:</strong> Buy ETH/USDT on Coinbase or Binance</li>
                                <li><strong>Option B:</strong> Use credit/debit card directly</li>
                                <li>Keep extra ETH for gas fees (~$20-50)</li>
                            </ul>
                        </div>

                        <div className="wp-htb-card">
                            <div className="wp-htb-header">
                                <span className="wp-htb-step">Step 3</span>
                                <ArrowRight className="wp-htb-icon" />
                            </div>
                            <h4>Connect & Buy</h4>
                            <p>Visit metamemevault.com and connect your wallet</p>
                            <ul className="wp-htb-list">
                                <li>Click "Connect Wallet"</li>
                                <li>Choose: ETH, USDT, or Card payment</li>
                                <li>Enter amount (minimum: $20)</li>
                                <li>Confirm transaction</li>
                            </ul>
                        </div>

                        <div className="wp-htb-card wp-htb-highlight">
                            <div className="wp-htb-header">
                                <span className="wp-htb-step">Done!</span>
                                <CheckCircle className="wp-htb-icon" />
                            </div>
                            <h4>You're In!</h4>
                            <p>Welcome to the MMV family</p>
                            <ul className="wp-htb-list">
                                <li>Your tokens are automatically locked</li>
                                <li>Choose your reward token (SHIB/PEPE/NEIRO/BONK)</li>
                                <li>Share your referral link for 5% bonus</li>
                                <li>Rewards start 3 days after presale ends</li>
                            </ul>
                        </div>
                    </div>

                    <div className="wp-htb-tip">
                        <AlertTriangle className="wp-tip-icon" />
                        <div className="wp-tip-content">
                            <h4>Pro Tips</h4>
                            <p>
                                <strong>Gas Fees:</strong> Lowest during weekends and late nights (UTC).
                                Plan your purchase accordingly to save on fees.
                            </p>
                            <p>
                                <strong>Stage Timing:</strong> Each stage ends when tokens sell out
                                (not time-based). Don't wait - bonuses decrease with each stage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhitepaperTreasury;