import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Can this deployment reach its database?
 *
 * Answers with booleans and an error category only: never a value, host,
 * user or message, so it is safe to leave public. It exists because a
 * misconfigured certificate or URL on the host otherwise shows up only as
 * "we could not save your message", with the real reason in a log the
 * person debugging may not be able to open.
 */
export async function GET() {
  const url = process.env.DATABASE_URL ?? "";
  const ca = process.env.DATABASE_CA_CERT ?? "";

  let hostKind: "ip" | "dns" | "unparseable" | "unset" = "unset";
  if (url) {
    try {
      const host = new URL(url).hostname;
      hostKind = /^[\d.]+$/.test(host) ? "ip" : "dns";
    } catch {
      hostKind = "unparseable";
    }
  }

  const config = {
    urlSet: Boolean(url),
    hostKind,
    caSet: Boolean(ca),
    caHasPemMarkers: ca.includes("BEGIN CERTIFICATE") && ca.includes("END CERTIFICATE"),
    caLength: ca.length,
  };

  try {
    await getDb().$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, config });
  } catch (error) {
    return NextResponse.json({ ok: false, config, reason: classify(error) }, { status: 503 });
  }
}

/** The error's code and a coarse category, from anywhere in its cause chain. */
function classify(error: unknown) {
  const codes: string[] = [];
  let text = "";
  let current: unknown = error;
  for (let depth = 0; current && depth < 6; depth++) {
    const e = current as { code?: unknown; message?: unknown; cause?: unknown };
    if (typeof e.code === "string") codes.push(e.code);
    if (typeof e.message === "string") text += ` ${e.message}`;
    current = e.cause;
  }

  const category =
    /self[- ]signed|unable to verify|UNABLE_TO_VERIFY|certificate chain/i.test(text)
      ? "certificate-not-trusted"
      : /altname|does not match certificate/i.test(text)
        ? "certificate-hostname-mismatch"
        : /PEM|no start line|bad base64|asn1/i.test(text)
          ? "certificate-unreadable"
          : /password authentication|authentication failed/i.test(text)
            ? "wrong-password"
            : /does not exist/i.test(text)
              ? "database-or-table-missing"
              : /timeout|timed out/i.test(text)
                ? "timeout"
                : /ECONNREFUSED|ENOTFOUND|EAI_AGAIN/i.test(text)
                  ? "unreachable"
                  : "other";

  return { category, codes: [...new Set(codes)] };
}
