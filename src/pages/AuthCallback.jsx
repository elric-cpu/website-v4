import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/customSupabaseClient";
import { getSubcontractorProfile } from "@/lib/portalData";
import { useToast } from "@/components/ui/use-toast";

const roleRouteMap = {
  client: "/client-portal",
  subcontractor: "/subcontractor-portal",
};

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const finishAuth = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        let sessionData = await supabase.auth.getSession();

        if (!sessionData.data?.session && code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            throw error;
          }
          sessionData = await supabase.auth.getSession();
        }

        const session = sessionData.data?.session;

        const role = session?.user?.user_metadata?.role || "client";
        if (role === "client") {
          const onboarded = Boolean(
            session?.user?.user_metadata?.onboarded_client,
          );
          if (!onboarded) {
            navigate("/client-complete-profile");
            return;
          }
        }

        if (role === "subcontractor" && session?.user?.id) {
          const profile = await getSubcontractorProfile(session.user.id);
          const missing =
            !profile?.company_name || !profile?.phone || !profile?.address;
          if (missing) {
            navigate("/subcontractor-complete-profile");
            return;
          }
        }

        navigate(roleRouteMap[role] || "/");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: error.message || "Please try again.",
        });
        navigate("/");
      }
    };

    finishAuth();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-sm text-gray-500">Finishing sign in...</p>
    </div>
  );
};

export default AuthCallback;
