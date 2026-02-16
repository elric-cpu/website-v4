import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets,
  ShieldAlert,
  FileText,
  Phone,
  CheckCircle,
  Download,
  MapPin,
  ArrowRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import siteImages from "@/data/siteImages";
import VisualBlock from "@/components/VisualBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const WaterDamageMitigationGuide = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Water Damage Restoration Guide: Burns, Salem, Sweet Home & Mid-Valley",
    image: siteImages.ogDefaultAbsolute,
    author: {
      "@type": "Organization",
      name: "Benson Home Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "Benson Home Solutions",
      logo: {
        "@type": "ImageObject",
        url: siteImages.logoAbsolute,
      },
    },
    datePublished: "2025-01-15",
    description:
      "Comprehensive guide to water damage restoration in Oregon. Steps to take immediately for homeowners in Harney, Linn, Marion, Polk & Yamhill counties.",
  };
  const nextSteps = [
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Emergency response",
    },
    {
      ...SERVICE_PILLAR_LINKS.mold,
      cta: "Address mold risk",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Prevent repeat events",
    },
    {
      label: "request service",
      to: "/contact",
      description: "Start mitigation with documented scope and photo logs.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Water Damage Restoration Guide | Burns, Sweet Home, Salem, Albany"
        description="Immediate steps for water damage in Oregon's Mid-Willamette Valley & Harney County. Free guide for homeowners in Salem, Corvallis, Sweet Home."
        keywords="water damage restoration guide, emergency water damage steps, insurance documentation water damage, restoration timeline Oregon, water extraction checklist"
        schema={schema}
        type="article"
        image={siteImages.ogDefault}
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <ShieldAlert className="w-4 h-4" />
            Emergency Guide
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Oregon Homeowner's Guide to Water Damage Restoration
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            What to do in the first 24 hours to save your home in Harney, Linn,
            Marion, Polk & Yamhill Counties.
          </p>
          <div className="bg-red-600/20 border border-red-500/50 p-4 rounded-lg inline-block backdrop-blur-sm">
            <p className="flex items-center justify-center gap-2 font-bold text-red-100">
              <Phone className="w-5 h-5" />
              24/7 Emergency Line: (541) 321-5115
            </p>
          </div>
          <div className="max-w-lg mx-auto mt-8">
            <VisualBlock
              variant="slate"
              eyebrow="Emergency Guide"
              title="First 24 Hours"
              subtitle="Immediate steps to reduce damage and support insurance documentation."
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 prose prose-lg max-w-none text-gray-600 prose-headings:text-contractor-black prose-a:text-maroon">
            <p className="lead text-xl text-gray-700">
              Water damage doesn't wait. In the high desert of{" "}
              <strong>Burns</strong>, a frozen pipe can flood a home in minutes
              once it thaws. In the rainy{" "}
              <strong>Willamette Valley (Salem, Albany, Corvallis)</strong>, a
              roof leak or sump pump failure can lead to mold within 48 hours.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </span>
              Immediate Steps (First 4 Hours)
            </h2>
            <ul className="list-none pl-0 space-y-4">
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-maroon flex-shrink-0" />
                <span>
                  <strong>Shut Off Water:</strong> Locate your main water
                  shut-off valve now, before an emergency happens.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-maroon flex-shrink-0" />
                <span>
                  <strong>Safety Check:</strong> If water has reached electrical
                  outlets or your breaker panel, <em>leave immediately</em>.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-maroon flex-shrink-0" />
                <span>
                  <strong>Call a Pro:</strong> Call Benson Home Solutions at
                  (541) 321-5115. We serve the entire region from{" "}
                  <strong>Hines</strong> to <strong>Newberg</strong>.
                </span>
              </li>
            </ul>

            <h2 className="mt-12">Regional Risks: Know Your Enemy</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-bold text-blue-900 text-lg mb-3">
                  Harney County (Burns/Hines)
                </h3>
                <p className="text-sm">
                  <strong>Primary Risk:</strong> Freeze/Thaw Cycles.
                </p>
                <p className="text-sm mt-2">
                  Pipes in exterior walls are vulnerable when temps drop below
                  zero. Restoration must involve rapid structural drying before
                  water refreezes or causes dry rot.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="font-bold text-green-900 text-lg mb-3">
                  Willamette Valley (Salem/Corvallis)
                </h3>
                <p className="text-sm">
                  <strong>Primary Risk:</strong> Humidity & Mold.
                </p>
                <p className="text-sm mt-2">
                  With high ambient humidity, natural evaporation is slow.
                  Professional dehumidifiers are mandatory in towns like{" "}
                  <strong>Lebanon</strong> and <strong>McMinnville</strong> to
                  prevent black mold.
                </p>
              </div>
            </div>

            <h2 className="mt-12">Case Studies</h2>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon mb-6 not-prose">
              <h3 className="text-xl font-bold text-contractor-black mb-2">
                The Sweet Home (97386) Basement Flood
              </h3>
              <p>
                <strong>Situation:</strong> Sump pump failure during a heavy
                storm flooded a finished basement.
              </p>
              <p>
                <strong>Action:</strong> Benson Home Solutions arrived in 90
                minutes, extracted standing water, and removed wet carpet pad.
              </p>
              <p>
                <strong>Outcome:</strong> Walls were saved using cavity drying
                injection, saving the homeowner $15,000 in reconstruction costs.
              </p>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">
              Service Areas: Harney, Linn, Marion, Polk & Yamhill Counties
            </h3>
            <p>
              We provide emergency water damage restoration 24/7 to the entire
              region:
            </p>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Harney County
                </h4>
                <p className="text-gray-600">Burns (97720), Hines (97738)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Linn County
                </h4>
                <p className="text-gray-600">
                  Sweet Home (97386), Lebanon (97355), Brownsville (97327),
                  Halsey (97348), Harrisburg (97446), Scio (97374), Tangent
                  (97389), Waterloo (97489), Crabtree (97335), Jefferson
                  (97352), Lacomb (97336), Shedd (97377), Sodaville, Lyons
                  (97358), Mill City (97360), Gates (97346), Detroit (97342).
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Marion County
                </h4>
                <p className="text-gray-600">
                  Salem (97301-97317), Keizer (97303), Silverton (97381), Turner
                  (97392), Stayton (97383), Sublimity (97385), Aumsville
                  (97325), Scotts Mills (97375), Mount Angel (97362), Gervais
                  (97026), Woodburn (97071), Hubbard (97032), Canby (97013),
                  Oregon City (97045), Molalla (97038).
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Polk & Yamhill Counties
                </h4>
                <p className="text-gray-600">
                  Corvallis (97330), Monmouth (97361), Independence (97351),
                  Dallas (97338), Polk City (97344), Rickreall (97371), Falls
                  City, Grand Ronde (97347), McMinnville (97128), Newberg
                  (97132), Dundee (97115), Carlton (97111), Dayton (97114),
                  Amity (97101), Willamina (97396), Sheridan (97378).
                </p>
              </div>
            </div>

            <div className="bg-maroon text-white p-8 rounded-lg text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">Don't Wait for Mold</h3>
              <p className="mb-6 text-white/90">
                If you have standing water in your home anywhere in the
                Mid-Willamette Valley or Harney County, call us immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:5413215115">
                  <Button
                    size="lg"
                    className="bg-white text-maroon hover:bg-gray-100 w-full sm:w-auto font-bold"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    (541) 321-5115
                  </Button>
                </a>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-contractor-black mb-4">
                Quick Links
              </h3>
              <nav aria-label="Quick links" className="space-y-3">
                <Link
                  to="/water-damage-restoration"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Our Restoration Services
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
                <Link
                  to="/blog/water-damage-insurance-oregon"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Insurance Claims Guide
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
              </nav>

              <hr className="my-6 border-gray-100" />

              <div className="bg-contractor-black text-white p-6 rounded-lg text-center">
                <h4 className="font-bold text-lg mb-2">Emergency?</h4>
                <p className="text-sm text-gray-300 mb-4">
                  24/7 Response across Harney, Linn, Marion, Polk & Yamhill
                  Counties.
                </p>
                <a
                  href="tel:5413215115"
                  className="block w-full py-3 bg-maroon rounded font-bold hover:bg-white hover:text-maroon transition-colors"
                >
                  (541) 321-5115
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Move from emergency guidance to a documented response plan."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[2],
              TOP_TOOL_LINKS[1],
              TOP_TOOL_LINKS[0],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Estimate budgets, replacement timing, and repair scope."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>
    </>
  );
};

export default WaterDamageMitigationGuide;
