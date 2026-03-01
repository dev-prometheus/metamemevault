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

    // Get user's referrer_uid
    const { data: user, error: userError } = await supabase
      .from('referrals')
      .select('referrer_uid')
      .eq('wallet_address', normalizedWallet)
      .limit(1)
      .single();

    if (userError || !user || !user.referrer_uid || user.referrer_uid === '0') {
      return res.json({ 
        message: 'No referrer found', 
        referrer: null 
      });
    }

    // Get referrer's wallet address
    const { data: referrer, error: referrerError } = await supabase
      .from('referrals')
      .select('wallet_address')
      .eq('referral_uid', user.referrer_uid)
      .limit(1)
      .single();

    if (referrerError || !referrer) {
      return res.json({ 
        message: 'No referrer wallet found', 
        referrer: null 
      });
    }

    return res.json({ 
      referrer: referrer.wallet_address 
    });

  } catch (error) {
    console.error('GetReferrer error:', error);
    return res.status(500).json({ 
      message: 'Error retrieving referrer',
      error: error.message 
    });
  }
}