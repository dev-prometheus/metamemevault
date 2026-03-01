import React, { useEffect, useState } from "react";
import PriceTickerMarquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import PageFooter from "../components/footer";
import { FileText, Clock, Mail } from "lucide-react";
import "../styles/legal.css";
import { getFormattedDate } from "../utils/formatfunctions";


const TermsPage = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="lg-section">
            <div className="lg-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

            <PriceTickerMarquee />
            <PageNavbar />
            <main>
                {/* Animated Background */}
                <div className="lg-bg-wrapper">
                    <div className="lg-gradient-orb lg-orb-1"></div>
                    <div className="lg-gradient-orb lg-orb-2"></div>
                    <div className="lg-grid-pattern"></div>
                </div>

                <div className="lg-container">
                    <div className="lg-header">
                        <h1 className="lg-title">Terms and Conditions</h1>
                        <div className="lg-last-updated">
                            <Clock className="lg-update-icon" />
                            <span>Last updated: {getFormattedDate()}</span>
                        </div>
                    </div>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">1</div>
                            <h2 className="lg-section-title">Acceptance of Terms</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                By accessing or using Meta Meme Vault ($MMV), including our website, participating in our presale, or
                                interacting with our MemeTreasury platform, you agree to be bound by these Terms and Conditions. If you
                                disagree with any part of the terms, you may not access or use our services.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">2</div>
                            <h2 className="lg-section-title">Description of Service</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                Meta Meme Vault provides a platform for users to participate in a presale of $MMV tokens, lock these tokens in
                                the MemeTreasury, and earn rewards in various memecoins. Our services operate on the Ethereum blockchain and
                                interact with smart contracts.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">3</div>
                            <h2 className="lg-section-title">Eligibility</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                You must be at least 18 years old and have the capacity to enter into a binding contract to use our services.
                                By using Meta Meme Vault, you represent and warrant that you meet these eligibility requirements.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">4</div>
                            <h2 className="lg-section-title">User Responsibilities</h2>
                        </div>
                        <div className="lg-content">
                            <p>You agree to:</p>
                            <ul className="lg-list">
                                <li className="lg-list-item">Provide accurate and complete information when using our services</li>
                                <li className="lg-list-item">Maintain the security of your wallet and private keys</li>
                                <li className="lg-list-item">Comply with all applicable laws and regulations in your jurisdiction</li>
                                <li className="lg-list-item">Not use our services for any illegal or unauthorized purpose</li>
                            </ul>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">5</div>
                            <h2 className="lg-section-title">Risks and Disclaimers</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                Cryptocurrency investments, including $MMV and other memecoins, carry high risk. The value of tokens can be
                                extremely volatile. You should only participate in our presale or use our MemeTreasury with funds you can
                                afford to lose. We do not guarantee any returns or profits from using our services.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">6</div>
                            <h2 className="lg-section-title">Intellectual Property</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                The content, features, and functionality of Meta Meme Vault, including but not limited to text, graphics,
                                logos, and software, are owned by us and are protected by international copyright, trademark, and other
                                intellectual property laws.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">7</div>
                            <h2 className="lg-section-title">Limitation of Liability</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                To the maximum extent permitted by law, Meta Meme Vault and its affiliates shall not be liable for any
                                indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use,
                                arising out of or in connection with these Terms or your use of our services.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">8</div>
                            <h2 className="lg-section-title">Governing Law</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without
                                regard to its conflict of law provisions.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">9</div>
                            <h2 className="lg-section-title">Changes to Terms</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                We reserve the right to modify these Terms at any time. We will notify users of any material changes by
                                posting the new Terms on this page and updating the "Last updated" date.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card lg-contact-section">
                        <div className="lg-contact-content">
                            <Mail className="lg-contact-icon" />
                            <div className="lg-section-header">
                                <div className="lg-section-number">10</div>
                                <h2 className="lg-section-title">Contact Us</h2>
                            </div>
                            <div className="lg-content">
                                <p>
                                    If you have any questions about these Terms, please contact us at
                                    <a href="mailto:mmv@metamemevault.com" className="lg-link"> mmv@metamemevault.com</a>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <PageFooter />
        </div>
    );
};

export default TermsPage;