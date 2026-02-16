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

const KitchenRemodels = () => {
  const benefits = [
    "Increased home value and ROI",
    "Improved workflow and functionality",
    "Modern, energy-efficient appliances",
    "More storage and counter space",
    "Enhanced aesthetics and style",
    "Better lighting and ventilation",
  ];

  const processSteps = [
    {
      title: "Design Consultation",
      description:
        "We discuss your cooking habits, storage needs, style preferences, and budget. We help optimize layout for functionality and flow.",
    },
    {
      title: "Detailed Planning & Estimate",
      description:
        "Cabinet layout, appliance selection, countertop materials, flooring, lighting—everything itemized with transparent pricing.",
    },
    {
      title: "Demolition & Preparation",
      description:
        "Careful removal of existing cabinets, countertops, and appliances. Plumbing, electrical, and structural prep for new layout.",
    },
    {
      title: "Rough-In Work",
      description:
        "Plumbing and electrical updates or relocations. New outlets, lighting circuits, ventilation, and gas lines as needed.",
    },
    {
      title: "Installation",
      description:
        "Professional cabinet installation, countertop templating and installation, tile backsplash, flooring, and trim work.",
    },
    {
      title: "Finish & Final Details",
      description:
        "Appliance installation, hardware, final paint, lighting fixtures. Complete walkthrough to ensure perfection.",
    },
  ];

  const faqs = [
    {
      question: "How long does a kitchen remodel take?",
      answer:
        "Typical kitchen remodels take 4-8 weeks depending on scope. Minor updates may be faster; full custom remodels with structural changes take longer. We provide realistic timelines and communicate any delays immediately.",
    },
    {
      question: "Can I use my kitchen during the remodel?",
      answer:
        "Partially, depending on the phase. Early demolition and plumbing/electrical work disrupts functionality. Many clients set up temporary kitchens elsewhere in the home. We work efficiently to minimize downtime.",
    },
    {
      question: "What's the best kitchen layout for my space?",
      answer:
        "It depends on your space and needs. Popular layouts: galley (efficient for small spaces), L-shaped (versatile), U-shaped (maximum storage), and islands (adds workspace and seating). We help you choose.",
    },
    {
      question: "Should I choose custom or semi-custom cabinets?",
      answer:
        "Custom cabinets fit exact dimensions and offer unlimited style options but cost more. Semi-custom cabinets come in standard sizes with good style variety at lower cost. We help you decide based on budget and needs.",
    },
    {
      question: "What countertop material is best?",
      answer:
        "Quartz is popular for durability and low maintenance. Granite offers natural beauty. Laminate is budget-friendly. Butcher block adds warmth. We discuss pros/cons of each based on your cooking style and budget.",
    },
    {
      question: "Do you handle appliance installation?",
      answer:
        "Yes. We coordinate appliance delivery, installation, and ensure proper electrical/plumbing connections. We can recommend appliances or work with your selections.",
    },
    {
      question: "How much does a kitchen remodel cost?",
      answer:
        "It varies widely based on size, materials, appliances, and scope. Basic updates start in the mid five-figures; luxury remodels can be significantly more. We provide detailed estimates tailored to your goals.",
    },
    {
      question: "Do I need permits for a kitchen remodel?",
      answer:
        "Usually yes, especially for electrical, plumbing, or structural work. We handle all permit applications and inspections as part of our service.",
    },
    {
      question: "Can you work around my schedule?",
      answer:
        "We do our best to accommodate. Some homeowners prefer we work while they're at work; others want to be present. We discuss scheduling during planning and keep you informed of progress.",
    },
    {
      question: "What if we discover unexpected issues during demo?",
      answer:
        "Older homes sometimes reveal hidden issues (water damage, outdated wiring, structural concerns). We notify you immediately, explain options, and provide pricing for necessary repairs before proceeding.",
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
      label: "Compare bathroom remodels",
      to: "/bathroom-remodels",
      description: "Layouts, finishes, and accessibility upgrades.",
      intent: "service",
      cta: "Explore bathrooms",
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
      label: "Kitchen remodel ROI guide",
      to: "/resources/kitchen-remodel-roi",
      description: "Compare payback ranges and upgrade priorities.",
      intent: "guide",
    },
    GUIDE_LINKS[0],
    GUIDE_LINKS[1],
  ];

  return (
    <>
      <SEO
        title="Kitchen Remodels Oregon | Custom Kitchen Renovation"
        description="Professional kitchen remodeling in Burns, Hines, Sweet Home, and the Mid-Willamette Valley. Layout planning, cabinetry, and durable finishes."
        keywords="kitchen remodel Oregon, kitchen renovation Burns OR, cabinet installation Sweet Home, countertop replacement Oregon, licensed kitchen contractor"
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
                Custom Kitchen Remodels
              </h1>
              <p className="text-xl text-cream mb-6">
                Create the kitchen you've always wanted. Beautiful, functional
                designs with quality materials and expert craftsmanship.
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
                variant="moss"
                eyebrow="Kitchen Remodels"
                title="Layout + Storage + Flow"
                subtitle="Cabinetry, surfaces, and lighting designed around real daily use."
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            Why Remodel Your Kitchen?
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            The kitchen is the heart of your home—where meals are prepared,
            families gather, and memories are made. A well-designed kitchen
            remodel enhances your daily life and adds significant value to your
            home.
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
            Our Kitchen Remodel Process
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
                <strong className="text-contractor-black">Kitchen Size:</strong>
                <span className="text-restoration-gray">
                  {" "}
                  Small galley kitchens vs. large open-concept spaces affect
                  material quantities and labor.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Cabinet Quality:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Stock cabinets vs. semi-custom vs. fully custom cabinetry
                  significantly impacts cost.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Countertop Material:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Laminate, granite, quartz, and specialty materials vary in
                  price and durability.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Appliance Selection:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Standard vs. professional-grade appliances affect both budget
                  and installation requirements.
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
                  Moving walls, adding islands, or relocating plumbing increases
                  complexity and timeline.
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
            Also serving Lebanon, Albany, and Mid-Valley Oregon
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Turn a remodel plan into a documented scope and schedule."
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
            Ready to Create Your Dream Kitchen?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Let's bring your vision to life. Schedule a free consultation and
            estimate today.
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

export default KitchenRemodels;
