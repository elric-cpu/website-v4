import React from "react";
import CommercialServiceTemplate from "./_CommercialServiceTemplate";

export default function PreventiveMaintenance() {
  return (
    <CommercialServiceTemplate
      title="Preventive Maintenance"
      description="Scheduled inspections and small fixes that prevent failures and reduce tenant disruptions."
      bullets={[
        "Quarterly or monthly walkthroughs",
        "Minor repairs discovered on-site",
        "Caulking, sealants, and water-shedding details",
        "Door alignment, closers, and hardware adjustments",
        "Trip hazards and safety repairs",
        "Maintenance logs suitable for property records",
      ]}
      faqs={[
        {
          question: "How often should preventive maintenance be scheduled?",
          answer:
            "Most properties benefit from quarterly walkthroughs. High-traffic facilities may need monthly visits.",
        },
        {
          question: "What systems do you inspect?",
          answer:
            "We focus on building envelope, doors, hardware, water intrusion points, and common safety issues.",
        },
        {
          question: "Do you include HVAC maintenance?",
          answer:
            "We can coordinate HVAC tune-ups and filter plans with licensed trade partners.",
        },
        {
          question: "Will you document findings?",
          answer:
            "Yes. We provide photos, notes, and a maintenance log for your records.",
        },
        {
          question: "Can we bundle emergency response?",
          answer:
            "Yes. Service agreements include priority response and defined call-out protocols.",
        },
        {
          question: "Is there a minimum contract term?",
          answer:
            "We offer annual agreements with flexible response tiers. Shorter engagements are scoped case-by-case.",
        },
        {
          question: "What if we need additional repairs?",
          answer:
            "We provide clear change orders and recommend the smallest reliable fix first.",
        },
        {
          question: "How do we get started?",
          answer:
            "Complete the service agreement funnel and we will schedule a baseline walkthrough.",
        },
      ]}
      seoTitle="Preventive Maintenance for Small Commercial Properties"
      seoDescription="Preventive maintenance plans for clinics, offices, churches, and warehouses under 50k sq ft across Oregon."
      keywords="preventive maintenance contractor, facility maintenance Oregon, commercial maintenance plan, quarterly maintenance plan, maintenance logs"
    />
  );
}
