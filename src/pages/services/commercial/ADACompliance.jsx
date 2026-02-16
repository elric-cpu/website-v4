import React from "react";
import CommercialServiceTemplate from "./_CommercialServiceTemplate";

export default function ADACompliance() {
  return (
    <CommercialServiceTemplate
      title="ADA Compliance Fixes"
      description="Targeted accessibility modifications that reduce risk and improve usability for customers and tenants."
      bullets={[
        "Handrail and guard repairs (scope-dependent)",
        "Threshold and trip-hazard corrections",
        "Clearance adjustments (doors/paths) where feasible",
        "Grab bars and restroom accessory upgrades",
        "Signage and hardware improvements (scope-dependent)",
        "Documentation and closeout photos",
      ]}
      faqs={[
        {
          question: "Do you perform full ADA audits?",
          answer:
            "We focus on targeted fixes. If a full audit is required, we can coordinate with an ADA specialist.",
        },
        {
          question: "What are the most common ADA upgrades?",
          answer:
            "Threshold corrections, grab bars, door hardware adjustments, and signage updates are common quick wins.",
        },
        {
          question: "Will you work around business hours?",
          answer:
            "Yes. We can schedule work during off-hours to minimize disruption.",
        },
        {
          question: "Do these upgrades require permits?",
          answer:
            "Some changes may require permits depending on scope. We will advise based on your local jurisdiction.",
        },
        {
          question: "Can you provide documentation for compliance records?",
          answer: "Yes. We provide photos and closeout notes for your records.",
        },
        {
          question: "Can ADA work be bundled with other repairs?",
          answer:
            "Yes. We often combine ADA fixes with preventive maintenance or tenant turns.",
        },
        {
          question: "How quickly can you schedule an ADA walkthrough?",
          answer: "Typically within 1-2 weeks depending on location and scope.",
        },
        {
          question: "What is the next step to get a quote?",
          answer:
            "Contact us for a walkthrough and we will deliver a prioritized scope and cost range.",
        },
      ]}
      seoTitle="ADA Compliance Fixes Oregon"
      seoDescription="Targeted ADA accessibility fixes for small commercial properties: trip hazards, rails, thresholds, restroom accessories, and documentation across Oregon."
      keywords="ADA compliance contractor Oregon, accessibility repairs, commercial ADA fixes, ADA restroom upgrades, trip hazard corrections"
    />
  );
}
