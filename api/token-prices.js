export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') { 
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Token IDs for CoinGecko
    const TOKEN_IDS = {
        'shib': 'shiba-inu',
        'pepe': 'pepe',
        'neiro': 'neiro-3',
        'bonk': 'bonk'
    };

    // Fallback prices
    const FALLBACK_PRICES = {
        'shib': 0.000025,
        'pepe': 0.0000092,
        'neiro': 0.000272,
        'bonk': 0.000032
    };

    try {
        // Try CoinGecko first (most reliable, no API key needed)
        const ids = Object.values(TOKEN_IDS).join(',');
        const geckoResponse = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        );

        if (geckoResponse.ok) {
            const data = await geckoResponse.json();
            const prices = {};

            Object.entries(TOKEN_IDS).forEach(([key, id]) => {
                if (data[id]?.usd) {
                    prices[key] = data[id].usd;
                } else {
                    prices[key] = FALLBACK_PRICES[key];
                }
            });

            return res.json({
                prices,
                source: 'coingecko',
                timestamp: Date.now()
            });
        }

        // If CoinGecko fails, try CoinMarketCap
        const cmcIds = {
            'shib': '5994',
            'pepe': '24478',
            'neiro': '32521',
            'bonk': '23095'
        };

        const cmcIdString = Object.values(cmcIds).join(',');
        const cmcResponse = await fetch(
            `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quote/latest?id=${cmcIdString}`,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        );

        if (cmcResponse.ok) {
            const cmcData = await cmcResponse.json();
            const prices = {};

            if (cmcData.data) {
                Object.entries(cmcIds).forEach(([key, id]) => {
                    const tokenData = cmcData.data[id];
                    if (tokenData?.quotes?.[0]?.price) {
                        prices[key] = tokenData.quotes[0].price;
                    } else {
                        prices[key] = FALLBACK_PRICES[key];
                    }
                });
            }

            return res.json({
                prices,
                source: 'coinmarketcap',
                timestamp: Date.now()
            });
        }

        // If both fail, return fallback prices
        console.log('Both price APIs failed, using fallback prices');
        return res.json({
            prices: FALLBACK_PRICES,
            source: 'fallback',
            timestamp: Date.now()
        });

    } catch (error) {
        console.error('Token prices API error:', error);
        return res.json({
            prices: FALLBACK_PRICES,
            source: 'fallback',
            timestamp: Date.now(),
            error: error.message
        });
    }
}