/**
 * Submits estimator leads.
 *
 * Default behavior:
 * - If VITE_ESTIMATOR_LEAD_ENDPOINT is set, POST JSON to that URL.
 * - Otherwise, log to console (keeps the UI functional on static deployments).
 */

import { submitLead } from "@/lib/leads/submitLead";

export async function submitEstimatorLead(payload) {
  return submitLead({
    payload,
    primaryEndpoint: import.meta?.env?.VITE_ESTIMATOR_LEAD_ENDPOINT,
    label: "estimator",
  });
}
