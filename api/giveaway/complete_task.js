import { supabase } from "../../lib/db.js";

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
    const { walletAddress, taskType, taskIdentifier, pointsEarned } = req.body;

    if (!walletAddress || !taskType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const normalizedWallet = walletAddress.toLowerCase();

    // Check if user entered giveaway
    const { data: participant } = await supabase
      .from('giveaway_participants')
      .select('wallet_address')
      .eq('wallet_address', normalizedWallet)
      .single();

    if (!participant) {
      return res.status(403).json({
        message: 'Must enter giveaway first'
      });
    }

    // Check if task already completed
    const { data: existing } = await supabase
      .from('giveaway_tasks')
      .select('id')
      .eq('wallet_address', normalizedWallet)
      .eq('task_type', taskType)
      .eq('task_identifier', taskIdentifier || taskType)
      .single();

    if (existing) {
      return res.status(400).json({
        message: 'Task already completed',
        alreadyCompleted: true
      });
    }

    // Insert task completion
    const { data, error } = await supabase
      .from('giveaway_tasks')
      .insert({
        wallet_address: normalizedWallet,
        task_type: taskType,
        task_identifier: taskIdentifier || taskType,
        points_earned: pointsEarned,
        completed_at: new Date().toISOString(),
        verified: true // Honor system
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.json({
      message: 'Task completed successfully!',
      pointsEarned,
      completedAt: data.completed_at
    });

  } catch (error) {
    console.error('Complete task error:', error);
    return res.status(500).json({
      message: 'Failed to complete task',
      error: error.message
    });
  }
}