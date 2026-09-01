/**
 * Creates or updates an admin account.
 *
 *   node --env-file=.env scripts/create-admin.mjs <email> [name] [role]
 *
 * Idempotent: running it again for the same email resets that account's
 * password rather than failing. The password is generated here and printed
 * once; only its bcrypt hash is stored.
 *
 * Talks to Postgres directly rather than through Prisma Client. The generated
 * client is TypeScript with extensionless imports, which a plain .mjs cannot
 * resolve, and this is a single row.
 */
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import pg from "pg";

const [email, name = null, role = "ADMIN"] = process.argv.slice(2);

if (!email || !email.includes("@")) {
  console.error("usage: node --env-file=.env scripts/create-admin.mjs <email> [name] [role]");
  process.exit(1);
}
// Mirrors the UserRole enum in prisma/schema.prisma. This script cannot
// import the generated TypeScript client, so the list is repeated here.
const ROLES = ["CO_FOUNDER", "ADMIN", "MANAGER", "CONTENT_SPECIALIST"];
if (!ROLES.includes(role)) {
  console.error(`role must be one of ${ROLES.join(", ")} (got "${role}")`);
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Run with --env-file=.env");
  process.exit(1);
}

// 24 hex characters, about 96 bits of entropy.
const password = randomBytes(12).toString("hex");
const passwordHash = await bcrypt.hash(password, 12);
const normalised = email.toLowerCase().trim();

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

try {
  const { rows } = await client.query(
    `INSERT INTO "User" (id, "createdAt", "updatedAt", email, name, role, "passwordHash", "isActive")
     VALUES (gen_random_uuid()::text, now(), now(), $1, $2, $3::"UserRole", $4, true)
     ON CONFLICT (email) DO UPDATE
       SET "passwordHash" = EXCLUDED."passwordHash",
           "isActive"     = true,
           name           = COALESCE(EXCLUDED.name, "User".name),
           "updatedAt"    = now()
     RETURNING email, role, (xmax = 0) AS inserted`,
    [normalised, name, role, passwordHash]
  );

  const u = rows[0];
  console.log(`\n  ${u.inserted ? "created" : "password reset for"} ${u.email}  (${u.role})`);
  console.log(`  password: ${password}`);
  console.log(`\n  Sign in at /admin/login. Store this now, it is not recoverable.\n`);
} finally {
  await client.end();
}
