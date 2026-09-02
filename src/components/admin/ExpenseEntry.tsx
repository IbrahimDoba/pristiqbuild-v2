"use client";

import { useActionState, useState } from "react";
import { addExpense, draftExpense, type ExpenseResult, type DraftResult } from "@/lib/admin/finance-actions";
import { CATEGORY_LABEL, CATEGORIES } from "@/lib/admin/finance-constants";
import { Sparkles, AlertCircle, CheckCircle2, Info } from "lucide-react";

type Project = { id: string; name: string };

/**
 * Expense entry, with an optional assist.
 *
 * The assistant only ever fills this form in. Nothing reaches the database
 * until someone presses Save, and anything it inferred rather than read is
 * listed above the fields so it can be checked rather than trusted.
 */
export default function ExpenseEntry({
  projects,
  aiAvailable,
}: {
  projects: Project[];
  aiAvailable: boolean;
}) {
  const [draftState, runDraft, drafting] = useActionState<DraftResult | null, FormData>(draftExpense, null);
  const [saveState, runSave, saving] = useActionState<ExpenseResult | null, FormData>(addExpense, null);

  const today = new Date().toISOString().slice(0, 10);
  const [sourceText, setSourceText] = useState("");

  const draft = draftState?.ok ? draftState.draft : null;

  // The fields are uncontrolled, seeded from the draft. Copying the draft into
  // state inside an effect is the obvious approach and the wrong one: React 19
  // flags setState during an effect, and it renders once with stale values
  // before correcting itself. Remounting the form with a key derived from the
  // draft applies new values in a single pass, and a successful save clears it.
  const formKey = [
    draft ? JSON.stringify(draft) : "no-draft",
    draftState?.ok ? draftState.matchedProjectId ?? "" : "",
    saveState?.ok ? "saved" : "editing",
  ].join("|");

  const initial = {
    projectId: (draftState?.ok && draftState.matchedProjectId) || "",
    amount: draft?.amount != null ? String(draft.amount) : "",
    category: draft?.category ?? "",
    vendor: draft?.vendor ?? "",
    description: draft?.description ?? "",
    spentAt: draft?.spentAtISO ?? today,
  };

  return (
    <section className="bg-white rounded-2xl border border-steel-200 p-6">
      <h2 className="font-display font-semibold text-steel-900 mb-4">Record an expense</h2>

      {aiAvailable && (
        <form action={runDraft} className="mb-5">
          <label htmlFor="sentence" className="block text-sm font-medium text-steel-700 mb-1.5">
            Describe it, and the fields below fill in
          </label>
          <div className="flex gap-2">
            <input
              id="sentence" name="sentence" type="text"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Paid 600,000 for roofing materials at Idu Residence yesterday"
              className="flex-1 px-3 py-2 rounded-lg border border-steel-200 text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
            <button
              type="submit" disabled={drafting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary-300 bg-primary-50 text-primary-800 text-sm font-semibold hover:bg-primary-100 disabled:opacity-70 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              {drafting ? "Reading…" : "Fill in"}
            </button>
          </div>

          {draftState?.ok === false && (
            <p role="alert" className="mt-2 text-sm text-amber-800">{draftState.error}</p>
          )}

          {draftState?.ok === true && (
            <div role="status" className="mt-3 rounded-lg border border-primary-200 bg-primary-50 p-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary-900">
                <Info className="w-4 h-4" aria-hidden="true" />
                Filled in. Check it before saving.
                <span className="font-normal text-primary-700">
                  Confidence: {draftState.draft.confidence}
                </span>
              </p>
              {draftState.draft.projectName && !draftState.matchedProjectId && (
                <p className="text-sm text-amber-800 mt-1.5">
                  No single project matched &ldquo;{draftState.draft.projectName}&rdquo;. Choose one below.
                </p>
              )}
              {draftState.draft.uncertainties.length > 0 && (
                <ul className="mt-2 text-sm text-primary-800 list-disc pl-5 space-y-0.5">
                  {draftState.draft.uncertainties.map((u, i) => <li key={i}>{u}</li>)}
                </ul>
              )}
            </div>
          )}
        </form>
      )}

      <form action={runSave} className="grid sm:grid-cols-2 gap-4">
        <input type="hidden" name="sourceText" value={draftState?.ok ? sourceText : ""} />

        {/*
          The key sits on the fields, never on the form.

          Remounting is how a new draft, or a successful save, resets these
          inputs in a single pass. Putting the key on the <form> would do that
          too, but it would also tear down the element mid-submission and take
          the in-flight action state with it. `contents` keeps the wrapper out
          of the grid layout.
        */}
        <div key={formKey} className="contents">

        <Field label="Project" htmlFor="projectId">
          <select id="projectId" name="projectId" required defaultValue={initial.projectId} className={inputCls}>
            <option value="">Select…</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </Field>

        <Field label="Amount (₦)" htmlFor="amount">
          <input id="amount" name="amount" inputMode="decimal" required defaultValue={initial.amount} placeholder="600000" className={inputCls} />
        </Field>

        <Field label="Category" htmlFor="category">
          <select id="category" name="category" required defaultValue={initial.category} className={inputCls}>
            <option value="">Select…</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>)}
          </select>
        </Field>

        <Field label="Date spent" htmlFor="spentAt">
          <input id="spentAt" name="spentAt" type="date" required defaultValue={initial.spentAt} className={inputCls} />
        </Field>

        <Field label="Vendor (optional)" htmlFor="vendor">
          <input id="vendor" name="vendor" defaultValue={initial.vendor} className={inputCls} />
        </Field>

        <Field label="What it was for" htmlFor="description">
          <input id="description" name="description" required defaultValue={initial.description} className={inputCls} />
        </Field>
        </div>

        <div className="sm:col-span-2 flex items-center gap-4">
          <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 disabled:opacity-70 active:translate-y-px transition-[background-color,transform]">
            {saving ? "Saving…" : "Save expense"}
          </button>

          {saveState?.ok === true && (
            <p role="status" className="flex items-center gap-1.5 text-sm text-green-700">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Saved
            </p>
          )}
          {saveState?.ok === false && (
            <p role="alert" className="flex items-center gap-1.5 text-sm text-red-700">
              <AlertCircle className="w-4 h-4" aria-hidden="true" /> {saveState.error}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-steel-200 bg-white text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-steel-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
