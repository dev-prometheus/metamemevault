import { supabase } from "../../lib/db.js";

const MMV_PRICE = 0.008; // Update manually

// Points calculation
const PERSONAL_PURCHASE_POINTS = 20; // per $100
const REFERRAL_PURCHASE_POINTS = 10; // per $100  
const ACTIVE_REFERRAL_POINTS = 5; // per active referral

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
    const { wallet, mmvBalance, referralVolume, activeReferrals } = req.query;

    if (!wallet) {
      return res.status(400).json({ message: 'Wallet address required' });
    }

    const normalizedWallet = wallet.toLowerCase();

    // Check if entered giveaway
    const { data: participant } = await supabase
      .from('giveaway_participants')
      .select('*')
      .eq('wallet_address', normalizedWallet)
      .single();

    if (!participant) {
      return res.json({
        message: 'Not entered in giveaway',
        entered: false,
        totalPoints: 0
      });
    }

    // Calculate purchase-based points
    const mmvBalanceNum = parseFloat(mmvBalance) || 0;
    const referralVolumeNum = parseFloat(referralVolume) || 0;
    const activeReferralsNum = parseInt(activeReferrals) || 0;

    // Personal purchases: $100 = 20 points
    const personalPurchaseValue = mmvBalanceNum * MMV_PRICE;
    const personalPoints = Math.floor((personalPurchaseValue / 100) * PERSONAL_PURCHASE_POINTS);

    // Referral purchases: $100 = 10 points
    const referralPurchaseValue = referralVolumeNum * MMV_PRICE;
    const referralPoints = Math.floor((referralPurchaseValue / 100) * REFERRAL_PURCHASE_POINTS);

    // Active referrals: 5 points each
    const activeRefPoints = activeReferralsNum * ACTIVE_REFERRAL_POINTS;

    // Get social task points
    const { data: socialTasks } = await supabase
      .from('giveaway_tasks')
      .select('points_earned')
      .eq('wallet_address', normalizedWallet);

    const socialPoints = socialTasks 
      ? socialTasks.reduce((sum, task) => sum + (task.points_earned || 0), 0)
      : 0;

    // Total points
    const totalPoints = personalPoints + referralPoints + activeRefPoints + socialPoints;

    // Update cache in database
    await supabase
      .from('giveaway_participants')
      .update({
        total_points: totalPoints,
        cached_purchase_points: personalPoints,
        cached_referral_points: referralPoints + activeRefPoints,
        cached_social_points: socialPoints,
        last_points_update: new Date().toISOString()
      })
      .eq('wallet_address', normalizedWallet);

    return res.json({
      entered: true,
      totalPoints,
      breakdown: {
        personalPurchase: personalPoints,
        referralPurchase: referralPoints,
        activeReferrals: activeRefPoints,
        socialTasks: socialPoints
      },
      calculations: {
        personalPurchaseValue: personalPurchaseValue.toFixed(2),
        referralPurchaseValue: referralPurchaseValue.toFixed(2),
        activeReferralsCount: activeReferralsNum
      }
    });

  } catch (error) {
    console.error('Get points error:', error);
    return res.status(500).json({
      message: 'Failed to calculate points',
      error: error.message
    });
  }
}