import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import {
  blogRoutes,
  indexableRoutes,
  serviceAreaTownRoutes,
  serviceRoutes,
  toolsRoutes,
} from "./routes.mjs";
import {
  ALL_GUIDE_LINKS,
  ALL_TOOL_LINKS,
  GEO_HUB_LINKS,
  GUIDE_LINKS,
  MAINTENANCE_LINKS,
  SERVICE_PILLAR_LINKS,
  SERVICE_DIRECTORY_LINKS,
  RESOURCE_LIBRARY_LINKS,
  TOOLS_HUB_LINK,
  TOP_TOOL_LINKS,
} from "../src/data/internalLinks.js";
import { CALCULATOR_ROUTES } from "../src/data/calculators.js";
import { GUIDE_ROUTES } from "../src/data/guides.js";

const BASE_URL = "https://bensonhomesolutions.com";
const MIN_OUT = 5;
const MIN_IN = 5;

const normalizePath = (input) => {
  if (!input) return null;
  if (!input.startsWith("/")) return null;
  const [clean] = input.split(/[?#]/);
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
};

const extractLiteralLinks = (content) => {
  const links = new Set();
  const regex = /\b(?:to|href)\s*[:=]\s*["'](\/[^"'#\s]*)/g;
  let match;
  while ((match = regex.exec(content))) {
    const normalized = normalizePath(match[1]);
    if (normalized) links.add(normalized);
  }
  return links;
};

const addLinksFromArrayIdentifier = (content, identifier, routes, links) => {
  if (!content.includes(identifier)) return;
  const indexRegex = new RegExp(`${identifier}\\[(\\d+)\\]`, "g");
  let match;
  const indices = new Set();
  while ((match = indexRegex.exec(content))) {
    indices.add(Number(match[1]));
  }

  if (indices.size > 0) {
    indices.forEach((index) => {
      const route = routes[index];
      const normalized = normalizePath(route);
      if (normalized) links.add(normalized);
    });
    return;
  }

  routes.forEach((route) => {
    const normalized = normalizePath(route);
    if (normalized) links.add(normalized);
  });
};

const addLinksFromObjectIdentifier = (content, identifier, routeMap, links) => {
  if (!content.includes(identifier)) return;
  const keyRegex = new RegExp(`${identifier}\\.([a-zA-Z0-9_]+)`, "g");
  let match;
  const keys = new Set();
  while ((match = keyRegex.exec(content))) {
    keys.add(match[1]);
  }

  if (keys.size > 0) {
    keys.forEach((key) => {
      const route = routeMap[key];
      const normalized = normalizePath(route);
      if (normalized) links.add(normalized);
    });
    return;
  }

  Object.values(routeMap).forEach((route) => {
    const normalized = normalizePath(route);
    if (normalized) links.add(normalized);
  });
};

const getSitemapPaths = async () => {
  const sitemap = await readFile("public/sitemap.xml", "utf8");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  return urls
    .filter((url) => url.startsWith(BASE_URL))
    .map((url) => normalizePath(url.replace(BASE_URL, "")))
    .filter(Boolean);
};

const parseAppRoutes = async () => {
  const content = await readFile(path.join("src", "App.jsx"), "utf8");
  const importRegex = /import\s+(\w+)\s+from\s+["']@\/pages\/([^"']+)["']/g;
  const routeRegex =
    /<Route\s+[^>]*path=["']([^"']+)["'][^>]*element=\{<([A-Za-z0-9_]+)/g;

  const componentToFile = new Map();
  let match;
  while ((match = importRegex.exec(content))) {
    const [, name, importPath] = match;
    componentToFile.set(name, importPath);
  }

  const componentToRoutes = new Map();
  while ((match = routeRegex.exec(content))) {
    const [, routePath, component] = match;
    const normalized = normalizePath(routePath);
    if (!normalized) continue;
    if (!componentToRoutes.has(component)) {
      componentToRoutes.set(component, []);
    }
    componentToRoutes.get(component).push(normalized);
  }

  return { componentToFile, componentToRoutes };
};

const resolveComponentFile = async (importPath) => {
  const basePath = path.join("src", "pages", importPath);
  const candidates = [
    basePath,
    `${basePath}.jsx`,
    `${basePath}.js`,
    `${basePath}.tsx`,
    `${basePath}.ts`,
  ];

  for (const candidate of candidates) {
    try {
      const fileStat = await stat(candidate);
      if (fileStat.isFile()) return candidate;
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }
  return null;
};

const buildRouteRegex = (route) => {
  const escaped = route
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:([^/]+)/g, "[^/]+")
    .replace(/\\\*/g, ".*");
  return new RegExp(`^${escaped}$`);
};

const main = async () => {
  const indexableSet = new Set(
    indexableRoutes.map((route) => normalizePath(route)).filter(Boolean),
  );

  const sitemapPaths = await getSitemapPaths();
  const sitemapSet = new Set(sitemapPaths);

  const missingFromSitemap = [...indexableSet].filter(
    (route) => !sitemapSet.has(route),
  );
  const extraInSitemap = sitemapPaths.filter(
    (route) => !indexableSet.has(route),
  );

  const { componentToFile, componentToRoutes } = await parseAppRoutes();
  const componentToResolvedFile = new Map();
  for (const [component, importPath] of componentToFile.entries()) {
    const resolved = await resolveComponentFile(importPath);
    if (resolved) componentToResolvedFile.set(component, resolved);
  }

  const routePatterns = [];
  for (const [component, routes] of componentToRoutes.entries()) {
    routes.forEach((route) => {
      routePatterns.push({
        route,
        component,
        regex: buildRouteRegex(route),
      });
    });
  }

  const fileToRoutes = new Map();
  indexableSet.forEach((route) => {
    const match = routePatterns.find((entry) => entry.regex.test(route));
    if (!match) return;
    const file = componentToResolvedFile.get(match.component);
    if (!file) return;
    if (!fileToRoutes.has(file)) fileToRoutes.set(file, new Set());
    fileToRoutes.get(file).add(route);
  });

  const files = [];
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && fullPath.endsWith(".jsx")) {
        files.push(fullPath);
      }
    }
  };
  await walk(path.join("src", "pages"));

  const pdfRoutes = [];
  try {
    const resourceEntries = await readdir(path.join("public", "resources"), {
      withFileTypes: true,
    });
    resourceEntries.forEach((entry) => {
      if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) {
        pdfRoutes.push(`/resources/${entry.name}`);
      }
    });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const globalLinks = new Set();
  const globalSources = [
    path.join("src", "components", "layout", "Header.jsx"),
    path.join("src", "components", "layout", "Footer.jsx"),
  ];

  for (const file of globalSources) {
    try {
      const content = await readFile(file, "utf8");
      extractLiteralLinks(content).forEach((link) => globalLinks.add(link));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  const arrayIdentifierRoutes = {
    GEO_HUB_LINKS: GEO_HUB_LINKS.map((link) => link.to),
    TOP_TOOL_LINKS: TOP_TOOL_LINKS.map((link) => link.to),
    GUIDE_LINKS: GUIDE_LINKS.map((link) => link.to),
    ALL_TOOL_LINKS: ALL_TOOL_LINKS.map((link) => link.to),
    ALL_GUIDE_LINKS: ALL_GUIDE_LINKS.map((link) => link.to),
    SERVICE_DIRECTORY_LINKS: SERVICE_DIRECTORY_LINKS.map((link) => link.to),
    RESOURCE_LIBRARY_LINKS: RESOURCE_LIBRARY_LINKS.map((link) => link.to),
    CALCULATOR_ROUTES: CALCULATOR_ROUTES.map((route) => route.path),
    GUIDE_ROUTES: GUIDE_ROUTES.map((route) => route.path),
    CALCULATORS: CALCULATOR_ROUTES.map((route) => route.path),
    GUIDES: GUIDE_ROUTES.map((route) => route.path),
    blogRoutes,
    BLOG_POSTS: blogRoutes,
    serviceRoutes,
    toolsRoutes,
  };

  const objectIdentifierRoutes = {
    SERVICE_PILLAR_LINKS: Object.fromEntries(
      Object.entries(SERVICE_PILLAR_LINKS).map(([key, value]) => [
        key,
        value.to,
      ]),
    ),
    MAINTENANCE_LINKS: Object.fromEntries(
      Object.entries(MAINTENANCE_LINKS).map(([key, value]) => [key, value.to]),
    ),
  };

  const pageLinks = new Map();
  for (const file of files) {
    const content = await readFile(file, "utf8");
    const links = extractLiteralLinks(content);
    globalLinks.forEach((link) => links.add(link));

    Object.entries(arrayIdentifierRoutes).forEach(([identifier, routes]) => {
      addLinksFromArrayIdentifier(content, identifier, routes, links);
    });

    Object.entries(objectIdentifierRoutes).forEach(([identifier, routes]) => {
      addLinksFromObjectIdentifier(content, identifier, routes, links);
    });

    if (content.includes("TOOLS_HUB_LINK")) {
      const normalized = normalizePath(TOOLS_HUB_LINK.to);
      if (normalized) links.add(normalized);
    }

    if (content.includes("serviceAreaData")) {
      serviceAreaTownRoutes.forEach((route) => {
        const normalized = normalizePath(route);
        if (normalized) links.add(normalized);
      });
    }

    if (content.includes("post.slug") && content.includes("/blog/")) {
      blogRoutes.forEach((route) => {
        const normalized = normalizePath(route);
        if (normalized) links.add(normalized);
      });
    }

    pageLinks.set(file, links);
  }

  const inboundCounts = Object.fromEntries(
    [...indexableSet].map((route) => [route, 0]),
  );

  const indexableFiles = new Set(fileToRoutes.keys());
  for (const file of indexableFiles) {
    const links = pageLinks.get(file) || new Set();
    links.forEach((route) => {
      if (route in inboundCounts) {
        inboundCounts[route] += 1;
      }
    });
  }

  const lowOut = [];
  for (const [file, links] of pageLinks.entries()) {
    if (!indexableFiles.has(file)) continue;
    if (links.size < MIN_OUT) {
      lowOut.push({
        file,
        count: links.size,
        routes: [...(fileToRoutes.get(file) || [])],
      });
    }
  }

  const lowIn = Object.entries(inboundCounts)
    .filter(([, count]) => count < MIN_IN)
    .sort((a, b) => a[1] - b[1]);

  const orphans = Object.entries(inboundCounts)
    .filter(([, count]) => count === 0)
    .map(([route]) => route);

  const allAppRoutes = [];
  componentToRoutes.forEach((routes) => {
    routes.forEach((route) => allAppRoutes.push(route));
  });

  const knownRoutes = new Set([
    ...indexableSet,
    ...serviceAreaTownRoutes.map(normalizePath),
    ...allAppRoutes.map(normalizePath),
    ...pdfRoutes.map(normalizePath),
    "/sitemap.xml",
    "/robots.txt",
  ]);

  const unknownLinks = new Set();
  for (const links of pageLinks.values()) {
    links.forEach((route) => {
      if (!knownRoutes.has(route)) unknownLinks.add(route);
    });
  }

  const relFile = (file) => path.relative(process.cwd(), file);

  console.log(`Pages scanned: ${files.length}`);
  console.log(`Indexable routes: ${indexableSet.size}`);
  console.log("");

  if (missingFromSitemap.length || extraInSitemap.length) {
    console.log("Sitemap coverage issues:");
    if (missingFromSitemap.length) {
      console.log(`- Missing from sitemap: ${missingFromSitemap.length}`);
      missingFromSitemap.slice(0, 20).forEach((route) => {
        console.log(`  - ${route}`);
      });
    }
    if (extraInSitemap.length) {
      console.log(`- Extra in sitemap: ${extraInSitemap.length}`);
      extraInSitemap.slice(0, 20).forEach((route) => {
        console.log(`  - ${route}`);
      });
    }
    console.log("");
  }

  console.log(`Pages with < ${MIN_OUT} internal links out: ${lowOut.length}`);
  lowOut.forEach((page) => {
    const routes = page.routes.length ? ` (${page.routes.join(", ")})` : "";
    console.log(`- ${relFile(page.file)}${routes}: ${page.count}`);
  });
  console.log("");

  console.log(
    `Indexable routes with < ${MIN_IN} internal links in: ${lowIn.length}`,
  );
  lowIn.slice(0, 30).forEach(([route, count]) => {
    console.log(`- ${route}: ${count}`);
  });
  if (lowIn.length > 30) {
    console.log(`...${lowIn.length - 30} more`);
  }
  console.log("");

  console.log(`Orphan indexable routes (0 inbound): ${orphans.length}`);
  orphans.slice(0, 30).forEach((route) => console.log(`- ${route}`));
  if (orphans.length > 30) {
    console.log(`...${orphans.length - 30} more`);
  }
  console.log("");

  console.log(`Internal links not in known routes: ${unknownLinks.size}`);
  [...unknownLinks].slice(0, 30).forEach((route) => console.log(`- ${route}`));
  if (unknownLinks.size > 30) {
    console.log(`...${unknownLinks.size - 30} more`);
  }

  const hasFailures =
    missingFromSitemap.length ||
    extraInSitemap.length ||
    lowOut.length ||
    lowIn.length ||
    orphans.length ||
    unknownLinks.size;

  if (hasFailures) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error("Audit failed:", error);
  process.exitCode = 1;
});
