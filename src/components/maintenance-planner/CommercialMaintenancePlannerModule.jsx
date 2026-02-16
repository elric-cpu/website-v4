import React, { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { submitCommercialAgreementLead } from "@/lib/commercialAgreements/submitCommercialAgreementLead";
import {
  getOregonCostFactor,
  getOregonCostRegion,
} from "@/lib/maintenancePlanner/oregonCostFactors";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidZip = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

const formatCurrency = (value) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

const getAgeFactor = (age) => {
  if (!age || Number.isNaN(age)) return 1;
  if (age <= 20) return 1;
  if (age <= 40) return 1.15;
  if (age <= 60) return 1.3;
  return 1.5;
};

const inferClimateBand = (zip) => {
  if (!zip || zip.length < 1) return "mixed";
  if (zip.startsWith("97") || zip.startsWith("98")) return "mixed";
  const first = Number(zip[0]);
  if (Number.isNaN(first)) return "mixed";
  if (first <= 2) return "cold";
  if (first <= 6) return "mixed";
  return "warm";
};

const CLIMATE_TASKS = {
  cold: [
    "Roof inspections after freeze/thaw cycles",
    "Pipe insulation and freeze protection",
    "Exterior sealants and door hardware adjustments",
    "Gutter and drainage checks before first freeze",
  ],
  mixed: [
    "Quarterly HVAC tune-ups and filter plans",
    "Exterior joint sealing and water-shedding details",
    "Fall drainage tests and roof flashing review",
    "Life-safety and trip-hazard walkthroughs",
  ],
  warm: [
    "HVAC coil cleaning and condensate line flushes",
    "Moisture monitoring in crawlspaces/attics",
    "Roof membrane inspection after heat",
    "Pest and termite control sweeps",
  ],
};

const ROOF_RATES = {
  tpo: { min: 6, max: 10, label: "TPO/EPDM (flat)" },
  asphalt: { min: 3, max: 6, label: "Asphalt shingles" },
  metal: { min: 5, max: 12, label: "Metal" },
  tile: { min: 10, max: 20, label: "Tile/Slate" },
};

export default function CommercialMaintenancePlannerModule() {
  const [zip, setZip] = useState("");
  const [squareFeet, setSquareFeet] = useState(12000);
  const [buildingAge, setBuildingAge] = useState(35);
  const [buildingType, setBuildingType] = useState("church");
  const [roofType, setRoofType] = useState("tpo");
  const [hvacUnits, setHvacUnits] = useState(2);
  const [climateBand, setClimateBand] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });

  const regionalFactor = useMemo(() => getOregonCostFactor(zip), [zip]);
  const regionalLabel = useMemo(() => getOregonCostRegion(zip), [zip]);
  const ageFactor = useMemo(
    () => getAgeFactor(Number(buildingAge)),
    [buildingAge],
  );
  const annualRange = useMemo(() => {
    const sqft = Number(squareFeet) || 0;
    const min = sqft * 2.5 * ageFactor * regionalFactor;
    const max = sqft * 7.5 * ageFactor * regionalFactor;
    return { min, max };
  }, [squareFeet, ageFactor, regionalFactor]);

  const climate = useMemo(
    () => climateBand || inferClimateBand(zip),
    [climateBand, zip],
  );

  const roofEstimate = useMemo(() => {
    const sqft = Number(squareFeet) || 0;
    const roofArea = sqft * 1.05;
    const rates = ROOF_RATES[roofType] || ROOF_RATES.tpo;
    return {
      min: roofArea * rates.min * regionalFactor,
      max: roofArea * rates.max * regionalFactor,
      label: rates.label,
    };
  }, [squareFeet, roofType, regionalFactor]);

  const hvacEstimate = useMemo(() => {
    const units = Number(hvacUnits) || 0;
    const min = units * 5500 * regionalFactor;
    const max = units * 25000 * regionalFactor;
    return { min, max, units };
  }, [hvacUnits, regionalFactor]);

  const canSubmit =
    lead.name.trim().length >= 2 && isValidEmail(lead.email) && isValidZip(zip);

  const onLeadChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    try {
      setSubmitting(true);
      await submitCommercialAgreementLead({
        type: "commercial_zip_smart_planner",
        timestamp: new Date().toISOString(),
        zip,
        square_feet: Number(squareFeet) || null,
        building_age: Number(buildingAge) || null,
        building_type: buildingType,
        roof_type: roofType,
        hvac_units: Number(hvacUnits) || null,
        climate_band: climate,
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });

      setSubmitted(true);
      toast({
        title: "Plan unlocked",
        description:
          "Thanks. We will send your line-item scope and follow up shortly.",
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: err?.message || "Please try again or call (541) 321-5115.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs text-gray-500 m-0 mb-4">
              ZIP code adjusted planning preview (regional factor confirmed at
              onboarding).
            </p>

            <h2 className="text-3xl font-bold text-contractor-black mb-3">
              Commercial Maintenance Planner
            </h2>
            <p className="text-restoration-gray mb-6">
              Estimate annual maintenance budgets, seasonal priorities, and
              major system replacements for Oregon properties under 50k sq ft.
            </p>

            <div className="bg-cream border border-cream rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip-commercial">ZIP code</Label>
                  <Input
                    id="zip-commercial"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="e.g. 97386"
                  />
                  {zip && !isValidZip(zip) ? (
                    <p className="text-xs text-red-600">
                      Enter a valid 5-digit ZIP (or ZIP+4).
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sqft-commercial">Square footage</Label>
                  <Input
                    id="sqft-commercial"
                    type="number"
                    min="1000"
                    value={squareFeet}
                    onChange={(e) => setSquareFeet(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age-commercial">Building age</Label>
                  <Input
                    id="age-commercial"
                    type="number"
                    min="1"
                    value={buildingAge}
                    onChange={(e) => setBuildingAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type-commercial">Building type</Label>
                  <select
                    id="type-commercial"
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
                  >
                    <option value="church">Church / community</option>
                    <option value="medical">Medical / clinic</option>
                    <option value="office">Office</option>
                    <option value="warehouse">Warehouse</option>
                    <option value="retail">Retail</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roof-commercial">Roof type</Label>
                  <select
                    id="roof-commercial"
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
                  >
                    <option value="tpo">TPO/EPDM (flat)</option>
                    <option value="asphalt">Asphalt shingles</option>
                    <option value="metal">Metal</option>
                    <option value="tile">Tile/Slate</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hvac-commercial">HVAC units</Label>
                  <Input
                    id="hvac-commercial"
                    type="number"
                    min="0"
                    value={hvacUnits}
                    onChange={(e) => setHvacUnits(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="climate-commercial">Climate band</Label>
                  <select
                    id="climate-commercial"
                    value={climate}
                    onChange={(e) => setClimateBand(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
                  >
                    <option value="cold">Cold / Snow</option>
                    <option value="mixed">Mixed / Four-season</option>
                    <option value="warm">Warm / Humid</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
                    Annual maintenance range
                  </p>
                  <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
                    {formatCurrency(annualRange.min)} –{" "}
                    {formatCurrency(annualRange.max)}
                  </p>
                  <p className="text-xs text-gray-500 m-0">
                    Budgeting range adjusted for building age and size.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span>ZIP-adjusted pricing</span>
                    <span
                      className="inline-flex items-center gap-1"
                      title={`Uses Oregon regional cost factor (RPP). Current factor: ${regionalFactor.toFixed(
                        3,
                      )}x (${regionalLabel}).`}
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span className="sr-only">More info</span>
                    </span>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
                    Roof replacement range ({roofEstimate.label})
                  </p>
                  <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
                    {formatCurrency(roofEstimate.min)} –{" "}
                    {formatCurrency(roofEstimate.max)}
                  </p>
                  <p className="text-xs text-gray-500 m-0">
                    Based on ~5% roof area allowance.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-white border border-gray-200 rounded-lg p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
                  HVAC replacement range
                </p>
                <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
                  {hvacEstimate.units > 0
                    ? `${formatCurrency(hvacEstimate.min)} – ${formatCurrency(
                        hvacEstimate.max,
                      )}`
                    : "Add unit count to estimate"}
                </p>
                <p className="text-xs text-gray-500 m-0">
                  Typical small commercial unit replacement range.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-contractor-black mb-3">
                  Seasonal priorities for your region
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-restoration-gray">
                  {CLIMATE_TASKS[climate].map((task) => (
                    <li key={task} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-maroon mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-contractor-black mb-3">
                  End-of-life watchlist (older buildings)
                </h3>
                <ul className="space-y-2 text-sm text-restoration-gray">
                  {buildingAge >= 25 ? (
                    <li>HVAC and controls commonly approach replacement.</li>
                  ) : null}
                  {buildingAge >= 30 ? (
                    <li>
                      Roof systems and flashing often require major renewal.
                    </li>
                  ) : null}
                  {buildingAge >= 40 ? (
                    <li>
                      Galvanized plumbing, valves, and drains can be near
                      end-of-life.
                    </li>
                  ) : null}
                  {buildingAge >= 50 ? (
                    <li>
                      Electrical panels and feeders may require modernization.
                    </li>
                  ) : null}
                  {buildingAge < 25 ? (
                    <li>
                      Prioritize preventive maintenance and life-safety
                      walkthroughs.
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-contractor-black text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5 text-cream" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-cream m-0">
                    Get Full Report
                  </p>
                  <p className="text-lg font-bold m-0">
                    Unlock the 5-year capital plan
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-200 mb-6">
                Receive a ZIP code adjusted capital replacement timeline, line
                item scope recommendations, and service agreement savings.
              </p>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-name-commercial" className="text-cream">
                    Name
                  </Label>
                  <Input
                    id="lead-name-commercial"
                    name="name"
                    value={lead.name}
                    onChange={onLeadChange}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-email-commercial" className="text-cream">
                    Email
                  </Label>
                  <Input
                    id="lead-email-commercial"
                    name="email"
                    type="email"
                    value={lead.email}
                    onChange={onLeadChange}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-phone-commercial" className="text-cream">
                    Phone (optional)
                  </Label>
                  <Input
                    id="lead-phone-commercial"
                    name="phone"
                    value={lead.phone}
                    onChange={onLeadChange}
                    placeholder="(541) 555-0123"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!canSubmit || submitting}
                  className="w-full bg-maroon hover:bg-red-700 text-white font-bold"
                >
                  {submitting ? "Submitting..." : "Email My Capital Plan"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {submitted ? (
                <p className="text-xs text-cream mt-4">
                  Sent. We will follow up with next steps and availability.
                </p>
              ) : (
                <p className="text-xs text-gray-300 mt-4">
                  We respect your inbox. No spam, no resale.
                </p>
              )}

              <div className="mt-6 border-t border-white/10 pt-5">
                <h4 className="text-sm font-semibold text-cream mb-3">
                  Agreement savings preview
                </h4>
                <div className="space-y-3 text-sm text-gray-200">
                  {[
                    { name: "Standard", discount: 0.1 },
                    { name: "Priority", discount: 0.15 },
                    { name: "Premier", discount: 0.2 },
                  ].map((tier) => (
                    <div key={tier.name} className="flex items-center gap-2">
                      <span className="font-semibold w-16">{tier.name}</span>
                      <span className="text-cream">
                        Save {Math.round(tier.discount * 100)}% ={" "}
                        {formatCurrency(annualRange.min * tier.discount)} –{" "}
                        {formatCurrency(annualRange.max * tier.discount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
