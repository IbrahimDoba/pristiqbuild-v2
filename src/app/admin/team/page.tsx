import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { ROLES, ASSIGNABLE_ROLES } from "@/lib/admin/permissions";
import { setRole, setActive } from "@/lib/admin/team-actions";
import InviteForm from "@/components/admin/InviteForm";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const session = await auth();
  const members = await getDb().user.findMany({
    orderBy: [{ isActive: "desc" }, { createdAt: "asc" }],
    select: {
      id: true, email: true, name: true, role: true,
      isActive: true, lastLoginAt: true, createdAt: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl text-steel-900">Team</h1>
        <p className="text-steel-600 mt-1">
          Who has access, and what each role can reach.
        </p>
      </div>

      <InviteForm />

      <section className="bg-white rounded-2xl border border-steel-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-steel-50 border-b border-steel-200 text-left">
                {["Member", "Role", "Last signed in", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-2.5 font-medium text-xs uppercase tracking-wider text-steel-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-100">
              {members.map((m) => {
                const isMe = m.id === session?.user?.id;
                return (
                  <tr key={m.id} className={m.isActive ? "" : "bg-steel-50/60"}>
                    <td className="px-4 py-3">
                      <span className="font-medium text-steel-900">
                        {m.name ?? m.email}
                        {isMe && <span className="ml-2 text-xs text-steel-400">you</span>}
                      </span>
                      <span className="block text-xs text-steel-500">{m.email}</span>
                    </td>

                    <td className="px-4 py-3">
                      {isMe ? (
                        // Changing your own role is how the last owner locks
                        // everyone out of team management.
                        <span className="text-steel-600">{ROLES[m.role].label}</span>
                      ) : (
                        <form action={setRole.bind(null, m.id)}>
                          <select
                            name="role"
                            defaultValue={m.role}
                            aria-label={`Role for ${m.email}`}
                            className="px-2 py-1 rounded-lg border border-steel-200 bg-white text-sm"
                          >
                            {ASSIGNABLE_ROLES.map((r) => (
                              <option key={r} value={r}>{ROLES[r].label}</option>
                            ))}
                          </select>
                          <button type="submit" className="ml-2 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors">
                            Save
                          </button>
                        </form>
                      )}
                    </td>

                    <td className="px-4 py-3 text-steel-500 tabular whitespace-nowrap">
                      {m.lastLoginAt
                        ? m.lastLoginAt.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })
                        : "never"}
                    </td>

                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-lg border text-xs font-medium ${
                        m.isActive
                          ? "bg-green-50 text-green-800 border-green-200"
                          : "bg-steel-100 text-steel-500 border-steel-200"
                      }`}>
                        {m.isActive ? "Active" : "Deactivated"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      {!isMe && (
                        <form action={setActive.bind(null, m.id, !m.isActive)}>
                          <button type="submit" className="text-xs font-semibold text-steel-600 hover:text-primary-700 transition-colors">
                            {m.isActive ? "Deactivate" : "Reactivate"}
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-steel-200 p-6">
        <h2 className="font-display font-semibold text-steel-900 mb-4">What each role can reach</h2>
        <dl className="grid sm:grid-cols-2 gap-5 m-0">
          {ASSIGNABLE_ROLES.map((r) => (
            <div key={r}>
              <dt className="font-medium text-steel-900">{ROLES[r].label}</dt>
              <dd className="text-sm text-steel-600 m-0 mt-1">{ROLES[r].description}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
