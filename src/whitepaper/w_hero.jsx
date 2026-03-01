import { Rocket, TrendingUp, Users, Shield } from "lucide-react"
import { mmv_logo_colored } from "../assets"

const WhitepaperHero = () => {
    return (
        <>
            {/* Hero Cover */}
            <section className="wp-hero">
                <div className="wp-hero-bg">
                    <div className="wp-hero-particles"></div>
                </div>
                <div className="wp-container">
                    <div className="wp-hero-content">
                        <img 
                            src={mmv_logo_colored} 
                            alt="MMV" 
                            className="wp-hero-logo"
                        />
                        <h1 className="wp-hero-title">
                            <span className="wp-text-gradient">MetaMemeVault</span>
                        </h1>
                        <p className="wp-hero-subtitle">
                            Earn Passive Income from Top Memecoins with $MMV
                        </p>
                        <div className="wp-hero-tagline">
                            Lock $MMV. Earn SHIB, PEPE, NEIRO & BONK Daily.
                        </div>
                        <div className="wp-hero-version">
                            Whitepaper v2.0 | September 2025
                        </div>
                    </div>
                </div>
                <div className="wp-scroll-hint">
                    <span>Scroll to discover</span>
                    <div className="wp-scroll-arrow"></div>
                </div>
            </section>

            {/* Executive Summary */}
            <section className="wp-executive">
                <div className="wp-container">
                    <h2 className="wp-section-title">
                        Let's Cut to the Chase
                    </h2>
                    
                    <div className="wp-executive-intro">
                        <p className="wp-lead">
                            You've seen memecoins multiply 1000x. You've also seen them crash to zero. 
                            What if you could earn from the winners without risking it all on one bet?
                        </p>
                        <p className="wp-highlight-text">
                            Welcome to MetaMemeVault - where we turned FOMO into a strategy.
                        </p>
                    </div>

                    <div className="wp-executive-cards">
                        <div className="wp-exec-card">
                            <div className="wp-exec-icon">
                                <Rocket />
                            </div>
                            <h3>The Problem We Solve</h3>
                            <p>
                                99% of memecoins fail. But that 1%? They create millionaires overnight. 
                                The trick isn't picking the winner - it's earning from ALL the top performers.
                            </p>
                        </div>

                        <div className="wp-exec-card">
                            <div className="wp-exec-icon">
                                <TrendingUp />
                            </div>
                            <h3>Our Solution</h3>
                            <p>
                                Lock your $MMV. Choose your rewards (SHIB, PEPE, NEIRO, or BONK). 
                                Sit back while our treasury generates passive income from the meme economy's 
                                blue chips.
                            </p>
                        </div>

                        <div className="wp-exec-card">
                            <div className="wp-exec-icon">
                                <Users />
                            </div>
                            <h3>Why Now?</h3>
                            <p>
                                The memecoin market hit $100B in 2024. It's projected to reach $220B by 2026. 
                                Early $MMV investors don't just ride the wave - they own the surfboard.
                            </p>
                        </div>

                        <div className="wp-exec-card">
                            <div className="wp-exec-icon">
                                <Shield />
                            </div>
                            <h3>Your Edge</h3>
                            <p>
                                Stage 1 investors get 200% bonus tokens. That's not a typo. 
                                While others chase price spikes, you're building a passive income machine 
                                that pays in memes.
                            </p>
                        </div>
                    </div>

                    <div className="wp-exec-metrics">
                        <div className="wp-metric">
                            <span className="wp-metric-value">$9.13M</span>
                            <span className="wp-metric-label">Target Raise</span>
                        </div>
                        <div className="wp-metric">
                            <span className="wp-metric-value">200%</span>
                            <span className="wp-metric-label">Early Bird Bonus</span>
                        </div>
                        <div className="wp-metric">
                            <span className="wp-metric-value">4 Memes</span>
                            <span className="wp-metric-label">Reward Options</span>
                        </div>
                        <div className="wp-metric">
                            <span className="wp-metric-value">$0.068</span>
                            <span className="wp-metric-label">Listing Target</span>
                        </div>
                    </div>

                    <div className="wp-exec-bottom">
                        <p className="wp-exec-cta">
                            Ready to stop watching from the sidelines? Let's dive into how MMV 
                            turns meme magic into real money. 👇
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhitepaperHero