/**
 * Uploaded photos: shared between the upload endpoint, the route that serves
 * them and the portfolio actions that clean them up.
 */

export const MEDIA_TYPES = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
} as const;

export type MediaMime = keyof typeof MEDIA_TYPES;

/**
 * Vercel refuses request bodies over 4.5 MB before the function runs. The
 * browser resizes to 2400px first, which lands well under this.
 */
export const MAX_MEDIA_BYTES = 4 * 1024 * 1024;

export function mediaUrl(id: string, mime: MediaMime) {
  return `/media/${id}.${MEDIA_TYPES[mime]}`;
}

/** "/media/abc123.webp" -> "abc123". Null for anything that is not an upload. */
export function mediaId(src: string | null | undefined) {
  const match = src?.match(/^\/media\/([a-z0-9]+)\.(webp|jpg|png)$/);
  return match ? match[1] : null;
}

/**
 * The type from the file's first bytes. The browser's declared type is
 * whatever the client says it is.
 */
export function sniffImage(bytes: Uint8Array): MediaMime | null {
  const at = (i: number, ...expected: number[]) => expected.every((b, j) => bytes[i + j] === b);
  if (at(0, 0xff, 0xd8, 0xff)) return "image/jpeg";
  if (at(0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "image/png";
  // RIFF....WEBP
  if (at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) return "image/webp";
  return null;
}
