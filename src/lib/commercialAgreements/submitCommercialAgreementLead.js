/**
 * Submits commercial service agreement leads.
 *
 * Default behavior:
 * - If VITE_COMMERCIAL_AGREEMENT_LEAD_ENDPOINT is set, POST JSON to that URL.
 * - Otherwise, fallback to VITE_ESTIMATOR_LEAD_ENDPOINT.
 * - If neither is set, log to console (keeps the UI functional on static deployments).
 */

import { submitLead } from "@/lib/leads/submitLead";

export async function submitCommercialAgreementLead(payload) {
  return submitLead({
    payload,
    primaryEndpoint: import.meta?.env?.VITE_COMMERCIAL_AGREEMENT_LEAD_ENDPOINT,
    fallbackEndpoint: import.meta?.env?.VITE_ESTIMATOR_LEAD_ENDPOINT,
    label: "commercial-agreement",
  });
}
