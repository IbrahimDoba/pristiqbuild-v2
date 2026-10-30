"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { AlertCircle, ChevronLeft, ChevronRight, ImagePlus, Loader2, Star, X } from "lucide-react";
import { isRemoteImage } from "@/lib/portfolio-constants";
import { uploadPhoto } from "./upload";

type Props = {
  photos: string[];
  setPhotos: (update: (previous: string[]) => string[]) => void;
  /** Reports uploads in flight, so the editor can hold the save. */
  onBusyChange: (busy: boolean) => void;
  name: string;
};

/**
 * The project's photos, in display order. The first is the cover: it leads
 * the project page and is the only one cards and the homepage show.
 */
export default function PhotoManager({ photos, setPhotos, onBusyChange, name }: Props) {
  const inputId = useId();
  const [pending, setPending] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => onBusyChange(pending.length > 0), [pending.length, onBusyChange]);

  async function add(files: File[]) {
    const images = files.filter((f) => f.type.startsWith("image/") || /\.(heic|heif)$/i.test(f.name));
    if (images.length === 0) return;
    setErrors([]);
    setPending((p) => [...p, ...images.map((f) => f.name)]);

    // One at a time, so photos land in the order they were picked.
    for (const file of images) {
      try {
        const url = await uploadPhoto(file);
        setPhotos((previous) => [...previous, url]);
      } catch (error) {
        setErrors((e) => [...e, error instanceof Error ? error.message : `${file.name}: upload failed.`]);
      } finally {
        setPending((p) => {
          const at = p.indexOf(file.name);
          return at === -1 ? p : [...p.slice(0, at), ...p.slice(at + 1)];
        });
      }
    }
  }

  const move = (from: number, to: number) =>
    setPhotos((previous) => {
      if (to < 0 || to >= previous.length) return previous;
      const next = [...previous];
      const [photo] = next.splice(from, 1);
      next.splice(to, 0, photo);
      return next;
    });

  const remove = (index: number) => setPhotos((previous) => previous.filter((_, i) => i !== index));

  const tileButton =
    "w-7 h-7 inline-flex items-center justify-center rounded-md bg-white/95 text-steel-800 shadow-sm hover:bg-white hover:text-primary-700 disabled:opacity-40 transition-colors";

  return (
    <div
      onDragOver={(e) => {
        if (!e.dataTransfer.types.includes("Files")) return;
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        add(Array.from(e.dataTransfer.files));
      }}
      className={`rounded-xl transition-[box-shadow] ${dragging ? "ring-2 ring-primary-600 ring-offset-4" : ""}`}
    >
      <ul className="grid grid-cols-3 gap-2 list-none p-0 m-0">
        {photos.map((src, index) => {
          const cover = index === 0;
          return (
            <li
              key={src}
              className={`group relative overflow-hidden rounded-lg border border-steel-200 bg-steel-100 ${
                cover ? "col-span-3 aspect-[16/10]" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={cover ? `${name || "Project"}: cover photo` : `${name || "Project"}: photo ${index + 1}`}
                fill
                sizes={cover ? "26rem" : "9rem"}
                unoptimized={isRemoteImage(src)}
                className="object-cover"
              />
              {cover && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-primary-700 px-2 py-0.5 text-xs font-semibold text-white">
                  <Star className="w-3 h-3" fill="currentColor" aria-hidden="true" />
                  Cover
                </span>
              )}
              <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
                {!cover && (
                  <button type="button" onClick={() => move(index, 0)} className={tileButton} aria-label={`Make photo ${index + 1} the cover`} title="Make cover">
                    <Star className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
                <button type="button" onClick={() => remove(index)} className={tileButton} aria-label={`Remove photo ${index + 1}`} title="Remove">
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
              {photos.length > 1 && (
                <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
                  <button type="button" onClick={() => move(index, index - 1)} disabled={index === 0} className={tileButton} aria-label={`Move photo ${index + 1} earlier`} title="Move earlier">
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => move(index, index + 1)} disabled={index === photos.length - 1} className={tileButton} aria-label={`Move photo ${index + 1} later`} title="Move later">
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              )}
            </li>
          );
        })}

        {pending.map((fileName, i) => (
          <li
            key={`pending-${i}`}
            className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-steel-300 bg-steel-50 p-2 text-center ${
              photos.length === 0 && i === 0 ? "col-span-3 aspect-[16/10]" : "aspect-square"
            }`}
          >
            <Loader2 className="w-5 h-5 animate-spin text-primary-700" aria-hidden="true" />
            <span className="w-full truncate text-xs text-steel-500">{fileName}</span>
          </li>
        ))}

        <li className={photos.length === 0 && pending.length === 0 ? "col-span-3" : "aspect-square"}>
          <label
            htmlFor={inputId}
            className={`flex h-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-steel-300 bg-white p-3 text-center text-steel-600 hover:border-primary-600 hover:text-primary-700 transition-colors ${
              photos.length === 0 && pending.length === 0 ? "py-10" : ""
            }`}
          >
            <ImagePlus className="w-6 h-6" aria-hidden="true" />
            <span className="text-sm font-medium">
              {photos.length === 0 && pending.length === 0 ? "Add photos" : "Add more"}
            </span>
            {photos.length === 0 && pending.length === 0 && (
              <span className="text-xs text-steel-500">or drop them here. The first becomes the cover.</span>
            )}
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            multiple
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
