import { useAuth } from "@/contexts/SupabaseAuthContext";
import { supabase } from "@/lib/customSupabaseClient";

export const useSubcontractorAuth = () => {
  const { signIn, sendMagicLink, signInWithOAuth, signOut } = useAuth();

  const login = async (email, password) => {
    const { error } = await signIn(email, password);
    if (error) {
      return { success: false, error: error.message || "Login failed" };
    }

    const { data, error: userError } = await supabase.auth.getUser();
    if (userError) {
      return { success: false, error: userError.message || "Login failed" };
    }

    const role = data?.user?.user_metadata?.role;
    if (role !== "subcontractor") {
      await signOut();
      return { success: false, error: "This account is not a subcontractor." };
    }

    return { success: true };
  };

  return {
    login,
    sendMagicLink,
    signInWithOAuth,
  };
};
