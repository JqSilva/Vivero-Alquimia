import { createClient } from '@supabase/supabase-js';

// Estas variables las saca de tu .env.local automáticamente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Exportamos la instancia para usarla en los Repositorios
export const supabase = createClient(supabaseUrl, supabaseAnonKey);