import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, X, User, Users } from "lucide-react";
import { serviceAreaData } from "@/data/serviceAreas";
import siteImages from "@/data/siteImages";
import HeaderDesktopNav from "@/components/layout/header/HeaderDesktopNav";
import HeaderMobileNav from "@/components/layout/header/HeaderMobileNav";
import HeaderTopBar from "@/components/layout/header/HeaderTopBar";
import { SERVICE_GROUPS } from "@/components/layout/header/serviceGroups";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAreasOpen, setIsAreasOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white border-b border-gray-200"}`}
    >
      <HeaderTopBar />

      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={siteImages.logo}
              alt="Benson Home Solutions logo"
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-contractor-black">
                Benson Home Solutions
              </span>
              <span className="text-xs text-restoration-gray">
                Oregon Maintenance & Restoration
              </span>
            </div>
          </Link>

          <HeaderDesktopNav
            serviceGroups={SERVICE_GROUPS}
            serviceAreaData={serviceAreaData}
          />

          <div className="flex items-center gap-4">
            {/* Portal Access - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="relative group">
                <button className="flex items-center gap-2 text-contractor-black hover:text-maroon transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                  <User className="w-4 h-4" />
                  Portals
                </button>
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    to="/portals"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-contractor-black hover:bg-gray-50 hover:text-maroon transition-colors border-b border-gray-100"
                  >
                    <User className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Portal Directory</div>
                      <div className="text-xs text-gray-500">
                        Choose your portal access
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/client-portal"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-contractor-black hover:bg-gray-50 hover:text-maroon transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Client Portal</div>
                      <div className="text-xs text-gray-500">
                        Project updates & approvals
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/sub-portal"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-contractor-black hover:bg-gray-50 hover:text-maroon transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Subcontractor Portal</div>
                      <div className="text-xs text-gray-500">
                        Work management & invoicing
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/staff-portal"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-contractor-black hover:bg-gray-50 hover:text-maroon transition-colors rounded-b-lg"
                  >
                    <Phone className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Staff Portal</div>
                      <div className="text-xs text-gray-500">
                        AI estimating & management
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <a
              href="tel:5413215115"
              className="hidden lg:flex items-center gap-2 bg-maroon text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-contractor-black hover:text-maroon transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <HeaderMobileNav
          isMenuOpen={isMenuOpen}
          isServicesOpen={isServicesOpen}
          isAreasOpen={isAreasOpen}
          onToggleServices={() => setIsServicesOpen(!isServicesOpen)}
          onToggleAreas={() => setIsAreasOpen(!isAreasOpen)}
          serviceGroups={SERVICE_GROUPS}
          serviceAreaData={serviceAreaData}
        />
      </nav>
    </header>
  );
};

export default Header;
