import { supabase } from "../../lib/db.js";

const MMV_PRICE = 0.008; // Update this manually
const MIN_PURCHASE_USD = 50;

export default async function handler(req, res) {
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
    const { walletAddress, mmvBalance } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: 'Wallet address required' });
    }

    if (!mmvBalance || mmvBalance <= 0) {
      return res.status(400).json({ 
        message: 'Invalid MMV balance',
        eligible: false 
      });
    }

    const normalizedWallet = walletAddress.toLowerCase();

    // Check eligibility: $50 minimum
    const purchaseValueUSD = mmvBalance * MMV_PRICE;
    
    if (purchaseValueUSD < MIN_PURCHASE_USD) {
      const amountNeeded = MIN_PURCHASE_USD - purchaseValueUSD;
      return res.status(400).json({
        message: `Need $${amountNeeded.toFixed(2)} more worth of $MMV to enter`,
        eligible: false,
        currentValue: purchaseValueUSD.toFixed(2),
        minimumRequired: MIN_PURCHASE_USD,
        amountNeeded: amountNeeded.toFixed(2)
      });
    }

    // Check if already entered
    const { data: existing } = await supabase
      .from('giveaway_participants')
      .select('wallet_address')
      .eq('wallet_address', normalizedWallet)
      .single();

    if (existing) {
      return res.json({
        message: 'Already entered',
        eligible: true,
        alreadyEntered: true
      });
    }

    // Enter user into giveaway
    const { data, error } = await supabase
      .from('giveaway_participants')
      .insert({
        wallet_address: normalizedWallet,
        entered_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.json({
      message: 'Successfully entered giveaway!',
      eligible: true,
      alreadyEntered: false,
      enteredAt: data.entered_at
    });

  } catch (error) {
    console.error('Enter giveaway error:', error);
    return res.status(500).json({
      message: 'Failed to enter giveaway',
      error: error.message
    });
  }
}