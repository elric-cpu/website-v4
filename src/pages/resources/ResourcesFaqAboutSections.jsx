import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, HelpCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResourcesFaqAboutSections = () => (
  <>
    <hr className="border-gray-200" />

    <section id="faq" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold text-contractor-black m-0">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-bold text-contractor-black">
            Is water damage covered by my insurance?
          </h4>
          <p className="text-gray-700 text-sm mt-2">
            Usually yes, if it is "sudden and accidental" (like a burst pipe).
            Gradual leaks or flood damage (rising water) are typically excluded.
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-bold text-contractor-black">
            Can I clean up mold myself?
          </h4>
          <p className="text-gray-700 text-sm mt-2">
            EPA guidelines suggest DIY cleanup only for areas smaller than 10
            square feet. For larger infestations, professional remediation is
            recommended to prevent spreading spores.
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-bold text-contractor-black">
            How long does drying take?
          </h4>
          <p className="text-gray-700 text-sm mt-2">
            Typically 3-5 days using professional dehumidifiers and air movers,
            depending on materials and saturation levels.
          </p>
        </div>
      </div>
    </section>

    <section
      id="about-benson"
      className="bg-contractor-black text-white p-8 rounded-xl scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-maroon" />
        <h2 className="text-3xl font-bold m-0">About Benson Home Solutions</h2>
      </div>
      <p className="text-gray-300 mb-6">
        Operating as <strong>Benson Enterprises LLC</strong>, we are a locally
        owned restoration and construction firm dedicated to serving our Oregon
        neighbors. We bridge the gap between rural Harney County and the
        bustling Willamette Valley, bringing certified expertise to every job.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-8 text-sm text-gray-300">
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-maroon" /> Harney County
            Chamber Member
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-maroon" /> IICRC Certified Firm
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-maroon" /> Licensed, Bonded &
            Insured
          </li>
        </ul>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-maroon" /> 24/7 Emergency
            Response
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-maroon" /> Direct Insurance
            Billing
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-maroon" /> Local Expertise
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h4 className="font-bold text-white mb-4">Proudly Serving:</h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          <strong>Harney County:</strong> Burns, Hines. <br />
          <strong>Linn County:</strong> Sweet Home, Lebanon, Brownsville,
          Halsey, Harrisburg, Scio, Tangent, Waterloo, Crabtree, Jefferson,
          Lacomb, Shedd, Sodaville, Lyons, Mill City, Gates, Detroit. <br />
          <strong>Marion County:</strong> Salem, Keizer, Silverton, Turner,
          Stayton, Sublimity, Aumsville, Scotts Mills, Mount Angel, Gervais,
          Woodburn, Hubbard, Canby, Oregon City, Molalla. <br />
          <strong>Polk & Yamhill:</strong> Corvallis, Monmouth, Independence,
          Dallas, Polk City, Rickreall, Falls City, Grand Ronde, Willamina,
          Sheridan, Yamhill, McMinnville, Newberg, Dundee, Carlton, Dayton,
          Amity.
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <a href="tel:5413215115">
          <Button className="bg-maroon hover:bg-white hover:text-maroon font-bold">
            Call (541) 321-5115
          </Button>
        </a>
        <Link to="/contact">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-contractor-black"
          >
            Contact Us
          </Button>
        </Link>
      </div>
    </section>
  </>
);

export default ResourcesFaqAboutSections;
