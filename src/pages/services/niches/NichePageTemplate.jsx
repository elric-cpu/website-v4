import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingMatrix from "@/components/services/PricingMatrix";
import ServiceMenu from "@/components/services/ServiceMenu";
import { PRICING_NOTES } from "@/data/nicheMenus";
import FaqSection from "@/components/faq/FaqSection";
import { buildFaqSchema } from "@/lib/seo/faqSchema";
import VisualBlock from "@/components/VisualBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import RelatedGuidesBlock from "@/components/internal-links/RelatedGuidesBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";

function buildServiceSchema({ schemaType, title, description, serviceType }) {
  return {
    "@context": "https://schema.org",
    "@type": schemaType || "Service",
    serviceType: serviceType || title,
    provider: { "@type": "GeneralContractor", name: "Benson Home Solutions" },
    description,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Harney County, OR" },
      { "@type": "AdministrativeArea", name: "Mid-Willamette Valley, OR" },
    ],
  };
}

export default function NichePageTemplate({
  meta,
  hero,
  menu,
  pricing,
  highlights,
  faqs = [],
  faqSchema,
  internalLinks = {},
}) {
  const schema = buildServiceSchema({
    schemaType: "Service",
    title: meta.title,
    description: meta.description,
    serviceType: meta.serviceType,
  });

  const resolvedFaqSchema =
    faqSchema || (faqs.length ? buildFaqSchema(faqs) : null);
  const schemaList = [schema];
  if (resolvedFaqSchema) schemaList.push(resolvedFaqSchema);
  const {
    nextSteps = [],
    tools = [],
    guides = [],
    locations = [],
    subtitle,
  } = internalLinks;
  const hasInternalLinks =
    nextSteps.length || tools.length || guides.length || locations.length;

  return (
    <>
      <SEO
        title={meta.seoTitle}
        description={meta.seoDescription}
        keywords={meta.keywords}
        schema={schemaList}
        type="service"
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {hero.badge && (
                <div className="inline-flex items-center gap-2 bg-maroon text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                  {hero.badge}
                </div>
              )}
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">{hero.h1}</h1>
              <p className="text-xl text-cream mb-6">{hero.subhead}</p>

              <div className="space-y-3 text-gray-200">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cream flex-shrink-0 mt-1" />
                    <p className="m-0">{h}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to={hero.primaryCtaHref}>
                  <Button
                    size="lg"
                    className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto"
                  >
                    {hero.primaryCtaLabel}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="tel:5413215115">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-contractor-black w-full sm:w-auto"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call (541) 321-5115
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-cream rounded-lg p-6 shadow-2xl">
                <VisualBlock
                  variant={hero.visual?.variant}
                  eyebrow={hero.visual?.eyebrow || "Specialty Service"}
                  title={hero.visual?.title || hero.h1}
                  subtitle={hero.visual?.subtitle || hero.subhead}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ServiceMenu
            title={menu.title}
            items={menu.items}
            disclaimer={menu.disclaimer}
          />

          <PricingMatrix
            title={pricing.title}
            columns={pricing.columns}
            rows={pricing.rows}
            finePrint={pricing.finePrint}
          />

          <div className="bg-cream border border-gray-200 rounded-lg p-6">
            <p className="font-bold text-contractor-black mb-2">
              How pricing works
            </p>
            <ul className="space-y-2">
              {PRICING_NOTES.map((n) => (
                <li key={n} className="text-sm text-restoration-gray">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {hasInternalLinks ? (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {nextSteps.length ? (
              <NextStepsBlock links={nextSteps} subtitle={subtitle} />
            ) : null}
            {tools.length ? (
              <RelatedToolsBlock
                links={tools}
                subtitle="Estimate scopes, budget ranges, and timing."
              />
            ) : null}
            {guides.length ? (
              <RelatedGuidesBlock
                links={guides}
                subtitle="Supporting guidance for next-step decisions."
              />
            ) : null}
            {locations.length ? (
              <LocationsServedBlock
                links={locations}
                subtitle="Harney County and Mid-Willamette Valley teams."
              />
            ) : null}
          </div>
        </section>
      ) : null}

      <FaqSection items={faqs} className="bg-white" />

      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-contractor-black mb-6">
            Ready for a documented estimate?
          </h2>
          <p className="text-xl text-restoration-gray mb-8">
            Tell us what you are seeing. We will recommend the smallest reliable
            fix and document the scope for your records.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={hero.primaryCtaHref}>
              <Button
                size="lg"
                className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto"
              >
                {hero.primaryCtaLabel}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
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
            Licensed, Bonded & Insured • CCB# 258533
          </p>
        </div>
      </section>
    </>
  );
}
