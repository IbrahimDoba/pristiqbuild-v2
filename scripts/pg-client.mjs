/**
 * A pg client for the maintenance scripts, with the same TLS rules as
 * src/lib/db.ts (which these .mjs files cannot import).
 *
 * `sslmode` is stripped from the URL because node-postgres lets it override
 * the ssl object below and treats `require` as full verification against the
 * system CAs, which a self-signed certificate never passes.
 */
import pg from "pg";

function isLocalHost(host) {
  return host === "localhost" || host === "127.0.0.1" || host === "::1" || !host.includes(".");
}

export async function connect() {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    console.error("DATABASE_URL is not set. Put it in .env.local or .env.");
    process.exit(1);
  }

  const url = new URL(raw);
  for (const key of ["sslmode", "sslcert", "sslkey", "sslrootcert", "uselibpqcompat"]) {
    url.searchParams.delete(key);
  }

  const ca = process.env.DATABASE_CA_CERT;
  const ssl = isLocalHost(url.hostname)
    ? undefined
    : ca
      ? { ca, rejectUnauthorized: true }
      : { rejectUnauthorized: false };

  const client = new pg.Client({ connectionString: url.toString(), ssl });
  await client.connect();
  return client;
}
