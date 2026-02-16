import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Shield } from "lucide-react";
import { supabase } from "@/lib/customSupabaseClient";
import SEO from "@/components/SEO";

export default function StaffPortalLogin() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
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
      setLoading(false);
      return;
    }

    const { data } = await supabase.auth.getUser();
    const role = data?.user?.user_metadata?.role || "client";
    if (role !== "staff") {
      setError("This portal is restricted to staff accounts.");
      setLoading(false);
      return;
    }

    navigate("/staff-portal");
    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Staff Portal Login"
        description="Secure staff access for estimating workflows."
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
                <Shield className="w-6 h-6 text-maroon-800" />
              </div>
              <h1 className="text-2xl font-bold text-charcoal-text">
                Staff Portal Login
              </h1>
            </div>
            <p className="text-[#4A4A4A] mt-2">
              Sign in to access the estimating workspace.
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
                placeholder="staff@example.com"
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
        </div>
      </div>
    </>
  );
}
