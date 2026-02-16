import React from "react";
import CommercialServiceTemplate from "./_CommercialServiceTemplate";

export default function EmergencyRepairs() {
  return (
    <CommercialServiceTemplate
      title="Emergency Repairs"
      description="Priority response for leaks, security issues, and urgent damage to reduce downtime and liability."
      bullets={[
        "Leak investigations and targeted access (scope-dependent)",
        "Temporary dry-out measures when needed",
        "Door/security hardware repairs",
        "Board-up and safety securing (if applicable)",
        "Trip/fall hazards and urgent safety fixes",
        "Photo documentation for owner/PM records",
      ]}
      faqs={[
        {
          question: "How fast can you respond?",
          answer:
            "Service agreement clients receive priority dispatch. Same-day response is typical for urgent issues.",
        },
        {
          question: "Do you provide temporary fixes?",
          answer:
            "Yes. We stabilize the issue first, then provide a permanent repair plan.",
        },
        {
          question: "What counts as an emergency repair?",
          answer:
            "Active leaks, security or access failures, life-safety issues, and damage that stops business operations.",
        },
        {
          question: "Do you work after hours?",
          answer:
            "Yes. After-hours service is available and priced based on urgency and availability.",
        },
        {
          question: "Will you coordinate with insurance?",
          answer:
            "We can provide documentation and photos to assist with claims if needed.",
        },
        {
          question: "Do you cover multiple locations?",
          answer:
            "Yes. We serve Harney County and the Mid-Willamette Valley with centralized scheduling.",
        },
        {
          question: "How do you communicate updates?",
          answer:
            "We send photos, notes, and status updates to your preferred contact method.",
        },
        {
          question: "Can we roll emergency work into an agreement?",
          answer:
            "Yes. Agreements include defined response times and budgeting benefits.",
        },
      ]}
      seoTitle="Emergency Commercial Repairs Oregon"
      seoDescription="Priority-response commercial repairs for small facilities: leaks, safety hazards, door/security hardware, and urgent damage control across Oregon."
      keywords="emergency commercial repairs, facility emergency repair Oregon, urgent maintenance contractor, after-hours repairs, security hardware repair"
    />
  );
}
