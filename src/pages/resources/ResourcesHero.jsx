import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import VisualBlock from "@/components/VisualBlock";

const ResourcesHero = ({ onScrollToSection }) => (
  <section className="bg-contractor-black text-white py-16 lg:py-24 relative overflow-hidden">
    <div className="absolute inset-0 opacity-90">
      <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
        <BookOpen className="w-4 h-4" />
        Homeowner Knowledge Base
      </div>
      <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
        Practical Resources for Home Restoration in Oregon
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Guides, calculators, and checklists for water damage, maintenance, and
        inspection repairs across Harney County and the Mid-Willamette Valley.
      </p>
      <div className="max-w-lg mx-auto mb-8">
        <VisualBlock
          variant="slate"
          eyebrow="Tools & Guides"
          title="Oregon Homeowner Resource Center"
          subtitle="Actionable checklists, calculators, and restoration guidance built for Oregon conditions."
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => onScrollToSection("homeowner-rights")}
          className="bg-maroon hover:bg-red-700 text-white font-bold px-6 py-6"
        >
          Know Your Rights
        </Button>
        <Button
          onClick={() => onScrollToSection("emergency-preparedness")}
          variant="outline"
          className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-contractor-black font-bold px-6 py-6"
        >
          Emergency Prep
        </Button>
      </div>
    </div>
  </section>
);

export default ResourcesHero;
