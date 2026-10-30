import Image from "next/image";
import Link from "next/link";
import { getAllPortfolio } from "@/lib/portfolio";
import { setPortfolioFlag } from "@/lib/admin/portfolio-actions";
import { TAG_LABEL, isRemoteImage, projectHref } from "@/lib/portfolio-constants";
import { PhotoPlaceholder } from "@/components/PortfolioGrid";
import { ExternalLink, Plus, Star, Eye, EyeOff, Images } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortfolioAdmin() {
  const items = await getAllPortfolio();
  const featuredCount = items.filter((i) => i.featured && i.published).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-steel-900">Portfolio</h1>
          <p className="text-steel-600 mt-1 max-w-2xl">
            Upload photos, write it up, and see it on the site as you type. Published
            projects are on the Projects page with their own page; featured ones form
            the homepage strip, in order. Changes go live on save.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            View Projects page
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            New project
          </Link>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display font-semibold text-steel-900">
            {items.length} {items.length === 1 ? "project" : "projects"}
          </h2>
          <p className="text-sm text-steel-500">
            {featuredCount} featured on the homepage
            {featuredCount > 3 && " (the homepage shows the first 3)"}
          </p>
        </div>

        {items.length === 0 && (
          <div className="py-12 text-center bg-white rounded-2xl border border-steel-200">
            <p className="text-steel-600 mb-4">No projects yet.</p>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Add the first one
            </Link>
          </div>
        )}

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          {items.map((item) => {
            const photoCount = (item.image ? 1 : 0) + item.gallery.length;
            return (
              <li key={item.id} className="flex flex-col bg-white rounded-2xl border border-steel-200 overflow-hidden">
                <Link href={`/admin/portfolio/${item.id}`} className="group block">
                  <div className="relative aspect-[16/10] bg-steel-100 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25rem"
                        unoptimized={isRemoteImage(item.image)}
                        className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${item.published ? "" : "grayscale opacity-70"}`}
                      />
                    ) : (
                      <PhotoPlaceholder label={item.name} />
                    )}
                    {photoCount > 1 && (
                      <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-xs text-white tabular">
                        <Images className="w-3.5 h-3.5" aria-hidden="true" />
                        {photoCount}
                      </span>
                    )}
                  </div>
                  <div className="p-4 pb-2">
                    <p className="font-medium text-steel-900 truncate group-hover:text-primary-700 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-sm text-steel-500 truncate">
                      {item.location} · {TAG_LABEL[item.tag]}
                    </p>
                  </div>
                </Link>

                <div className="mt-auto flex flex-wrap items-center gap-2 px-4 pb-4 pt-2">
                  <form
                    action={async () => {
                      "use server";
                      await setPortfolioFlag(item.id, "published", !item.published);
                    }}
                  >
                    <button
                      type="submit"
                      aria-pressed={item.published}
                      title={item.published ? "Visible on the site. Click to hide." : "Hidden from the site. Click to publish."}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                        item.published
                          ? "text-green-800 bg-green-50 border-green-200"
                          : "text-steel-600 bg-steel-100 border-steel-200"
                      }`}
                    >
                      {item.published ? <Eye className="w-3.5 h-3.5" aria-hidden="true" /> : <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />}
                      {item.published ? "Live" : "Hidden"}
                    </button>
                  </form>

                  <form
                    action={async () => {
                      "use server";
                      await setPortfolioFlag(item.id, "featured", !item.featured);
                    }}
                  >
                    <button
                      type="submit"
                      aria-pressed={item.featured}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                        item.featured
                          ? "bg-primary-50 text-primary-800 border-primary-200"
                          : "text-steel-500 border-steel-200 hover:border-primary-300"
                      }`}
                    >
                      <Star className="w-3.5 h-3.5" fill={item.featured ? "currentColor" : "none"} aria-hidden="true" />
                      {item.featured ? "Featured" : "Feature"}
                    </button>
                  </form>

                  <span className="text-xs tabular text-steel-400" title="Order: lower comes first">
                    #{item.sortOrder}
                  </span>

                  {item.published && (
                    <Link
                      href={projectHref(item.slug)}
                      target="_blank"
                      className="ml-auto inline-flex items-center gap-1 text-xs text-primary-700 hover:text-primary-800"
                    >
                      View live
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
