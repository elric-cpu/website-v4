import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const HeaderDesktopNav = ({ serviceGroups, serviceAreaData }) => (
  <div className="hidden lg:flex items-center gap-8">
    <Link
      to="/"
      className="text-contractor-black hover:text-maroon transition-colors font-medium"
    >
      Home
    </Link>

    <div className="relative group">
      <button className="text-contractor-black hover:text-maroon transition-colors font-medium flex items-center gap-1">
        Services
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute top-full left-0 mt-2 w-[560px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
        <div className="grid grid-cols-2 gap-4 p-4">
          {serviceGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="block px-3 py-2 rounded text-contractor-black hover:bg-cream hover:text-maroon transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="col-span-2">
            <Link
              to="/services"
              className="flex items-center justify-between px-4 py-2 text-maroon hover:bg-cream font-semibold border-t border-gray-200"
            >
              View All Services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="relative group">
      <button className="text-contractor-black hover:text-maroon transition-colors font-medium flex items-center gap-1">
        Service Areas
        <ChevronDown className="w-4 h-4" />
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 p-6 grid grid-cols-3 gap-8">
        <div className="col-span-1 border-r border-gray-100 pr-4">
          <h3 className="font-bold text-maroon mb-3 border-b border-gray-100 pb-2">
            {serviceAreaData["harney-county"].label}
          </h3>
          <Link
            to="/service-areas/harney-county"
            className="block text-sm font-semibold text-maroon mb-2"
          >
            View Harney County
          </Link>
          <div className="space-y-1">
            {serviceAreaData["harney-county"].towns.map((town) => (
              <Link
                key={town.slug}
                to={`/service-areas/harney-county/${town.slug}`}
                className="block text-sm text-gray-600 hover:text-maroon hover:bg-gray-50 px-2 py-1 rounded"
              >
                {town.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="font-bold text-maroon mb-3 border-b border-gray-100 pb-2">
            {serviceAreaData["mid-valley"].label}
          </h3>
          <Link
            to="/service-areas/mid-willamette-valley"
            className="inline-flex text-sm font-semibold text-maroon mb-3"
          >
            View Mid-Willamette Valley
          </Link>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(serviceAreaData["mid-valley"].counties).map(
              ([key, county]) => (
                <div key={key}>
                  <h4 className="font-semibold text-contractor-black mb-2 text-sm uppercase tracking-wider">
                    {county.label}
                  </h4>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {county.towns.map((town) => (
                      <Link
                        key={town.slug}
                        to={`/service-areas/mid-valley/${town.slug}`}
                        className="block text-sm text-gray-600 hover:text-maroon hover:bg-gray-50 px-2 py-1 rounded"
                      >
                        {town.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="col-span-3 border-t border-gray-100 pt-3">
          <Link
            to="/service-areas"
            className="flex items-center justify-between px-3 py-2 text-maroon hover:bg-cream font-semibold rounded"
          >
            View All Service Areas
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>

    <Link
      to="/about"
      className="text-contractor-black hover:text-maroon transition-colors font-medium"
    >
      About
    </Link>
    <Link
      to="/resources"
      className="text-contractor-black hover:text-maroon transition-colors font-medium"
    >
      Resources
    </Link>
    <div className="relative group">
      <button className="text-contractor-black hover:text-maroon transition-colors font-medium flex items-center gap-1">
        Portals
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
        <div className="p-3 space-y-1">
          <Link
            to="/client-portal-login"
            className="block px-3 py-2 rounded text-contractor-black hover:bg-cream hover:text-maroon transition-colors"
          >
            Client Portal Login
          </Link>
          <Link
            to="/subcontractor-portal-login"
            className="block px-3 py-2 rounded text-contractor-black hover:bg-cream hover:text-maroon transition-colors"
          >
            Partner Portal Login
          </Link>
        </div>
      </div>
    </div>
    <Link
      to="/contact"
      className="text-contractor-black hover:text-maroon transition-colors font-medium"
    >
      Contact
    </Link>
  </div>
);

export default HeaderDesktopNav;
