import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Search,
  AlertTriangle,
  Wind,
  Umbrella,
  Building2,
  Phone,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
import VisualBlock from "@/components/VisualBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import LinkGrid from "@/components/internal-links/LinkGrid";
import {
  ALL_GUIDE_LINKS,
  ALL_TOOL_LINKS,
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  SERVICE_DIRECTORY_LINKS,
  RESOURCE_LIBRARY_LINKS,
} from "@/data/internalLinks";
import { BLOG_POSTS } from "@/data/blogPosts";

const ResourcesHelp = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Handle initial load with hash
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const lastUpdated = "February 4, 2026";

  const categories = [
    {
      id: "insurance",
      title: "Insurance Help & Claims",
      icon: <FileText className="w-6 h-6" />,
      description:
        "Official guidance for navigating insurance claims and disputes.",
      links: [
        {
          title: "Oregon Department of Consumer and Business Services (DCBS)",
          url: "https://www.oregon.gov/dcbs/insurance",
          desc: "Official Oregon insurance regulations, consumer protections, and complaint filing.",
        },
        {
          title: "Oregon Department of Financial and Regulatory Services (DFR)",
          url: "https://www.oregon.gov/dfr",
          desc: "Insurance dispute resolution and unfair claim handling complaints.",
        },
        {
          title: "National Association of Insurance Commissioners (NAIC)",
          url: "https://www.naic.org",
          desc: "Consumer resources and state insurance commissioner contact information.",
        },
        {
          title: "Insurance Information Institute",
          url: "https://www.iii.org",
          desc: "Homeowners insurance basics, coverage explanations, and claim tips.",
        },
      ],
    },
    {
      id: "verify",
      title: "Verify a Contractor",
      icon: <Search className="w-6 h-6" />,
      description:
        "Ensure you are hiring licensed, bonded, and reputable professionals.",
      links: [
        {
          title: "Oregon Construction Contractors Board (CCB)",
          url: "https://www.oregon.gov/ccb",
          desc: "Verify contractor licensing, check complaint history, and find licensed professionals.",
        },
        {
          title: "Better Business Bureau (BBB)",
          url: "https://www.bbb.org",
          desc: "Check business ratings, accreditation status, and customer reviews.",
        },
        {
          title:
            "IICRC (Institute of Inspection, Cleaning and Restoration Certification)",
          url: "https://www.iicrc.org",
          desc: "Find IICRC-certified water damage and restoration professionals.",
        },
        {
          title: "Restoration Industry Association (RIA)",
          url: "https://www.restorationindustry.org",
          desc: "Professional standards and member directory for restoration contractors.",
        },
      ],
    },
    {
      id: "hazards",
      title: "Asbestos & Lead Safety",
      icon: <AlertTriangle className="w-6 h-6" />,
      description: "Critical safety information for homes built before 2004.",
      links: [
        {
          title: "EPA Lead Information",
          url: "https://www.epa.gov/lead",
          desc: "Lead paint, lead in water, testing requirements, and health risks.",
        },
        {
          title: "Oregon Department of Environmental Quality (DEQ) - Asbestos",
          url: "https://www.oregon.gov/deq/aq/Pages/Asbestos.aspx",
          desc: "Asbestos survey requirements, renovation/demolition rules, and certified professionals.",
        },
        {
          title: "Oregon Health Authority - Lead Program",
          url: "https://www.oregon.gov/oha",
          desc: "State lead testing and abatement regulations for Oregon homes.",
        },
        {
          title: "EPA Asbestos Information",
          url: "https://www.epa.gov/asbestos",
          desc: "Federal asbestos standards, health effects, and professional guidance.",
        },
      ],
    },
    {
      id: "mold",
      title: "Mold & Indoor Air Quality",
      icon: <Wind className="w-6 h-6" />,
      description:
        "Managing moisture and preventing mold growth in Oregon's climate.",
      links: [
        {
          title: "EPA Mold Information",
          url: "https://www.epa.gov/mold",
          desc: "Mold prevention, testing, remediation, and health effects.",
        },
        {
          title: "Indoor Air Quality Association (IAQA)",
          url: "https://www.iaqa.org",
          desc: "Professional standards for indoor air quality and mold remediation.",
        },
        {
          title: "Oregon Health Authority - Environmental Health",
          url: "https://www.oregon.gov/oha/ph/EnvironmentalHealth",
          desc: "State guidance on mold, moisture, and indoor environmental health.",
        },
        {
          title: "American Drying Institute (ADI)",
          url: "https://www.americandryinginstitute.org",
          desc: "Professional standards for water damage drying and moisture control.",
        },
      ],
    },
    {
      id: "disaster",
      title: "Disaster Preparedness & Recovery",
      icon: <Umbrella className="w-6 h-6" />,
      description:
        "Resources for preparing for and recovering from major weather events.",
      links: [
        {
          title: "FEMA - Ready.gov",
          url: "https://www.ready.gov",
          desc: "Emergency preparedness, disaster recovery resources, and family planning.",
        },
        {
          title: "American Red Cross",
          url: "https://www.redcross.org",
          desc: "Disaster relief, emergency assistance, and preparedness training.",
        },
        {
          title: "Oregon Emergency Management",
          url: "https://www.oregon.gov/ooem",
          desc: "State disaster response, recovery resources, and emergency alerts.",
        },
        {
          title: "National Flood Insurance Program (NFIP)",
          url: "https://www.floodsmart.gov",
          desc: "Flood insurance information, coverage options, and policy details.",
        },
      ],
    },
    {
      id: "chambers",
      title: "Local Chambers of Commerce",
      icon: <Building2 className="w-6 h-6" />,
      description:
        "Connect with local businesses and community resources in our service area.",
      links: [
        {
          title: "Harney County Chamber of Commerce",
          url: "https://www.harneycountychamber.org",
          desc: "Local business directory and community resources for Burns and Hines.",
        },
        {
          title: "Sweet Home Chamber of Commerce",
          url: "https://www.sweethomechamber.org",
          desc: "Local business directory and community resources for Sweet Home area.",
        },
        {
          title: "Lebanon Chamber of Commerce",
          url: "https://www.lebanonchamber.org",
          desc: "Local business directory and community resources for Lebanon area.",
        },
        {
          title: "Corvallis Chamber of Commerce",
          url: "https://www.corvallis.org",
          desc: "Local business directory and community resources for Corvallis area.",
        },
        {
          title: "Salem Area Chamber of Commerce",
          url: "https://www.salemchamber.org",
          desc: "Local business directory and community resources for Salem area.",
        },
        {
          title: "Keizer Chamber of Commerce",
          url: "https://www.keizerchamber.org",
          desc: "Local business directory and community resources for Keizer area.",
        },
      ],
    },
  ];

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
      cta: "Preventive plan",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Inspection repairs",
    },
  ];

  const toolDirectoryLinks = ALL_TOOL_LINKS.map((link) => ({
    ...link,
    cta: link.cta || "Open tool",
  }));

  const guideDirectoryLinks = ALL_GUIDE_LINKS.map((link) => ({
    ...link,
    cta: link.cta || "Read guide",
  }));

  const serviceDirectoryLinks = SERVICE_DIRECTORY_LINKS.map((link) => ({
    ...link,
    cta: link.cta || "View service",
  }));

  const resourceLibraryLinks = RESOURCE_LIBRARY_LINKS.map((link) => ({
    ...link,
    cta: link.cta || "View resource",
  }));

  const blogLinks = BLOG_POSTS.map((post) => ({
    label: post.title,
    to: `/blog/${post.slug}`,
    description: post.excerpt,
    intent: "guide",
    cta: "Read article",
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Oregon Restoration Resources",
    description:
      "A comprehensive directory of resources for Oregon homeowners dealing with water damage, insurance claims, and restoration.",
    publisher: {
      "@type": "Organization",
      name: "Benson Home Solutions",
      url: "https://bensonhomesolutions.com",
    },
  };

  return (
    <>
      <SEO
        title="Oregon Restoration Resources & Help Links | Benson Home Solutions"
        description="Essential resources for Oregon homeowners. Links for insurance claims, contractor verification (CCB), asbestos/lead safety, mold prevention, and disaster preparedness."
        keywords="Oregon restoration resources, insurance claim help Oregon, contractor verification CCB, mold resources Oregon, disaster preparedness links"
        schema={schema}
        type="website"
      />

      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-contractor-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-90">
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6">
            Oregon Restoration Resources
          </h1>
          <p className="text-xl text-gray-200 mb-4 max-w-3xl leading-relaxed">
            Expert guidance for Oregon homeowners facing water damage, mold,
            fire/smoke, sewage, and storm challenges. We've compiled essential
            links and regulatory information to help you navigate property
            restoration with confidence.
          </p>
          <div className="max-w-lg">
            <VisualBlock
              variant="slate"
              eyebrow="Resource Directory"
              title="Verified Oregon Guidance"
              subtitle="Insurance, safety, and contractor verification resources in one place."
            />
          </div>
          <p className="text-sm text-gray-400 font-mono">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer Box */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 md:p-8 rounded-r-lg shadow-sm mb-12 flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
            <ShieldCheck className="w-8 h-8 text-blue-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-contractor-black mb-3">
              You Can Choose Your Restoration Contractor
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Important: Under Oregon law, your insurance carrier cannot force
              you to use a specific restoration company or "preferred vendor."
              You have the absolute right to hire the qualified, licensed
              professional you trust most to restore your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://dfr.oregon.gov/help/complaints-licenses/Pages/file-complaint.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-semibold hover:text-blue-900 flex items-center gap-2 group"
              >
                File a complaint with DFR{" "}
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Jump Links */}
        <nav
          className="flex flex-wrap gap-3 mb-16 pb-6 border-b border-gray-100"
          aria-label="Quick navigation"
        >
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-maroon hover:text-maroon transition-colors shadow-sm"
            >
              {cat.title}
            </a>
          ))}
        </nav>

        {/* Resources Grid */}
        <div className="space-y-16">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-28"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 rounded-lg text-maroon">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-contractor-black">
                    {category.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white p-6 rounded-lg border border-gray-200 hover:border-maroon hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-contractor-black group-hover:text-maroon transition-colors pr-4">
                        {link.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-maroon flex-shrink-0" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {link.desc}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <LinkGrid
            title="Tools directory"
            subtitle="Every calculator and estimator in one place."
            links={toolDirectoryLinks}
            columns={3}
          />
          <LinkGrid
            title="Guides & checklists"
            subtitle="Detailed guides to help you plan repairs and maintenance."
            links={guideDirectoryLinks}
            columns={3}
          />
          <LinkGrid
            title="Resource library"
            subtitle="Downloads and reference guides for homeowners."
            links={resourceLibraryLinks}
            columns={3}
          />
          <LinkGrid
            title="Service pathways"
            subtitle="Pick the service team that matches your situation."
            links={serviceDirectoryLinks}
            columns={3}
          />
          <LinkGrid
            title="Latest insights"
            subtitle="Recent articles from our restoration team."
            links={blogLinks}
            columns={2}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Now?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Benson Home Solutions is available 24/7 for emergency restoration in
            Harney County and Oregon's Mid-Valley.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <a href="tel:5413215115">
              <Button
                size="lg"
                className="bg-maroon hover:bg-red-700 text-white font-bold py-6 px-8 text-lg min-w-[200px]"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Help Now
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black font-bold py-6 px-8 text-lg min-w-[200px]"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            Serving Harney County and Oregon's Mid-Valley with IICRC Certified
            Expertise.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Apply what you learn to a documented scope and service plan."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>

      {/* Local SEO Footer */}
      <section className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-bold text-contractor-black mb-3">
                About Benson Home Solutions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Benson Home Solutions is a trusted restoration contractor
                serving <strong>Harney County</strong> (Burns, Hines) and{" "}
                <strong>Oregon's Mid-Valley</strong> (Albany, Lebanon, Sweet
                Home, Corvallis, Salem, Keizer, Stayton, Sublimity). We
                specialize in water damage restoration, emergency structural
                drying, mold remediation, fire/smoke cleanup, sewage cleanup,
                and storm damage restoration.
              </p>
            </div>
            <div className="md:border-l md:border-gray-200 md:pl-8">
              <h3 className="text-lg font-bold text-contractor-black mb-3">
                Why Choose Us?
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-maroon" /> 24/7 Emergency
                  Response
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-maroon" /> Direct
                  Insurance Billing
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-maroon" /> IICRC
                  Certified Technicians
                </li>
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-maroon" /> Member, Harney
                  County Chamber of Commerce
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Helper icon for local SEO section
const CheckCircle = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default ResourcesHelp;
