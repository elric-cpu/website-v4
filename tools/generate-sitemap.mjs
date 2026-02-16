import { writeFile } from "node:fs/promises";
import { indexableRoutes } from "./routes.mjs";

const baseUrl = "https://bensonhomesolutions.com";
const today = new Date().toISOString().slice(0, 10);

const normalizePath = (path) => (path.startsWith("/") ? path : `/${path}`);
const routes = new Set(indexableRoutes.map(normalizePath));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...routes]
  .sort()
  .map(
    (path) =>
      `  <url><loc>${baseUrl}${path}</loc><lastmod>${today}</lastmod></url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(new URL("../public/sitemap.xml", import.meta.url), xml, "utf8");
console.log(`Sitemap generated with ${routes.size} routes.`);
