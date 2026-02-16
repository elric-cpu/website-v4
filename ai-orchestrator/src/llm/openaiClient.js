import OpenAI from "openai";
import { z } from "zod";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY.");
}

const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

const taskSchema = z.object({
  trade: z.string().min(1),
  action: z.string().min(1),
  object: z.string().min(1),
  confidence: z.number().min(0).max(1),
  source_ref: z.object({
    page: z.number().int().min(1),
    excerpt: z.string().min(1),
  }),
  missing_fields: z.array(z.string()).default([]),
});

const responseSchema = z.object({
  task_candidates: z.array(taskSchema).default([]),
});

const client = new OpenAI({ apiKey });

const buildPrompt = (text, pageMap) => {
  const pageSummary = pageMap
    .map(
      (page) =>
        `Page ${page.page}: offsets ${page.start_offset}-${page.end_offset}`,
    )
    .join("\n");

  return `You are an estimating assistant. Extract repair or scope tasks from the PDF text below.
Return JSON with a task_candidates array. Each task must include:
- trade (carpentry, plumbing, electrical, roofing, drywall, painting, flooring, HVAC, general)
- action (repair, replace, install, patch, seal, remove, clean, paint)
- object (what the action applies to)
- confidence (0-1)
- source_ref with page number and a short excerpt from that page
- missing_fields list (quantity, unit, item_key, room, access, finish, occupancy, height, protection)

Use only the content provided. If unsure, include the task with lower confidence.

Page map:
${pageSummary}

PDF text:
${text}`;
};

export const extractTaskCandidates = async ({ text, pageMap }) => {
  const prompt = buildPrompt(text, pageMap);
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: "You output strict JSON only." },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const content = response.choices?.[0]?.message?.content || "{}";
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = { task_candidates: [] };
  }

  const validated = responseSchema.safeParse(parsed);
  if (!validated.success) {
    return { task_candidates: [] };
  }

  return validated.data;
};
