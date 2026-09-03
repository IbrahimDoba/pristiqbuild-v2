# Deploying

Production is **Vercel for the app, Neon for the database**, decided 3 September
2026. Part two keeps the Dokploy container path working, because it is built and
tested and worth having if this ever needs to move onto a server.

Whatever you are setting up, the outstanding credentials and decisions are
tracked in [NEEDED-FROM-YOU.md](NEEDED-FROM-YOU.md).

---

# Part one: Vercel and Neon

## 1. The database

Neon, using the **pooled** connection string, the one with `-pooler` in the
hostname and `?sslmode=require` on the end. Vercel runs the app as serverless
functions, so connections are opened and dropped constantly; the pooled endpoint
is what makes that survivable.

Prisma talks to it through `@prisma/adapter-pg` over plain TCP, so no Neon
specific driver is needed.

## 2. Environment variables

Vercel project → Settings → Environment Variables.

| Variable | Scope | Note |
|---|---|---|
| `DATABASE_URL` | Production | The Neon pooled URL. Missing: the site serves, and every form answers "please call or email" instead of saving. |
| `AUTH_SECRET` | Production | `openssl rand -base64 32`. Missing: the public site is perfect and every `/admin` request is a 500. Changing it signs everyone out. |
| `LEAD_NOTIFY_TO` | Production | Who receives lead emails. Comma-separated for several. |
| `LEAD_NOTIFY_FROM` | Production | Must be on a domain verified in Resend. |
| `RESEND_API_KEY` | Production | Omit and lead emails are logged rather than sent. Leads are saved either way. |
| `OPENAI_API_KEY` | Production | Turns on assisted expense entry. Without it the finance tab hides that box and explains why. |
| `OPENAI_MODEL` | Production | Defaults to `gpt-5-mini`. Only set it for something larger. |

**Set `DATABASE_URL` for Production only, at least to start.** Ticking Preview
as well points every pull request build at the live database, which is how test
records end up in real ones. Give previews their own Neon branch if you want
them working.

`NEXT_PUBLIC_GA_MEASUREMENT_ID` is the exception: most of the site is
prerendered, so it is resolved during the build. On Vercel it works as a normal
environment variable because Vercel builds on every deploy; in Docker it has to
be a build argument.

## 3. Migrations

Vercel has no startup hook, and running migrations from the build command is a
trap: every preview deploy would migrate whichever database it points at, and
concurrent builds would race each other.

Run them yourself, from this repository, once at setup and again whenever a
migration is added:

```
DATABASE_URL="<neon pooled url>" pnpm db:deploy
```

`pnpm db:status` shows what has and has not been applied.

## 4. The first admin account

Migrations create the `User` table; they do not put anyone in it. On an empty
table the login page answers a valid owner exactly as it answers a stranger, so
this looks like a wrong password rather than an empty database.

```
DATABASE_URL="<neon pooled url>" \
  pnpm admin:create you@example.com "Your Name" CO_FOUNDER
```

It prints a generated password once and stores only its bcrypt hash. Running it
again for the same address resets that account rather than failing. Roles are
`CO_FOUNDER`, `ADMIN`, `MANAGER` and `CONTENT_SPECIALIST`; what each reaches is
in `src/lib/admin/permissions.ts`. Add everyone else from the Team tab.

## 5. Check it

```
curl -s -o /dev/null -w '%{http_code}\n' https://www.pristiqbuild.com/admin/login
```

Then submit one real enquiry through the contact form and confirm it appears
under Leads. That exercises the database, the migrations and the notification
path together, which no amount of reading the config will.

## Notes for whoever maintains this

**`next.config.ts` disables `output: "standalone"` when `VERCEL` is set.** Vercel
packages the app its own way and does not support that mode; the Dockerfile in
part two needs it. One repository, both targets, keyed off the `VERCEL=1` that
Vercel sets during its build.

**Builds fail on dependency advisories.** Every deploy between 30 August and
2 September 2026 failed on a single line: a vulnerable `next-mdx-remote`. The
site served a build from February throughout, and nothing in the Vercel status
API said why. If a build fails for no visible reason, run `pnpm audit` before
assuming it is the code.

---

# Part two: Dokploy

Not in use. Kept working, and verified as far as a machine without Docker
allows. The runbook for moving the domain onto it is in the git history of this
file, at the commit "Document the Vercel cutover".

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

`NEXT_PUBLIC_*` variables are resolved at **build** time, and in a container the
build happens inside the image. The only one the code reads is
`NEXT_PUBLIC_GA_MEASUREMENT_ID`; most of the site is prerendered, so a value set
at build time is baked into 482 files of HTML and RSC payload. It is wired as a
Docker build argument — set it under the service's **build arguments**, not its
environment, and redeploy. Setting it on the running service does nothing.

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


## Notes on the container build

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
