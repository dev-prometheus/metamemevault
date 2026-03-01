import React, { useState } from 'react';
import { Copy, ExternalLink, CheckCircle2, Info, Shield, Code, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import "../styles/home/smart-contract-info.css";
import { coinsult_logo, goplus_logo, scrl_logo } from '../assets';

const SmartContractInfo = () => {
    const [copied, setCopied] = useState(false);

    // MMV Token Contract ONLY
    const tokenContract = {
        address: "0x8e737F5E206d5E94c2890e83b2D4Df82fC7c089C",
        explorer: "https://etherscan.io/address/0x8e737f5e206d5e94c2890e83b2d4df82fc7c089c"
    };

    // Audit Partners with actual logos
    const auditPartners = [
        {
            name: "Coinsult",
            logo: coinsult_logo,
            status: "Audited",
            color: "#00D4FF",
            url: "https://app.coinsult.net/eth/0x8e737f5e206d5e94c2890e83b2d4df82fc7c089c"
        },
        {
            name: "SCRL.io",
            logo: scrl_logo,
            status: "Verified",
            color: "#6d7aff",
            url: "https://scrl.io/project/metamemevault"
        },
        {
            name: "GoPlus Labs",
            logo: goplus_logo,
            status: "Secured",
            color: "#00E678",
            url: "https://gopluslabs.io/token-security/1/0x8e737F5E206d5E94c2890e83b2D4Df82fC7c089C"
        }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(tokenContract.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Contract features
    const contractFeatures = [
        { icon: "🔒", label: "Fixed Supply", value: "1,000,000,000 MMV" },
        { icon: "✅", label: "No Mint Function", value: "Immutable" },
        { icon: "🛡️", label: "Security Standard", value: "ERC-20" },
        { icon: "📊", label: "Tax", value: "0% Buy/Sell" }
    ];
    return (
        <section className="mmv-contract-section">
            <div className="mmv-contract-bg-pattern"></div>
            <div className="mmv-contract-float-element mmv-float-1"></div>
            <div className="mmv-contract-float-element mmv-float-2"></div>

            <div className="mmv-contract-container">
                {/* Header */}
                <div className="mmv-contract-header">
                    <span className="mmv-contract-label">
                        <Info size={14} /> CONTRACT & SECURITY VERIFICATION
                    </span>
                    <h2 className="mmv-contract-title">
                        MMV Token <span className="mmv-contract-gradient">Contract & Audits</span>
                    </h2>
                    <p className="mmv-contract-subtitle">
                        Verified smart contract deployed on Ethereum blockchain with professional security audits
                    </p>
                </div>

                {/* Main Contract Card */}
                <div className="mmv-contract-main-card">
                    <div className="mmv-contract-card-glow"></div>

                    <div className="mmv-contract-card-inner">
                        <div className="mmv-contract-card-header">
                            <div className="mmv-contract-status-wrapper">
                                <Shield className="mmv-contract-shield-icon" />
                                <div>
                                    <h3 className="mmv-contract-card-title">MetaMemeVault Token</h3>
                                    <div className="mmv-contract-status">
                                        <span className="mmv-contract-status-dot"></span>
                                        <span>Verified & Active on Mainnet</span>
                                    </div>
                                </div>
                            </div>
                            <CheckCircle2 className="mmv-contract-verified-badge" />
                        </div>

                        <div className="mmv-contract-address-container">
                            <div className="mmv-contract-address-label">Contract Address</div>
                            <div className="mmv-contract-address-box">
                                <code className="mmv-contract-address-text">
                                    {tokenContract.address}
                                </code>
                                <div className="mmv-contract-actions">
                                    <button
                                        className="mmv-contract-action-btn"
                                        onClick={copyToClipboard}
                                        title="Copy Address">
                                        {copied ? (
                                            <CheckCircle2 size={18} className="mmv-success-icon" />
                                        ) : (
                                            <Copy size={18} />
                                        )}
                                    </button>
                                    <a
                                        href={tokenContract.explorer}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mmv-contract-action-btn"
                                        title="View on Etherscan">
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mmv-contract-features-grid">
                            {contractFeatures.map((feature, index) => (
                                <div key={index} className="mmv-contract-feature-item">
                                    <div className="mmv-contract-feature-icon">{feature.icon}</div>
                                    <div className="mmv-contract-feature-content">
                                        <span className="mmv-contract-feature-label">{feature.label}</span>
                                        <span className="mmv-contract-feature-value">{feature.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Audit Partners Section */}
                <div className="mmv-audit-partners-section">
                    <div className="mmv-audit-partners-header">
                        <Award className="mmv-audit-header-icon" />
                        <h3>Professionally Audited By</h3>
                    </div>

                    <div className="mmv-audit-partners-grid">
                        {auditPartners.map((partner, index) => (
                            <a
                                key={index}
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mmv-audit-partner-card"
                                style={{ '--partner-color': partner.color }}>
                                <div className="mmv-audit-partner-logo-wrapper">
                                    <img src={partner.logo} alt={partner.name} />
                                </div>
                                <div className="mmv-audit-partner-info">
                                    <span className="mmv-audit-partner-name">{partner.name}</span>
                                    <span className="mmv-audit-partner-status">
                                        <CheckCircle2 size={14} />
                                        {partner.status}
                                    </span>
                                </div>
                                <ExternalLink className="mmv-audit-partner-link-icon" size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Contract Actions */}
                <div className="mmv-contract-buttons">
                    <a
                        href={tokenContract.explorer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mmv-contract-btn mmv-btn-secondary">
                        <Code size={18} />
                        View Source Code
                    </a>
                    <Link
                        to="/audit"
                        className="mmv-contract-btn mmv-btn-primary">
                        <Shield size={18} />
                        Full Audit Reports
                    </Link>
                </div>

                {/* Trust Bar */}
                <div className="mmv-contract-trust-bar">
                    <div className="mmv-contract-trust-item">
                        <CheckCircle2 className="mmv-contract-trust-icon" />
                        <div>
                            <span className="mmv-contract-trust-title">Etherscan Verified</span>
                            <span className="mmv-contract-trust-desc">Source code publicly verified</span>
                        </div>
                    </div>
                    <div className="mmv-contract-trust-divider"></div>
                    <div className="mmv-contract-trust-item">
                        <CheckCircle2 className="mmv-contract-trust-icon" />
                        <div>
                            <span className="mmv-contract-trust-title">Multi-Audited</span>
                            <span className="mmv-contract-trust-desc">Verified by 3 independent firms</span>
                        </div>
                    </div>
                    <div className="mmv-contract-trust-divider"></div>
                    <div className="mmv-contract-trust-item">
                        <CheckCircle2 className="mmv-contract-trust-icon" />
                        <div>
                            <span className="mmv-contract-trust-title">No Backdoors</span>
                            <span className="mmv-contract-trust-desc">No admin functions or hidden features</span>
                        </div>
                    </div>
                </div>

                <div className="mmv-contract-info-banner">
                    <Info className="mmv-contract-info-icon" />
                    <p>
                        All MMV token transactions are transparent and can be tracked on the Ethereum blockchain.
                        The contract has been professionally audited by multiple independent security firms.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SmartContractInfo;