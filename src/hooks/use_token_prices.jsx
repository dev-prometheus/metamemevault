import { useEffect, useState, useCallback } from "react"
import priceService from "../services/token_price_service";

export const useTokenPrices = () => {
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        // Subscribe to price updates
        const unsubscribe = priceService.subscribe((newPrices) => {
            setPrices(newPrices);
            setLastUpdated(Date.now());
            setLoading(false);
        });

        // Initial fetch
        priceService.fetchPrices().catch(console.error);

        // Cleanup
        return () => {
            unsubscribe();
        };
    }, []); 

    // Manual refresh function
    const refresh = useCallback(async () => {
        await priceService.fetchPrices();
    }, []);

    // Force refresh (bypasses cache)
    const forceRefresh = useCallback(async () => {
        setLoading(true);
        await priceService.fetchPrices(true);
        setLoading(false);
    }, []);

    return {
        prices,
        loading,
        lastUpdated,
        refresh,
        forceRefresh
    };
}