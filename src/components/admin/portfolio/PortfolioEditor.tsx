"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, CheckCircle, ExternalLink, Trash2 } from "lucide-react";
import {
  HAND_BUILT_SLUGS,
  TAGS,
  TAG_LABEL,
  projectHref,
  slugify,
  type PortfolioEntry,
} from "@/lib/portfolio-constants";
import { deletePortfolioItem, savePortfolioItem, type PortfolioDraft } from "@/lib/admin/portfolio-actions";
import { withDraft, type PreviewView } from "@/lib/portfolio-preview";
import PhotoManager from "./PhotoManager";
import PreviewPane from "./PreviewPane";

/** The homepage strip shows this many featured projects. */
const HOMEPAGE_SLOTS = 3;
/** Cards clamp nothing, so a long description makes a tall card. */
const DESC_GUIDE = 200;

function toDraft(item: PortfolioEntry | undefined, sortOrder: number): PortfolioDraft {
  return {
    id: item?.id,
    slug: item?.slug ?? "",
    name: item?.name ?? "",
    location: item?.location ?? "",
    tag: item?.tag ?? "LGS_ROOFING",
    desc: item?.desc ?? "",
    body: item?.body ?? "",
    sqm: item?.sqm ?? "",
    steel: item?.steel ?? "",
    waste: item?.waste ?? "",
    photos: item ? [item.image, ...item.gallery].filter((p): p is string => Boolean(p)) : [],
    featured: item?.featured ?? false,
    published: item?.published ?? true,
    sortOrder: item?.sortOrder ?? sortOrder,
  };
}

/** The draft as the public components expect it, with stand-ins for blanks. */
function toEntry(draft: PortfolioDraft): PortfolioEntry {
  return {
    id: draft.id ?? "draft",
    slug: slugify(draft.slug || draft.name) || "new-project",
    name: draft.name.trim() || "Project name",
    location: draft.location.trim() || "Location",
    tag: draft.tag as PortfolioEntry["tag"],
    desc: draft.desc.trim() || "A sentence or two about the job.",
    body: draft.body.trim() || null,
    sqm: draft.sqm.trim() || null,
    steel: draft.steel.trim() || null,
    waste: draft.waste.trim() || null,
    image: draft.photos[0] ?? null,
    gallery: draft.photos.slice(1),
    featured: draft.featured,
    published: draft.published,
    sortOrder: Number.isFinite(draft.sortOrder) ? draft.sortOrder : 0,
  };
}

type Props = {
  /** Absent when adding a project. */
  item?: PortfolioEntry;
  /** Every other published entry, in display order, for the list previews. */
  others: PortfolioEntry[];
  /** Order number for a new entry: after everything else. */
  nextSortOrder?: number;
};

export default function PortfolioEditor({ item, others, nextSortOrder = 0 }: Props) {
  const router = useRouter();
  const [draft, setDraft] = useState(() => toDraft(item, nextSortOrder));
  const [saved, setSaved] = useState(() => JSON.stringify(toDraft(item, nextSortOrder)));
  const [view, setView] = useState<PreviewView>("page");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);
  const [saving, startSaving] = useTransition();
  const [deleting, startDeleting] = useTransition();

  const dirty = JSON.stringify(draft) !== saved;
  const entry = useMemo(() => toEntry(draft), [draft]);

  const set = <K extends keyof PortfolioDraft>(key: K, value: PortfolioDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setJustSaved(false);
  };
  const setPhotos = useCallback((update: (previous: string[]) => string[]) => {
    setDraft((d) => ({ ...d, photos: update(d.photos) }));
    setJustSaved(false);
  }, []);

  const save = useCallback(() => {
    if (uploading || saving) return;
    startSaving(async () => {
      const result = await savePortfolioItem(draft);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setError(null);
      const stored = { ...draft, id: result.id, slug: result.slug };
      setDraft(stored);
      setSaved(JSON.stringify(stored));
      setJustSaved(true);
      if (item) router.refresh();
      else router.replace(`/admin/portfolio/${result.id}`);
    });
  }, [draft, item, router, saving, uploading]);

  // Ctrl/Cmd+S saves, as in any editor.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [save]);

  // Leaving with unsaved edits asks first.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const remove = () => {
    if (!item) return;
    if (!window.confirm(`Delete "${item.name}" and its photos for good? To take it off the site but keep it, turn off Published instead.`)) return;
    startDeleting(async () => {
      await deletePortfolioItem(item.id);
      router.push("/admin/portfolio");
    });
  };

  // Why the draft is missing from, or differs on, the chosen view.
  let notice: string | null = null;
  if (view === "page") {
    if (HAND_BUILT_SLUGS.includes(entry.slug)) {
      notice = "This project has its own hand-built page, which this editor does not change. Your edits show on the Projects list and the homepage.";
    } else if (!draft.published) {
      notice = "Hidden: this page is not visible to visitors until you turn on Published.";
    }
  } else if (!draft.published) {
    notice = "Hidden: this project is left out until you turn on Published.";
  } else if (view === "home") {
    const featured = withDraft(entry, others).filter((i) => i.featured);
    const position = featured.findIndex((i) => i.id === entry.id);
    if (!draft.featured) {
      notice = "Not on the homepage. Turn on Featured to add it.";
    } else if (position >= HOMEPAGE_SLOTS) {
      notice = `Featured, but the homepage shows only the first ${HOMEPAGE_SLOTS} featured projects and this is number ${position + 1}. Give it a lower order number to move it up.`;
    }
  }

  const input =
    "w-full px-3 py-2 rounded-lg border border-steel-200 bg-white text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20";
  const label = "block text-sm font-medium text-steel-700 mb-1.5";
  const hint = "font-normal text-steel-400";
  const card = "bg-white rounded-2xl border border-steel-200 p-5 space-y-4";
  const cardTitle = "font-display font-semibold text-steel-900";

  return (
    <div className="space-y-4">
      <div className="sticky top-14 z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-steel-50/95 backdrop-blur border-b border-steel-200 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-steel-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Portfolio
        </Link>
        <h1 className="font-display font-bold text-xl text-steel-900 truncate min-w-0">
          {item ? draft.name || "Untitled project" : "New project"}
        </h1>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          <p aria-live="polite" className="text-sm text-steel-500">
            {uploading
              ? "Uploading photos…"
              : dirty
                ? "Unsaved changes"
                : justSaved
                  ? (
                    <span className="inline-flex items-center gap-1.5 text-green-700">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      Saved. The site is updated.
                    </span>
                  )
                  : null}
          </p>
          {item?.published && !dirty && (
            <Link
              href={projectHref(item.slug)}
              target="_blank"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
            >
              View live
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}
          <button
            type="button"
            onClick={save}
            disabled={saving || uploading || (!dirty && Boolean(item))}
            title="Save (Ctrl+S)"
            className="px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 disabled:opacity-60 active:translate-y-px transition-[background-color,transform,opacity]"
          >
            {saving ? "Saving…" : item ? "Save changes" : "Add project"}
          </button>
        </div>

        {error && (
          <p role="alert" className="basis-full flex items-center gap-2 text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>

      <div className="grid xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] gap-6 items-start">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
          className="space-y-4"
        >
          <section className={card} aria-labelledby="photos-heading">
            <div>
              <h2 id="photos-heading" className={cardTitle}>Photos</h2>
              <p className="text-sm text-steel-500 mt-0.5">
                The first is the cover, used on cards and the homepage. The rest form the gallery on the project page.
              </p>
            </div>
            <PhotoManager photos={draft.photos} setPhotos={setPhotos} onBusyChange={setUploading} name={draft.name} />
          </section>

          <section className={card} aria-labelledby="story-heading">
            <h2 id="story-heading" className={cardTitle}>The project</h2>
            <div>
              <label htmlFor="pf-name" className={label}>Name</label>
              <input id="pf-name" value={draft.name} onChange={(e) => set("name", e.target.value)} required placeholder="Akure Residence…" className={input} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="pf-location" className={label}>Location</label>
                <input id="pf-location" value={draft.location} onChange={(e) => set("location", e.target.value)} required placeholder="Akure, Ondo State…" className={input} />
              </div>
              <div>
                <label htmlFor="pf-tag" className={label}>Type of work</label>
                <select id="pf-tag" value={draft.tag} onChange={(e) => set("tag", e.target.value)} className={input}>
                  {TAGS.map((t) => (
                    <option key={t} value={t}>{TAG_LABEL[t]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <label htmlFor="pf-desc" className={label}>Short description</label>
                <span className={`text-xs tabular ${draft.desc.length > DESC_GUIDE ? "text-amber-700" : "text-steel-400"}`}>
                  {draft.desc.length}/{DESC_GUIDE}
                </span>
              </div>
              <textarea id="pf-desc" value={draft.desc} onChange={(e) => set("desc", e.target.value)} required rows={3} placeholder="One or two sentences, shown on cards…" className={`${input} resize-y`} />
            </div>
            <div>
              <label htmlFor="pf-body" className={label}>
                Full write-up <span className={hint}>(optional, project page only)</span>
              </label>
              <textarea id="pf-body" value={draft.body} onChange={(e) => set("body", e.target.value)} rows={7} placeholder="What the job was, how it was done, how it turned out. Leave a blank line between paragraphs…" className={`${input} resize-y`} />
            </div>
          </section>

          <section className={card} aria-labelledby="numbers-heading">
            <div>
              <h2 id="numbers-heading" className={cardTitle}>Numbers <span className={`text-sm ${hint}`}>(optional)</span></h2>
              <p className="text-sm text-steel-500 mt-0.5">Shown exactly as typed. Leave blank to hide.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="pf-sqm" className={label}>Area</label>
                <input id="pf-sqm" value={draft.sqm} onChange={(e) => set("sqm", e.target.value)} placeholder="1,080 sqm" className={input} />
              </div>
              <div>
                <label htmlFor="pf-steel" className={label}>Steel</label>
                <input id="pf-steel" value={draft.steel} onChange={(e) => set("steel", e.target.value)} placeholder="6.8t G550" className={input} />
              </div>
              <div>
                <label htmlFor="pf-waste" className={label}>Waste</label>
                <input id="pf-waste" value={draft.waste} onChange={(e) => set("waste", e.target.value)} placeholder="75% less" className={input} />
              </div>
            </div>
          </section>

          <section className={card} aria-labelledby="placement-heading">
            <h2 id="placement-heading" className={cardTitle}>Where it shows</h2>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={draft.published} onChange={(e) => set("published", e.target.checked)} className="mt-0.5 w-4 h-4 accent-primary-700" />
              <span className="text-sm">
                <span className="font-medium text-steel-900">Published</span>
                <span className="block text-steel-500">On the Projects list, with its own page.</span>
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={draft.featured} onChange={(e) => set("featured", e.target.checked)} className="mt-0.5 w-4 h-4 accent-primary-700" />
              <span className="text-sm">
                <span className="font-medium text-steel-900">Featured</span>
                <span className="block text-steel-500">
                  On the homepage (the first {HOMEPAGE_SLOTS} featured). The first featured project also leads the Projects page.
                </span>
              </span>
            </label>
            <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3">
              <div>
                <label htmlFor="pf-order" className={label}>Order</label>
                <input
                  id="pf-order"
                  type="number"
                  inputMode="numeric"
                  value={Number.isFinite(draft.sortOrder) ? draft.sortOrder : ""}
                  onChange={(e) => set("sortOrder", e.target.valueAsNumber)}
                  className={input}
                />
              </div>
              <div>
                <label htmlFor="pf-slug" className={label}>Page address</label>
                <div className="flex items-center rounded-lg border border-steel-200 bg-white focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/20">
                  <span className="pl-3 text-sm text-steel-400 select-none">/projects/</span>
                  <input
                    id="pf-slug"
                    value={draft.slug}
                    onChange={(e) => set("slug", e.target.value)}
                    placeholder={slugify(draft.name) || "from-the-name"}
                    spellCheck={false}
                    autoComplete="off"
                    className="w-full min-w-0 px-1 py-2 bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-steel-500 -mt-2">Lower order numbers come first.</p>
          </section>

          {item && (
            <div className="flex items-center gap-3 px-1">
              <button
                type="button"
                onClick={remove}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 text-sm text-red-700 hover:text-red-800 disabled:opacity-60 transition-colors"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                {deleting ? "Deleting…" : "Delete project"}
              </button>
            </div>
          )}
        </form>

        <div className="xl:sticky xl:top-32 xl:h-[calc(100vh-9rem)] h-[80vh] flex flex-col">
          <PreviewPane item={entry} others={others} view={view} onViewChange={setView} notice={notice} />
        </div>
      </div>
    </div>
  );
}
