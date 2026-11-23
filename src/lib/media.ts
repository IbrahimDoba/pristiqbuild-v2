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
  const match = src?.match(/^\/media\/([a-z0-9]+)\.(webp|jpg|png|mp4)$/);
  return match ? match[1] : null;
}

export const VIDEO_MIME = "video/mp4";

/**
 * Enough for about a minute of 720p. Clips belong on the page as a glimpse of
 * the site, not as the full drone flight; longer footage should be trimmed
 * and compressed before upload.
 */
export const MAX_VIDEO_BYTES = 40 * 1024 * 1024;

/** One upload request. Vercel refuses bodies over 4.5 MB. */
export const VIDEO_CHUNK_BYTES = 3 * 1024 * 1024;

export function videoUrl(id: string) {
  return `/media/${id}.mp4`;
}

/** "/media/abc123.mp4" -> "abc123". Null for anything else. */
export function videoId(src: string | null | undefined) {
  const match = src?.match(/^\/media\/([a-z0-9]+)\.mp4$/);
  return match ? match[1] : null;
}

/** A video's poster frame is a photo stored under the video's id plus "p". */
export function posterId(id: string) {
  return `${id}p`;
}

export function videoPoster(src: string) {
  const id = videoId(src);
  return id ? `/media/${posterId(id)}.webp` : undefined;
}

/** An MP4 starts with a box whose type, at byte 4, is "ftyp". */
export function sniffMp4(bytes: Uint8Array) {
  return bytes.length > 12 && bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;
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
