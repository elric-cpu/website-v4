import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap = {
    services: "Services",
    "water-damage-restoration": "Water Damage Restoration",
    "mold-remediation": "Mold Remediation",
    "bathroom-remodels": "Bathroom Remodels",
    "kitchen-remodels": "Kitchen Remodels",
    "inspection-repairs": "Inspection Repairs",
    "maintenance-plans": "Maintenance Plans",
    "moisture-control": "Moisture Control",
    "accessibility-retrofits": "Accessibility Retrofits",
    "insurance-claims-repairs": "Insurance Claims Repairs",
    "energy-comfort-retrofits": "Energy Comfort Retrofits",
    "commercial-maintenance": "Commercial Maintenance",
    commercial: "Commercial Services",
    "commercial-service-agreements": "Service Agreements",
    "service-areas": "Service Areas",
    "harney-county": "Harney County",
    "mid-valley": "Mid-Willamette Valley",
    burns: "Burns, OR",
    hines: "Hines, OR",
    "sweet-home": "Sweet Home, OR",
    about: "About Us",
    reviews: "Reviews",
    blog: "Blog",
    contact: "Contact",
  };

  if (pathnames.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="py-4 bg-gray-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm text-restoration-gray">
          <li>
            <Link to="/" className="hover:text-maroon flex items-center">
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const name = breadcrumbNameMap[value] || value.replace(/-/g, " ");

            return (
              <li key={to} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                {isLast ? (
                  <span
                    className="font-semibold text-contractor-black capitalize"
                    aria-current="page"
                  >
                    {name}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="hover:text-maroon capitalize transition-colors"
                  >
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
