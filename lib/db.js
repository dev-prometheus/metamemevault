import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE; // This is the secret key

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false, // No need for sessions in serverless functions
    autoRefreshToken: false,
  }
});