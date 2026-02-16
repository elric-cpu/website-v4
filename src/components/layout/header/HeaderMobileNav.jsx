import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HeaderMobileNav = ({
  isMenuOpen,
  isServicesOpen,
  isAreasOpen,
  onToggleServices,
  onToggleAreas,
  serviceGroups,
  serviceAreaData,
}) => (
  <AnimatePresence>
    {isMenuOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="lg:hidden border-t border-gray-200 overflow-hidden"
      >
        <div className="py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <Link
            to="/"
            className="block py-2 text-contractor-black hover:text-maroon font-medium"
          >
            Home
          </Link>

          <div>
            <button
              onClick={onToggleServices}
              className="w-full flex items-center justify-between py-2 text-contractor-black hover:text-maroon font-medium"
            >
              Services
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-4 space-y-2 border-l-2 border-gray-100 ml-2"
                >
                  {serviceGroups.map((group) => (
                    <div key={group.label} className="py-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        {group.label}
                      </p>
                      <div className="mt-2 space-y-2">
                        {group.items.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className="block py-1 text-sm text-gray-600 hover:text-maroon"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <button
              onClick={onToggleAreas}
              className="w-full flex items-center justify-between py-2 text-contractor-black hover:text-maroon font-medium"
            >
              Service Areas
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isAreasOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isAreasOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-4 space-y-2 border-l-2 border-gray-100 ml-2"
                >
                  <div className="py-2">
                    <h4 className="font-bold text-maroon text-sm mb-1">
                      {serviceAreaData["harney-county"].label}
                    </h4>
                    <Link
                      to="/service-areas/harney-county"
                      className="block py-1 text-sm text-maroon font-semibold"
                    >
                      View Harney County
                    </Link>
                    {serviceAreaData["harney-county"].towns.map((town) => (
                      <Link
                        key={town.slug}
                        to={`/service-areas/harney-county/${town.slug}`}
                        className="block py-1 text-sm text-gray-600 ml-2"
                      >
                        {town.name}
                      </Link>
                    ))}
                  </div>

                  <div className="py-2">
                    <h4 className="font-bold text-maroon text-sm mb-1">
                      {serviceAreaData["mid-valley"].label}
                    </h4>
                    <Link
                      to="/service-areas/mid-willamette-valley"
                      className="block py-1 text-sm text-maroon font-semibold"
                    >
                      View Mid-Willamette Valley
                    </Link>
                    {Object.entries(serviceAreaData["mid-valley"].counties).map(
                      ([key, county]) => (
                        <div key={key} className="mb-3 ml-2">
                          <h5 className="font-semibold text-xs uppercase text-gray-500 mb-1">
                            {county.label}
                          </h5>
                          <div className="grid grid-cols-2 gap-1">
                            {county.towns.map((town) => (
                              <Link
                                key={town.slug}
                                to={`/service-areas/mid-valley/${town.slug}`}
                                className="block py-1 text-sm text-gray-600"
                              >
                                {town.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  <Link
                    to="/service-areas"
                    className="block py-2 text-sm text-maroon font-semibold"
                  >
                    View All Service Areas
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/about"
            className="block py-2 text-contractor-black hover:text-maroon font-medium"
          >
            About
          </Link>
          <Link
            to="/resources"
            className="block py-2 text-contractor-black hover:text-maroon font-medium"
          >
            Resources
          </Link>
          <div className="border-t border-gray-100 pt-2">
            <p className="text-xs uppercase tracking-widest text-gray-500 px-2 mb-1">
              Portals
            </p>
            <Link
              to="/client-portal"
              className="block py-2 text-contractor-black hover:text-maroon font-medium"
            >
              Client Portal
            </Link>
            <Link
              to="/sub-portal"
              className="block py-2 text-contractor-black hover:text-maroon font-medium"
            >
              Subcontractor Portal
            </Link>
            <Link
              to="/staff-portal"
              className="block py-2 text-contractor-black hover:text-maroon font-medium"
            >
              Staff Portal
            </Link>
          </div>
          <Link
            to="/contact"
            className="block py-2 text-contractor-black hover:text-maroon font-medium"
          >
            Contact
          </Link>

          <a
            href="tel:5413215115"
            className="flex items-center justify-center gap-2 bg-maroon text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all mt-4"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default HeaderMobileNav;
