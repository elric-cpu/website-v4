import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, ShieldCheck, Clock } from "lucide-react";
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
  formatPercent,
  toNumber,
} from "@/lib/calculators/utils";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const complianceFactors = {
  low: 0.05,
  medium: 0.15,
  high: 0.3,
};

const PreventiveMaintenanceROICalculator = () => {
  const [zip, setZip] = useState("");
  const [preventiveCost, setPreventiveCost] = useState(6000);
  const [incidents, setIncidents] = useState(3);
  const [avgEmergency, setAvgEmergency] = useState(2800);
  const [complianceRisk, setComplianceRisk] = useState("medium");
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);

  const results = useMemo(() => {
    const incidentsPerYear = toNumber(incidents, 0);
    const emergencyCost = toNumber(avgEmergency, 0) * localization.costFactor;
    const preventive = toNumber(preventiveCost, 0) * localization.costFactor;
    const complianceFactor = complianceFactors[complianceRisk] || 0;

    const reactiveBase = incidentsPerYear * emergencyCost;
    const complianceCost = reactiveBase * complianceFactor;
    const totalReactive = reactiveBase + complianceCost;
    const savings = totalReactive - preventive;
    const roi = preventive > 0 ? (savings / preventive) * 100 : 0;
    const paybackMonths = savings > 0 ? preventive / (savings / 12) : null;

    return {
      preventive,
      totalReactive,
      reactiveBase,
      complianceCost,
      savings,
      roi,
      paybackMonths,
      comparisonRatio:
        preventive > 0 ? Math.min(totalReactive / preventive, 3) : 0,
    };
  }, [
    preventiveCost,
    incidents,
    avgEmergency,
    complianceRisk,
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
        type: "preventive_vs_reactive_roi",
        timestamp: new Date().toISOString(),
        zip,
        preventive_cost: toNumber(preventiveCost, 0),
        reactive_incidents: toNumber(incidents, 0),
        avg_emergency_cost: toNumber(avgEmergency, 0),
        compliance_risk: complianceRisk,
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "ROI report unlocked",
        description: "Your preventive vs reactive PDF is on the way.",
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
      question: "What counts as preventive maintenance?",
      answer:
        "Scheduled walkthroughs, small repairs, filter changes, and inspections that stop failures before they cause downtime or tenant complaints.",
    },
    {
      question: "How does compliance risk affect ROI?",
      answer:
        "Regulated properties face potential fines, documentation issues, or tenant exposure. We add a compliance cost factor to reflect that risk.",
    },
    {
      question: "Can I use my actual maintenance spend?",
      answer:
        "Yes. Replace the default values with your real preventive and emergency costs for the most accurate ROI.",
    },
    {
      question:
        "Is the ROI calculation the same for residential and commercial?",
      answer:
        "The formula is the same, but commercial properties usually have higher downtime and compliance costs, which increases ROI for preventive work.",
    },
    {
      question: "How should I estimate emergency incidents per year?",
      answer:
        "Use last year's service history if possible. If not, start with 2-4 incidents per year for older assets.",
    },
    {
      question: "Does this include tenant turnover costs?",
      answer:
        "Not directly. If tenant churn is a major factor, increase the emergency cost or compliance risk to reflect those losses.",
    },
    {
      question: "What if the ROI is negative?",
      answer:
        "That usually means the preventive plan is too expensive or the reactive costs are low. Adjust inputs or focus on the highest-risk assets first.",
    },
    {
      question: "What happens after I submit the report?",
      answer:
        "We send a PDF with line-item savings, a compliance checklist, and a recommended maintenance cadence for your property type.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  const nextSteps = [
    {
      label: "Commercial maintenance program",
      to: MAINTENANCE_LINKS.commercial.to,
      description: "Quarterly scopes, logs, and response SLAs.",
      intent: "subscribe",
    },
    {
      label: "Preventive inspection repairs",
      to: "/inspection-repairs",
      description: "Close out punch lists before failures.",
      intent: "service",
    },
    {
      label: "Request a facilities walkthrough",
      to: "/contact",
      description: "Schedule a documented maintenance review.",
      intent: "contact",
    },
    {
      label: "View Mid-Willamette Valley coverage",
      to: GEO_HUB_LINKS[1].to,
      description: "Local response across the valley.",
      intent: "location",
    },
  ];

  return (
    <CalculatorLayout
      seo={{
        title: "Preventive Maintenance ROI Calculator | Benson Home Solutions",
        description:
          "Compare preventive maintenance budgets against emergency repairs, downtime, and compliance exposure with ZIP-based cost factors.",
        keywords:
          "preventive maintenance ROI calculator, reactive vs preventive maintenance, facilities maintenance ROI, emergency repair cost comparison, compliance risk estimate",
        schema: faqSchema,
      }}
      badge="ROI & Compliance"
      title="Preventive vs Reactive ROI Calculator"
      subtitle="See the true cost of waiting for breakdowns."
      description="Compare planned maintenance to emergency costs, downtime, and compliance exposure using ZIP-adjusted pricing."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full ROI report"
          subtitle="Get a detailed PDF with savings projections, compliance notes, and next-step recommendations."
          benefits={[
            "Reactive vs preventive cost tables",
            "Compliance risk summary",
            "Budgeting roadmap",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My ROI Report"
          successMessage="Report sent. We will follow up with scheduling options."
        />
      }
    >
      <p className="text-sm text-restoration-gray">
        Pair this ROI analysis with a{" "}
        <Link
          to={MAINTENANCE_LINKS.commercial.to}
          className="text-maroon font-semibold"
        >
          commercial maintenance program
        </Link>{" "}
        to reduce emergency spend and compliance risk.
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
            <Label htmlFor="preventive">Annual preventive budget</Label>
            <Input
              id="preventive"
              type="number"
              min="0"
              value={preventiveCost}
              onChange={(event) => setPreventiveCost(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="incidents">Reactive incidents / year</Label>
            <Input
              id="incidents"
              type="number"
              min="0"
              value={incidents}
              onChange={(event) => setIncidents(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergency">Average emergency repair</Label>
            <Input
              id="emergency"
              type="number"
              min="0"
              value={avgEmergency}
              onChange={(event) => setAvgEmergency(event.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="compliance">Compliance risk level</Label>
            <select
              id="compliance"
              value={complianceRisk}
              onChange={(event) => setComplianceRisk(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <option value="low">Low (office / retail)</option>
              <option value="medium">Medium (multi-tenant)</option>
              <option value="high">High (medical / regulated)</option>
            </select>
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
            Reactive cost (annual)
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.totalReactive)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Includes compliance: {formatCurrency(results.complianceCost)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Preventive cost (annual)
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.preventive)}
          </p>
          <p className="text-xs text-gray-500 m-0">Adjusted by ZIP factor</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            ROI impact
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatPercent(results.roi, 0)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Savings: {formatCurrency(results.savings)}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <BarChart3 className="w-5 h-5 text-maroon" />
          <h3 className="text-lg font-bold text-contractor-black m-0">
            Reactive vs preventive comparison
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Reactive spend</span>
              <span>{formatCurrency(results.totalReactive)}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-maroon"
                style={{
                  width: `${Math.min(results.comparisonRatio / 3, 1) * 100}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Preventive budget</span>
              <span>{formatCurrency(results.preventive)}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400" style={{ width: "35%" }} />
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0">
          Payback:{" "}
          {results.paybackMonths
            ? `${formatNumber(results.paybackMonths, 1)} months`
            : "No payback yet"}
        </p>
      </div>

      <ResultsLock locked={!submitted} message="Detailed ROI report locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Compliance + downtime breakdown
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                What is included
              </p>
              <ul className="space-y-1">
                <li>Emergency labor and materials</li>
                <li>Compliance exposure factor</li>
                <li>Budget savings roadmap</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Recommended cadence
              </p>
              <ul className="space-y-1">
                <li>Quarterly walkthroughs</li>
                <li>Seasonal equipment tune-ups</li>
                <li>Documented findings + photos</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-maroon" />
              Reduce unplanned downtime by planning small fixes before failures.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Salem property manager
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A 12-unit office complex reduced emergency calls from 4 to 1 per year
          after implementing quarterly walkthroughs and a preventive budget.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: 41% ROI in year one and fewer tenant complaints.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[4],
          TOP_TOOL_LINKS[1],
          TOP_TOOL_LINKS[2],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Plan budgets, compare scenarios, and model lifecycle costs."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default PreventiveMaintenanceROICalculator;
