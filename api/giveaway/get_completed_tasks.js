import { supabase } from "../../lib/db.js";

export default async function handler(req, res) {
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
        const { wallet } = req.query;

        if (!wallet) {
            return res.status(400).json({ message: 'Wallet address required' });
        }

        const normalizedWallet = wallet.toLowerCase();

        // Get ALL completed tasks for this wallet
        const { data: tasks, error } = await supabase
            .from('giveaway_tasks')
            .select('task_type, task_identifier, points_earned, completed_at')
            .eq('wallet_address', normalizedWallet)
            .order('completed_at', { ascending: false });

        if (error) {
            throw error;
        }

        return res.json({
            completedTasks: tasks || [],
            totalCompleted: tasks ? tasks.length : 0
        });

    } catch (error) {
        console.error('Get completed tasks error:', error);
        return res.status(500).json({
            message: 'Failed to get completed tasks',
            error: error.message
        });
    }
}