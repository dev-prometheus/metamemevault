import { ethers } from 'ethers';
import { supabase } from '../lib/db.js';

const generateReferralUID = (walletAddress) => {
  if (!walletAddress) return null;
  const normalizedAddress = walletAddress.toLowerCase();
  const bytes = ethers.toUtf8Bytes(normalizedAddress);
  const hash = ethers.keccak256(bytes);
  return hash.slice(2, 10);
};

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
    const { walletAddress, refCode } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: 'Wallet address required' });
    }

    const referralUID = generateReferralUID(walletAddress);
    const normalizedWallet = walletAddress.toLowerCase();

    // Check if user exists
    const { data: existing, error: checkError } = await supabase
      .from('referrals')
      .select('*')
      .or(`wallet_address.eq.${normalizedWallet},referral_uid.eq.${referralUID}`)
      .limit(1)
      .single();

    if (existing) {
      return res.json({
        message: 'User already registered',
        referralUID
      });
    }

    // Validate referrer if provided
    let referrerUID = null;
    let referrerFound = false;
    if (refCode && refCode !== '0' && refCode !== '' && refCode.length >= 6) {

      const { data: referrer } = await supabase
        .from('referrals')
        .select('referral_uid')
        .eq('referral_uid', refCode)
        .limit(1)
        .single();

      if (referrer) {
        referrerUID = refCode;
        referrerFound = true;
      }
    }

    // Insert new user

    const insertData = {
      wallet_address: normalizedWallet,
      referral_uid: referralUID,
      referrer_uid: referrerUID || '0',
      created_at: new Date().toISOString()
    };

    const { data, error: insertError } = await supabase
      .from('referrals')
      .insert(insertData)
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    return res.json({
      message: 'User registered successfully',
      referralUID,
      referrerFound,
      referrerUID: referrerUID || null,
      isExisting: false
    });

  } catch (error) {
    console.error('Registration error:', error);
    // More specific error handling
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({
        message: 'User already exists',
        error: 'duplicate_user'
      });
    }

    return res.status(500).json({
      message: 'Failed to register',
      error: error.message
    });
  }
}