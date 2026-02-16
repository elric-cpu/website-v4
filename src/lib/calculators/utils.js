export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const formatCurrencyPrecise = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export const formatNumber = (value, decimals = 0) => {
  const parsed = Number(value || 0);
  return parsed.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
};

export const formatPercent = (value, decimals = 0) =>
  `${formatNumber(value, decimals)}%`;
