import React, { useState } from "react";
import SEO from "@/components/SEO";
import { useSubcontractorAuth } from "@/hooks/useSubcontractorAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Lock, HardHat, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { getSubcontractorProfile } from "@/lib/portalData";
import { supabase } from "@/lib/customSupabaseClient";

const SubcontractorPortalLogin = () => {
  const { login, sendMagicLink, signInWithOAuth } = useSubcontractorAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    const result = await login(email, password);
    if (!result.success) {
      setError("Incorrect email address or password.");
    } else {
      const { data } = await supabase.auth.getUser();
      const userId = data?.user?.id;
      if (userId) {
        const profile = await getSubcontractorProfile(userId);
        const missing =
          !profile?.company_name || !profile?.phone || !profile?.address;
        if (missing) {
          navigate("/subcontractor-complete-profile");
          return;
        }
      }
      navigate("/subcontractor-portal");
    }
    setLoading(false);
  };

  const handleMagicLink = async () => {
    if (!email) {
      setError("Enter your email to receive a magic link.");
      return;
    }
    setLoading(true);
    const { error: magicError } = await sendMagicLink(email);
    if (magicError) {
      setError(magicError.message || "Unable to send magic link.");
    } else {
      setError("");
    }
    setLoading(false);
  };

  const handleOAuth = async (provider) => {
    await signInWithOAuth(provider);
  };

  return (
    <div className="min-h-screen bg-[#EFE3C8] flex items-center justify-center px-4 py-12">
      <SEO
        title="Subcontractor Portal Login"
        description="Secure subcontractor portal login."
        robots="noindex, nofollow"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-2xl border border-[#D4C5A5] overflow-hidden">
          {/* Header */}
          <div className="bg-[#2A2A2A] p-8 text-center border-b border-[#3C0008]">
            <div className="flex justify-center mb-6">
              <span className="text-white font-bold tracking-widest">
                BENSON
              </span>
            </div>
            <h1 className="text-2xl font-headline font-bold text-white tracking-wide">
              Subcontractor Portal
            </h1>
            <p className="text-[#C5C5C5] text-sm mt-2 font-sans flex items-center justify-center gap-2">
              <HardHat className="w-4 h-4 text-[#EFE3C8]" /> Partner Access Only
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-sans">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#2A2A2A] font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-[#D4C5A5] focus:ring-[#3C0008] bg-[#FAF6EE]"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Password
                  </Label>
                  <Link
                    to="/client-portal-forgot-password"
                    className="text-xs text-[#3C0008] hover:underline font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-[#D4C5A5] focus:ring-[#3C0008] bg-[#FAF6EE]"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#4A4A4A]"
                >
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3C0008] hover:bg-[#5A1A1A] text-[#FAF6EE] h-12 text-lg font-bold tracking-wide shadow-md transition-all hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Secure Login
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full border-[#3C0008] text-[#3C0008]"
                onClick={handleMagicLink}
                disabled={loading}
              >
                Send Magic Link
              </Button>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuth("google")}
                >
                  Continue with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuth("azure")}
                >
                  Continue with Microsoft
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center border-t border-gray-100 pt-6 space-y-2">
              <p className="text-sm text-[#4A4A4A]">
                Don't have an account?{" "}
                <Link
                  to="/subcontractor-portal-register"
                  className="text-[#3C0008] font-bold hover:underline"
                >
                  Register here
                </Link>
              </p>
              <p className="text-sm text-[#4A4A4A]">
                Want to partner with us?{" "}
                <Link
                  to="/subcontractor-portal-register"
                  className="text-[#3C0008] font-bold hover:underline"
                >
                  Apply Now
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-[#3C0008] text-sm font-semibold hover:underline flex items-center justify-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SubcontractorPortalLogin;
