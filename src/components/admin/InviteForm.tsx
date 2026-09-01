"use client";

import { useActionState } from "react";
import { inviteMember, type InviteResult } from "@/lib/admin/team-actions";
import { ROLES, ASSIGNABLE_ROLES } from "@/lib/admin/permissions";
import { UserPlus, AlertCircle, KeyRound } from "lucide-react";

/**
 * Adds a team member.
 *
 * The generated password is shown once, here, because there is no email
 * transport yet to send an invite link. When one exists this should become a
 * real invitation and stop putting a password on screen.
 */
export default function InviteForm() {
  const [result, action, pending] = useActionState<InviteResult | null, FormData>(
    inviteMember,
    null
  );

  return (
    <section className="bg-white rounded-2xl border border-steel-200 p-6">
      <h2 className="flex items-center gap-2 font-display font-semibold text-steel-900 mb-4">
        <UserPlus className="w-4 h-4 text-primary-700" aria-hidden="true" />
        Add a member
      </h2>

      {result?.ok === false && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 mb-4 text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm">{result.error}</p>
        </div>
      )}

      {result?.ok === true && (
        <div role="status" className="rounded-lg border border-primary-200 bg-primary-50 p-4 mb-4">
          <p className="flex items-center gap-2 font-semibold text-primary-900">
            <KeyRound className="w-4 h-4" aria-hidden="true" />
            {result.reset ? "Password reset for" : "Added"} {result.email}
          </p>
          <p className="text-sm text-primary-800 mt-2">
            Give them this password. It is shown once and cannot be recovered.
          </p>
          <code className="block mt-2 px-3 py-2 rounded-lg bg-white border border-primary-200 font-mono text-sm text-steel-900 break-all">
            {result.password}
          </code>
        </div>
      )}

      <form action={action} className="grid sm:grid-cols-[1fr_1fr_auto_auto] gap-3 items-end">
        <div>
          <label htmlFor="invite-email" className="block text-sm font-medium text-steel-700 mb-1.5">
            Email
          </label>
          <input
            id="invite-email" name="email" type="email" required
            autoComplete="off" spellCheck={false}
            className="w-full px-3 py-2 rounded-lg border border-steel-200 text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
          />
        </div>

        <div>
          <label htmlFor="invite-name" className="block text-sm font-medium text-steel-700 mb-1.5">
            Name
          </label>
          <input
            id="invite-name" name="name" type="text" autoComplete="off"
            className="w-full px-3 py-2 rounded-lg border border-steel-200 text-sm outline-none transition-colors focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
          />
        </div>

        <div>
          <label htmlFor="invite-role" className="block text-sm font-medium text-steel-700 mb-1.5">
            Role
          </label>
          <select
            id="invite-role" name="role" defaultValue="MANAGER"
            className="px-3 py-2 rounded-lg border border-steel-200 bg-white text-sm"
          >
            {ASSIGNABLE_ROLES.map((r) => (
              <option key={r} value={r}>{ROLES[r].label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 rounded-lg bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 disabled:opacity-70 active:translate-y-px transition-[background-color,transform]"
        >
          {pending ? "Adding…" : "Add"}
        </button>
      </form>
    </section>
  );
}
