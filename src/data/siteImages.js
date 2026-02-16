const base = "/images";
const siteUrl =
  import.meta?.env?.VITE_SITE_URL || "https://bensonhomesolutions.com";
const toAbsolute = (path) =>
  path?.startsWith("http") ? path : `${siteUrl}${path}`;

const siteImages = {
  logo: `${base}/benson_logo.png`,
  ogDefault: `${base}/og-default.svg`,
  logoAbsolute: toAbsolute(`${base}/benson_logo.png`),
  ogDefaultAbsolute: toAbsolute(`${base}/og-default.svg`),
};

export default siteImages;
