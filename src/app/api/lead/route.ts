import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { notifyNewLead } from "@/lib/leads/notify";
import {
  leadInputSchema,
  toLeadRecord,
  type LeadContext,
} from "@/lib/leads/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Anything faster than this from mount to submit is not a human typing. */
const MIN_ELAPSED_MS = 1_200;

/**
 * Per-source submission allowances, per IP per minute.
 *
 * The calculator gets a far higher ceiling because it posts on every
 * recalculation. Sharing one budget across all sources would let a visitor who
 * tried a few different building sizes get locked out of the contact form.
 */
const PER_SOURCE_LIMIT: Record<string, number> = {
  CONTACT_FORM: 5,
  QUOTE_FORM: 5,
  NEWSLETTER: 5,
  CALCULATOR: 25,
};

/** Coarse ceiling applied before parsing, purely to blunt floods. */
const ENDPOINT_LIMIT = 40;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

function utmFrom(referrer: string | null): Record<string, string> {
  if (!referrer) return {};

  try {
    const params = new URL(referrer).searchParams;
    const utm: Record<string, string> = {};

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 200);
    }

    return utm;
  } catch {
    return {};
  }
}

/**
 * Bots get the same 200 and the same success copy as a real submission.
 *
 * Telling a scraper it was detected just teaches it what to change. Nothing is
 * written and nothing is emailed.
 */
function silentAccept() {
  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function POST(request: Request) {
  // 1. Coarse limit before parsing, so a flood costs us as little as possible.
  const flood = rateLimit(
    clientKey(request.headers, "lead:all"),
    ENDPOINT_LIMIT,
    60_000
  );

  if (!flood.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(flood.retryAfter) } }
    );
  }

  // 2. Parse.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission." },
      { status: 400 }
    );
  }

  // 3. Validate.
  const parsed = leadInputSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    // A filled honeypot fails validation. Do not report that back.
    if ("website" in fieldErrors) return silentAccept();

    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fields: fieldErrors,
      },
      { status: 422 }
    );
  }

  const input = parsed.data;

  // 4. Timing check. Only applies when the client reported a value.
  if (input.elapsedMs !== undefined && input.elapsedMs < MIN_ELAPSED_MS) {
    return silentAccept();
  }

  // 5. Per-source limit, now that we know which form this is.
  const perSource = rateLimit(
    clientKey(request.headers, `lead:${input.source}`),
    PER_SOURCE_LIMIT[input.source] ?? 5,
    60_000
  );

  if (!perSource.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(perSource.retryAfter) } }
    );
  }

  // 6. Persist. The visitor's confirmation depends on this succeeding.
  const context: LeadContext = {
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    utm: utmFrom(request.headers.get("referer")),
  };

  const record = toLeadRecord(input, context);

  let lead;
  try {
    lead = await getDb().lead.create({ data: record });
  } catch (cause) {
    console.error("[lead] failed to persist", cause);

    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not save your message. Please call +234 813 027 2706 or email info@pristiqbuild.com.",
      },
      { status: 500 }
    );
  }

  // 7. Notify. A delivery failure must not fail the request: the lead is
  //    already safe in the database, and `notifiedAt` records what happened.
  //
  //    Anonymous calculator runs are stored but not emailed. One visitor
  //    trying six building sizes should not put six messages in the inbox,
  //    and there is nobody to reply to. They surface in the dashboard instead.
  const worthEmailing =
    lead.source !== "CALCULATOR" || lead.email.trim().length > 0;

  const notification = worthEmailing
    ? await notifyNewLead(lead)
    : { delivered: false, detail: "anonymous calculator run, not emailed" };

  if (notification.delivered) {
    await getDb()
      .lead.update({
        where: { id: lead.id },
        data: { notifiedAt: new Date() },
      })
      .catch((cause) => console.error("[lead] notifiedAt update failed", cause));
  } else {
    console.warn(`[lead] ${lead.id} not notified: ${notification.detail}`);
  }

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

/** Anything other than POST. Keeps the route from 405-ing ambiguously. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
