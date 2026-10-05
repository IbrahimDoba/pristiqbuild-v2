import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// One client per process, in every environment.
//
// The familiar Next.js snippet caches only in development, because there the
// concern is module reloading on each edit. That snippet also instantiates the
// client once at module scope. This one resolves it through a function, which
// callers invoke per query, so skipping the cache in production meant a new
// PrismaClient and a new pg pool on every single call. Rendering the finance
// page opens nine of them, none ever closed.
const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createClient>;
};

/** Loopback and Docker-internal names, where there is no network to eavesdrop. */
function isLocalHost(host: string) {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    // Docker and Dokploy service names have no dot in them.
    !host.includes(".")
  );
}

/**
 * TLS for anything that is not loopback.
 *
 * The database is reached across the public internet, and a Lead row carries a
 * name, an email, a phone number and whatever the enquirer typed. That must not
 * travel in clear text, so an unencrypted remote connection is refused rather
 * than quietly allowed.
 *
 * Authenticating the server is a second, separate thing. Set DATABASE_CA_CERT
 * to the server's CA and the certificate is verified properly. Without it the
 * traffic is still encrypted but the server is unverified, which stops passive
 * eavesdropping and not an active man in the middle. That is a real gap, so it
 * says so once at startup rather than looking like a finished job.
 */
/**
 * DATABASE_CA_CERT as a PEM Node will accept, however it was pasted.
 *
 * Hosting dashboards mangle multi-line values: copied from .env.local it
 * arrives wrapped in quotes, some UIs store the line breaks as a literal
 * "\n", some flatten it onto one line, and the BEGIN/END lines are easy to
 * miss when selecting it. Any of those makes Node reject
 * the server's certificate, which looks like a dead database.
 */
export function normaliseCa(raw: string): string {
  let pem = raw.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n").trim();
  // Just the base64 body, with the BEGIN/END lines lost in the paste.
  if (!pem.includes("BEGIN CERTIFICATE") && /^[A-Za-z0-9+/=\s]+$/.test(pem)) {
    pem = `-----BEGIN CERTIFICATE-----${pem}-----END CERTIFICATE-----`;
  }
  if (!pem.includes("\n") || !/-----BEGIN CERTIFICATE-----\n/.test(pem)) {
    const match = pem.match(/-----BEGIN CERTIFICATE-----([\s\S]+)-----END CERTIFICATE-----/);
    if (match) {
      const body = match[1].replace(/\s+/g, "").match(/.{1,64}/g)?.join("\n") ?? "";
      pem = `-----BEGIN CERTIFICATE-----\n${body}\n-----END CERTIFICATE-----`;
    }
  }
  return pem + "\n";
}

function sslFor(connectionString: string) {
  let host: string;
  try {
    host = new URL(connectionString).hostname;
  } catch {
    // Not a shape we can parse; let pg report the real problem.
    return undefined;
  }

  if (isLocalHost(host)) return undefined;

  const ca = process.env.DATABASE_CA_CERT;
  // `host` is passed through to the certificate check. node-postgres sets
  // the TLS servername only for DNS names, so for an IP address Node would
  // otherwise verify the certificate against "localhost" and reject it.
  if (ca) return { ca: normaliseCa(ca), rejectUnauthorized: true, host };

  console.warn(
    `[db] Connecting to ${host} with TLS but without verifying its certificate. ` +
      `Set DATABASE_CA_CERT to the database server's CA to close this.`
  );
  return { rejectUnauthorized: false };
}

/**
 * The connection string with its TLS query parameters removed.
 *
 * node-postgres lets `sslmode` in the URL replace the `ssl` object passed in
 * code, and it treats `require` as `verify-full` against the system CAs. With
 * the self-signed certificate DEPLOY.md sets up, that rejects every connection
 * and ignores DATABASE_CA_CERT entirely. The URL keeps `sslmode=require` for
 * the Prisma CLI, which does honour it; sslFor() decides TLS for the app.
 */
function withoutSslParams(connectionString: string) {
  try {
    const url = new URL(connectionString);
    for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert", "uselibpqcompat"]) {
      url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return connectionString;
  }
}

function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at your database."
    );
  }

  // Serverless gives every concurrent invocation its own process, and therefore
  // its own pool. A generous per-process pool multiplied by however many
  // instances Vercel decides to run is how a Postgres with max_connections=100
  // starts refusing work on a busy day. Keep each one small and let them go
  // idle quickly; a pooler in front of the database is what actually raises the
  // ceiling.
  const max = Number(process.env.DATABASE_POOL_MAX ?? 3);

  const adapter = new PrismaPg({
    connectionString: withoutSslParams(connectionString),
    max: Number.isFinite(max) && max > 0 ? max : 3,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    ssl: sslFor(connectionString),
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

/**
 * Resolve the shared Prisma client.
 *
 * Deliberately a function rather than a module-level `export const prisma`.
 * A top-level instantiation would run when Next collects route metadata during
 * `next build`, which fails on any machine that builds without DATABASE_URL set.
 */
export function getDb() {
  globalForPrisma.prisma ??= createClient();
  return globalForPrisma.prisma;
}
