import { getDb } from "@/lib/db";
import { MEDIA_TYPES, VIDEO_MIME, mediaId, videoId } from "@/lib/media";

export const runtime = "nodejs";

const CACHE = "public, max-age=31536000, s-maxage=31536000, immutable";

/**
 * Serves photos and videos uploaded in /admin/portfolio.
 *
 * An id is never reused and its bytes never change, so the response is cached
 * for a year by the browser and the CDN alike. The database is read once per
 * photo per edge, not once per visit.
 */
export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (videoId(`/media/${file}`)) return video(request, videoId(`/media/${file}`)!);

  const id = mediaId(`/media/${file}`);
  if (!id) return new Response("Not found", { status: 404 });

  const asset = await getDb().mediaAsset.findUnique({
    where: { id },
    select: { mime: true, bytes: true },
  });
  // The extension must match too, so one photo has exactly one URL.
  const ext = file.slice(file.lastIndexOf(".") + 1);
  if (!asset || MEDIA_TYPES[asset.mime as keyof typeof MEDIA_TYPES] !== ext) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(asset.bytes), {
    headers: {
      "Content-Type": asset.mime,
      "Content-Length": String(asset.bytes.length),
      "Cache-Control": CACHE,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Rows read per database round trip while streaming a video. */
const SLICE = 1024 * 1024;

/**
 * A video, whole or by byte range.
 *
 * Browsers ask for ranges to seek, and Safari will not play a video at all
 * from a server that ignores them. The file is streamed out in slices so a
 * 30 MB clip never sits in the function's memory, and so the response is not
 * held to the size limit that applies to buffered ones.
 */
async function video(request: Request, id: string) {
  const db = getDb();
  const meta = await db.mediaAsset.findUnique({ where: { id }, select: { mime: true, size: true } });
  // size is 0 while an upload is still arriving in pieces.
  if (!meta || meta.mime !== VIDEO_MIME || meta.size === 0) {
    return new Response("Not found", { status: 404 });
  }

  const total = meta.size;
  let start = 0;
  let end = total - 1;
  let partial = false;

  const range = request.headers.get("range");
  if (range) {
    const match = range.match(/^bytes=(\d*)-(\d*)$/);
    if (!match || (match[1] === "" && match[2] === "")) return unsatisfiable(total);
    if (match[1] === "") {
      // "bytes=-500": the last 500 bytes.
      start = Math.max(0, total - Number(match[2]));
    } else {
      start = Number(match[1]);
      if (match[2] !== "") end = Math.min(Number(match[2]), total - 1);
    }
    if (start >= total || start > end) return unsatisfiable(total);
    partial = true;
  }

  let position = start;
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (position > end) return controller.close();
      const length = Math.min(SLICE, end - position + 1);
      // substring() on bytea is 1-indexed.
      const rows = await db.$queryRaw<{ slice: Uint8Array }[]>`
        SELECT substring("bytes" FROM ${position + 1} FOR ${length}) AS slice
        FROM "MediaAsset" WHERE "id" = ${id}`;
      const slice = rows[0]?.slice;
      if (!slice || slice.length === 0) return controller.close();
      controller.enqueue(new Uint8Array(slice));
      position += slice.length;
    },
  });

  return new Response(body, {
    status: partial ? 206 : 200,
    headers: {
      "Content-Type": VIDEO_MIME,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
      ...(partial ? { "Content-Range": `bytes ${start}-${end}/${total}` } : {}),
      "Cache-Control": CACHE,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function unsatisfiable(total: number) {
  return new Response("Range not satisfiable", {
    status: 416,
    headers: { "Content-Range": `bytes */${total}` },
  });
}
