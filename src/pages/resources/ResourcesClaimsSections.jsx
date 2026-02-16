import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResourcesClaimsSections = () => (
  <>
    <hr className="border-gray-200" />

    <section id="insurance-claims" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Insurance Claims & Direct Billing
        </h2>
      </div>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Dealing with insurance can be the most stressful part of property
          damage. We use <strong>Xactimate</strong>, the industry-standard
          software used by all major insurance carriers, to ensure pricing is
          accurate and approved.
        </p>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 my-6">
          <h3 className="text-lg font-bold text-green-900 mt-0 mb-2">
            Direct Billing Service
          </h3>
          <p className="mb-0 text-green-800">
            Benson Home Solutions offers hassle-free direct insurance billing.
            We coordinate documentation, photos, and moisture logs directly with
            your adjuster so you typically only pay your deductible.
          </p>
        </div>
        <p>
          <strong>Tip:</strong> Always document damage with photos/video BEFORE
          cleanup begins. Don't throw away failed parts (like a burst pipe)
          until the adjuster inspects them.
        </p>
        <Link to="/blog/water-damage-insurance-oregon">
          <Button variant="outline" className="mt-4">
            Read our Oregon Insurance Guide
          </Button>
        </Link>
      </div>
    </section>

    <hr className="border-gray-200" />

    <section id="local-resources" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Local Resources & Business Ratings
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-3">Harney County</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <a
                href="https://www.harneycountychamber.org"
                className="text-blue-600 hover:underline flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" /> Chamber of Commerce
              </a>
            </li>
            <li className="text-gray-500 italic">
              Benson Enterprises LLC is a proud member
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-3">Business Verification</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <a
                href="https://www.oregon.gov/ccb"
                className="text-blue-600 hover:underline flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" /> Oregon CCB License Search
              </a>
            </li>
            <li>
              <a
                href="https://www.bbb.org"
                className="text-blue-600 hover:underline flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" /> Better Business Bureau
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </>
);

export default ResourcesClaimsSections;
