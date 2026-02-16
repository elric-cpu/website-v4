import { extractTaskCandidates } from "../llm/openaiClient.js";

export const runTaskExtraction = async ({ parsedText, pageMap }) => {
  const result = await extractTaskCandidates({ text: parsedText, pageMap });
  return result.task_candidates || [];
};
