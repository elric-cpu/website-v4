import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/customSupabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, HardHat, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  isEmail,
  isPhone,
  isStrongPassword,
  sanitizeText,
} from "@/lib/validators";
import SEO from "@/components/SEO";

const SubcontractorPortalRegister = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    license_number: "",
    insurance_expiry: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!isEmail(formData.email)) {
      setError("Please provide a valid email address");
      return false;
    }
    if (!isPhone(formData.phone)) {
      setError("Please provide a valid phone number");
      return false;
    }
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return false;
    }
    if (!isStrongPassword(formData.password)) {
      setError("Password must be at least 8 characters and contain a number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      // 1. Create auth user
      const { error: authError } = await signUp(
        formData.email,
        formData.password,
        {
          role: "subcontractor",
          data: {
            full_name: sanitizeText(formData.name),
            company_name: sanitizeText(formData.company_name),
            phone: sanitizeText(formData.phone),
          },
        },
      );

      if (authError) {
        toast({
          title: "Check your email",
          description:
            "If you already have an account, we'll email you a reset option. Otherwise, confirm your account to finish registration.",
        });
        navigate("/subcontractor-portal-login");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (userId) {
        const { error: subError } = await supabase
          .from("subcontractors")
          .insert([
            {
              id: userId,
              name: sanitizeText(formData.name),
              company_name: sanitizeText(formData.company_name),
              email: sanitizeText(formData.email),
              phone: sanitizeText(formData.phone),
              address: sanitizeText(formData.address),
              city: sanitizeText(formData.city),
              state: sanitizeText(formData.state),
              zip: sanitizeText(formData.zip),
              license_number: sanitizeText(formData.license_number),
              insurance_expiry: formData.insurance_expiry || null,
            },
          ]);

        if (subError) {
          console.error("Subcontractor creation error:", subError);
          throw new Error("Failed to create subcontractor profile");
        }
      }

      toast({
        title: "Check your email",
        description:
          "If you already have an account, we'll email you a reset option. Otherwise, confirm your account to finish registration.",
      });
      navigate("/subcontractor-portal-login");
    } catch (err) {
      console.error(err);
      setError("We couldn't complete your request. Please try again.");
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "We couldn't complete your request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE3C8] flex items-center justify-center px-4 py-12">
      <SEO
        title="Subcontractor Registration"
        description="Create a subcontractor account for the Benson Home Solutions portal."
        robots="noindex, nofollow"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
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
              Subcontractor Registration
            </h1>
            <p className="text-[#C5C5C5] text-sm mt-2 font-sans flex items-center justify-center gap-2">
              <HardHat className="w-4 h-4 text-[#EFE3C8]" /> Partner Account
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Contact Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="company_name"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Company Name
                  </Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="city"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="state"
                      className="text-[#2A2A2A] font-semibold"
                    >
                      State
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="bg-[#FAF6EE] border-[#D4C5A5]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="zip"
                      className="text-[#2A2A2A] font-semibold"
                    >
                      Zip
                    </Label>
                    <Input
                      id="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="bg-[#FAF6EE] border-[#D4C5A5]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="license_number"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    License Number
                  </Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="insurance_expiry"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Insurance Expiry
                  </Label>
                  <Input
                    id="insurance_expiry"
                    type="date"
                    value={formData.insurance_expiry}
                    onChange={handleChange}
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirm_password"
                    className="text-[#2A2A2A] font-semibold"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    className="bg-[#FAF6EE] border-[#D4C5A5]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3C0008] hover:bg-[#5A1A1A] text-[#FAF6EE] h-12 text-lg font-bold tracking-wide shadow-md transition-all hover:shadow-lg mt-6"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/subcontractor-portal-login"
                className="text-[#3C0008] hover:underline font-semibold text-sm"
              >
                Already have an account? Login here
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubcontractorPortalRegister;
