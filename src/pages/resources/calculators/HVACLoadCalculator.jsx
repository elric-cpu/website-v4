import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Gauge, ThermometerSun, Wind, Info } from "lucide-react";
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
  clamp,
  formatCurrency,
  formatNumber,
  formatPercent,
  toNumber,
} from "@/lib/calculators/utils";
import {
  CLIMATE_FACTORS,
  HVAC_LOAD_BASE,
  INSULATION_FACTORS,
} from "@/lib/calculators/costModels";
import { submitCalculatorLead } from "@/lib/calculators/submitCalculatorLead";
import { isEmail, isZip } from "@/lib/validators";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const HVACLoadCalculator = () => {
  const [zip, setZip] = useState("");
  const [squareFeet, setSquareFeet] = useState(2200);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [buildingType, setBuildingType] = useState("residential");
  const [insulation, setInsulation] = useState("average");
  const [climateBand, setClimateBand] = useState("");
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const localization = useZipLocalization(zip);
  const climate = climateBand || localization.climateBand;
  const heightValue = toNumber(ceilingHeight, 8);

  const results = useMemo(() => {
    const sqft = toNumber(squareFeet, 0);
    const base = HVAC_LOAD_BASE[buildingType] || 22;
    const heightFactor = clamp(toNumber(ceilingHeight, 8) / 8, 0.8, 1.4);
    const insulationFactor = INSULATION_FACTORS[insulation] || 1;
    const climateFactor = CLIMATE_FACTORS[climate] || 1;
    const loadBtu =
      sqft * base * heightFactor * insulationFactor * climateFactor;
    const tons = loadBtu / 12000;
    const installBase = buildingType === "commercial" ? 3200 : 2600;
    const installCost = tons * installBase * localization.costFactor;

    return {
      loadBtu,
      loadRange: { min: loadBtu * 0.9, max: loadBtu * 1.1 },
      tons,
      installRange: { min: installCost * 0.85, max: installCost * 1.15 },
      sizeScore: clamp(tons / 10, 0.05, 1),
    };
  }, [
    squareFeet,
    buildingType,
    ceilingHeight,
    insulation,
    climate,
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
        type: "hvac_load_calculator",
        timestamp: new Date().toISOString(),
        zip,
        square_feet: toNumber(squareFeet, 0),
        ceiling_height: toNumber(ceilingHeight, 0),
        building_type: buildingType,
        insulation,
        climate_band: climate,
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });
      setSubmitted(true);
      toast({
        title: "Report unlocked",
        description: "Your detailed HVAC load report will arrive by email.",
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
      question: "How accurate is this HVAC load calculator?",
      answer:
        "It is a fast planning tool that uses square footage, ceiling height, insulation, and localized climate factors. A licensed HVAC contractor should complete a Manual J calculation for final sizing.",
    },
    {
      question: "Why does my ZIP code matter for HVAC sizing?",
      answer:
        "Your ZIP informs climate assumptions and local pricing factors. Weather severity affects load, and labor/material costs vary by region.",
    },
    {
      question: "What insulation level should I pick?",
      answer:
        'Choose "poor" for older homes with little attic insulation, "average" for typical 1990s-2000s construction, and "good" for newer or upgraded insulation.',
    },
    {
      question: "What if my ceilings are taller than 8 feet?",
      answer:
        "Higher ceilings increase room volume and load. Enter the actual height so the calculator scales the load correctly.",
    },
    {
      question: "Should I size up for extreme hot or cold days?",
      answer:
        "Oversizing can reduce comfort and efficiency. A Manual J calculation will refine your exact peak-day needs without oversizing.",
    },
    {
      question: "Does this include ductwork or air distribution?",
      answer:
        "No. The calculation is focused on equipment size. Duct sizing and distribution are separate steps in a full HVAC design.",
    },
    {
      question: "How do I use this for commercial buildings?",
      answer:
        'Select "commercial," enter total conditioned square footage, and adjust ceiling height. We will verify zoning and tenant loads during a site visit.',
    },
    {
      question: "What is the next step after this estimate?",
      answer:
        "Request a site visit for a full load calculation, duct assessment, and equipment recommendation.",
    },
  ];

  const faqSchema = buildFaqSchema(faqs);

  const nextSteps = [
    {
      label: "Home maintenance program",
      to: MAINTENANCE_LINKS.home.to,
      description: "Plan seasonal HVAC tune-ups and filter schedules.",
      intent: "subscribe",
    },
    {
      label: "Commercial maintenance program",
      to: MAINTENANCE_LINKS.commercial.to,
      description: "Facilities maintenance for small commercial sites.",
      intent: "subscribe",
    },
    {
      label: "Energy comfort retrofits",
      to: "/energy-comfort-retrofits",
      description: "Air sealing and insulation improvements.",
      intent: "service",
    },
    {
      label: "Request a load assessment",
      to: "/contact",
      description: "Schedule a manual load calculation and site review.",
      intent: "contact",
    },
  ];

  return (
    <CalculatorLayout
      seo={{
        title: "HVAC Load Calculator | Benson Home Solutions",
        description:
          "Estimate HVAC load, system size, and ZIP-adjusted replacement ranges for Oregon homes and small commercial properties.",
        keywords:
          "HVAC load calculator Oregon, heating cooling load estimate, HVAC sizing calculator, Manual J planning, replacement cost estimate Oregon",
        schema: faqSchema,
      }}
      badge="HVAC Planning"
      title="HVAC Load Calculator"
      subtitle="Estimate heating and cooling size in minutes."
      description="ZIP-smart factors help you plan for realistic sizing and localized equipment ranges."
      sidebar={
        <LeadCaptureCard
          title="Unlock the full HVAC report"
          subtitle="Get a PDF summary with sizing details, equipment range, and next-step recommendations."
          benefits={[
            "Manual-J style sizing summary",
            "ZIP-adjusted cost range",
            "Replacement timing checklist",
          ]}
          lead={lead}
          onLeadChange={onLeadChange}
          onSubmit={onSubmit}
          canSubmit={canSubmit}
          submitting={submitting}
          submitted={submitted}
          buttonLabel="Email My HVAC Report"
          successMessage="Report sent. We will follow up with scheduling options."
        />
      }
    >
      <p className="text-sm text-restoration-gray">
        For full planning, pair this estimate with our{" "}
        <Link
          to="/energy-comfort-retrofits"
          className="text-maroon font-semibold"
        >
          energy comfort retrofits
        </Link>{" "}
        and a{" "}
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
            <Label htmlFor="sqft">Square footage</Label>
            <Input
              id="sqft"
              type="number"
              min="500"
              value={squareFeet}
              onChange={(event) => setSquareFeet(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ceiling">Ceiling height (ft)</Label>
            <Input
              id="ceiling"
              type="number"
              min="7"
              value={ceilingHeight}
              onChange={(event) => setCeilingHeight(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="building">Building type</Label>
            <select
              id="building"
              value={buildingType}
              onChange={(event) => setBuildingType(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="insulation">Insulation quality</Label>
            <select
              id="insulation"
              value={insulation}
              onChange={(event) => setInsulation(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <option value="poor">Poor / Drafty</option>
              <option value="average">Average</option>
              <option value="good">Good / Upgraded</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="climate">Climate band</Label>
            <select
              id="climate"
              value={climate}
              onChange={(event) => setClimateBand(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
            >
              <option value="cold">Cold / Snow</option>
              <option value="mixed">Mixed / Four-season</option>
              <option value="warm">Warm / Humid</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Estimated load
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatNumber(results.loadBtu, 0)} BTU/hr
          </p>
          <p className="text-xs text-gray-500 m-0">
            Range: {formatNumber(results.loadRange.min, 0)} -{" "}
            {formatNumber(results.loadRange.max, 0)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            Recommended size
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatNumber(results.tons, 1)} tons
          </p>
          <p className="text-xs text-gray-500 m-0">
            Based on {buildingType} load assumptions
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
            ZIP-adjusted install range
          </p>
          <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
            {formatCurrency(results.installRange.min)} -{" "}
            {formatCurrency(results.installRange.max)}
          </p>
          <p className="text-xs text-gray-500 m-0">
            {localization.regionLabel} · Factor{" "}
            {localization.costFactor.toFixed(3)}x
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Gauge className="w-5 h-5 text-maroon" />
          <h3 className="text-lg font-bold text-contractor-black m-0">
            System size gauge
          </h3>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-maroon"
            style={{ width: `${results.sizeScore * 100}%` }}
          />
        </div>
        <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Target range assumes normal occupancy and average window exposure.
        </div>
      </div>

      <ResultsLock locked={!submitted} message="Detailed HVAC report locked">
        <div className="bg-cream border border-gray-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-maroon" />
            <p className="font-bold text-contractor-black m-0">
              Detailed sizing breakdown
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-restoration-gray">
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Load drivers
              </p>
              <ul className="space-y-1">
                <li>
                  Ceiling factor:{" "}
                  {formatPercent((heightValue / 8) * 100 - 100, 0)} adjustment
                </li>
                <li>Insulation factor: {INSULATION_FACTORS[insulation]}x</li>
                <li>Climate band: {climate}</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-contractor-black mb-1">
                Recommended next steps
              </p>
              <ul className="space-y-1">
                <li>Manual J load confirmation</li>
                <li>Duct sizing + airflow balance</li>
                <li>Equipment selection by efficiency tier</li>
              </ul>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Wind className="w-4 h-4 text-maroon" />
              Local cost factor applied for equipment + installation budgeting.
            </div>
          </div>
        </div>
      </ResultsLock>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-contractor-black mb-2">
          Case study: Sweet Home clinic retrofit
        </h3>
        <p className="text-sm text-restoration-gray mb-3">
          A 4,800 sq ft clinic in ZIP 97386 replaced an oversized unit.
          Right-sizing reduced energy use by 18% and cut summer comfort
          complaints by half.
        </p>
        <p className="text-xs text-gray-500 m-0">
          Result: 3.5-ton system, verified by Manual J, with a 2.9-year payback.
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
        subtitle="Additional tools for HVAC planning and budgeting."
      />

      <LocationsServedBlock links={GEO_HUB_LINKS} />

      <FaqSection items={faqs} />
    </CalculatorLayout>
  );
};

export default HVACLoadCalculator;
