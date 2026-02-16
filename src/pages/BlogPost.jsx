import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
  Calendar,
  User,
  ArrowLeft,
  Phone,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import siteImages from "@/data/siteImages";
import VisualBlock from "@/components/VisualBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import RelatedToolsBlock from "@/components/internal-links/RelatedToolsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  TOP_TOOL_LINKS,
  TOOLS_HUB_LINK,
} from "@/data/internalLinks";

const BlogPost = () => {
  const { slug } = useParams();

  // Helper to generate schema for blog posts
  const generateBlogSchema = (post) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image,
    author: {
      "@type": "Organization",
      name: "Benson Home Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "Benson Home Solutions",
      logo: {
        "@type": "ImageObject",
        url: siteImages.logoAbsolute,
      },
    },
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    description: post.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bensonhomesolutions.com/blog/${slug}`,
    },
  });

  const posts = {
    "hidden-water-damage-signs": {
      title:
        "Top 10 Warning Signs of Hidden Water Damage in Your Walls and Ceilings",
      date: "December 12, 2023",
      dateISO: "2023-12-12",
      category: "Water Damage Restoration",
      description:
        "Discover the 10 most common signs of hidden water damage in walls and ceilings. Learn what to look for, when to call a pro, and how to prevent costly repairs. Oregon homeowners guide.",
      image: siteImages.ogDefault,
      faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does a water stain on the ceiling look like?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Water stains on ceilings typically appear as yellow, brown, or copper-colored discoloration. They often have concentric rings or irregular shapes and may be slightly damp to the touch.",
            },
          },
          {
            "@type": "Question",
            name: "Can I paint over water stains?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Never paint over a water stain without first fixing the underlying leak and ensuring the area is completely dry. Painting over trapped moisture will only lead to peeling paint and potential mold growth.",
            },
          },
          {
            "@type": "Question",
            name: "Does homeowners insurance cover hidden water damage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It depends. Sudden and accidental damage (like a burst pipe) is usually covered. Gradual damage (like a slow leak you ignored) is often denied. Immediate professional documentation is key to a successful claim.",
            },
          },
          {
            "@type": "Question",
            name: "How do I check for water damage inside a wall?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Professionals use non-invasive moisture meters and thermal imaging cameras. As a homeowner, look for warping, soft drywall, or musty smells. Do not open the wall yourself if you suspect mold.",
            },
          },
        ],
      },
      content: (
        <>
          <p className="lead text-xl text-restoration-gray mb-6 font-medium">
            Water is the silent destroyer of homes. By the time you see a puddle
            on the floor, the damage behind your walls may already be extensive.
          </p>
          <p className="mb-6">
            For Oregon homeowners accustomed to wet winters, identifying the{" "}
            <strong>signs of water damage</strong> early is critical. Hidden
            leaks don't just rot wood and ruin drywall—they create the perfect
            breeding ground for mold, which can start growing in as little as 24
            to 48 hours.
          </p>
          <p className="mb-6">
            At Benson Home Solutions, we follow IICRC standards for inspection
            and restoration. We know that what you see on the surface is often
            just the tip of the iceberg. Here are the top 10 warning signs that
            water is hiding in your walls or ceilings.
          </p>

          <div className="bg-cream border-l-4 border-maroon p-6 my-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-contractor-black mb-2">
              Don't Wait for Mold
            </h3>
            <p className="mb-4">
              If you spot any of these signs, don't guess. Get a professional
              assessment.
            </p>
            <Link to="/contact">
              <Button className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto">
                Schedule a Free Water Damage Inspection
              </Button>
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            1. Discoloration or Staining
          </h2>
          <div className="mb-6">
            <VisualBlock
              variant="slate"
              eyebrow="Visible Sign"
              title="Ceiling Staining"
              subtitle="Yellow or brown rings often indicate pooled water above the surface."
            />
          </div>
          <p className="mb-4">
            One of the most obvious signs is discoloration. Look for yellow,
            brown, or copper-colored spots on your ceilings or walls. These
            "rings" often indicate where water has pooled and evaporated
            repeatedly. Even small, faint stains can signal a significant leak
            in the plumbing or roof above.
          </p>
          <p className="mb-4 font-semibold text-maroon">
            <Link to="/water-damage-restoration" className="hover:underline">
              Need help identifying stains? Contact our restoration team.
            </Link>
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            2. Soft or Spongy Drywall
          </h2>
          <div className="mb-6">
            <VisualBlock
              variant="moss"
              eyebrow="Structural Risk"
              title="Soft Drywall"
              subtitle="Saturated drywall loses integrity and can hide mold growth."
            />
          </div>
          <p className="mb-4">
            Drywall acts like a sponge. When it absorbs water, it loses
            structural integrity. If you press on a section of your wall and it
            feels soft, mushy, or indented, the drywall is saturated. This is a
            severe sign that requires immediate removal of the affected material
            to prevent collapse and mold spread.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            3. Peeling Paint or Wallpaper
          </h2>
          <p className="mb-4">
            When moisture builds up behind a wall, it pushes outward. This
            pressure breaks the bond between the wall surface and your paint or
            wallpaper. If you see bubbling paint, peeling edges, or wallpaper
            that is separating from the wall without an obvious cause, hidden
            moisture is the likely culprit.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            4. Musty Odors
          </h2>
          <p className="mb-4">
            Trust your nose. A persistent, earthy, or musty smell is a hallmark
            of hidden mold growth. Even if you can't see the water, the smell
            indicates that moisture is trapped somewhere—under floors, inside
            walls, or in the attic. This is particularly common in basements and
            bathrooms.
          </p>
          <p className="mb-4">
            <Link
              to="/mold-remediation"
              className="text-maroon font-semibold hover:underline"
            >
              Learn more about our Mold Remediation services.
            </Link>
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            5. Visible Mold or Mildew
          </h2>
          <div className="mb-6">
            <VisualBlock
              variant="ink"
              eyebrow="Air Quality"
              title="Surface Mold"
              subtitle="Visible mold often signals hidden moisture deeper in the wall assembly."
            />
          </div>
          <p className="mb-4">
            If you see small black, green, or white specks on your baseboards,
            ceiling corners, or walls, you likely have a larger problem behind
            the surface. Surface mold is often the "bloom" of a root system
            established deep in the damp drywall or insulation.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            6. Warped or Buckled Walls
          </h2>
          <p className="mb-4">
            Sheetrock and wood framing swell when wet. This can cause your walls
            to bow, warp, or buckle. If a wall that was previously straight now
            looks wavy or curved, it is absorbing moisture. This indicates
            long-term exposure and potential structural compromise.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            7. Sagging Ceilings
          </h2>
          <p className="mb-4">
            A sagging ceiling is an emergency. It indicates that water is
            pooling on top of the drywall or plaster, creating immense weight.
            This is a major safety hazard, as the ceiling could collapse. If you
            notice a "bubble" or sag in your ceiling, move valuables out of the
            area and call for emergency help immediately.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            8. Increased Humidity or Condensation
          </h2>
          <p className="mb-4">
            Does your home feel sticky or clammy? Do windows fog up excessively,
            even when you aren't cooking or showering? Excess indoor humidity
            often comes from a hidden water source constantly evaporating into
            your home's air.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            9. Pest Activity
          </h2>
          <p className="mb-4">
            Insects like silverfish, ants, and termites love damp environments.
            Rodents are also attracted to soft, water-damaged wood. A sudden
            infestation can sometimes be traced back to a hidden leak providing
            the pests with the moisture they need to thrive.
          </p>

          <h2 className="text-3xl font-bold text-contractor-black mt-12 mb-6">
            10. Rising Water Stains
          </h2>
          <p className="mb-4">
            Unlike ceiling stains that come from above, marks that start at the
            floor and creep up the wall indicate "wicking." This usually stems
            from a slab leak, foundation issue, or flooding that wasn't properly
            dried. This water is often absorbed directly into the framing of
            your home.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg my-12">
            <h2 className="text-2xl font-bold text-contractor-black mb-4">
              Why Hidden Water Damage is Dangerous
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-maroon flex-shrink-0" />
                <span>
                  <strong>Structural Integrity:</strong> Over time, water rots
                  wood framing, rusts metal fasteners, and degrades drywall,
                  threatening the safety of your home.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-maroon flex-shrink-0" />
                <span>
                  <strong>Health Risks:</strong> Mold releases spores that can
                  cause respiratory issues, allergies, and other health problems
                  for your family.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-maroon flex-shrink-0" />
                <span>
                  <strong>Insurance Complications:</strong> Insurance policies
                  often deny claims for "gradual damage" or "neglect."
                  Identifying and fixing leaks quickly is essential for
                  coverage.
                </span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-contractor-black mt-12 mb-6">
            How to Inspect for Hidden Damage
          </h2>
          <div className="mb-6">
            <VisualBlock
              variant="clay"
              eyebrow="Inspection"
              title="Moisture Meter Check"
              subtitle="Professional tools confirm hidden saturation without invasive demolition."
            />
          </div>
          <p className="mb-4">
            While professional tools are best, you can perform a basic
            inspection:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Check under sinks and behind toilets regularly.</li>
            <li>Look in your attic for roof leaks after heavy rains.</li>
            <li>Inspect caulking around tubs and showers.</li>
            <li>Monitor your water bill for unexplained spikes.</li>
          </ul>
          <p className="mb-6">
            However, without moisture meters and thermal imaging, you can't see
            what's happening inside the wall. If you suspect a leak,{" "}
            <Link to="/contact" className="text-maroon font-semibold underline">
              call Benson Home Solutions
            </Link>{" "}
            for a professional assessment.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-12 mb-6">
            What to Do If You Find Water Damage
          </h2>
          <ol className="list-decimal pl-6 mb-8 space-y-4">
            <li>
              <strong>Stop the Water:</strong> Shut off the main water valve if
              the source is plumbing.
            </li>
            <li>
              <strong>Ensure Safety:</strong> Watch out for electrical hazards
              near water.
            </li>
            <li>
              <strong>Call a Professional:</strong> Contact a certified
              restoration company like Benson Home Solutions immediately.
            </li>
            <li>
              <strong>Document Everything:</strong> Take photos of the damage
              for your insurance claim before cleanup begins.
            </li>
          </ol>

          <div className="mt-12 mb-12">
            <h2 className="text-3xl font-bold text-contractor-black mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-2">
                  What does a water stain on the ceiling look like?
                </h3>
                <p className="text-restoration-gray">
                  Water stains on ceilings typically appear as yellow, brown, or
                  copper-colored discoloration. They often have concentric rings
                  or irregular shapes and may be slightly damp to the touch.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-2">
                  Can I paint over water stains?
                </h3>
                <p className="text-restoration-gray">
                  Never paint over a water stain without first fixing the
                  underlying leak and ensuring the area is completely dry.
                  Painting over trapped moisture will only lead to peeling paint
                  and potential mold growth.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-2">
                  Does homeowners insurance cover hidden water damage?
                </h3>
                <p className="text-restoration-gray">
                  It depends. Sudden and accidental damage (like a burst pipe)
                  is usually covered. Gradual damage (like a slow leak you
                  ignored) is often denied. Immediate professional documentation
                  is key to a successful claim.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-lg mb-2">
                  How do I check for water damage inside a wall?
                </h3>
                <p className="text-restoration-gray">
                  Professionals use non-invasive moisture meters and thermal
                  imaging cameras. As a homeowner, look for warping, soft
                  drywall, or musty smells. Do not open the wall yourself if you
                  suspect mold.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-maroon text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">
              Found signs of water damage?
            </h3>
            <p className="mb-6 text-cream text-lg">
              Don't let it spread. We serve Burns, Hines, Sweet Home, and the
              entire Mid-Valley area with Emergency restoration services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:5413215115">
                <Button className="bg-white text-maroon hover:bg-cream w-full sm:w-auto font-bold text-lg py-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (541) 321-5115
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-maroon w-full sm:w-auto font-bold text-lg py-6"
                >
                  Request Assessment
                </Button>
              </Link>
            </div>
          </div>
        </>
      ),
    },
    "first-24-hours-water-damage": {
      title: "What to Do in the First 24 Hours After Water Damage",
      date: "October 15, 2023",
      dateISO: "2023-10-15",
      category: "Water Damage Restoration",
      description:
        "Immediate steps Oregon homeowners should take to minimize damage and prepare for professional restoration.",
      content: (
        <>
          <p className="mb-4">
            Water damage moves fast. Within minutes, it spreads to other areas
            of your home. Within hours, it begins to warp wood and degrade
            drywall. Within 48 hours, mold growth can begin. Acting quickly is
            essential to saving your home and minimizing repair costs.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            1. Ensure Safety First
          </h2>
          <p className="mb-4">
            Before doing anything, ensure it is safe to enter the area. If
            standing water has reached electrical outlets or if the ceiling is
            sagging, do not enter. Turn off the electricity to the affected area
            from the breaker box if it is safe to do so.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            2. Stop the Water Source
          </h2>
          <p className="mb-4">
            If the water is coming from a burst pipe or appliance, shut off the
            main water valve immediately. This is usually located in the
            basement, crawlspace, or near the street. If the flooding is from a
            natural disaster, focus on safety and evacuation.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            3. Call a Professional Restoration Company
          </h2>
          <p className="mb-4">
            Call Benson Home Solutions immediately at (541) 321-5115. We offer
            24/7 emergency service. The sooner we arrive with professional
            extraction and drying equipment, the better chance you have of
            saving flooring and drywall.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            4. Document the Damage
          </h2>
          <p className="mb-4">
            While waiting for help, take photos and videos of all damaged areas
            and items for insurance purposes. Do not throw away damaged items
            until your adjuster has seen them.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            5. Begin Water Removal (If Safe)
          </h2>
          <p className="mb-4">
            If safe, you can start mopping up standing water or using a wet/dry
            vac. Move valuables, electronics, and furniture to a dry area. Place
            aluminum foil under furniture legs to prevent staining on wet
            carpets.
          </p>
        </>
      ),
    },
    "mold-vs-mildew": {
      title: "Mold vs Mildew: How to Tell, When to Call a Pro",
      date: "September 28, 2023",
      dateISO: "2023-09-28",
      category: "Mold Remediation",
      description:
        "Learn the key differences between mold and mildew, when you can clean it yourself, and when you need to call a professional.",
      content: (
        <>
          <p className="mb-4">
            Finding fungal growth in your home is alarming, but knowing the
            difference between mold and mildew can help you determine the
            severity of the problem and the right course of action.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            What is Mildew?
          </h2>
          <p className="mb-4">
            Mildew is a surface fungi that is typically gray or white and
            powdery. It often appears on moist surfaces like shower grout,
            windowsills, or damp fabric. Because it grows on the surface, it can
            often be cleaned with standard household cleaners and a scrub brush.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            What is Mold?
          </h2>
          <p className="mb-4">
            Mold is often darker (green, black, red, or blue) and can look fuzzy
            or slimy. Crucially, mold roots into porous materials like drywall,
            wood, and insulation. You cannot simply wipe it away because the
            "roots" remain deep inside the material.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            When to Call a Professional
          </h2>
          <p className="mb-4">
            If you are dealing with surface mildew on tile, you can likely
            handle it yourself. However, you should call Benson Home Solutions
            if:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The affected area is larger than 10 square feet.</li>
            <li>The mold is on porous material (drywall, wood, carpet).</li>
            <li>There is a strong musty odor.</li>
            <li>You have had recent water damage.</li>
            <li>Family members are experiencing respiratory issues.</li>
          </ul>
          <p className="mb-4">
            Professional remediation involves containment, air filtration, safe
            removal of materials, and treating the underlying moisture source.
          </p>
        </>
      ),
    },
    "bathroom-remodel-costs": {
      title: "Bathroom Remodel Cost Drivers in Oregon",
      date: "September 10, 2023",
      dateISO: "2023-09-10",
      category: "Remodeling",
      description:
        "Understanding what factors influence the cost of a bathroom renovation, from materials and labor to plumbing changes and permit fees.",
      content: (
        <>
          <p className="mb-4">
            Planning a bathroom remodel in Oregon? Understanding where your
            budget goes is the first step to a successful project. While every
            project is unique, several key factors drive the final cost.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            1. Scope of Work
          </h2>
          <p className="mb-4">
            A "pull-and-replace" remodel (new fixtures in the same location) is
            significantly cheaper than a layout change. Moving plumbing lines
            (to move a toilet or shower) requires opening walls and floors,
            increasing labor and material costs.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            2. Materials and Finishes
          </h2>
          <p className="mb-4">
            This is the biggest variable. A standard fiberglass tub/shower unit
            costs much less than a custom tiled walk-in shower. Similarly, stock
            vanities are more affordable than custom cabinetry. Tile costs vary
            from $2/sq ft to over $50/sq ft.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            3. Labor and Trades
          </h2>
          <p className="mb-4">
            A bathroom remodel involves multiple specialized trades: demolition,
            carpentry, plumbing, electrical, drywall, tiling, and painting.
            Skilled labor is an investment in longevity—poorly installed
            waterproofing can lead to thousands in rot repair later.
          </p>

          <h2 className="text-2xl font-bold text-contractor-black mt-8 mb-4">
            4. Hidden Issues
          </h2>
          <p className="mb-4">
            Especially in older Oregon homes, we often find water damage or
            outdated plumbing/electrical once walls are opened. We recommend
            setting aside a 10-15% contingency fund for these unforeseen
            repairs.
          </p>
        </>
      ),
    },
  };

  const post = posts[slug];
  const remodelingLink = {
    label: "bathroom remodels",
    to: "/bathroom-remodels",
    description: "Scope planning for remodels with clear timelines.",
    intent: "service",
    cta: "Explore remodels",
  };
  const categoryPrimaryLink = {
    "Water Damage Restoration": SERVICE_PILLAR_LINKS.water,
    "Mold Remediation": SERVICE_PILLAR_LINKS.mold,
    Remodeling: remodelingLink,
  };
  const primaryServiceLink =
    categoryPrimaryLink[post?.category] || SERVICE_PILLAR_LINKS.inspection;
  const nextSteps = [
    {
      ...primaryServiceLink,
      cta: primaryServiceLink.cta || "Explore service",
    },
    {
      ...MAINTENANCE_LINKS.home,
      cta: "Preventive plan",
    },
    {
      ...SERVICE_PILLAR_LINKS.inspection,
      cta: "Inspection repairs",
    },
    {
      label: "request service",
      to: "/contact",
      description: "Get a documented scope and scheduling plan.",
      intent: "contact",
      cta: "Request service",
    },
  ];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Combine schemas: BlogPosting + optional FAQ
  const schema = [generateBlogSchema(post)];
  if (post.faqSchema) {
    schema.push(post.faqSchema);
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.description}
        schema={schema}
        type="article"
        image={post.image || undefined}
      />

      <section className="py-12 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-maroon font-semibold mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4 text-sm text-restoration-gray mb-4">
            <span className="bg-white px-3 py-1 rounded-full text-contractor-black font-semibold border border-gray-200">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-contractor-black mb-6">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-restoration-gray">
            {post.content}
          </div>

          <div className="mt-16 p-8 bg-cream rounded-lg border-2 border-maroon">
            <h3 className="text-2xl font-bold text-contractor-black mb-4">
              Need Professional Help?
            </h3>
            <p className="mb-6 text-restoration-gray">
              Whether you're dealing with water damage or planning a remodel,
              Benson Home Solutions is here to help. Serving Burns, Hines, Sweet
              Home, and the Mid-Valley.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:5413215115">
                <Button className="bg-maroon hover:bg-opacity-90 text-white w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" />
                  Call (541) 321-5115
                </Button>
              </a>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-maroon text-maroon hover:bg-maroon hover:text-white w-full sm:w-auto"
                >
                  Request Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Choose the service line or maintenance plan that fits this topic."
          />
          <RelatedToolsBlock
            links={[
              TOP_TOOL_LINKS[2],
              TOP_TOOL_LINKS[1],
              TOP_TOOL_LINKS[0],
              TOOLS_HUB_LINK,
            ]}
            subtitle="Estimate budgets, repair timing, and ROI."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>
    </>
  );
};

export default BlogPost;
