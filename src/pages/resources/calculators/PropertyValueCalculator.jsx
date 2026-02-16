import React, { useEffect, useMemo, useState } from "react";
import { Home, Building2 } from "lucide-react";
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
import { PROPERTY_UPGRADES } from "@/lib/calculators/costModels";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const PropertyValueCalculator = () => {
  const [zip, setZip] = useState("");
  const [units, setUnits] = useState(4);
  const [currentRent, setCurrentRent] = useState(1350);
  const [upgradeType, setUpgradeType] = useState("paint");
  const [projectCost, setProjectCost] = useState(4000);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);

  useEffect(() => {
    const upgrade = PROPERTY_UPGRADES[upgradeType];
    if (upgrade) {
      setProjectCost(upgrade.cost);
    }
  }, [upgradeType]);

  const results = useMemo(() => {
    const unitCount = toNumber(units, 0);
    const rent = toNumber(currentRent, 0);
    const upgrade = PROPERTY_UPGRADES[upgradeType] || PROPERTY_UPGRADES.paint;
    const cost = toNumber(projectCost, 0) * localization.costFactor;
    const monthlyLift = unitCount * rent * upgrade.rentLift;
    const annualLift = monthlyLift * 12;
    const capRate = 0.06;
    const valueIncrease = capRate > 0 ? annualLift / capRate : 0;
    const roi = cost > 0 ? (annualLift / cost) * 100 : 0;
    const payback = annualLift > 0 ? cost / annualLift : null;

    return {
      cost,
      monthlyLift,
      annualLift,
      valueIncrease,
      roi,
      payback,
    };
  }, [units, currentRent, upgradeType, projectCost, localization.costFactor]);

  const nextSteps = [
    {
      label: "inspection repairs",
      to: "/inspection-repairs",
      description:
        "Close inspection items that affect appraisals and tenant safety.",
      intent: "service",
      cta: "Fix inspection items",
    },
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Protect NOI",
    },
    {
      label: "energy comfort retrofits",
      to: "/energy-comfort-retrofits",
      description: "Targeted upgrades that improve rent lift and occupancy.",
      intent: "service",
      cta: "Explore retrofits",
    },
    {
      label: "request a scope review",
      to: "/contact",
      description: "Get a line-item scope and sequencing plan.",
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
        type: "property_value_rent",
        timestamp: new Date().toISOString(),
        zip,
        units: toNumber(units, 0),
        current_rent: toNumber(currentRent, 0),
        upgrade_type: upgradeType,
        project_cost: toNumber(projectCost, 0),
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "Value report unlocked",
        description: "Your rent and value lift report is on the way.",
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
      question: "How do you estimate rent increases?",
      answer:
        "We use typical lift ranges by upgrade type and apply them to your current rent. Adjust inputs to match your local market.",
    },
    {
      question: "What is the cap rate used for value estimates?",
      answer:
        "We use a 6% cap rate for planning. If your market cap rate differs, adjust the results accordingly.",
    },
    {
      question: "Does this work for single-family rentals?",
      answer:
        "Yes. Set units to 1 and enter the current rent to estimate value lift.",
    },
    {
      question: "What if I plan multiple upgrades?",
      answer:
        "Run the calculator for each upgrade and stack the costs and lift to compare scenarios.",
    },
    {
      question: "Why include ZIP-based costs?",
      answer:
        "Local pricing varies for labor and materials. The ZIP factor makes project cost estimates more realistic.",
    },
    {
      question: "Does this include vacancy reduction?",
      answer:
        "No. If upgrades reduce vacancy, your actual ROI could be higher.",
    },
    {
      question: "Can you help scope the upgrade?",
      answer:
        "Yes. Submit the report and we will follow up with a detailed scope and budget.",
    },
    {
      question: "What is included in the full report?",
      answer:
        "A PDF with rent lift scenarios, value impact, and recommended upgrade sequencing.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  return (
    <CalculatorLayout
      seo={{
        title:
          "Property Value & Rental Increase Calculator | Benson Home Solutions",
        description:
          "Estimate rent lift and property value gains from cosmetic and amenity upgrades with ZIP-adjusted costs.",
        keywords:
          "property value calculator, rental increase estimate, renovation ROI, upgrade value lift, rent lift calculator Oregon",
        schema: faqSchema,
      }}
      badge="ROI & Compliance"
      title="Property Value / Rental Increase Calculator"
      subtitle="Quantify rent lift and property value gains."
      description="Estimate how upgrades increase rental income and property value with ZIP-adjusted project costs."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full value report"
          subtitle="Receive a PDF with rent lift scenarios and ROI details."
          benefits={[
            "Rent lift projections",
            "Value increase estimate",
            "Upgrade sequencing plan",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My Value Report"
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
            <Label htmlFor="units">Number of units</Label>
            <Input
              id="units"
              type="number"
              min="1"
              value={units}
              onChange={(event) => setUnits(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rent">Current rent per unit</Label>
            <Input
              id="rent"
              type="number"
              min="0"
              value={currentRent}
              onChange={(event) => setCurrentRent(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upgrade">Upgrade type</Label>
            <select
              id="upgrade"
              value={upgradeType}
              onChange={(event) => setUpgradeType(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              {Object.entries(PROPERTY_UPGRADES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="cost">Project cost</Label>
            <Input
              id="cost"
              type="number"
              min="0"
              value={projectCost}
              onChange={(event) => setProjectCost(event.target.value)}
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
            Project cost (local)
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.cost)}
          </p>
          <p className="text-xs text-gray-500 m-0">Adjusted for ZIP pricing</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Annual rent lift
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.annualLift)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Monthly: {formatCurrency(results.monthlyLift)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Value increase
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.valueIncrease)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Payback:{" "}
            {results.payback
              ? `${formatNumber(results.payback, 1)} yrs`
              : "N/A"}
          </p>
        </div>
      </div>

      <ResultsLock locked={!submitted} message="Detailed value report locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Rent lift scenario planning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Included in report
              </p>
              <ul className="space-y-1">
                <li>Rent lift tiers by upgrade</li>
                <li>Value impact by cap rate</li>
                <li>Upgrade sequencing plan</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Recommended actions
              </p>
              <ul className="space-y-1">
                <li>Prioritize high-visibility upgrades</li>
                <li>Bundle projects for cost savings</li>
                <li>Market refresh strategy</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="w-4 h-4 text-maroon" />
              Higher rents often improve tenant quality and reduce vacancy.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Fourplex refresh in Salem
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A fourplex completed paint and flooring upgrades. Rents increased by
          $95 per unit within 60 days.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: 3.1-year payback and improved tenant retention.
        </p>
      </div>

      <NextStepsBlock
        links={nextSteps}
        subtitle="Prioritize the upgrades that protect value and accelerate rent lift."
      />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[2],
          TOP_TOOL_LINKS[1],
          TOP_TOOL_LINKS[0],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Plan budgets, replacement timing, and ROI side by side."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default PropertyValueCalculator;
