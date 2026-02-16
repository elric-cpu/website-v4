const RULES = [
  {
    task_key: "water_extract",
    trade: "water_mitigation",
    action: "Extract water",
    object: "affected area",
    keywords: ["water damage", "wet", "flood", "leak", "standing water"],
    missing_fields: ["quantity", "unit", "access"],
  },
  {
    task_key: "mold_treat",
    trade: "mold_remediation",
    action: "Treat mold",
    object: "affected surfaces",
    keywords: ["mold", "fungal", "mildew"],
    missing_fields: ["quantity", "unit", "containment"],
  },
  {
    task_key: "smoke_clean",
    trade: "fire_restoration",
    action: "Clean smoke residue",
    object: "interior surfaces",
    keywords: ["smoke", "soot", "fire damage"],
    missing_fields: ["quantity", "unit", "finish"],
  },
  {
    task_key: "drywall_patch",
    trade: "carpentry",
    action: "Patch drywall",
    object: "damaged walls",
    keywords: ["drywall", "gypsum", "wallboard"],
    missing_fields: ["quantity", "unit", "finish"],
  },
  {
    task_key: "flooring_remove",
    trade: "carpentry",
    action: "Remove flooring",
    object: "damaged flooring",
    keywords: ["flooring", "carpet", "vinyl", "laminate"],
    missing_fields: ["quantity", "unit", "access"],
  },
  {
    task_key: "inspection_repair",
    trade: "general",
    action: "Complete inspection repairs",
    object: "listed items",
    keywords: ["inspection", "report item", "defect", "repair list"],
    missing_fields: ["quantity", "unit", "location"],
  },
];

const normalizeText = (value) => value.toLowerCase();

const findOffset = (text, keyword) =>
  normalizeText(text).indexOf(normalizeText(keyword));

const offsetToPage = (pageMap, offset) =>
  pageMap.find((page) => offset >= page.start && offset <= page.end) ?? null;

const buildExcerpt = (text, offset, span = 140) => {
  const start = Math.max(0, offset - span);
  const end = Math.min(text.length, offset + span);
  return {
    excerpt: text.slice(start, end).trim(),
    start,
    end,
  };
};

const getSourceRef = (parsedText, pageMap, keyword) => {
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

const scoreConfidence = (hits) => Math.min(0.95, 0.45 + hits * 0.15);

export const extractTasks = (parsedText, pageMap = []) => {
  const normalized = normalizeText(parsedText || "");
  return RULES.flatMap((rule) => {
    const hits = rule.keywords.filter((keyword) =>
      normalized.includes(keyword),
    ).length;
    if (hits === 0) return [];
    const sourceRef = getSourceRef(parsedText, pageMap, rule.keywords[0]);
    return [
      {
        ...rule,
        confidence: scoreConfidence(hits),
        source_ref: sourceRef,
      },
    ];
  });
};
