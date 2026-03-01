// api/error-log.js
import { supabase } from '../lib/db.js';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const {
            message,
            stack,
            location = 'unknown',
            componentStack,
            isDOMError = false,
            timestamp,
            type = 'component_error'
        } = req.body;

        // Get request info
        const userAgent = req.headers['user-agent'] || 'unknown';
        const referer = req.headers['referer'] || 'N/A';

        // Detect DOM errors if not explicitly flagged
        const detectedDOMError = isDOMError ||
            message?.includes('removeChild') ||
            message?.includes('insertBefore') ||
            message?.includes('not a child');

        // Save to database
        const { error: dbError } = await supabase
            .from('error_logs')
            .insert({
                message: message || 'Unknown error',
                stack: stack || null,
                component_stack: componentStack || null,
                location: location,
                url: referer,
                user_agent: userAgent,
                browser: getBrowserFromUA(userAgent),
                severity: getSeverity(message, detectedDOMError),
                error_type: type,
                is_dom_error: detectedDOMError,
                timestamp: timestamp || new Date().toISOString(),
                page_path: extractPath(referer),
                is_mobile: isMobile(userAgent)
            });

        if (dbError) {
            console.error('Error log database error:', dbError);
            return res.status(200).json({ logged: false });
        }

        return res.json({
            logged: true,
            isDOMError: detectedDOMError
        });

    } catch (error) {
        console.error('Error log API error:', error);
        return res.status(200).json({ logged: false });
    }
}

function getBrowserFromUA(ua) {
    if (ua.includes('Chrome') && !ua.includes('Edge')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edge') || ua.includes('Edg/')) return 'Edge';
    if (ua.includes('Opera') || ua.includes('OPR/')) return 'Opera';
    return 'Unknown';
}

function getSeverity(message, isDOMError) {
    if (isDOMError) return 'critical';  // 👈 DOM errors are critical

    const msg = (message || '').toLowerCase();
    if (msg.includes('wallet') || msg.includes('transaction')) return 'high';
    if (msg.includes('network') || msg.includes('fetch')) return 'medium';
    if (msg.includes('render') || msg.includes('component')) return 'medium';
    return 'low';
}

function extractPath(referer) {
    try {
        const url = new URL(referer);
        return url.pathname;
    } catch {
        return 'unknown';
    }
}

function isMobile(ua) {
    return /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
}