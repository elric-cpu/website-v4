import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Hammer,
  ClipboardList,
  CheckCircle,
  ThermometerSnowflake,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { getTownData, serviceAreaData } from "@/data/serviceAreas";
import VisualBlock from "@/components/VisualBlock";
import siteImages from "@/data/siteImages";

const ServiceArea = () => {
  const { region, town } = useParams();
  const townData = getTownData(region, town);

  if (!townData) {
    return <Navigate to="/" replace />;
  }

  const isHarney = region === "harney-county";
  const countyName =
    townData.county ||
    (isHarney ? "Harney County" : "Linn, Marion, Polk or Yamhill County");

  // Dynamic Content Generators
  const getRegionalRisks = () => {
    if (isHarney) {
      return (
        <>
          <p className="mb-4">
            In <strong>{townData.name}</strong> and the high desert climate of
            Harney County, the primary risk is freeze/thaw damage. Winter
            freezes can lead to burst pipes in exterior walls, crawlspaces, and
            attics.
          </p>
          <p>
            When pipes thaw, water can release quickly into wall cavities and
            flooring. We focus on fast extraction, structural drying, and
            moisture documentation to prevent secondary damage.
          </p>
        </>
      );
    }
    return (
      <>
        <p className="mb-4">
          Residents of <strong>{townData.name}</strong> know that the Willamette
          Valley's persistent rain and humidity create ongoing moisture risk.
          The primary concern is not just surface water, but moisture that
          lingers in materials.
        </p>
        <p>
          Seasonal flooding and groundwater saturation can lead to hidden
          moisture and mold after leaks. We use industrial dehumidification and
          monitoring tailored for Oregon conditions.
        </p>
      </>
    );
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Benson Home Solutions - ${townData.name}`,
    image: siteImages.ogDefaultAbsolute,
    address: {
      "@type": "PostalAddress",
      addressLocality: townData.name,
      addressRegion: "OR",
      postalCode: townData.zip,
      addressCountry: "US",
    },
    url: window.location.href,
    telephone: "+15413215115",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: {
      "@type": "City",
      name: townData.name,
    },
  };

  return (
    <>
      <SEO
        title={`${townData.name}, OR Maintenance Plans, Restoration & Repairs`}
        description={`Professional water damage restoration, mold remediation, maintenance plans, moisture control, and inspection repairs in ${townData.name}, OR (${townData.zip}). 24/7 emergency response. Licensed CCB# 258533.`}
        keywords={`${townData.name} OR water damage restoration, ${townData.name} maintenance plans, mold remediation ${townData.name}, moisture control ${townData.name}, inspection repairs ${townData.name}, emergency water removal ${townData.name}`}
        schema={schema}
        type="website"
      />

      {/* Hero Section */}
      <section className="bg-contractor-black text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <div
            className={`h-full w-full ${isHarney ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" : "bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700"}`}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            <MapPin className="w-4 h-4" />
            Serving {townData.name}, {townData.zip}
          </motion.div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            {townData.name}, OR Restoration, Maintenance & Repairs
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Licensed Oregon contractor providing water damage restoration, mold
            remediation, maintenance plans, and inspection repairs in{" "}
            {townData.name} and nearby communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button
                size="lg"
                className="bg-maroon hover:bg-red-700 text-white w-full sm:w-auto font-bold py-6 px-8 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                24/7 Emergency: (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-contractor-black w-full sm:w-auto font-bold py-6 px-8 text-lg"
              >
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8 space-y-16">
            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-6">
                Trusted Local Service in {townData.name}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  We serve homeowners and small facilities in{" "}
                  <strong>
                    {townData.name}, OR ({townData.zip})
                  </strong>
                  . Our work is documented, our scopes are clear, and our crews
                  are licensed and insured.
                </p>
                <p>
                  As a local contractor, we understand {countyName} and the
                  climate challenges of the{" "}
                  {isHarney ? "high desert" : "Willamette Valley"}. We focus on
                  durable repairs, clean job sites, and predictable scheduling.
                </p>
                <p>
                  In addition to restoration and inspection repairs, we provide
                  maintenance plans and moisture control solutions tailored to
                  Oregon homes.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 not-prose rounded-r-lg">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-900 text-lg">
                        24/7 Emergency Response in {townData.name}
                      </h4>
                      <p className="text-blue-800">
                        Water damage does not wait. We deploy quickly to stop
                        loss, dry structures, and document the scope for
                        insurance or out-of-pocket repairs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Grid */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-8">
                Our Services in {townData.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <Droplets className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Water Damage Restoration
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Rapid extraction, structural drying, and damage repairs. We
                    handle everything from burst pipes to flood cleanup.
                  </p>
                  <Link
                    to="/water-damage-restoration"
                    className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <ShieldCheck className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">Mold Remediation</h3>
                  <p className="text-gray-600 mb-4">
                    Safe containment and removal of mold spores. We identify the
                    moisture source to prevent future growth.
                  </p>
                  <Link
                    to="/mold-remediation"
                    className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <ClipboardList className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">Maintenance Plans</h3>
                  <p className="text-gray-600 mb-4">
                    Annual maintenance scopes, seasonal priorities, and budget
                    planning for Oregon homeowners.
                  </p>
                  <Link
                    to="/maintenance-plans"
                    className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-maroon transition-colors">
                  <Hammer className="w-8 h-8 text-maroon mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Inspection Repairs & Punch Lists
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Pre-sale repairs, inspection responses, and targeted fixes
                    delivered on a clear schedule.
                  </p>
                  <Link
                    to="/inspection-repairs"
                    className="text-maroon font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Regional Context */}
            <section className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                {isHarney ? (
                  <ThermometerSnowflake className="w-8 h-8 text-maroon" />
                ) : (
                  <Waves className="w-8 h-8 text-blue-600" />
                )}
                <h2 className="text-2xl font-bold text-contractor-black m-0">
                  Regional Risks:{" "}
                  {isHarney ? "Extreme Cold" : "Moisture & Mold"}
                </h2>
              </div>
              <div className="prose prose-lg text-gray-700">
                {getRegionalRisks()}
                <p className="mt-4 font-semibold">
                  We are familiar with {townData.name}'s local building
                  regulations and common architectural styles, ensuring every
                  repair meets code and maintains your home's character.
                </p>
              </div>
            </section>

            {/* Insurance Section */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-6">
                Insurance Claims in {townData.name}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  Dealing with insurance claims can be stressful. At Benson Home
                  Solutions, we work for <strong>you</strong>, not the insurance
                  company. We use industry-standard Xactimate software to ensure
                  your claim in {townData.name} is accurately valued.
                </p>
                <ul className="list-none pl-0 space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <span>
                      <strong>Direct Billing:</strong> We bill your insurance
                      carrier directly, so you don't have to float the costs.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <span>
                      <strong>Documentation:</strong> We provide comprehensive
                      photo logs and moisture readings required by adjusters.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <span>
                      <strong>Representation:</strong> We meet adjusters on-site
                      at your {townData.name} property to ensure no damage is
                      overlooked.
                    </span>
                  </li>
                </ul>
                <Link to="/resources">
                  <Button
                    variant="outline"
                    className="border-maroon text-maroon hover:bg-maroon hover:text-white"
                  >
                    Learn About Homeowner Rights
                  </Button>
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl font-bold text-contractor-black mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-contractor-black">
                    How fast can you get to {townData.name}?
                  </h4>
                  <p className="text-gray-600 mt-2">
                    For emergencies, we dispatch immediately. Our response times
                    are among the fastest in the region because we are locally
                    based, not dispatching from Portland.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-contractor-black">
                    Are you licensed to work in {townData.name}?
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Yes. We hold Oregon CCB# 258533, which covers all
                    residential and commercial work in {townData.name} and the
                    entire state of Oregon.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-contractor-black">
                    Do you offer free estimates?
                  </h4>
                  <p className="text-gray-600 mt-2">
                    Yes. Whether it is a maintenance plan kickoff, inspection
                    repairs, or water damage assessment in {townData.name}, our
                    initial estimates are complimentary.
                  </p>
                </div>
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <VisualBlock
              variant={isHarney ? "slate" : "moss"}
              eyebrow="Local Service Area"
              title={`${townData.name}, OR`}
              subtitle={`Licensed, bonded, and insured service across ${countyName}.`}
            />
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-contractor-black mb-4">
                Quick Actions
              </h3>

              <div className="bg-maroon text-white p-6 rounded-lg text-center mb-6">
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold text-lg mb-1">Emergency?</h4>
                <p className="text-sm text-white/90 mb-4">
                  24/7 Response for {townData.name}
                </p>
                <a
                  href="tel:5413215115"
                  className="block w-full py-3 bg-white text-maroon rounded font-bold hover:bg-gray-100 transition-colors"
                >
                  (541) 321-5115
                </a>
              </div>

              <nav aria-label="Service area actions" className="space-y-3">
                <Link
                  to="/contact"
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded font-semibold text-contractor-black transition-colors"
                >
                  Request Free Estimate
                </Link>
                <Link
                  to={
                    isHarney
                      ? "/service-areas/harney-county"
                      : "/service-areas/mid-willamette-valley"
                  }
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded font-semibold text-contractor-black transition-colors"
                >
                  View Service Area Hub
                </Link>
                <Link
                  to="/services"
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded font-semibold text-contractor-black transition-colors"
                >
                  View All Services
                </Link>
                <Link
                  to="/resources/calculators"
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded font-semibold text-contractor-black transition-colors"
                >
                  Maintenance & ROI Tools
                </Link>
              </nav>

              {isHarney && (
                <div className="mt-8 border-t pt-6">
                  <p className="text-sm text-center text-gray-500 mb-2">
                    Proud Member
                  </p>
                  <a
                    href="https://www.harneycountychamber.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center font-bold text-maroon hover:underline"
                  >
                    Harney County Chamber of Commerce
                  </a>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-contractor-black mb-4">
                Other {countyName} Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {isHarney
                  ? serviceAreaData["harney-county"].towns.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/service-areas/harney-county/${t.slug}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {t.name}
                      </Link>
                    ))
                  : serviceAreaData["mid-valley"].counties[
                      townData.county?.toLowerCase().split(" ")[0]
                    ]?.towns.map((t) => (
                      <Link
                        key={t.slug}
                        to={`/service-areas/mid-valley/${t.slug}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {t.name},
                      </Link>
                    ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default ServiceArea;
