export type QuestionTemplate = {
  question_key: string;
  prompt: string;
  answer_type: "text" | "number" | "select";
  options?: string[];
  required?: boolean;
  depends_on?: Record<string, string | string[]>;
  derived_field?: string;
};

const GLOBAL_QUESTIONS: QuestionTemplate[] = [
  {
    question_key: "location_zip",
    prompt: "Confirm the project ZIP code for pricing",
    answer_type: "text",
    required: true,
    derived_field: "location_zip",
  },
  {
    question_key: "access",
    prompt: "Access conditions for the work area",
    answer_type: "select",
    options: ["standard", "limited", "difficult"],
    required: true,
    derived_field: "access",
  },
  {
    question_key: "occupancy",
    prompt: "Is the space occupied during work?",
    answer_type: "select",
    options: ["occupied", "vacant"],
    required: true,
    derived_field: "occupancy",
  },
];

const FIELD_QUESTIONS: Record<string, QuestionTemplate> = {
  quantity: {
    question_key: "quantity",
    prompt: "Estimated quantity for this task",
    answer_type: "number",
    required: true,
    derived_field: "quantity",
  },
  unit: {
    question_key: "unit",
    prompt: "Unit of measure",
    answer_type: "select",
    options: ["sqft", "lf", "ea"],
    required: true,
    derived_field: "unit",
  },
  location: {
    question_key: "location",
    prompt: "Room or area name",
    answer_type: "text",
    required: true,
    derived_field: "location_label",
  },
  finish: {
    question_key: "finish",
    prompt: "Finish level",
    answer_type: "select",
    options: ["basic", "standard", "premium"],
    required: false,
    derived_field: "finish",
  },
  containment: {
    question_key: "containment",
    prompt: "Containment level needed",
    answer_type: "select",
    options: ["none", "partial", "full"],
    required: false,
    derived_field: "containment",
  },
};

export const buildQuestions = (missingFields: string[]) => {
  const unique = Array.from(new Set(missingFields));
  return unique.map((field) => FIELD_QUESTIONS[field]).filter(Boolean);
};

export const getGlobalQuestions = () => GLOBAL_QUESTIONS;
