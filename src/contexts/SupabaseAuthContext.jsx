import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { supabase } from "@/lib/customSupabaseClient";
import { useToast } from "@/components/ui/use-toast";
import { fetchFromWorker } from "@/lib/edgeClient";
import { resolveSafeRedirectUrl } from "@/lib/security";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const welcomeRequested = useRef(false);

  const handleSession = useCallback(async (session) => {
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);

    if (session?.access_token && session?.user?.email) {
      const hasWelcome = Boolean(session.user.user_metadata?.welcome_sent);

      if (!hasWelcome && !welcomeRequested.current) {
        welcomeRequested.current = true;
        try {
          await fetchFromWorker("/api/email/welcome", {
            body: {
              email: session.user.email,
              role: session.user.user_metadata?.role || "client",
            },
            token: session.access_token,
          });

          await supabase.auth.updateUser({
            data: { welcome_sent: true },
          });
        } catch (error) {
          welcomeRequested.current = false;
          console.error("Failed to send welcome email:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      handleSession(session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(
    async (
      email,
      password,
      { role = "client", data = {}, redirectTo } = {},
    ) => {
      const fallbackRedirect = `${window.location.origin}/auth/callback`;
      const emailRedirectTo = resolveSafeRedirectUrl(
        redirectTo,
        fallbackRedirect,
      );

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
          data: {
            role,
            ...data,
          },
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign up Failed",
          description: error.message || "Something went wrong",
        });
      }

      return { error };
    },
    [toast],
  );

  const signIn = useCallback(
    async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign in Failed",
          description: error.message || "Something went wrong",
        });
      }

      return { error };
    },
    [toast],
  );

  const sendMagicLink = useCallback(
    async (email) => {
      const emailRedirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Magic link failed",
          description: error.message || "Something went wrong",
        });
      }

      return { error };
    },
    [toast],
  );

  const signInWithOAuth = useCallback(
    async (provider) => {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "OAuth sign in failed",
          description: error.message || "Something went wrong",
        });
      }

      return { error };
    },
    [toast],
  );

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { error };
  }, [toast]);

  const sendNotificationEmail = useCallback(
    async ({ subject, message, recipientEmail }) => {
      if (!session?.access_token) {
        throw new Error("Must be signed in to send notifications.");
      }

      return fetchFromWorker("/api/email/notification", {
        body: {
          subject,
          message,
          email: recipientEmail || session.user?.email,
        },
        token: session.access_token,
      });
    },
    [session],
  );

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      signUp,
      signIn,
      sendMagicLink,
      signInWithOAuth,
      signOut,
      sendNotificationEmail,
    }),
    [
      user,
      session,
      loading,
      signUp,
      signIn,
      sendMagicLink,
      signInWithOAuth,
      signOut,
      sendNotificationEmail,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
