export const logInfo = (message, meta = {}) => {
  console.log(`[ai-orchestrator] ${message}`, meta);
};

export const logError = (message, meta = {}) => {
  console.error(`[ai-orchestrator] ${message}`, meta);
};
