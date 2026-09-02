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

function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at your database."
    );
  }

  const adapter = new PrismaPg({ connectionString });

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
