import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { isEmail } from "@/lib/validators";
import { supabase } from "@/lib/customSupabaseClient";
import SEO from "@/components/SEO";

const ClientPortalForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmitEmail = useMemo(() => isEmail(email), [email]);

  const handleRequest = async (event) => {
    event.preventDefault();
    setError("");

    if (!canSubmitEmail) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/reset`,
      },
    );

    if (resetError) {
      setError("Unable to send reset email. Please try again.");
    } else {
      setSent(true);
      toast({
        title: "Check your email",
        description:
          "If the email address is valid, you will receive a One Time Password (OTP) to reset your password.",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Reset Password"
        description="Reset your Benson Home Solutions client portal password."
        robots="noindex, nofollow"
      />

      <main className="min-h-screen bg-[#FAF6EE] py-16 px-4">
        <div className="max-w-lg mx-auto bg-white border border-[#D4C5A5] p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold text-[#3C0008]">
            Reset your password
          </h1>
          <p className="text-sm text-[#4A4A4A] mt-2">
            If the email address is valid, we will send a One Time Password
            (OTP).
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRequest} className="mt-6 space-y-4">
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
            <Button
              type="submit"
              className="w-full bg-maroon-800 hover:bg-maroon-900 text-white"
              disabled={!canSubmitEmail || loading}
            >
              {loading ? "Sending..." : "Send One Time Password"}
            </Button>
          </form>

          {sent && (
            <div className="mt-6 text-sm text-[#4A4A4A]">
              If the email address is valid, you will have a One Time Password
              via email. Please check your inbox and follow the link to
              continue.
            </div>
          )}

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

export default ClientPortalForgotPassword;
