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
  if (ca) return { ca, rejectUnauthorized: true };

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
