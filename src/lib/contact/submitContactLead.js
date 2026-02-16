import { submitLead } from "@/lib/leads/submitLead";

export async function submitContactLead(payload) {
  return submitLead({
    payload,
    primaryEndpoint: import.meta?.env?.VITE_CONTACT_LEAD_ENDPOINT,
    fallbackEndpoint: import.meta?.env?.VITE_ESTIMATOR_LEAD_ENDPOINT,
    label: "contact",
  });
}
