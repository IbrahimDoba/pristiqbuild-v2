# Deploying to Dokploy

## 1. Database

Dokploy's Postgres service hostname has no dot in it (`pristiqbuild-database-xxxx`).
That is a Docker service name: it resolves only inside Dokploy's internal
network. It will never resolve from a laptop, and failing to reach it from
outside tells you nothing about whether the database is running.

- **App to database**: use the internal URL as-is.
- **Laptop to database** (migrations by hand, a GUI client): expose 5432 on a
  host port in the database service, then use
  `postgresql://postgres:PASSWORD@SERVER_IP:MAPPED_PORT/postgres`.

## 2. Environment variables

Set these on the **app** service. Names and notes are in `.env.example`.

Required:

| Variable | Note |
|---|---|
| `DATABASE_URL` | The internal URL. Without it the app starts but lead capture fails. |
| `AUTH_SECRET` | Signs the admin session. `openssl rand -base64 32`. Without it the public site serves normally and every `/admin` request is a 500. Changing it signs everyone out. |
| `LEAD_NOTIFY_TO` | Who receives lead emails. Comma-separated for several. |
| `LEAD_NOTIFY_FROM` | Must be on a domain verified in Resend. |
| `RESEND_API_KEY` | Omit and lead emails are logged to stdout instead of sent. |

Optional:

| Variable | Note |
|---|---|
| `OPENAI_API_KEY` | Turns on the assisted expense entry box. Without it the finance tab hides the box and says why; expenses are still entered by hand. |
| `OPENAI_MODEL` | Defaults to `gpt-5-mini`, which is the right class for extraction. |

The `NEXT_PUBLIC_*` variables are read at **build** time, so changing one needs
a rebuild, not just a restart.

## 3. Deploy

Dokploy will pick up the `Dockerfile`. Nothing else to configure.

Migrations run from the entrypoint on every boot, not at build time: the build
has no route to the database. A deploy therefore converges the schema before
serving its first request. If `DATABASE_URL` is missing the entrypoint says so
and still starts, rather than crash-looping.

Health check is built in and hits `/robots.txt`.

## 4. The first admin account

Migrations create the `User` table; they do not put anyone in it. On a fresh
database nobody can sign in, and the login page gives the same "those details
did not match an active account" answer it gives a stranger, so this looks like
a broken password rather than an empty table.

`scripts/create-admin.mjs` is not in the image. Run it from a laptop against
the database, which needs 5432 exposed as in section 1:

```
DATABASE_URL="postgresql://postgres:PASSWORD@SERVER_IP:MAPPED_PORT/postgres" \
  pnpm admin:create you@example.com "Your Name" CO_FOUNDER
```

It prints a generated password once and stores only the bcrypt hash. Running it
again for the same email resets that account rather than failing. Roles are
`CO_FOUNDER`, `ADMIN`, `MANAGER`, `CONTENT_SPECIALIST`; what each one can reach
is in `src/lib/admin/permissions.ts`. Close the exposed port afterwards.

## Notes for whoever maintains this

**`--node-linker=hoisted` in the deps stage is load-bearing.** With pnpm's
default symlinked layout, Next's standalone tracer picked up 6 packages and
missed `styled-jsx`, which `next/dist/server/require-hook.js` requires at
startup. The image built fine and died on first boot. Flat layout traces 129.

**The Prisma CLI lives at `/opt/prisma-cli`, with the schema and config beside
it.** Installing it into `/app` alongside the app's `package.json` made npm
reconcile the whole dependency tree and took `node_modules` to 849MB. Splitting
it out and giving it a minimal manifest avoids that. The schema and config sit
with it because `prisma.config.ts` imports `prisma/config` and cannot resolve
that from a directory with no prisma package.

**`prisma.config.ts` reads `process.env.DATABASE_URL` directly rather than
through `env()`.** `env()` throws when the variable is absent, and the install
step runs `prisma generate` with no database URL set. The entrypoint checks for
the variable separately, so a genuinely missing value still fails loudly.

**The image is around 600MB**, roughly half of it the Prisma CLI layer. If that
matters, drop the CLI from the image and run `migrate deploy` as a Dokploy
pre-deploy command instead.
