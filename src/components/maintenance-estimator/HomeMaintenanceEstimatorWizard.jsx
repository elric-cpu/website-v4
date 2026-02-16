import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  HOME_SIZE_OPTIONS,
  ESTIMATE_BY_SIZE,
} from "@/lib/maintenanceEstimator/config";
import { submitEstimatorLead } from "@/lib/maintenanceEstimator/submitEstimatorLead";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidZip = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

export default function HomeMaintenanceEstimatorWizard() {
  const [step, setStep] = useState(1);
  const [homeSizeId, setHomeSizeId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [lead, setLead] = useState({
    name: "",
    email: "",
    zip: "",
    phone: "",
  });

  const estimate = useMemo(
    () => (homeSizeId ? ESTIMATE_BY_SIZE[homeSizeId] : null),
    [homeSizeId],
  );

  const canGoNextFromStep1 = !!homeSizeId;

  const canSubmit =
    lead.name.trim().length >= 2 &&
    isValidEmail(lead.email) &&
    isValidZip(lead.zip);

  const onLeadChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || !homeSizeId || submitting) return;

    try {
      setSubmitting(true);
      await submitEstimatorLead({
        type: "home_maintenance_estimator",
        timestamp: new Date().toISOString(),
        home_size:
          HOME_SIZE_OPTIONS.find((x) => x.id === homeSizeId)?.label ||
          homeSizeId,
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });

      setSubmitted(true);
      toast({
        title: "Submitted",
        description:
          "Thanks. Your estimate is ready below, and we will follow up shortly.",
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: err?.message || "Please try again or call (541) 321-5115.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-maroon">Estimator</p>
            <h2 className="text-2xl font-bold text-contractor-black">
              Get Your Estimate in 2 Steps
            </h2>
          </div>
          <div className="text-xs text-gray-500">
            Step <span className="font-semibold text-gray-700">{step}</span> of
            2
          </div>
        </div>
      </div>

      <div className="p-6">
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-contractor-black mb-2">
              What is the size of your home?
            </h3>
            <p className="text-gray-600 mb-6">
              Choose the approximate size of your home.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {HOME_SIZE_OPTIONS.map((opt) => {
                const selected = homeSizeId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setHomeSizeId(opt.id)}
                    className={`text-left border rounded-lg p-5 transition-all bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-maroon ${
                      selected ? "border-maroon" : "border-gray-200"
                    }`}
                    aria-pressed={selected}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-contractor-black">
                          {opt.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Select</div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                          selected ? "border-maroon" : "border-gray-300"
                        }`}
                      >
                        {selected ? (
                          <div className="w-3 h-3 rounded-full bg-maroon" />
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setStep(2)}
                disabled={!canGoNextFromStep1}
                className="bg-maroon hover:bg-red-700 text-white font-bold"
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-contractor-black mb-2">
              Almost there! See your results instantly
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your information to view your estimate. We will also send a
              confirmation to your email.
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={lead.name}
                    onChange={onLeadChange}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={lead.email}
                    onChange={onLeadChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP (required)</Label>
                  <Input
                    id="zip"
                    name="zip"
                    value={lead.zip}
                    onChange={onLeadChange}
                    placeholder="e.g. 97386"
                    required
                  />
                  {lead.zip && !isValidZip(lead.zip) ? (
                    <p className="text-xs text-red-600">
                      Enter a valid 5-digit ZIP (or ZIP+4).
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={lead.phone}
                    onChange={onLeadChange}
                    placeholder="(541) 555-0123"
                  />
                </div>
              </div>

              {!isValidEmail(lead.email) && lead.email ? (
                <p className="text-xs text-red-600">
                  Enter a valid email address.
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                <Button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="bg-maroon hover:bg-red-700 text-white font-bold min-w-[180px]"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting
                    </span>
                  ) : (
                    "See Your Estimate"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8">
              {!submitted ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                  <p className="text-sm text-gray-700 m-0">
                    Your estimate will appear here after you submit.
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-100 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-700 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-green-900 m-0">
                        Estimate Ready
                      </p>
                      <p className="text-sm text-green-900/90 mt-1">
                        Home size:{" "}
                        <span className="font-semibold">
                          {
                            HOME_SIZE_OPTIONS.find((x) => x.id === homeSizeId)
                              ?.label
                          }
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white rounded-md border border-green-100 p-5">
                    <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
                      {estimate?.headline || "Estimate"}
                    </p>
                    <p className="text-3xl font-bold text-contractor-black mt-2 mb-0">
                      {estimate?.range || "Call for pricing"}
                    </p>
                    <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-1">
                      {(estimate?.notes || []).map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-4 mb-0">
                      For a firm quote, call (541) 321-5115 or request a site
                      visit.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
