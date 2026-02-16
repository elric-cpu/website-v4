import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, CheckCircle, ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import VisualBlock from "@/components/VisualBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedGuidesBlock from "@/components/internal-links/RelatedGuidesBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
} from "@/data/internalLinks";

const FireSmokeDamage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fire and Smoke Damage Cleanup",
    provider: { "@type": "GeneralContractor", name: "Benson Home Solutions" },
    description:
      "Fire and smoke damage cleanup, odor control, and repair coordination for Oregon properties.",
  };

  const faqs = [
    {
      question: "What should I do first after a fire?",
      answer:
        "Ensure everyone is safe, contact emergency services if needed, and document damage with photos. Avoid entering damaged areas until cleared by authorities.",
    },
    {
      question: "Can smoke damage affect areas that were not burned?",
      answer:
        "Yes. Smoke particles travel through HVAC systems and porous materials, leaving residue and odor beyond the burn area.",
    },
    {
      question: "Do you coordinate repairs after cleanup?",
      answer:
        "Yes. We can coordinate reconstruction after cleanup, including drywall, flooring, paint, and finish work.",
    },
    {
      question: "Will insurance cover smoke damage cleanup?",
      answer:
        "Most policies cover fire and smoke damage. We document scope and coordinate with adjusters when authorized.",
    },
  ];

  const toolLinks = [
    TOP_TOOL_LINKS[2],
    TOP_TOOL_LINKS[1],
    TOP_TOOL_LINKS[4],
    TOP_TOOL_LINKS[0],
  ];

  const guideLinks = [
    {
      label: "Fire and smoke damage first steps",
      to: "/resources/guides/fire-smoke-what-to-do-first",
      description: "Immediate actions and documentation checklist.",
      intent: "guide",
    },
    {
      label: "Signs of hidden water damage",
      to: "/resources/guides/signs-of-hidden-water-damage",
      description: "Follow-on risks after suppression or cleanup.",
      intent: "guide",
    },
  ];

  const nextSteps = [
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Plan repairs",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Prevent repeat events",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Mitigate water damage",
    },
    {
      label: "request service",
      to: "/contact",
      description:
        "Documented scope, cleanup coordination, and repair planning.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const locationLinks = GEO_HUB_LINKS.map((link) => ({
    ...link,
    cta: "View coverage",
  }));

  return (
    <>
      <SEO
        title="Fire and Smoke Damage Cleanup Oregon | Benson Home Solutions"
        description="Fire and smoke damage cleanup, odor control, and repair coordination in Harney County and the Mid-Willamette Valley. Call (541) 321-5115."
        keywords="fire damage cleanup Oregon, smoke damage restoration, odor control, fire and smoke repair Oregon"
        schema={schema}
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Fire and Smoke Damage Cleanup
              </h1>
              <p className="text-xl text-cream mb-6">
                Cleanup, odor control, and repair coordination with documented
                scopes and clear next steps.
              </p>
              <p className="text-sm text-gray-300 mb-6">
                Serving{" "}
                <Link
                  to={GEO_HUB_LINKS[0].to}
                  className="font-semibold text-cream underline"
                >
                  Harney County
                </Link>{" "}
                and the{" "}
                <Link
                  to={GEO_HUB_LINKS[1].to}
                  className="font-semibold text-cream underline"
                >
                  Mid-Willamette Valley
                </Link>
                .
              </p>
              <a href="tel:5413215115">
                <Button
                  size="lg"
                  className="bg-maroon hover:bg-opacity-90 text-white"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (541) 321-5115
                </Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VisualBlock
                variant="ink"
                eyebrow="Fire and Smoke"
                title="Cleanup and Coordination"
                subtitle="Soot removal, odor control, and repair planning."
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-contractor-black mb-4">
              What we do after a fire
            </h2>
            <p className="text-lg text-restoration-gray mb-4">
              Fire events create smoke residue, soot, and odor that spread well
              beyond the burn area. We focus on safe cleanup, containment, and
              documentation so repairs can move quickly.
            </p>
            <ul className="space-y-3 text-restoration-gray">
              {[
                "Soot removal and surface cleaning",
                "Odor control and air quality stabilization",
                "Moisture checks from suppression efforts",
                "Detailed documentation for adjusters",
                "Repair planning and scope coordination",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cream border border-cream rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Flame className="w-5 h-5 text-maroon" />
              <p className="font-bold text-contractor-black m-0">
                Preventive option after cleanup
              </p>
            </div>
            <p className="text-restoration-gray mb-4">
              Many clients move into a maintenance program after restoration to
              reduce repeat damage and improve inspection outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={MAINTENANCE_LINKS.home.to}
                className="text-maroon font-semibold"
              >
                {MAINTENANCE_LINKS.home.label}
              </Link>
              <Link
                to={MAINTENANCE_LINKS.commercial.to}
                className="text-maroon font-semibold"
              >
                {MAINTENANCE_LINKS.commercial.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6 text-center">
            Related services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              SERVICE_PILLAR_LINKS.water,
              SERVICE_PILLAR_LINKS.mold,
              SERVICE_PILLAR_LINKS.inspection,
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-maroon hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-contractor-black mb-2">
                  {link.label}
                </h3>
                <p className="text-sm text-restoration-gray mb-3">
                  {link.description}
                </p>
                <span className="text-maroon font-semibold inline-flex items-center gap-2">
                  View service
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Move from cleanup to documented repairs and prevention."
          />
          <RelatedToolsBlock
            links={toolLinks}
            subtitle="Use these tools to estimate repair budgets and plan next steps."
          />
          <RelatedGuidesBlock
            links={guideLinks}
            subtitle="Planning guidance for fire, smoke, and follow-on risks."
          />
          <LocationsServedBlock
            links={locationLinks}
            subtitle="Service coverage across Harney County and the Mid-Willamette Valley."
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-structural-gray pb-6"
              >
                <h3 className="text-xl font-bold text-contractor-black mb-2">
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
            Need fire or smoke cleanup support?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Contact our team for documented scopes, cleanup coordination, and
            repair planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button
                size="lg"
                className="bg-white text-maroon hover:bg-cream w-full sm:w-auto text-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-maroon w-full sm:w-auto text-lg px-8 py-6"
              >
                Request Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-cream mt-6">
            Licensed, Bonded & Insured • CCB# 258533
          </p>
        </div>
      </section>
    </>
  );
};

export default FireSmokeDamage;
