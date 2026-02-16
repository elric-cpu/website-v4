import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  Home,
  ChevronRight,
  HelpCircle,
  FileCheck,
  MapPin,
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

const WaterDamageInsuranceOregon = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      "How Insurance Works for Water Damage Restoration in Harney, Linn, Marion, Polk & Yamhill Counties",
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
      "Complete guide to water damage insurance coverage in Oregon. Learn claims processes for Burns, Sweet Home, Salem, Albany, Corvallis, and the entire Mid-Willamette Valley.",
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
      description: "Get documentation-ready scopes and photo logs.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does standard homeowner's insurance cover water damage in Oregon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generally, yes, if the water damage is 'sudden and accidental' (like a burst pipe in Burns or appliance failure in Salem). Gradual damage from leaks or lack of maintenance is typically excluded.",
        },
      },
      {
        "@type": "Question",
        name: "Is flood damage covered by homeowners insurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Flood damage (rising water from rivers like the Willamette or Silvies) requires a separate flood insurance policy.",
        },
      },
      {
        "@type": "Question",
        name: "What should I do first if I find water damage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stop the water source if safe, call a professional restoration company like Benson Home Solutions immediately to prevent secondary damage, and then contact your insurance agent.",
        },
      },
      {
        "@type": "Question",
        name: "Do I have to use the restoration company my insurance suggests?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. In Oregon, you have the right to choose your own licensed contractor. Benson Home Solutions works directly with all major insurance carriers to ensure your interests are protected.",
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="Water Damage Insurance Claims | Burns, Sweet Home, Salem, Albany"
        description="Complete guide to water damage insurance coverage in Oregon. Learn what's covered, how to file claims, and how to work with your insurer in Harney & Willamette Valley counties."
        schema={[schema, faqSchema]}
        type="article"
        image={siteImages.ogDefault}
      />

      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-contractor-black text-white py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <ShieldCheck className="w-4 h-4" />
            Insurance Guide
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            How Insurance Works for Water Damage Restoration in the
            Mid-Willamette Valley & Harney County
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Navigating claims for burst pipes and flooding from Burns to Sweet
            Home, Salem to Corvallis, and everywhere in between.
          </p>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg inline-block">
            <p className="flex items-center justify-center gap-2 text-sm font-medium">
              <Phone className="w-4 h-4 text-maroon" />
              <span>Need emergency help? Call 24/7: </span>
              <a
                href="tel:5413215115"
                className="text-maroon font-bold hover:underline"
              >
                (541) 321-5115
              </a>
            </p>
          </div>
          <div className="max-w-lg mx-auto mt-8">
            <VisualBlock
              variant="slate"
              eyebrow="Insurance Guide"
              title="Coverage, Claims, Documentation"
              subtitle="Understand coverage, avoid claim delays, and document correctly."
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <article className="lg:col-span-8 prose prose-lg max-w-none text-gray-600 prose-headings:text-contractor-black prose-a:text-maroon">
            {/* Introduction */}
            <p className="lead text-xl text-gray-700">
              Water damage is consistently the second most common home insurance
              claim in the United States. For homeowners across Oregon—from the
              high desert winters of <strong>Harney County</strong> (Burns,
              Hines) to the humid river valleys of{" "}
              <strong>Linn, Marion, Polk, and Yamhill Counties</strong>
              —understanding your coverage isn't just paperwork; it's about
              protecting your biggest investment.
            </p>
            <p>
              When a pipe bursts at 2 AM in <strong>Sweet Home (97386)</strong>{" "}
              or a dishwasher floods your kitchen in{" "}
              <strong>Salem (97301)</strong>, panic often sets in.{" "}
              <em>
                "Is this covered?" "Who do I call first?" "Will my premiums go
                up?"
              </em>{" "}
              In this comprehensive guide, we'll walk you through exactly how
              homeowners insurance handles water damage in Oregon, highlighting
              the specific risks faced by communities like{" "}
              <strong>Lebanon, Corvallis, Albany, and McMinnville</strong>, and
              how to navigate the claims process smoothly with a trusted partner
              like <Link to="/">Benson Home Solutions</Link>.
            </p>

            {/* Section 1 */}
            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                1
              </span>
              What Does Homeowners Insurance Cover?
            </h2>
            <p>
              The "Golden Rule" of water damage insurance is simple:{" "}
              <strong>Sudden and Accidental</strong>. Most standard policies
              (HO-3 forms) cover water damage that happens unexpectedly, but
              exclude damage caused by neglect or gradual issues.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="flex items-center gap-2 text-green-800 font-bold text-lg mb-4">
                  <CheckCircle className="w-5 h-5" /> Usually Covered
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Burst Pipes:
                    </span>{" "}
                    Especially frozen pipes in winter (common in Burns 97720 &
                    Hines 97738).
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Appliance Overflows:
                    </span>{" "}
                    Sudden failure of washing machines or dishwashers in homes
                    from Keizer to Dallas.
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Accidental Leaks:
                    </span>{" "}
                    e.g., A bathtub overflowing or a toilet supply line
                    snapping.
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Storm Damage:
                    </span>{" "}
                    Rain entering through a roof damaged by wind (common in
                    Valley storms).
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Firefighting Water:
                    </span>{" "}
                    Water used to extinguish a fire in your home.
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="flex items-center gap-2 text-red-800 font-bold text-lg mb-4">
                  <XCircle className="w-5 h-5" /> Typically NOT Covered
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Gradual Leaks:
                    </span>{" "}
                    A drip under the sink you ignored for months.
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      External Flooding:
                    </span>{" "}
                    Rising water from the Willamette, Santiam, or Calapooia
                    Rivers. (Requires Flood Insurance).
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Sewer Backup:
                    </span>{" "}
                    Water coming <em>up</em> through drains often requires a
                    specific endorsement.
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-gray-900">
                      Mold (Standalone):
                    </span>{" "}
                    Unless it resulted directly from a covered "sudden" event.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-600 my-6">
              <p className="text-sm m-0 text-blue-900 font-medium">
                <strong>Regional Climate Note:</strong>
                <br />
                In <strong>Harney County (Burns/Hines)</strong>, extreme cold
                leads to frequent frozen pipe claims. Insurers often require
                proof that heat was maintained during vacations.
                <br />
                In the{" "}
                <strong>Willamette Valley (Linn/Marion/Polk/Yamhill)</strong>,
                high humidity and river proximity make homes in places like{" "}
                <strong>Independence</strong> and <strong>Harrisburg</strong>{" "}
                more susceptible to secondary mold damage if not dried
                professionally and quickly.
              </p>
            </div>

            {/* Section 2 */}
            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                2
              </span>
              Step-by-Step: Filing a Water Damage Claim
            </h2>
            <p>
              The moments after discovering water are chaotic. Whether you are
              in a historic home in <strong>Brownsville</strong> or a new build
              in <strong>Happy Valley</strong>, following these steps can be the
              difference between a fully paid claim and a denial.
            </p>

            <ol className="space-y-6 list-none pl-0">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-contractor-black m-0">
                    Ensure Safety & Stop the Source
                  </h3>
                  <p className="mt-2">
                    Turn off the main water valve immediately. Do not enter
                    rooms with standing water if electricity is active. Your
                    safety is priority #1.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-contractor-black m-0">
                    Call a Restoration Professional
                  </h3>
                  <p className="mt-2">
                    Don't wait for the adjuster to give permission to dry your
                    home. Most policies <em>require</em> you to take steps to
                    mitigate further damage. Call{" "}
                    <Link to="/contact">Benson Home Solutions</Link> for 24/7
                    emergency extraction. We document the initial damage for
                    your claim before we start.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-contractor-black m-0">
                    Contact Your Insurance Carrier
                  </h3>
                  <p className="mt-2">
                    File the claim as soon as possible. Get a claim number and
                    the adjuster's contact information. Inform them you have a
                    professional restoration team en route.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-contractor-black m-0">
                    Document Everything
                  </h3>
                  <p className="mt-2">
                    Take photos and videos of the standing water, damaged
                    furniture, and ruined materials <strong>before</strong> they
                    are removed. Do not throw away expensive parts (like the
                    failed pipe fitting) until the adjuster sees them.
                  </p>
                </div>
              </li>
            </ol>

            <div className="my-8">
              <VisualBlock
                variant="clay"
                eyebrow="Documentation"
                title="Moisture Readings + Photos"
                subtitle="Clear documentation improves claim accuracy and speed."
              />
              <p className="text-sm text-center text-gray-500 mt-2">
                Professional documentation is key to a successful claim.
              </p>
            </div>

            {/* Section 3 - Expanded Service Areas */}
            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                3
              </span>
              Why Local Support Matters (Harney, Linn, Marion, Polk & Yamhill
              Counties)
            </h2>
            <p>
              When disaster strikes, having a local partner makes a massive
              difference. National franchises often dispatch crews who don't
              know the local supply chain or building codes of{" "}
              <strong>Harney County</strong> or the{" "}
              <strong>Mid-Willamette Valley</strong>. Benson Home Solutions
              serves:
            </p>

            {/* Service Area Grid */}
            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Harney County
                </h3>
                <p className="text-sm text-gray-600">
                  Burns (97720), Hines (97738)
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Linn County
                </h3>
                <p className="text-sm text-gray-600">
                  Sweet Home (97386), Lebanon (97355), Brownsville (97327),
                  Halsey (97348), Harrisburg (97446), Scio (97374), Tangent
                  (97389), Waterloo (97489), Crabtree (97335), Jefferson
                  (97352), Lacomb (97336), Shedd (97377), Sodaville, Lyons
                  (97358), Mill City (97360), Gates (97346), Detroit (97342).
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Marion County
                </h3>
                <p className="text-sm text-gray-600">
                  Salem (97301-97317), Keizer (97303), Silverton (97381), Turner
                  (97392), Stayton (97383), Sublimity (97385), Aumsville
                  (97325), Scotts Mills (97375), Mount Angel (97362), Gervais
                  (97026), Woodburn (97071), Hubbard (97032), Canby (97013),
                  Oregon City (97045), Molalla (97038).
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Polk & Yamhill Counties
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Polk:</strong> Corvallis (97330-97339), Monmouth
                  (97361), Independence (97351), Dallas (97338), Polk City
                  (97344), Rickreall (97371), Falls City, Grand Ronde (97347).
                  <br />
                  <strong>Yamhill:</strong> McMinnville (97128), Newberg
                  (97132), Dundee (97115), Carlton (97111), Dayton (97114),
                  Amity (97101), Willamina (97396), Sheridan (97378).
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-contractor-black mt-6">
              How Benson Home Solutions Helps with Claims
            </h3>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                <span>
                  <strong>Direct Insurance Billing:</strong> We use Xactimate,
                  the same software insurance adjusters use, to create precise,
                  industry-standard estimates. We can bill your carrier
                  directly, so you only worry about your deductible.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                <span>
                  <strong>24/7 Rapid Response:</strong> In a freeze event in{" "}
                  <strong>Burns</strong>, waiting 4 hours for a crew can mean
                  thousands more in damage. We are local and responsive to all
                  our service areas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                <span>
                  <strong>Complete Restoration:</strong> We don't just dry it
                  out; we put it back together. From <strong>Sweet Home</strong>{" "}
                  to <strong>Silverton</strong>, we handle the drywall,
                  painting, flooring, and trim to make your home "like new"
                  again.
                </span>
              </li>
            </ul>

            <div className="bg-gray-100 p-6 rounded-lg mt-8 text-center">
              <h3 className="text-2xl font-bold text-contractor-black mb-2">
                Facing Water Damage Right Now?
              </h3>
              <p className="mb-6">
                Every minute counts. Quick restoration prevents mold and reduces
                costs.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a href="tel:5413215115">
                  <Button className="bg-maroon hover:bg-red-700 text-white font-bold py-6 px-8 text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (541) 321-5115
                  </Button>
                </a>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white py-6 px-8 text-lg"
                  >
                    Contact Online
                  </Button>
                </Link>
              </div>
            </div>

            {/* Section 4 */}
            <h2 className="flex items-center gap-3 mt-12">
              <span className="bg-maroon text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                4
              </span>
              Peace of Mind Through Recovery
            </h2>
            <p>
              Recovering from water damage is stressful, but understanding your
              insurance coverage removes the mystery. Review your policy
              annually—check for "sewer backup" endorsements and consider flood
              insurance if you live near the <strong>Santiam River</strong> or
              in low-lying valley areas like <strong>Jefferson</strong> or{" "}
              <strong>Turner</strong>.
            </p>
            <p>
              Remember: Your insurance company is there to pay the claim, but{" "}
              <strong>Benson Home Solutions</strong> is there to restore your
              home. We work for <em>you</em>, ensuring your property is returned
              to its pre-loss condition properly and safely.
            </p>

            <div className="border-t border-gray-200 mt-12 pt-8">
              <h3 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-maroon" /> Does
                    homeowner's insurance cover mold?
                  </h4>
                  <p className="text-sm">
                    Typically, mold is only covered if it results from a covered
                    "sudden and accidental" water claim AND was reported
                    immediately. Neglected mold is almost always excluded. See
                    our{" "}
                    <Link
                      to="/mold-remediation"
                      className="text-maroon underline"
                    >
                      Mold Remediation services
                    </Link>
                    .
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-maroon" /> What is the
                    deductible?
                  </h4>
                  <p className="text-sm">
                    Your deductible is the amount you pay out-of-pocket before
                    insurance kicks in (usually $500–$2,500). If repairs cost
                    $10,000 and your deductible is $1,000, insurance pays
                    $9,000.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-maroon" /> Can I clean
                    it up myself?
                  </h4>
                  <p className="text-sm">
                    You can, but insurers may deny future claims for mold or rot
                    if professional drying logs aren't provided. Professional
                    restoration ensures all moisture is removed from inside
                    walls and subfloors.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Quick Actions */}
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
                <Link
                  to="/service-areas/harney-county/burns"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Burns Restoration
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
                <Link
                  to="/service-areas/mid-valley/sweet-home"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-maroon">
                    Sweet Home Restoration
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-maroon" />
                </Link>
              </nav>

              <hr className="my-6 border-gray-100" />

              <div className="bg-maroon/5 p-5 rounded border border-maroon/20">
                <h4 className="font-bold text-maroon mb-2 flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Claim Checklist
                </h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-maroon font-bold">✓</span> Stop the
                    water
                  </li>
                  <li className="flex gap-2">
                    <span className="text-maroon font-bold">✓</span> Call Benson
                    Home Solutions
                  </li>
                  <li className="flex gap-2">
                    <span className="text-maroon font-bold">✓</span> Call
                    Insurance Agent
                  </li>
                  <li className="flex gap-2">
                    <span className="text-maroon font-bold">✓</span> Take
                    Photos/Video
                  </li>
                  <li className="flex gap-2">
                    <span className="text-maroon font-bold">✓</span> Save
                    damaged parts
                  </li>
                </ul>
              </div>

              <div className="mt-6 bg-contractor-black text-white p-6 rounded-lg text-center">
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
            subtitle="Connect insurance guidance to a documented response plan."
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

export default WaterDamageInsuranceOregon;
