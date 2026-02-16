import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
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

const WaterDamageMitigation = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Water Damage Restoration",
    provider: {
      "@type": "GeneralContractor",
      name: "Benson Home Solutions",
    },
    areaServed: [
      { "@type": "City", name: "Burns" },
      { "@type": "City", name: "Hines" },
      { "@type": "City", name: "Sweet Home" },
    ],
    description:
      "Emergency water damage restoration and dry-out services. 24/7 response for flooding, burst pipes, and leaks.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Water Restoration Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Water Extraction" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Structural Drying" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Dehumidification" },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How quickly should I call for water damage restoration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Immediately. Water damage worsens rapidly—mold can begin growing within 24-48 hours. The faster we extract water and start drying, the less secondary damage occurs and the better your insurance claim outcome.",
        },
      },
      {
        "@type": "Question",
        name: "Will my homeowners insurance cover water damage restoration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most policies cover sudden and accidental water damage (burst pipes, appliance failures). We work directly with insurance companies, providing detailed documentation. Flood damage typically requires separate flood insurance.",
        },
      },
    ],
  };

  const nextSteps = [
    {
      ...SERVICE_PILLAR_LINKS.mold,
      cta: "Address mold risk",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Prevent repeat events",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Repair damaged areas",
    },
    {
      label: "Insurance claims repairs",
      to: "/insurance-claims-repairs",
      description: "Documentation support and scope alignment for claims.",
      intent: "service",
      cta: "Coordinate claims",
    },
    {
      label: "request emergency service",
      to: "/contact",
      description: "Start mitigation with documented scope and photo logs.",
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

  const guideLinks = [GUIDE_LINKS[3], GUIDE_LINKS[2], GUIDE_LINKS[0]];

  const causes = [
    "Burst or leaking pipes",
    "Appliance failures (water heaters, washing machines, dishwashers)",
    "Storm damage and flooding",
    "Roof leaks",
    "Sewer backups",
    "Foundation cracks or basement seepage",
  ];

  const processSteps = [
    {
      title: "Emergency Contact & Assessment",
      description:
        "Call us immediately. We respond quickly to minimize damage. Our team assesses the extent of water intrusion and identifies the source.",
    },
    {
      title: "Water Extraction",
      description:
        "Using industrial pumps and extractors, we remove standing water from floors, carpets, and other affected areas.",
    },
    {
      title: "Drying & Dehumidification",
      description:
        "Professional-grade air movers and dehumidifiers are positioned strategically to dry structures thoroughly. We monitor moisture levels daily.",
    },
    {
      title: "Sanitization & Prevention",
      description:
        "Affected areas are treated with antimicrobial solutions to prevent mold growth. We document everything for your insurance claim.",
    },
    {
      title: "Restoration Coordination",
      description:
        "If reconstruction is needed (drywall, flooring, etc.), we coordinate those services or work with your preferred contractors.",
    },
  ];

  const faqs = [
    {
      question: "How quickly should I call for water damage restoration?",
      answer:
        "Immediately. Water damage worsens rapidly—mold can begin growing within 24-48 hours. The faster we extract water and start drying, the less secondary damage occurs and the better your insurance claim outcome.",
    },
    {
      question: "Will my homeowners insurance cover water damage restoration?",
      answer:
        "Most policies cover sudden and accidental water damage (burst pipes, appliance failures). We work directly with insurance companies, providing detailed documentation. Flood damage typically requires separate flood insurance.",
    },
    {
      question: "How long does the drying process take?",
      answer:
        "Typically 3-7 days depending on the extent of water intrusion, materials affected, and environmental conditions. We use moisture meters to confirm complete dryness before removing equipment.",
    },
    {
      question: "Can I stay in my home during restoration?",
      answer:
        "Often yes, especially if damage is isolated. We work to minimize disruption. In severe cases, temporary relocation may be safer and more practical.",
    },
    {
      question: "What's the difference between water damage and flood damage?",
      answer:
        "Water damage typically comes from internal sources (plumbing, appliances). Flood damage comes from external sources (rising rivers, heavy rain). Insurance coverage differs significantly between the two.",
    },
    {
      question: "Do you handle reconstruction after drying is complete?",
      answer:
        "Yes. As a licensed general contractor, we can handle all reconstruction: drywall, flooring, painting, trim—whatever is needed to restore your home fully.",
    },
    {
      question: "What equipment do you use for water extraction and drying?",
      answer:
        "Industrial-grade submersible pumps, truck-mounted extractors, high-velocity air movers, commercial dehumidifiers, and moisture detection meters to ensure thorough drying.",
    },
    {
      question: "How do you prevent mold after water damage?",
      answer:
        "Speed is critical. We extract water immediately, dry thoroughly using professional equipment, monitor moisture levels constantly, and apply antimicrobial treatments to affected areas.",
    },
    {
      question: "What should I do before you arrive?",
      answer:
        "If safe: turn off water source, move valuables to dry areas, document damage with photos. Do NOT use household vacuums on standing water—risk of electrical shock.",
    },
    {
      question: "Do you work with all insurance companies?",
      answer:
        "Yes. We have experience working with all major carriers and can communicate directly with adjusters, provide detailed estimates, and document damage according to industry standards.",
    },
  ];

  return (
    <>
      <SEO
        title="Water Damage Restoration Oregon | 24/7 Emergency Dry-Out"
        description="24/7 emergency water damage restoration in Burns, Hines, Sweet Home & Mid-Valley Oregon. Fast extraction, professional drying, insurance coordination. Call (541) 321-5115."
        schema={[schema, faqSchema]}
        keywords="water damage restoration Oregon, emergency water extraction, dry out services Burns OR, structural drying Oregon, flood cleanup Harney County, insurance documentation water loss"
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
                Water Damage Restoration & Dry-Out
              </h1>
              <p className="text-xl text-cream mb-6">
                Fast emergency response to prevent secondary damage, with clear
                documentation for insurance or out-of-pocket repairs.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-cream">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">24/7 Emergency Service</span>
                </div>
              </div>
              <a href="tel:5413215115">
                <Button
                  size="lg"
                  className="bg-maroon hover:bg-opacity-90 text-white"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency: (541) 321-5115
                </Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <VisualBlock
                variant="slate"
                eyebrow="24/7 Response"
                title="Extraction, Drying, Documentation"
                subtitle="Rapid stabilization with moisture monitoring and scope documentation."
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            What Is Water Damage Restoration?
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Water damage restoration is the immediate process of reducing and
            preventing further damage after water intrusion. Early restoration
            focuses on stopping the damage progression: extracting standing
            water, drying structures, and preventing mold growth.
          </p>
          <p className="text-lg text-restoration-gray mb-6">
            Time is critical. Water continues spreading through porous materials
            (drywall, insulation, wood framing) for hours after the initial
            event. Professional restoration within the first 24-48 hours
            significantly reduces long-term damage and repair costs.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mb-6 mt-12">
            Who Needs Water Restoration Services?
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Any property owner experiencing sudden water intrusion should act
            immediately. Common scenarios include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {causes.map((cause) => (
              <div key={cause} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-maroon flex-shrink-0 mt-1" />
                <span className="text-restoration-gray">{cause}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-restoration-gray">
            Whether you're a homeowner dealing with a burst pipe or a business
            facing storm damage, professional restoration protects your property
            and your insurance claim.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Water Restoration Process
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
          <p className="text-lg text-restoration-gray mb-6">
            Every water damage situation is unique. Several factors influence
            both the cost and duration of restoration:
          </p>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Extent of Water Intrusion:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Isolated room vs. multiple levels, amount of standing water,
                  affected square footage.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Water Category:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Clean water (supply line) vs. gray water (appliance) vs. black
                  water (sewage) requires different handling.
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
                  Hardwood floors vs. tile, drywall vs. plaster, carpet vs.
                  concrete—each dries differently.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Response Time:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Faster restoration means less secondary damage and shorter
                  drying times.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-maroon rounded-full flex-shrink-0 mt-2" />
              <div>
                <strong className="text-contractor-black">
                  Environmental Conditions:
                </strong>
                <span className="text-restoration-gray">
                  {" "}
                  Humidity, temperature, and ventilation affect drying
                  efficiency.
                </span>
              </div>
            </li>
          </ul>
          <p className="text-lg text-restoration-gray">
            We provide detailed estimates after assessment. Most insurance
            policies cover restoration costs when damage is sudden and
            accidental. We work directly with your insurance company to
            streamline the claims process.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Move from emergency response to documented repairs and prevention."
          />
          <RelatedToolsBlock
            links={toolLinks}
            subtitle="Estimate repair scopes and plan budget recovery."
          />
          <RelatedGuidesBlock
            links={guideLinks}
            subtitle="Understand common causes and next-step decisions."
          />
          <LocationsServedBlock
            links={GEO_HUB_LINKS}
            subtitle="Harney County and the Mid-Willamette Valley response teams."
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
            Water Damage Emergency? We're Here 24/7
          </h2>
          <p className="text-xl mb-8 text-cream">
            Don't wait—every minute counts. Call us immediately for fast,
            professional water damage restoration.
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
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-cream mt-6">
            Licensed, Bonded & Insured • CCB# 258533 • Insurance Coordination
            Available
          </p>
        </div>
      </section>
    </>
  );
};

export default WaterDamageMitigation;
