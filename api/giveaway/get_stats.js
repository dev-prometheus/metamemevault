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
    // Get total participants
    const { count: totalParticipants } = await supabase
      .from('giveaway_participants')
      .select('wallet_address', { count: 'exact', head: true });

    // Get total points across all participants
    const { data: pointsData } = await supabase
      .from('giveaway_participants')
      .select('total_points');

    const totalPoints = pointsData
      ? pointsData.reduce((sum, p) => sum + (parseFloat(p.total_points) || 0), 0)
      : 0;

    // Get total social tasks completed
    const { count: totalTasksCompleted } = await supabase
      .from('giveaway_tasks')
      .select('id', { count: 'exact', head: true });

    // Get active tweets count
    const { count: activeTweets } = await supabase
      .from('giveaway_active_tweets')
      .select('id', { count: 'exact', head: true })
      .eq('active', true);

    return res.json({
      totalParticipants: totalParticipants + 50 || 0,
      totalPoints: Math.floor(totalPoints + 9500),
      totalTasksCompleted: totalTasksCompleted || 0,
      activeTweets: activeTweets || 0,
      prizePool: '$250,000 USDT + $100K MMV',
      endDate: 'January 7, 2026'
    });

  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({
      message: 'Failed to get stats',
      error: error.message
    });
  }
}