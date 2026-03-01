import React from "react"

import WhitepaperHero from "./w_hero"
import WhitepaperTreasury from "./w_treasury"
import WhitepaperConclusion from "./w_conclusion"
import WhitepaperTable from "./w_table"
import WhitepaperTokenomics from "./w_tokenomics"
import WhitepaperTeam from "./w_team"
import PDFExportButton from "./w_pdfexport" 
import "../styles/whitepaper/w_hero.css"
import "../styles/whitepaper/w_team.css"
import "../styles/whitepaper/w_conclusion.css"
import "../styles/whitepaper/w_faq_competition.css"
import "../styles/whitepaper/w_treasury.css"
import SEO from "../components/SEO"
import CompetitorComparison from "./w_competition"
import WhitepaperFAQ from "./w_faq"

const WhitepaperPage = () => {
    return (
        <>
            <SEO
                title="Whitepaper"
                description="Read the MetaMemeVault whitepaper to learn about our tokenomics, roadmap, and vision for the future of meme-to-earn."
                keywords="MMV Whitepaper, Tokenomics, Crypto Whitepaper"
                url="https://www.metamemevault.com/whitepaper"
            />

            <div className="whitepaper-page">
                {/* <PDFExportButton /> */}
                {/* Section 1: Hero & Executive */}
                <WhitepaperHero />

                {/* Section 2: TOC & Market */} 
                <WhitepaperTable />

                {/* Section 3: Tokenomics */}
                <WhitepaperTokenomics />

                {/* Section 4: Treasury & Security */}
                <WhitepaperTreasury />

                {/* Section 5: Team, Partnerships, Technical Deep Dive */}
                <WhitepaperTeam />

                {/* Section 6: COMPETITOR COMPARISON */}
                <CompetitorComparison />

                {/* Section 7: FAQ */}
                <WhitepaperFAQ />

                {/* Section 8: Roadmap & Conclusion */}
                <WhitepaperConclusion />
            </div>
        </>
    )
}

export default WhitepaperPage