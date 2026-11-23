import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { can } from "@/lib/admin/permissions";
import { MAX_MEDIA_BYTES, VIDEO_MIME, mediaUrl, posterId, sniffImage } from "@/lib/media";

export const runtime = "nodejs";

/**
 * Photo upload for /admin/portfolio.
 *
 * The proxy only guards /admin pages, so this checks the session itself.
 * Expects one already-resized image (the editor does that in the browser)
 * plus its pixel size. With `posterFor=<video id>` the image is stored as that
 * video's poster frame, under the id the player derives.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !can(session.user.role, "content:write")) {
    return NextResponse.json({ error: "Not permitted." }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected a file upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }
  if (file.size > MAX_MEDIA_BYTES) {
    return NextResponse.json({ error: "That photo is too large, even after resizing." }, { status: 413 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mime = sniffImage(bytes);
  if (!mime) {
    return NextResponse.json({ error: "Only JPEG, PNG and WebP photos are accepted." }, { status: 415 });
  }

  const dimension = (key: string) => {
    const n = Number.parseInt(String(form.get(key) ?? ""), 10);
    return Number.isFinite(n) && n > 0 && n <= 10000 ? n : 0;
  };

  const data = { mime, bytes, size: bytes.length, width: dimension("width"), height: dimension("height") };
  const db = getDb();

  const posterFor = String(form.get("posterFor") ?? "");
  if (posterFor) {
    // The player asks for <id>p.webp, so the poster has to be WebP.
    if (mime !== "image/webp") {
      return NextResponse.json({ error: "A video poster must be WebP." }, { status: 415 });
    }
    const video = /^[a-z0-9]+$/.test(posterFor)
      ? await db.mediaAsset.findUnique({ where: { id: posterFor }, select: { mime: true } })
      : null;
    if (video?.mime !== VIDEO_MIME) {
      return NextResponse.json({ error: "Unknown video." }, { status: 404 });
    }
    const id = posterId(posterFor);
    await db.mediaAsset.upsert({ where: { id }, create: { id, ...data }, update: data });
    return NextResponse.json({ url: mediaUrl(id, mime) }, { status: 201 });
  }

  const asset = await db.mediaAsset.create({ data, select: { id: true } });

  return NextResponse.json({ url: mediaUrl(asset.id, mime) }, { status: 201 });
}
