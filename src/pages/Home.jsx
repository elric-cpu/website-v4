import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users,
  Facebook,
  Droplets,
  ShieldCheck,
  ClipboardList,
  Hammer,
  Building2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import VisualBlock from "@/components/VisualBlock";
import FeaturedToolsBlock from "@/components/internal-links/FeaturedToolsBlock";
import RelatedGuidesBlock from "@/components/internal-links/RelatedGuidesBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  GUIDE_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const Home = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Benson Home Solutions",
    description:
      "Professional maintenance plans, water damage restoration, mold remediation, and inspection repairs across Harney County and the Mid-Willamette Valley.",
    url: "https://bensonhomesolutions.com",
    telephone: "+1-541-321-5115",
    sameAs: ["https://www.facebook.com/p/Benson-Enterprises-61565667928376/"],
    address: {
      "@type": "PostalAddress",
      addressRegion: "OR",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Burns",
      },
      {
        "@type": "City",
        name: "Hines",
      },
      {
        "@type": "City",
        name: "Sweet Home",
      },
      {
        "@type": "City",
        name: "Lebanon",
      },
      {
        "@type": "City",
        name: "Albany",
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "CCB# 258533",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
      description: "24/7 Emergency Service Available",
    },
  };
  const services = [
    {
      title: "Maintenance Plans",
      description:
        "Predictable annual maintenance with clear scopes, budgets, and documentation.",
      icon: ClipboardList,
      link: "/maintenance-plans",
    },
    {
      title: "Water Damage Restoration",
      description:
        "24/7 extraction, structural drying, and insurance-ready documentation.",
      icon: Droplets,
      link: "/water-damage-restoration",
    },
    {
      title: "Mold Remediation",
      description:
        "Containment, removal, and prevention aligned with IICRC guidance.",
      icon: ShieldCheck,
      link: "/mold-remediation",
    },
    {
      title: "Moisture Control",
      description:
        "Leak diagnostics, envelope repairs, and moisture prevention for Oregon homes.",
      icon: Shield,
      link: "/moisture-control",
    },
    {
      title: "Inspection Repairs",
      description:
        "Punch lists, pre-sale repairs, and code-driven fixes with clear timelines.",
      icon: Hammer,
      link: "/inspection-repairs",
    },
    {
      title: "Commercial Maintenance",
      description:
        "Facilities support for properties under 50k sq ft with clear logs and scopes.",
      icon: Building2,
      link: "/commercial-maintenance",
    },
  ];
  const processSteps = [
    {
      title: "Initial Contact & Assessment",
      description:
        "Call or submit a request. We confirm scope, urgency, and next steps.",
    },
    {
      title: "Detailed Estimate",
      description:
        "You receive a clear, line-item estimate with documented findings.",
    },
    {
      title: "Professional Execution",
      description:
        "Licensed crews complete the work with clean job sites and updates.",
    },
    {
      title: "Final Walkthrough",
      description:
        "We review results, documentation, and recommended next steps.",
    },
  ];
  const reviews = [
    {
      name: "Sarah M.",
      location: "Burns, OR",
      text: "Benson Home Solutions saved our home after a pipe burst. They were on-site within hours and handled everything professionally.",
      rating: 5,
    },
    {
      name: "Mike T.",
      location: "Sweet Home, OR",
      text: "Their maintenance plan made it easy to prioritize repairs and budget for the year. Clear scope and great communication.",
      rating: 5,
    },
    {
      name: "Jennifer L.",
      location: "Hines, OR",
      text: "Professional mold remediation service. They explained everything clearly and worked with our insurance company seamlessly.",
      rating: 5,
    },
  ];
  return (
    <>
      <SEO
        title="Oregon Maintenance Plans, Restoration & Repairs | Benson Home Solutions"
        description="Licensed Oregon contractor providing maintenance plans, water damage restoration, mold remediation, moisture control, inspection repairs, and commercial maintenance across Harney County and the Mid-Willamette Valley."
        schema={schema}
        keywords="Oregon maintenance plans, home maintenance planner, water damage restoration Oregon, emergency water removal, mold remediation Oregon, moisture control Oregon, inspection repairs Oregon, commercial maintenance services, insurance claims repairs, Harney County contractor, Mid-Willamette Valley contractor, Burns OR contractor, Hines OR contractor, Sweet Home OR contractor"
      />

      {/* H1 Heading Hidden Visually but Present for SEO Structure if needed, or integrated into Hero */}

      <section className="relative bg-contractor-black text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] gap-12 items-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Oregon Maintenance Plans, Restoration, and Repair Services
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-cream">
                Maintenance plans, emergency restoration, and inspection-ready
                repairs delivered by a licensed local team.
              </p>
              <p className="text-lg mb-8 text-structural-gray">
                Serving Harney County (Burns, Hines) and the Mid-Willamette
                Valley (Sweet Home, Lebanon, Albany) with clear scopes,
                documented work, and responsive scheduling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:5413215115">
                  <Button
                    size="lg"
                    className="bg-maroon hover:bg-opacity-90 text-white text-lg px-8 py-6 w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: (541) 321-5115
                  </Button>
                </a>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-contractor-black text-lg px-8 py-6 w-full sm:w-auto"
                  >
                    Request an Estimate
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <div className="hidden lg:block">
              <VisualBlock
                variant="slate"
                eyebrow="Licensed CCB# 258533"
                title="Maintenance, Restoration, and Repairs"
                subtitle="Detailed scopes, documented work, and rapid response for Oregon properties."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              className="flex flex-col items-center text-center"
            >
              <Shield className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">
                Licensed & Insured
              </p>
              <p className="text-sm text-restoration-gray">CCB# 258533</p>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
              }}
              className="flex flex-col items-center text-center"
            >
              <Clock className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">
                Fast Response
              </p>
              <p className="text-sm text-restoration-gray">
                Emergency Available
              </p>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.2,
              }}
              className="flex flex-col items-center text-center"
            >
              <Award className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">
                Quality Work
              </p>
              <p className="text-sm text-restoration-gray">
                Professional Standards
              </p>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.3,
              }}
              className="flex flex-col items-center text-center"
            >
              <Users className="w-12 h-12 text-maroon mb-3" />
              <p className="font-semibold text-contractor-black">Local Team</p>
              <p className="text-sm text-restoration-gray">Oregon Owned</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-restoration-gray max-w-3xl mx-auto">
              Comprehensive maintenance, restoration, and repair solutions
              tailored to homes and small facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="flex"
                >
                  <Link to={service.link} className="w-full flex">
                    <div className="bg-white border-2 border-structural-gray rounded-lg p-6 hover:border-maroon hover:shadow-lg transition-all w-full flex flex-col h-full">
                      <Icon className="w-12 h-12 text-maroon mb-4" />
                      <h3 className="text-xl font-bold text-contractor-black mb-3">
                        {service.title}
                      </h3>
                      <p className="text-restoration-gray mb-4 flex-grow">
                        {service.description}
                      </p>
                      <span className="text-maroon font-semibold flex items-center gap-2 mt-auto">
                        View Service Details
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button
                size="lg"
                className="bg-maroon hover:bg-opacity-90 text-white"
              >
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-3xl font-bold text-maroon mb-4">
              Local, Licensed, and Documentation-First
            </h2>
            <p>
              We deliver restoration and maintenance with clear scopes,
              line-item estimates, and photo documentation. As a licensed,
              bonded, and insured Oregon contractor (CCB# 258533), we focus on
              practical solutions that protect your property and your budget.
            </p>
            <p>
              Emergency water damage requires fast action. Our team mobilizes
              quickly, documents every step for insurance, and prioritizes
              drying and stabilization to prevent secondary damage.
            </p>
            <ul>
              <li>Clear scopes and documented work you can keep.</li>
              <li>Insurance-ready reporting when claims are involved.</li>
              <li>
                Skilled crews for restoration, maintenance, inspection repairs,
                and moisture control.
              </li>
            </ul>

            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div>
                <h3 className="text-2xl font-bold text-contractor-black mb-2">
                  Harney County Coverage
                </h3>
                <p>
                  Burns, Hines, and surrounding communities with emergency
                  response and restoration expertise.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-contractor-black mb-2">
                  Mid-Willamette Valley Coverage
                </h3>
                <p>
                  Sweet Home, Lebanon, Albany, and nearby areas with maintenance
                  plans, inspection repairs, and restoration services.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/service-areas" className="text-maroon font-semibold">
                View all service areas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FeaturedToolsBlock
            links={[...TOP_TOOL_LINKS, TOOLS_HUB_LINK]}
            subtitle="Budget ranges, replacement timing, and ROI planning tools."
          />
          <RelatedGuidesBlock
            links={GUIDE_LINKS}
            subtitle="Maintenance and repair guidance for Oregon property owners."
          />
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 bg-mitigation-graphite text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Insurance-Ready Documentation
              </h2>
              <p className="text-lg text-structural-gray mb-6">
                When a claim is involved, documentation matters. We capture
                photos, moisture readings, and line-item scopes to keep your
                claim moving and reduce delays.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>
                    Direct coordination with adjusters when authorized
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>
                    Detailed documentation and photo evidence for claims
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>
                    Transparent, line-item estimates aligned with industry
                    standards
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-cream flex-shrink-0 mt-1" />
                  <span>Emergency restoration to prevent further damage</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-maroon hover:bg-opacity-90 text-white"
                  >
                    Discuss Your Claim
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <VisualBlock
                variant="slate"
                eyebrow="Insurance Support"
                title="Documentation That Holds Up"
                subtitle="Photo logs, moisture readings, and line-item scopes built for adjuster review."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              A Clear, Documented Process
            </h2>
            <p className="text-xl text-restoration-gray max-w-3xl mx-auto">
              One point of contact, clear scope, and documented results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-maroon text-white flex items-center justify-center text-2xl font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-contractor-black mb-3">
                    {step.title}
                  </h3>
                  <p className="text-restoration-gray">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-structural-gray -z-10"
                    style={{
                      width: "calc(100% - 4rem)",
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationsServedBlock
            links={GEO_HUB_LINKS}
            subtitle="Serving Harney County and the Mid-Willamette Valley."
          />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-restoration-gray">
              Real experiences from Oregon homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="bg-cream rounded-lg p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-maroon"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-restoration-gray mb-4 italic">
                  "{review.text}"
                </p>
                <div>
                  <p className="font-bold text-contractor-black">
                    {review.name}
                  </p>
                  <p className="text-sm text-restoration-gray">
                    {review.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/reviews">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white"
              >
                Read More Reviews
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t-2 border-structural-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-restoration-gray">
              Quality workmanship across all our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <VisualBlock
                variant="clay"
                eyebrow="Recent Project"
                title="Maintenance Plan Launch - Lebanon"
                subtitle="Annual budget, seasonal priorities, and documentation."
              />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">
                  Maintenance Plan Launch - Lebanon
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <VisualBlock
                variant="slate"
                eyebrow="Recent Project"
                title="Water Damage Restoration - Sweet Home"
                subtitle="Rapid extraction and structural drying with documentation."
              />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">
                  Water Damage Restoration - Sweet Home
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <VisualBlock
                variant="moss"
                eyebrow="Recent Project"
                title="Moisture Control Repairs - Hines"
                subtitle="Leak tracing, drying, and envelope repairs."
              />
              <div className="p-4 bg-cream">
                <p className="font-bold text-contractor-black">
                  Moisture Control Repairs - Hines
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-maroon text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready for a Clear, Professional Estimate?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Talk with a local team about maintenance plans, restoration, or
            inspection repairs. Emergency water damage restoration is available
            24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:5413215115" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-white text-maroon hover:bg-cream text-lg px-8 py-6 w-full"
              >
                <Phone className="w-5 h-5 mr-2" />
                (541) 321-5115
              </Button>
            </a>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-maroon text-lg px-8 py-6 w-full"
              >
                <Mail className="w-5 h-5 mr-2" />
                Request Estimate
              </Button>
            </Link>
            <a
              href="https://www.facebook.com/p/Benson-Enterprises-61565667928376/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 w-full"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Follow on Facebook
              </Button>
            </a>
          </div>
          <p className="text-sm text-cream mt-6">
            Licensed, Bonded & Insured • CCB# 258533 • Oregon Owned
          </p>
        </div>
      </section>
    </>
  );
};
export default Home;
