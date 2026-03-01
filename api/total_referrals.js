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
    const { wallet } = req.query; 
    
    if (!wallet) {
      return res.status(400).json({ message: 'Wallet address required' });
    }

    const normalizedWallet = wallet.toLowerCase();

    // Get user's referral_uid
    const { data: user, error: userError } = await supabase
      .from('referrals')
      .select('referral_uid')
      .eq('wallet_address', normalizedWallet)
      .limit(1)
      .single();

    if (userError || !user || !user.referral_uid) {
      return res.json({ totalReferrals: 0 });
    }

    // Count referrals
    const { count, error: countError } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_uid', user.referral_uid);

    if (countError) {
      console.error('Count error:', countError);
      return res.json({ totalReferrals: 0 });
    }

    return res.json({ totalReferrals: count || 0 });

  } catch (error) {
    console.error('GetTotalReferrals error:', error);
    return res.status(500).json({ 
      message: 'Error retrieving referrals',
      error: error.message 
    });
  }
}