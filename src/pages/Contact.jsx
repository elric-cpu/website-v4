import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import { submitContactLead } from "@/lib/contact/submitContactLead";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
} from "@/data/internalLinks";

const Contact = () => {
  const [isInsuranceClaim, setIsInsuranceClaim] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    message: "",
    claimNumber: "",
    policyNumber: "",
    adjusterName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        isInsuranceClaim,
        source: "contact",
        timestamp: new Date().toISOString(),
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      };

      if (!isInsuranceClaim) {
        payload.claimNumber = "";
        payload.policyNumber = "";
        payload.adjusterName = "";
      }

      await submitContactLead(payload);

      toast({
        title: "Message Sent",
        description:
          "Thanks for reaching out. We will respond shortly. For urgent issues, call (541) 321-5115.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "",
        service: "",
        message: "",
        claimNumber: "",
        policyNumber: "",
        adjusterName: "",
      });
      setIsInsuranceClaim(false);
    } catch (err) {
      const message = String(err?.message || "");
      const fallback =
        message.toLowerCase().includes("endpoint not configured") ||
        message.toLowerCase().includes("lead endpoint")
          ? "Online submission is unavailable. Please call (541) 321-5115 or email Office@bensonhomesolutions.com."
          : "We could not send your request. Please try again or call (541) 321-5115.";

      toast({
        title: "Unable to Send",
        description: fallback,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Explore plans",
    },
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Review coverage",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Emergency response",
    },
    {
      ...SERVICE_PILLAR_LINKS.mold,
      cta: "Mold assessment",
    },
  ];

  return (
    <>
      <SEO
        title="Contact Benson Home Solutions | Oregon Restoration & Maintenance"
        description="Contact Benson Home Solutions for estimates, maintenance plans, and emergency response. Serving Burns, Hines, Sweet Home, Lebanon, and Albany."
        keywords="contact Oregon contractor, water damage emergency phone, maintenance plan estimate, restoration estimate Oregon, Burns OR contractor contact"
      />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact & Dispatch
            </h1>
            <p className="text-xl text-cream">
              Request an estimate, start a maintenance plan, or dispatch
              emergency response.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Choose the service line or maintenance program that fits your need."
          />
          <LocationsServedBlock
            links={GEO_HUB_LINKS}
            subtitle="Serving Harney County and the Mid-Willamette Valley."
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-contractor-black mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <Phone className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">
                      Phone
                    </p>
                    <p className="text-restoration-gray mb-1">
                      <a
                        href="tel:5413215115"
                        className="hover:text-maroon transition-colors"
                      >
                        (541) 321-5115
                      </a>{" "}
                      (Primary)
                    </p>
                    <p className="text-restoration-gray">
                      <a
                        href="tel:5414130480"
                        className="hover:text-maroon transition-colors"
                      >
                        (541) 413-0480
                      </a>{" "}
                      (Secondary)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <Mail className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:Office@bensonhomesolutions.com"
                      className="text-restoration-gray hover:text-maroon transition-colors"
                    >
                      Office@bensonhomesolutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">
                      Service Areas
                    </p>
                    <p className="text-restoration-gray">
                      Harney County: Burns, Hines
                      <br />
                      Mid-Willamette Valley: Sweet Home, Lebanon, Albany
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cream p-3 rounded-full">
                    <Clock className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <p className="font-bold text-contractor-black mb-1">
                      Hours
                    </p>
                    <p className="text-restoration-gray">
                      Mon-Fri: 8:00 AM - 5:00 PM
                      <br />
                      <span className="font-semibold text-maroon">
                        24/7 Water Damage Restoration
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-contractor-black mb-6">
                Request an Estimate
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="(541) 555-0123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                      placeholder="e.g. Burns, Sweet Home"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Needed</Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                  >
                    <option value="">Select a service...</option>
                    <option value="Water Damage Restoration">
                      Water Damage Restoration
                    </option>
                    <option value="Mold Remediation">Mold Remediation</option>
                    <option value="Maintenance Plans">Maintenance Plans</option>
                    <option value="Bathroom Remodel">Bathroom Remodel</option>
                    <option value="Kitchen Remodel">Kitchen Remodel</option>
                    <option value="Inspection Repairs">
                      Inspection Repairs
                    </option>
                    <option value="Moisture Control">Moisture Control</option>
                    <option value="Accessibility Retrofits">
                      Accessibility Retrofits
                    </option>
                    <option value="Energy Comfort Retrofits">
                      Energy Comfort Retrofits
                    </option>
                    <option value="Insurance Claims Repairs">
                      Insurance Claims Repairs
                    </option>
                    <option value="Commercial Maintenance">
                      Commercial Maintenance
                    </option>
                    <option value="Commercial Service Agreements">
                      Commercial Service Agreements
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox
                    id="insurance"
                    checked={isInsuranceClaim}
                    onCheckedChange={(checked) =>
                      setIsInsuranceClaim(checked === true)
                    }
                  />
                  <Label
                    htmlFor="insurance"
                    className="font-medium cursor-pointer"
                  >
                    This is an insurance claim
                  </Label>
                </div>

                {isInsuranceClaim && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-6 p-4 bg-gray-50 rounded-md border border-gray-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="claimNumber">Claim Number</Label>
                        <input
                          id="claimNumber"
                          name="claimNumber"
                          value={formData.claimNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="policyNumber">Policy Number</Label>
                        <input
                          id="policyNumber"
                          name="policyNumber"
                          value={formData.policyNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adjusterName">
                        Adjuster Name (if known)
                      </Label>
                      <input
                        id="adjusterName"
                        name="adjusterName"
                        value={formData.adjusterName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon"
                    placeholder="Tell us about your project or emergency..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-maroon hover:bg-opacity-90 text-white text-lg py-6"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
