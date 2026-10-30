"use client";

import { useEffect, useRef, useState } from "react";
import { Info, Monitor, Smartphone } from "lucide-react";
import type { PortfolioEntry } from "@/lib/portfolio-constants";
import { PREVIEW_READY, PREVIEW_UPDATE, type PreviewUpdate, type PreviewView } from "@/lib/portfolio-preview";

const VIEWS: { value: PreviewView; label: string }[] = [
  { value: "page", label: "Project page" },
  { value: "list", label: "Projects list" },
  { value: "home", label: "Homepage" },
];

/** Widths the frame renders at, so the site's breakpoints behave as they would. */
const DEVICES = { desktop: 1280, mobile: 390 } as const;
type Device = keyof typeof DEVICES;

type Props = {
  item: PortfolioEntry;
  others: PortfolioEntry[];
  view: PreviewView;
  onViewChange: (view: PreviewView) => void;
  /** Why the draft is missing from, or differs on, the chosen view. */
  notice: string | null;
};

/**
 * The public site, rendered with the draft in it.
 *
 * The frame loads /preview/portfolio, which is the real site layout and the
 * real components; this pane posts the draft to it on every change.
 */
export default function PreviewPane({ item, others, view, onViewChange, notice }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");
  const [box, setBox] = useState({ width: 0, height: 0 });

  const message: PreviewUpdate = { type: PREVIEW_UPDATE, view, item, others };
  const latest = useRef(message);
  useEffect(() => {
    latest.current = message;
  });

  useEffect(() => {
    // The frame announces itself on every load, including reloads, and gets
    // the current draft straight back.
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type !== PREVIEW_READY) return;
      setReady(true);
      frameRef.current?.contentWindow?.postMessage(latest.current, window.location.origin);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const update: PreviewUpdate = { type: PREVIEW_UPDATE, view, item, others };
    frameRef.current?.contentWindow?.postMessage(update, window.location.origin);
  }, [ready, view, item, others]);

  useEffect(() => {
    const element = boxRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setBox({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const frameWidth = DEVICES[device];
  const scale = box.width > 0 ? Math.min(1, box.width / frameWidth) : 1;

  const segment = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      active ? "bg-white text-steel-900 shadow-sm" : "text-steel-600 hover:text-steel-900"
    }`;

  return (
    <section aria-label="Live preview" className="h-full flex flex-col rounded-2xl border border-steel-200 bg-white overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-steel-200 p-2">
        <div role="group" aria-label="Where to preview" className="inline-flex rounded-lg bg-steel-100 p-0.5">
          {VIEWS.map((v) => (
            <button
              key={v.value}
              type="button"
              aria-pressed={view === v.value}
              onClick={() => onViewChange(v.value)}
              className={segment(view === v.value)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div aria-label="Screen size" role="group" className="ml-auto inline-flex rounded-lg bg-steel-100 p-0.5">
          <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} className={segment(device === "desktop")}>
            <Monitor className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Desktop</span>
          </button>
          <button type="button" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")} className={segment(device === "mobile")}>
            <Smartphone className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Mobile</span>
          </button>
        </div>
      </div>

      {notice && (
        <p className="flex items-start gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
          <Info className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          {notice}
        </p>
      )}

      <div ref={boxRef} className="relative flex-1 min-h-[32rem] bg-steel-100 overflow-hidden">
        <div
          className="absolute top-0 h-full"
          style={{
            width: frameWidth * scale,
            left: Math.max(0, (box.width - frameWidth * scale) / 2),
          }}
        >
          <iframe
            ref={frameRef}
            src="/preview/portfolio"
            title="Preview of the public site"
            className="bg-white origin-top-left border-0"
            style={{
              width: frameWidth,
              height: scale > 0 ? box.height / scale : box.height,
              transform: `scale(${scale})`,
            }}
          />
        </div>
        {!ready && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-steel-500">
            Loading preview…
          </p>
        )}
      </div>
    </section>
  );
}
