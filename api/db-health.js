import { supabase } from '../lib/db.js';

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

    try {
        const startTime = Date.now();

        // Perform lightweight queries on all tables to keep them active
        const [contactsCount, errorLogsCount, referralsCount] = await Promise.all([
            supabase.from('contacts').select('*', { count: 'exact', head: true }),
            supabase.from('error_logs').select('*', { count: 'exact', head: true }),
            supabase.from('referrals').select('*', { count: 'exact', head: true })
        ]);

        const responseTime = Date.now() - startTime;

        // Check for any errors
        const errors = [];
        if (contactsCount.error) errors.push({ table: 'contacts', error: contactsCount.error.message });
        if (errorLogsCount.error) errors.push({ table: 'error_logs', error: errorLogsCount.error.message });
        if (referralsCount.error) errors.push({ table: 'referrals', error: referralsCount.error.message });

        return res.json({
            status: errors.length === 0 ? 'healthy' : 'degraded',
            timestamp: new Date().toISOString(),
            responseTime: `${responseTime}ms`,
            tables: {
                contacts: {
                    status: contactsCount.error ? 'error' : 'ok',
                    count: contactsCount.count || 0,
                    error: contactsCount.error?.message
                },
                error_logs: {
                    status: errorLogsCount.error ? 'error' : 'ok',
                    count: errorLogsCount.count || 0,
                    error: errorLogsCount.error?.message
                },
                referrals: {
                    status: referralsCount.error ? 'error' : 'ok',
                    count: referralsCount.count || 0,
                    error: referralsCount.error?.message
                }
            },
            errors: errors.length > 0 ? errors : null
        });

    } catch (error) {
        console.error('Database health check error:', error);
        return res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            message: 'Failed to check database health',
            error: error.message
        });
    }
}