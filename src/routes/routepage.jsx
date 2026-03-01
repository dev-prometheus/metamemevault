import { Routes, Route, Navigate } from 'react-router-dom'
import PageMemeTreasury from '../memetreasury/meme-treasury';
import PageReferral from '../referral/referral';
import PageHowToBuy from '../howtobuy/how-to-buy';
import PageContactForm from '../contact/contact';
import HelpPage from '../help/help-page';
import PrivacyPage from '../legal/privacy';
import TermsPage from '../legal/terms';
import CookiesPage from '../legal/cookies';
import HomePage from '../home';
import { MetaWalletProvider } from '../metawalletprovider';
import { Toaster } from 'react-hot-toast';
import WhitepaperPage from '../whitepaper';
import AuditPage from '../audit/audit-page';
import GiveawayPage from '../giveaway';
import AdminDashboard from '../database/adminDashboard';
const AppRoutes = () => {
    return (
        <>
            <MetaWalletProvider>
                <Toaster />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/giveaway" element={<GiveawayPage />} />
                    <Route path="/audit" element={<AuditPage />} />
                    <Route path="/memetreasury" element={<PageMemeTreasury />} />
                    <Route path="/referral" element={<PageReferral />} />
                    <Route path="/how-to-buy" element={<PageHowToBuy />} />
                    <Route path="/contact" element={<PageContactForm />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPage />} />
                    <Route path="/terms-and-conditions" element={<TermsPage />} />
                    <Route path="/cookies-policy" element={<CookiesPage />} />
                    <Route path="/whitepaper" element={<WhitepaperPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/admin/db" element={<AdminDashboard />} />
                </Routes>
            </MetaWalletProvider>
        </>
    );
}

export default AppRoutes;