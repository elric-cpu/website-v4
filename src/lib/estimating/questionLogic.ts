import type { EstimateQuestion } from "./types";

export const shouldShowQuestion = (
  question: EstimateQuestion,
  answers: Record<string, string | number | null>,
) => {
  const depends = question.depends_on;
  if (!depends) return true;

  return Object.entries(depends).every(([key, expected]) => {
    const value = answers[key];
    if (Array.isArray(expected)) {
      return expected.includes(String(value));
    }
    return String(value) === String(expected);
  });
};
