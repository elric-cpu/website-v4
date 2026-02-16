const DEFAULT_STRIPE_HOSTS = [
  "checkout.stripe.com",
  "pay.stripe.com",
  "billing.stripe.com",
];

const LOCALHOST_HOSTS = new Set(["localhost", "127.0.0.1"]);

export function parseHostList(value, fallback = []) {
  if (!value) return fallback;
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function getStripeAllowedHosts(envValue) {
  const extra = parseHostList(envValue);
  return Array.from(new Set([...DEFAULT_STRIPE_HOSTS, ...extra]));
}

export function isLocalhost(hostname) {
  return LOCALHOST_HOSTS.has(hostname);
}

export function isSafeHttpUrl(
  value,
  {
    allowedHosts = [],
    allowSameOrigin = true,
    allowHttpOnLocalhost = true,
    baseOrigin,
  } = {},
) {
  if (!value) return false;
  try {
    const origin =
      baseOrigin ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost");
    const url = new URL(value, origin);
    const protocolAllowed =
      url.protocol === "https:" ||
      (allowHttpOnLocalhost &&
        url.protocol === "http:" &&
        isLocalhost(url.hostname));

    if (!protocolAllowed) return false;

    if (allowSameOrigin && url.origin === origin) {
      return true;
    }

    if (allowedHosts.length > 0) {
      return allowedHosts.includes(url.hostname);
    }

    return allowSameOrigin;
  } catch {
    return false;
  }
}

export function ensureSafeRedirectUrl(value, options = {}) {
  if (!isSafeHttpUrl(value, options)) {
    throw new Error("Unsafe redirect URL.");
  }
  return value;
}

export function resolveSafeRedirectUrl(value, fallback, options = {}) {
  if (!value) return fallback;
  return isSafeHttpUrl(value, options) ? value : fallback;
}

export function safeExternalHref(value, options = {}) {
  return isSafeHttpUrl(value, options) ? value : null;
}
