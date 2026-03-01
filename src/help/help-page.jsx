import React, { useState } from "react";
import { AlertTriangle, HelpCircle, ExternalLink, Clock, CheckCircle, Shield, Zap, RefreshCw, DollarSign, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/help.css";
import Marquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import PageFooter from "../components/footer";

const HelpPage = () => {
    const [activeError, setActiveError] = useState(null);

    const errorSolutions = [
        {
            id: "metamask-warning",
            icon: Info,
            title: "MetaMask Security Warning During Purchase",
            severity: "info",
            description: "When buying with USDT, MetaMask may show a security warning saying 'This is a deceptive request'. This is a false detection.",
            solutions: [
                { step: "Our contract is audited by Coinsult and SCRL.io", icon: Shield },
                { step: "We have submitted our audit reports to MetaMask for review", icon: CheckCircle },
                { step: "You can safely proceed with the transaction by clicking 'Confirm'", icon: Zap },
                {
                    step: "View our full audit reports",
                    link: "https://metamemevault.com/audit",
                    icon: ExternalLink
                }
            ]
        },
        {
            id: "insufficient-funds",
            icon: DollarSign,
            title: "Insufficient Funds for Transaction",
            severity: "warning",
            description: "This error occurs when you don't have enough ETH to cover the gas fees. Ensure your ETH is on the ERC20 network. Consider reducing the purchase amount to account for gas fees.",
            solutions: [
                { step: "Check ETH balance in your wallet", icon: CheckCircle },
                { step: "Ensure ETH is on ERC20 network", icon: Shield },
                { step: "Reduce purchase amount to account for gas", icon: DollarSign }
            ]
        },
        {
            id: "insufficient-allowance",
            icon: Shield,
            title: "Execution Reverted: Insufficient Allowance",
            severity: "error",
            description: "To resolve this issue, follow these steps:",
            solutions: [
                {
                    step: "Visit Etherscan's Token Approval Checker",
                    link: "https://etherscan.io/tokenapprovalchecker",
                    icon: ExternalLink
                },
                { step: "Connect your wallet using Web3", icon: Shield },
                { step: "Revoke all approvals listed in the Token Approval Checker", icon: RefreshCw },
                { step: "Return to metamemevault.com to purchase your MMV tokens", icon: CheckCircle }
            ]
        },
        {
            id: "payment-failed",
            icon: AlertTriangle,
            title: "Token Payment Failed",
            severity: "warning",
            description: "This error occurs when the Ethereum network is extremely busy. Try these solutions:",
            solutions: [
                { step: "Clear your browser's cache", icon: RefreshCw },
                { step: "Close and restart your wallet", icon: Shield },
                { step: "Try again after some time", icon: Clock }
            ]
        },
        {
            id: "hardcap-exceeded",
            icon: Zap,
            title: "Amount Should Be Less Than Left Hardcap",
            severity: "info",
            description: "This error occurs when the presale stage is about to end. Either:",
            solutions: [
                { step: "Decrease the buying amount to match the remaining Hardcap", icon: DollarSign },
                { step: "Wait for the new stage to start", icon: Clock }
            ]
        }
    ];

    return (
        <div className="div-page">
            <Marquee />
            <PageNavbar />
            <main className="div-flex">
                {/* Animated Background */}
                <div className="hlp-bg-wrapper">
                    <div className="hlp-gradient-orb hlp-orb-1"></div>
                    <div className="hlp-gradient-orb hlp-orb-2"></div>
                    <div className="hlp-grid-pattern"></div>
                </div>

                <div className="hlp-container">
                    {/* Header Section */}
                    <div className="hlp-header">
                        <div className="hlp-badge">
                            <HelpCircle className="hlp-badge-icon" />
                            <span>Support Center</span>
                        </div>
                        <h1 className="hlp-title">
                            <span className="hlp-title-gradient">Common Errors</span>
                            <span className="hlp-title-accent"> and Solutions</span>
                        </h1>
                        <p className="hlp-subtitle">
                            Quick fixes for the most common issues during your MMV purchase journey
                        </p>
                    </div>

                    {/* Error Solutions Grid */}
                    <div className="hlp-error-grid">
                        {errorSolutions.map((error, index) => {
                            const Icon = error.icon;
                            return (
                                <div
                                    key={error.id}
                                    className={`hlp-error-card hlp-severity-${error.severity} ${activeError === error.id ? 'hlp-active' : ''}`}
                                    onClick={() => setActiveError(activeError === error.id ? null : error.id)}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="hlp-error-header">
                                        <div className="hlp-error-icon-wrapper">
                                            <Icon className="hlp-error-icon" />
                                        </div>
                                        <h2>{error.title}</h2>
                                        <div className="hlp-expand-indicator">
                                            {activeError === error.id ? '−' : '+'}
                                        </div>
                                    </div>

                                    <div className="hlp-error-content">
                                        <p className="hlp-error-desc">{error.description}</p>

                                        <div className="hlp-solutions-list">
                                            {error.solutions.map((solution, idx) => {
                                                const SolutionIcon = solution.icon;
                                                return (
                                                    <div key={idx} className="hlp-solution-step">
                                                        <div className="hlp-step-number">{idx + 1}</div>
                                                        {solution.link ? (
                                                            <a
                                                                href={solution.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="hlp-solution-link"
                                                            >
                                                                {solution.step}
                                                                <ExternalLink className="hlp-link-icon" />
                                                            </a>
                                                        ) : (
                                                            <span className="hlp-solution-text">{solution.step}</span>
                                                        )}
                                                        <SolutionIcon className="hlp-step-icon" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Token Claiming Section */}
                    <div className="hlp-claiming-section">
                        <div className="hlp-section-header">
                            <Clock className="hlp-section-icon" />
                            <h2>Token Claiming Information</h2>
                        </div>

                        <div className="hlp-claiming-card">
                            <div className="hlp-claiming-header">
                                <div className="hlp-claiming-badge">
                                    <Zap className="hlp-claiming-icon" />
                                    <span>Claiming Your MMV Tokens</span>
                                </div>
                            </div>

                            <div className="hlp-claiming-content">
                                <p className="hlp-claiming-intro">
                                    Please note that your MMV tokens will not be immediately visible in your wallet after purchase. Here's
                                    what you need to know about claiming your tokens:
                                </p>

                                <div className="hlp-claiming-steps">
                                    <div className="hlp-claim-step">
                                        <div className="hlp-claim-bullet"></div>
                                        <span>Tokens will be available for claim when the presale ends</span>
                                    </div>
                                    <div className="hlp-claim-step">
                                        <div className="hlp-claim-bullet"></div>
                                        <span>A claiming option will be provided on our website after the presale concludes</span>
                                    </div>
                                    <div className="hlp-claim-step">
                                        <div className="hlp-claim-bullet"></div>
                                        <span>You will have the choice to use either ETH or $MMV tokens for the claiming process</span>
                                    </div>
                                    <div className="hlp-claim-step">
                                        <div className="hlp-claim-bullet"></div>
                                        <span>Detailed instructions for claiming will be provided closer to the end of the presale</span>
                                    </div>
                                </div>

                                <div className="hlp-important-note">
                                    <Shield className="hlp-note-icon" />
                                    <div>
                                        <strong>Important:</strong> Keep your wallet details safe and stay tuned for announcements regarding the
                                        token claim process.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Section */}
                    <div className="hlp-support-section">
                        <div className="hlp-support-card">
                            <div className="hlp-support-header">
                                <HelpCircle className="hlp-support-icon" />
                            </div>
                            <h2>Still Having Trouble?</h2>
                            <p>
                                If you're facing any other issues or have questions about the token claiming process, our support team is
                                here to help.
                            </p>
                            <Link to="/contact" className="hlp-contact-btn">
                                <span>Contact Support</span>
                                <ExternalLink className="hlp-btn-icon" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <PageFooter />
        </div>
    );
};

export default HelpPage;