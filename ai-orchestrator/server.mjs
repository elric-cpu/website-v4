import http from "node:http";
import { extractTasks } from "./lib/extract.js";
import { scrapePricing } from "./lib/scrape.js";

const port = process.env.AI_ORCHESTRATOR_PORT || 8787;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

const sendJson = (res, status, payload) => {
  res.writeHead(status, { "Content-Type": "application/json", ...corsHeaders });
  res.end(JSON.stringify(payload));
};

const parseBody = async (req) =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  try {
    if (req.method === "POST" && req.url === "/extract") {
      const payload = await parseBody(req);
      const tasks = extractTasks(
        payload?.parsed_text || "",
        payload?.page_map || [],
      );
      sendJson(res, 200, { tasks });
      return;
    }

    if (req.method === "POST" && req.url === "/pricing/scrape") {
      const payload = await parseBody(req);
      const pricing = await scrapePricing(payload);
      sendJson(res, 200, pricing);
      return;
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error" });
  }
});

server.listen(port, () => {
  console.log(`AI orchestrator listening on ${port}`);
});
