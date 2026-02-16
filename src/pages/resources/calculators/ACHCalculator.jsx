import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Wind, CheckCircle2, AlertTriangle } from "lucide-react";
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
import { formatNumber, toNumber } from "@/lib/calculators/utils";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const ACH_TARGETS = {
  office: { min: 4, max: 6, label: "Office" },
  classroom: { min: 5, max: 8, label: "Classroom" },
  retail: { min: 4, max: 6, label: "Retail" },
  restaurant: { min: 8, max: 12, label: "Restaurant" },
  medical: { min: 6, max: 12, label: "Medical" },
  gym: { min: 6, max: 10, label: "Gym" },
};

const ACHCalculator = () => {
  const [zip, setZip] = useState("");
  const [spaceType, setSpaceType] = useState("office");
  const [squareFeet, setSquareFeet] = useState(1200);
  const [ceilingHeight, setCeilingHeight] = useState(10);
  const [cfm, setCfm] = useState(600);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);
  const target = ACH_TARGETS[spaceType];

  const adjustedTarget = useMemo(() => {
    const adjustment =
      localization.climateBand === "warm"
        ? 0.5
        : localization.climateBand === "cold"
          ? -0.5
          : 0;
    return {
      min: Math.max(target.min + adjustment, 2),
      max: Math.max(target.max + adjustment, target.min + 1),
    };
  }, [localization.climateBand, target]);

  const results = useMemo(() => {
    const sqft = toNumber(squareFeet, 0);
    const height = toNumber(ceilingHeight, 0);
    const flow = toNumber(cfm, 0);
    const volume = sqft * height;
    const ach = volume > 0 ? (flow * 60) / volume : 0;
    return { volume, ach };
  }, [squareFeet, ceilingHeight, cfm]);

  const status =
    results.ach < adjustedTarget.min
      ? "below"
      : results.ach > adjustedTarget.max
        ? "above"
        : "within";

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
        type: "ach_calculator",
        timestamp: new Date().toISOString(),
        zip,
        space_type: spaceType,
        square_feet: toNumber(squareFeet, 0),
        ceiling_height: toNumber(ceilingHeight, 0),
        cfm: toNumber(cfm, 0),
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "ACH report unlocked",
        description: "Your indoor air quality report is on the way.",
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
      question: "What is ACH?",
      answer:
        "ACH stands for air changes per hour. It measures how many times the air in a room is replaced in one hour.",
    },
    {
      question: "How do I calculate CFM?",
      answer:
        "CFM is the airflow provided by your HVAC equipment or ventilation system. Check equipment specs or have a technician measure it.",
    },
    {
      question: "Why does space type matter?",
      answer:
        "Different uses require different ventilation levels. Medical and restaurant spaces need higher ACH than offices.",
    },
    {
      question: "Is higher ACH always better?",
      answer:
        "Not always. Too much ventilation can increase energy costs. The goal is to stay within the recommended range.",
    },
    {
      question: "How does climate affect ACH?",
      answer:
        "In humid climates, high ACH can add latent load. In cold climates, too much outdoor air can increase heating costs.",
    },
    {
      question: "Do I need a professional IAQ assessment?",
      answer:
        "If you are below recommended ACH or experiencing air quality issues, a professional assessment is recommended.",
    },
    {
      question: "What if my ACH is too low?",
      answer:
        "Consider increasing ventilation, upgrading filtration, or adding dedicated outdoor air systems.",
    },
    {
      question: "What if my ACH is too high?",
      answer:
        "We can recommend control strategies such as demand ventilation and heat recovery to reduce energy waste.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  const nextSteps = [
    {
      label: "Commercial maintenance program",
      to: MAINTENANCE_LINKS.commercial.to,
      description: "Indoor air quality and ventilation checklists.",
      intent: "subscribe",
    },
    {
      label: "Energy comfort retrofits",
      to: "/energy-comfort-retrofits",
      description: "Air sealing and efficiency upgrades.",
      intent: "service",
    },
    {
      label: "Request an IAQ review",
      to: "/contact",
      description: "Schedule a ventilation and filtration assessment.",
      intent: "contact",
    },
    {
      label: "View Harney County coverage",
      to: GEO_HUB_LINKS[0].to,
      description: "Local response and maintenance support.",
      intent: "location",
    },
  ];

  return (
    <CalculatorLayout
      seo={{
        title: "ACH Calculator | Benson Home Solutions",
        description:
          "Calculate air changes per hour (ACH) and compare to recommended ventilation targets for different space types.",
        keywords:
          "ACH calculator, air changes per hour calculator, indoor air quality Oregon, ventilation rate calculator, HVAC air change estimate",
        schema: faqSchema,
      }}
      badge="Energy & IAQ"
      title="ACH (Air Changes per Hour) Calculator"
      subtitle="Measure indoor air quality targets fast."
      description="Calculate ACH from square footage, ceiling height, and airflow."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full IAQ report"
          subtitle="Get a PDF with ACH targets, ventilation tips, and upgrade recommendations."
          benefits={[
            "ACH target summary",
            "Ventilation checklist",
            "Filter and airflow recommendations",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My IAQ Report"
          successMessage="Report sent. We will follow up with next steps."
        />
      }
    >
      <p className="text-sm text-restoration-gray">
        Pair ACH targets with a{" "}
        <Link
          to={MAINTENANCE_LINKS.commercial.to}
          className="text-maroon font-semibold"
        >
          commercial maintenance program
        </Link>{" "}
        for ongoing IAQ performance.
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
            <Label htmlFor="space">Space type</Label>
            <select
              id="space"
              value={spaceType}
              onChange={(event) => setSpaceType(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              {Object.entries(ACH_TARGETS).map(([key, value]) => (
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
              min="100"
              value={squareFeet}
              onChange={(event) => setSquareFeet(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Ceiling height (ft)</Label>
            <Input
              id="height"
              type="number"
              min="7"
              value={ceilingHeight}
              onChange={(event) => setCeilingHeight(event.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="cfm">Total airflow (CFM)</Label>
            <Input
              id="cfm"
              type="number"
              min="0"
              value={cfm}
              onChange={(event) => setCfm(event.target.value)}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 mb-0">
          Climate band: {localization.climateBand} · {localization.regionLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Calculated ACH
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatNumber(results.ach, 1)} ACH
          </p>
          <p className="text-xs text-gray-500 m-0">
            Volume: {formatNumber(results.volume, 0)} cu ft
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Recommended range
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {adjustedTarget.min} - {adjustedTarget.max} ACH
          </p>
          <p className="text-xs text-gray-500 m-0">
            Status:{" "}
            {status === "within"
              ? "On target"
              : status === "below"
                ? "Below target"
                : "Above target"}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Wind className="w-5 h-5 text-maroon" />
          <h3 className="text-lg font-bold text-contractor-black m-0">
            ACH guidance
          </h3>
        </div>
        <div className="flex items-start gap-3">
          {status === "within" ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-maroon mt-1" />
          )}
          <p className="text-sm text-restoration-gray m-0">
            {status === "within"
              ? "Your ACH is within the recommended range for this space type."
              : status === "below"
                ? "Your ACH is below target. Consider increasing ventilation or upgrading filtration."
                : "Your ACH is above target. Consider controls to reduce energy waste while maintaining air quality."}
          </p>
        </div>
      </div>

      <ResultsLock locked={!submitted} message="Detailed ACH report locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Ventilation optimization plan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Included in report
              </p>
              <ul className="space-y-1">
                <li>ACH vs target analysis</li>
                <li>Ventilation retrofit ideas</li>
                <li>Filter upgrade guidance</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Climate-specific notes
              </p>
              <ul className="space-y-1">
                <li>Humidity control considerations</li>
                <li>Heat recovery recommendations</li>
                <li>Outdoor air scheduling tips</li>
              </ul>
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Medical suite ventilation upgrade
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A 1,800 sq ft clinic increased ACH from 3.2 to 6.8 using dedicated
          outdoor air and upgraded filtration.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: improved air quality scores and reduced occupant complaints.
        </p>
      </div>

      <NextStepsBlock links={nextSteps} />

      <RelatedToolsBlock
        links={[
          TOP_TOOL_LINKS[1],
          TOP_TOOL_LINKS[3],
          TOP_TOOL_LINKS[4],
          TOOLS_HUB_LINK,
        ]}
        subtitle="Compare upgrades and align IAQ with maintenance planning."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default ACHCalculator;
