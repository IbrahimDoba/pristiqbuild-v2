import Link from "next/link";
import { getAllPortfolio } from "@/lib/portfolio";
import { deletePortfolioItem, setPortfolioFlag } from "@/lib/admin/portfolio-actions";
import { TAG_LABEL, projectHref } from "@/lib/portfolio-constants";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { ExternalLink, Plus, Star, Eye, EyeOff, Trash2 } from "lucide-react";

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
            Every published project is listed on the Projects page and gets its own page.
            Featured ones form the homepage strip, in order; the first is also the case
            study at the top of Projects. Changes go live on save.
          </p>
        </div>
        <Link
          href="/projects"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
        >
          View Projects page
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <details className="bg-white rounded-2xl border border-steel-200" open={items.length === 0}>
        <summary className="flex items-center gap-2 p-6 cursor-pointer font-display font-semibold text-steel-900">
          <Plus className="w-4 h-4 text-primary-700" aria-hidden="true" />
          Add a project
        </summary>
        <div className="px-6 pb-6">
          <PortfolioForm />
        </div>
      </details>

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
          <p className="text-steel-500 py-8 text-center bg-white rounded-2xl border border-steel-200">
            Nothing yet. Add a project above, or run <code>pnpm portfolio:seed</code>.
          </p>
        )}

        {items.map((item) => (
          <article key={item.id} className="bg-white rounded-2xl border border-steel-200">
            <div className="flex flex-wrap items-center gap-3 p-4">
              <span className="text-xs tabular text-steel-400 w-8 text-right" title="Sort order">
                {item.sortOrder}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-steel-900 truncate">{item.name}</p>
                <p className="text-sm text-steel-500 truncate">
                  {item.location} · {TAG_LABEL[item.tag]}
                </p>
              </div>

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

              <form
                action={async () => {
                  "use server";
                  await setPortfolioFlag(item.id, "published", !item.published);
                }}
              >
                <button
                  type="submit"
                  aria-pressed={item.published}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                    item.published
                      ? "text-green-800 bg-green-50 border-green-200"
                      : "text-steel-600 bg-steel-100 border-steel-200"
                  }`}
                >
                  {item.published ? (
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  {item.published ? "Live" : "Hidden"}
                </button>
              </form>

              {item.published && (
                <Link
                  href={projectHref(item.slug)}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs text-primary-700 hover:text-primary-800"
                >
                  View page
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>

            <details className="group border-t border-steel-100">
              <summary className="px-4 py-2.5 text-sm text-primary-700 cursor-pointer">
                <span className="group-open:hidden">Edit details</span>
                <span className="hidden group-open:inline">Close</span>
              </summary>
              <div className="p-4 pt-0 space-y-4">
                <PortfolioForm item={item} />
                <form
                  action={async () => {
                    "use server";
                    await deletePortfolioItem(item.id);
                  }}
                  className="border-t border-steel-100 pt-4"
                >
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 text-sm text-red-700 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    Delete permanently
                  </button>
                  <span className="ml-3 text-xs text-steel-500">
                    To take it off the site but keep it, use Hidden instead.
                  </span>
                </form>
              </div>
            </details>
          </article>
        ))}
      </section>
    </div>
  );
}
