import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";
import SEO from "@/components/SEO";

export default function ClientPortalLogin() {
  const navigate = useNavigate();
  const { signIn, sendMagicLink, signInWithOAuth } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn(email, password);

    if (result?.error) {
      setError("Incorrect email address or password.");
      toast({
        title: "Login Failed",
        description: "Incorrect email address or password.",
        variant: "destructive",
      });
    } else {
      const { data } = await supabase.auth.getUser();
      const role = data?.user?.user_metadata?.role || "client";
      if (role === "subcontractor") {
        navigate("/subcontractor-portal");
        return;
      }
      const onboarded = Boolean(data?.user?.user_metadata?.onboarded_client);
      navigate(onboarded ? "/client-portal" : "/client-complete-profile");
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    setLoading(true);
    const { error } = await sendMagicLink(email);
    if (error) {
      setError(error.message || "Unable to send magic link.");
    } else {
      toast({
        title: "Magic link sent",
        description: "Check your email to finish signing in.",
      });
    }
    setLoading(false);
  };

  const handleOAuth = async (provider) => {
    await signInWithOAuth(provider);
  };

  return (
    <>
      <SEO
        title="Client Portal Login"
        description="Secure client portal login for Benson Home Solutions."
        robots="noindex, nofollow"
      />

      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="mb-8">
            <Link
              to="/"
              className="text-sm text-[#4A4A4A] hover:text-maroon-800 transition-colors"
            >
              ← Back to Home
            </Link>
            <div className="flex items-center gap-3 mt-6">
              <div className="bg-maroon-100 p-2 rounded-lg">
                <User className="w-6 h-6 text-maroon-800" />
              </div>
              <h1 className="text-2xl font-bold text-charcoal-text">
                Client Portal Login
              </h1>
            </div>
            <p className="text-[#4A4A4A] mt-2">
              Sign in to access your project details and documents.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <div className="text-right">
              <Link
                to="/client-portal-forgot-password"
                className="text-xs text-[#3C0008] font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-maroon-800 hover:bg-maroon-900 text-white"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-maroon-800 text-maroon-800"
              onClick={handleMagicLink}
              disabled={loading || !email}
            >
              Send Magic Link
            </Button>
            <div className="grid grid-cols-1 gap-2">
              <Button
                type="button"
                onClick={() => handleOAuth("google")}
                variant="outline"
              >
                Continue with Google
              </Button>
              <Button
                type="button"
                onClick={() => handleOAuth("azure")}
                variant="outline"
              >
                Continue with Microsoft
              </Button>
            </div>
          </div>

          <div className="mt-6 text-sm text-[#4A4A4A]">
            <p>
              Need an account?{" "}
              <Link
                to="/client-portal-register"
                className="text-[#3C0008] font-bold hover:underline"
              >
                Register here
              </Link>
            </p>
            <p className="mt-2">
              Are you a subcontractor?{" "}
              <Link
                to="/subcontractor-portal-login"
                className="text-[#3C0008] font-bold hover:underline"
              >
                Use subcontractor login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
