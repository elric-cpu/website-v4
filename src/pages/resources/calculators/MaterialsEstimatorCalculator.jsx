import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layers, Paintbrush } from "lucide-react";
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
import { MATERIAL_MODELS } from "@/lib/calculators/costModels";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const MaterialsEstimatorCalculator = () => {
  const [zip, setZip] = useState("");
  const [projectType, setProjectType] = useState("paint");
  const [squareFeet, setSquareFeet] = useState(1200);
  const [quality, setQuality] = useState("standard");
  const [wastePercent, setWastePercent] = useState(10);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);
  const model = MATERIAL_MODELS[projectType];

  const results = useMemo(() => {
    const area =
      toNumber(squareFeet, 0) * (1 + toNumber(wastePercent, 0) / 100);
    const costPerUnit =
      model.costPerUnit[quality] || model.costPerUnit.standard;
    let quantity = 0;
    let unitLabel = model.unit;

    if (projectType === "paint") {
      const gallons = (area / model.coverageSqFt) * model.coats;
      quantity = gallons;
      unitLabel = "gallons";
    } else if (projectType === "drywall") {
      const sheets = area / model.sheetSqFt;
      quantity = sheets;
      unitLabel = "sheets";
    } else {
      quantity = area;
      unitLabel = "sq ft";
    }

    const materialCost = quantity * costPerUnit * localization.costFactor;
    return {
      area,
      quantity,
      unitLabel,
      materialCost,
    };
  }, [
    squareFeet,
    wastePercent,
    quality,
    projectType,
    localization.costFactor,
    model,
  ]);

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
        type: "materials_estimator",
        timestamp: new Date().toISOString(),
        zip,
        project_type: projectType,
        square_feet: toNumber(squareFeet, 0),
        quality,
        waste_percent: toNumber(wastePercent, 0),
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "Estimate unlocked",
        description: "Your materials estimate is on the way.",
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
      question: "Does this include labor?",
      answer:
        "This estimate covers materials only. Labor pricing depends on site conditions and scope.",
    },
    {
      question: "Why add a waste factor?",
      answer:
        "Waste accounts for cuts, damaged pieces, and future patching. It helps avoid running short mid-project.",
    },
    {
      question: "How accurate are paint gallons?",
      answer:
        "We assume 350 sq ft per gallon per coat. Actual coverage varies by surface texture and paint quality.",
    },
    {
      question: "Do you include primer or underlayment?",
      answer:
        "Not by default. Add extra material if your project requires primer, underlayment, or special prep.",
    },
    {
      question: "What if my project has multiple rooms?",
      answer:
        "Combine the total square footage of all rooms for a quick estimate.",
    },
    {
      question: "How do ZIP factors change material costs?",
      answer:
        "We adjust for local labor and supply pricing differences to reflect real Oregon market conditions.",
    },
    {
      question: "Can I get a professional takeoff?",
      answer:
        "Yes. Submit your details and we will follow up with a detailed takeoff and labor estimate.",
    },
    {
      question: "What is the next step after the estimate?",
      answer:
        "We can schedule a walkthrough and provide a firm, line-item proposal.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  const nextSteps = [
    {
      label: "Inspection repairs",
      to: SERVICE_PILLAR_LINKS.inspection.to,
      description: "Punch lists, pre-sale repairs, and scope planning.",
      intent: "service",
    },
    {
      label: "Request a walkthrough",
      to: "/contact",
      description: "Get a line-item scope and schedule.",
      intent: "contact",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Prevent repeat repairs and track history.",
      intent: "subscribe",
    },
    {
      label: "Tools hub",
      to: TOOLS_HUB_LINK.to,
      description: "More calculators and planning tools.",
      intent: "estimate",
    },
  ];

  return (
    <CalculatorLayout
      seo={{
        title: "Material / Project Estimator | Benson Home Solutions",
        description:
          "Estimate material quantities and ZIP-adjusted costs for paint, drywall, and flooring projects.",
        keywords:
          "materials estimator, project cost estimate Oregon, paint quantity calculator, drywall estimate, flooring cost estimate",
        schema: faqSchema,
      }}
      badge="Project Planning"
      title="Material / Project Estimator"
      subtitle="DIY-friendly material estimates in minutes."
      description="Estimate quantities, apply a waste factor, and get ZIP-adjusted material costs."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full takeoff"
          subtitle="Receive a PDF material list and optional labor add-on."
          benefits={[
            "Detailed material list",
            "ZIP-adjusted cost range",
            "Optional labor pricing",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My Materials List"
          successMessage="Estimate sent. We will follow up with next steps."
        />
      }
    >
      <p className="text-sm text-restoration-gray">
        For scope planning, combine this with{" "}
        <Link
          to={SERVICE_PILLAR_LINKS.inspection.to}
          className="text-maroon font-semibold"
        >
          inspection repairs
        </Link>{" "}
        or a{" "}
        <Link
          to={MAINTENANCE_LINKS.home.to}
          className="text-maroon font-semibold"
        >
          home maintenance program
        </Link>
        .
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
            <Label htmlFor="project">Project type</Label>
            <select
              id="project"
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              {Object.entries(MATERIAL_MODELS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sqft">Square footage</Label>
            <Input
              id="sqft"
              type="number"
              min="0"
              value={squareFeet}
              onChange={(event) => setSquareFeet(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quality">Quality tier</Label>
            <select
              id="quality"
              value={quality}
              onChange={(event) => setQuality(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <option value="budget">Budget</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="waste">Waste factor (%)</Label>
            <Input
              id="waste"
              type="number"
              min="0"
              max="25"
              value={wastePercent}
              onChange={(event) => setWastePercent(event.target.value)}
            />
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
            Material quantity
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatNumber(results.quantity, 1)} {results.unitLabel}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Coverage area: {formatNumber(results.area, 0)} sq ft
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Material cost estimate
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.materialCost)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Based on {quality} tier materials
          </p>
        </div>
      </div>

      <ResultsLock locked={!submitted} message="Detailed takeoff locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Detailed materials list
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Included in report
              </p>
              <ul className="space-y-1">
                <li>Line-item material quantities</li>
                <li>Recommended brands + grades</li>
                <li>Waste and contingency notes</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Optional add-ons
              </p>
              <ul className="space-y-1">
                <li>Labor estimate</li>
                <li>Prep + demolition</li>
                <li>Disposal and cleanup</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Paintbrush className="w-4 h-4 text-maroon" />
              Surface prep can change coverage rates—expect adjustments onsite.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Quick-turn rental refresh
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A 1,100 sq ft rental used the estimator to plan paint + flooring. The
          project finished on time with 8% unused materials.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: faster turnover and controlled budget.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[0],
          TOP_TOOL_LINKS[2],
          TOP_TOOL_LINKS[4],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Estimate materials, repair scope, and timelines."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default MaterialsEstimatorCalculator;
