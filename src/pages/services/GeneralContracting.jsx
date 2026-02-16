import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import FixedPriceServiceMenu from "@/components/services/FixedPriceServiceMenu";
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

const GeneralContracting = () => {
  const services = [
    "Inspection report repairs and punch lists",
    "Pre-sale repairs and safety corrections",
    "Drywall, trim, and finish carpentry fixes",
    "Minor structural and framing corrections",
    "Door, window, and hardware adjustments",
    "Rot repair, exterior trim, and siding patches",
    "Smoke/CO detector and safety hardware installs",
    "Documentation for seller or insurance files",
  ];

  const processSteps = [
    {
      title: "Report Review",
      description:
        "Send your inspection report or punch list. We confirm scope, priorities, and timing.",
    },
    {
      title: "Scope & Estimate",
      description:
        "You receive a clear, line-item estimate with documented assumptions and options.",
    },
    {
      title: "Scheduling",
      description:
        "We align access, materials, and crew timing to keep the schedule predictable.",
    },
    {
      title: "Execution",
      description:
        "Licensed crews complete the work with clean job sites and daily updates.",
    },
    {
      title: "Closeout",
      description:
        "We provide photos and completion documentation for your records or closing file.",
    },
  ];

  const faqs = [
    {
      question: "What kinds of inspection repairs do you handle?",
      answer:
        "We handle punch lists, safety corrections, minor framing repairs, drywall and trim, door/window adjustments, exterior rot repair, and code-focused fixes identified in inspection reports.",
    },
    {
      question: "Can you work directly from the inspection report?",
      answer:
        "Yes. Send the report and we will identify priorities, confirm access needs, and provide a clear, line-item estimate.",
    },
    {
      question: "How quickly can repairs be scheduled?",
      answer:
        "Most inspection repair scopes can be scheduled within days depending on access and material availability. We prioritize deadline-driven transactions.",
    },
    {
      question: "Do you provide documentation for closing files?",
      answer:
        "Yes. We provide photos, completion notes, and documented scope so you can share with buyers, sellers, or agents.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve Harney County (Burns, Hines) and the Mid-Willamette Valley (Sweet Home, Lebanon, Albany, and surrounding areas). Contact us to confirm service availability for your location.",
    },
    {
      question: "Why choose Benson Home Solutions for inspection repairs?",
      answer:
        "Licensed (CCB# 258533), insured, local company with a focus on clear scope, tight scheduling, and clean documentation.",
    },
  ];

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Plan preventive work",
    },
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Bundle repairs",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Address moisture issues",
    },
    {
      label: "request a repair scope",
      to: "/contact",
      description: "Send your inspection report for a line-item estimate.",
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

  const guideLinks = [GUIDE_LINKS[2], GUIDE_LINKS[0], GUIDE_LINKS[1]];

  return (
    <>
      <SEO
        title="Inspection Repairs & Punch Lists | Oregon Contractor"
        description="Inspection repairs, punch lists, and pre-sale fixes across Burns, Hines, Sweet Home, and the Mid-Willamette Valley. Clear scope, fast scheduling, documented closeout."
        keywords="inspection repairs Oregon, punch list contractor, pre sale repairs Burns OR, inspection report repairs Sweet Home, home repair contractor Oregon, seller repairs Oregon"
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
                Inspection Repairs & Punch Lists
              </h1>
              <p className="text-xl text-cream mb-6">
                Pre-sale repairs, inspection responses, and safety corrections
                delivered on a clear schedule with documented results.
              </p>
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
                variant="clay"
                eyebrow="Inspection-Ready"
                title="Scoped Repairs with Documentation"
                subtitle="Clear estimates, clean closeout, and schedule control for transactions."
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What We Fix
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            As a licensed Oregon contractor (CCB# 258533), Benson Home Solutions
            completes inspection repairs and punch lists with tight scheduling,
            clear scope, and documented closeout for buyers, sellers, and
            agents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {services.map((service) => (
              <div key={service} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                <span className="text-restoration-gray">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Inspection Repair Process
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

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-4 text-center">
            Order Fixed-Price Services
          </h2>
          <p className="text-lg text-restoration-gray text-center mb-10 max-w-3xl mx-auto">
            Skip the estimate process for common repairs and installations.
            Fixed pricing, professional service, guaranteed results.
          </p>
          <FixedPriceServiceMenu
            filterCategory="all"
            showSubscriptions={false}
            className="mb-16"
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What Affects Cost and Timeline?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Project Scope:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Simple repairs vs. major additions or renovations
                  significantly affect cost and duration.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Material Selection:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Standard materials vs. custom or premium finishes impact
                  budget.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Structural Complexity:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Foundation work, structural modifications, and engineering
                  requirements add time and cost.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Permit Requirements:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Some jurisdictions have longer approval processes, which we
                  factor into timelines.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Weather Conditions:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Oregon weather can impact exterior work timelines, especially
                  in winter months.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Move inspection items into a documented scope and schedule."
          />
          <RelatedToolsBlock
            links={toolLinks}
            subtitle="Estimate repair budgets and replacement timing."
          />
          <RelatedGuidesBlock
            links={guideLinks}
            subtitle="Plan inspection repairs with clear priorities and timelines."
          />
          <LocationsServedBlock
            links={GEO_HUB_LINKS}
            subtitle="Harney County and Mid-Willamette Valley crews."
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
            Ready to Close the Repairs?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Share your inspection report and we will deliver a clear scope and
            schedule.
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
                Request Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GeneralContracting;
