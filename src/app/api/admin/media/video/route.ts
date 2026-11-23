import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { can } from "@/lib/admin/permissions";
import { MAX_VIDEO_BYTES, VIDEO_CHUNK_BYTES, VIDEO_MIME, sniffMp4, videoUrl } from "@/lib/media";

export const runtime = "nodejs";

/**
 * Video upload for /admin/portfolio, in pieces.
 *
 * Vercel refuses request bodies over 4.5 MB, so the editor sends the file in
 * slices and this appends them to one row:
 *
 *   POST ?total=<bytes>&width=&height=   first slice in the body; creates the row
 *   POST ?id=<id>&offset=<bytes>         each following slice
 *
 * A slice is only accepted at the exact offset the row has reached, so a
 * retried or out-of-order request cannot corrupt the file. The row's size
 * stays 0, and the video unservable, until the last slice lands.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !can(session.user.role, "content:write")) {
    return NextResponse.json({ error: "Not permitted." }, { status: 403 });
  }

  const url = new URL(request.url);
  const int = (key: string) => {
    const n = Number.parseInt(url.searchParams.get(key) ?? "", 10);
    return Number.isFinite(n) && n >= 0 ? n : -1;
  };

  const chunk = new Uint8Array(await request.arrayBuffer());
  if (chunk.length === 0 || chunk.length > VIDEO_CHUNK_BYTES) {
    return NextResponse.json({ error: "Unexpected piece size." }, { status: 400 });
  }

  const db = getDb();
  const id = url.searchParams.get("id");

  if (!id) {
    const total = int("total");
    if (total <= 0) return NextResponse.json({ error: "Missing file size." }, { status: 400 });
    if (total > MAX_VIDEO_BYTES) {
      return NextResponse.json(
        { error: `That video is over ${Math.round(MAX_VIDEO_BYTES / 1024 / 1024)} MB. Trim or compress it first.` },
        { status: 413 }
      );
    }
    if (!sniffMp4(chunk)) {
      return NextResponse.json({ error: "Only MP4 videos are accepted." }, { status: 415 });
    }
    const dimension = (key: string) => (int(key) > 0 && int(key) <= 10000 ? int(key) : 0);
    const done = chunk.length >= total;
    const asset = await db.mediaAsset.create({
      data: {
        mime: VIDEO_MIME,
        bytes: chunk,
        size: done ? chunk.length : 0,
        width: dimension("width"),
        height: dimension("height"),
      },
      select: { id: true },
    });
    return NextResponse.json({ id: asset.id, received: chunk.length, ...(done ? { url: videoUrl(asset.id) } : {}) }, { status: 201 });
  }

  if (!/^[a-z0-9]+$/.test(id)) return NextResponse.json({ error: "Unknown upload." }, { status: 404 });
  const offset = int("offset");
  const total = int("total");
  if (offset <= 0 || total <= 0 || total > MAX_VIDEO_BYTES || offset + chunk.length > total) {
    return NextResponse.json({ error: "Unexpected piece." }, { status: 400 });
  }
  const done = offset + chunk.length === total;

  // Appends only to an unfinished video that is exactly `offset` bytes long.
  const updated = await db.$executeRaw`
    UPDATE "MediaAsset"
    SET "bytes" = "bytes" || ${chunk}, "size" = ${done ? total : 0}
    WHERE "id" = ${id} AND "mime" = ${VIDEO_MIME} AND "size" = 0 AND octet_length("bytes") = ${offset}`;
  if (updated !== 1) {
    return NextResponse.json({ error: "The upload lost its place. Try the video again." }, { status: 409 });
  }

  return NextResponse.json({ id, received: offset + chunk.length, ...(done ? { url: videoUrl(id) } : {}) });
}
