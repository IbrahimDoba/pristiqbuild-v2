"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Prisma, type PortfolioTag } from "@/generated/prisma/client";
import { can } from "@/lib/admin/permissions";
import { TAGS, slugify } from "@/lib/portfolio-constants";

/** Re-checks the session: a server action is reachable without its page. */
async function requireContent() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!can(session.user.role, "content:write")) throw new Error("Not permitted: content:write");
  return session.user;
}

/** Every public page that shows portfolio entries. */
function revalidatePublic(...slugs: string[]) {
  revalidatePath("/admin/portfolio");
  revalidatePath("/projects");
  revalidatePath("/");
  for (const slug of slugs) revalidatePath(`/projects/${slug}`);
}

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const optional = (formData: FormData, key: string) => text(formData, key) || null;

/** A path under public/, or an https URL. Nothing that can climb directories. */
function validImage(image: string) {
  if (/^https:\/\/[^\s]+$/i.test(image)) return true;
  return !image.includes("..") && /^\/[\w\-/. ]+\.(jpe?g|png|webp|avif)$/i.test(image);
}

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
  const image = optional(formData, "image");
  // Blank means "make one from the name".
  const slug = slugify(text(formData, "slug") || name);

  if (!name) return { ok: false, error: "Give the project a name." };
  if (!location) return { ok: false, error: "Add a location." };
  if (!desc) return { ok: false, error: "Add a short description." };
  if (!(TAGS as string[]).includes(tag)) return { ok: false, error: "Pick a tag." };
  if (!slug) return { ok: false, error: "The page address needs at least one letter or number." };
  if (image && !validImage(image)) {
    return {
      ok: false,
      error: "The photo must be a path on this site (/LGS/roof.jpeg) or an https:// link.",
    };
  }

  const sortOrder = Number.parseInt(text(formData, "sortOrder") || "0", 10);

  const data = {
    slug,
    name,
    location,
    desc,
    body: optional(formData, "body"),
    tag: tag as PortfolioTag,
    image,
    sqm: optional(formData, "sqm"),
    steel: optional(formData, "steel"),
    waste: optional(formData, "waste"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  };

  const db = getDb();
  try {
    if (id) {
      // Revalidate the old address too, so a renamed slug stops serving.
      const before = await db.portfolioItem.findUnique({ where: { id }, select: { slug: true } });
      await db.portfolioItem.update({ where: { id }, data });
      revalidatePublic(slug, ...(before && before.slug !== slug ? [before.slug] : []));
    } else {
      await db.portfolioItem.create({ data });
      revalidatePublic(slug);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, error: `Another project already uses the address /projects/${slug}.` };
    }
    throw error;
  }

  return { ok: true };
}

export async function deletePortfolioItem(id: string) {
  await requireContent();
  const removed = await getDb().portfolioItem.delete({ where: { id }, select: { slug: true } });
  revalidatePublic(removed.slug);
}

/** One-click toggle from the list, without opening the edit form. */
export async function setPortfolioFlag(id: string, flag: "featured" | "published", value: boolean) {
  await requireContent();
  const item = await getDb().portfolioItem.update({
    where: { id },
    data: { [flag]: value },
    select: { slug: true },
  });
  revalidatePublic(item.slug);
}
