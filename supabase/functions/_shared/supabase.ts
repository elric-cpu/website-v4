import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

export const getSupabaseClient = (request: Request) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY.");
  }
  if (!token) {
    throw new Error("Missing auth token.");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
