import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data/reviews"; // Importing the manageable data file
import SEO from "@/components/SEO";
import NextStepsBlock from "@/components/internal-links/NextStepsBlock";
import LocationsServedBlock from "@/components/internal-links/LocationsServedBlock";
import {
  GEO_HUB_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
} from "@/data/internalLinks";

const Reviews = () => {
  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
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

  return (
    <>
      <SEO
        title="Customer Reviews | Benson Home Solutions"
        description="Read verified customer feedback for water damage restoration, maintenance plans, and remodeling services across Oregon."
        keywords="Benson Home Solutions reviews, Oregon contractor reviews, water damage restoration reviews, mold remediation reviews, remodeling reviews Oregon, maintenance plans reviews"
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
              Customer Reviews
            </h1>
            <p className="text-xl text-cream mb-8">
              See what homeowners across Oregon are saying about our work.
            </p>

            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-lg font-medium">
                {averageRating.toFixed(1)}/5.0 Average Rating based on{" "}
                {reviews.length} reviews
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream rounded-lg p-8 shadow-md relative flex flex-col h-full"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-maroon opacity-20" />

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-restoration-gray mb-6 flex-grow italic">
                  "{review.text}"
                </p>

                <div className="mt-auto border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-bold text-contractor-black">
                        {review.name}
                      </p>
                      <p className="text-sm text-restoration-gray">
                        {review.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-white px-2 py-1 rounded text-xs font-medium text-maroon border border-maroon/20">
                        {review.service}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        {review.date}
                      </p>
                    </div>
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
            subtitle="Explore the programs our clients reference in their reviews."
          />
          <LocationsServedBlock links={GEO_HUB_LINKS} />
        </div>
      </section>

      <section className="py-20 bg-mitigation-graphite text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 text-cream" />
          <h2 className="text-3xl font-bold mb-6">Have You Worked With Us?</h2>
          <p className="text-xl text-cream mb-8">
            Your feedback helps us maintain our high standards and helps your
            neighbors find reliable contractors.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-maroon hover:bg-white hover:text-maroon text-white text-lg px-8 py-6"
            >
              Request Review Link
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Reviews;
