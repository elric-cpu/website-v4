import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Leaf, Zap } from "lucide-react";
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
  formatPercent,
  toNumber,
} from "@/lib/calculators/utils";
import { UPGRADE_MODELS } from "@/lib/calculators/costModels";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const EnergySavingsCalculator = () => {
  const [zip, setZip] = useState("");
  const [buildingType, setBuildingType] = useState("residential");
  const [monthlyBill, setMonthlyBill] = useState(220);
  const [upgradeType, setUpgradeType] = useState("thermostat");
  const [savingsPercent, setSavingsPercent] = useState(10);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);

  useEffect(() => {
    const model = UPGRADE_MODELS[upgradeType];
    if (model) {
      setSavingsPercent(Math.round(model.savings * 100));
    }
  }, [upgradeType]);

  const results = useMemo(() => {
    const monthly = toNumber(monthlyBill, 0);
    const savingsRate = toNumber(savingsPercent, 0) / 100;
    const upgrade = UPGRADE_MODELS[upgradeType] || UPGRADE_MODELS.thermostat;
    const typeFactor = buildingType === "commercial" ? 1.6 : 1;
    const upgradeCost = upgrade.cost * typeFactor * localization.costFactor;

    const monthlySavings = monthly * savingsRate;
    const annualSavings = monthlySavings * 12;
    const paybackYears = annualSavings > 0 ? upgradeCost / annualSavings : null;
    const roi = upgradeCost > 0 ? (annualSavings / upgradeCost) * 100 : 0;

    return {
      upgradeCost,
      monthlySavings,
      annualSavings,
      paybackYears,
      roi,
    };
  }, [
    monthlyBill,
    savingsPercent,
    upgradeType,
    buildingType,
    localization.costFactor,
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
        type: "energy_savings_calculator",
        timestamp: new Date().toISOString(),
        zip,
        building_type: buildingType,
        monthly_bill: toNumber(monthlyBill, 0),
        upgrade_type: upgradeType,
        savings_percent: toNumber(savingsPercent, 0),
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "Savings report unlocked",
        description: "Your energy savings PDF is on the way.",
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
      question: "How do you calculate savings?",
      answer:
        "Savings are based on your current bill multiplied by the expected efficiency improvement for the selected upgrade.",
    },
    {
      question: "What if I do not know my exact bill?",
      answer:
        "Use a recent monthly average or select a conservative estimate. You can adjust later to refine the results.",
    },
    {
      question: "Are commercial savings higher than residential?",
      answer:
        "Commercial systems often run longer hours, so efficiency gains can compound quickly. We apply a scale factor for commercial upgrades.",
    },
    {
      question: "Does this include utility rebates?",
      answer:
        "No. Any rebates or tax credits will further improve ROI, so consider them as upside.",
    },
    {
      question: "What upgrade typically delivers the fastest payback?",
      answer:
        "Smart thermostats and HVAC tune-ups usually pay back first. Envelope upgrades deliver larger long-term gains.",
    },
    {
      question: "Why is ZIP data included?",
      answer:
        "ZIP-based factors adjust installed costs for local labor and material pricing differences.",
    },
    {
      question: "Should I stack multiple upgrades?",
      answer:
        "Yes. Pairing air sealing with HVAC tuning or automation often multiplies savings.",
    },
    {
      question: "What happens after I submit?",
      answer:
        "We send a PDF report with a prioritized upgrade list and recommended next steps.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  const nextSteps = [
    {
      label: "Energy comfort retrofits",
      to: "/energy-comfort-retrofits",
      description: "Air sealing, insulation, and efficiency upgrades.",
      intent: "service",
    },
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Keep systems tuned and reduce waste.",
      intent: "subscribe",
    },
    {
      label: "Commercial maintenance program",
      to: MAINTENANCE_LINKS.commercial.to,
      description: "Facilities maintenance with documented scopes.",
      intent: "subscribe",
    },
    {
      label: "Request an efficiency review",
      to: "/contact",
      description: "Schedule a comfort and energy audit.",
      intent: "contact",
    },
  ];

  return (
    <CalculatorLayout
      seo={{
        title: "Energy Savings Calculator | Benson Home Solutions",
        description:
          "Estimate residential or commercial energy savings from efficiency upgrades with ZIP-adjusted costs.",
        keywords:
          "energy savings calculator Oregon, efficiency upgrade savings, HVAC efficiency savings, insulation savings estimate, utility bill reduction",
        schema: faqSchema,
      }}
      badge="Energy & IAQ"
      title="Energy Savings Calculator"
      subtitle="Compare old systems to efficient upgrades."
      description="Pick an upgrade, set your monthly bill, and see ZIP-adjusted payback and ROI."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full savings report"
          subtitle="Receive a PDF with upgrade priorities and payback timelines."
          benefits={[
            "Upgrade cost breakdown",
            "Payback timeline",
            "Energy efficiency checklist",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My Savings Report"
          successMessage="Report sent. We will follow up with next steps."
        />
      }
    >
      <p className="text-sm text-restoration-gray">
        Pair efficiency upgrades with a{" "}
        <Link
          to="/energy-comfort-retrofits"
          className="text-maroon font-semibold"
        >
          comfort retrofit plan
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
            <Label htmlFor="type">Building type</Label>
            <select
              id="type"
              value={buildingType}
              onChange={(event) => setBuildingType(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bill">Average monthly bill</Label>
            <Input
              id="bill"
              type="number"
              min="0"
              value={monthlyBill}
              onChange={(event) => setMonthlyBill(event.target.value)}
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
              {Object.entries(UPGRADE_MODELS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="savings">Expected savings (%)</Label>
            <Input
              id="savings"
              type="number"
              min="0"
              max="50"
              value={savingsPercent}
              onChange={(event) => setSavingsPercent(event.target.value)}
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
            Upgrade cost
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.upgradeCost)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            ZIP-adjusted installed cost
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Monthly savings
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.monthlySavings)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Annual: {formatCurrency(results.annualSavings)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            ROI estimate
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatPercent(results.roi, 0)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Payback:{" "}
            {results.paybackYears
              ? `${results.paybackYears.toFixed(1)} yrs`
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <LineChart className="w-5 h-5 text-maroon" />
          <h3 className="text-lg font-bold text-contractor-black m-0">
            Before vs after energy spend
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Current spend</span>
              <span>{formatCurrency(monthlyBill)}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-maroon" style={{ width: "100%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Projected spend</span>
              <span>
                {formatCurrency(
                  toNumber(monthlyBill, 0) - results.monthlySavings,
                )}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400"
                style={{
                  width: `${Math.max(10, 100 - toNumber(savingsPercent, 0))}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <ResultsLock locked={!submitted} message="Detailed savings report locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Upgrade roadmap
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Included in report
              </p>
              <ul className="space-y-1">
                <li>Upgrade scope breakdown</li>
                <li>Rebate and incentive checklist</li>
                <li>Priority sequencing</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Next steps
              </p>
              <ul className="space-y-1">
                <li>Schedule comfort audit</li>
                <li>Confirm HVAC sizing</li>
                <li>Measure air sealing targets</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-maroon" />
              ZIP-adjusted installed costs are applied to the upgrade total.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Albany office retrofit
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A 6,500 sq ft office upgraded to LED lighting and smart controls.
          Energy bills dropped by 21% within the first year.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: 2.4-year payback with improved occupant comfort.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[0],
          TOP_TOOL_LINKS[1],
          TOP_TOOL_LINKS[3],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Estimate savings, compare upgrades, and plan next steps."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default EnergySavingsCalculator;
