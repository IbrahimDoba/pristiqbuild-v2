# Deploying

Production is **Vercel for the app, the Dokploy Postgres for the database**.
Part two keeps the whole-app container path, which is built and tested and is
the better shape if this ever moves entirely onto the server.

Outstanding credentials and decisions live in
[NEEDED-FROM-YOU.md](NEEDED-FROM-YOU.md).

---

# Part one: Vercel, with the database on Dokploy

Vercel runs outside Dokploy's network, so the database has to be reachable from
the public internet. That is a real change in exposure, and the first two
sections are what make it safe rather than merely working. Do them before
pointing anything at it.

## 1. Give Postgres a certificate

A `Lead` row holds a name, an email, a phone number and whatever the enquirer
typed into the message box. Across the open internet that has to be encrypted,
and the stock Postgres image ships with SSL **off**.

On the Dokploy host, generate a self-signed certificate. `CN` must match the
hostname Vercel will connect to:

```
openssl req -new -x509 -days 3650 -nodes -text \
  -out server.crt -keyout server.key \
  -subj "/CN=db.pristiqbuild.com"

chmod 600 server.key
chown 999:999 server.key server.crt      # 999 is postgres inside the image
```

Mount both into the database service, then set its command:

```
postgres -c ssl=on \
         -c ssl_cert_file=/var/lib/postgresql/server.crt \
         -c ssl_key_file=/var/lib/postgresql/server.key
```

Keep `server.crt`. It is self-signed, so it is also its own CA, and it becomes
`DATABASE_CA_CERT` below. Without that variable the app still encrypts but
cannot verify what it is talking to, and it logs a warning saying exactly that.

## 2. Publish the port, and pick a real password

Expose 5432 on the host in the database service.

Vercel does not offer fixed egress addresses on Hobby or Pro, so there is no
useful IP allowlist to write: the password and the certificate are the whole
defence. Set a long random one, and **do not reuse the current password** — it
was pasted into a chat and should be treated as public.

```
openssl rand -base64 24
```

## 3. Environment variables

Vercel project → Settings → Environment Variables.

| Variable | Scope | Note |
|---|---|---|
| `DATABASE_URL` | Production | `postgresql://postgres:PASSWORD@db.pristiqbuild.com:5432/postgres?sslmode=require` |
| `DATABASE_CA_CERT` | Production | The full contents of `server.crt`, `BEGIN`/`END` lines included. Omit and the connection is encrypted but unauthenticated. |
| `AUTH_SECRET` | Production | `openssl rand -base64 32`. Missing: the public site is perfect and every `/admin` request is a 500. |
| `LEAD_NOTIFY_TO` | Production | Who receives lead emails. Comma-separated for several. |
| `LEAD_NOTIFY_FROM` | Production | Must be on a domain verified in Resend. |
| `RESEND_API_KEY` | Production | Omit and lead emails are logged rather than sent. Leads are saved either way. |
| `OPENAI_API_KEY` | Production | Turns on assisted expense entry. Without it the finance tab hides that box and explains why. |
| `DATABASE_POOL_MAX` | Production | Optional. Connections per serverless instance, default 3. See section 6. |

**Set `DATABASE_URL` for Production only.** Ticking Preview points every pull
request build at the live database, which is how test records end up in real
ones.

## 4. Migrations

Vercel has no startup hook, and running migrations from the build command is a
trap: preview deploys would migrate whichever database they point at, and
concurrent builds would race. Run them yourself, at setup and whenever a
migration is added:

```
DATABASE_URL="postgresql://postgres:PASSWORD@db.pristiqbuild.com:5432/postgres?sslmode=require" \
  pnpm db:deploy
```

`pnpm db:status` shows what has and has not been applied.

## 5. The first admin account

Migrations create the `User` table; they do not put anyone in it. On an empty
table the login page answers a valid owner exactly as it answers a stranger, so
this looks like a wrong password rather than an empty database.

```
DATABASE_URL="<same url>" \
  pnpm admin:create you@example.com "Your Name" CO_FOUNDER
```

It prints a generated password once and stores only its bcrypt hash. Running it
again for the same address resets that account rather than failing. Roles are
`CO_FOUNDER`, `ADMIN`, `MANAGER` and `CONTENT_SPECIALIST`; what each reaches is
in `src/lib/admin/permissions.ts`. Add everyone else from the Team tab.

## 6. Connection limits

Every concurrent serverless invocation is its own process with its own pool, so
the ceiling is instances × `DATABASE_POOL_MAX`, against a Postgres default of
`max_connections=100`. The app caps each pool at 3 and drops idle connections
after ten seconds, which is comfortable at this site's traffic.

If `too many clients already` ever appears in the logs, that is the signal to
put PgBouncer in front rather than to raise the cap. Run it in **session** mode:
transaction mode multiplexes better but breaks prepared statements, which the
pg driver adapter uses.

## 7. Check it

```
curl -s -o /dev/null -w '%{http_code}\n' https://www.pristiqbuild.com/admin/login
```

Then submit one real enquiry through the contact form and confirm it appears
under Leads. That exercises TLS, the migrations, the connection path and the
notification together, which no amount of reading config will.

## Notes for whoever maintains this

**`next.config.ts` disables `output: "standalone"` when `VERCEL` is set.** Vercel
packages the app its own way and does not support that mode; the Dockerfile in
part two needs it. One repository, both targets.

**Builds fail on dependency advisories.** Every deploy between 30 August and
2 September 2026 failed on one line: a vulnerable `next-mdx-remote`. The site
served a build from February throughout, and nothing in the Vercel status API
said why. If a build fails for no visible reason, run `pnpm audit` before
assuming it is the code.

**`src/lib/db.ts` refuses to send a remote connection in clear text.** Anything
that is not loopback or a dotless Docker service name gets TLS. That is why part
two's internal `pristiqbuild-database-xxxx` hostname still works unencrypted
inside Dokploy's own network, and why a public host does not.

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
