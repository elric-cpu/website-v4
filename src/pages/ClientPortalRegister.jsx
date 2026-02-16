import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";

export default function ClientPortalRegister() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp(
      formData.email,
      formData.password,
      {
        role: "client",
        data: {
          full_name: formData.name,
        },
      },
    );

    toast({
      title: "Check your email",
      description:
        "If you already have an account, we'll email you a reset option. Otherwise, confirm your account to finish registration.",
    });
    navigate("/client-portal-login");
    setLoading(false);
  };

  return (
    <>
      <SEO
        title="Client Registration"
        description="Create a client portal account for Benson Home Solutions."
        robots="noindex, nofollow"
      />
      <main className="min-h-screen bg-[#FAF6EE] py-20 px-4">
        <div className="max-w-lg mx-auto bg-white border border-[#D4C5A5] p-8">
          <h1 className="text-3xl font-bold text-[#3C0008]">
            Client Registration
          </h1>
          <p className="text-gray-700 mt-4">
            Create your client portal account.
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-charcoal-text mb-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-charcoal-text mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-charcoal-text mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-charcoal-text mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
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
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-[#4A4A4A]">
            <p>
              Are you a subcontractor?{" "}
              <Link
                to="/subcontractor-portal-register"
                className="text-[#3C0008] font-bold hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
