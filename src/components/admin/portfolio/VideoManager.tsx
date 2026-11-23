"use client";

import { useEffect, useId, useState } from "react";
import { AlertCircle, ChevronDown, ChevronUp, Loader2, Video, X } from "lucide-react";
import { MAX_VIDEO_BYTES, videoPoster } from "@/lib/media";
import { uploadVideo } from "./upload";

type Props = {
  videos: string[];
  setVideos: (update: (previous: string[]) => string[]) => void;
  /** Reports uploads in flight, so the editor can hold the save. */
  onBusyChange: (busy: boolean) => void;
  name: string;
};

const MAX_MB = Math.round(MAX_VIDEO_BYTES / 1024 / 1024);

/** The project's video clips, in display order. */
export default function VideoManager({ videos, setVideos, onBusyChange, name }: Props) {
  const inputId = useId();
  const [pending, setPending] = useState<{ name: string; progress: number } | null>(null);
  const [queued, setQueued] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const busy = pending !== null || queued > 0;
  useEffect(() => onBusyChange(busy), [busy, onBusyChange]);

  async function add(files: File[]) {
    if (files.length === 0) return;
    setErrors([]);
    setQueued(files.length);

    // One at a time: each is tens of megabytes.
    for (const file of files) {
      setQueued((n) => n - 1);
      if (file.size > MAX_VIDEO_BYTES) {
        setErrors((e) => [
          ...e,
          `${file.name} is ${Math.round(file.size / 1024 / 1024)} MB. The limit is ${MAX_MB} MB: trim it to under a minute or export at 720p.`,
        ]);
        continue;
      }
      setPending({ name: file.name, progress: 0 });
      try {
        const url = await uploadVideo(file, (progress) => setPending({ name: file.name, progress }));
        setVideos((previous) => [...previous, url]);
      } catch (error) {
        setErrors((e) => [...e, error instanceof Error ? error.message : `${file.name}: upload failed.`]);
      } finally {
        setPending(null);
      }
    }
  }

  const move = (from: number, to: number) =>
    setVideos((previous) => {
      if (to < 0 || to >= previous.length) return previous;
      const next = [...previous];
      const [video] = next.splice(from, 1);
      next.splice(to, 0, video);
      return next;
    });

  const remove = (index: number) => setVideos((previous) => previous.filter((_, i) => i !== index));

  const rowButton =
    "w-7 h-7 inline-flex items-center justify-center rounded-md border border-steel-200 bg-white text-steel-700 hover:text-primary-700 hover:border-primary-300 disabled:opacity-40 transition-colors";

  return (
    <div>
      <ul className="space-y-2 list-none p-0 m-0">
        {videos.map((src, index) => (
          <li key={src} className="flex items-center gap-3 rounded-lg border border-steel-200 bg-white p-2">
            <video
              src={src}
              poster={videoPoster(src)}
              controls
              preload="none"
              playsInline
              aria-label={`${name || "Project"}: video ${index + 1}`}
              className="w-40 aspect-video rounded-md bg-steel-900 object-cover"
            />
            <span className="flex-1 text-sm text-steel-700">Video {index + 1}</span>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} className={rowButton} aria-label={`Move video ${index + 1} up`} title="Move up">
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => move(index, index + 1)} disabled={index === videos.length - 1} className={rowButton} aria-label={`Move video ${index + 1} down`} title="Move down">
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => remove(index)} className={rowButton} aria-label={`Remove video ${index + 1}`} title="Remove">
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}

        {pending && (
          <li className="rounded-lg border border-dashed border-steel-300 bg-steel-50 p-3" role="status">
            <div className="flex items-center gap-2 text-sm text-steel-600">
              <Loader2 className="w-4 h-4 animate-spin text-primary-700" aria-hidden="true" />
              <span className="flex-1 truncate">{pending.name}</span>
              <span className="tabular">{Math.round(pending.progress * 100)}%</span>
            </div>
            <div className="mt-2 h-1 rounded bg-steel-200 overflow-hidden">
              <div
                className="h-full bg-primary-600 origin-left transition-transform"
                style={{ transform: `scaleX(${pending.progress})` }}
              />
            </div>
          </li>
        )}

        <li>
          <label
            htmlFor={inputId}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-steel-300 bg-white p-3 text-sm font-medium text-steel-600 hover:border-primary-600 hover:text-primary-700 transition-colors ${
              busy ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <Video className="w-5 h-5" aria-hidden="true" />
            {videos.length === 0 ? "Add a video" : "Add another"}
          </label>
          <input
            id={inputId}
            type="file"
            accept="video/mp4"
            multiple
            disabled={busy}
            className="sr-only"
            onChange={(e) => {
              add(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />
        </li>
      </ul>

      {errors.length > 0 && (
        <ul role="alert" className="mt-3 space-y-1 list-none p-0">
          {errors.map((message, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
