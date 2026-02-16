import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import siteImages from "@/data/siteImages";

const SEO = ({
  title,
  description,
  schema,
  type = "website",
  image = siteImages.ogDefault,
  keywords,
  robots,
}) => {
  const location = useLocation();
  const domain =
    import.meta?.env?.VITE_SITE_URL || "https://bensonhomesolutions.com";
  const canonicalUrl = `${domain}${location.pathname}`;
  const absoluteImage = image?.startsWith("http") ? image : `${domain}${image}`;

  const siteTitle = "Benson Home Solutions";
  const defaultDescription =
    "Licensed Oregon contractor providing maintenance plans, restoration, and inspection repairs across Harney County and the Mid-Willamette Valley.";
  const safeTitle = String(title || siteTitle).trim();
  const fullTitle = safeTitle.includes(siteTitle)
    ? safeTitle
    : `${safeTitle} | ${siteTitle}`;
  const resolvedDescription = description?.trim() || defaultDescription;
  const defaultKeywords =
    "Benson Home Solutions, Oregon maintenance plans, home maintenance program, commercial maintenance program, maintenance planner, home maintenance budget, maintenance forecast, preventive maintenance checklist, maintenance subscription Oregon, water damage restoration Oregon, emergency water removal, structural drying, mold remediation Oregon, fire and smoke damage cleanup, moisture control Oregon, water intrusion repair, building envelope repairs, inspection repairs Oregon, pre-sale repairs, punch list repairs, accessibility retrofits Oregon, aging-in-place modifications, energy comfort retrofits, commercial maintenance Oregon, facilities maintenance, service agreements Oregon, insurance claims repairs, insurance documentation, home restoration Oregon, property maintenance services, maintenance calculators Oregon, home maintenance estimator, client portal login, subcontractor portal login, service portal, Harney County contractor, Mid-Willamette Valley contractor, Burns OR contractor, Hines OR contractor, Sweet Home OR contractor, Lebanon OR contractor, Albany OR contractor, Corvallis OR contractor, Salem OR contractor";
  const resolvedKeywords = keywords
    ? `${keywords}, ${defaultKeywords}`
    : defaultKeywords;
  const resolvedRobots =
    robots ||
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  // Default LocalBusiness Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Benson Home Solutions",
    image: absoluteImage,
    telephone: "(541) 321-5115",
    email: "Office@bensonhomesolutions.com",
    url: domain,
    sameAs: ["https://www.facebook.com/p/Benson-Enterprises-61565667928376/"],
    address: {
      "@type": "PostalAddress",
      addressRegion: "OR",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoShape",
      region: [
        "Harney County",
        "Linn County",
        "Marion County",
        "Polk County",
        "Yamhill County",
      ],
    },
    areaServed: [
      "Harney County, OR",
      "Linn County, OR",
      "Marion County, OR",
      "Polk County, OR",
      "Yamhill County, OR",
      "Burns, OR",
      "Hines, OR",
      "Sweet Home, OR",
      "Lebanon, OR",
      "Albany, OR",
      "Corvallis, OR",
      "Salem, OR",
      "Keizer, OR",
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Explicitly allow indexing */}
      <meta name="robots" content={resolvedRobots} />
      <meta name="keywords" content={resolvedKeywords} />
      <meta name="author" content="Benson Home Solutions" />
      <meta name="publisher" content="Benson Home Solutions" />
      <meta name="language" content="en" />
      <meta name="theme-color" content="#3C0008" />
      <meta name="geo.region" content="US-OR" />
      <meta
        name="geo.placename"
        content="Harney County, Mid-Willamette Valley, OR"
      />
      <meta name="geo.position" content="43.5865;-119.0540" />
      <meta name="ICBM" content="43.5865, -119.0540" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
