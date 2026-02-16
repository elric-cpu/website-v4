export type PageMapEntry = {
  page: number;
  start: number;
  end: number;
};

export type ParsedPage = {
  page_number: number;
  text: string;
  start_offset: number;
  end_offset: number;
};

export type ParseResult = {
  parsedText: string;
  pageMap: PageMapEntry[];
  pages: ParsedPage[];
};

export type EstimateTask = {
  id: string;
  task_key: string;
  trade: string | null;
  location_label: string | null;
  scope_narrative: string | null;
  source_ref: any;
};

export type EstimateLineItem = {
  id: string;
  estimate_task_id: string;
  item_key: string | null;
  description: string | null;
  quantity: number | null;
  unit: string | null;
  material_unit_price: number | null;
  labor_hours: number | null;
  labor_rate: number | null;
  equipment_cost: number | null;
  disposal_cost: number | null;
  markup_pct: number | null;
  total_cost: number | null;
  source_ref: any;
};

export type EstimateQuestion = {
  id: string;
  estimate_version_id: string;
  task_id: string | null;
  scope: "global" | "task";
  question_key: string;
  prompt: string;
  depends_on?: Record<string, string | string[]>;
  answer_type: "text" | "number" | "select";
  options?: string[];
  required: boolean;
  derived_field?: string | null;
};

export type EstimateAnswer = {
  question_id: string;
  value: string | number | null;
};
