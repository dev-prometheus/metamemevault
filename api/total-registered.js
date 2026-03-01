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
    // Get total count of all users in referrals table
    const { count, error } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Count error:', error);
      throw error;
    }

    return res.json({ 
      totalRegistered: count || 0 
    });

  } catch (error) {
    console.error('GetTotalRegistered error:', error);
    return res.status(500).json({ 
      message: 'Error retrieving total registered count',
      error: error.message 
    });
  }
}