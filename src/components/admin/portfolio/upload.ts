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

const VIDEO_CHUNK = 3 * 1024 * 1024;

/** The video's size and a frame from one second in, as a WebP poster. */
async function readVideo(file: File) {
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  const objectUrl = URL.createObjectURL(file);
  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () =>
        reject(new Error(`${file.name}: this browser can't play that file. Export it as an MP4 (H.264).`));
      video.src = objectUrl;
    });
    // The very first frame is often black or mid-fade.
    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve();
      video.currentTime = Math.min(1, (video.duration || 2) / 2);
    });

    const scale = Math.min(1, 1600 / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const poster = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.8));
    return {
      width: video.videoWidth,
      height: video.videoHeight,
      // Older Safari hands back a PNG when asked for WebP; go without a poster.
      poster: poster?.type === "image/webp" ? poster : null,
      posterWidth: canvas.width,
      posterHeight: canvas.height,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Uploads a video in pieces and returns its address, e.g. /media/abc123.mp4.
 * `onProgress` gets a fraction from 0 to 1.
 */
export async function uploadVideo(file: File, onProgress: (fraction: number) => void): Promise<string> {
  const { width, height, poster, posterWidth, posterHeight } = await readVideo(file);

  let id = "";
  let url = "";
  for (let offset = 0; offset < file.size; offset += VIDEO_CHUNK) {
    const query = new URLSearchParams({ total: String(file.size) });
    if (id) {
      query.set("id", id);
      query.set("offset", String(offset));
    } else {
      query.set("width", String(width));
      query.set("height", String(height));
    }
    const response = await fetch(`/api/admin/media/video?${query}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: file.slice(offset, offset + VIDEO_CHUNK),
    });
    const data = (await response.json().catch(() => ({}))) as { id?: string; url?: string; error?: string };
    if (!response.ok || !data.id) {
      throw new Error(`${file.name}: ${data.error ?? `upload failed (${response.status}).`}`);
    }
    id = data.id;
    if (data.url) url = data.url;
    onProgress(Math.min(1, (offset + VIDEO_CHUNK) / file.size));
  }
  if (!url) throw new Error(`${file.name}: the upload did not finish.`);

  if (poster) {
    const form = new FormData();
    form.append("file", poster, "poster.webp");
    form.append("width", String(posterWidth));
    form.append("height", String(posterHeight));
    form.append("posterFor", id);
    // A missing poster only means a blank tile before play; not worth failing for.
    await fetch("/api/admin/media", { method: "POST", body: form }).catch(() => undefined);
  }
  return url;
}
