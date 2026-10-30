/**
 * Resizes a photo in the browser, then uploads it.
 *
 * Phone photos are 4-12 MB, over Vercel's 4.5 MB request limit and far more
 * than a web page needs. 2400px on the long edge covers a full-width hero on
 * a retina laptop; the image optimiser makes the smaller sizes from it.
 */

const MAX_EDGE = 2400;

async function shrink(file: File) {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error(
      `${file.name}: this browser can't read that file. Use a JPEG, PNG or WebP (export iPhone HEIC photos as JPEG first).`
    );
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error(`${file.name}: could not process the photo.`);
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const encode = (type: string, quality: number) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  // Older Safari cannot encode WebP and quietly hands back a PNG instead.
  let blob = await encode("image/webp", 0.82);
  if (!blob || blob.type !== "image/webp") blob = await encode("image/jpeg", 0.85);
  if (!blob) throw new Error(`${file.name}: could not process the photo.`);

  return { blob, width, height };
}

/** Returns the photo's address on this site, e.g. /media/abc123.webp. */
export async function uploadPhoto(file: File): Promise<string> {
  const { blob, width, height } = await shrink(file);

  const form = new FormData();
  form.append("file", blob, file.name);
  form.append("width", String(width));
  form.append("height", String(height));

  const response = await fetch("/api/admin/media", { method: "POST", body: form });
  const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!response.ok || !data.url) {
    throw new Error(`${file.name}: ${data.error ?? `upload failed (${response.status}).`}`);
  }
  return data.url;
}
