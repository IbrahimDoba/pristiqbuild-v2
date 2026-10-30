import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { can } from "@/lib/admin/permissions";
import { MAX_MEDIA_BYTES, mediaUrl, sniffImage } from "@/lib/media";

export const runtime = "nodejs";

/**
 * Photo upload for /admin/portfolio.
 *
 * The proxy only guards /admin pages, so this checks the session itself.
 * Expects one already-resized image (the editor does that in the browser)
 * plus its pixel size.
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

  const asset = await getDb().mediaAsset.create({
    data: { mime, bytes, size: bytes.length, width: dimension("width"), height: dimension("height") },
    select: { id: true },
  });

  return NextResponse.json({ url: mediaUrl(asset.id, mime) }, { status: 201 });
}
