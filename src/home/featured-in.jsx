import { binancesqr, bitcoindaily, coincentral, coinmarketcap, cryptototem, decrypto, devto, hashnews, medium, openpr, paragraph, streetinsider, techbullion } from "../assets";
import "../styles/home/featured-in.css";

const FeaturedIn = () => {
    // Logo data with links - ADD YOUR REAL URLS HERE
    const logoData = [
        { img: cryptototem, url: "https://cryptototem.com/meta-meme-vault-mmv/", alt: "CryptoTotem" },
        { img: coincentral, url: "https://coincentral.com/why-25m-projects-failed-where-metamemevault-succeeds-meme-to-earn-changes-everything/", alt: "CoinCentral" },
        { img: streetinsider, url: "https://www.streetinsider.com/Binary+News+Network/MetaMemeVault+vs+Traditional+Staking%3A+Why+Earning+4+Memes+Beats+7%25+APY/25511533.html", alt: "Street Insider" },
        { img: binancesqr, url: "https://www.binance.com/en/square/post/31629535295881", alt: "Binance Square" },
        { img: techbullion, url: "https://techbullion.com/meme-to-earn-projects-lead-2025-why-smart-money-moved-from-doge-to-metamemevault/", alt: "Techbullion" },
        { img: coinmarketcap, url: "https://coinmarketcap.com/community/articles/6900eb9bee71ba4b7f3f71d0/", alt: "Coinmarketcap" },
        { img: bitcoindaily, url: "https://thebitcoindaily.info/metamemevault-announces-250k-usdt-giveaway-following-coinsult-security-audit/5961/", alt: "The bitcoin daily" },
        { img: openpr, url: "https://www.openpr.com/news/4208119/new-platform-metamemevault-offers-alternativeapproach", alt: "OpenPR" },
        { img: decrypto, url: "https://www.decryptoblog.com/new-platform-metamemevault-offers-alternativeapproach-to-memecoin-investing/", alt: "DeCrypto Blog" },
        { img: hashnews, url: "https://www.hashnews.us/new-platform-metamemevault-offers-alternative-approach-to-memecoin-investing/", alt: "Hash News" },
        { img: paragraph, url: "https://paragraph.com/@metamemevault/dollar0008-entry-200percent-bonus-earn-4-meme-coins-the-presale-everyones-talking-about", alt: "Paragraph" },
        { img: medium, url: "https://medium.com/@mmv_37246/how-to-earn-shib-pepe-bonk-neiro-from-one-presale-token-stage-1-live-e17a15365a32", alt: "Medium" },
        { img: devto, url: "https://dev.to/metamemevault/this-crypto-presale-pays-you-in-shib-pepe-bonk-neiro-while-you-hold-27ef", alt: "Dev.to" },
    ];

    // Triple for smoother infinite scroll
    const logos = Array(3).fill(logoData).flat();

    return (
        <section className="mmv-featured-section">
            {/* Background effects */}
            <div className="mmv-featured-bg-gradient"></div>
            <div className="mmv-featured-glow-orb mmv-orb-1"></div>
            <div className="mmv-featured-glow-orb mmv-orb-2"></div>

            <div className="mmv-featured-container">
                {/* Header with enhanced styling */}
                <div className="mmv-featured-header">
                    <span className="mmv-featured-badge">TRUSTED BY INDUSTRY LEADERS</span>
                    <h2 className="mmv-featured-title">
                        Featured <span className="mmv-featured-gradient-text">In</span>
                    </h2>
                    <p className="mmv-featured-subtitle">
                        Recognized by leading crypto media and news outlets worldwide
                    </p>
                </div>

                {/* Enhanced marquee wrapper */}
                <div className="mmv-featured-marquee-container">
                    {/* Glass effect overlay */}
                    <div className="mmv-featured-glass-overlay"></div>

                    {/* Marquee content */}
                    <div className="mmv-featured-marquee-wrapper">
                        <div className="mmv-featured-marquee" data-animated="true">
                            {logos.map((item, index) => (
                                <div key={index} className="mmv-featured-logo-item">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mmv-featured-logo-link"
                                        aria-label={item.alt}>
                                        <div className="mmv-featured-logo-card">
                                            <div className="mmv-featured-logo-inner">
                                                <img
                                                    src={item.img}
                                                    alt={item.alt}
                                                    className="mmv-featured-logo-img"
                                                    loading="lazy"
                                                />
                                                <div className="mmv-featured-logo-shine"></div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Duplicate for pause on hover effect */}
                        <div className="mmv-featured-marquee mmv-featured-marquee-duplicate" aria-hidden="true">
                            {logos.map((item, index) => (
                                <div key={`dup-${index}`} className="mmv-featured-logo-item">
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mmv-featured-logo-link"
                                        aria-label={item.alt}
                                        tabIndex="-1">
                                        <div className="mmv-featured-logo-card">
                                            <div className="mmv-featured-logo-inner">
                                                <img
                                                    src={item.img}
                                                    alt={item.alt}
                                                    className="mmv-featured-logo-img"
                                                    loading="lazy"
                                                />
                                                <div className="mmv-featured-logo-shine"></div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Edge fade effects */}
                    <div className="mmv-featured-fade-left"></div>
                    <div className="mmv-featured-fade-right"></div>
                </div>

                {/* Trust indicators */}
                <div className="mmv-featured-trust-bar">
                    <div className="mmv-featured-trust-item">
                        <span className="mmv-featured-trust-number">25M+</span>
                        <span className="mmv-featured-trust-label">Potential Reach</span>
                    </div>
                    <div className="mmv-featured-trust-divider"></div>
                    <div className="mmv-featured-trust-item">
                        <span className="mmv-featured-trust-number">16+</span>
                        <span className="mmv-featured-trust-label">Media Partners</span>
                    </div>
                    <div className="mmv-featured-trust-divider"></div>
                    <div className="mmv-featured-trust-item">
                        <span className="mmv-featured-trust-number">24/7</span>
                        <span className="mmv-featured-trust-label">Global Coverage</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedIn;