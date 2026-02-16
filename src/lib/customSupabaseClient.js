import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta?.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY;
const isProd = import.meta?.env?.PROD;

if (!supabaseUrl || !supabaseAnonKey) {
  const message =
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Check your .env file.";
  if (isProd) {
    throw new Error(message);
  }
  console.error(message);
}

const fallbackUrl = "http://127.0.0.1:54321";
const fallbackKey = "test-anon-key";

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackKey,
);
