import React, { useMemo, useState } from "react";
import { Users, Clock } from "lucide-react";
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
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const LaborSavingsCalculator = () => {
  const [zip, setZip] = useState("");
  const [workOrders, setWorkOrders] = useState(35);
  const [hoursPerOrder, setHoursPerOrder] = useState(1.6);
  const [hourlyRate, setHourlyRate] = useState(65);
  const [efficiencyGain, setEfficiencyGain] = useState(20);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);

  const results = useMemo(() => {
    const orders = toNumber(workOrders, 0);
    const hours = toNumber(hoursPerOrder, 0);
    const rate = toNumber(hourlyRate, 0) * localization.costFactor;
    const gain = toNumber(efficiencyGain, 0) / 100;

    const annualHours = orders * hours * 12;
    const annualCost = annualHours * rate;
    const savedHours = annualHours * gain;
    const savedCost = savedHours * rate;
    const optimizedCost = annualCost - savedCost;

    return {
      rate,
      annualHours,
      annualCost,
      savedHours,
      savedCost,
      optimizedCost,
    };
  }, [
    workOrders,
    hoursPerOrder,
    hourlyRate,
    efficiencyGain,
    localization.costFactor,
  ]);

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Build a program",
    },
    {
      label: "commercial service agreements",
      to: "/commercial-service-agreements",
      description: "Documented scopes with response times and budget controls.",
      intent: "subscribe",
      cta: "Review agreements",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Bundle repairs",
    },
    {
      label: "request a staffing review",
      to: "/contact",
      description: "Audit work order flow and build a coverage plan.",
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
        type: "labor_savings_estimator",
        timestamp: new Date().toISOString(),
        zip,
        work_orders: toNumber(workOrders, 0),
        hours_per_order: toNumber(hoursPerOrder, 0),
        hourly_rate: toNumber(hourlyRate, 0),
        efficiency_gain: toNumber(efficiencyGain, 0),
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "Labor savings report unlocked",
        description: "Your labor savings PDF is on the way.",
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
      question: "What counts as a work order?",
      answer:
        "Any repair request, inspection, or maintenance task logged for your property or facility.",
    },
    {
      question: "How do I estimate hours per work order?",
      answer:
        "Use the average time it takes your team to complete a typical request, including travel and documentation.",
    },
    {
      question: "What does efficiency gain represent?",
      answer:
        "It is the percentage reduction in labor time from outsourcing, better scheduling, or digital work orders.",
    },
    {
      question: "Why is ZIP used in labor savings?",
      answer:
        "Local labor costs vary by region. We adjust hourly rates to reflect local market conditions.",
    },
    {
      question: "Does this include overtime or on-call labor?",
      answer:
        "No. If overtime is common, increase the hourly rate to better reflect true costs.",
    },
    {
      question: "Can this help justify outsourcing?",
      answer:
        "Yes. Compare in-house savings to the cost of outsourcing to see if it makes financial sense.",
    },
    {
      question: "What if my workload is seasonal?",
      answer:
        "Use an annualized average or rerun the calculator for peak and off-peak seasons.",
    },
    {
      question: "What do I get in the full report?",
      answer:
        "A PDF with labor savings scenarios, staffing recommendations, and next-step actions.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  return (
    <CalculatorLayout
      seo={{
        title: "Labor Savings Estimator | Benson Home Solutions",
        description:
          "Calculate labor savings from outsourcing maintenance or improving work order efficiency with ZIP-adjusted labor rates.",
        keywords:
          "labor savings calculator, maintenance labor cost comparison, outsource vs in-house maintenance, facilities labor estimator, productivity savings",
        schema: faqSchema,
      }}
      badge="Operations"
      title="Labor Savings Estimator"
      subtitle="See how much time and labor cost you can save."
      description="Estimate annual labor savings from better scheduling, outsourcing, or digital work orders."
      sidebar={
        <LeadCaptureCard
          title="Unlock the labor savings report"
          subtitle="Get a PDF with staffing options and cost scenarios."
          benefits={[
            "Labor savings summary",
            "Staffing impact scenarios",
            "Operational recommendations",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My Labor Report"
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
            <Label htmlFor="orders">Work orders per month</Label>
            <Input
              id="orders"
              type="number"
              min="0"
              value={workOrders}
              onChange={(event) => setWorkOrders(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Hours per work order</Label>
            <Input
              id="hours"
              type="number"
              min="0"
              step="0.1"
              value={hoursPerOrder}
              onChange={(event) => setHoursPerOrder(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Hourly labor rate</Label>
            <Input
              id="rate"
              type="number"
              min="0"
              value={hourlyRate}
              onChange={(event) => setHourlyRate(event.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="gain">Efficiency gain (%)</Label>
            <Input
              id="gain"
              type="number"
              min="0"
              max="60"
              value={efficiencyGain}
              onChange={(event) => setEfficiencyGain(event.target.value)}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0">
          ZIP-adjusted labor rate: {formatCurrency(results.rate)} / hr ·{" "}
          {localization.regionLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Annual labor hours
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatNumber(results.annualHours, 0)} hrs
          </p>
          <p className="text-xs text-gray-500 m-0">Baseline workload</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Annual labor cost
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.annualCost)}
          </p>
          <p className="text-xs text-gray-500 m-0">ZIP-adjusted</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Potential savings
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.savedCost)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            Saved hours: {formatNumber(results.savedHours, 0)}
          </p>
        </div>
      </div>

      <ResultsLock locked={!submitted} message="Detailed labor report locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Staffing impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Included in report
              </p>
              <ul className="space-y-1">
                <li>Outsourcing vs in-house scenarios</li>
                <li>Time savings breakdown</li>
                <li>Budget reallocation ideas</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Next steps
              </p>
              <ul className="space-y-1">
                <li>Review workflow bottlenecks</li>
                <li>Digital work order rollout</li>
                <li>Preventive maintenance scheduling</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-maroon" />
              Savings often come from less travel and fewer repeat visits.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Multi-tenant office efficiency
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A property manager cut work order time by 22% after implementing
          digital routing and bundled preventive visits.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: reclaimed 240 labor hours and faster response times.
        </p>
      </div>

      <NextStepsBlock
        links={nextSteps}
        subtitle="Turn labor savings into a documented maintenance plan and predictable coverage."
      />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[1],
          TOP_TOOL_LINKS[4],
          TOP_TOOL_LINKS[2],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Compare ROI, replacement timing, and repair budgets."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default LaborSavingsCalculator;
