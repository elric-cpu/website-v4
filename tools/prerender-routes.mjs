import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { chromium } from "@playwright/test";
import { landingRoutes, serviceRoutes, toolsRoutes } from "./routes.mjs";

const HOST = "127.0.0.1";
const DIST_DIR = path.join(process.cwd(), "dist");

const prerenderRoutes = new Set([
  "/",
  "/services",
  ...toolsRoutes,
  ...serviceRoutes,
  ...landingRoutes,
]);

const waitForServer = async (previewProcess, baseUrl) => {
  const maxAttempts = 30;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    if (previewProcess.exitCode !== null) {
      throw new Error("Preview server exited before it was ready.");
    }
    try {
      const response = await fetch(baseUrl, { method: "GET" });
      if (response.ok) return;
    } catch (error) {
      // ignore and retry
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error("Preview server did not start in time.");
};

const resolveOutputPath = (route) => {
  if (route === "/") return path.join(DIST_DIR, "index.html");
  if (route.endsWith(".html")) return path.join(DIST_DIR, route);
  return path.join(DIST_DIR, route, "index.html");
};

const startPreviewServer = (port) => {
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  const args = [
    "run",
    "preview",
    "--",
    "--host",
    HOST,
    "--port",
    String(port),
    "--strictPort",
  ];

  try {
    return spawn(command, args, { stdio: "inherit" });
  } catch (error) {
    const fallbackCommand = `npm run preview -- --host ${HOST} --port ${port} --strictPort`;
    return spawn(fallbackCommand, {
      stdio: "inherit",
      shell: true,
    });
  }
};

const resolvePort = () =>
  new Promise((resolve, reject) => {
    if (process.env.PRERENDER_PORT) {
      resolve(Number(process.env.PRERENDER_PORT));
      return;
    }
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, HOST, () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 4173;
      server.close(() => resolve(port));
    });
  });

const main = async () => {
  if (process.env.SKIP_PRERENDER === "1") {
    console.log("Prerender skipped: SKIP_PRERENDER=1");
    return;
  }
  const port = await resolvePort();
  const baseUrl = `http://${HOST}:${port}`;
  const previewProcess = startPreviewServer(port);
  try {
    await waitForServer(previewProcess, baseUrl);
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1365, height: 900 },
    });

    for (const route of prerenderRoutes) {
      const url = `${baseUrl}${route}`;
      await page.goto(url, { waitUntil: "networkidle" });
      const html = await page.content();
      const outputPath = resolveOutputPath(route);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, html, "utf8");
      console.log(`Prerendered: ${route}`);
    }

    await browser.close();
  } finally {
    previewProcess.kill("SIGTERM");
  }
};

main().catch((error) => {
  console.error("Prerender failed:", error);
  process.exitCode = 1;
});
