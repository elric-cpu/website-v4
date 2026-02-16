import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Droplets,
  ShieldCheck,
  Hammer,
  Home,
  ClipboardList,
  Building2,
  Shield,
  Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import FixedPriceServiceMenu from "@/components/services/FixedPriceServiceMenu";
import VisualBlock from "@/components/VisualBlock";
import FeaturedToolsBlock from "@/components/internal-links/FeaturedToolsBlock";
import RelatedGuidesBlock from "@/components/internal-links/RelatedGuidesBlock";
import LinkGrid from "@/components/internal-links/LinkGrid";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import { BLOG_POSTS } from "@/data/blogPosts";
import {
  ALL_GUIDE_LINKS,
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const ServicesOverview = () => {
  const serviceGroups = [
    {
      title: "Maintenance Plans",
      description:
        "Predictable, documented maintenance for homes and small commercial facilities.",
      visual: {
        variant: "clay",
        title: "Planned Maintenance",
        subtitle:
          "Annual budgets, seasonal priorities, and documented closeout for Oregon properties.",
      },
      items: [
        {
          title: "Maintenance Plans",
          description:
            "Residential plans with defined scopes, clear budgets, and recurring service windows.",
          icon: ClipboardList,
          link: "/maintenance-plans",
        },
        {
          title: "Commercial Maintenance",
          description:
            "Facilities maintenance for properties under 50k sq ft with rapid response and logs.",
          icon: Building2,
          link: "/commercial-maintenance",
        },
        {
          title: "Commercial Service Agreements",
          description:
            "Service agreements with scope alignment, pricing clarity, and service-level expectations.",
          icon: Shield,
          link: "/commercial-service-agreements",
        },
      ],
    },
    {
      title: "Emergency Restoration",
      description:
        "Rapid response, drying, and documentation for water damage and indoor air quality risks.",
      visual: {
        variant: "ink",
        title: "24/7 Restoration",
        subtitle:
          "Extraction, structural drying, and scope documentation designed for Oregon climates.",
      },
      items: [
        {
          title: "Water Damage Restoration",
          description:
            "Extraction, drying, and moisture monitoring with insurance-ready documentation.",
          icon: Droplets,
          link: "/water-damage-restoration",
        },
        {
          title: "Mold Remediation",
          description:
            "Containment, removal, and prevention with health-first protocols and clear scope.",
          icon: ShieldCheck,
          link: "/mold-remediation",
        },
        {
          title: "Fire & Smoke Damage Cleanup",
          description:
            "Cleanup, odor control, and repair coordination after fire events.",
          icon: Shield,
          link: "/fire-smoke-damage",
        },
      ],
    },
    {
      title: "Moisture & Envelope Diagnostics",
      description:
        "Diagnostics and repairs for leaks, envelope failures, and recurring moisture issues.",
      visual: {
        variant: "slate",
        title: "Moisture Control",
        subtitle: "Leak tracing, envelope repairs, and durable moisture fixes.",
      },
      items: [
        {
          title: "Moisture Control",
          description:
            "Diagnostics and repairs for flashing, drainage, crawlspaces, and leak sources.",
          icon: Droplets,
          link: "/moisture-control",
        },
        {
          title: "Insurance Claims Repairs",
          description:
            "Documentation-heavy repairs, scopes, and repair plans that support claim accuracy.",
          icon: Shield,
          link: "/insurance-claims-repairs",
        },
      ],
    },
    {
      title: "Inspection Repairs & Selective Remodeling",
      description:
        "Pre-sale repairs, punch lists, and targeted upgrades to improve safety and usability.",
      visual: {
        variant: "clay",
        title: "Inspection-Ready Repairs",
        subtitle:
          "Punch-list completion, safety fixes, and targeted upgrades with clear scopes.",
      },
      items: [
        {
          title: "Inspection Repairs",
          description:
            "Punch lists, pre-sale repairs, and code-focused fixes with quick scheduling.",
          icon: Hammer,
          link: "/inspection-repairs",
        },
        {
          title: "Bathroom Remodels",
          description:
            "Durable, accessible bathrooms with quality materials and clean installs.",
          icon: Home,
          link: "/bathroom-remodels",
        },
        {
          title: "Kitchen Remodels",
          description:
            "Layouts, cabinetry, and finishes tailored for real daily use.",
          icon: Home,
          link: "/kitchen-remodels",
        },
      ],
    },
    {
      title: "Accessibility & Comfort",
      description:
        "Safety-first upgrades and comfort improvements designed for Oregon homes.",
      visual: {
        variant: "moss",
        title: "Safer, More Comfortable",
        subtitle:
          "Accessibility retrofits and comfort fixes that reduce risk and improve livability.",
      },
      items: [
        {
          title: "Accessibility Retrofits",
          description:
            "Grab bars, curbless showers, wider entries, and safer transitions.",
          icon: ShieldCheck,
          link: "/accessibility-retrofits",
        },
        {
          title: "Energy Comfort Retrofits",
          description:
            "Air sealing, insulation, and balance fixes to reduce drafts and hot spots.",
          icon: Thermometer,
          link: "/energy-comfort-retrofits",
        },
      ],
    },
    {
      title: "Commercial Services",
      description:
        "Focused scopes for tenant turns, preventive work, and compliance fixes.",
      visual: {
        variant: "clay",
        title: "Commercial Support",
        subtitle:
          "Turnover, compliance, and preventive work for small facilities.",
      },
      items: [
        {
          title: "Commercial Tenant Turns",
          description:
            "Turnover scopes, refreshes, and punch lists to get units ready.",
          icon: Building2,
          link: "/commercial/tenant-turns",
        },
        {
          title: "Commercial Preventive Maintenance",
          description:
            "Scheduled checks and repairs to reduce emergencies and downtime.",
          icon: ShieldCheck,
          link: "/commercial/preventive-maintenance",
        },
        {
          title: "Emergency Commercial Repairs",
          description:
            "Rapid response for leaks, access issues, and urgent damage.",
          icon: Shield,
          link: "/commercial/emergency-repairs",
        },
        {
          title: "ADA Compliance Fixes",
          description: "Targeted accessibility upgrades that reduce liability.",
          icon: ClipboardList,
          link: "/commercial/ada-compliance",
        },
      ],
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
      label: "request a scope review",
      to: "/contact",
      description: "Get a documented plan and scheduling options.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  const blogLinks = BLOG_POSTS.map((post) => ({
    label: post.title,
    to: `/blog/${post.slug}`,
    description: post.excerpt,
    intent: "guide",
    cta: "Read article",
  }));

  return (
    <>
      <SEO
        title="Oregon Maintenance Plans, Restoration & Facilities Services"
        description="Professional maintenance plans, water damage restoration, mold remediation, inspection repairs, and commercial facilities support across Harney County and the Mid-Willamette Valley."
        keywords="Oregon maintenance plans, water damage restoration Oregon, mold remediation Oregon, moisture control Oregon, inspection repairs Oregon, commercial maintenance Oregon, service agreements Oregon, accessibility retrofits Oregon, energy comfort retrofits Oregon, Harney County contractor, Mid-Willamette Valley contractor"
        type="website"
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
              Maintenance Plans, Restoration & Facility-Ready Services
            </h1>
            <p className="text-xl text-cream">
              Licensed Oregon contractor delivering maintenance plans, emergency
              restoration, and inspection-ready repairs across Harney County and
              the Mid-Willamette Valley.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-contractor-black mb-4 text-center">
            Order Fixed-Price Services
          </h2>
          <p className="text-lg text-restoration-gray text-center mb-10 max-w-3xl mx-auto">
            Skip the estimate process for common services. Fixed pricing,
            professional service, guaranteed results.
          </p>
          <FixedPriceServiceMenu
            filterCategory="all"
            showSubscriptions={true}
            className="mb-16"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {serviceGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-contractor-black mb-2">
                      {group.title}
                    </h2>
                    <p className="text-restoration-gray max-w-3xl">
                      {group.description}
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <VisualBlock
                      variant={group.visual?.variant}
                      title={group.visual?.title}
                      subtitle={group.visual?.subtitle}
                      className="w-64"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.title}
                        to={service.link}
                        className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-maroon hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                              Service
                            </p>
                            <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                              {service.title}
                            </h3>
                          </div>
                          <Icon className="w-5 h-5 text-maroon" />
                        </div>
                        <p className="text-sm text-gray-600 mt-3 mb-0">
                          {service.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <FeaturedToolsBlock
            links={[...TOP_TOOL_LINKS, TOOLS_HUB_LINK]}
            subtitle="High-intent tools for budgets, replacement timing, and ROI."
          />
          <RelatedGuidesBlock
            links={ALL_GUIDE_LINKS}
            subtitle="Planning guidance for maintenance, repairs, and prevention."
          />
          <LinkGrid
            title="Latest insights"
            subtitle="Restoration and maintenance guidance from our team."
            links={blogLinks}
            columns={2}
          />
          <NextStepsBlock
            links={nextSteps}
            subtitle="Pick the best-fit service path based on urgency and scope."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-6">
            Not Sure What You Need?
          </h2>
          <p className="text-xl text-restoration-gray mb-8">
            Our experienced team can assess your situation and recommend the
            right solution. Contact us for a free consultation and estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5413215115">
              <Button
                size="lg"
                className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: (541) 321-5115
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white w-full sm:w-auto"
              >
                Request Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-restoration-gray mt-6">
            Licensed, Bonded & Insured • CCB# 258533 • Serving Harney County &
            Mid-Valley Oregon
          </p>
        </div>
      </section>
    </>
  );
};

export default ServicesOverview;
