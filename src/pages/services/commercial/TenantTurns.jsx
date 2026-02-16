import React from "react";
import CommercialServiceTemplate from "./_CommercialServiceTemplate";

export default function TenantTurns() {
  return (
    <CommercialServiceTemplate
      title="Commercial Tenant Turns"
      description="Tenant turn scopes with clear documentation, predictable timelines, and minimal disruption."
      bullets={[
        "Walkthrough + punch list with photos",
        "Drywall/patch/paint touch-ups",
        "Doors, hardware, and minor carpentry",
        "Flooring repairs (scope-dependent)",
        "Restroom and breakroom refresh items",
        "Closeout documentation for owner/PM files",
      ]}
      faqs={[
        {
          question: "How fast can you complete a tenant turn?",
          answer:
            "Most small suites can be turned in 1-2 weeks depending on scope, material lead times, and inspections.",
        },
        {
          question: "Can you build the punch list for us?",
          answer:
            "Yes. We perform a walkthrough and deliver a scope with photos and priorities.",
        },
        {
          question: "Do you handle paint and flooring?",
          answer:
            "Yes. We handle patch/paint and many flooring repairs. Full replacements are scoped case-by-case.",
        },
        {
          question: "Will you coordinate with the new tenant’s timeline?",
          answer:
            "Yes. We align schedules with leasing and move-in deadlines to minimize vacancy.",
        },
        {
          question: "Can you reuse existing materials?",
          answer:
            "If materials are in good condition and code-compliant, we can reuse or refresh them.",
        },
        {
          question: "Do you work after hours?",
          answer:
            "After-hours work is available for occupied buildings or tight deadlines and is priced accordingly.",
        },
        {
          question: "Do you provide closeout documentation?",
          answer:
            "Yes. We include photos and completion notes for property management files.",
        },
        {
          question: "How do we get an estimate?",
          answer:
            "Start with a walkthrough request and we will send a detailed scope and pricing options.",
        },
      ]}
      seoTitle="Commercial Tenant Turns Oregon"
      seoDescription="Tenant turn repairs for small commercial properties: punch lists, paint, minor carpentry, and closeout documentation across Oregon."
      keywords="tenant turns Oregon, commercial punch list, property manager maintenance, commercial turnover repairs, make-ready services"
    />
  );
}
