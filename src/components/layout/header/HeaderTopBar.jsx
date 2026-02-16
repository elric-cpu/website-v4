import React from "react";
import { Phone } from "lucide-react";

const HeaderTopBar = () => (
  <div className="bg-maroon text-white py-2">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="font-semibold">CCB# 258533</span>
          <span className="hidden sm:inline">Licensed & Insured</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="tel:5413215115"
            className="hover:text-cream transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            (541) 321-5115
          </a>
          <a
            href="tel:5414130480"
            className="hover:text-cream transition-colors"
          >
            (541) 413-0480
          </a>
          <a
            href="mailto:Office@bensonhomesolutions.com"
            className="hover:text-cream transition-colors hidden md:inline"
          >
            Office@bensonhomesolutions.com
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderTopBar;
