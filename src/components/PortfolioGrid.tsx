"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { TAGS, TAG_LABEL, isRemoteImage, projectHref, type PortfolioEntry } from "@/lib/portfolio-constants";
import type { PortfolioTag } from "@/generated/prisma/client";

/** Diagonal hairlines where a real photo will go. */
export function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`${label}: photo coming soon`}
      className="absolute inset-0 bg-silver/40"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 14px, rgb(36 89 122 / 0.14) 14px 15px)",
      }}
    />
  );
}

export function TagChip({ tag }: { tag: PortfolioTag }) {
  // Oxide marks work that is not built yet; everything else stays steel.
  const tone =
    tag === "IN_DEVELOPMENT"
      ? "border-oxide/40 text-oxide"
      : "border-primary-700/30 text-primary-800";
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider border rounded ${tone}`}>
      {TAG_LABEL[tag]}
    </span>
  );
}

export default function PortfolioGrid({ items }: { items: PortfolioEntry[] }) {
  const [filter, setFilter] = useState<PortfolioTag | "ALL">("ALL");
  const present = TAGS.filter((t) => items.some((i) => i.tag === t));
  const shown = filter === "ALL" ? items : items.filter((i) => i.tag === filter);

  return (
    <>
      {present.length > 1 && (
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 mb-8">
          {(["ALL", ...present] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={filter === t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                filter === t
                  ? "bg-primary-700 border-primary-700 text-white"
                  : "border-steel-300 text-steel-700 hover:border-primary-600"
              }`}
            >
              {t === "ALL" ? "All" : TAG_LABEL[t]}
            </button>
          ))}
        </div>
      )}

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-steel-200 border border-steel-200 list-none p-0 m-0">
        {shown.map((item) => {
          const body = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={isRemoteImage(item.image)}
                    className="object-cover"
                  />
                ) : (
                  <PhotoPlaceholder label={item.name} />
                )}
              </div>
              <div className="p-6">
                <TagChip tag={item.tag} />
                <h3 className="font-display font-bold text-xl text-steel-900 mt-3 mb-1 flex items-start justify-between gap-3">
                  {item.name}
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-primary-700" aria-hidden="true" />
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-steel-500 mb-3">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  {item.location}
                </p>
                <p className="text-steel-700 text-sm leading-relaxed">{item.desc}</p>
                {(item.sqm || item.steel || item.waste) && (
                  <p className="mt-4 text-sm font-medium text-steel-900 tabular">
                    {[item.sqm, item.steel, item.waste].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </>
          );
          return (
            <li key={item.id} className="bg-white">
              <Link href={projectHref(item.slug)} className="block h-full hover:bg-steel-50 transition-colors">
                {body}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
