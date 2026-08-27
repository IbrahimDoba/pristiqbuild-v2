/**
 * Builds the generation manifest from the blog frontmatter.
 *
 * The goal is not 66 images, it is 66 images that read as one publication. A
 * shared stem locks the visual system; a per-category treatment stops a costing
 * article from looking identical to a corrosion article.
 *
 * Covers are generated per unique cover slot, not per post: up to three posts
 * currently share one cover, and that sharing is preserved.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

/** Applied to every prompt, so the whole archive holds together. */
export const STEM =
  "documentary construction photography, 35mm, natural daylight, " +
  "cool galvanized-steel palette, single teal accent, high detail, " +
  "no text, no logos, no watermarks, no identifiable faces";

/**
 * Per-category subject and composition.
 *
 * No people in any of them. A generated person on a construction site reads as
 * uncanny and invites the credibility question this work exists to remove.
 */
export const TREATMENTS = {
  "Foundational Knowledge":
    "cold-formed steel wall framing and floor joists, clean structural detail, full frame, eye level",
  "Cost & Economics":
    "abstract arrangement of cut steel sections and stacked profiles, geometric, overhead, restrained",
  "Construction & Installation":
    "steel frame assembly in progress on site, tools and fixings in shot, mid-action, no people visible",
  "Design & Planning":
    "architectural drawings and a physical steel frame model on a workbench, orthographic geometry, top-down",
  "Applications & Building Types":
    "completed steel-framed building exterior, three-quarter view, clear sky, wide",
  "Regional Focus":
    "steel-framed construction in a West African urban setting, warm equatorial daylight, red laterite ground",
  "Technical Specifications":
    "macro detail of galvanized steel surface showing spangle crystal pattern and a rolled C-section edge, shallow depth of field",
  "Comparison Articles":
    "steel framing and concrete blockwork meeting in a single frame, split composition, equal weight",
  "Suppliers & Market":
    "bundled steel profiles stacked in a distribution warehouse, receding rows, industrial",
  "Sustainability & Environment":
    "steel frame structure with vegetation and strong daylight behind it, green and metal together",
  "Business & Career":
    "a construction site office interior with drawings, hard hats on a table, no people",
};

const FALLBACK = TREATMENTS["Foundational Knowledge"];

/** Filesystem-safe id derived from the first post that uses a cover slot. */
function slugForSlot(posts) {
  return posts[0].slug.slice(0, 60).replace(/[^a-z0-9-]/g, "");
}

/** The category most posts on a shared slot belong to. */
function dominantCategory(posts) {
  const counts = {};
  for (const p of posts) counts[p.category] = (counts[p.category] ?? 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export function buildManifest() {
  const slots = new Map();

  for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))) {
    const { data } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
    const key = String(data.coverImage ?? "").trim();
    if (!key) continue;
    if (!slots.has(key)) slots.set(key, []);
    slots.get(key).push({
      slug: file.replace(/\.mdx$/, ""),
      category: data.category ?? "Foundational Knowledge",
      title: data.title ?? "",
    });
  }

  return [...slots.entries()]
    .map(([originalUrl, posts]) => {
      const category = dominantCategory(posts);
      const treatment = TREATMENTS[category] ?? FALLBACK;
      return {
        id: slugForSlot(posts),
        category,
        usedBy: posts.map((p) => p.slug),
        originalUrl,
        prompt: `${treatment}. ${STEM}`,
        outPath: `public/generated/blog/${slugForSlot(posts)}.webp`,
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}
