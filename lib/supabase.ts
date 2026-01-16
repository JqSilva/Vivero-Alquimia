import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Pattern: Singleton - Se exporta una única instancia
export const supabase = createClient(supabaseUrl, supabaseAnonKey);