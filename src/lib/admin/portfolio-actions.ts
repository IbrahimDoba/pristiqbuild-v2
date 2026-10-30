"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Prisma, type PortfolioTag } from "@/generated/prisma/client";
import { can } from "@/lib/admin/permissions";
import { TAGS, slugify } from "@/lib/portfolio-constants";
import { mediaId } from "@/lib/media";

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

/** A path under public/, or an https URL. Nothing that can climb directories. */
function validImage(image: string) {
  if (/^https:\/\/[^\s]+$/i.test(image)) return true;
  return !image.includes("..") && /^\/[\w\-/. ]+\.(jpe?g|png|webp|avif)$/i.test(image);
}

/** Uploaded photos an entry points at. */
function mediaIds(item: { image: string | null; gallery: string[] }) {
  return [item.image, ...item.gallery].map(mediaId).filter((id): id is string => Boolean(id));
}

/** Deletes uploads that `before` used and `after` no longer does. */
async function dropUnusedMedia(before: string[], after: string[]) {
  const gone = before.filter((id) => !after.includes(id));
  if (gone.length > 0) await getDb().mediaAsset.deleteMany({ where: { id: { in: gone } } });
}

/** What the editor sends: every field as typed. */
export type PortfolioDraft = {
  id?: string;
  slug: string;
  name: string;
  location: string;
  tag: string;
  desc: string;
  body: string;
  sqm: string;
  steel: string;
  waste: string;
  /** In display order; the first is the cover. */
  photos: string[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export type PortfolioResult =
  | { ok: true; id: string; slug: string }
  | { ok: false; error: string };

/** Creates an entry, or updates it when the draft carries an id. */
export async function savePortfolioItem(draft: PortfolioDraft): Promise<PortfolioResult> {
  await requireContent();

  // The argument arrives over the network: trust none of its types.
  const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const optional = (value: unknown) => clean(value) || null;

  const id = clean(draft.id);
  const name = clean(draft.name);
  const location = clean(draft.location);
  const desc = clean(draft.desc);
  const tag = clean(draft.tag);
  // Blank means "make one from the name".
  const slug = slugify(clean(draft.slug) || name);
  const photos = (Array.isArray(draft.photos) ? draft.photos : []).map(clean).filter(Boolean);

  if (!name) return { ok: false, error: "Give the project a name." };
  if (!location) return { ok: false, error: "Add a location." };
  if (!desc) return { ok: false, error: "Add a short description." };
  if (!(TAGS as string[]).includes(tag)) return { ok: false, error: "Pick a type of work." };
  if (!slug) return { ok: false, error: "The page address needs at least one letter or number." };
  if (photos.length > 40) return { ok: false, error: "Keep it to 40 photos or fewer." };
  if (photos.some((photo) => !validImage(photo))) {
    return { ok: false, error: "One of the photos has an address this site cannot show." };
  }

  const sortOrder = Math.trunc(Number(draft.sortOrder));

  const data = {
    slug,
    name,
    location,
    desc,
    body: optional(draft.body),
    tag: tag as PortfolioTag,
    image: photos[0] ?? null,
    gallery: photos.slice(1),
    sqm: optional(draft.sqm),
    steel: optional(draft.steel),
    waste: optional(draft.waste),
    featured: draft.featured === true,
    published: draft.published === true,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  };

  const db = getDb();
  try {
    if (id) {
      const before = await db.portfolioItem.findUnique({
        where: { id },
        select: { slug: true, image: true, gallery: true },
      });
      if (!before) return { ok: false, error: "This project was deleted in the meantime." };
      await db.portfolioItem.update({ where: { id }, data });
      await dropUnusedMedia(mediaIds(before), mediaIds(data));
      // Revalidate the old address too, so a renamed slug stops serving.
      revalidatePublic(slug, ...(before.slug !== slug ? [before.slug] : []));
      return { ok: true, id, slug };
    }
    const created = await db.portfolioItem.create({ data, select: { id: true } });
    revalidatePublic(slug);
    return { ok: true, id: created.id, slug };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, error: `Another project already uses the address /projects/${slug}.` };
    }
    throw error;
  }
}

export async function deletePortfolioItem(id: string) {
  await requireContent();
  const removed = await getDb().portfolioItem.delete({
    where: { id },
    select: { slug: true, image: true, gallery: true },
  });
  await dropUnusedMedia(mediaIds(removed), []);
  revalidatePublic(removed.slug);
}

/** One-click toggle from the list, without opening the editor. */
export async function setPortfolioFlag(id: string, flag: "featured" | "published", value: boolean) {
  await requireContent();
  const item = await getDb().portfolioItem.update({
    where: { id },
    data: { [flag]: value },
    select: { slug: true },
  });
  revalidatePublic(item.slug);
}
