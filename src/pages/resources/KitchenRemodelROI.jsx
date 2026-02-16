import React from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  DollarSign,
  Home,
  CheckCircle,
  ArrowRight,
  Calculator,
  MapPin,
  TrendingUp,
  LayoutDashboard,
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

const KitchenRemodelROI = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Kitchen Remodel ROI Guide: Burns, Salem, Sweet Home & Mid-Valley",
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
      "Calculate kitchen remodel ROI in Oregon. Market data for Harney, Linn, Marion, Polk & Yamhill counties. Maximize resale value with smart kitchen renovations.",
  };
  const nextSteps = [
    {
      label: "kitchen remodels",
      to: "/kitchen-remodels",
      description: "Scope planning and professional remodeling.",
      intent: "service",
      cta: "Explore remodels",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Protect the investment",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Bundle repairs",
    },
    {
      label: "request a remodel scope",
      to: "/contact",
      description: "Confirm budget, finishes, and scheduling.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  return (
    <>
      <SEO
        title="Kitchen Remodel ROI | Burns, Sweet Home, Salem, Albany"
        description="ROI guide for kitchen remodels in Oregon's Mid-Willamette Valley & Harney County. Cost vs. Value analysis for homeowners in Salem, Corvallis, Sweet Home."
        keywords="kitchen remodel ROI Oregon, remodeling cost vs value, kitchen renovation ROI, Mid-Willamette Valley remodel costs, Harney County renovation"
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
            <TrendingUp className="w-4 h-4" />
            Investment Guide
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Kitchen Remodel ROI in Oregon:
            <br />
            Investing in the Heart of the Home
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From farmhouse kitchens in Lebanon to modern chef's kitchens in
            Newberg—maximize your home's value across the Willamette Valley &
            Harney County.
          </p>
          <div className="max-w-lg mx-auto">
            <VisualBlock
              variant="moss"
              eyebrow="ROI Guide"
              title="Kitchen Remodel Returns"
              subtitle="Scope, materials, and layout choices that protect resale value."
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 prose prose-lg max-w-none text-gray-600 prose-headings:text-contractor-black prose-a:text-maroon">
            <p className="lead text-xl text-gray-700">
              The kitchen is the king of the home. In real estate markets from{" "}
              <strong>Salem</strong> to <strong>Burns</strong>, it's the single
              most influential room for buyers. But not all kitchen remodels
              offer the same return on investment (ROI).
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </span>
              Local Market Data: What Buyers Want
            </h2>
            <p>
              In the Pacific Northwest, a minor kitchen remodel typically
              recoups about <strong>72-80%</strong> of its cost. However,
              over-improving for your specific neighborhood (like putting a
              $100k kitchen in a starter home in <strong>Sweet Home</strong>)
              can lower that percentage.
            </p>

            <div className="my-8 not-prose">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-bold text-gray-900 border-b">
                        Remodel Scale
                      </th>
                      <th className="py-3 px-4 text-left font-bold text-gray-900 border-b">
                        Avg. Cost (Mid-Valley)
                      </th>
                      <th className="py-3 px-4 text-left font-bold text-gray-900 border-b">
                        Est. ROI
                      </th>
                      <th className="py-3 px-4 text-left font-bold text-gray-900 border-b">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Minor Update</td>
                      <td className="py-3 px-4 text-gray-700">$15k - $30k</td>
                      <td className="py-3 px-4 text-green-600 font-bold">
                        75-85%
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Cabinet refacing, new appliances (Common in
                        Keizer/Dallas)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">
                        Major Midrange
                      </td>
                      <td className="py-3 px-4 text-gray-700">$40k - $75k</td>
                      <td className="py-3 px-4 text-green-600 font-bold">
                        55-65%
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Full gut, island addition (Common in Salem/Corvallis)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Upscale Major</td>
                      <td className="py-3 px-4 text-gray-700">$80k+</td>
                      <td className="py-3 px-4 text-green-600 font-bold">
                        50-55%
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Luxury homes in Wine Country (Newberg/Dundee)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="mt-12">Case Studies: Mid-Valley Transformations</h2>

            <div className="space-y-6 not-prose">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon">
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  The Lebanon (97355) Farmhouse
                </h3>
                <p className="mb-2">
                  <strong>Goal:</strong> Open up a cramped 1940s kitchen for a
                  growing family.
                </p>
                <p className="mb-2">
                  <strong>Project:</strong> Removed a load-bearing wall,
                  installed shaker cabinets, and butcher block island.
                </p>
                <p>
                  <strong>Result:</strong> Created a "great room" feel that is
                  highly desirable in Linn County.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon">
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  The Salem (97302) Rental Refresh
                </h3>
                <p className="mb-2">
                  <strong>Goal:</strong> Update a rental property to increase
                  monthly income.
                </p>
                <p className="mb-2">
                  <strong>Project:</strong> Durable LVP flooring, quartz
                  countertops (low maintenance), new lighting.
                </p>
                <p>
                  <strong>Result:</strong> Rented within 3 days for $300/mo more
                  than previous lease.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon">
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  The Burns (97720) Functional Update
                </h3>
                <p className="mb-2">
                  <strong>Goal:</strong> Modernize functionality while keeping
                  rural charm.
                </p>
                <p className="mb-2">
                  <strong>Project:</strong> Custom pantry storage, new
                  energy-efficient appliances, improved lighting.
                </p>
                <p>
                  <strong>Result:</strong> Vastly improved usability for
                  homeowners who cook daily.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">
              Service Areas: Harney, Linn, Marion, Polk & Yamhill Counties
            </h3>
            <p>
              Benson Home Solutions transforms kitchens across the entire
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

            <div className="bg-maroon/10 p-8 rounded-lg text-center mt-12">
              <h3 className="text-2xl font-bold text-maroon mb-4">
                Build Your Dream Kitchen
              </h3>
              <p className="mb-6">
                We provide free, detailed estimates for projects in Salem,
                Burns, Sweet Home, and beyond.
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
                    Request Quote Online
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
                  to="/kitchen-remodels"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Kitchen Services
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
                <Link
                  to="/inspection-repairs"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Inspection Repairs
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
              </nav>

              <hr className="my-6 border-gray-100" />

              <div className="bg-contractor-black text-white p-6 rounded-lg text-center">
                <h4 className="font-bold text-lg mb-2">Ready to Start?</h4>
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
            subtitle="Turn ROI research into a scoped remodel plan."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[2],
              TOP_TOOL_LINKS[0],
              TOP_TOOL_LINKS[1],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Budget, replacement timing, and ROI planning tools."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>
    </>
  );
};

export default KitchenRemodelROI;
