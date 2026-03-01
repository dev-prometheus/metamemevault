import React, { useState, useEffect } from 'react';
import { Shield, Lock, Code, CheckCircle, Users, Globe, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import "../styles/home/security-audits.css";

const SecurityAudits = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    // Security features data
    const securityFeatures = [
        {
            icon: <Shield className="mmv-security-icon" />,
            title: "Audited Smart Contracts",
            description: "Professionally audited by leading blockchain security firms",
            status: "verified",
            badge: "AUDITED"
        },
        {
            icon: <Lock className="mmv-security-icon" />,
            title: "Liquidity Locked",
            description: "100% liquidity locked for investor protection",
            status: "active",
            badge: "LOCKED"
        },
        {
            icon: <Code className="mmv-security-icon" />,
            title: "Verified Source Code",
            description: "Open-source and verified on blockchain explorers",
            status: "verified",
            badge: "VERIFIED"
        },
        {
            icon: <CheckCircle className="mmv-security-icon" />,
            title: "No Mint Function",
            description: "Fixed supply with no ability to create new tokens",
            status: "verified",
            badge: "IMMUTABLE"
        },
        {
            icon: <Users className="mmv-security-icon" />,
            title: "Community Driven",
            description: "Decentralized governance powered by the community",
            status: "active",
            badge: "DEFI"
        },
        {
            icon: <AlertTriangle className="mmv-security-icon" />,
            title: "Anti-Bot Protection",
            description: "Advanced mechanisms to prevent bot manipulation",
            status: "verified",
            badge: "PROTECTED"
        }
    ];

    // Protocol stats
    const protocolStats = [
        { label: "Contract Security Score", value: "98/100" },
        { label: "Code Coverage", value: "100%" },
        // { label: "Days Since Deploy", value: "27" },
        { label: "Security Incidents", value: "0" }
    ];

    // Rotate active feature
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="mmv-security-section">
            {/* Background effects */}
            <div className="mmv-security-grid-bg"></div>
            <div className="mmv-security-glow-effect"></div>

            <div className="mmv-security-container">
                {/* Header */}
                <div className="mmv-security-header">
                    <span className="mmv-security-badge-top">
                        <Shield size={16} /> SECURITY FIRST PROTOCOL
                    </span>
                    <h2 className="mmv-security-title">
                        Trust Through <span className="mmv-security-gradient">Transparency</span>
                    </h2>
                    <p className="mmv-security-subtitle">
                        Built on immutable smart contracts with comprehensive security measures
                    </p>
                </div>

                {/* Main security grid */}
                <div className="mmv-security-main-grid">
                    {securityFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`mmv-security-card ${activeFeature === index ? 'mmv-active' : ''}`}
                            onMouseEnter={() => setActiveFeature(index)}>
                            <div className="mmv-security-card-glow"></div>
                            <div className="mmv-security-card-content">
                                <div className="mmv-security-card-header">
                                    <div className="mmv-security-icon-wrapper">
                                        {feature.icon}
                                    </div>
                                    <span className={`mmv-security-status-badge mmv-status-${feature.status}`}>
                                        {feature.badge}
                                    </span>
                                </div>
                                <h3 className="mmv-security-card-title">{feature.title}</h3>
                                <p className="mmv-security-card-desc">{feature.description}</p>
                                <div className="mmv-security-card-indicator"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Protocol Stats Bar */}
                <div className="mmv-security-stats-container">
                    <div className="mmv-security-stats-grid">
                        {protocolStats.map((stat, index) => (
                            <div key={index} className="mmv-security-stat-item">
                                <span className="mmv-security-stat-value">{stat.value}</span>
                                <span className="mmv-security-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust statement */}
                <div className="mmv-security-trust-statement">
                    <div className="mmv-security-trust-content">
                        <Globe className="mmv-security-trust-icon" />
                        <div className="mmv-security-trust-text">
                            <h4>Decentralized & Trustless</h4>
                            <p>No single point of failure. Governed by immutable code, not promises.</p>
                        </div>
                    </div>
                    <Link to="/audit" className="mmv-security-cta-button">
                        View Audit Reports
                        <TrendingUp size={16} />
                    </Link>
                </div>

                {/* Contract verification badges */}
                <div className="mmv-security-verification">
                    <div className="mmv-security-verify-item">
                        <div className="mmv-security-verify-icon">✓</div>
                        <span>Etherscan Verified</span>
                    </div>
                    <div className="mmv-security-verify-item">
                        <div className="mmv-security-verify-icon">✓</div>
                        <span>Source Code Public</span>
                    </div>
                    <div className="mmv-security-verify-item">
                        <div className="mmv-security-verify-icon">🔐</div>
                        <span>Multisig Protected</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecurityAudits;