import { getDb } from "@/lib/db";
import { MEDIA_TYPES, mediaId } from "@/lib/media";

export const runtime = "nodejs";

/**
 * Serves photos uploaded in /admin/portfolio.
 *
 * An id is never reused and its bytes never change, so the response is cached
 * for a year by the browser and the CDN alike. The database is read once per
 * photo per edge, not once per visit.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
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
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
