import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { isStrongPassword } from "@/lib/validators";
import { supabase } from "@/lib/customSupabaseClient";
import SEO from "@/components/SEO";

const AuthResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const sessionPromiseRef = useRef(null);
  const { accessToken, refreshToken } = useMemo(() => {
    const hash = window.location.hash.replace("#", "");
    const params = new URLSearchParams(hash);
    return {
      accessToken: params.get("access_token"),
      refreshToken: params.get("refresh_token"),
    };
  }, []);
  const hasTokens = Boolean(accessToken && refreshToken);

  useEffect(() => {
    if (!hasTokens) return;
    sessionPromiseRef.current = supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }, [accessToken, refreshToken, hasTokens]);

  const ensureSession = async () => {
    if (!accessToken || !refreshToken) {
      return { error: new Error("Missing reset tokens.") };
    }
    if (!sessionPromiseRef.current) {
      sessionPromiseRef.current = supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    }
    return sessionPromiseRef.current;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const sessionResult = await ensureSession();
    if (sessionResult?.error) {
      setError("Unable to validate reset link. Please request a new one.");
      return;
    }

    if (!isStrongPassword(password)) {
      setError(
        "Password must be at least 8 characters with a number and a letter.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError("Unable to update password. Please try again.");
      return;
    }

    toast({
      title: "Password updated",
      description: "You can now sign in with your new password.",
    });
    navigate("/client-portal-login");
  };

  return (
    <>
      <SEO
        title="Set New Password | Benson Home Solutions"
        robots="noindex, nofollow"
      />

      <main className="min-h-screen bg-[#FAF6EE] py-16 px-4">
        <div className="max-w-lg mx-auto bg-white border border-[#D4C5A5] p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold text-[#3C0008]">
            Set a new password
          </h1>
          <p className="text-sm text-[#4A4A4A] mt-2">
            Use a strong password with at least 8 characters, a letter, and a
            number.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {!hasTokens && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              Reset link is missing or expired. Please request a new password
              reset email.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-1">
                New Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                placeholder="Re-enter password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-maroon-800 hover:bg-maroon-900 text-white"
              disabled={!hasTokens}
            >
              Save New Password
            </Button>
          </form>

          <div className="mt-6 text-sm text-[#4A4A4A]">
            <Link
              to="/client-portal-login"
              className="text-[#3C0008] font-bold hover:underline"
            >
              Return to login
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthResetPassword;
