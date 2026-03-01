import { useEffect, useState } from "react";
import { Share2, Copy, DollarSign, Users, ChevronDown, ChevronUp, Infinity, Zap, TrendingUp, Gift, Target, Rocket, Star, Shield, ArrowRight, Twitter, Send, Heart } from "lucide-react"
import "../styles/referral.css";
import { useWallet } from "../metawalletprovider";
import { useAppKitSafe } from "../hooks/use_appkit_safe";
import { useReferralStats } from "../hooks/use_referral_stats";
import toast from "react-hot-toast";
import PriceTickerMarquee from "../components/marquee";
import PageNavbar from "../components/navbar";
import PageFooter from "../components/footer";
import SEO from "../components/SEO";

const PageReferral = () => {
    const { walletProvider, chainId } = useAppKitSafe();
    const { isConnected, open, address, referralUid, referralLoading } = useWallet();

    const [isCopied, setIsCopied] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    const { referralInfo, loading, error } = useReferralStats(walletProvider, chainId, address);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://metamemevault.com/?ref=${referralUid || ''}`);
        setIsCopied(true);
        toast.success("Link copied! Ready to share 🚀", {
            style: {
                background: 'linear-gradient(135deg, #4b5ae4, #6d7aff)',
                color: '#fff',
            }
        });
        setTimeout(() => setIsCopied(false), 3000);
    };

    const shareOnTwitter = () => {
        const text = `Just discovered @MetaMemeVault - The ONLY presale that rewards you in SHIB, PEPE, NEIRO & BONK! 🚀\n\nJoin with my link to earn 5% bonus $MMV:\n`;
        const url = `https://metamemevault.com/?ref=${referralUid || ''}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnTelegram = () => {
        const text = `🔥 MetaMemeVault Alert!\n\nEarn 5% bonus $MMV for every friend who joins!\n\n✅ Get rewarded in SHIB, PEPE, NEIRO & BONK\n✅ No limit on earnings\n✅ Instant tracking\n\nJoin here:`;
        const url = `https://metamemevault.com/?ref=${referralUid || ''}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const getLink = () => {
        if (!isConnected) {
            open();
        } else {
            document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (address) {
            fetchTotalReferrals(address);
        }
    }, [address]);

    const fetchTotalReferrals = async (wallet_address) => {
        try {
            const response = await fetch(`/api/total_referrals?wallet=${wallet_address}`);
            const data = await response.json();
            setTotalReferrals(data.totalReferrals);
        } catch (err) {
            if (import.meta.env.DEV) console.error("Error fetching total referrals:", err);
        }
    };

    const handleClaimRewards = () => {
        toast("Claim opens after presale! Your rewards are safe 🔒", {
            icon: "⏰",
            style: {
                background: 'rgba(75, 90, 228, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: '1px solid rgba(75, 90, 228, 0.3)',
            }
        });
    };

    const faqItems = [
        {
            question: "When can I start sharing my referral link?",
            answer: "Immediately after connecting your wallet. Your unique referral link is generated instantly and you can start sharing it right away.",
            icon: <Rocket />
        },
        {
            question: "How much do I earn per referral?",
            answer: "You earn 5% bonus $MMV for every purchase made using your link. Example: If someone buys $1,000 worth of MMV, you earn $50 in MMV tokens.",
            icon: <DollarSign />
        },
        {
            question: "When can I claim my referral rewards?",
            answer: "You can claim your earned $MMV tokens immediately after the presale ends. Your rewards are tracked on-chain and will be available for withdrawal once the presale concludes.",
            icon: <Gift />
        },
        {
            question: "Is there a limit to how many people I can refer?",
            answer: "No limit. You can refer as many people as you want during the presale period. The more referrals, the more 5% bonuses you earn.",
            icon: <Target />
        },
        {
            question: "How do I know the referral system is legitimate?",
            answer: "All referral tracking is handled on-chain through our audited smart contract. You can verify your earnings on Etherscan at any time. Everything is transparent and automated.",
            icon: <Shield />
        },
        {
            question: "Can I track my referrals in real-time?",
            answer: "Yes. Your referral dashboard shows live updates including total referrals, amount purchased by referrals, and your total earnings. Updates appear within minutes of each purchase.",
            icon: <TrendingUp />
        },
        {
            question: "What happens if presale ends before I claim?",
            answer: "Your earned rewards are safe and locked in the smart contract. You'll be able to claim them after presale ends. There's no rush or deadline to claim once the presale concludes.",
            icon: <Star />
        }
    ];

    const leaderboardData = [
        { rank: 1, address: "0x742d...8921", referrals: 47, earned: "2,350 MMV", badge: "🐋" },
        { rank: 2, address: "0x8f3a...1234", referrals: 35, earned: "1,750 MMV", badge: "🦈" },
        { rank: 3, address: "0x9c2b...5678", referrals: 28, earned: "1,400 MMV", badge: "🐬" },
        { rank: 4, address: "0x3d4e...9012", referrals: 22, earned: "1,100 MMV", badge: "🐟" },
        { rank: 5, address: "0xa1b2...3456", referrals: 18, earned: "900 MMV", badge: "🐠" }];

    return (
        <>
            <SEO
                title="Referral Program"
                description="Earn rewards by referring friends to MetaMemeVault. Get bonus $MMV tokens for every successful referral."
                keywords="Referral Program, Crypto Referral, MMV Rewards"
                url="https://www.metamemevault.com/referral"
            />
            <div className="div-page">
                <PriceTickerMarquee />
                <PageNavbar />
                <main className="div-flex">
                    <div className="ref-container">
                        {/* Hero Section with Animated Background */}
                        <section className="ref-hero">
                            <div className="ref-hero-bg">
                                <div className="ref-pulse-1"></div>
                                <div className="ref-pulse-2"></div>
                                <div className="ref-grid"></div>
                            </div>

                            <div className="ref-hero-content">
                                {/* Urgency Badge */}
                                <div className="ref-hero-badge">
                                    <Zap className="ref-badge-icon" />
                                    <span>STAGE 1 ENDING SOON - EARN 5% NOW</span>
                                </div>

                                {/* Clear Value Prop */}
                                <h1 className="ref-hero-title">
                                    Refer Friends.
                                    <span className="ref-gradient-text"> Earn 5% in $MMV.</span>
                                </h1>

                                {/* One sentence with example */}
                                <p className="ref-hero-subtitle">
                                    Earn 5% on every purchase made with your referral link
                                </p>

                                {/* Better Stats - Social proof */}
                                <div style={{ display: "none" }} className="ref-hero-stats">
                                    <div className="ref-stat-card">
                                        <DollarSign className="ref-stat-icon" />
                                        <div className="ref-stat-info">
                                            <span className="ref-stat-value">5%</span>
                                            <span className="ref-stat-label">You Earn on Referrals</span>
                                        </div>
                                    </div>
                                    <div className="ref-stat-card">
                                        <Users className="ref-stat-icon" />
                                        <div className="ref-stat-info">
                                            <span className="ref-stat-value">60+</span>
                                            <span className="ref-stat-label">People Earning Now</span>
                                        </div>
                                    </div>
                                    <div className="ref-stat-card">
                                        <TrendingUp className="ref-stat-icon" />
                                        <div className="ref-stat-info">
                                            <span className="ref-stat-value">2,350</span>
                                            <span className="ref-stat-label">Top Earner (MMV)</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="ref-hero-cta"
                                    onClick={getLink}>
                                    {isConnected ? (
                                        <>
                                            <Share2 size={20} />
                                            Get My Referral Link
                                        </>
                                    ) : (
                                        <>
                                            <Zap size={20} />
                                            Connect Wallet to Start
                                        </>
                                    )}
                                </button>
                            </div>
                        </section>

                        {/* Dashboard Section */}
                        <section id="dashboard" className="ref-dashboard">
                            <div className="ref-dashboard-header">
                                <h2 className="ref-section-title">
                                    <Target className="ref-title-icon" />
                                    Your Referral Command Center
                                </h2>
                                <div className="ref-tabs">
                                    <button
                                        className={`ref-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('overview')}>
                                        Overview
                                    </button>
                                    <button
                                        className={`ref-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
                                        onClick={""}>
                                        {/* <button
                                            className={`ref-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('leaderboard')}> </button> */}
                                        Leaderboard
                                    </button>
                                </div>
                            </div>

                            {activeTab === 'overview' && (
                                <>
                                    {/* Referral Link Section */}
                                    <div className="ref-link-section">
                                        <div className="ref-link-container">
                                            <div className="ref-link-box">
                                                <label className="ref-link-label">Your Unique Referral Link</label>
                                                <div className="ref-link-input-group">
                                                    <input
                                                        type="text"
                                                        className="ref-link-input"
                                                        value={referralLoading ? "Generating your link..." : `metamemevault.com/?ref=${referralUid || 'connect-wallet'}`}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="ref-copy-btn"
                                                        onClick={copyToClipboard}
                                                        disabled={!isConnected || referralLoading}>
                                                        {isCopied ? (
                                                            <>Copied! <Star size={18} /></>
                                                        ) : (
                                                            <>Copy <Copy size={18} /></>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="ref-share-buttons">
                                                <button
                                                    className="ref-share-btn twitter"
                                                    onClick={shareOnTwitter}
                                                    disabled={!isConnected}>
                                                    <Twitter size={20} />
                                                    Share on X
                                                </button>
                                                <button
                                                    className="ref-share-btn telegram"
                                                    onClick={shareOnTelegram}
                                                    disabled={!isConnected}>
                                                    <Send size={20} />
                                                    Share on Telegram
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="ref-stats-grid">
                                        <div className="ref-stat-box">
                                            <div className="ref-stat-header">
                                                <Users className="ref-stat-box-icon" />
                                                <span className="ref-stat-title">Total Referrals</span>
                                            </div>
                                            <div className="ref-stat-value-lg">{totalReferrals}</div>
                                            <div className="ref-stat-change">
                                                <TrendingUp size={16} />
                                                <span>All time</span>
                                            </div>
                                        </div>

                                        <div className="ref-stat-box">
                                            <div className="ref-stat-header">
                                                <Zap className="ref-stat-box-icon" />
                                                <span className="ref-stat-title">Active Referrals</span>
                                            </div>
                                            <div className="ref-stat-value-lg">
                                                {referralInfo ? referralInfo.active_referrals : "0"}
                                            </div>
                                            <div className="ref-stat-change">
                                                <Heart size={16} />
                                                <span>Purchased $MMV</span>
                                            </div>
                                        </div>

                                        <div className="ref-stat-box">
                                            <div className="ref-stat-header">
                                                <DollarSign className="ref-stat-box-icon" />
                                                <span className="ref-stat-title">Total Purchased</span>
                                            </div>
                                            <div className="ref-stat-value-lg">
                                                {referralInfo ? parseFloat(referralInfo.mmv_ref_purchased).toLocaleString() : "0"}
                                                <span className="ref-stat-unit">MMV</span>
                                            </div>
                                            <div className="ref-stat-change">
                                                <Rocket size={16} />
                                                <span>By your referrals</span>
                                            </div>
                                        </div>

                                        <div className="ref-stat-box highlight">
                                            <div className="ref-stat-header">
                                                <Gift className="ref-stat-box-icon" />
                                                <span className="ref-stat-title">Your Earnings</span>
                                            </div>
                                            <div className="ref-stat-value-lg">
                                                {referralInfo ? parseFloat(referralInfo.mmv_earned).toLocaleString() : "0"}
                                                <span className="ref-stat-unit">MMV</span>
                                            </div>
                                            <button
                                                className="ref-claim-btn"
                                                onClick={handleClaimRewards}
                                                disabled={true}>
                                                <Gift size={18} />
                                                Claim After Presale
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'leaderboard' && (
                                <div className="ref-leaderboard">
                                    <div className="ref-leaderboard-header">
                                        <h3>Top Referrers</h3>
                                        <span className="ref-leaderboard-subtitle">Compete for the top spot!</span>
                                    </div>
                                    <div className="ref-leaderboard-list">
                                        {leaderboardData.map((user, index) => (
                                            <div key={index} className={`ref-leaderboard-item ${index < 3 ? 'top-three' : ''}`}>
                                                <div className="ref-leader-rank">
                                                    <span className="ref-rank-number">#{user.rank}</span>
                                                    <span className="ref-rank-badge">{user.badge}</span>
                                                </div>
                                                <div className="ref-leader-info">
                                                    <span className="ref-leader-address">{user.address}</span>
                                                    <span className="ref-leader-stats">
                                                        {user.referrals} referrals • {user.earned}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* How It Works */}
                        <section className="ref-how">
                            <h2 className="ref-section-title">
                                <Rocket className="ref-title-icon" />
                                How to Earn 5% Bonus $MMV
                            </h2>

                            <div className="ref-steps">
                                <div className="ref-step">
                                    <div className="ref-step-number">01</div>
                                    <div className="ref-step-icon">
                                        <Share2 />
                                    </div>
                                    <h3>Get Your Link</h3>
                                    <p>Connect your wallet and copy your unique referral link. Takes 10 seconds.</p>
                                </div>

                                <div className="ref-step-connector">
                                    <ArrowRight />
                                </div>

                                <div className="ref-step">
                                    <div className="ref-step-number">02</div>
                                    <div className="ref-step-icon">
                                        <Users />
                                    </div>
                                    <h3>Share With Friends</h3>
                                    <p>Send your link via Twitter, Telegram, Discord, or email. You earn 5% bonus.</p>
                                </div>

                                <div className="ref-step-connector">
                                    <ArrowRight />
                                </div>

                                <div className="ref-step">
                                    <div className="ref-step-number">03</div>
                                    <div className="ref-step-icon">
                                        <TrendingUp />
                                    </div>
                                    <h3>Track Earnings Live</h3>
                                    <p>Watch your dashboard update in real-time as friends buy $MMV using your link.</p>
                                </div>

                                <div className="ref-step-connector">
                                    <ArrowRight />
                                </div>

                                <div className="ref-step">
                                    <div className="ref-step-number">04</div>
                                    <div className="ref-step-icon">
                                        <Gift />
                                    </div>
                                    <h3>Claim After Presale</h3>
                                    <p>Once presale ends, claim your 5% bonus $MMV directly to your wallet.</p>
                                </div>
                            </div>
                        </section>


                        {/* FAQ Section */}
                        <section className="ref-faq">
                            <h2 className="ref-section-title">
                                <Shield className="ref-title-icon" />
                                Frequently Asked Questions
                            </h2>

                            <div className="ref-faq-grid">
                                {faqItems.map((item, index) => (
                                    <div key={index} className="ref-faq-item">
                                        <button
                                            className="ref-faq-question"
                                            onClick={() => toggleFaq(index)}>
                                            <div className="ref-faq-header">
                                                <div className="ref-faq-icon">{item.icon}</div>
                                                <h3>{item.question}</h3>
                                            </div>
                                            {openFaqIndex === index ? <ChevronUp /> : <ChevronDown />}
                                        </button>
                                        {openFaqIndex === index && (
                                            <div className="ref-faq-answer">
                                                <p>{item.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
                <PageFooter />
            </div>
        </>
    )
}

export default PageReferral;