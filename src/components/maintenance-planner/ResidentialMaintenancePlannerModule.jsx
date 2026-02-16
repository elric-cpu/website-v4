import React, { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { submitResidentialMaintenanceLead } from "@/lib/residentialMaintenance/submitResidentialMaintenanceLead";
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
  if (age < 15) return 0.9;
  if (age < 30) return 1;
  if (age < 50) return 1.2;
  return 1.4;
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
    "Ice dam checks and attic air-sealing",
    "Pipe freeze protection at exterior walls",
    "Roof inspection after freeze/thaw",
    "Gutter clean-out before first freeze",
  ],
  mixed: [
    "Spring HVAC tune-up and condensate flush",
    "Exterior caulk/seal touch-ups",
    "Fall gutter clean-out and downspout test",
    "Chimney and flue inspection",
  ],
  warm: [
    "HVAC coil cleaning and drain line flush",
    "Moisture/mold checks in crawlspaces",
    "Roof membrane inspection after heat",
    "Termite and pest control sweep",
  ],
};

export default function ResidentialMaintenancePlannerModule() {
  const [zip, setZip] = useState("");
  const [squareFeet, setSquareFeet] = useState(2200);
  const [homeAge, setHomeAge] = useState(25);
  const [roofType, setRoofType] = useState("asphalt");
  const [hvacAge, setHvacAge] = useState(12);
  const [climateBand, setClimateBand] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });

  const regionalFactor = useMemo(() => getOregonCostFactor(zip), [zip]);
  const regionalLabel = useMemo(() => getOregonCostRegion(zip), [zip]);
  const ageFactor = useMemo(() => getAgeFactor(Number(homeAge)), [homeAge]);
  const annualRange = useMemo(() => {
    const sqft = Number(squareFeet) || 0;
    const min = sqft * 1.0 * ageFactor * regionalFactor;
    const max = sqft * 2.5 * ageFactor * regionalFactor;
    return { min, max };
  }, [squareFeet, ageFactor, regionalFactor]);

  const monthlyRange = useMemo(
    () => ({
      min: annualRange.min / 12,
      max: annualRange.max / 12,
    }),
    [annualRange],
  );

  const climate = useMemo(
    () => climateBand || inferClimateBand(zip),
    [climateBand, zip],
  );

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
      await submitResidentialMaintenanceLead({
        type: "residential_zip_smart_planner",
        timestamp: new Date().toISOString(),
        zip,
        square_feet: Number(squareFeet) || null,
        home_age: Number(homeAge) || null,
        roof_type: roofType,
        hvac_age: Number(hvacAge) || null,
        climate_band: climate,
        ...lead,
        page_path: window?.location?.pathname,
        user_agent: navigator?.userAgent,
      });

      setSubmitted(true);
      toast({
        title: "Plan unlocked",
        description:
          "Thanks. We will send your 5-year forecast and follow up shortly.",
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs text-gray-500 m-0 mb-4">
              ZIP code adjusted planning preview (regional factor confirmed at
              enrollment).
            </p>

            <h2 className="text-3xl font-bold text-contractor-black mb-3">
              Home Maintenance Planner
            </h2>
            <p className="text-restoration-gray mb-6">
              Build a realistic annual maintenance budget and seasonal
              priorities for Oregon homeowners. Older homes get end-of-life
              flags for key systems.
            </p>

            <div className="bg-cream border border-cream rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP code</Label>
                  <Input
                    id="zip"
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
                  <Label htmlFor="sqft">Square footage</Label>
                  <Input
                    id="sqft"
                    type="number"
                    min="500"
                    value={squareFeet}
                    onChange={(e) => setSquareFeet(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Home age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    value={homeAge}
                    onChange={(e) => setHomeAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roof">Roof type</Label>
                  <select
                    id="roof"
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
                  >
                    <option value="asphalt">Asphalt shingles</option>
                    <option value="metal">Metal</option>
                    <option value="tile">Tile/Slate</option>
                    <option value="tpo">TPO/EPDM (flat)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hvac">HVAC age (if known)</Label>
                  <Input
                    id="hvac"
                    type="number"
                    min="0"
                    value={hvacAge}
                    onChange={(e) => setHvacAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="climate">Climate band</Label>
                  <select
                    id="climate"
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
                    Monthly: {formatCurrency(monthlyRange.min)} –{" "}
                    {formatCurrency(monthlyRange.max)}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-500 m-0">
                    Age factor applied
                  </p>
                  <p className="text-2xl font-bold text-contractor-black mt-2 mb-1">
                    {ageFactor.toFixed(2)}x
                  </p>
                  <p className="text-xs text-gray-500 m-0">
                    Older homes require more frequent small repairs.
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
                  End-of-life watchlist (if original to the home)
                </h3>
                <ul className="space-y-2 text-sm text-restoration-gray">
                  {homeAge >= 20 ? (
                    <li>Asphalt roof and flashing are often near renewal.</li>
                  ) : null}
                  {hvacAge >= 10 ? (
                    <li>HVAC efficiency drops; plan for replacement.</li>
                  ) : null}
                  {homeAge >= 10 ? (
                    <li>Water heater often approaches replacement window.</li>
                  ) : null}
                  {homeAge >= 40 ? (
                    <li>
                      Original plumbing and wiring can need upgrades or partial
                      repipes.
                    </li>
                  ) : null}
                  {homeAge < 10 && hvacAge < 10 ? (
                    <li>
                      Major systems likely mid-life. Focus on preventative
                      checks.
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
                    Unlock the 5-year forecast
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-200 mb-6">
                Receive a ZIP code adjusted replacement timeline, a line item
                budget, and a membership savings estimate.
              </p>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-name" className="text-cream">
                    Name
                  </Label>
                  <Input
                    id="lead-name"
                    name="name"
                    value={lead.name}
                    onChange={onLeadChange}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-email" className="text-cream">
                    Email
                  </Label>
                  <Input
                    id="lead-email"
                    name="email"
                    type="email"
                    value={lead.email}
                    onChange={onLeadChange}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-phone" className="text-cream">
                    Phone (optional)
                  </Label>
                  <Input
                    id="lead-phone"
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
                  {submitting ? "Submitting..." : "Email My Forecast"}
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
                  Membership savings preview
                </h4>
                <div className="space-y-3 text-sm text-gray-200">
                  {[
                    { name: "Core", discount: 0.1 },
                    { name: "Plus", discount: 0.15 },
                    { name: "Pro", discount: 0.2 },
                  ].map((tier) => (
                    <div key={tier.name} className="flex items-center gap-2">
                      <span className="font-semibold w-12">{tier.name}</span>
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
