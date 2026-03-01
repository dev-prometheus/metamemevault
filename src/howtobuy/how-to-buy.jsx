import React, { useState } from "react";
import PageFooter from "../components/footer";
import Marquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import { AlertTriangle, ExternalLink, Wallet, CreditCard, CheckCircle, Zap, Shield, ChevronRight, Coins, Globe, Info } from "lucide-react";
import "../styles/how-to-page.css";
import SEO from "../components/SEO";

const PageHowToBuy = () => {
    const [activeMethod, setActiveMethod] = useState("wallet");

    // SIMPLIFIED: Only 3 actual buying steps
    const walletSteps = [
        {
            number: "01",
            title: "Connect Wallet",
            icon: Globe,
            content: "Click the 'Connect Wallet' button and select your wallet (MetaMask, Trust Wallet, Best Wallet, etc)."
        },
        {
            number: "02",
            title: "Enter Amount",
            icon: Coins,
            content: "Choose ETH or USDT, enter the amount you want to invest, and see your MMV tokens instantly."
        },
        {
            number: "03",
            title: "Confirm Purchase",
            icon: CheckCircle,
            content: "Review the transaction details in your wallet and confirm. Done!"
        }
    ];

    const onrampProviders = [
        { name: "Ramp Network", url: "https://ramp.network", icon: "🌐" },
        { name: "Transak", url: "https://transak.com", icon: "💳" },
        { name: "MoonPay", url: "https://moonpay.com", icon: "🌙" }
    ];

    return (
        <>
            <SEO
                title="How to Buy $MMV"
                description="Step-by-step guide on how to buy $MMV tokens during the MetaMemeVault presale. Connect your wallet and start earning."
                keywords="Buy MMV, How to Buy, Crypto Purchase Guide"
                url="https://www.metamemevault.com/how-to-buy"
            />
            <div className="div-page">
                <Marquee />
                <PageNavbar />
                <main className="htb-main">
                    {/* Animated Background */}
                    <div className="htb-bg-wrapper">
                        <div className="htb-gradient-orb htb-orb-1"></div>
                        <div className="htb-gradient-orb htb-orb-2"></div>
                        <div className="htb-gradient-orb htb-orb-3"></div>
                        <div className="htb-grid-pattern"></div>
                    </div>

                    <div className="htb-container">
                        {/* Header Section */}
                        <div className="htb-header">
                            <div className="htb-badge">
                                <Zap className="htb-badge-icon" />
                                <span>Step-by-Step Guide</span>
                            </div>
                            <h1 className="htb-title">
                                <span className="htb-title-gradient">How to Buy</span>
                                <span className="htb-title-accent"> Meta Meme Vault (MMV)</span>
                            </h1>
                        </div>

                        {/* Warning Box */}
                        <div className="htb-warning-box">
                            <div className="htb-warning-icon-wrapper">
                                <AlertTriangle className="htb-warning-icon" />
                            </div>
                            <div className="htb-warning-content">
                                <strong>Security Alert</strong>
                                <p>
                                    Meta Meme Vault (MMV) is currently in its presale phase and is not available on Uniswap, PancakeSwap, or any
                                    other decentralized exchanges (DEXs). Please be cautious and avoid purchasing any fake MMV tokens that may
                                    be circulating on DEXs, as they are scams.
                                </p>
                            </div>
                        </div>

                        {/* Method Tabs */}
                        <div className="htb-method-tabs">
                            <button
                                className={`htb-tab ${activeMethod === "wallet" ? "htb-active" : ""}`}
                                onClick={() => setActiveMethod("wallet")}>
                                <Wallet className="htb-tab-icon" />
                                <div className="htb-tab-content">
                                    <span className="htb-tab-title">Buy with Wallet</span>
                                    <span className="htb-tab-subtitle">ETH or USDT</span>
                                </div>
                            </button>
                            <button
                                className={`htb-tab ${activeMethod === "card" ? "htb-active" : ""}`}
                                onClick={() => setActiveMethod("card")}>
                                <CreditCard className="htb-tab-icon" />
                                <div className="htb-tab-content">
                                    <span className="htb-tab-title">Buy with Card</span>
                                    <span className="htb-tab-subtitle">Credit/Debit</span>
                                </div>
                            </button>
                        </div>

                        {/* Wallet Method Content */}
                        {activeMethod === "wallet" && (
                            <div className="htb-method-content">
                                <h2 className="htb-section-title">How to Buy</h2>

                                {/* NEW: Prerequisites Checklist */}
                                <div className="htb-prerequisites">
                                    <div className="htb-prereq-header">
                                        <Info className="htb-prereq-icon" />
                                        <span>Before you start, make sure you have:</span>
                                    </div>
                                    <ul className="htb-prereq-list">
                                        <li>
                                            <CheckCircle className="htb-check-icon" />
                                            <span>A crypto wallet (MetaMask, Trust Wallet, Best Wallet, or any WalletConnect-compatible wallet)</span>
                                        </li>
                                        <li>
                                            <CheckCircle className="htb-check-icon" />
                                            <span>Ethereum (ETH) or USDT in your wallet</span>
                                        </li>
                                        <li>
                                            <CheckCircle className="htb-check-icon" />
                                            <span>Extra ETH for gas fees (approximately $5-10)</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* SIMPLIFIED: 3 Steps Only */}
                                <div className="htb-steps-simple">
                                    {walletSteps.map((step, index) => {
                                        const Icon = step.icon;
                                        return (
                                            <div key={index} className="htb-step-simple">
                                                <div className="htb-step-simple-header">
                                                    <div className="htb-step-simple-number">{step.number}</div>
                                                    <Icon className="htb-step-simple-icon" />
                                                </div>
                                                <h3 className="htb-step-simple-title">{step.title}</h3>
                                                <p className="htb-step-simple-content">{step.content}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Important Notes */}
                                <div className="htb-important-notes">
                                    <div className="htb-note-card">
                                        <Shield className="htb-note-card-icon" />
                                        <div className="htb-note-card-content">
                                            <strong>Buying with USDT?</strong>
                                            <p>You'll need to approve 2 transactions: one to approve the USDT contract, and one for the purchase.</p>
                                        </div>
                                    </div>
                                    <div className="htb-note-card">
                                        <Zap className="htb-note-card-icon" />
                                        <div className="htb-note-card-content">
                                            <strong>Network:</strong>
                                            <p>Make sure you're connected to Ethereum (ERC-20) network.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Card Method Content */}
                        {activeMethod === "card" && (
                            <div className="htb-method-content">
                                <h2 className="htb-section-title">Buy Meta Meme Vault (MMV) With Card</h2>

                                {/* New to DeFi Box */}
                                <div className="htb-intro-box">
                                    <div className="htb-intro-badge">
                                        <Zap className="htb-intro-icon" />
                                        <span>New to DeFi?</span>
                                    </div>
                                    <p>
                                        New users can easily purchase MMV using a credit or debit card without needing verification or KYC
                                        processes.
                                    </p>
                                </div>

                                {/* Card Steps */}
                                <div className="htb-card-steps">
                                    <div className="htb-card-step">
                                        <div className="htb-card-step-header">
                                            <div className="htb-step-number">01</div>
                                            <h3>Purchase ETH with Card</h3>
                                        </div>
                                        <p>Visit one of the following on-ramp websites:</p>

                                        <div className="htb-provider-grid">
                                            {onrampProviders.map((provider, index) => (
                                                <a
                                                    key={index}
                                                    href={provider.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="htb-provider-card">
                                                    <span className="htb-provider-emoji">{provider.icon}</span>
                                                    <div className="htb-provider-info">
                                                        <span className="htb-provider-name">{provider.name}</span>
                                                        <ExternalLink className="htb-provider-link" />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>

                                        <p>
                                            Buy Ethereum (ETH) and send it directly to your wallet. Follow the on-screen instructions provided on the
                                            platform.
                                        </p>

                                        <div className="htb-tip-box">
                                            <Zap className="htb-tip-icon" />
                                            <div>
                                                <strong>Tip:</strong> We recommend purchasing a minimum of $50 worth of ETH to cover all expenses,
                                                including gas fees, for buying MMV.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="htb-card-step">
                                        <div className="htb-card-step-header">
                                            <div className="htb-step-number">02</div>
                                            <h3>Buy MMV with Acquired ETH</h3>
                                        </div>
                                        <p>Once you've acquired ETH in your wallet, you can proceed to purchase MMV using the same wallet.</p>
                                        <p>
                                            Follow the steps outlined earlier in the "How to Buy Meta Meme Vault (MMV)" section, starting from
                                            connecting your wallet to the Meta Meme Vault website.
                                        </p>

                                        <div className="htb-note-box">
                                            <Shield className="htb-note-icon" />
                                            <div>
                                                <strong>Note:</strong> Ensure you have enough ETH in your wallet to cover the amount of MMV you wish to
                                                purchase, as well as any associated gas fees.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <PageFooter />
            </div>
        </>
    );
};

export default PageHowToBuy;