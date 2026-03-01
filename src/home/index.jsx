import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import ErrorBoundary from "../components/errorBoundary";
import PageNavbar from "../components/navbar";
import PriceTickerMarquee from "../components/marquee";
import IntegratedHeroSection from "./hero-integrated";
import SecurityAudits from "./security-audits";
import SmartContractInfo from "./smart-contract-info";
import FeaturedIn from "./featured-in";
import WhatIsMMV from "./what-is";
import TokenValue from "./token-value";
import BonusCalculator from "./bonus-calc";
import MemeTreasuryHome from "./meme-treasury";
import FeaturedMemes from "./featured-memes";
import Tokenomics from "./tokenomics";
import Roadmap from "./roadmap";
import ReferralHome from "./referral";
import HowToBuySection from "./how-to";
import Faqhome from "./faq";
import PageFooter from "../components/footer";
import { useAppKitSafe } from "../hooks/use_appkit_safe";
import { useWallet } from "../metawalletprovider";
import { PresaleProvider } from "../metawalletprovider/presale_provider";
import PageLoader from "../components/pageLoader";
import { useTokenPrices } from "../hooks/use_token_prices";
import GiveawayTeaser from "./giveaway-teaser";

const HomePage = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [essentialDataLoaded, setEssentialDataLoaded] = useState(false);
    const { walletProvider, chainId } = useAppKitSafe();
    const { isConnected } = useWallet();
    const { prices, loading: pricesLoading } = useTokenPrices();

    const scrollToPresale = () => {
        document.getElementById("mmv-presale")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDataLoaded = () => {
        setEssentialDataLoaded(true);
    };
    useEffect(() => {
        const checkEssentialData = () => {
            const tokenPricesReady = !pricesLoading && Object.keys(prices).length > 0;

            if (tokenPricesReady) {
                setEssentialDataLoaded(true);
            }
        };

        checkEssentialData();
    }, [pricesLoading, prices]);

    useEffect(() => {
        if (essentialDataLoaded) {
            const timer = setTimeout(() => {
                setPageLoading(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [essentialDataLoaded]);

        // Fallback to stop loading after max time
        useEffect(() => {
            const maxLoadingTime = setTimeout(() => {
                setPageLoading(false);
                console.warn("Max loading time reached, proceeding anyway");
            }, 10000); // 10 seconds max
    
            return () => clearTimeout(maxLoadingTime);
        }, []);
    return ( 
        <>
            <SEO
                title="Home"
                description="Buy $MMV in the MetaMemeVault presale and earn top Ethereum memecoins like SHIB, PEPE, BONK, and NEIRO. Lock tokens in the MemeTreasury and get up to 200% bonus."
                keywords="MetaMemeVault, MMV Token, Meme to Earn, Crypto Presale, SHIB, PEPE, BONK, NEIRO"
                url="https://www.metamemevault.com/" 
            />
            <PresaleProvider walletProvider={walletProvider} chainId={chainId} isConnected={isConnected}>
                <ErrorBoundary>
                    <PageLoader isLoading={pageLoading} minimumLoadTime={30000} />

                    {/* Main Content */}
                    <div className={`homepage-content ${pageLoading ? 'loading' : 'loaded'}`}>
                        <PriceTickerMarquee />
                        <PageNavbar />
                        <IntegratedHeroSection onDataLoaded={handleDataLoaded} />
                        <GiveawayTeaser /> 
                        <FeaturedIn />
                        <SecurityAudits />
                        <WhatIsMMV scrollToPresale={scrollToPresale} />
                        <SmartContractInfo />
                        <TokenValue />
                        <BonusCalculator scrollToPresale={scrollToPresale} />
                        <MemeTreasuryHome />
                        <FeaturedMemes />
                        <Tokenomics />
                        <Roadmap />
                        <ReferralHome />

                        <HowToBuySection scrollToPresale={scrollToPresale} />
                        <Faqhome />
                        <PageFooter />
                    </div>
                </ErrorBoundary>
            </PresaleProvider>
        </>
    );
}

export default HomePage;