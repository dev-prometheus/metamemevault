import { Helmet } from "react-helmet-async";

const SEO = ({
    title,
    description,
    keywords,
    ogImage = "https://www.metamemevault.com/og-banner.png",
    url = "https://www.metamemevault.com/",
    type = "website"
}) => {
    const fullTitle = title ? `${title} | MetaMemeVault` : "MetaMemeVault ($MMV) – Earn SHIB, PEPE, BONK & NEIRO";

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />

            {/* Twitter */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Canonical */}
            <link rel="canonical" href={url} /> 
        </Helmet>
    );
};

export default SEO;