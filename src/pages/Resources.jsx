import React from "react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import siteImages from "@/data/siteImages";
import { BLOG_POSTS } from "@/data/blogPosts";
import {
  ALL_TOOL_LINKS,
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  RESOURCE_LIBRARY_LINKS,
  SERVICE_DIRECTORY_LINKS,
  SERVICE_PILLAR_LINKS,
} from "@/data/internalLinks";
import ResourcesHero from "@/pages/resources/ResourcesHero";
import ResourcesPrimarySections from "@/pages/resources/ResourcesPrimarySections";
import ResourcesRightsSections from "@/pages/resources/ResourcesRightsSections";
import ResourcesDamageSections from "@/pages/resources/ResourcesDamageSections";
import ResourcesClaimsSections from "@/pages/resources/ResourcesClaimsSections";
import ResourcesFaqAboutSections from "@/pages/resources/ResourcesFaqAboutSections";
import ResourcesLinkBlocks from "@/pages/resources/ResourcesLinkBlocks";
import ResourcesSidebar from "@/pages/resources/ResourcesSidebar";

const Resources = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntity: {
      "@type": "Organization",
      name: "Benson Enterprises LLC",
      alternateName: "Benson Home Solutions",
      memberOf: {
        "@type": "Organization",
        name: "Harney County Chamber of Commerce",
        url: "https://www.harneycountychamber.org",
      },
      areaServed: [
        "Harney County",
        "Linn County",
        "Marion County",
        "Polk County",
        "Yamhill County",
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I have to use the restoration company my insurance recommends?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. In Oregon, you have the legal right to hire any licensed contractor you choose. You are not obligated to use your insurer's preferred vendor list.",
        },
      },
      {
        "@type": "Question",
        name: "How do I know if a restoration contractor is qualified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Look for IICRC certification, verification of an active CCB license in Oregon, valid insurance, and membership in local organizations like the Chamber of Commerce.",
        },
      },
    ],
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
  ];

  const toolDirectoryLinks = ALL_TOOL_LINKS.map((link) => ({
    ...link,
    cta: link.cta || "Open tool",
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

  return (
    <>
      <SEO
        title="Oregon Home Restoration Resources | Benson Home Solutions"
        description="Professional guides, calculators, and homeowner resources for restoration, maintenance planning, and insurance documentation across Oregon."
        keywords="Oregon home restoration resources, water damage guide, insurance claim documentation, maintenance checklist, home maintenance estimator, maintenance calculators, Oregon contractor resources, client portal, subcontractor portal"
        schema={[schema, faqSchema]}
        type="website"
        image={siteImages.ogDefault}
      />

      <Breadcrumbs />

      <ResourcesHero onScrollToSection={scrollToSection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <main className="lg:col-span-8 space-y-16">
            <ResourcesPrimarySections />
            <ResourcesRightsSections />
            <ResourcesDamageSections />
            <ResourcesClaimsSections />
            <ResourcesFaqAboutSections />
            <ResourcesLinkBlocks
              toolDirectoryLinks={toolDirectoryLinks}
              resourceLibraryLinks={resourceLibraryLinks}
              serviceDirectoryLinks={serviceDirectoryLinks}
              blogLinks={blogLinks}
              nextSteps={nextSteps}
              geoHubLinks={GEO_HUB_LINKS}
            />
          </main>

          <ResourcesSidebar onScrollToSection={scrollToSection} />
        </div>
      </div>
    </>
  );
};

export default Resources;
