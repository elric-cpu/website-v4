import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, CheckCircle, ArrowRight } from "lucide-react";
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

const BathroomRemodels = () => {
  const benefits = [
    "Increased home value",
    "Improved functionality and storage",
    "Enhanced safety and accessibility",
    "Modern aesthetics and personal style",
    "Better energy efficiency",
    "Resolved maintenance issues",
  ];

  const processSteps = [
    {
      title: "Consultation & Design",
      description:
        "We discuss your vision, needs, budget, and timeline. We can work with your design ideas or help create a plan that maximizes space and functionality.",
    },
    {
      title: "Detailed Estimate",
      description:
        "Itemized quote covering materials, labor, fixtures, and timeline. Clear, transparent pricing with no hidden fees.",
    },
    {
      title: "Material Selection",
      description:
        "Choose tiles, fixtures, vanities, lighting, and finishes. We guide you through options that fit your style and budget.",
    },
    {
      title: "Demo & Rough-In",
      description:
        "Careful demolition of existing bathroom. Plumbing, electrical, and ventilation rough-ins are updated or relocated as needed.",
    },
    {
      title: "Installation",
      description:
        "Professional installation: tile, drywall, fixtures, cabinetry, lighting. Daily progress updates and job site cleanliness.",
    },
    {
      title: "Final Touches & Walkthrough",
      description:
        "Detail work, caulking, final fixtures. Complete walkthrough to ensure you love the result.",
    },
  ];

  const faqs = [
    {
      question: "How long does a bathroom remodel take?",
      answer:
        "Typical bathroom remodels take 2-4 weeks depending on scope. Simple cosmetic updates may be faster; full gut remodels with plumbing/electrical relocations take longer. We provide realistic timelines upfront.",
    },
    {
      question: "Can I use my bathroom during the remodel?",
      answer:
        "Generally no—bathrooms are non-functional during active renovation. If you have multiple bathrooms, we can stage work to minimize disruption. We work efficiently to restore functionality quickly.",
    },
    {
      question: "Do you handle plumbing and electrical work?",
      answer:
        "Yes. As a licensed general contractor, we coordinate all trades or perform work in-house. All plumbing and electrical work meets Oregon building codes.",
    },
    {
      question:
        "What should I consider for aging-in-place or ADA accessibility?",
      answer:
        "Walk-in or roll-in showers, grab bars, comfort-height toilets, wider doorways, lever faucets, and slip-resistant flooring. We specialize in accessible design that doesn't sacrifice style.",
    },
    {
      question:
        "Can you work with my design or do you provide design services?",
      answer:
        "Both. Bring your Pinterest boards and ideas, or we'll help you design from scratch. We guide you through layout optimization, fixture selection, and finish coordination.",
    },
    {
      question: "How much does a bathroom remodel cost?",
      answer:
        "It varies widely based on size, materials, fixtures, and scope. Budget-friendly updates start around several thousand; luxury full remodels can be significantly more. We provide detailed estimates tailored to your goals.",
    },
    {
      question: "Do I need permits for a bathroom remodel?",
      answer:
        "Often yes, especially for plumbing, electrical, or structural changes. We handle permit applications and inspections as part of our service.",
    },
    {
      question: "What's the best flooring for bathrooms?",
      answer:
        "Tile (ceramic or porcelain) is most popular for durability and water resistance. Luxury vinyl is a budget-friendly alternative. We help you choose based on style, budget, and use.",
    },
    {
      question: "Should I upgrade my bathroom ventilation?",
      answer:
        "Yes—proper ventilation prevents mold and moisture damage. We recommend and install appropriately sized exhaust fans with humidity sensors for worry-free operation.",
    },
    {
      question: "Can you match my existing home's style?",
      answer:
        "Absolutely. Whether your home is traditional, modern, farmhouse, or mid-century, we design and build bathrooms that complement your home's character.",
    },
  ];

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Protect the investment",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Bundle repairs",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Plan moisture protection",
    },
    {
      label: "Compare kitchen remodels",
      to: "/kitchen-remodels",
      description: "Scope, finishes, and budgets for full kitchen upgrades.",
      intent: "service",
      cta: "Explore kitchens",
    },
    {
      label: "request a remodel scope",
      to: "/contact",
      description: "Confirm budget, finishes, and scheduling.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const guideLinks = [
    {
      label: "Bathroom remodel ROI guide",
      to: "/resources/bathroom-remodel-roi",
      description: "Understand payback and value lift by upgrade scope.",
      intent: "guide",
    },
    GUIDE_LINKS[0],
    GUIDE_LINKS[1],
  ];

  return (
    <>
      <SEO
        title="Bathroom Remodels Oregon | Custom Bathroom Renovation"
        description="Professional bathroom remodeling in Burns, Hines, Sweet Home, and the Mid-Willamette Valley. Accessible options, quality materials, and licensed installation."
        keywords="bathroom remodel Oregon, bathroom renovation Burns OR, ADA bathroom upgrades, shower remodel Sweet Home, licensed bathroom contractor Oregon"
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
                Custom Bathroom Remodels
              </h1>
              <p className="text-xl text-cream mb-6">
                Transform your bathroom into a beautiful, functional space. From
                accessible modifications to luxury upgrades, we bring your
                vision to life.
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
                eyebrow="Bathroom Remodels"
                title="Durable, Accessible Spaces"
                subtitle="Water-resistant materials and layouts built for daily use."
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            Why Remodel Your Bathroom?
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Bathrooms are high-use spaces that deserve to be functional, safe,
            and enjoyable. Whether you're addressing outdated fixtures,
            improving accessibility, or creating your dream spa retreat, a
            bathroom remodel offers lasting benefits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                <span className="text-restoration-gray">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Bathroom Remodel Process
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
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Bathroom Size:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Small powder rooms vs. master bathrooms affect material
                  quantities and labor hours.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Scope of Work:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Cosmetic refresh vs. full gut remodel with plumbing
                  relocations.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Material Choices:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Standard fixtures and tile vs. custom cabinetry and designer
                  finishes.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Structural Changes:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Moving walls, expanding space, or adding windows requires more
                  time and permits.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Accessibility Features:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Walk-in showers, wider doorways, and specialized fixtures add
                  value and function.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-mitigation-graphite text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Service Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <Link
              to="/service-areas/harney-county/burns"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all"
            >
              <h3 className="font-bold text-xl mb-2">Burns, OR</h3>
            </Link>
            <Link
              to="/service-areas/harney-county/hines"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all"
            >
              <h3 className="font-bold text-xl mb-2">Hines, OR</h3>
            </Link>
            <Link
              to="/service-areas/mid-valley/sweet-home"
              className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg p-6 transition-all"
            >
              <h3 className="font-bold text-xl mb-2">Sweet Home, OR</h3>
            </Link>
          </div>
          <p className="text-center text-structural-gray text-sm mt-6">
            Also serving Lebanon, Albany, and surrounding Mid-Valley areas
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Turn a remodel plan into a documented scope and timeline."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[2],
              TOP_TOOL_LINKS[0],
              TOP_TOOL_LINKS[1],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Estimate budgets and replacement timing before you commit."
          />
          <RelatedGuidesBlock
            links={guideLinks}
            subtitle="Planning guidance for ROI and maintenance impact."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
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
            Ready to Transform Your Bathroom?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Let's discuss your vision and create a detailed plan. Free estimates
            available.
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

export default BathroomRemodels;
