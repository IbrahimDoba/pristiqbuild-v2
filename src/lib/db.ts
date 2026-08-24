import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// One client per process. Next.js reloads modules on every edit in dev, so
// without the global cache each save would open a fresh connection pool and
// eventually exhaust Postgres.
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
  const client = globalForPrisma.prisma ?? createClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}
