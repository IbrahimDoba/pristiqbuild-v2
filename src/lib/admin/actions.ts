"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { LeadStage } from "@/generated/prisma/client";
import { STAGES } from "@/lib/admin/leads";
import { can, type Capability } from "@/lib/admin/permissions";

/**
 * Every action re-checks the session.
 *
 * Middleware guards the page routes, but a server action is its own POST
 * endpoint and is reachable independently of the page that rendered the form.
 * Relying on the middleware alone would leave these callable while signed out.
 */
async function requireUser(capability: Capability) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!can(session.user.role, capability)) {
    throw new Error(`Not permitted: ${capability}`);
  }
  return session.user;
}

export async function setLeadStage(leadId: string, stage: string) {
  await requireUser("leads:write");

  if (!STAGES.includes(stage as LeadStage)) {
    throw new Error(`Unknown stage: ${stage}`);
  }

  await getDb().lead.update({
    where: { id: leadId },
    data: { stage: stage as LeadStage },
  });

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function claimLead(leadId: string) {
  const user = await requireUser("leads:write");
  await getDb().lead.update({
    where: { id: leadId },
    data: { ownerId: user.id },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
}

export async function releaseLead(leadId: string) {
  await requireUser("leads:write");
  await getDb().lead.update({
    where: { id: leadId },
    data: { ownerId: null },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
}

export async function addNote(leadId: string, formData: FormData) {
  const user = await requireUser("leads:write");

  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;

  await getDb().note.create({
    data: { leadId, authorId: user.id, body: body.slice(0, 5000) },
  });

  revalidatePath(`/admin/leads/${leadId}`);
}
