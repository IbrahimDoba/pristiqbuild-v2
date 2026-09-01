"use client";

import { useActionState } from "react";
import { createProject, type ProjectResult } from "@/lib/admin/finance-actions";
import { STATUS_LABEL, STATUSES } from "@/lib/admin/finance-constants";
import { Plus, AlertCircle } from "lucide-react";

export default function NewProjectForm() {
  const [state, action, pending] = useActionState<ProjectResult | null, FormData>(createProject, null);
  const cls = "w-full px-3 py-2 rounded-lg border border-steel-200 bg-white text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20";

  return (
    <section className="bg-white rounded-2xl border border-steel-200 p-6">
      <h2 className="flex items-center gap-2 font-display font-semibold text-steel-900 mb-4">
        <Plus className="w-4 h-4 text-primary-700" aria-hidden="true" />
        Add a project
      </h2>

      {state?.ok === false && (
        <p role="alert" className="flex items-center gap-2 text-sm text-red-700 mb-3">
          <AlertCircle className="w-4 h-4" aria-hidden="true" /> {state.error}
        </p>
      )}

      <form action={action} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        <div className="lg:col-span-2">
          <label htmlFor="p-name" className="block text-sm font-medium text-steel-700 mb-1.5">Name</label>
          <input id="p-name" name="name" required placeholder="Idu Residence" className={cls} />
        </div>
        <div>
          <label htmlFor="p-client" className="block text-sm font-medium text-steel-700 mb-1.5">Client</label>
          <input id="p-client" name="client" className={cls} />
        </div>
        <div>
          <label htmlFor="p-budget" className="block text-sm font-medium text-steel-700 mb-1.5">Budget (₦)</label>
          <input id="p-budget" name="budget" inputMode="decimal" placeholder="45000000" className={cls} />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="p-status" className="block text-sm font-medium text-steel-700 mb-1.5">Status</label>
            <select id="p-status" name="status" defaultValue="ACTIVE" className={cls}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={pending} className="self-end px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 disabled:opacity-70 active:translate-y-px transition-[background-color,transform]">
            {pending ? "Adding…" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
