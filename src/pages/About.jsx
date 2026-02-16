import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Shield, Users, Award, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
} from "@/data/internalLinks";

const About = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety & Workmanship",
      description:
        "Every project follows industry best practices and Oregon building codes. Safety for our team and your family is non-negotiable.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Clear Communication",
      description:
        "We keep you informed at every stage—from initial estimate through final walkthrough. No surprises, just professional service.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Results",
      description:
        "Licensed (CCB# 258533), insured, and committed to workmanship that meets professional standards. Your satisfaction is our priority.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Response",
      description:
        "Emergency water damage doesn't wait. We respond quickly to minimize damage and protect your property.",
    },
  ];

  const nextSteps = [
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Explore plans",
    },
    {
      ...MAINTENANCE_LINKS.commercial,
      cta: "Review coverage",
    },
    {
      ...SERVICE_PILLAR_LINKS.water,
      cta: "Emergency response",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Inspection repairs",
    },
    {
      label: "insurance claims repairs",
      to: "/insurance-claims-repairs",
      description: "Documentation, scopes, and coordination for claims.",
      intent: "service",
      cta: "View service",
    },
    {
      label: "accessibility retrofits",
      to: "/accessibility-retrofits",
      description: "Safety upgrades and aging-in-place planning.",
      intent: "service",
      cta: "View service",
    },
  ];

  return (
    <>
      <SEO
        title="About Benson Home Solutions | Licensed Oregon Contractor"
        description="Licensed Oregon contractor specializing in water damage restoration, mold remediation, maintenance plans, and remodeling. Serving Harney County and the Mid-Willamette Valley."
        keywords="about Benson Home Solutions, Oregon licensed contractor, CCB 258533, restoration contractor Oregon, maintenance plans Oregon"
      />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About Benson Home Solutions
            </h1>
            <p className="text-xl text-cream">
              Professional construction and restoration services across
              Oregon—licensed, insured, and committed to quality workmanship.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            Oregon Maintenance & Restoration
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Benson Home Solutions is a licensed general contractor (CCB# 258533)
            serving Oregon homeowners with professional restoration and
            construction services. We specialize in emergency water damage
            restoration, mold remediation, bathroom and kitchen remodels, and
            general contracting throughout Harney County and the Mid-Willamette
            Valley.
          </p>
          <p className="text-lg text-restoration-gray mb-6">
            Our business is built on straightforward principles: respond quickly
            when emergencies happen, communicate clearly throughout every
            project, and deliver workmanship that meets professional standards.
            Whether you're facing an urgent water damage situation or planning a
            home renovation, we bring the same level of professionalism and care
            to every job.
          </p>
          <p className="text-lg text-restoration-gray">
            We understand that inviting contractors into your home requires
            trust. That's why we focus on transparency—detailed estimates,
            regular communication, and no hidden fees. You'll know what to
            expect at each stage, from initial assessment through final
            walkthrough.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-12 text-center">
            Our Commitment to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="text-maroon mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-contractor-black mb-3">
                  {value.title}
                </h3>
                <p className="text-restoration-gray">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-6">
            Restoration Professionalism
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            Our water damage restoration and mold remediation services follow
            industry-standard protocols aligned with IICRC (Institute of
            Inspection, Cleaning and Restoration Certification) guidelines. We
            use professional-grade equipment, document processes thoroughly, and
            maintain the level of professionalism insurance companies expect.
          </p>
          <p className="text-lg text-restoration-gray mb-6">
            For Emergency restoration, speed and proper execution make the
            difference between minor inconvenience and major reconstruction. We
            respond quickly, extract water immediately, monitor drying progress
            with moisture meters, and prevent secondary damage that could
            compromise your insurance claim.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mb-6 mt-12">
            Construction Expertise
          </h2>
          <p className="text-lg text-restoration-gray mb-6">
            From bathroom and kitchen remodels to home additions and
            aging-in-place modifications, we bring licensed contractor expertise
            to every construction project. We handle permits, coordinate
            subcontractors when needed, and ensure all work meets Oregon
            building codes.
          </p>
          <p className="text-lg text-restoration-gray">
            Whether you're updating a single room or undertaking a major
            renovation, we help you plan effectively, choose quality materials
            within your budget, and execute with attention to detail.
          </p>
        </div>
      </section>

      <section className="py-20 bg-mitigation-graphite text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Insurance Coordination Experience
          </h2>
          <p className="text-lg text-cream mb-6">
            We have extensive experience working with insurance companies on
            behalf of homeowners. Water damage, mold remediation, and
            restoration claims require detailed documentation, industry-standard
            estimates, and clear communication with adjusters.
          </p>
          <p className="text-lg text-cream">
            We handle this coordination as part of our service—documenting
            damage with photos, providing itemized estimates, explaining the
            scope to adjusters, and ensuring the restoration process aligns with
            coverage. You focus on getting back to normal; we handle the claim
            details.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <LocationsServedBlock
            links={GEO_HUB_LINKS}
            subtitle="Service coverage across Harney County and the Mid-Willamette Valley."
          />
          <NextStepsBlock
            links={nextSteps}
            subtitle="Explore the maintenance and restoration programs we deliver locally."
          />
        </div>
      </section>

      <section className="py-20 bg-maroon text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Work With a Professional?
          </h2>
          <p className="text-xl mb-8 text-cream">
            Contact us today to discuss your project or schedule an estimate.
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
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
