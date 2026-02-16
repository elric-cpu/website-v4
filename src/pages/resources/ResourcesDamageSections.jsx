import React from "react";
import { AlertTriangle, Droplets, ExternalLink } from "lucide-react";

const ResourcesDamageSections = () => (
  <>
    <section id="water-damage-info" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <Droplets className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Water Damage Restoration Standards
        </h2>
      </div>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Proper restoration follows the <strong>S500 Standard</strong> set by
          the IICRC. Understanding the category of water is crucial:
        </p>
        <div className="grid md:grid-cols-3 gap-4 not-prose my-6">
          <div className="border border-gray-200 p-4 rounded bg-white shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Category 1 (Clean)</h4>
            <p className="text-sm text-gray-600">
              Broken pipes, supply lines. Safe to dry in place if caught
              quickly.
            </p>
          </div>
          <div className="border border-gray-200 p-4 rounded bg-white shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Category 2 (Gray)</h4>
            <p className="text-sm text-gray-600">
              Washing machine discharge, dishwasher. Contains
              chemicals/bacteria.
            </p>
          </div>
          <div className="border border-gray-200 p-4 rounded bg-white shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Category 3 (Black)</h4>
            <p className="text-sm text-gray-600">
              Sewage, flood waters. Grossly unsanitary. Materials must be
              removed.
            </p>
          </div>
        </div>
        <p>
          <strong>Regional Note:</strong> In <strong>Harney County</strong>,
          freeze-thaw cycles often cause burst pipes in exterior walls. In the{" "}
          <strong>Willamette Valley</strong>, high humidity means drying must be
          aggressive to prevent secondary mold growth.
        </p>
        <h4 className="font-bold text-gray-900 mt-4">Industry Resources:</h4>
        <ul className="not-prose grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          <li>
            <a
              href="https://www.iicrc.org"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> IICRC Standards
            </a>
          </li>
          <li>
            <a
              href="https://www.restorationindustry.org"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Restoration Industry
              Association
            </a>
          </li>
        </ul>
      </div>
    </section>

    <hr className="border-gray-200" />

    <section id="hazards" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Hazardous Materials: Asbestos, Mold & Lead
        </h2>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-contractor-black mb-3">
            Asbestos in Oregon
          </h3>
          <p className="text-gray-700 mb-4">
            Any renovation or demolition in a home built before 2004 typically
            requires an asbestos survey in Oregon. Disturbing asbestos releases
            fibers that cause lung cancer and mesothelioma.
          </p>
          <a
            href="https://www.oregon.gov/deq/aq/Pages/Asbestos.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon font-bold hover:underline flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> Oregon DEQ Asbestos Information
          </a>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-contractor-black mb-3">
            Mold Prevention & Testing
          </h3>
          <p className="text-gray-700 mb-4">
            Mold requires moisture, warmth, and organic food (drywall/wood). In
            the damp Willamette Valley, keeping indoor humidity below 50% is
            critical. If mold covers more than 10 sq ft, professional
            remediation guidelines (EPA) should be followed.
          </p>
          <a
            href="https://www.epa.gov/mold"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon font-bold hover:underline flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> EPA Mold Guide
          </a>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-contractor-black mb-3">
            Lead Safety (RRP)
          </h3>
          <p className="text-gray-700 mb-4">
            Homes built before 1978 may contain lead-based paint. Contractors
            must be RRP (Renovation, Repair, and Painting) certified to disturb
            painted surfaces in these homes to protect children from lead
            poisoning.
          </p>
          <a
            href="https://www.epa.gov/lead"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon font-bold hover:underline flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> EPA Lead Information
          </a>
        </div>
      </div>
    </section>
  </>
);

export default ResourcesDamageSections;
