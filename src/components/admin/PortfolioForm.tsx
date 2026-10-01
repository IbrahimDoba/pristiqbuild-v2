"use client";

import { useActionState } from "react";
import { savePortfolioItem, type PortfolioResult } from "@/lib/admin/portfolio-actions";
import { TAGS, TAG_LABEL, type PortfolioEntry } from "@/lib/portfolio-constants";
import { AlertCircle, CheckCircle } from "lucide-react";

/** Add form when `item` is absent, edit form when it is given. */
export default function PortfolioForm({ item }: { item?: PortfolioEntry }) {
  const [state, action, pending] = useActionState<PortfolioResult | null, FormData>(
    savePortfolioItem,
    null
  );
  const cls =
    "w-full px-3 py-2 rounded-lg border border-steel-200 bg-white text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20";
  const label = "block text-sm font-medium text-steel-700 mb-1.5";
  // Unique ids per form, since several edit forms share the page.
  const p = item?.id ?? "new";

  return (
    <form action={action} className="space-y-4">
      {item && <input type="hidden" name="id" value={item.id} />}

      {state?.ok === false && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-700">
          <AlertCircle className="w-4 h-4" aria-hidden="true" /> {state.error}
        </p>
      )}
      {state?.ok === true && (
        <p role="status" className="flex items-center gap-2 text-sm text-green-700">
          <CheckCircle className="w-4 h-4" aria-hidden="true" /> Saved. The public pages are updated.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-2">
          <label htmlFor={`${p}-name`} className={label}>Name</label>
          <input id={`${p}-name`} name="name" required defaultValue={item?.name} placeholder="Akure Residence…" className={cls} />
        </div>
        <div>
          <label htmlFor={`${p}-location`} className={label}>Location</label>
          <input id={`${p}-location`} name="location" required defaultValue={item?.location} placeholder="Akure, Ondo State…" className={cls} />
        </div>
        <div>
          <label htmlFor={`${p}-tag`} className={label}>Tag</label>
          <select id={`${p}-tag`} name="tag" defaultValue={item?.tag ?? "LGS_ROOFING"} className={cls}>
            {TAGS.map((t) => (
              <option key={t} value={t}>{TAG_LABEL[t]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${p}-desc`} className={label}>Description</label>
        <textarea id={`${p}-desc`} name="desc" required rows={2} defaultValue={item?.desc} placeholder="One or two sentences, shown on cards…" className={`${cls} resize-y`} />
      </div>

      <div>
        <label htmlFor={`${p}-body`} className={label}>Full write-up <span className="font-normal text-steel-400">(optional, shown on the project&apos;s own page; leave a blank line between paragraphs)</span></label>
        <textarea id={`${p}-body`} name="body" rows={5} defaultValue={item?.body ?? ""} className={`${cls} resize-y`} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div>
          <label htmlFor={`${p}-sqm`} className={label}>Area <span className="font-normal text-steel-400">(optional)</span></label>
          <input id={`${p}-sqm`} name="sqm" defaultValue={item?.sqm ?? ""} placeholder="1,080 sqm" className={cls} />
        </div>
        <div>
          <label htmlFor={`${p}-steel`} className={label}>Steel <span className="font-normal text-steel-400">(optional)</span></label>
          <input id={`${p}-steel`} name="steel" defaultValue={item?.steel ?? ""} placeholder="6.8t G550" className={cls} />
        </div>
        <div>
          <label htmlFor={`${p}-waste`} className={label}>Waste <span className="font-normal text-steel-400">(optional)</span></label>
          <input id={`${p}-waste`} name="waste" defaultValue={item?.waste ?? ""} placeholder="75% less vs timber" className={cls} />
        </div>
        <div>
          <label htmlFor={`${p}-slug`} className={label}>Page address</label>
          <div className="flex items-center rounded-lg border border-steel-200 bg-white focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/20">
            <span className="pl-3 text-sm text-steel-400 select-none">/projects/</span>
            <input id={`${p}-slug`} name="slug" defaultValue={item?.slug ?? ""} placeholder="from the name" spellCheck={false} autoComplete="off" className="w-full min-w-0 px-1 py-2 bg-transparent text-sm outline-none" />
          </div>
        </div>
        <div>
          <label htmlFor={`${p}-sort`} className={label}>Order</label>
          <input id={`${p}-sort`} name="sortOrder" type="number" inputMode="numeric" defaultValue={item?.sortOrder ?? 0} className={cls} />
        </div>
      </div>

      <div>
        <label htmlFor={`${p}-image`} className={label}>Photo path <span className="font-normal text-steel-400">(optional: a file in public/, or an https:// link)</span></label>
        <input id={`${p}-image`} name="image" defaultValue={item?.image ?? ""} placeholder="/LGS/1752987831787.jpeg" spellCheck={false} className={cls} />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="inline-flex items-center gap-2 text-sm text-steel-700">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="w-4 h-4 accent-primary-700" />
          Published
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-steel-700">
          <input type="checkbox" name="featured" defaultChecked={item?.featured ?? false} className="w-4 h-4 accent-primary-700" />
          Featured on homepage
        </label>
        <button
          type="submit"
          disabled={pending}
          className="ml-auto px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 disabled:opacity-70 active:translate-y-px transition-[background-color,transform]"
        >
          {pending ? "Saving…" : item ? "Save changes" : "Add project"}
        </button>
      </div>
    </form>
  );
}
