"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import type { PortfolioTag } from "@/generated/prisma/client";
import { can } from "@/lib/admin/permissions";
import { TAGS } from "@/lib/portfolio-constants";

/** Re-checks the session: a server action is reachable without its page. */
async function requireContent() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!can(session.user.role, "content:write")) throw new Error("Not permitted: content:write");
  return session.user;
}

/** The public pages that show portfolio entries. */
function revalidatePublic() {
  revalidatePath("/admin/portfolio");
  revalidatePath("/projects");
  revalidatePath("/");
}

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const optional = (formData: FormData, key: string) => text(formData, key) || null;

export type PortfolioResult = { ok: true } | { ok: false; error: string };

/** Creates an entry, or updates it when the form carries an id. */
export async function savePortfolioItem(
  _prev: PortfolioResult | null,
  formData: FormData
): Promise<PortfolioResult> {
  await requireContent();

  const id = text(formData, "id");
  const name = text(formData, "name");
  const location = text(formData, "location");
  const desc = text(formData, "desc");
  const tag = text(formData, "tag");
  const href = optional(formData, "href");
  const image = optional(formData, "image");

  if (!name) return { ok: false, error: "Give the project a name." };
  if (!location) return { ok: false, error: "Add a location." };
  if (!desc) return { ok: false, error: "Add a short description." };
  if (!(TAGS as string[]).includes(tag)) return { ok: false, error: "Pick a tag." };
  // Internal paths only, so an entry cannot send visitors off-site.
  if (href && !/^\/[\w\-/#]*$/.test(href)) {
    return { ok: false, error: "The link must be a path on this site, like /projects/akure-lgs-roofing." };
  }

  if (image && (image.includes("..") || !/^\/[\w\-/. ]+\.(jpe?g|png|webp|avif)$/i.test(image))) {
    return { ok: false, error: "The photo must be an image path on this site, like /LGS/roof.jpeg." };
  }

  const sortOrder = Number.parseInt(text(formData, "sortOrder") || "0", 10);

  const data = {
    name,
    location,
    desc,
    tag: tag as PortfolioTag,
    href,
    image,
    sqm: optional(formData, "sqm"),
    steel: optional(formData, "steel"),
    waste: optional(formData, "waste"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  };

  const db = getDb();
  if (id) {
    await db.portfolioItem.update({ where: { id }, data });
  } else {
    await db.portfolioItem.create({ data });
  }

  revalidatePublic();
  return { ok: true };
}

export async function deletePortfolioItem(id: string) {
  await requireContent();
  await getDb().portfolioItem.delete({ where: { id } });
  revalidatePublic();
}
