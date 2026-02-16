import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import LeadCaptureCard from "@/components/calculators/LeadCaptureCard";
import ResultsLock from "@/components/calculators/ResultsLock";
import FaqSection from "@/components/faq/FaqSection";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import { useZipLocalization } from "@/lib/zipLocalization/useZipLocalization";
import { buildFaqSchema } from "@/lib/seo/faqSchema";
import { formatCurrency, toNumber } from "@/lib/calculators/utils";
import { REPAIR_COSTS } from "@/lib/calculators/costModels";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const scopeBySystem = {
  ac: [
    "Diagnostics + refrigerant check",
    "Capacitor/contactors",
    "Airflow and filter review",
  ],
  furnace: [
    "Ignition + safety switch check",
    "Blower and heat exchanger inspection",
    "Filter + airflow review",
  ],
  plumbing: [
    "Leak isolation + repair",
    "Fixture or valve replacement",
    "Moisture and damage inspection",
  ],
  electrical: [
    "Circuit diagnostics",
    "Panel and breaker review",
    "Safety and code compliance check",
  ],
};

const InstantRepairCostCalculator = () => {
  const [zip, setZip] = useState("");
  const [systemType, setSystemType] = useState("ac");
  const [severity, setSeverity] = useState("standard");
  const [afterHours, setAfterHours] = useState(false);
  const [systemAge, setSystemAge] = useState(10);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);

  const results = useMemo(() => {
    const base =
      REPAIR_COSTS[systemType]?.[severity] || REPAIR_COSTS.ac.standard;
    const age = toNumber(systemAge, 0);
    const ageFactor = age >= 15 ? 1.1 : 1;
    const afterHoursFactor = afterHours ? 1.25 : 1;
    const min =
      base.min * localization.costFactor * ageFactor * afterHoursFactor;
    const max =
      base.max * localization.costFactor * ageFactor * afterHoursFactor;

    return { min, max };
  }, [systemType, severity, afterHours, systemAge, localization.costFactor]);

  const canSubmit =
    lead.name.trim().length >= 2 && isEmail(lead.email) && isZip(zip || "");

  const onLeadChange = (event) => {
    const { name, value } = event.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || submitting) return;

    try {
      setSubmitting(true);
      await submitCalculatorLead({
        type: "instant_repair_cost",
        timestamp: new Date().toISOString(),
        zip,
        system_type: systemType,
        severity,
        after_hours: afterHours,
        system_age: toNumber(systemAge, 0),
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "Estimate unlocked",
        description: "Your detailed repair estimate is on the way.",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description:
          error?.message || "Please try again or call (541) 321-5115.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "Is this a firm quote?",
      answer:
        "No. This is a ZIP-adjusted estimate for planning. A technician will confirm pricing after diagnosis and scope review.",
    },
    {
      question: "What counts as after-hours?",
      answer:
        "Evenings, weekends, or holidays that require expedited dispatch or overtime staffing.",
    },
    {
      question: "Why does system age affect cost?",
      answer:
        "Older systems often need extra diagnostics, parts sourcing, or temporary stabilization, which increases labor.",
    },
    {
      question: "Can you repair or replace the same day?",
      answer:
        "Many minor and standard repairs can be handled same day if parts are available. Major repairs may require ordering components.",
    },
    {
      question: "Do you service commercial equipment too?",
      answer:
        "Yes. Select the system type and note your building details when we follow up so we can send the right technician.",
    },
    {
      question: "What if I need multiple systems serviced?",
      answer:
        "Submit one estimate to start. We will consolidate pricing once we know all affected systems.",
    },
    {
      question: "Does the estimate include diagnostic fees?",
      answer:
        "The ranges include typical diagnostics. Complex troubleshooting may adjust the final total.",
    },
    {
      question: "How do I reduce emergency costs?",
      answer:
        "Preventive maintenance, filter changes, and seasonal inspections reduce emergency callouts and after-hours rates.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  const nextSteps = [
    {
      label: "Request service for repairs",
      to: "/contact",
      description: "Share your issue and get a response window.",
      intent: "contact",
    },
    {
      label: "Fix inspection items",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Punch lists and priority repairs with clear scopes.",
      intent: "service",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Reduce after-hours repairs with scheduled care.",
      intent: "subscribe",
    },
    {
      label: "Commercial maintenance program",
      to: MAINTENANCE_LINKS.commercial.to,
      description: "Preventive maintenance for small facilities.",
      intent: "subscribe",
    },
  ];

  return (
    <CalculatorLayout
      seo={{
        title: "Instant Repair Cost Calculator | Benson Home Solutions",
        description:
          "Estimate HVAC, plumbing, or electrical repair costs with ZIP-based pricing and urgency factors.",
        keywords:
          "instant repair cost calculator, HVAC repair estimate Oregon, plumbing repair cost estimate, electrical repair cost Oregon, emergency repair pricing",
        schema: faqSchema,
      }}
      badge="Emergency & Repairs"
      title="Instant Repair Cost Calculator"
      subtitle="Get a fast repair range before you call."
      description="Select system type, severity, and urgency to see a ZIP-adjusted range."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full repair estimate"
          subtitle="Receive a PDF scope summary and dispatch checklist."
          benefits={[
            "ZIP-adjusted price range",
            "Emergency response tips",
            "Next-step scheduling guide",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My Repair Estimate"
          successMessage="Estimate sent. A coordinator will follow up."
        />
      }
    >
      <p className="text-sm text-restoration-gray">
        Looking for ongoing support? Our{" "}
        <Link
          to={MAINTENANCE_LINKS.home.to}
          className="text-maroon font-semibold"
        >
          home maintenance program
        </Link>{" "}
        and{" "}
        <Link
          to={MAINTENANCE_LINKS.commercial.to}
          className="text-maroon font-semibold"
        >
          commercial maintenance program
        </Link>{" "}
        reduce emergency repairs.
      </p>

      <div className="bg-cream border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP code</Label>
            <Input
              id="zip"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              placeholder="e.g. 97386"
            />
            {zip && !isZip(zip) ? (
              <p className="text-xs text-red-600">
                Enter a valid 5-digit ZIP (or ZIP+4).
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="system">System type</Label>
            <select
              id="system"
              value={systemType}
              onChange={(event) => setSystemType(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              {Object.entries(REPAIR_COSTS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <select
              id="severity"
              value={severity}
              onChange={(event) => setSeverity(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <option value="minor">Minor</option>
              <option value="standard">Standard</option>
              <option value="major">Major</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">System age (years)</Label>
            <Input
              id="age"
              type="number"
              min="0"
              value={systemAge}
              onChange={(event) => setSystemAge(event.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              id="after-hours"
              type="checkbox"
              checked={afterHours}
              onChange={(event) => setAfterHours(event.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="after-hours">After-hours or emergency call</Label>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0">
          ZIP-adjusted factor: {localization.costFactor.toFixed(3)}x ·{" "}
          {localization.regionLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Estimated range
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.min)} - {formatCurrency(results.max)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Adjusted for urgency and system age.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Typical scope
          </p>
          <ul className="text-sm text-restoration-gray mt-2 space-y-1">
            {scopeBySystem[systemType].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <ResultsLock locked={!submitted} message="Detailed repair report locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Full scope checklist
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Included in estimate
              </p>
              <ul className="space-y-1">
                <li>Diagnostics + on-site assessment</li>
                <li>ZIP-adjusted labor + materials</li>
                <li>Urgency and access notes</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Next-step checklist
              </p>
              <ul className="space-y-1">
                <li>Schedule arrival window</li>
                <li>Review replacement options</li>
                <li>Preventive maintenance plan</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertTriangle className="w-4 h-4 text-maroon" />
              If you smell gas, see sparks, or have active leaks, call
              immediately.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: After-hours HVAC fix
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A Salem retail shop called after hours for a failed AC compressor. A
          temporary fix kept the store open until parts arrived.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: avoided a two-day shutdown and protected perishable inventory.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[0],
          TOP_TOOL_LINKS[1],
          TOP_TOOL_LINKS[4],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Estimate, compare, and plan your next steps."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default InstantRepairCostCalculator;
