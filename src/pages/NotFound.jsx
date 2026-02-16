import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found | Benson Home Solutions"
        description="The page you are looking for was moved or no longer exists. Visit our services, maintenance plans, or contact page."
        robots="noindex, follow"
      />

      <section className="min-h-[70vh] bg-white flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-wide text-maroon font-semibold mb-3">
            404 - Not Found
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-contractor-black mb-4">
            We could not find that page
          </h1>
          <p className="text-lg text-restoration-gray mb-8">
            Try one of the sections below or head back to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="w-full sm:w-auto">
              <Button className="w-full bg-maroon hover:bg-red-700 text-white">
                Go to Home
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-2 border-maroon text-maroon hover:bg-maroon hover:text-white"
              >
                View Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full border-2 border-gray-300 text-contractor-black hover:border-maroon hover:text-maroon"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
