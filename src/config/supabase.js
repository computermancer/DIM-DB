import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yocwrpuszqwzysikfjrh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvY3dycHVzenF3enlzaWtmanJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTAyMzksImV4cCI6MjA1OTU4NjIzOX0.CX9ibwZL7jrMSEfTqsbhjLMFKeTuuvJ10Q-1KKJmY9E';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 