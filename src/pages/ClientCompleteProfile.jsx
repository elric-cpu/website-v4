import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/customSupabaseClient";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { Button } from "@/components/ui/button";
import { isPhone, sanitizeText } from "@/lib/validators";
import SEO from "@/components/SEO";

const ClientCompleteProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: user?.user_metadata?.full_name || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  React.useEffect(() => {
    if (!user?.id) return;
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("client_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setProfile((prev) => ({
          ...prev,
          ...data,
        }));
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (event) => {
    setProfile((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user?.id) return;

    const missing = [
      "full_name",
      "phone",
      "address",
      "city",
      "state",
      "zip",
    ].filter((field) => !profile[field]);
    if (missing.length) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please complete all required fields.",
      });
      return;
    }

    if (!isPhone(profile.phone)) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please provide a valid phone number.",
      });
      return;
    }

    const sanitizedProfile = {
      full_name: sanitizeText(profile.full_name),
      phone: sanitizeText(profile.phone),
      address: sanitizeText(profile.address),
      city: sanitizeText(profile.city),
      state: sanitizeText(profile.state),
      zip: sanitizeText(profile.zip),
    };

    setLoading(true);
    const { error } = await supabase.from("client_profiles").upsert(
      [
        {
          id: user.id,
          ...sanitizedProfile,
        },
      ],
      { onConflict: "id" },
    );

    if (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Please try again.",
      });
      setLoading(false);
      return;
    }

    await supabase.auth.updateUser({
      data: { onboarded_client: true },
    });

    toast({
      title: "Profile complete",
      description: "Thanks! You can now access the client portal.",
    });
    setLoading(false);
    navigate("/client-portal");
  };

  return (
    <>
      <SEO
        title="Complete Profile"
        description="Complete your client profile to unlock portal access."
        robots="noindex, nofollow"
      />
      <main className="min-h-screen bg-[#FAF6EE] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-[#D4C5A5] p-8">
          <h1 className="text-2xl font-bold text-[#3C0008]">
            Complete Your Profile
          </h1>
          <p className="text-gray-700 mt-2">
            Finish your client profile to unlock portal access.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-charcoal-text mb-1"
                htmlFor="full_name"
              >
                Full Name *
              </label>
              <input
                id="full_name"
                value={profile.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-charcoal-text mb-1"
                htmlFor="phone"
              >
                Phone *
              </label>
              <input
                id="phone"
                value={profile.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-charcoal-text mb-1"
                htmlFor="address"
              >
                Address *
              </label>
              <input
                id="address"
                value={profile.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-charcoal-text mb-1"
                  htmlFor="city"
                >
                  City *
                </label>
                <input
                  id="city"
                  value={profile.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-charcoal-text mb-1"
                  htmlFor="state"
                >
                  State *
                </label>
                <input
                  id="state"
                  value={profile.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-charcoal-text mb-1"
                  htmlFor="zip"
                >
                  ZIP *
                </label>
                <input
                  id="zip"
                  value={profile.zip}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-800 outline-none transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-maroon-800 hover:bg-maroon-900 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save and Continue"}
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default ClientCompleteProfile;
