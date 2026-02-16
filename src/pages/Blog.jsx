import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import VisualBlock from "@/components/VisualBlock";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import { BLOG_POSTS } from "@/data/blogPosts";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
} from "@/data/internalLinks";

const Blog = () => {
  const posts = BLOG_POSTS;
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

  return (
    <>
      <SEO
        title="Home Restoration & Construction Blog"
        description="Expert advice on water damage, mold remediation, maintenance, and remodeling for Oregon homeowners."
        keywords="Oregon home restoration blog, water damage tips, mold remediation guide, home maintenance advice, remodeling insights Oregon"
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
              Expert Advice & Insights
            </h1>
            <p className="text-xl text-cream">
              Practical tips and professional guidance for maintaining,
              restoring, and improving your Oregon home.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <Link to={`/blog/${post.slug}`} className="block p-4">
                  <VisualBlock
                    variant={post.variant}
                    eyebrow={post.category}
                    title={`${post.category} Guide`}
                    subtitle="Practical checklists, documentation tips, and next steps."
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-restoration-gray mb-3">
                    <span className="bg-cream px-2 py-1 rounded text-contractor-black font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="block mb-3">
                    <h2 className="text-xl font-bold text-contractor-black hover:text-maroon transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-restoration-gray text-sm mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-structural-gray">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <Button
                        variant="link"
                        className="text-maroon p-0 h-auto font-semibold"
                      >
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <NextStepsBlock
            links={nextSteps}
            subtitle="Use our guides to choose the right service or maintenance plan."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>
    </>
  );
};

export default Blog;
