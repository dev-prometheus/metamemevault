import React from "react";
import { Sparkles } from "lucide-react";
import { useTokenPrices } from "../hooks/use_token_prices";

const PriceTickerMarquee = () => {
    const { prices, loading } = useTokenPrices(); 

    // Token metadata
    const tokenMetadata = {
        'shib': { symbol: 'SHIB', name: 'Shiba Inu', icon: '🐕' },
        'pepe': { symbol: 'PEPE', name: 'Pepe', icon: '🐸' },
        'neiro': { symbol: 'NEIRO', name: 'Neiro', icon: '🐾' },
        'bonk': { symbol: 'BONK', name: 'Bonk', icon: '🦴' }
    };

    // MMV token data (from your contract)
    const MMV_PRICE = 0.008; // Update this from your presale contract

    // Format price
    const formatPrice = (price) => {
        if (!price || price === 0) return '$0.00';
        if (price < 0.00001) return `$${price.toFixed(8)}`;
        if (price < 0.001) return `$${price.toFixed(6)}`;
        if (price < 1) return `$${price.toFixed(4)}`;
        return `$${price.toFixed(2)}`;
    };

    if (loading && Object.keys(prices).length === 0) {
        return (
            <div className="price-ticker-wrapper">
                <div className="ticker-loading">Loading prices...</div>
            </div>
        );
    }
    // Build crypto data array
    const cryptoData = Object.entries(prices).map(([key, price]) => ({
        symbol: tokenMetadata[key]?.symbol || key.toUpperCase(),
        name: tokenMetadata[key]?.name || key,
        price: price,
        icon: tokenMetadata[key]?.icon || '💰',
    }));

    // Add MMV
    cryptoData.push({
        symbol: 'MMV',
        name: 'MetaMemeVault',
        price: MMV_PRICE,
        icon: '💎',
        featured: true,
    });

    // Duplicate for seamless scroll
    const duplicatedData = [...cryptoData, ...cryptoData, ...cryptoData];

    return (
        <div className="price-ticker-wrapper">
            {/* Gradient overlays for fade effect */}
            <div className="ticker-gradient-left"></div>
            <div className="ticker-gradient-right"></div>

            <div className="price-ticker-container">
                <div className="ticker-track">
                    {duplicatedData.map((crypto, index) => (
                        <div
                            key={`${crypto.symbol}-${index}`}
                            className={`ticker-item ${crypto.featured ? 'featured' : ''}`}>
                            <span className="ticker-icon">{crypto.icon}</span>

                            <div className="ticker-info">
                                <span className="ticker-symbol">{crypto.symbol}</span>
                                <span className="ticker-price">{formatPrice(crypto.price)}</span>
                            </div>

                            {crypto.featured && (
                                <>
                                    <Sparkles className="ticker-sparkle" size={16} />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceTickerMarquee;