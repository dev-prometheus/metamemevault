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

    // Get user's points
    const { data: user } = await supabase
      .from('giveaway_participants')
      .select('total_points')
      .eq('wallet_address', normalizedWallet)
      .single();

    if (!user) {
      return res.json({
        entered: false,
        rank: null,
        totalPoints: 0
      });
    }

    // Calculate rank by counting users with more points
    const { count } = await supabase
      .from('giveaway_participants')
      .select('wallet_address', { count: 'exact', head: true })
      .gt('total_points', user.total_points);

    const rank = (count || 0) + 1;

    // Get total participants
    const { count: totalParticipants } = await supabase
      .from('giveaway_participants')
      .select('wallet_address', { count: 'exact', head: true });

    // Determine prize tier
    let prizeTier = null;
    if (rank <= 10) {
      prizeTier = 'TOP_10_USDT';
    } else if (rank <= 110) {
      prizeTier = 'TOP_110_MMV';
    } else {
      prizeTier = 'RANDOM_DRAW';
    }

    return res.json({
      entered: true,
      rank,
      totalPoints: user.total_points,
      totalParticipants,
      prizeTier,
      percentile: totalParticipants > 0 
        ? Math.round((1 - (rank - 1) / totalParticipants) * 100) 
        : 100
    });

  } catch (error) {
    console.error('Get position error:', error);
    return res.status(500).json({
      message: 'Failed to get position',
      error: error.message
    });
  }
}