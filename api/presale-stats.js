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
    const { data, error } = await supabase
      .from('presale_stats')
      .select('total_raised, total_tokens_sold')
      .eq('id', 1)
      .single();

    if (error) throw error;

    return res.status(200).json({
      totalRaised: parseFloat(data.total_raised) || 0,
      totalTokensSold: parseFloat(data.total_tokens_sold) || 0
    });

  } catch (error) {
    console.error('Presale stats API error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch presale stats',
      totalRaised: 0,
      totalTokensSold: 0
    });
  }
} 