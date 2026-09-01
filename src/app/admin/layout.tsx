import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { LayoutDashboard, Inbox, LogOut, FolderKanban, Wallet, Users } from "lucide-react";
import { sectionsFor, ROLES } from "@/lib/admin/permissions";

export const metadata: Metadata = {
  title: "Admin | PristiqBuild",
  // Belt and braces alongside the robots.ts disallow. Neither is access
  // control; middleware.ts is.
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // The login page renders inside this layout while signed out.
  if (!session?.user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-steel-50">
      <header className="bg-white border-b border-steel-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 h-14">
          <Link href="/admin" className="font-display font-bold text-steel-900">
            PristiqBuild
            <span className="ml-2 text-xs font-normal uppercase tracking-wider text-primary-700">
              Admin
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {sectionsFor(session.user.role).map((section) => (
              <NavLink key={section.href} href={section.href} icon={ICONS[section.href]}>
                {section.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <span className="hidden sm:block text-sm text-steel-600">
              {session.user.name ?? session.user.email}
              <span className="ml-2 text-xs uppercase tracking-wider text-steel-400">
                {ROLES[session.user.role].label}
              </span>
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-sm text-steel-600 hover:text-primary-700 transition-colors"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  "/admin": <LayoutDashboard className="w-4 h-4" />,
  "/admin/leads": <Inbox className="w-4 h-4" />,
  "/admin/projects": <FolderKanban className="w-4 h-4" />,
  "/admin/finance": <Wallet className="w-4 h-4" />,
  "/admin/team": <Users className="w-4 h-4" />,
};

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-steel-700 hover:bg-steel-100 hover:text-primary-700 transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
