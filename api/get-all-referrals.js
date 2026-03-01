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
    const { limit = 50, offset = 0, wallet, referrer_uid } = req.query;

    let query = supabase
      .from('referrals')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Filter by wallet address if provided
    if (wallet) {
      query = query.eq('wallet_address', wallet.toLowerCase());
    }

    // Filter by referrer_uid if provided
    if (referrer_uid) {
      query = query.eq('referrer_uid', referrer_uid);
    }

    const { data, error, count } = await query
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) {
      console.error('Error fetching referrals:', error);
      throw error;
    }

    return res.json({
      success: true,
      data: data || [],
      total: count || 0,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error('Get referrals error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving referrals',
      error: error.message
    });
  }
}