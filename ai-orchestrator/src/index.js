import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleExtract } from "./handlers/extractHandler.js";
import { handleRecompute } from "./handlers/recomputeHandler.js";
import { logInfo } from "./utils/logger.js";

const app = express();
const port = Number(process.env.PORT || 5055);
const sharedSecret = process.env.ORCHESTRATOR_SHARED_SECRET;

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const requireSecret = (req, res, next) => {
  if (!sharedSecret) return next();
  const header = req.headers["x-orchestrator-key"];
  if (!header || header !== sharedSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
};

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/extract", requireSecret, handleExtract);
app.post("/recompute", requireSecret, handleRecompute);

app.listen(port, () => {
  logInfo(`ai-orchestrator listening on ${port}`);
});
