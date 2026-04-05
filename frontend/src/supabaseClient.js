import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wtcqzrriemcvuihddipt.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseKey) {
  console.error('Supabase anon key is missing. Please set VITE_SUPABASE_ANON_KEY in your environment.');
}

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export default supabase;
