import React from "react";
import { Award, CheckCircle, ExternalLink, ShieldCheck } from "lucide-react";

const ResourcesRightsSections = () => (
  <>
    <section id="homeowner-rights" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Know Your Rights as an Oregon Homeowner
        </h2>
      </div>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Navigating insurance claims can be intimidating, but Oregon law
          provides strong protections for homeowners to prevent coercion. The
          most critical right you possess during a disaster is the{" "}
          <strong>Right to Choose</strong>.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
          <h3 className="text-xl font-bold text-yellow-900 mt-0">
            Crucial Fact:
          </h3>
          <p className="mb-0 text-yellow-900">
            You do <strong>NOT</strong> have to use your insurance company's
            preferred vendors. While adjusters may strongly suggest a specific
            restoration company, they cannot force you to use them.
          </p>
        </div>
        <p>
          If an insurance carrier pressures you, remind them that you have
          selected a contractor you trust. You have the right to select{" "}
          <strong>Benson Home Solutions</strong> (Benson Enterprises LLC) or any
          other qualified, licensed contractor for your restoration work.
        </p>
        <h4 className="font-bold text-gray-900 mt-4">Helpful Links:</h4>
        <ul className="not-prose space-y-2 mt-2">
          <li>
            <a
              href="https://dfr.oregon.gov/Pages/index.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Oregon Division of Financial
              Regulation (DFR)
            </a>
          </li>
          <li>
            <a
              href="https://www.doj.state.or.us/consumer-protection/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Oregon Attorney General
              Consumer Protection
            </a>
          </li>
        </ul>
      </div>
    </section>

    <hr className="border-gray-200" />

    <section id="certified-contractors" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Finding Certified & Qualified Contractors
        </h2>
      </div>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          Not all contractors are created equal. In the restoration industry,
          the gold standard is the{" "}
          <strong>
            IICRC (Institute of Inspection, Cleaning and Restoration
            Certification)
          </strong>
          . An IICRC-certified firm has undergone rigorous training to
          understand the science of drying and ethics of restoration.
        </p>
        <h3 className="text-xl font-bold text-gray-900">
          Verify Before You Hire:
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>IICRC Certification:</strong>{" "}
            <a
              href="https://www.iicrc.org/search/custom.asp?id=4785"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Verify a Pro here
            </a>
            .
          </li>
          <li>
            <strong>CCB Licensing:</strong> Always check the{" "}
            <a
              href="https://www.oregon.gov/ccb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Oregon Construction Contractors Board
            </a>{" "}
            for active licenses and complaint history.
          </li>
          <li>
            <strong>Local Reputation:</strong> Check Google Reviews and
            membership in local bodies like the{" "}
            <strong>Harney County Chamber of Commerce</strong>.
          </li>
        </ul>
        <div className="bg-blue-50 p-6 rounded-lg mt-6">
          <p className="font-bold text-blue-900 m-0 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-maroon" />
            Benson Home Solutions (Benson Enterprises LLC) is IICRC Certified
            and a proud member of the Harney County Chamber of Commerce.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default ResourcesRightsSections;
