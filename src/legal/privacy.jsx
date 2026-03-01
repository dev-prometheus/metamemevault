import React, { useEffect, useState } from "react";
import PriceTickerMarquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import PageFooter from "../components/footer";
import { Shield, Clock, Mail } from "lucide-react";
import "../styles/legal.css";
import { getFormattedDate } from "../utils/formatfunctions";


const PrivacyPage = () => {
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
                        <h1 className="lg-title">Privacy Policy</h1>
                        <div className="lg-last-updated">
                            <Clock className="lg-update-icon" />
                            <span>Last updated: {getFormattedDate()}</span>
                        </div>
                    </div>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">1</div>
                            <h2 className="lg-section-title">Introduction</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                Welcome to Meta Meme Vault ($MMV). This Privacy Policy explains how we collect, use, disclose, and safeguard
                                your information when you use our website, participate in our presale, or interact with our MemeTreasury
                                platform. We are committed to protecting your personal information and your right to privacy in the
                                decentralized finance (DeFi) space.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">2</div>
                            <h2 className="lg-section-title">Information We Collect</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                We may collect personal information that you provide directly to us when you use our services. This may
                                include:
                            </p>
                            <ul className="lg-list">
                                <li className="lg-list-item">Email address (for communication and updates)</li>
                                <li className="lg-list-item">Ethereum wallet address</li>
                                <li className="lg-list-item">Transaction data related to $MMV token purchases and MemeTreasury interactions</li>
                                <li className="lg-list-item">Information about the memecoins you choose to earn as rewards</li>
                                <li className="lg-list-item">Referral data if you participate in our referral program</li>
                            </ul>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">3</div>
                            <h2 className="lg-section-title">How We Use Your Information</h2>
                        </div>
                        <div className="lg-content">
                            <p>We use the information we collect to:</p>
                            <ul className="lg-list">
                                <li className="lg-list-item">Facilitate your participation in the $MMV presale and MemeTreasury</li>
                                <li className="lg-list-item">Process transactions and distribute meme token rewards</li>
                                <li className="lg-list-item">Provide customer support and respond to your inquiries</li>
                                <li className="lg-list-item">Send important updates about $MMV, including changes to our terms or policies</li>
                                <li className="lg-list-item">Improve our services and develop new features</li>
                                <li className="lg-list-item">Prevent fraud and ensure the security of our platform</li>
                            </ul>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">4</div>
                            <h2 className="lg-section-title">Blockchain Data</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                Please note that blockchain technology, by its nature, is transparent. When you interact with the $MMV smart
                                contract or the MemeTreasury, your Ethereum address and transaction data will be publicly visible on the
                                Ethereum blockchain. We do not control and are not responsible for any personal information you may choose to
                                share on the blockchain.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">5</div>
                            <h2 className="lg-section-title">Sharing of Information</h2>
                        </div>
                        <div className="lg-content">
                            <p>We do not sell your personal information. We may share your information in the following situations:</p>
                            <ul className="lg-list">
                                <li className="lg-list-item">With service providers who help us operate our platform and provide customer support</li>
                                <li className="lg-list-item">To comply with applicable laws and regulations</li>
                                <li className="lg-list-item">To protect the rights, property, or safety of Meta Meme Vault, our users, or others</li>
                            </ul>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">6</div>
                            <h2 className="lg-section-title">Security</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                We implement reasonable security measures to protect your personal information. However, please be aware that
                                no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to
                                use commercially acceptable means to protect your personal information, we cannot guarantee its absolute
                                security.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">7</div>
                            <h2 className="lg-section-title">Your Rights</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                Depending on your location, you may have certain rights regarding your personal information, such as the right
                                to access, correct, or delete your data. Please contact us if you wish to exercise any of these rights.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">8</div>
                            <h2 className="lg-section-title">Changes to This Privacy Policy</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                We may update our Privacy Policy from time to time to reflect changes in our practices or for other
                                operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new
                                Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card lg-contact-section">
                        <div className="lg-contact-content">
                            <Mail className="lg-contact-icon" />
                            <div className="lg-section-header">
                                <div className="lg-section-number">9</div>
                                <h2 className="lg-section-title">Contact Us</h2>
                            </div>
                            <div className="lg-content">
                                <p>
                                    If you have any questions about this Privacy Policy or our data practices, please contact us at
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

export default PrivacyPage;