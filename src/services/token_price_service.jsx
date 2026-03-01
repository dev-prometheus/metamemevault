import { TOKEN_IDS } from "../config/contract_helpers";

class TokenPriceService {
    constructor() {
        this.cache = new Map();
        this.lastFetch = 0;
        this.CACHE_DURATION = 300000; // 1 minute cache
        this.MIN_FETCH_INTERVAL = 10000; // 10 seconds between fetches
        this.listeners = new Set();

        // Default fallback prices
        this.FALLBACK_PRICES = {
            'shib': 0.000025,
            'pepe': 0.0000019,
            'neiro': 0.0018,
            'bonk': 0.000032
        };
    }

    // Subscribe to price updates
    subscribe(callback) {
        this.listeners.add(callback);
        const current = this.getCachedPrices();
        if (Object.keys(current).length > 0) {
            callback(current);
        }
        return () => this.listeners.delete(callback);
    }

    // Notify all listeners
    notifyListeners() {
        const prices = this.getCachedPrices();
        this.listeners.forEach(callback => callback(prices));
    }

    // Get cached prices
    getCachedPrices() {
        const now = Date.now();
        const prices = {};

        Object.keys(TOKEN_IDS).forEach(key => {
            const cached = this.cache.get(key);
            if (cached && (now - cached.timestamp < this.CACHE_DURATION * 2)) {
                prices[key] = cached.price;
            } else {
                prices[key] = this.FALLBACK_PRICES[key];
            }
        });

        return prices;
    }

    // Main fetch function
    async fetchPrices(forceRefresh = false) {
        const now = Date.now();

        // Rate limit protection
        if (!forceRefresh && (now - this.lastFetch < this.MIN_FETCH_INTERVAL)) {
            return this.getCachedPrices();
        }

        // Check if cache is still fresh
        if (!forceRefresh) {
            const needsUpdate = Object.keys(TOKEN_IDS).some(key => {
                const cached = this.cache.get(key);
                return !cached || (now - cached.timestamp > this.CACHE_DURATION);
            });

            if (!needsUpdate) {
                return this.getCachedPrices();
            }
        }

        this.lastFetch = now;

        try {
            console.log('Fetching prices from API...');

            // Call your API endpoint instead of external APIs directly
            const response = await fetch('/api/token-prices', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
                signal: AbortSignal.timeout(20000) // 8 second timeout
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            if (data.prices && Object.keys(data.prices).length > 0) {
                // Update cache with successful fetch
                Object.entries(data.prices).forEach(([key, price]) => {
                    this.cache.set(key, {
                        price,
                        timestamp: now,
                        source: data.source || 'api'
                    });
                });

                this.notifyListeners();
                console.log(`Prices updated from ${data.source}`);
            } else {
                console.log('No prices returned from API, using cached/fallback');
            }

            return this.getCachedPrices();

        } catch (error) {
            console.error('Price fetch failed:', error);

            // Try to use cached prices first, then fallback
            const cached = this.getCachedPrices();

            // If cache is completely empty or very old, use fallback
            const hasValidCache = Object.keys(cached).some(key =>
                cached[key] !== this.FALLBACK_PRICES[key]
            );

            if (!hasValidCache) {
                console.log('Using fallback prices');
                Object.entries(this.FALLBACK_PRICES).forEach(([key, price]) => {
                    this.cache.set(key, {
                        price,
                        timestamp: now,
                        source: 'fallback'
                    });
                });
                this.notifyListeners();
            }

            return this.getCachedPrices();
        }
    }

    // Force refresh prices
    async refreshPrices() {
        return this.fetchPrices(true);
    }

    // Get single token price
    getTokenPrice(tokenKey) {
        const prices = this.getCachedPrices();
        return prices[tokenKey] || this.FALLBACK_PRICES[tokenKey] || 0;
    }
}

// Create singleton
const priceService = new TokenPriceService();

// Auto-refresh every 20 minutes 
setInterval(() => {
    priceService.fetchPrices();
}, 1200000); // 2 minutes

// Initial fetch after 2 seconds to let the app initialize
setTimeout(() => {
    priceService.fetchPrices();
}, 2000);

export default priceService;