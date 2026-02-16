import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  DollarSign,
  Home,
  CheckCircle,
  ArrowRight,
  Calculator,
  MapPin,
  Download,
  FileText,
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

const BathroomRemodelROI = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Bathroom Remodel ROI Guide: Burns, Salem, Sweet Home & Mid-Valley",
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
      "Calculate bathroom remodel ROI in Oregon. Market data for Harney, Linn, Marion, Polk & Yamhill counties. Maximize resale value with smart renovations.",
  };
  const nextSteps = [
    {
      label: "bathroom remodels",
      to: "/bathroom-remodels",
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
        title="Bathroom Remodel ROI | Burns, Sweet Home, Salem, Albany"
        description="ROI guide for bathroom remodels in Oregon's Mid-Willamette Valley & Harney County. Cost vs. Value analysis for homeowners in Salem, Corvallis, Sweet Home."
        keywords="bathroom remodel ROI Oregon, remodeling cost vs value, bathroom renovation ROI, Harney County remodel costs, Mid-Willamette Valley renovation"
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
            Bathroom Remodel ROI in Oregon:
            <br />
            What Mid-Valley Homeowners Need to Know
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From budget updates in Sweet Home to luxury master baths in
            Salem—maximize your home's value across the Willamette Valley &
            Harney County.
          </p>
          <div className="max-w-lg mx-auto">
            <VisualBlock
              variant="clay"
              eyebrow="ROI Guide"
              title="Bathroom Remodel Returns"
              subtitle="Cost drivers, scope levels, and resale impact for Oregon homeowners."
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 prose prose-lg max-w-none text-gray-600 prose-headings:text-contractor-black prose-a:text-maroon">
            <p className="lead text-xl text-gray-700">
              A bathroom remodel is one of the safest investments you can make
              in your home, but the return varies significantly by location.
              What works for a ranch home in <strong>Burns (97720)</strong>{" "}
              might be different from a Victorian restoration in{" "}
              <strong>Albany</strong> or a modern update in{" "}
              <strong>Salem (97302)</strong>.
            </p>

            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </span>
              Local Market ROI: Cost vs. Value
            </h2>
            <p>
              According to regional data for the Pacific Northwest, midrange
              bathroom remodels typically recoup <strong>60-70%</strong> of
              their cost at resale. However, in high-demand markets like{" "}
              <strong>Corvallis</strong> or <strong>Newberg</strong>, strategic
              updates can see returns pushing 80% or more.
            </p>

            <div className="my-8 not-prose">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left font-bold text-gray-900 border-b">
                        Project Type
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
                      <td className="py-3 px-4 text-gray-700">
                        Cosmetic Update
                      </td>
                      <td className="py-3 px-4 text-gray-700">$5k - $15k</td>
                      <td className="py-3 px-4 text-green-600 font-bold">
                        75-90%
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Quick sale prep (e.g., Sweet Home starter homes)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">
                        Midrange Remodel
                      </td>
                      <td className="py-3 px-4 text-gray-700">$20k - $45k</td>
                      <td className="py-3 px-4 text-green-600 font-bold">
                        65-75%
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Aging homes in Salem/Albany
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">
                        Luxury/Master Suite
                      </td>
                      <td className="py-3 px-4 text-gray-700">$50k+</td>
                      <td className="py-3 px-4 text-green-600 font-bold">
                        55-65%
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Forever homes in West Salem/Corvallis
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">
                        Universal Design/ADA
                      </td>
                      <td className="py-3 px-4 text-gray-700">$15k - $35k</td>
                      <td className="py-3 px-4 text-green-600 font-bold">
                        Variable*
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        Aging-in-place (High value in retirement hubs like
                        Woodburn/Keizer)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                *ROI for ADA upgrades is measured in safety and independence
                rather than just resale dollars.
              </p>
            </div>

            <h2 className="mt-12">Case Studies: Mid-Valley Success Stories</h2>

            <div className="space-y-6 not-prose">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon">
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  The Sweet Home (97386) Refresh
                </h3>
                <p className="mb-2">
                  <strong>Challenge:</strong> A 1970s split-level with a pink
                  tile bathroom needed to compete on the market.
                </p>
                <p className="mb-2">
                  <strong>Solution:</strong> New LVP flooring, modern white
                  vanity, and reglazed tub.
                </p>
                <p>
                  <strong>Result:</strong> Spent $12,000. Home sold for $25k
                  over comparable non-renovated listings in Linn County.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon">
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  The Burns (97720) Accessibility Upgrade
                </h3>
                <p className="mb-2">
                  <strong>Challenge:</strong> An elderly couple in Harney County
                  wanted to stay in their home but couldn't use the tub safely.
                </p>
                <p className="mb-2">
                  <strong>Solution:</strong> Curbless walk-in shower conversion
                  with grab bars and heated floors (essential for high desert
                  winters).
                </p>
                <p>
                  <strong>Result:</strong> Homeowners avoided assisted living
                  costs, saving ~$60k/year.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-maroon">
                <h3 className="text-xl font-bold text-contractor-black mb-2">
                  The West Salem (97304) Master Suite
                </h3>
                <p className="mb-2">
                  <strong>Challenge:</strong> Creating a spa-like retreat in a
                  higher-end neighborhood.
                </p>
                <p className="mb-2">
                  <strong>Solution:</strong> Expanded footprint, soaking tub,
                  dual vanity with quartz tops.
                </p>
                <p>
                  <strong>Result:</strong> Increased appraised value by $45k,
                  recouping 70% of costs immediately while adding huge lifestyle
                  value.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">
              Service Areas: Harney, Linn, Marion, Polk & Yamhill Counties
            </h3>
            <p>
              Benson Home Solutions provides high-quality bathroom remodeling
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
                Start Your Remodel Today
              </h3>
              <p className="mb-6">
                Whether you're in Burns, Sweet Home, or Salem, we offer free
                estimates and design consultations.
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
                  to="/bathroom-remodels"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Bathroom Services
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
                <Link
                  to="/resources/ada-aging-in-place-guide"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    ADA / Aging in Place
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
              </nav>

              <hr className="my-6 border-gray-100" />

              <div className="bg-contractor-black text-white p-6 rounded-lg text-center">
                <h4 className="font-bold text-lg mb-2">Ready to Build?</h4>
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

export default BathroomRemodelROI;
