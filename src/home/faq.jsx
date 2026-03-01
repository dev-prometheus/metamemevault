import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Shield, Zap, TrendingUp, Coins, Rocket, Gift, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/home/faq.css";
import { TELEGRAM_LINK } from "../config/social_helpers";

const FaqHome = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const faqs = [
        {
            question: "What makes $MMV different from other meme tokens?",
            answer: "$MMV is a Meme-to-Earn platform where you lock your tokens and earn real rewards in NEIRO, SHIB, PEPE, and BONK. Unlike other meme tokens, $MMV holders earn actual passive income from established memecoins.",
            icon: Rocket,
            highlight: "Meme-to-Earn Platform",
            stats: "4+ Top Memecoins"
        },
        {
            question: "How do I buy $MMV?",
            answer: "Connect your wallet (MetaMask, Trust Wallet, or Best Wallet), then purchase with ETH, USDT, or credit card. The presale is live now with bonuses up to 200% for early investors.",
            icon: Coins,
            highlight: "Multiple Payment Options",
            stats: "Up to 200% Bonus"
        },
        {
            question: "How does MemeTreasury work?",
            answer: "Lock your $MMV tokens in MemeTreasury and choose which memecoin you want to earn: NEIRO, SHIB, PEPE, or BONK. Your rewards accumulate automatically and can be claimed 3 days after presale ends.",
            icon: TrendingUp,
            highlight: "Passive Earnings",
            stats: "4 Reward Options"
        },
        {
            question: "What are early investor bonuses?",
            answer: "Early presale investors receive bonus $MMV tokens based on purchase amount and stage. Stage 1 offers up to 200% bonus tokens. Bonus percentages decrease with each stage.",
            icon: Gift,
            highlight: "Stage 1 = Max Rewards",
            stats: "200% Bonus Available"
        },
        {
            question: "When can I claim my rewards?",
            answer: "Memecoin rewards (NEIRO, SHIB, PEPE, BONK) can be claimed 3 days after the presale ends. Your $MMV tokens are available immediately at launch.",
            icon: Zap,
            highlight: "3 Days Post-Presale",
            stats: "Instant $MMV Access"
        },
        {
            question: "Can $MMV be used for gas fees?",
            answer: "Yes. We're implementing $MMV as an alternative gas token, allowing you to interact with MemeTreasury and claim rewards without spending ETH on gas fees.",
            icon: Shield,
            highlight: "Gas-Free Interactions",
            stats: "Save on ETH Gas"
        },
        {
            question: "What other memecoins will be added?",
            answer: "Our roadmap includes adding memecoins from Solana (like CATWIFHAT), Base chain, and other networks. The community votes on new additions. We're expanding to 10+ memecoins across multiple chains.",
            icon: Globe,
            highlight: "Multi-Chain Expansion",
            stats: "10+ Memecoins Planned"
        },
        {
            question: "Where will $MMV be listed after presale?",
            answer: "$MMV will launch on major DEXes with deep liquidity pools, followed by CEX listings on tier-1 exchanges. A comprehensive marketing campaign is planned to support the launch.",
            icon: Lock,
            highlight: "Tier-1 Exchange Listings",
            stats: "5+ DEX/CEX Targets"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-enhanced" ref={sectionRef}>
            <div className="faq-background">
                <div className="faq-gradient-orb faq-gradient-orb-1"></div>
                <div className="faq-gradient-orb faq-gradient-orb-2"></div>
                <div className="faq-grid-pattern"></div>
            </div>

            <div className="container">
                <div className={`faq-content-wrapper ${isVisible ? 'faq-visible' : ''}`}>
                    <div className="faq-header-enhanced">
                        <div className="faq-badge">
                            <Shield className="faq-badge-icon" />
                            <span>Knowledge Base</span>
                        </div>
                        <h2 className="faq-title">
                            <span className="faq-title-gradient">Frequently Asked</span>
                            <span className="faq-title-accent"> Questions</span>
                        </h2>
                        <p className="faq-subtitle">
                            Everything you need to know about $MMV and the MemeTreasury ecosystem
                        </p>
                    </div>

                    <div className="faq-items-container">
                        {faqs.map((faq, index) => {
                            const Icon = faq.icon;
                            return (
                                <div
                                    key={index}
                                    className={`faq-item-enhanced ${openIndex === index ? "faq-open" : ""}`}
                                    style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div
                                        className="faq-question-enhanced"
                                        onClick={() => toggleFAQ(index)}>
                                        <div className="faq-question-content">
                                            <div className="faq-icon-wrapper">
                                                <Icon className="faq-question-icon" />
                                            </div>
                                            <div className="faq-question-text">
                                                <h3>{faq.question}</h3>
                                                {faq.highlight && (
                                                    <span className="faq-highlight-badge">
                                                        {faq.highlight}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="faq-toggle-icon">
                                            {openIndex === index ?
                                                <ChevronUp className="faq-chevron" /> :
                                                <ChevronDown className="faq-chevron" />
                                            }
                                        </div>
                                    </div>

                                    <div className="faq-answer-enhanced">
                                        <div className="faq-answer-content">
                                            <p>{faq.answer}</p>
                                            {faq.stats && (
                                                <div className="faq-answer-stats">
                                                    <TrendingUp className="faq-stats-icon" />
                                                    <span>{faq.stats}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="faq-footer-enhanced">
                        <div className="faq-cta-card">
                            <div className="faq-cta-content">
                                <h3>Still have questions?</h3>
                                <p>Our support team is available 24/7 to help you get started</p>
                            </div>
                            <div className="faq-cta-buttons">
                                <Link to="/contact" className="faq-contact-btn">
                                    <span>Get Support</span>
                                    <Zap className="faq-btn-icon" />
                                </Link>
                                <a
                                    href={TELEGRAM_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="faq-telegram-btn">
                                    <span>Join Telegram</span>
                                    <Globe className="faq-btn-icon" />
                                </a>
                            </div>
                        </div>

                        <div className="faq-trust-badges">
                            <div className="faq-badge-item">
                                <Lock className="faq-badge-icon" />
                                <span>Audited by Coinsult</span>
                            </div>
                            <div className="faq-badge-item">
                                <Shield className="faq-badge-icon" />
                                <span>Secure Smart Contracts</span>
                            </div>
                            <div className="faq-badge-item">
                                <Zap className="faq-badge-icon" />
                                <span>Active Community</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqHome;