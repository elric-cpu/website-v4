const workerBaseUrl = import.meta?.env?.VITE_WORKER_BASE_URL;
const isProd = import.meta?.env?.PROD;

if (!workerBaseUrl) {
  const message = "Missing VITE_WORKER_BASE_URL in .env";
  if (isProd) {
    throw new Error(message);
  }
  console.error(message);
}

const isLocalhostHost = (hostname) =>
  hostname === "localhost" || hostname === "127.0.0.1";

const assertSafeWorkerBaseUrl = (value) => {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid VITE_WORKER_BASE_URL.");
  }

  if (isProd && url.protocol !== "https:" && !isLocalhostHost(url.hostname)) {
    throw new Error("VITE_WORKER_BASE_URL must use https in production.");
  }

  return url.toString().replace(/\/$/, "");
};

const fallbackWorkerUrl = "http://127.0.0.1:54321";
const safeWorkerBaseUrl = assertSafeWorkerBaseUrl(
  workerBaseUrl || fallbackWorkerUrl,
);

const normalizeWorkerPath = (path) => {
  if (typeof path !== "string" || path.length === 0) {
    throw new Error("Worker path must be a non-empty string.");
  }
  if (/^https?:/i.test(path)) {
    throw new Error("Worker path must be relative.");
  }
  return path.startsWith("/") ? path : `/${path}`;
};

export const fetchFromWorker = async (
  path,
  { method = "POST", body, token } = {},
) => {
  const normalizedPath = normalizeWorkerPath(path);
  const endpoint = new URL(normalizedPath, safeWorkerBaseUrl);
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(endpoint.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Worker request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};
