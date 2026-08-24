import { Resend } from "resend";
import type { Lead } from "@/generated/prisma/client";

/**
 * Lead notification.
 *
 * Without RESEND_API_KEY the email is written to stdout instead of sent, so
 * local development and CI need no credentials and no network. The route
 * records the outcome on the lead either way.
 */

const SOURCE_LABEL: Record<string, string> = {
  CONTACT_FORM: "Homepage contact form",
  QUOTE_FORM: "Quote request",
  CALCULATOR: "Cost calculator",
  NEWSLETTER: "Newsletter signup",
  WHATSAPP: "WhatsApp",
};

const BUDGET_LABEL: Record<string, string> = {
  "under-10m": "Under 10M naira",
  "10m-25m": "10M to 25M naira",
  "25m-50m": "25M to 50M naira",
  "50m-100m": "50M to 100M naira",
  "over-100m": "Over 100M naira",
};

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Row = [string, string];

function rowsFor(lead: Lead): Row[] {
  const rows: Row[] = [
    ["Source", SOURCE_LABEL[lead.source] ?? lead.source],
    ["Name", lead.name],
  ];

  if (lead.email) rows.push(["Email", lead.email]);
  if (lead.phone) rows.push(["Phone", lead.phone]);
  if (lead.projectType) rows.push(["Project type", lead.projectType]);
  if (lead.location) rows.push(["Location", lead.location]);
  if (lead.budgetBand) {
    rows.push(["Budget", BUDGET_LABEL[lead.budgetBand] ?? lead.budgetBand]);
  }

  const payload = lead.payload as Record<string, unknown> | null;
  const calc = payload?.calculator as Record<string, unknown> | undefined;

  if (calc) {
    rows.push(["Building size", `${calc.buildingSize} sqm`]);
    rows.push(["Floors", String(calc.floors)]);
    rows.push(["Smart features", calc.smartFeatures ? "Yes" : "No"]);
    rows.push(["Solar power", calc.solarPower ? "Yes" : "No"]);
    rows.push(["Estimate shown", naira.format(Number(calc.estimate))]);
  }

  if (lead.message) rows.push(["Message", lead.message]);
  if (payload?.referrer) rows.push(["Came from", String(payload.referrer)]);

  return rows;
}

function subjectFor(lead: Lead): string {
  const label = SOURCE_LABEL[lead.source] ?? "Website enquiry";

  if (lead.source === "NEWSLETTER") {
    return `Newsletter signup: ${lead.email}`;
  }

  const budget = lead.budgetBand
    ? ` (${BUDGET_LABEL[lead.budgetBand] ?? lead.budgetBand})`
    : "";

  return `${label}: ${lead.name}${budget}`;
}

function renderHtml(lead: Lead): string {
  const cells = rowsFor(lead)
    .map(
      ([label, value]) =>
        `<tr>
           <td style="padding:8px 14px 8px 0;color:#5C6E73;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
           <td style="padding:8px 0;color:#0E181B;font-size:14px">${escapeHtml(value)}</td>
         </tr>`
    )
    .join("");

  const replyTo = lead.email
    ? `<p style="margin:22px 0 0"><a href="mailto:${escapeHtml(lead.email)}" style="background:#1A5F7A;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:14px;display:inline-block">Reply to ${escapeHtml(lead.name)}</a></p>`
    : "";

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:28px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#159895">PristiqBuild</p>
      <h1 style="margin:0 0 20px;font-size:20px;color:#0E181B">New lead</h1>
      <table style="border-collapse:collapse;width:100%">${cells}</table>
      ${replyTo}
      <p style="margin:26px 0 0;font-size:12px;color:#5C6E73">Received ${lead.createdAt.toISOString()}</p>
    </div>`;
}

function renderText(lead: Lead): string {
  const body = rowsFor(lead)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return `New lead\n\n${body}\n\nReceived ${lead.createdAt.toISOString()}\n`;
}

export type NotifyResult = { delivered: boolean; detail: string };

export async function notifyNewLead(lead: Lead): Promise<NotifyResult> {
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !from) {
    return {
      delivered: false,
      detail: "LEAD_NOTIFY_TO or LEAD_NOTIFY_FROM is not set",
    };
  }

  if (!apiKey) {
    console.info(
      `[lead] RESEND_API_KEY not set, email not sent.\n` +
        `  to:      ${to}\n` +
        `  subject: ${subjectFor(lead)}\n` +
        renderText(lead)
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")
    );
    return { delivered: false, detail: "RESEND_API_KEY not set, logged only" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject: subjectFor(lead),
      html: renderHtml(lead),
      text: renderText(lead),
      ...(lead.email ? { replyTo: lead.email } : {}),
    });

    if (error) {
      return { delivered: false, detail: `Resend error: ${error.message}` };
    }

    return { delivered: true, detail: "sent" };
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    return { delivered: false, detail };
  }
}
