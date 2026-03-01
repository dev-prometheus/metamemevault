import { useEffect, useState } from "react";
import { Lock, Gift, ArrowRight, Zap, Globe, Coins, TrendingUp, Info, Sparkles, Rocket, Gem, ChevronRight, Star } from "lucide-react"
import PriceTickerMarquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import PageFooter from "../components/footer";
import TreasuryMemeComponent from "./meme-component";
import TreasuryLockComponent from "./treasury-lock";
import { bonk_logo, neiro_logo, pepe_logo, shib_logo } from "../assets";
import { useWallet } from "../metawalletprovider";
import { useAppKitSafe } from "../hooks/use_appkit_safe";
import { useMemeTreasury } from "../hooks/use_meme_treasury";
import "../styles/mmt_component.css";
import "../styles/mmt_lock.css";
import SEO from "../components/SEO";

const REWARD_TOKENS = [
    { id: "neiro", name: "NEIRO", icon: neiro_logo, color: "#FF6B6B" },
    { id: "shib", name: "SHIB", icon: shib_logo, color: "#FFA500" },
    { id: "pepe", name: "PEPE", icon: pepe_logo, color: "#00C851" },
    { id: "bonk", name: "BONK", icon: bonk_logo, color: "#FFD700" },
];

const formatLargeNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    else if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    else if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    else if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    else return num.toFixed(4);
};
const PageMemeTreasury = () => {
    const { walletProvider, chainId } = useAppKitSafe();
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [selectedRewardToken, setSelectedRewardToken] = useState(null);
    const [activeTab, setActiveTab] = useState("lock");
    const { isConnected, open, connectionStatus, address } = useWallet();
    const { mmvBalance, mmvLocked, refreshTreasuryStats } = useMemeTreasury(walletProvider, chainId, address);
    const [loading, setLoading] = useState(true);
    const [treasuryRefreshSignal, setTreasuryRefreshSignal] = useState(0);

    const startEarning = () => {
        document.getElementById("start_earning")?.scrollIntoView({ behavior: "smooth" });
    }

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                if (address) {
                    await refreshTreasuryStats();
                }
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [address]);

    const handleLockComplete = () => {
        refreshTreasuryStats();
        setTreasuryRefreshSignal(Date.now());
    }

    const ctaText = isConnected
        ? "Start Earning Now"
        : connectionStatus === "connecting"
            ? "Connecting..."
            : "Connect Wallet";

    return (
        <>
            <SEO
                title="🔥 Presale LIVE - 200% Bonus Ending Soon | MetaMemeVault"
                description="⚡ STAGE 1 LIVE NOW! Buy $MMV at $0.008, get up to 200% bonus + earn SHIB, PEPE, BONK & NEIRO instantly. Price jumps to $0.012 next stage. Early investors earn passive income from 4 memecoins. Limited time - Don't miss out!"
                keywords="MMV presale live, crypto presale 2025, 200% bonus crypto, earn SHIB rewards, PEPE earnings, BONK passive income, NEIRO rewards, best crypto presale, meme to earn, MetaMemeVault, buy MMV token, Ethereum presale, crypto presale ending soon"
                url="https://www.metamemevault.com/"
            />
            <div className="mmt-page">
                <PriceTickerMarquee />
                <PageNavbar />
                {loading ? (
                    <div className="mmt-loading-state">
                        <div className="mmt-loading-spinner"></div>
                        <p>Loading Meme Treasury...</p>
                    </div>
                ) : (
                    <main className="mmt-main">
                        {/*Hero Section */}
                        <section className="mmt-hero">
                            <div className="mmt-hero-bg">
                                <div className="mmt-hero-gradient-1"></div>
                                <div className="mmt-hero-gradient-2"></div>
                                <div className="mmt-hero-glow"></div>
                            </div>

                            <div className="mmt-container">
                                <div className="mmt-hero-content">
                                    {/* FOMO Badge */}
                                    <div className="mmt-hero-badge">
                                        <Sparkles className="mmt-badge-icon" />
                                        <span>Presale Investors Earning Now</span>
                                    </div>

                                    {/* Clear Value Prop */}
                                    <h1 className="mmt-hero-title">
                                        <span className="mmt-title-line">Lock $MMV.</span>
                                        <span className="mmt-title-gradient">Earn 142% APY in Top Memes.</span>
                                    </h1>

                                    {/* One sentence with urgency */}
                                    <p className="mmt-hero-subtitle">
                                        Start earning <span className="mmt-hero-highlight">SHIB, PEPE, BONK, NEIRO</span> today—rewards accumulate during presale.
                                    </p>

                                    <button
                                        className="mmt-hero-cta"
                                        onClick={() => isConnected ? startEarning() : open()}>
                                        {ctaText}
                                        <ArrowRight className="mmt-cta-icon" />
                                    </button>

                                    {/* Token Icons Showcase */}
                                    <div className="mmt-token-showcase">
                                        <p className="mmt-showcase-label">Earn rewards in</p>
                                        <div className="mmt-showcase-tokens">
                                            {REWARD_TOKENS.map((token, idx) => (
                                                <div key={token.id} className="mmt-showcase-token" style={{ '--delay': `${idx * 0.1}s` }}>
                                                    <img src={token.icon} alt={token.name} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Main Treasury Section */}
                        <section id="start_earning" className="mmt-treasury-section">
                            <div className="mmt-container">
                                {/* Tab Navigation */}
                                <div className="mmt-tabs">
                                    <button
                                        className={`mmt-tab ${activeTab === "lock" ? "active" : ""}`}
                                        onClick={() => setActiveTab("lock")}>
                                        <Lock size={18} />
                                        <span>Lock & Earn</span>
                                    </button>
                                    <button
                                        className={`mmt-tab ${activeTab === "dashboard" ? "active" : ""}`}
                                        onClick={() => setActiveTab("dashboard")}>
                                        <TrendingUp size={18} />
                                        <span>My Earnings</span>
                                    </button>
                                </div>

                                {/* Treasury Grid */}
                                <div className="mmt-grid">
                                    {activeTab === "lock" ? (
                                        <TreasuryLockComponent
                                            walletAddress={address}
                                            mmvBalance={mmvBalance}
                                            isConnected={isConnected}
                                            REWARD_TOKENS={REWARD_TOKENS}
                                            formatLargeNumber={formatLargeNumber}
                                            chainId={chainId}
                                            walletProvider={walletProvider}
                                            onLockComplete={handleLockComplete}
                                            selectedRewardToken={selectedRewardToken}
                                            setSelectedRewardToken={setSelectedRewardToken}
                                        />
                                    ) : (
                                        <TreasuryMemeComponent
                                            walletAddress={address}
                                            REWARD_TOKENS={REWARD_TOKENS}
                                            mmvLocked={mmvLocked}
                                            formatLargeNumber={formatLargeNumber}
                                            chainId={chainId}
                                            walletProvider={walletProvider}
                                            refreshSignal={treasuryRefreshSignal}
                                        />
                                    )}
                                </div>

                                {/* Info Notice */}
                                <div className="mmt-info-notice">
                                    <div className="mmt-notice-icon">
                                        <Info size={20} />
                                    </div>
                                    <div className="mmt-notice-content">
                                        <p className="mmt-notice-title">Important Notice</p>
                                        <p className="mmt-notice-text">
                                            Claiming rewards unlocks your $MMV tokens. They'll be available when presale claiming goes live.
                                            Early birds get the best rewards!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* How It Works Section */}
                        <section className="mmt-how-section">
                            <div className="mmt-container">
                                <div className="mmt-section-header">
                                    <h2 className="mmt-section-title">
                                        <Zap className="mmt-title-icon" />
                                        How Meme Treasury Works
                                    </h2>
                                    <p className="mmt-section-subtitle">
                                        Three simple steps to multiply your meme bags
                                    </p>
                                </div>

                                <div className="mmt-steps">
                                    {[
                                        {
                                            icon: Lock,
                                            step: "01",
                                            title: "Lock Your $MMV",
                                            description: "Choose amount and lock duration. Higher locks = better rewards.",
                                            color: "#4b5ae4"
                                        },
                                        {
                                            icon: Gift,
                                            step: "02",
                                            title: "Pick Your Rewards",
                                            description: "Select NEIRO, SHIB, PEPE, or BONK. Mix and match your portfolio.",
                                            color: "#6d7aff"
                                        },
                                        {
                                            icon: Coins,
                                            step: "03",
                                            title: "Claim & Compound",
                                            description: "Watch rewards grow. Claim anytime after 3 days post-presale.",
                                            color: "#4BA7E4"
                                        },
                                    ].map((step, index) => (
                                        <div key={index} className="mmt-step-card" style={{ '--step-color': step.color }}>
                                            <div className="mmt-step-number">{step.step}</div>
                                            <div className="mmt-step-icon">
                                                <step.icon size={32} />
                                            </div>
                                            <h3 className="mmt-step-title">{step.title}</h3>
                                            <p className="mmt-step-desc">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Future Expansion */}
                        <section className="mmt-future-section">
                            <div className="mmt-container">
                                <div className="mmt-future-card">
                                    <div className="mmt-future-header">
                                        <h2 className="mmt-future-title">
                                            <Rocket className="mmt-title-icon" />
                                            MemeTreasury v2 Coming Soon
                                        </h2>
                                        <span className="mmt-future-badge">Q1 2026</span>
                                    </div>

                                    <div className="mmt-future-grid">
                                        <div className="mmt-future-item">
                                            <div className="mmt-future-icon">
                                                <Star />
                                            </div>
                                            <h3>More Memes</h3>
                                            <p>CATWIFHAT, $TRUMP, Base & Solana memes joining the party</p>
                                        </div>
                                        <div className="mmt-future-item">
                                            <div className="mmt-future-icon">
                                                <Globe />
                                            </div>
                                            <h3>Cross-Chain</h3>
                                            <p>Earn from multiple chains. One lock, infinite possibilities</p>
                                        </div>
                                        <div className="mmt-future-item">
                                            <div className="mmt-future-icon">
                                                <Gem />
                                            </div>
                                            <h3>NFT Boosts</h3>
                                            <p>Special NFTs unlock 2x rewards and exclusive meme drops</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Enhanced FAQs */}
                        <section className="mmt-faq-section">
                            <div className="mmt-container">
                                <div className="mmt-section-header">
                                    <h2 className="mmt-section-title">
                                        <Info className="mmt-title-icon" />
                                        Frequently Asked Questions
                                    </h2>
                                </div>

                                <div className="mmt-faq-grid">
                                    {[
                                        {
                                            question: "When can I claim my rewards?",
                                            answer: "3 days after presale ends. Your rewards accumulate automatically during the presale, and claiming is instant once available."
                                        },
                                        {
                                            question: "Can I switch my reward token after locking?",
                                            answer: "No, once you lock $MMV and select a reward token (SHIB, PEPE, BONK, or NEIRO), it's fixed for that lock. However, you can create multiple locks with different reward tokens."
                                        },
                                        {
                                            question: "What happens to unclaimed rewards?",
                                            answer: "They continue accumulating in your account. There's no deadline to claim, but rewards stop accumulating once your lock period ends."
                                        },
                                        {
                                            question: "Is my locked $MMV safe?",
                                            answer: "Yes. The smart contract is audited by Coinsult, and your tokens remain in the secure treasury. You maintain full control and can claim rewards once the lock period ends."
                                        },
                                        {
                                            question: "How is 142% APY calculated?",
                                            answer: "APY is based on your lock amount, lock duration (longer locks earn more), and the current reward pool. Rewards accumulate every block on the Ethereum network."
                                        },
                                        {
                                            question: "Can I lock more $MMV later?",
                                            answer: "Yes. You can create multiple locks at any time. Each lock operates independently, allowing you to diversify across different reward tokens and durations."
                                        },
                                        {
                                            question: "Do I need to buy $MMV in presale first?",
                                            answer: "Yes. Lock your $MMV during the presale to start earning immediately. The earlier you lock, the more rewards you accumulate before claiming becomes available."
                                        },
                                        {
                                            question: "What's the minimum lock amount?",
                                            answer: "You can lock any amount of $MMV you purchased in the presale. Even small amounts earn rewards at the same 142% APY rate."
                                        },
                                    ].map((faq, index) => (
                                        <div key={index} className={`mmt-faq-item ${openFaqIndex === index ? "active" : ""}`}>
                                            <button className="mmt-faq-question" onClick={() => toggleFaq(index)}>
                                                <span>{faq.question}</span>
                                                <ChevronRight className="mmt-faq-arrow" />
                                            </button>
                                            <div className="mmt-faq-answer">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </main>
                )}
                <PageFooter />
            </div>
        </>
    )
}

export default PageMemeTreasury;