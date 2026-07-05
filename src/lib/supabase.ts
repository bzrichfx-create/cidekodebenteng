import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tzxbspvlziulifoyizhy.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6eGJzcHZseml1bGlmb3lpemh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMzY5ODEsImV4cCI6MjA5ODgxMjk4MX0.vUu7Lbm8CjrbFr7m9VimtBnKsFR7AFFOW7k3Mn44YgM';

export const supabase = createClient(supabaseUrl, supabaseKey);
