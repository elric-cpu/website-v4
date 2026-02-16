import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const requireEnv = (key) => {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`Missing ${key}`);
  return value;
};

export const createAdminClient = () => {
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
};

export const getUserFromRequest = async (supabase, req) => {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) return { user: null, error: "Missing token" };
  const { data, error } = await supabase.auth.getUser(token);
  return { user: data?.user ?? null, error };
};

export const requireStaffRole = (user) => {
  if (!user) return { ok: false, error: "Unauthorized" };
  if (user.user_metadata?.role !== "staff") {
    return { ok: false, error: "Forbidden" };
  }
  return { ok: true };
};

export const requireOrgMember = async (supabase, organizationId, userId) => {
  const { data } = await supabase
    .from("workspace_members")
    .select("id")
    .eq("organization_id", organizationId)
    .eq("user_id", userId)
    .maybeSingle();
  if (!data) {
    return { ok: false, error: "Forbidden" };
  }
  return { ok: true };
};
