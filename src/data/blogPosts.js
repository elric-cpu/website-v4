export const BLOG_POSTS = [
  {
    slug: "hidden-water-damage-signs",
    title:
      "Top 10 Warning Signs of Hidden Water Damage in Your Walls and Ceilings",
    excerpt:
      "Discover the silent destroyers lurking in your walls. Learn to spot the subtle signs of hidden water damage before mold takes hold or structural failure occurs.",
    date: "December 12, 2023",
    author: "Benson Team",
    category: "Water Damage Restoration",
    variant: "slate",
  },
  {
    slug: "first-24-hours-water-damage",
    title: "What to Do in the First 24 Hours After Water Damage",
    excerpt:
      "Immediate steps Oregon homeowners should take to minimize damage and prepare for professional restoration. Speed is critical to preventing mold and structural issues.",
    date: "October 15, 2023",
    author: "Benson Team",
    category: "Water Damage Restoration",
    variant: "ink",
  },
  {
    slug: "mold-vs-mildew",
    title: "Mold vs Mildew: How to Tell the Difference",
    excerpt:
      "Learn the key differences between mold and mildew, when you can clean it yourself, and when you need to call a professional remediation team.",
    date: "September 28, 2023",
    author: "Benson Team",
    category: "Mold Remediation",
    variant: "moss",
  },
  {
    slug: "bathroom-remodel-costs",
    title: "Bathroom Remodel Cost Drivers in Oregon",
    excerpt:
      "Understanding what factors influence the cost of a bathroom renovation, from materials and labor to plumbing changes and permit fees.",
    date: "September 10, 2023",
    author: "Benson Team",
    category: "Remodeling",
    variant: "clay",
  },
];

export const BLOG_ROUTES = BLOG_POSTS.map((post) => ({
  path: `/blog/${post.slug}`,
  name: post.title,
}));
