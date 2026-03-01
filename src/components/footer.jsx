import React, { useEffect, useState } from "react";
import { Twitter, Send, Mail, ArrowUp, Zap, Shield, Globe, Users, ChevronRight } from "lucide-react";
import "../styles/footer.css";
import { mmv_logo_white } from "../assets";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, TELEGRAM_LINK, TWITTER_LINK } from "../config/social_helpers";

const PageFooter = () => {
    const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsBackToTopVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="ft-enhanced">
            {/* Animated Background */}
            <div className="ft-bg-wrapper">
                <div className="ft-gradient-orb ft-orb-1"></div>
                <div className="ft-gradient-orb ft-orb-2"></div>
                <div className="ft-grid-overlay"></div>
            </div>

            {/* Main Footer Content */}
            <div className="container">
                <div className="ft-main">
                    <div className="ft-content-grid">
                        {/* Brand Column */}
                        <div className="ft-brand">
                            <img src={mmv_logo_white} alt="MetaMemeVault" className="ft-logo-img" />
                            <h4 className="ft-tagline">The Ultimate Meme-to-Earn Platform</h4>
                            <p className="ft-description">
                                Lock $MMV, earn SHIB, PEPE, NEIRO & BONK.
                                The only memecoin that pays you in other memecoins.
                                Built by the community, for the community.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="ft-links-column">
                            <h4 className="ft-column-title">
                                <Zap className="ft-title-icon" />
                                Quick Links
                            </h4>
                            <ul className="ft-links-list">
                                <li>
                                    <Link to="/" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/how-to-buy" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        How to Buy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/#tokenomics" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Tokenomics
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/#meme-treasury" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        MemeTreasury
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="ft-links-column">
                            <h4 className="ft-column-title">
                                <Globe className="ft-title-icon" />
                                Resources
                            </h4>
                            <ul className="ft-links-list">
                                <li>
                                    <Link to="/audit" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Audit
                                    </Link>
                                </li>
                                <li>
                                    <a href="/whitepaper" target="_blank" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Whitepaper
                                    </a>
                                </li>
                                <li>
                                    <Link to="/#roadmap" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Roadmap
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/#faq" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        FAQs
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/help" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Need Help?
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="ft-links-column">
                            <h4 className="ft-column-title">
                                <Shield className="ft-title-icon" />
                                Legal
                            </h4>
                            <ul className="ft-links-list">
                                <li>
                                    <Link to="/privacy-policy" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms-and-conditions" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/cookies-policy" className="ft-link">
                                        <ChevronRight className="ft-link-icon" />
                                        Cookies Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="ft-socials-section">
                        <div className="ft-social-cards">
                            <a
                                href={TWITTER_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ft-social-card">
                                <Twitter className="ft-social-icon" />
                                <div className="ft-social-info">
                                    <span className="ft-social-name">Twitter/X</span>
                                    <span className="ft-social-handle">@metamemevault</span>
                                </div>
                            </a>
                            <a
                                href={TELEGRAM_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ft-social-card">
                                <Send className="ft-social-icon" />
                                <div className="ft-social-info">
                                    <span className="ft-social-name">Telegram</span>
                                    <span className="ft-social-handle">Join Community</span>
                                </div>
                            </a>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="ft-social-card">
                                <Mail className="ft-social-icon" />
                                <div className="ft-social-info">
                                    <span className="ft-social-name">Email</span>
                                    <span className="ft-social-handle">{CONTACT_EMAIL}</span>
                                </div>
                            </a>
                        </div>

                        <div className="ft-badges">
                            <div className="ft-trust-badge">
                                <Shield className="ft-badge-icon" />
                                <span>Audited</span>
                            </div>
                            <div className="ft-trust-badge">
                                <Users className="ft-badge-icon" />
                                <span>Community Driven</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="ft-bottom">
                        <div className="ft-copyright">
                            <p>&copy; {new Date().getFullYear()} MetaMemeVault | All Rights Reserved</p>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="ft-risk-disclaimer">
                        <p>
                            <strong>Disclaimer:</strong> Cryptocurrency investments carry high risk.
                            The value of cryptocurrencies may fluctuate significantly.
                            Profits may be subject to capital gains or other taxes applicable in your jurisdiction.
                            Always do your own research and invest responsibly.
                        </p>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                className={`ft-scroll-top ${isBackToTopVisible ? 'ft-visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top">
                <ArrowUp className="ft-top-icon" />
            </button>
        </footer>
    );
};

export default PageFooter; 