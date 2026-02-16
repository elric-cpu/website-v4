import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { submitCommercialAgreementLead } from "@/lib/commercialAgreements/submitCommercialAgreementLead";

const STEP_TITLES = ["Company", "Property", "Coverage", "Submit"];

function required(value) {
  return String(value || "").trim().length > 0;
}

export default function CommercialAgreementFunnel() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    propertyAddress: "",
    propertyType: "",
    approxSqFt: "",
    locationsCount: "1",
    desiredStart: "",
    agreementTerm: "12",
    responseTier: "standard",
    visitCadence: "quarterly",
    coverage: {
      tenantTurns: true,
      preventive: true,
      emergency: true,
      ada: false,
    },
    notes: "",
  });

  const progressPct = useMemo(
    () => Math.round(((step + 1) / STEP_TITLES.length) * 100),
    [step],
  );

  const canContinue = useMemo(() => {
    if (step === 0) {
      return (
        required(form.companyName) &&
        required(form.contactName) &&
        required(form.contactEmail)
      );
    }
    if (step === 1) {
      return required(form.propertyAddress) && required(form.propertyType);
    }
    if (step === 2) {
      return (
        required(form.agreementTerm) &&
        required(form.responseTier) &&
        required(form.visitCadence)
      );
    }
    return true;
  }, [form, step]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateCoverage(key, value) {
    setForm((prev) => ({
      ...prev,
      coverage: { ...prev.coverage, [key]: value },
    }));
  }

  function next() {
    if (!canContinue) return;
    setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    setIsSubmitting(true);
    try {
      const payload = {
        leadType: "commercial_service_agreement",
        capturedAt: new Date().toISOString(),
        ...form,
      };

      await submitCommercialAgreementLead(payload);
      toast({
        title: "Request received",
        description:
          "We will review your details and follow up with next steps.",
      });
      setStep(STEP_TITLES.length - 1);
    } catch (e) {
      toast({
        title: "Submission failed",
        description: e?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-restoration-gray">Contract funnel</p>
          <h3 className="text-xl font-bold text-contractor-black">
            Commercial Service Agreement
          </h3>
        </div>
        <div className="text-sm text-restoration-gray">
          Step {step + 1} of {STEP_TITLES.length}
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-gray-100 rounded">
          <div
            className="h-2 bg-maroon rounded"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {STEP_TITLES.map((t, i) => (
            <div
              key={t}
              className={`px-3 py-1 rounded-full text-xs border ${i === step ? "border-maroon text-maroon" : "border-gray-200 text-restoration-gray"}`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="companyName">Company / Organization *</Label>
            <Input
              id="companyName"
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Property Management LLC"
            />
          </div>
          <div>
            <Label htmlFor="contactName">Primary Contact *</Label>
            <Input
              id="contactName"
              value={form.contactName}
              onChange={(e) => updateField("contactName", e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Email *</Label>
            <Input
              id="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={(e) => updateField("contactEmail", e.target.value)}
              placeholder="name@company.com"
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <Input
              id="contactPhone"
              value={form.contactPhone}
              onChange={(e) => updateField("contactPhone", e.target.value)}
              placeholder="(541) 000-0000"
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label htmlFor="propertyAddress">Primary Property Address *</Label>
            <Input
              id="propertyAddress"
              value={form.propertyAddress}
              onChange={(e) => updateField("propertyAddress", e.target.value)}
              placeholder="Street, City, OR"
            />
          </div>
          <div>
            <Label htmlFor="propertyType">Property Type *</Label>
            <Input
              id="propertyType"
              value={form.propertyType}
              onChange={(e) => updateField("propertyType", e.target.value)}
              placeholder="Medical office, church, warehouse..."
            />
          </div>
          <div>
            <Label htmlFor="approxSqFt">Approx. Sq Ft</Label>
            <Input
              id="approxSqFt"
              value={form.approxSqFt}
              onChange={(e) => updateField("approxSqFt", e.target.value)}
              placeholder="e.g., 12000"
            />
          </div>
          <div>
            <Label htmlFor="locationsCount"># of Locations</Label>
            <Input
              id="locationsCount"
              value={form.locationsCount}
              onChange={(e) => updateField("locationsCount", e.target.value)}
              placeholder="1"
            />
          </div>
          <div>
            <Label htmlFor="desiredStart">Desired Start</Label>
            <Input
              id="desiredStart"
              value={form.desiredStart}
              onChange={(e) => updateField("desiredStart", e.target.value)}
              placeholder="This month / next month"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="agreementTerm">Agreement Term (months) *</Label>
              <Input
                id="agreementTerm"
                value={form.agreementTerm}
                onChange={(e) => updateField("agreementTerm", e.target.value)}
                placeholder="12"
              />
            </div>
            <div>
              <Label htmlFor="responseTier">Response Tier *</Label>
              <select
                id="responseTier"
                className="mt-2 w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
                value={form.responseTier}
                onChange={(e) => updateField("responseTier", e.target.value)}
              >
                <option value="standard">Standard (business hours)</option>
                <option value="priority">Priority (faster response)</option>
                <option value="24-7">24/7 Emergency Priority</option>
              </select>
            </div>
            <div>
              <Label htmlFor="visitCadence">Walkthrough Cadence *</Label>
              <select
                id="visitCadence"
                className="mt-2 w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
                value={form.visitCadence}
                onChange={(e) => updateField("visitCadence", e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="semiannual">Semi-Annual</option>
              </select>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-5">
            <p className="font-semibold text-contractor-black">Coverage</p>
            <p className="text-sm text-restoration-gray mt-1">
              Select the workstreams you want included in the agreement.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.coverage.tenantTurns}
                  onChange={(e) =>
                    updateCoverage("tenantTurns", e.target.checked)
                  }
                />
                <span>
                  <span className="font-medium text-contractor-black">
                    Tenant turns
                  </span>
                  <span className="block text-sm text-restoration-gray">
                    Punch lists + turnover repairs.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.coverage.preventive}
                  onChange={(e) =>
                    updateCoverage("preventive", e.target.checked)
                  }
                />
                <span>
                  <span className="font-medium text-contractor-black">
                    Preventive maintenance
                  </span>
                  <span className="block text-sm text-restoration-gray">
                    Scheduled walkthroughs + small fixes.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.coverage.emergency}
                  onChange={(e) =>
                    updateCoverage("emergency", e.target.checked)
                  }
                />
                <span>
                  <span className="font-medium text-contractor-black">
                    Emergency repairs
                  </span>
                  <span className="block text-sm text-restoration-gray">
                    Priority response for urgent issues.
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.coverage.ada}
                  onChange={(e) => updateCoverage("ada", e.target.checked)}
                />
                <span>
                  <span className="font-medium text-contractor-black">
                    ADA compliance fixes
                  </span>
                  <span className="block text-sm text-restoration-gray">
                    Targeted accessibility modifications.
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes / Constraints</Label>
            <textarea
              id="notes"
              className="mt-2 w-full min-h-[110px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Access hours, special security rules, preferred billing terms, etc."
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-cream border border-gray-200 rounded-lg p-5">
            <CheckCircle className="w-6 h-6 text-maroon" />
            <div className="text-left">
              <p className="font-semibold text-contractor-black">
                Next step: we confirm the scope and send an agreement packet.
              </p>
              <p className="text-sm text-restoration-gray">
                If you selected Priority/24-7, we will confirm response SLA and
                after-hours rules.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              className="border-maroon text-maroon hover:bg-maroon hover:text-white"
              onClick={() => setStep(0)}
            >
              Start Another Request
            </Button>
            <a href="/contact" className="inline-flex">
              <Button className="bg-maroon hover:bg-opacity-90 text-white">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={back}
          disabled={step === 0 || isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {step < 2 && (
          <Button
            onClick={next}
            disabled={!canContinue || isSubmitting}
            className="bg-maroon hover:bg-opacity-90 text-white"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {step === 2 && (
          <Button
            onClick={submit}
            disabled={!canContinue || isSubmitting}
            className="bg-maroon hover:bg-opacity-90 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}

        {step === 3 && <div />}
      </div>

      {!canContinue && step !== 3 && (
        <p className="mt-3 text-sm text-red-600">
          Please complete the required fields (*) to continue.
        </p>
      )}
    </div>
  );
}
