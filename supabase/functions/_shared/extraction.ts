type PageMapEntry = {
  page: number;
  start: number;
  end: number;
};

type SourceRef = {
  page: number;
  excerpt: string;
  start: number;
  end: number;
};

export type TaskCandidate = {
  task_key: string;
  trade: string;
  action: string;
  object: string;
  confidence: number;
  source_ref: SourceRef | null;
  missing_fields: string[];
};

const RULES: Array<{
  taskKey: string;
  trade: string;
  action: string;
  object: string;
  keywords: string[];
  missingFields: string[];
}> = [
  {
    taskKey: "water_extract",
    trade: "water_mitigation",
    action: "Extract water",
    object: "affected area",
    keywords: ["water damage", "wet", "flood", "leak", "standing water"],
    missingFields: ["quantity", "unit", "access"],
  },
  {
    taskKey: "mold_treat",
    trade: "mold_remediation",
    action: "Treat mold",
    object: "affected surfaces",
    keywords: ["mold", "fungal", "mildew"],
    missingFields: ["quantity", "unit", "containment"],
  },
  {
    taskKey: "smoke_clean",
    trade: "fire_restoration",
    action: "Clean smoke residue",
    object: "interior surfaces",
    keywords: ["smoke", "soot", "fire damage"],
    missingFields: ["quantity", "unit", "finish"],
  },
  {
    taskKey: "drywall_patch",
    trade: "carpentry",
    action: "Patch drywall",
    object: "damaged walls",
    keywords: ["drywall", "gypsum", "wallboard"],
    missingFields: ["quantity", "unit", "finish"],
  },
  {
    taskKey: "flooring_remove",
    trade: "carpentry",
    action: "Remove flooring",
    object: "damaged flooring",
    keywords: ["flooring", "carpet", "vinyl", "laminate"],
    missingFields: ["quantity", "unit", "access"],
  },
  {
    taskKey: "inspection_repair",
    trade: "general",
    action: "Complete inspection repairs",
    object: "listed items",
    keywords: ["inspection", "report item", "defect", "repair list"],
    missingFields: ["quantity", "unit", "location"],
  },
];

const normalizeText = (value: string) => value.toLowerCase();

const findOffset = (text: string, keyword: string) => {
  return normalizeText(text).indexOf(normalizeText(keyword));
};

const offsetToPage = (pageMap: PageMapEntry[], offset: number) => {
  return (
    pageMap.find((page) => offset >= page.start && offset <= page.end) ?? null
  );
};

const buildExcerpt = (text: string, offset: number, span = 140) => {
  const start = Math.max(0, offset - span);
  const end = Math.min(text.length, offset + span);
  return {
    excerpt: text.slice(start, end).trim(),
    start,
    end,
  };
};

const getSourceRef = (
  parsedText: string,
  pageMap: PageMapEntry[],
  keyword: string,
) => {
  const offset = findOffset(parsedText, keyword);
  if (offset < 0) return null;
  const page = offsetToPage(pageMap, offset);
  if (!page) return null;
  const snippet = buildExcerpt(parsedText, offset);
  return {
    page: page.page,
    excerpt: snippet.excerpt,
    start: snippet.start,
    end: snippet.end,
  };
};

const scoreConfidence = (hits: number) => {
  return Math.min(0.95, 0.45 + hits * 0.15);
};

export const extractTaskCandidates = (
  parsedText: string,
  pageMap: PageMapEntry[],
): TaskCandidate[] => {
  const candidates: TaskCandidate[] = [];
  const normalized = normalizeText(parsedText);

  for (const rule of RULES) {
    const hits = rule.keywords.filter((keyword) =>
      normalized.includes(keyword),
    ).length;
    if (hits === 0) continue;
    const source = getSourceRef(parsedText, pageMap, rule.keywords[0]);

    candidates.push({
      task_key: rule.taskKey,
      trade: rule.trade,
      action: rule.action,
      object: rule.object,
      confidence: scoreConfidence(hits),
      source_ref: source,
      missing_fields: rule.missingFields,
    });
  }

  return candidates;
};
