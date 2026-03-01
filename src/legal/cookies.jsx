import React, { useEffect, useState } from "react";
import PriceTickerMarquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import PageFooter from "../components/footer";
import { Cookie, Clock, Mail } from "lucide-react";
import "../styles/legal.css";
import { getFormattedDate } from "../utils/formatfunctions";


const CookiesPage = () => {
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
                        <h1 className="lg-title">Cookies Policy</h1>
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
                                This Cookies Policy explains how Meta Meme Vault ($MMV) uses cookies and similar technologies to recognize you
                                when you visit our website or use our services. It explains what these technologies are and why we use them,
                                as well as your rights to control our use of them.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">2</div>
                            <h2 className="lg-section-title">What are Cookies?</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                Cookies are small data files that are placed on your computer or mobile device when you visit a website. They
                                are widely used by website owners to make their websites work, or to work more efficiently, as well as to
                                provide reporting information.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">3</div>
                            <h2 className="lg-section-title">Why We Use Cookies</h2>
                        </div>
                        <div className="lg-content">
                            <p>We use cookies for the following purposes:</p>
                            <ul className="lg-list">
                                <li className="lg-list-item">To enable certain functions of our platform, such as remembering your preferences</li>
                                <li className="lg-list-item">To provide analytics about how our website and services are used</li>
                                <li className="lg-list-item">To store your preferences for future visits</li>
                                <li className="lg-list-item">To help us understand user behavior and improve our services</li>
                                <li className="lg-list-item">To enable personalized content and marketing</li>
                            </ul>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">4</div>
                            <h2 className="lg-section-title">Types of Cookies We Use</h2>
                        </div>
                        <div className="lg-content">
                            <p>We use the following types of cookies:</p>
                            <ul className="lg-list">
                                <li className="lg-list-item">
                                    <strong>Essential Cookies:</strong> These are necessary for the operation of our website and services. They
                                    include, for example, cookies that enable you to log into secure areas of our website or use our
                                    MemeTreasury.
                                </li>
                                <li className="lg-list-item">
                                    <strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of
                                    visitors and see how visitors move around our website when they are using it. This helps us improve the way
                                    our website works.
                                </li>
                                <li className="lg-list-item">
                                    <strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website. This
                                    enables us to personalize our content for you and remember your preferences.
                                </li>
                                <li className="lg-list-item">
                                    <strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have
                                    visited, and the links you have followed. We may use this information to make our website and the
                                    advertising displayed on it more relevant to your interests.
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">5</div>
                            <h2 className="lg-section-title">Third-Party Cookies</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of our
                                platform and deliver advertisements on and through our services.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">6</div>
                            <h2 className="lg-section-title">Your Choices Regarding Cookies</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the
                                help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you
                                might not be able to use all of the features we offer, you may not be able to store your preferences, and some
                                of our pages might not display properly.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">7</div>
                            <h2 className="lg-section-title">Cookies and Blockchain Interactions</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                Please note that while cookies are used on our website, our core blockchain interactions (such as connecting
                                your wallet or making transactions) do not rely on cookies. These interactions are handled through your
                                Ethereum wallet and the blockchain itself.
                            </p>
                        </div>
                    </section>

                    <section className="lg-section-card">
                        <div className="lg-section-header">
                            <div className="lg-section-number">8</div>
                            <h2 className="lg-section-title">Changes to This Cookies Policy</h2>
                        </div>
                        <div className="lg-content">
                            <p>
                                We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new
                                Cookies Policy on this page and updating the "Last updated" date at the top of this policy.
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
                                    If you have any questions about our Cookies Policy, please contact us at
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

export default CookiesPage;