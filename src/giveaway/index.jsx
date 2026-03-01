import { useEffect, useState } from "react";
import { useWallet } from "../metawalletprovider";
import { useAppKitSafe } from "../hooks/use_appkit_safe";
import { useReferralStats } from "../hooks/use_referral_stats";
import { useGiveawayEligibility } from "../hooks/use_giveaway_eligibility";
import { useGiveawayPoints } from "../hooks/use_giveaway_points";
import PageNavbar from "../components/navbar";
import PageFooter from "../components/footer";
import PriceTickerMarquee from "../components/marquee";
import SEO from "../components/SEO";
import GiveawayHero from "./gw-hero";
import GiveawayStats from "./gw-stats";
import GiveawayEligibility from "./gw-eligibility";
import GiveawayPosition from "./gw-position";
import GiveawayTasks from "./gw-tasks";
import GiveawayPrizes from "./gw-prizes";
import GiveawayRules from "./gw-rules";
import "../styles/giveaway/gw-core.css";
import "../styles/giveaway/gw-sections.css";
import "../styles/giveaway/gw-utilities.css";
import { useMMVBalance } from "../hooks/use_mmv_balance";

const GiveawayPage = () => {
    const { walletProvider, chainId } = useAppKitSafe();
    const { isConnected, open, address } = useWallet();
    const { referralInfo, loading: refLoading } = useReferralStats(walletProvider, chainId, address); 

    const [globalStats, setGlobalStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(true);

    const { mmvBalance, loading: balanceLoading } = useMMVBalance( walletProvider, chainId, address );

    // Eligibility hook
    const {
        isEligible,
        isEntered,
        isChecking,
        isEntering,
        purchaseValue,
        amountNeeded,
        minRequired,
        error,
        enterGiveaway,
        refetch
    } = useGiveawayEligibility(address, mmvBalance);

    // Points hook
    const {
        points,
        position,
        loading: pointsLoading,
        refetch: refetchPoints
    } = useGiveawayPoints(
        address,
        mmvBalance,
        referralInfo?.mmv_ref_purchased || 0,
        referralInfo?.active_referrals || 0
    );

    // Fetch global stats
    useEffect(() => {
        fetchGlobalStats();
        const interval = setInterval(fetchGlobalStats, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    const fetchGlobalStats = async () => {
        try {
            const response = await fetch('/api/giveaway/get_stats');
            const data = await response.json();
            setGlobalStats(data);
        } catch (err) {
            console.error('Error fetching global stats:', err);
        } finally {
            setStatsLoading(false);
        }
    };


    // Refetch points when user enters giveaway
    const handleEnteredGiveaway = () => {
        refetchEligibility();
        refetchPoints();
        fetchGlobalStats();
    };

    return (
        <>
            <SEO
                title="$250K Giveaway"
                description="Enter the MetaMemeVault $250K USDT + $100K MMV giveaway. Earn points through purchases, referrals, and social engagement."
                keywords="Crypto Giveaway, MMV Giveaway, Presale Rewards"
                url="https://www.metamemevault.com/giveaway"
            />

            <div className="div-page">
                <PriceTickerMarquee />
                <PageNavbar />

                <main className="div-flex">
                    <div className="gw-container">
                        {/* Hero Section */}
                        <GiveawayHero
                            isConnected={isConnected}
                            onConnect={open}
                        />

                        {/* Global Stats */}
                        <GiveawayStats
                            stats={globalStats}
                            loading={statsLoading}
                        />

                        {/* Eligibility Check & Entry */}
                        <GiveawayEligibility
                            isConnected={isConnected}
                            isEligible={isEligible}
                            isEntered={isEntered}
                            isEntering={isEntering}
                            purchaseValue={purchaseValue}
                            amountNeeded={amountNeeded}
                            minRequired={minRequired}
                            onConnect={open}
                            onEnter={enterGiveaway}
                            onSuccess={handleEnteredGiveaway}
                        />

                        {/* Show position and tasks only if entered */}
                        {isEntered && (
                            <>
                                {/* Your Position */}
                                <GiveawayPosition
                                    position={position}
                                    points={points}
                                    loading={pointsLoading}
                                />

                                {/* Tasks Section */}
                                <GiveawayTasks
                                    address={address}
                                    points={points}
                                    mmvBalance={mmvBalance}
                                    referralVolume={referralInfo?.mmv_ref_purchased || 0}
                                    activeReferrals={referralInfo?.active_referrals || 0}
                                    onTaskComplete={refetchPoints}
                                />
                            </>
                        )}

                        {/* Prize Breakdown */}
                        <GiveawayPrizes />

                        {/* Rules & How it Works */}
                        <GiveawayRules />
                    </div>
                </main>

                <PageFooter />
            </div>
        </>
    );
};

export default GiveawayPage;