import React, { useEffect, useMemo, useState } from "react";
import { Timer, TrendingUp } from "lucide-react";
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
import {
  formatCurrency,
  formatNumber,
  toNumber,
} from "@/lib/calculators/utils";
import { ASSET_MODELS } from "@/lib/calculators/costModels";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const AssetLifecycleCalculator = () => {
  const [zip, setZip] = useState("");
  const [assetType, setAssetType] = useState("hvac");
  const [assetAge, setAssetAge] = useState(10);
  const [annualPmSpend, setAnnualPmSpend] = useState(2400);
  const [replacementCost, setReplacementCost] = useState(12000);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);
  const model = ASSET_MODELS[assetType];

  useEffect(() => {
    setReplacementCost(model.baseReplacement);
    setAnnualPmSpend(
      Math.round(model.baseReplacement * model.recommendedPmRate),
    );
  }, [model]);

  const results = useMemo(() => {
    const replacement =
      toNumber(replacementCost, model.baseReplacement) *
      localization.costFactor;
    const recommendedSpend = replacement * model.recommendedPmRate;
    const pmSpend = toNumber(annualPmSpend, 0);
    const age = toNumber(assetAge, 0);
    const ratio = recommendedSpend > 0 ? pmSpend / recommendedSpend : 0;
    const extensionFactor = Math.min(0.1 + ratio * 0.2, 0.4);
    const extendedLife = model.expectedLife * (1 + extensionFactor);
    const addedYears = extendedLife - model.expectedLife;
    const deferredCapex = (replacement / model.expectedLife) * addedYears;
    const remainingLife = Math.max(model.expectedLife - age, 0);
    const extendedRemaining = Math.max(extendedLife - age, 0);

    return {
      replacement,
      recommendedSpend,
      extendedLife,
      addedYears,
      deferredCapex,
      remainingLife,
      extendedRemaining,
    };
  }, [
    replacementCost,
    annualPmSpend,
    assetAge,
    localization.costFactor,
    model,
  ]);

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Review agreements",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Compare home plans",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Plan repairs",
    },
    {
      label: "request a walkthrough",
      to: "/contact",
      description: "Schedule an on-site assessment and scope review.",
      intent: "contact",
      cta: "Request service",
    },
  ];

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
        type: "asset_lifecycle_extension",
        timestamp: new Date().toISOString(),
        zip,
        asset_type: assetType,
        asset_age: toNumber(assetAge, 0),
        annual_pm_spend: toNumber(annualPmSpend, 0),
        replacement_cost: toNumber(replacementCost, 0),
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "Lifecycle report unlocked",
        description: "Your lifecycle extension report is on the way.",
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
      question: "How does preventive maintenance extend lifespan?",
      answer:
        "Consistent inspections and minor repairs reduce wear, prevent catastrophic failures, and keep efficiency higher over time.",
    },
    {
      question: "What is the recommended annual PM spend?",
      answer:
        "We base it on a percentage of replacement cost. High-value assets usually need 1.5%-3% per year.",
    },
    {
      question: "Can I use my actual replacement cost?",
      answer:
        "Yes. Replace the default value to get the most accurate deferral calculation.",
    },
    {
      question: "Does ZIP impact replacement cost?",
      answer:
        "Yes. We apply a local cost factor to account for regional labor and material pricing.",
    },
    {
      question: "What if the asset is already past its expected life?",
      answer:
        "Enter the current age. The tool will show how PM can still reduce risk while you plan replacement.",
    },
    {
      question: "Are roofs and generators included?",
      answer:
        "Yes. Choose the asset type and adjust replacement cost if needed.",
    },
    {
      question: "Is this a guarantee of extra years?",
      answer:
        "No. It is a planning estimate. Actual lifespan depends on usage, climate, and maintenance quality.",
    },
    {
      question: "What should I do after seeing this report?",
      answer:
        "Schedule an asset condition assessment to confirm remaining life and set a replacement timeline.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  return (
    <CalculatorLayout
      seo={{
        title: "Asset Lifecycle Extension Tool | Benson Home Solutions",
        description:
          "Estimate how preventive maintenance extends asset life and defers capital replacement with ZIP-adjusted pricing.",
        keywords:
          "asset lifecycle calculator, equipment life extension, preventive maintenance planning, capital replacement timeline, facilities maintenance budgeting",
        schema: faqSchema,
      }}
      badge="ROI & Compliance"
      title="Asset Lifecycle Extension Tool"
      subtitle="Delay capital replacement with smart maintenance."
      description="See how preventive spend extends asset life and defers big replacement costs."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full lifecycle report"
          subtitle="Receive a PDF with replacement timing and maintenance recommendations."
          benefits={[
            "Lifecycle extension summary",
            "Replacement timing checklist",
            "Budget deferral analysis",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My Lifecycle Report"
          successMessage="Report sent. We will follow up with next steps."
        />
      }
    >
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
            <Label htmlFor="asset">Asset type</Label>
            <select
              id="asset"
              value={assetType}
              onChange={(event) => setAssetType(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              {Object.entries(ASSET_MODELS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Current asset age (years)</Label>
            <Input
              id="age"
              type="number"
              min="0"
              value={assetAge}
              onChange={(event) => setAssetAge(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pm">Annual preventive spend</Label>
            <Input
              id="pm"
              type="number"
              min="0"
              value={annualPmSpend}
              onChange={(event) => setAnnualPmSpend(event.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="replacement">Replacement cost</Label>
            <Input
              id="replacement"
              type="number"
              min="0"
              value={replacementCost}
              onChange={(event) => setReplacementCost(event.target.value)}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0">
          ZIP-adjusted factor: {localization.costFactor.toFixed(3)}x ·{" "}
          {localization.regionLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Replacement cost (local)
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.replacement)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Recommended PM: {formatCurrency(results.recommendedSpend)} / yr
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Extended life
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatNumber(results.extendedLife, 1)} yrs
          </p>
          <p className="text-xs text-gray-500 m-0">
            Remaining: {formatNumber(results.remainingLife, 1)} yrs →{" "}
            {formatNumber(results.extendedRemaining, 1)} yrs
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Deferred capex
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.deferredCapex)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Budget relief from lifecycle extension
          </p>
        </div>
      </div>

      <ResultsLock
        locked={!submitted}
        message="Detailed lifecycle report locked"
      >
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Lifecycle timeline
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Included in report
              </p>
              <ul className="space-y-1">
                <li>Condition rating checklist</li>
                <li>Preventive task cadence</li>
                <li>Replacement timing scenarios</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Recommended actions
              </p>
              <ul className="space-y-1">
                <li>Schedule asset inspection</li>
                <li>Budget for staged replacement</li>
                <li>Track performance metrics</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-maroon" />
              Preventive spend can delay major capital outlays by years.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Roof maintenance plan
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A warehouse invested in annual roof inspections and minor repairs.
          Roof replacement was delayed by 4.5 years.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: deferred capital spend and fewer leak-related disruptions.
        </p>
      </div>

      <NextStepsBlock
        links={nextSteps}
        subtitle="Translate lifecycle insight into a documented maintenance or repair plan."
      />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[1],
          TOP_TOOL_LINKS[0],
          TOP_TOOL_LINKS[4],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Estimate, compare, and map the next 12-24 months."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default AssetLifecycleCalculator;
