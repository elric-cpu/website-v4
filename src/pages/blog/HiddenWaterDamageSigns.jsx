import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Droplets,
  Search,
  AlertTriangle,
  Phone,
  CheckCircle,
  Home,
  MapPin,
  ChevronRight,
  FileCheck,
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

const HiddenWaterDamageSigns = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      "7 Signs of Hidden Water Damage in Harney & Willamette Valley Homes",
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
    datePublished: "2025-12-16",
    dateModified: "2025-12-16",
    description:
      "Don't let hidden leaks rot your home. Learn the 7 warning signs of water damage for homeowners in Burns, Sweet Home, Salem, and the Mid-Willamette Valley.",
  };
  const nextSteps = [
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Emergency response",
    },
    {
      ...SERVICE_PILLAR_LINKS.mold,
      cta: "Mold assessment",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Prevent repeat events",
    },
    {
      label: "request service",
      to: "/contact",
      description: "Get a documented scope and moisture assessment.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Hidden Water Damage Signs | Burns, Sweet Home, Salem, Albany"
        description="Learn the 7 subtle signs of hidden water damage. Serving Harney, Linn, Marion, Polk & Yamhill Counties. 24/7 Emergency Service available."
        schema={[schema]}
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
            <Droplets className="w-4 h-4" />
            Home Maintenance Guide
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            7 Hidden Signs of Water Damage in Oregon Homes
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From the high desert of Burns to the rainy Willamette Valley, catch
            leaks before they destroy your home.
          </p>
          <div className="max-w-lg mx-auto">
            <VisualBlock
              variant="slate"
              eyebrow="Homeowner Guide"
              title="Hidden Water Damage Signs"
              subtitle="Early detection prevents mold, rot, and insurance disputes."
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 prose prose-lg max-w-none text-gray-600 prose-headings:text-contractor-black prose-a:text-maroon">
            <p className="lead text-xl text-gray-700">
              Water damage is sneaky. By the time you see a puddle on the floor,
              the damage inside the walls might already be extensive. For
              homeowners in <strong>Harney County</strong> (Burns, Hines)
              battling frozen pipes, or those in the{" "}
              <strong>Mid-Willamette Valley</strong> (Sweet Home, Salem,
              Corvallis) dealing with relentless rain, early detection is
              critical.
            </p>
            <p>
              Here are the 7 warning signs that your home in{" "}
              <strong>Linn, Marion, Polk, or Yamhill County</strong> might have
              a hidden leak.
            </p>

            <h2 className="flex items-center gap-3 mt-8">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </span>
              Musty Odors That Won't Go Away
            </h2>
            <p>
              That "old basement smell" isn't normal—it's usually mold or mildew
              feeding on moisture. In humid areas like <strong>Albany</strong>{" "}
              or <strong>Independence</strong>, this is often the first sign of
              a slow leak behind drywall or under flooring.
            </p>

            <h2 className="flex items-center gap-3 mt-8">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                2
              </span>
              Peeling or Bubbling Paint
            </h2>
            <p>
              When water saturates drywall, it pushes the paint outward. If your
              walls in <strong>McMinnville</strong> or <strong>Newberg</strong>{" "}
              look like they have blisters, don't just paint over it. There is
              moisture behind that bubble.
            </p>

            <h2 className="flex items-center gap-3 mt-8">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                3
              </span>
              Unexplained Increase in Water Bills
            </h2>
            <p>
              If your usage hasn't changed but your bill in{" "}
              <strong>Salem</strong> or <strong>Keizer</strong> has spiked, you
              might have a continuous leak in a supply line, toilet flapper, or
              underground pipe.
            </p>

            <h2 className="flex items-center gap-3 mt-8">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                4
              </span>
              Warping Flooring
            </h2>
            <p>
              Laminate snapping? Hardwood cupping? Vinyl peeling? Water
              naturally flows to the lowest point. In{" "}
              <strong>Sweet Home</strong> or <strong>Lebanon</strong>, this
              often indicates a dishwasher or refrigerator line leak seeping
              into the subfloor.
            </p>

            <h2 className="flex items-center gap-3 mt-8">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                5
              </span>
              Mold on Baseboards or Corners
            </h2>
            <p>
              Mold needs moisture to grow. Finding spots of mold in corners of a
              room in <strong>Dallas</strong> or <strong>Monmouth</strong>{" "}
              suggests high humidity or a leak from the exterior (roof or siding
              failure).
            </p>

            <h2 className="flex items-center gap-3 mt-8">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                6
              </span>
              The Sound of Running Water
            </h2>
            <p>
              If the house is quiet and you hear a hiss or drip in{" "}
              <strong>Burns</strong> or <strong>Hines</strong>, check your
              crawlspace or walls immediately.
            </p>

            <h2 className="flex items-center gap-3 mt-8">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                7
              </span>
              Discoloration or Stains on Ceilings
            </h2>
            <p>
              Yellow or brown rings on your ceiling are a classic sign. In{" "}
              <strong>Silverton</strong> or <strong>Mount Angel</strong>, this
              often comes from roof leaks or upstairs bathroom failures.
            </p>

            <h3 className="text-2xl font-bold mt-12 mb-6">
              Regional Considerations
            </h3>
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <ul className="space-y-4">
                <li>
                  <strong>Harney County (Burns/Hines):</strong> Watch for signs
                  of frozen pipes thawing—often hidden inside exterior walls.
                  Listen for dripping sounds when the weather warms.
                </li>
                <li>
                  <strong>Willamette Valley (Salem/Albany/Corvallis):</strong>{" "}
                  High humidity accelerates mold growth. Hidden leaks turn into
                  black mold colonies much faster here than in the high desert.
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">
              Service Areas: Harney, Linn, Marion, Polk & Yamhill Counties
            </h3>
            <p>
              We provide water damage detection and restoration planning across
              the entire region:
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

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Think You Found a Leak?
              </h3>
              <p className="mb-4">
                Don't wait. Hidden water damage spreads fast. Benson Home
                Solutions offers professional moisture detection.
              </p>
              <Link to="/contact">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  Schedule an Inspection
                </Button>
              </Link>
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
                    Water Damage Restoration Services
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
                <Link
                  to="/resources/water-damage-restoration-guide"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Water Damage Guide
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
              </nav>

              <hr className="my-6 border-gray-100" />

              <div className="bg-contractor-black text-white p-6 rounded-lg text-center">
                <h4 className="font-bold text-lg mb-2">Need a Pro?</h4>
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
            subtitle="Move from warning signs to a documented response plan."
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

export default HiddenWaterDamageSigns;
