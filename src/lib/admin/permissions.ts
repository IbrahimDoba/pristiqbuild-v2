import { UserRole } from "@/generated/prisma/client";

/**
 * What each role may do.
 *
 * Capabilities are derived from the role rather than stored per user, so the
 * rules live in exactly one readable place. Before this, roles existed on the
 * user record and were displayed in the header, but nothing anywhere checked
 * them: every signed-in user could reach everything.
 *
 * The finance rule is the one that matters. Expense data reveals margins,
 * supplier pricing and effectively what people are paid, so it is owner-only
 * by default. Managers see costs for projects they are assigned to and nothing
 * else. Content specialists never see money or leads at all.
 */
export type Capability =
  | "leads:read"
  | "leads:write"
  | "finance:read"
  | "finance:write"
  | "projects:read"
  | "projects:write"
  | "content:write"
  | "team:manage";

/** Whether finance is scoped to everything, only assigned work, or nothing. */
export type FinanceScope = "all" | "assigned" | "none";

type RoleDefinition = {
  label: string;
  description: string;
  capabilities: Capability[];
  financeScope: FinanceScope;
};

export const ROLES: Record<UserRole, RoleDefinition> = {
  CO_FOUNDER: {
    label: "Co-founder",
    description: "Everything, including the books and the team.",
    capabilities: [
      "leads:read", "leads:write",
      "finance:read", "finance:write",
      "projects:read", "projects:write",
      "content:write", "team:manage",
    ],
    financeScope: "all",
  },
  ADMIN: {
    label: "Admin",
    description: "Runs the business day to day. Same reach as a co-founder.",
    capabilities: [
      "leads:read", "leads:write",
      "finance:read", "finance:write",
      "projects:read", "projects:write",
      "content:write", "team:manage",
    ],
    financeScope: "all",
  },
  MANAGER: {
    label: "Manager",
    description:
      "Leads and delivery. Sees costs only for projects they are assigned to.",
    capabilities: [
      "leads:read", "leads:write",
      "finance:read", "finance:write",
      "projects:read",
    ],
    financeScope: "assigned",
  },
  CONTENT_SPECIALIST: {
    label: "Content specialist",
    description: "Blog and site content. No leads, no money.",
    capabilities: ["content:write"],
    financeScope: "none",
  },
};

export const ASSIGNABLE_ROLES = Object.keys(ROLES) as UserRole[];

export function can(role: UserRole, capability: Capability): boolean {
  return ROLES[role].capabilities.includes(capability);
}

export function financeScope(role: UserRole): FinanceScope {
  return ROLES[role].financeScope;
}

/** The admin sections a role may reach, in nav order. */
export function sectionsFor(role: UserRole) {
  return [
    { href: "/admin", label: "Overview", show: true },
    { href: "/admin/leads", label: "Leads", show: can(role, "leads:read") },
    { href: "/admin/projects", label: "Projects", show: can(role, "projects:read") },
    { href: "/admin/finance", label: "Finance", show: can(role, "finance:read") },
    { href: "/admin/team", label: "Team", show: can(role, "team:manage") },
  ].filter((s) => s.show);
}

/**
 * Route-level rules, used by the proxy.
 *
 * Longest prefix wins, so /admin/leads is matched before /admin.
 */
const ROUTE_CAPABILITIES: [string, Capability][] = [
  ["/admin/leads", "leads:read"],
  ["/admin/projects", "projects:read"],
  ["/admin/finance", "finance:read"],
  ["/admin/team", "team:manage"],
];

export function capabilityForPath(pathname: string): Capability | null {
  const match = ROUTE_CAPABILITIES
    .filter(([prefix]) => pathname === prefix || pathname.startsWith(prefix + "/"))
    .sort((a, b) => b[0].length - a[0].length)[0];
  return match ? match[1] : null;
}
