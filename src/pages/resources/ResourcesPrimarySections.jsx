import React from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  BookOpen,
  Calculator,
  FileText,
  HelpCircle,
  Users,
} from "lucide-react";
import { GUIDES } from "@/data/guides";

const ResourcesPrimarySections = () => (
  <>
    <section id="tools-downloads" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <Anchor className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Tools & Downloads
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/resources/home-maintenance-estimator"
          className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                Interactive Tool
              </p>
              <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                Home Maintenance Estimator
              </h3>
            </div>
            <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
          </div>
          <p className="text-sm text-gray-600 mt-3 mb-0">
            Quick cost range for annual maintenance with ZIP context.
          </p>
        </Link>

        <Link
          to="/resources/calculators"
          className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                Calculators
              </p>
              <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                Maintenance & ROI Calculators
              </h3>
            </div>
            <Calculator className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
          </div>
          <p className="text-sm text-gray-600 mt-3 mb-0">
            HVAC sizing, energy savings, repair costs, and more with ZIP code
            adjustments.
          </p>
        </Link>

        <Link
          to="/resources/home-maintenance-recordbook"
          className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                PDF Download
              </p>
              <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                Home Maintenance Recordbook
              </h3>
            </div>
            <FileText className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
          </div>
          <p className="text-sm text-gray-600 mt-3 mb-0">
            Track repairs, appliances, warranties, and seasonal tasks.
          </p>
        </Link>

        <Link
          to="/resources/home-restoration-resource-guide"
          className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                PDF Download
              </p>
              <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                Resource Guide for Home Restoration
              </h3>
            </div>
            <FileText className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
          </div>
          <p className="text-sm text-gray-600 mt-3 mb-0">
            Step-by-step restoration guide for Oregon homeowners.
          </p>
        </Link>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Prefer direct PDFs?{" "}
        <a
          href="/resources/home-maintenance-recordbook.pdf"
          className="text-maroon font-semibold hover:underline"
        >
          Download the Recordbook
        </a>{" "}
        or{" "}
        <a
          href="/resources/home-restoration-resource-guide.pdf"
          className="text-maroon font-semibold hover:underline"
        >
          download the Restoration Guide
        </a>
        .
      </div>
    </section>

    <section id="guides" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Guides & Checklists
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            to={`/resources/guides/${guide.slug}`}
            className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                  {guide.category}
                </p>
                <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                  {guide.title}
                </h3>
              </div>
              <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
            </div>
            <p className="text-sm text-gray-600 mt-3 mb-0">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>
    </section>

    <section id="portals" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Portals & Account Access
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/client-portal-login"
          className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                Client Portal
              </p>
              <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                Client Portal Login
              </h3>
            </div>
            <Users className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
          </div>
          <p className="text-sm text-gray-600 mt-3 mb-0">
            Access project updates, documents, invoices, and schedules.
          </p>
        </Link>

        <Link
          to="/subcontractor-portal-login"
          className="group block bg-white p-6 rounded-xl border border-gray-200 hover:border-maroon hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide m-0">
                Partner Portal
              </p>
              <h3 className="text-lg font-bold text-contractor-black group-hover:text-maroon transition-colors mt-1">
                Subcontractor Portal Login
              </h3>
            </div>
            <Users className="w-5 h-5 text-gray-400 group-hover:text-maroon" />
          </div>
          <p className="text-sm text-gray-600 mt-3 mb-0">
            View work orders, reporting requirements, and schedules.
          </p>
        </Link>
      </div>
    </section>
  </>
);

export default ResourcesPrimarySections;
