import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if variables are still default placeholders
const isConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'https://your-supabase-url.supabase.co' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your-supabase-anon-key';

if (!isConfigured) {
  console.warn(
    'Supabase environment variables are not configured yet. Please update the .env file with your Supabase project URL and API key. Database functions will use mocked data for now.'
  );
}

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Export helper to check configuration status
export const isSupabaseConfigured = () => isConfigured;
