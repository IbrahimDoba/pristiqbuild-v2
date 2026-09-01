"use server";

import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { UserRole } from "@/generated/prisma/client";
import { can, ASSIGNABLE_ROLES } from "@/lib/admin/permissions";

async function requireManager() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!can(session.user.role, "team:manage")) {
    throw new Error("Not permitted to manage the team");
  }
  return session.user;
}

export type InviteResult =
  | { ok: true; email: string; password: string; reset: boolean }
  | { ok: false; error: string };

/**
 * Adds a team member, or resets an existing one's password.
 *
 * The generated password is returned once so it can be handed over, and only
 * its bcrypt hash is stored. There is no email transport yet, so an invite
 * link cannot be sent; when one exists this should become a proper invitation.
 */
export async function inviteMember(
  _prev: InviteResult | null,
  formData: FormData
): Promise<InviteResult> {
  await requireManager();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim() || null;
  const role = String(formData.get("role") ?? "");

  if (!email.includes("@")) return { ok: false, error: "Enter a valid email address." };
  if (!ASSIGNABLE_ROLES.includes(role as UserRole)) {
    return { ok: false, error: "Pick a role." };
  }

  const password = randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(password, 12);
  const db = getDb();

  const existing = await db.user.findUnique({ where: { email } });

  await db.user.upsert({
    where: { email },
    create: { email, name, role: role as UserRole, passwordHash, isActive: true },
    update: { passwordHash, isActive: true, role: role as UserRole, ...(name ? { name } : {}) },
  });

  revalidatePath("/admin/team");
  return { ok: true, email, password, reset: Boolean(existing) };
}

export async function setRole(userId: string, formData: FormData) {
  const role = String(formData.get("role") ?? "");
  const me = await requireManager();

  if (!ASSIGNABLE_ROLES.includes(role as UserRole)) throw new Error("Unknown role");
  // Otherwise the last owner can lock everyone out of team management.
  if (userId === me.id) throw new Error("You cannot change your own role");

  await getDb().user.update({ where: { id: userId }, data: { role: role as UserRole } });
  revalidatePath("/admin/team");
}

export async function setActive(userId: string, isActive: boolean) {
  const me = await requireManager();
  if (userId === me.id) throw new Error("You cannot deactivate yourself");

  // Deactivated rather than deleted, so their notes keep an author.
  await getDb().user.update({ where: { id: userId }, data: { isActive } });
  revalidatePath("/admin/team");
}
