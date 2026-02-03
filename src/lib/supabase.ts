import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Check if we have valid config
const hasValidConfig = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined';

// Create client only if we have valid config
let supabase: SupabaseClient;

if (hasValidConfig) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client that won't crash - will show auth errors gracefully
  console.warn('Supabase config missing - using placeholder');
  supabase = createClient(
    'https://placeholder.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk3NjgwMDAsImV4cCI6MTk2NTM0NDAwMH0.placeholder'
  );
}

export { supabase };

// Browser client for auth
export const createBrowserClient = () => {
  if (!hasValidConfig) {
    console.warn('Supabase config missing');
  }
  return supabase;
};
