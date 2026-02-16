import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import siteImages from "@/data/siteImages";

const Footer = () => {
  return (
    <footer className="bg-contractor-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src={siteImages.logo}
              alt="Benson Home Solutions logo"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-xl font-bold mb-2">Benson Home Solutions</p>
            <p className="text-cream text-sm mb-4">
              Oregon Maintenance & Restoration
            </p>
            <p className="text-structural-gray text-sm">CCB# 258533</p>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4 text-cream">Contact Us</p>
            <div className="space-y-3">
              <a
                href="tel:5413215115"
                className="flex items-center gap-2 text-structural-gray hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                (541) 321-5115
              </a>
              <a
                href="tel:5414130480"
                className="flex items-center gap-2 text-structural-gray hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                (541) 413-0480
              </a>
              <a
                href="mailto:Office@bensonhomesolutions.com"
                className="flex items-center gap-2 text-structural-gray hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                Office@bensonhomesolutions.com
              </a>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4 text-cream">
              Service Areas
            </p>
            <div className="space-y-2">
              <Link
                to="/service-areas/harney-county"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Harney County
              </Link>
              <Link
                to="/service-areas/harney-county/burns"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Burns, OR
              </Link>
              <Link
                to="/service-areas/harney-county/hines"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Hines, OR
              </Link>
              <Link
                to="/service-areas/mid-willamette-valley"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Mid-Willamette Valley
              </Link>
              <Link
                to="/service-areas/mid-valley/sweet-home"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Sweet Home, OR
              </Link>
              <p className="text-structural-gray text-sm pt-2">
                Lebanon, Albany & Mid-Valley
              </p>
            </div>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4 text-cream">Quick Links</p>
            <div className="space-y-2 mb-6">
              <Link
                to="/services"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Services Overview
              </Link>
              <Link
                to="/maintenance-plans"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Maintenance Plans
              </Link>
              <Link
                to="/water-damage-restoration"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Water Damage Restoration
              </Link>
              <Link
                to="/fire-smoke-damage"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Fire & Smoke Damage Cleanup
              </Link>
              <Link
                to="/commercial-maintenance"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Commercial Maintenance
              </Link>
              <Link
                to="/service-areas"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Service Areas
              </Link>
              <Link
                to="/about"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/resources"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Resources
              </Link>
              <Link
                to="/resources/home-maintenance-recordbook"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Home Maintenance Recordbook
              </Link>
              <Link
                to="/resources/home-restoration-resource-guide"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Restoration Resource Guide
              </Link>
              <Link
                to="/resources-help"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Resources Help
              </Link>
              <Link
                to="/blog"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                to="/reviews"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Reviews
              </Link>
              <a
                href="/landing/residential-maintenance-programs.html"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Maintenance Programs Overview
              </a>
              <a
                href="/landing/residential-maintenance-pricing.html"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Maintenance Pricing Sheet
              </a>
              <Link
                to="/sitemap"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Sitemap
              </Link>
              <Link
                to="/contact"
                className="block text-structural-gray hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="border-t border-restoration-gray pt-4 mt-4">
              <p className="text-sm font-semibold mb-3 text-cream">
                Portal Access
              </p>
              <div className="space-y-2">
                <Link
                  to="/client-portal"
                  className="block text-structural-gray hover:text-white transition-colors"
                >
                  Client Portal
                </Link>
                <Link
                  to="/sub-portal"
                  className="block text-structural-gray hover:text-white transition-colors"
                >
                  Subcontractor Portal
                </Link>
                <Link
                  to="/staff-portal"
                  className="block text-structural-gray hover:text-white transition-colors"
                >
                  Staff Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-restoration-gray mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-structural-gray text-sm text-center md:text-left">
              © {new Date().getFullYear()} Benson Home Solutions. All rights
              reserved.
            </p>
            <p className="text-cream text-sm text-center md:text-right">
              Estimates available. 24/7 emergency water damage restoration.
            </p>
          </div>
          <p className="text-structural-gray text-xs text-center mt-4">
            Licensed, Bonded & Insured • CCB# 258533 • Serving Harney County &
            Mid-Valley Oregon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
