import { isEmail, isPhone, sanitizeText } from "@/lib/validators";

const MAX_FIELD_LENGTH = 500;
const LOCALHOST_HOSTS = new Set(["localhost", "127.0.0.1"]);

const isLocalhost = (hostname) => LOCALHOST_HOSTS.has(hostname);

export const assertSafeEndpoint = (endpoint) => {
  let url;
  try {
    url = new URL(endpoint);
  } catch {
    throw new Error("Invalid lead endpoint URL.");
  }

  const isHttps = url.protocol === "https:";
  const isLocal = url.protocol === "http:" && isLocalhost(url.hostname);

  if (!isHttps && !isLocal) {
    throw new Error("Lead endpoint must use https (or localhost for dev).");
  }

  return url.toString();
};

const sanitizeString = (value) =>
  sanitizeText(String(value || ""))
    .trim()
    .slice(0, MAX_FIELD_LENGTH);

export const sanitizeLeadPayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Lead payload must be an object.");
  }

  const sanitized = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value === "string" || typeof value === "number") {
      const text = sanitizeString(value);
      if (/email/i.test(key) && text && !isEmail(text)) {
        throw new Error("Invalid email address.");
      }
      if (/phone/i.test(key) && text && !isPhone(text)) {
        throw new Error("Invalid phone number.");
      }
      sanitized[key] = text;
      return;
    }

    sanitized[key] = value;
  });

  return sanitized;
};
