import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import VisualBlock from "@/components/VisualBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import RelatedGuidesBlock from "@/components/internal-links/RelatedGuidesBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  GUIDE_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const MoldRemediation = () => {
  const causes = [
    "Previous water damage or leaks",
    "High humidity and poor ventilation",
    "Roof leaks or foundation issues",
    "Plumbing leaks behind walls",
    "Condensation from HVAC systems",
    "Flooding or storm damage",
  ];

  const processSteps = [
    {
      title: "Initial Inspection & Assessment",
      description:
        "Visual inspection and moisture mapping to identify mold growth areas and underlying moisture sources. Air quality testing if needed.",
    },
    {
      title: "Containment Setup",
      description:
        "Physical barriers and negative air pressure systems prevent mold spores from spreading to unaffected areas during remediation.",
    },
    {
      title: "Air Filtration",
      description:
        "HEPA filtration systems capture airborne mold spores, protecting air quality during removal process.",
    },
    {
      title: "Removal & Cleaning",
      description:
        "Affected materials are removed (if necessary) or cleaned using antimicrobial solutions. Non-porous surfaces are sanitized and dried.",
    },
    {
      title: "Drying & Dehumidification",
      description:
        "Complete drying of affected areas and correction of moisture source to prevent recurrence.",
    },
    {
      title: "Restoration",
      description:
        "Replacement of removed materials (drywall, insulation, etc.) and final clearance testing to confirm successful remediation.",
    },
  ];

  const nextSteps = [
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Stop moisture source",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Repair affected areas",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Prevent recurrence",
    },
    {
      label: "request an assessment",
      to: "/contact",
      description: "Confirm scope, containment needs, and clearance testing.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const toolLinks = [
    TOP_TOOL_LINKS[2],
    TOP_TOOL_LINKS[0],
    TOP_TOOL_LINKS[1],
    TOOLS_HUB_LINK,
  ];

  const guideLinks = [GUIDE_LINKS[3], GUIDE_LINKS[0], GUIDE_LINKS[2]];

  const faqs = [
    {
      question: "How do I know if I have a mold problem?",
      answer:
        "Visible mold growth, musty odors, water stains, previous water damage, or respiratory symptoms that improve when away from home are common indicators. Professional inspection can confirm.",
    },
    {
      question: "Is all mold dangerous?",
      answer:
        'All mold should be addressed because it indicates excess moisture. Some species produce allergens or irritants. "Black mold" (Stachybotrys) is often mentioned but all mold growth is treated seriously.',
    },
    {
      question: "Can I remove mold myself?",
      answer:
        "Small surface areas (less than 10 square feet) on non-porous surfaces may be cleaned by homeowners. Larger areas, hidden mold, or mold on porous materials require professional remediation to ensure complete removal.",
    },
    {
      question: "How long does mold remediation take?",
      answer:
        "Typically 1-5 days depending on the extent of growth and materials affected. Small projects may be completed in a day; larger whole-house situations may take longer.",
    },
    {
      question: "Will mold come back after remediation?",
      answer:
        "If we correct the moisture source (the root cause), mold should not return. We identify and address underlying issues: leaks, ventilation, humidity control.",
    },
    {
      question: "Does homeowners insurance cover mold remediation?",
      answer:
        "Coverage depends on the cause. If mold resulted from a covered peril (sudden pipe burst), it's typically covered. Mold from long-term neglect or lack of maintenance is usually not covered. We work with insurance companies.",
    },
    {
      question: "Do I need to leave my home during remediation?",
      answer:
        "For small, isolated areas with proper containment, you can usually stay. For extensive remediation, temporary relocation may be recommended for health and comfort.",
    },
    {
      question: "What's the difference between mold and mildew?",
      answer:
        'Mildew is a type of mold—typically surface-level and easier to clean. "Mold" refers to various fungi that can penetrate porous materials. Both indicate excess moisture that needs correction.',
    },
    {
      question: "How do you test for mold?",
      answer:
        "We use visual inspection, moisture meters, and air quality sampling when needed. Testing helps identify mold species and concentration levels, though visible growth is often sufficient for remediation decisions.",
    },
    {
      question: "What happens if mold is inside my walls?",
      answer:
        "We create containment, remove affected drywall, treat framing with antimicrobial solutions, dry thoroughly, and replace materials. This ensures complete removal, not just covering the problem.",
    },
  ];

  return (
    <>
      <SEO
        title="Mold Remediation Oregon | Professional Mold Removal"
        description="Safe, effective mold remediation in Burns, Hines, Sweet Home, and the Mid-Willamette Valley. Assessment, containment, and removal by a licensed contractor."
        keywords="mold remediation Oregon, mold removal Burns OR, mold inspection Sweet Home, indoor air quality Oregon, licensed remediation contractor"
        type="service"
      />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Professional Mold Remediation
              </h1>
              <p className="text-xl text-cream mb-6">
                Safe, effective mold removal following industry protocols. We
                identify the source, eliminate the growth, and prevent
                recurrence.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-cream">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Licensed & Certified</span>
                </div>
              </div>
              <a href="tel:5413215115">
                <Button
                  size="lg"
                  className="bg-maroon hover:bg-opacity-90 text-white"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: (541) 321-5115
                </Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VisualBlock
                variant="moss"
                eyebrow="Containment + Removal"
                title="Controlled Remediation"
                subtitle="Isolation, HEPA filtration, and documentation for clean clearance."
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What Is Mold Remediation?
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Mold remediation is the process of identifying, containing,
            removing, and preventing mold growth in buildings. Unlike simple
            surface cleaning, professional remediation addresses the root
            cause—excess moisture—and follows industry protocols to ensure
            complete removal and prevention of recurrence.
          </p>
          <p className="text-lg text-restoration-gray mb-6">
            Mold grows on organic materials (wood, drywall, insulation) when
            moisture is present. Left untreated, it spreads through spores,
            potentially affecting indoor air quality and structural materials.
            Professional remediation protects both your property and your
            health.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mb-6 mt-12">
            Common Causes of Mold Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {causes.map((cause) => (
              <div key={cause} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                <span className="text-restoration-gray">{cause}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-restoration-gray">
            The key to preventing mold is controlling moisture. We don't just
            remove visible growth—we identify and correct the underlying
            moisture problem.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Mold Remediation Process
          </h2>
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-maroon text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-contractor-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-restoration-gray">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What Affects Cost and Timeline?
          </h2>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Extent of Growth:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Small isolated area vs. multiple rooms or whole-house
                  contamination.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">Location:</strong>
                <span className="text-restoration-gray">
                  {" "}
                  Surface mold vs. hidden growth inside walls or HVAC systems
                  requires different approaches.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Materials Affected:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Non-porous surfaces can be cleaned; porous materials (drywall,
                  insulation) often require removal.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Moisture Source:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Complexity of identifying and correcting underlying moisture
                  issues.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Testing & Clearance:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Post-remediation verification ensures successful completion.
                </span>
              </div>
            </li>
          </ul>
          <p className="text-lg text-restoration-gray">
            We provide detailed estimates after inspection. Free assessments
            help you understand the scope before committing to work.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Resolve the source, document the scope, and prevent recurrence."
          />
          <RelatedToolsBlock
            links={toolLinks}
            subtitle="Estimate scopes, repair timing, and budget recovery."
          />
          <RelatedGuidesBlock
            links={guideLinks}
            subtitle="Learn when mold requires professional containment and clearance."
          />
          <LocationsServedBlock
            links={GEO_HUB_LINKS}
            subtitle="Harney County and Mid-Willamette Valley response teams."
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-structural-gray pb-6"
              >
                <h3 className="text-xl font-bold text-contractor-black mb-3">
                  {faq.question}
                </h3>
                <p className="text-restoration-gray">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-maroon text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Concerned About Mold? Get a Professional Assessment
          </h2>
          <p className="text-xl mb-8 text-cream">
            Free inspection and estimate. We'll identify the problem and
            recommend the right solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button
                size="lg"
                className="bg-white text-maroon hover:bg-cream w-full sm:w-auto text-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-maroon w-full sm:w-auto text-lg px-8 py-6"
              >
                Request Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-cream mt-6">
            Licensed, Bonded & Insured • CCB# 258533 • Free Estimates
          </p>
        </div>
      </section>
    </>
  );
};

export default MoldRemediation;
