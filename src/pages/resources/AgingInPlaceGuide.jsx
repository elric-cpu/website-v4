import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Home,
  CheckCircle,
  ArrowRight,
  Accessibility,
  MapPin,
  ShieldCheck,
  UserCheck,
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

const AgingInPlaceGuide = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Aging in Place Guide: Accessible Home Modifications in Oregon",
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
      "Comprehensive guide to ADA home modifications and aging in place in Oregon. Serving seniors in Salem, Burns, Sweet Home, and the Willamette Valley.",
  };
  const nextSteps = [
    {
      label: "accessibility retrofits",
      to: "/accessibility-retrofits",
      description: "Safety-first upgrades with documented scopes.",
      intent: "service",
      cta: "Explore retrofits",
    },
    {
      label: "bathroom remodels",
      to: "/bathroom-remodels",
      description: "Curbless showers and safer bathroom layouts.",
      intent: "service",
      cta: "Plan remodels",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Protect the home",
    },
    {
      label: "request a safety walkthrough",
      to: "/contact",
      description: "Get a prioritized accessibility scope.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Aging in Place & ADA Guide | Burns, Sweet Home, Salem, Albany"
        description="Expert guide to accessible home remodeling in Oregon. Grab bars, ramps, walk-in showers for Harney, Linn, Marion, Polk & Yamhill Counties."
        keywords="aging in place guide Oregon, accessibility upgrades, ADA home modifications, senior home safety checklist, grab bar placement"
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
            <Heart className="w-4 h-4" />
            Accessibility Guide
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Aging in Place in Oregon:
            <br />
            Safe, Comfortable Living at Home
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Practical modifications for seniors wishing to stay in their homes
            across Harney County and the Mid-Willamette Valley.
          </p>
          <div className="max-w-lg mx-auto">
            <VisualBlock
              variant="moss"
              eyebrow="Aging In Place"
              title="Safe, Accessible Upgrades"
              subtitle="Curbless showers, safer entries, and confidence at home."
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 prose prose-lg max-w-none text-gray-600 prose-headings:text-contractor-black prose-a:text-maroon">
            <p className="lead text-xl text-gray-700">
              Most Oregonians want to age in their own homes. Whether you're in
              a rural property in <strong>Burns (97720)</strong> or a retirement
              community in <strong>Woodburn (97071)</strong>, the key to
              independence is preparing your home before mobility becomes an
              issue.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </span>
              Essential Modifications for Safety
            </h2>
            <p>
              In our experience serving clients from <strong>Sweet Home</strong>{" "}
              to <strong>Newberg</strong>, these are the most critical upgrades:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-contractor-black text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-maroon" /> Bathroom
                  Safety
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Curbless walk-in showers (no tripping hazard)</li>
                  <li>• Comfort-height toilets (easier to stand up)</li>
                  <li>• Reinforced grab bars (not suction cup!)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-contractor-black text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-maroon" /> Entry &
                  Mobility
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    • Wheelchair ramps (crucial for raised foundations in{" "}
                    <strong>Albany</strong>)
                  </li>
                  <li>• Widened doorways (32"+ clearance)</li>
                  <li>
                    • Lever-style door handles (easier for arthritic hands)
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12">Regional Considerations for Seniors</h2>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mb-6 not-prose">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Harney County (Burns/Hines)
              </h3>
              <p>
                Severe winters mean slippery walkways. Heated ramps or covered
                entries are vital for seniors to ensure emergency services can
                access the home safely in snow.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600 mb-6 not-prose">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Marion/Polk Counties (Salem/Dallas)
              </h3>
              <p>
                Many older homes in <strong>Salem</strong> have bedrooms
                upstairs. Converting a ground-floor den into a master suite is a
                top request for aging-in-place clients here.
              </p>
            </div>

            <h2 className="mt-12">Case Studies</h2>
            <div className="space-y-6 not-prose">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon">
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  The Sweet Home (97386) Ramp
                </h3>
                <p>
                  <strong>Challenge:</strong> A homeowner returning from surgery
                  couldn't navigate the 4 steps to their porch.
                </p>
                <p>
                  <strong>Solution:</strong> We built a custom ADA-compliant
                  wooden ramp that matched the home's exterior style.
                </p>
                <p>
                  <strong>Result:</strong> Regained independence and ability to
                  leave the house safely.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">
              Service Areas: Harney, Linn, Marion, Polk & Yamhill Counties
            </h3>
            <p>
              Benson Home Solutions helps seniors stay safe in their homes
              across the entire region:
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

            <div className="bg-maroon/10 p-8 rounded-lg text-center mt-12">
              <h3 className="text-2xl font-bold text-maroon mb-4">
                Plan for the Future Today
              </h3>
              <p className="mb-6">
                We specialize in accessible design that looks beautiful, not
                institutional. Free consultations available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:5413215115">
                  <Button
                    size="lg"
                    className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto"
                  >
                    Call (541) 321-5115
                  </Button>
                </a>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white w-full sm:w-auto"
                  >
                    Contact Us
                  </Button>
                </Link>
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
                  to="/bathroom-remodels"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Bathroom Remodels
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
                <Link
                  to="/inspection-repairs"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Home Additions
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
              </nav>

              <hr className="my-6 border-gray-100" />

              <div className="bg-contractor-black text-white p-6 rounded-lg text-center">
                <h4 className="font-bold text-lg mb-2">Need Advice?</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Serving Harney, Linn, Marion, Polk & Yamhill Counties.
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
            subtitle="Connect accessibility planning to a documented scope and schedule."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[0],
              TOP_TOOL_LINKS[2],
              TOP_TOOL_LINKS[1],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Budget ranges and maintenance planning tools."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>
    </>
  );
};

export default AgingInPlaceGuide;
