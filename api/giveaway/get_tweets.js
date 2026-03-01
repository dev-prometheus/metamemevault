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

        // Get active tweets
        const { data: tweets, error } = await supabase
            .from('giveaway_active_tweets')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        // If wallet provided, get user's completed tasks
        let completedTasks = [];
        if (wallet) {
            const normalizedWallet = wallet.toLowerCase();
            const { data: tasks } = await supabase
                .from('giveaway_tasks')
                .select('task_type, task_identifier')
                .eq('wallet_address', normalizedWallet);

            completedTasks = tasks || [];
        }

        // Mark which tweets user has interacted with
        const tweetsWithStatus = tweets.map(tweet => {
            const hasLiked = completedTasks.some(
                t => t.task_type === 'tweet_like' && t.task_identifier === tweet.tweet_id
            );
            const hasRetweeted = completedTasks.some(
                t => t.task_type === 'tweet_retweet' && t.task_identifier === tweet.tweet_id
            );

            return {
                ...tweet,
                userHasLiked: hasLiked,
                userHasRetweeted: hasRetweeted
            };
        });

        return res.json({
            tweets: tweetsWithStatus,
            totalTweets: tweetsWithStatus.length
        });

    } catch (error) {
        console.error('Get tweets error:', error);
        return res.status(500).json({
            message: 'Failed to get tweets',
            error: error.message
        });
    }
}