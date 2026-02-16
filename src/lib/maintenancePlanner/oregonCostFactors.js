const RPP_2023 = {
  OR_STATE: 104.721,
  OR_METRO: 105.586,
  OR_NONMETRO: 99.524,
  PORTLAND_MSA: 106.615,
  SALEM_MSA: 102.41,
  ALBANY_MSA: 104.609,
};

const toFactor = (rpp) => Number((rpp / 100).toFixed(4));

const ZIP_RULES = [
  {
    label: "Harney County (nonmetro OR)",
    rpp: RPP_2023.OR_NONMETRO,
    zips: ["97720", "97738"],
  },
  {
    label: "Portland-Vancouver-Hillsboro MSA",
    rpp: RPP_2023.PORTLAND_MSA,
    zips: ["97013", "97026", "97032", "97038", "97045", "97071"],
  },
  {
    label: "Salem MSA",
    rpp: RPP_2023.SALEM_MSA,
    ranges: [[97301, 97317]],
    zips: [
      "97303",
      "97325",
      "97338",
      "97344",
      "97347",
      "97351",
      "97361",
      "97362",
      "97371",
      "97375",
      "97378",
      "97381",
      "97383",
      "97385",
      "97392",
      "97396",
    ],
  },
  {
    label: "Albany-Lebanon MSA",
    rpp: RPP_2023.ALBANY_MSA,
    zips: [
      "97327",
      "97335",
      "97336",
      "97342",
      "97346",
      "97348",
      "97352",
      "97355",
      "97358",
      "97360",
      "97374",
      "97377",
      "97386",
      "97389",
    ],
  },
  {
    label: "Oregon metro portion (fallback)",
    rpp: RPP_2023.OR_METRO,
    ranges: [[97330, 97339]],
    zips: [
      "97101",
      "97111",
      "97114",
      "97115",
      "97128",
      "97132",
      "97148",
      "97446",
      "97489",
    ],
  },
];

const normalizeZip = (zip) => {
  if (!zip) return "";
  const match = String(zip).match(/\d{5}/);
  return match ? match[0] : "";
};

export const getOregonCostFactor = (zip) => {
  const normalized = normalizeZip(zip);
  if (!normalized) return toFactor(RPP_2023.OR_STATE);
  const value = Number(normalized);
  for (const rule of ZIP_RULES) {
    if (rule.zips?.includes(normalized)) {
      return toFactor(rule.rpp);
    }
    if (rule.ranges) {
      for (const [start, end] of rule.ranges) {
        if (value >= start && value <= end) {
          return toFactor(rule.rpp);
        }
      }
    }
  }
  return toFactor(RPP_2023.OR_METRO);
};

export const getOregonCostRegion = (zip) => {
  const normalized = normalizeZip(zip);
  if (!normalized) return "Oregon (state average)";
  const value = Number(normalized);
  for (const rule of ZIP_RULES) {
    if (rule.zips?.includes(normalized)) return rule.label;
    if (rule.ranges) {
      for (const [start, end] of rule.ranges) {
        if (value >= start && value <= end) return rule.label;
      }
    }
  }
  return "Oregon metro portion (fallback)";
};

export const getRpp2023 = (label) => RPP_2023[label] || RPP_2023.OR_STATE;

export const RPP_2023_VALUES = {
  ...RPP_2023,
  OR_STATE_FACTOR: toFactor(RPP_2023.OR_STATE),
  OR_METRO_FACTOR: toFactor(RPP_2023.OR_METRO),
  OR_NONMETRO_FACTOR: toFactor(RPP_2023.OR_NONMETRO),
  PORTLAND_MSA_FACTOR: toFactor(RPP_2023.PORTLAND_MSA),
  SALEM_MSA_FACTOR: toFactor(RPP_2023.SALEM_MSA),
  ALBANY_MSA_FACTOR: toFactor(RPP_2023.ALBANY_MSA),
};
