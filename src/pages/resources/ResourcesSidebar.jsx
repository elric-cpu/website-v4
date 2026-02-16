import React from "react";
import {
  AlertTriangle,
  Anchor,
  Award,
  BookOpen,
  Droplets,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";

const ResourcesSidebar = ({ onScrollToSection }) => (
  <aside className="lg:col-span-4 space-y-8">
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
      <h3 className="text-lg font-bold text-contractor-black mb-4">
        In This Guide
      </h3>
      <nav aria-label="Guide navigation" className="space-y-2 text-sm">
        <button
          onClick={() => onScrollToSection("tools-downloads")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <Anchor className="w-4 h-4" /> Tools & Downloads
        </button>
        <button
          onClick={() => onScrollToSection("guides")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <BookOpen className="w-4 h-4" /> Guides
        </button>
        <button
          onClick={() => onScrollToSection("portals")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <Users className="w-4 h-4" /> Portals
        </button>
        <button
          onClick={() => onScrollToSection("homeowner-rights")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <ShieldCheck className="w-4 h-4" /> Homeowner Rights
        </button>
        <button
          onClick={() => onScrollToSection("certified-contractors")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <Award className="w-4 h-4" /> Finding Contractors
        </button>
        <button
          onClick={() => onScrollToSection("water-damage-info")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <Droplets className="w-4 h-4" /> Water Damage Info
        </button>
        <button
          onClick={() => onScrollToSection("hazards")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <AlertTriangle className="w-4 h-4" /> Asbestos & Mold
        </button>
        <button
          onClick={() => onScrollToSection("insurance-claims")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <FileText className="w-4 h-4" /> Insurance Claims
        </button>
        <button
          onClick={() => onScrollToSection("local-resources")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <MapPin className="w-4 h-4" /> Local Resources
        </button>
        <button
          onClick={() => onScrollToSection("about-benson")}
          className="flex items-center gap-2 text-gray-600 hover:text-maroon w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
        >
          <Users className="w-4 h-4" /> About Us
        </button>
      </nav>

      <hr className="my-6 border-gray-100" />

      <div className="mt-2 bg-maroon text-white p-6 rounded-lg text-center shadow-lg">
        <Phone className="w-8 h-8 mx-auto mb-2" />
        <h4 className="font-bold text-xl mb-1">24/7 Emergency</h4>
        <p className="text-sm text-white/90 mb-4">
          Immediate response for water damage across 5 counties.
        </p>
        <a
          href="tel:5413215115"
          className="block w-full py-3 bg-white text-maroon rounded font-bold hover:bg-gray-100 transition-colors"
        >
          (541) 321-5115
        </a>
      </div>
    </div>
  </aside>
);

export default ResourcesSidebar;
