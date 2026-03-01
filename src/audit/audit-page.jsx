import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Lock, ExternalLink, FileText, AlertCircle, TrendingUp, Users, Star, Zap, Award, ArrowRight, Copy, Check, BarChart3, Database } from 'lucide-react';
import PageNavbar from '../components/navbar';
import PageFooter from '../components/footer';
import SEO from '../components/SEO';
import PriceTickerMarquee from '../components/marquee';
import '../styles/audit.css';
import { coinsult_logo, scrl_logo, goplus_logo } from '../assets';


const AuditPage = () => {
    const [copied, setCopied] = useState(false);
    const [activeAudit, setActiveAudit] = useState(0);
    const [animateStats, setAnimateStats] = useState(false);

    const CONTRACT_ADDRESS = "0x8e737F5E206d5E94c2890e83b2D4Df82fC7c089C";

    const audits = [
        {
            id: 'internal',
            name: 'Internal Audit',
            by: 'MetaMemeVault Engineers',
            status: 'Completed',
            score: '100%',
            badge: 'VERIFIED',
            color: '#4b5ae4',
            description: 'Comprehensive internal security review by our top blockchain engineers',
            highlights: ['Zero vulnerabilities', 'Gas optimized', 'Battle-tested code'],
            icon: <Shield size={24} />,
            logo: null // Internal audit doesn't need external logo
        },
        {
            id: 'coinsult',
            name: 'Coinsult Audit',
            status: 'Completed',
            score: '100%',
            badge: 'AUDITED',
            color: '#00D4FF',
            description: 'Professional third-party audit ensuring highest security standards',
            reportUrl: 'https://github.com/Coinsult/Audits/blob/main/Coinsult_MetaMemeVault_0x8e...089c_Audit.pdf',
            pageUrl: 'https://app.coinsult.net/eth/0x8e737f5e206d5e94c2890e83b2d4df82fc7c089c',
            highlights: ['No critical issues', 'Fully transparent', 'Publicly verifiable'],
            icon: <Award size={24} />,
            logo: coinsult_logo
        },
        {
            id: 'scrl',
            name: 'SCRL.io Audit',
            status: 'Completed',
            score: '100%',
            badge: 'CERTIFIED',
            color: '#6d7aff',
            description: 'Advanced smart contract analysis with formal verification',
            reportUrl: 'https://github.com/SCRL-IO/Audit-Report/tree/main/MetaMemeVault',
            pageUrl: 'https://scrl.io/project/metamemevault',
            highlights: ['Formal verification', 'No backdoors', 'Immutable code'],
            icon: <FileText size={24} />,
            logo: scrl_logo
        },
        {
            id: 'goplus',
            name: 'GoPlus Labs Security',
            status: 'Active Monitoring',
            score: '98/100',
            badge: 'SECURED',
            color: '#00E678',
            description: 'Real-time token security monitoring and risk assessment',
            pageUrl: 'https://gopluslabs.io/token-security/1/0x8e737F5E206d5E94c2890e83b2D4Df82fC7c089C',
            highlights: ['No honeypot', 'Anti-bot protection', 'No hidden risks'],
            icon: <Zap size={24} />,
            logo: goplus_logo
        }
    ];

    const securityMetrics = [
        { label: 'Security Score', value: '100%', icon: <Shield size={20} /> },
        { label: 'Code Coverage', value: '100%', icon: <Lock size={20} /> },
        { label: 'Vulnerabilities', value: '0', icon: <AlertCircle size={20} /> },
        { label: 'Trust Rating', value: 'AAA', icon: <Star size={20} /> }
    ];

    const contractFeatures = [
        { feature: 'No Mint Function', status: true, description: 'Fixed supply, no inflation' },
        { feature: 'No Owner Privileges', status: true, description: 'Fully decentralized' },
        { feature: 'Liquidity Locked', status: true, description: '100% locked for safety' },
        { feature: 'No Hidden Functions', status: true, description: 'Transparent codebase' },
        { feature: 'Anti-Bot Mechanism', status: true, description: 'Fair launch protection' },
        { feature: 'Tax-Free Trading', status: true, description: '0% buy/sell tax' }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setAnimateStats(true), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveAudit((prev) => (prev + 1) % audits.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const copyAddress = () => {
        navigator.clipboard.writeText(CONTRACT_ADDRESS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <SEO
                title="Security Audits - MetaMemeVault"
                description="MetaMemeVault security audits by Coinsult, SCRL, and GoPlus Labs. Verified smart contracts with 100% security score."
                keywords="MMV audit, MetaMemeVault security, smart contract audit, Coinsult, SCRL, GoPlus"
                url="https://www.metamemevault.com/audit"
            />
            <PriceTickerMarquee />
            <PageNavbar />

            <div className="audit-page">
                {/* Background Effects */}
                <div className="audit-bg-gradient"></div>
                <div className="audit-grid-pattern"></div>
                <div className="audit-floating-orb audit-orb-1"></div>
                <div className="audit-floating-orb audit-orb-2"></div>
                <div className="audit-floating-orb audit-orb-3"></div>

                {/* Hero Section */}
                <section className="audit-hero">
                    <div className="audit-hero-badge">
                        <Shield size={16} />
                        <span>FULLY AUDITED & SECURE</span>
                    </div>

                    <h1 className="audit-hero-title">
                        Security <span className="audit-gradient-text">First</span> Protocol
                    </h1>

                    <p className="audit-hero-subtitle">
                        Multiple independent audits confirm MetaMemeVault's uncompromising security standards
                    </p>

                    <div className="audit-trust-badges">
                        <div className="audit-trust-item">
                            <BarChart3 size={20} />
                            <span>100% Security Score</span>
                        </div>
                        <div className="audit-trust-item">
                            <Shield size={20} />
                            <span>Multi-Layer Protection</span>
                        </div>
                        <div className="audit-trust-item">
                            <Database size={20} />
                            <span>Immutable Contract</span>
                        </div>
                    </div>

                    {/* Audit Logos Bar */}
                    <div className="audit-logos-bar">
                        <div className="audit-logo-item">
                            <img src={coinsult_logo} alt="Coinsult" />
                        </div>
                        <div className="audit-logo-item">
                            <img src={scrl_logo} alt="SCRL" />
                        </div>
                        <div className="audit-logo-item">
                            <img src={goplus_logo} alt="GoPlus Labs" />
                        </div>
                    </div>
                </section>

                {/* Contract Address Section */}
                <section className="audit-contract-section">
                    <div className="audit-container">
                        <div className="audit-contract-card">
                            <div className="audit-contract-header">
                                <h3>MMV Token Contract</h3>
                                <span className="audit-verified-badge">
                                    <CheckCircle size={16} /> Verified on Etherscan
                                </span>
                            </div>
                            <div className="audit-contract-address">
                                <code>{CONTRACT_ADDRESS}</code>
                                <button onClick={copyAddress} className="audit-copy-btn">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div className="audit-contract-links">
                                <a href={`https://etherscan.io/address/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="audit-link-btn">
                                    <ExternalLink size={16} />
                                    View on Etherscan
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security Metrics */}
                <section className="audit-metrics-section">
                    <div className="audit-container">
                        <div className="audit-metrics-grid">
                            {securityMetrics.map((metric, index) => (
                                <div key={index} className={`audit-metric-card ${animateStats ? 'audit-animate' : ''}`} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="audit-metric-icon">{metric.icon}</div>
                                    <div className="audit-metric-value">{metric.value}</div>
                                    <div className="audit-metric-label">{metric.label}</div>
                                    <div className="audit-metric-glow"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Audits Grid */}
                <section className="audit-audits-section">
                    <div className="audit-container">
                        <h2 className="audit-section-title">
                            Comprehensive <span className="audit-gradient-text">Security Audits</span>
                        </h2>

                        <div className="audit-cards-grid">
                            {audits.map((audit, index) => (
                                <div
                                    key={audit.id}
                                    className={`audit-card ${activeAudit === index ? 'audit-card-active' : ''}`}
                                    onMouseEnter={() => setActiveAudit(index)}>
                                    <div className="audit-card-glow" style={{ background: `radial-gradient(circle, ${audit.color}20, transparent)` }}></div>

                                    <div className="audit-card-header">
                                        {audit.logo ? (
                                            <div className="audit-card-logo">
                                                <img src={audit.logo} alt={audit.name} />
                                            </div>
                                        ) : (
                                            <div className="audit-card-icon" style={{ color: audit.color }}>
                                                {audit.icon}
                                            </div>
                                        )}
                                        <span className="audit-card-badge" style={{ background: `${audit.color}15`, color: audit.color }}>
                                            {audit.badge}
                                        </span>
                                    </div>

                                    <h3 className="audit-card-title">{audit.name}</h3>
                                    <p className="audit-card-description">{audit.description}</p>

                                    <div className="audit-card-score">
                                        <span className="audit-score-label">Score</span>
                                        <span className="audit-score-value" style={{ color: audit.color }}>{audit.score}</span>
                                    </div>

                                    <div className="audit-highlights">
                                        {audit.highlights.map((highlight, i) => (
                                            <div key={i} className="audit-highlight-item">
                                                <CheckCircle size={14} />
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="audit-card-actions">
                                        {audit.reportUrl && (
                                            <a href={audit.reportUrl} target="_blank" rel="noopener noreferrer" className="audit-action-btn audit-btn-primary">
                                                <FileText size={16} />
                                                View Report
                                            </a>
                                        )}
                                        {audit.pageUrl && (
                                            <a href={audit.pageUrl} target="_blank" rel="noopener noreferrer" className="audit-action-btn audit-btn-secondary">
                                                <ExternalLink size={16} />
                                                Verify
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Security Features */}
                <section className="audit-features-section">
                    <div className="audit-container">
                        <h2 className="audit-section-title">
                            Contract <span className="audit-gradient-text">Security Features</span>
                        </h2>

                        <div className="audit-features-grid">
                            {contractFeatures.map((item, index) => (
                                <div key={index} className="audit-feature-card">
                                    <div className="audit-feature-status">
                                        <CheckCircle className="audit-check-icon" />
                                    </div>
                                    <div className="audit-feature-content">
                                        <h4>{item.feature}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="audit-cta-section">
                    <div className="audit-container">
                        <div className="audit-cta-card">
                            <div className="audit-cta-glow"></div>
                            <h2>Ready to Invest in a Fully Audited Meme Platform?</h2>
                            <p>Our comprehensive security measures protect your investment with multiple audit layers</p>
                            <div className="audit-cta-buttons">
                                <a href="/#mmv-presale" className="audit-cta-btn audit-btn-gradient">
                                    Buy MMV Now
                                    <ArrowRight size={18} />
                                </a>
                                <a href="/whitepaper" target="_blank" className="audit-cta-btn audit-btn-outline">
                                    Read Whitepaper
                                    <FileText size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <PageFooter />
        </>
    );
};

export default AuditPage;