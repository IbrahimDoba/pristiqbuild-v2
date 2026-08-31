import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getLead, STAGES, STAGE_LABEL, SOURCE_LABEL, BUDGET_LABEL } from "@/lib/admin/leads";
import { setLeadStage, claimLead, releaseLead, addNote } from "@/lib/admin/actions";
import { ArrowLeft, Mail, Phone, MapPin, Calculator } from "lucide-react";

export const dynamic = "force-dynamic";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency", currency: "NGN", maximumFractionDigits: 0,
});

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead, session] = await Promise.all([getLead(id), auth()]);
  if (!lead) notFound();

  const payload = lead.payload as Record<string, unknown> | null;
  const calc = payload?.calculator as Record<string, number | boolean> | undefined;
  const isMine = lead.ownerId === session?.user?.id;

  return (
    <div className="space-y-6">
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm text-steel-600 hover:text-primary-700 transition-colors">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        All leads
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-2xl border border-steel-200 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div>
                <h1 className="font-display font-bold text-2xl text-steel-900">{lead.name}</h1>
                <p className="text-sm text-steel-500 mt-1">
                  {SOURCE_LABEL[lead.source]} ·{" "}
                  <time dateTime={lead.createdAt.toISOString()}>
                    {lead.createdAt.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}
                  </time>
                </p>
              </div>
            </div>

            <dl className="grid sm:grid-cols-2 gap-4">
              {lead.email && (
                <Field icon={<Mail className="w-4 h-4" />} label="Email">
                  <a href={`mailto:${lead.email}`} className="text-primary-700 hover:text-primary-800 transition-colors break-all">
                    {lead.email}
                  </a>
                </Field>
              )}
              {lead.phone && (
                <Field icon={<Phone className="w-4 h-4" />} label="Phone">
                  <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="text-primary-700 hover:text-primary-800 transition-colors">
                    {lead.phone}
                  </a>
                </Field>
              )}
              {lead.location && <Field icon={<MapPin className="w-4 h-4" />} label="Location">{lead.location}</Field>}
              {lead.projectType && <Field label="Project type">{lead.projectType}</Field>}
              {lead.budgetBand && <Field label="Budget">{BUDGET_LABEL[lead.budgetBand] ?? lead.budgetBand}</Field>}
            </dl>

            {lead.message && (
              <div className="mt-6 pt-6 border-t border-steel-100">
                <h2 className="text-xs uppercase tracking-wider text-steel-500 mb-2">Message</h2>
                <p className="text-steel-800 whitespace-pre-wrap break-words">{lead.message}</p>
              </div>
            )}
          </section>

          {calc && (
            <section className="bg-white rounded-2xl border border-steel-200 p-6">
              <h2 className="flex items-center gap-2 font-display font-semibold text-steel-900 mb-4">
                <Calculator className="w-4 h-4 text-primary-700" aria-hidden="true" />
                What they calculated
              </h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Field label="Building size">{String(calc.buildingSize)} sqm</Field>
                <Field label="Floors">{String(calc.floors)}</Field>
                <Field label="Smart features">{calc.smartFeatures ? "Yes" : "No"}</Field>
                <Field label="Solar power">{calc.solarPower ? "Yes" : "No"}</Field>
                <Field label="Estimate shown">{naira.format(Number(calc.estimate))}</Field>
              </dl>
            </section>
          )}

          <section className="bg-white rounded-2xl border border-steel-200 p-6">
            <h2 className="font-display font-semibold text-steel-900 mb-4">
              Notes {lead.notes.length > 0 && <span className="text-steel-400 tabular">({lead.notes.length})</span>}
            </h2>

            <form action={addNote.bind(null, lead.id)} className="mb-5">
              <label htmlFor="body" className="sr-only">Add a note</label>
              <textarea
                id="body" name="body" rows={3} required
                placeholder="What happened on this lead…"
                className="w-full px-4 py-3 rounded-lg border border-steel-200 text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 resize-y"
              />
              <button type="submit" className="mt-3 px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 active:translate-y-px transition-[background-color,transform]">
                Add note
              </button>
            </form>

            {lead.notes.length === 0 ? (
              <p className="text-sm text-steel-500">No notes yet.</p>
            ) : (
              <ul className="space-y-4 list-none p-0 m-0">
                {lead.notes.map((note) => (
                  <li key={note.id} className="border-l-2 border-steel-200 pl-4">
                    <p className="text-steel-800 whitespace-pre-wrap break-words">{note.body}</p>
                    <p className="text-xs text-steel-400 mt-1">
                      {note.author.name ?? note.author.email} ·{" "}
                      <time dateTime={note.createdAt.toISOString()}>
                        {note.createdAt.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}
                      </time>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-white rounded-2xl border border-steel-200 p-6">
            <h2 className="text-xs uppercase tracking-wider text-steel-500 mb-3">Stage</h2>
            <div className="space-y-2">
              {STAGES.map((stage) => (
                <form key={stage} action={setLeadStage.bind(null, lead.id, stage)}>
                  <button
                    type="submit"
                    aria-current={lead.stage === stage ? "true" : undefined}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      lead.stage === stage
                        ? "bg-primary-700 text-white"
                        : "border border-steel-200 text-steel-700 hover:border-primary-400 hover:text-primary-700"
                    }`}
                  >
                    {STAGE_LABEL[stage]}
                  </button>
                </form>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-steel-200 p-6">
            <h2 className="text-xs uppercase tracking-wider text-steel-500 mb-3">Owner</h2>
            <p className="text-steel-800 mb-3">
              {lead.owner ? (lead.owner.name ?? lead.owner.email) : <span className="text-steel-400">Unassigned</span>}
            </p>
            <form action={isMine ? releaseLead.bind(null, lead.id) : claimLead.bind(null, lead.id)}>
              <button type="submit" className="w-full px-3 py-2 rounded-lg border border-steel-200 text-sm font-medium text-steel-700 hover:border-primary-400 hover:text-primary-700 transition-colors">
                {isMine ? "Release" : "Assign to me"}
              </button>
            </form>
          </section>

          <section className="bg-white rounded-2xl border border-steel-200 p-6">
            <h2 className="text-xs uppercase tracking-wider text-steel-500 mb-3">Delivery</h2>
            <p className="text-sm text-steel-700">
              {lead.notifiedAt ? (
                <>Emailed <time dateTime={lead.notifiedAt.toISOString()}>{lead.notifiedAt.toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" })}</time></>
              ) : (
                <span className="text-amber-700">Not emailed. Saved safely, but nobody was notified.</span>
              )}
            </p>
            {typeof payload?.referrer === "string" && (
              <p className="text-xs text-steel-400 mt-3 break-all">Came from {payload.referrer}</p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon?: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-steel-500 mb-1">
        {icon}{label}
      </dt>
      <dd className="text-steel-800 m-0">{children}</dd>
    </div>
  );
}
