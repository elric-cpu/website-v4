export const serviceAreaData = {
  "harney-county": {
    label: "Harney County",
    description:
      "Serving the high desert communities of Eastern Oregon with specialized winter-ready restoration services.",
    towns: [
      { name: "Burns", slug: "burns", zip: "97720", county: "Harney" },
      { name: "Hines", slug: "hines", zip: "97738", county: "Harney" },
    ],
  },
  "mid-valley": {
    label: "Mid-Willamette Valley",
    description:
      "Comprehensive restoration and remodeling services for the heart of the Willamette Valley.",
    counties: {
      linn: {
        label: "Linn County",
        towns: [
          { name: "Sweet Home", slug: "sweet-home", zip: "97386" },
          { name: "Lebanon", slug: "lebanon", zip: "97355" },
          { name: "Albany", slug: "albany", zip: "97321-97322" },
          { name: "Brownsville", slug: "brownsville", zip: "97327" },
          { name: "Halsey", slug: "halsey", zip: "97348" },
          { name: "Harrisburg", slug: "harrisburg", zip: "97446" },
          { name: "Scio", slug: "scio", zip: "97374" },
          { name: "Tangent", slug: "tangent", zip: "97389" },
          { name: "Waterloo", slug: "waterloo", zip: "97489" },
          { name: "Crabtree", slug: "crabtree", zip: "97335" },
          { name: "Jefferson", slug: "jefferson", zip: "97352" },
          { name: "Lacomb", slug: "lacomb", zip: "97336" },
          { name: "Shedd", slug: "shedd", zip: "97377" },
          { name: "Sodaville", slug: "sodaville", zip: "97355" },
          { name: "Lyons", slug: "lyons", zip: "97358" },
          { name: "Mill City", slug: "mill-city", zip: "97360" },
          { name: "Gates", slug: "gates", zip: "97346" },
          { name: "Detroit", slug: "detroit", zip: "97342" },
        ],
      },
      marion: {
        label: "Marion County",
        towns: [
          { name: "Salem", slug: "salem", zip: "97301-97317" },
          { name: "Keizer", slug: "keizer", zip: "97303" },
          { name: "Silverton", slug: "silverton", zip: "97381" },
          { name: "Turner", slug: "turner", zip: "97392" },
          { name: "Stayton", slug: "stayton", zip: "97383" },
          { name: "Sublimity", slug: "sublimity", zip: "97385" },
          { name: "Aumsville", slug: "aumsville", zip: "97325" },
          { name: "Scotts Mills", slug: "scotts-mills", zip: "97375" },
          { name: "Mount Angel", slug: "mount-angel", zip: "97362" },
          { name: "Gervais", slug: "gervais", zip: "97026" },
          { name: "Woodburn", slug: "woodburn", zip: "97071" },
          { name: "Hubbard", slug: "hubbard", zip: "97032" },
          { name: "Canby", slug: "canby", zip: "97013" },
          { name: "Oregon City", slug: "oregon-city", zip: "97045" },
          { name: "Molalla", slug: "molalla", zip: "97038" },
        ],
      },
      polk: {
        label: "Polk County",
        towns: [
          { name: "Corvallis", slug: "corvallis", zip: "97330-97339" },
          { name: "Monmouth", slug: "monmouth", zip: "97361" },
          { name: "Independence", slug: "independence", zip: "97351" },
          { name: "Dallas", slug: "dallas", zip: "97338" },
          { name: "Polk City", slug: "polk-city", zip: "97344" },
          { name: "Rickreall", slug: "rickreall", zip: "97371" },
          { name: "Falls City", slug: "falls-city", zip: "97344" },
          { name: "Grand Ronde", slug: "grand-ronde", zip: "97347" },
          { name: "Willamina", slug: "willamina", zip: "97396" },
          { name: "Sheridan", slug: "sheridan", zip: "97378" },
          { name: "Yamhill", slug: "yamhill", zip: "97148" },
        ],
      },
      yamhill: {
        label: "Yamhill County",
        towns: [
          { name: "McMinnville", slug: "mcminnville", zip: "97128" },
          { name: "Newberg", slug: "newberg", zip: "97132" },
          { name: "Dundee", slug: "dundee", zip: "97115" },
          { name: "Carlton", slug: "carlton", zip: "97111" },
          { name: "Dayton", slug: "dayton", zip: "97114" },
          { name: "Amity", slug: "amity", zip: "97101" },
        ],
      },
    },
  },
};

export const getTownData = (regionSlug, townSlug) => {
  if (regionSlug === "harney-county") {
    const town = serviceAreaData["harney-county"].towns.find(
      (t) => t.slug === townSlug,
    );
    if (town)
      return { ...town, region: "Harney County", regionSlug: "harney-county" };
  } else if (regionSlug === "mid-valley") {
    for (const [countyKey, countyData] of Object.entries(
      serviceAreaData["mid-valley"].counties,
    )) {
      const town = countyData.towns.find((t) => t.slug === townSlug);
      if (town)
        return {
          ...town,
          region: "Mid-Valley",
          regionSlug: "mid-valley",
          county: countyData.label,
        };
    }
  }
  return null;
};
