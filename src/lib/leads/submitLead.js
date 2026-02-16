import { assertSafeEndpoint, sanitizeLeadPayload } from "@/lib/leadUtils";

const isProd = Boolean(import.meta?.env?.PROD);
const isDev = Boolean(import.meta?.env?.DEV);

export async function submitLead({
  payload,
  primaryEndpoint,
  fallbackEndpoint,
  label = "lead",
}) {
  const sanitizedPayload = sanitizeLeadPayload(payload);
  const endpoint = primaryEndpoint || fallbackEndpoint;

  if (!endpoint) {
    if (isProd) {
      throw new Error("Lead endpoint not configured.");
    }
    if (isDev) {
      console.info(
        `[${label}] lead captured (no endpoint configured):`,
        sanitizedPayload,
      );
    }
    return { ok: true, mode: "noop" };
  }

  const safeEndpoint = assertSafeEndpoint(endpoint);

  const res = await fetch(safeEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sanitizedPayload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Lead submit failed (${res.status}): ${text || res.statusText}`,
    );
  }

  return {
    ok: true,
    mode: primaryEndpoint ? "primary-endpoint" : "fallback-endpoint",
  };
}
