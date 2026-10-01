import Link from "next/link";
import { getAllPortfolio } from "@/lib/portfolio";
import { deletePortfolioItem } from "@/lib/admin/portfolio-actions";
import { TAG_LABEL } from "@/lib/portfolio-constants";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { ExternalLink, Plus, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortfolioAdmin() {
  const items = await getAllPortfolio();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-steel-900">Portfolio</h1>
          <p className="text-steel-600 mt-1">
            What visitors see on the Projects page and the homepage. Changes go live on save.
          </p>
        </div>
        <Link
          href="/projects"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
        >
          View public page
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <section className="bg-white rounded-2xl border border-steel-200 p-6">
        <h2 className="flex items-center gap-2 font-display font-semibold text-steel-900 mb-4">
          <Plus className="w-4 h-4 text-primary-700" aria-hidden="true" />
          Add a project
        </h2>
        <PortfolioForm />
      </section>

      <section className="space-y-3">
        <h2 className="font-display font-semibold text-steel-900">
          {items.length} {items.length === 1 ? "entry" : "entries"}
        </h2>

        {items.length === 0 && (
          <p className="text-steel-500 py-8 text-center bg-white rounded-2xl border border-steel-200">
            Nothing yet. Add a project above, or run <code>pnpm portfolio:seed</code>.
          </p>
        )}

        {items.map((item) => (
          <details key={item.id} className="group bg-white rounded-2xl border border-steel-200">
            <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
              <span className="text-xs tabular text-steel-400 w-6 text-right">{item.sortOrder}</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-steel-900 truncate">{item.name}</p>
                <p className="text-sm text-steel-500 truncate">{item.location}</p>
              </div>
              <span className="hidden sm:block text-xs text-steel-600 px-2 py-0.5 rounded-lg border border-steel-200">
                {TAG_LABEL[item.tag]}
              </span>
              {item.featured && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-primary-50 text-primary-800 border border-primary-200">
                  Featured
                </span>
              )}
              {!item.published && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-steel-100 text-steel-600 border border-steel-200">
                  Hidden
                </span>
              )}
              <span className="text-sm text-primary-700 group-open:hidden">Edit</span>
              <span className="text-sm text-primary-700 hidden group-open:inline">Close</span>
            </summary>
            <div className="border-t border-steel-100 p-4 space-y-4">
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
                  To take it off the site but keep it, untick Published instead.
                </span>
              </form>
            </div>
          </details>
        ))}
      </section>
    </div>
  );
}
