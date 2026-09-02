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

## 5. Cutting over from Vercel

Where things stand: DNS is at Namecheap, the apex is an `A` to `76.76.21.21`
and `www` is a `CNAME` to `cname.vercel-dns.com`, both Vercel. Vercel's
production deploys have failed on every push since 30 August, so the live site
is a build from February and none of the lead capture, admin or finance work is
on it.

The order below matters. Prove Dokploy on a URL nobody depends on, then move
DNS, then switch Vercel off. Doing the last step first takes the site down.

### 5.1 Lower the TTL, ideally a day ahead

`www` is on a 30 minute TTL, so without this a mistake takes 30 minutes to walk
back. In Namecheap: **Domain List → Manage → Advanced DNS**, set TTL to 1 min on
both records and leave it. Wait out the old 30 minutes before cutting over.

### 5.2 Prove the app on Dokploy first

Create the app service from GitHub, branch `master`, build type Dockerfile. Set
the variables from section 2, and the build argument from section 2 if you want
analytics. Deploy, and watch the logs for:

```
==> applying migrations
==> starting next
```

If `AUTH_SECRET` or `DATABASE_URL` are missing the entrypoint says so there.

Dokploy gives the service a URL of its own before any domain is attached. On
that URL check three things: `/` loads, `/robots.txt` returns 200, and
`/admin/login` shows the sign-in form. Then create the first account with
section 4 and sign in.

**Do not touch DNS until `/admin/login` works on that URL.**

### 5.3 Attach the domains in Dokploy before changing DNS

Service → **Domains** → add `pristiqbuild.com` and `www.pristiqbuild.com`, port
3000, HTTPS on, Let's Encrypt.

Add them first. Traefik answers the certificate challenge on the domain itself,
so the route has to already exist when DNS starts pointing here; otherwise the
first visitors arrive to a certificate error rather than a site.

### 5.4 Change the records

Namecheap → Advanced DNS. `SERVER_IP` is the Dokploy host's public IPv4, shown
on its server page.

Remove:

| Type | Host | Value |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

Add:

| Type | Host | Value | TTL |
|---|---|---|---|
| A | @ | SERVER_IP | 1 min |
| A | www | SERVER_IP | 1 min |

`www` is a CNAME today, which is what answers both IPv4 and IPv6 lookups.
Replacing it with an `A` record leaves no IPv6 answer at all, which is fine —
what you must not do is leave the CNAME in place beside a new `A`.

### 5.5 Watch it move

```
dig +short www.pristiqbuild.com
curl -s -o /dev/null -w '%{http_code}\n' https://www.pristiqbuild.com/admin/login
```

`/admin/login` answering **200 instead of 404** is the signal that traffic is on
the new build — that route does not exist in the February one. `curl -vI` should
show a Let's Encrypt certificate.

To roll back, put the two original records back. That is the whole rollback.

### 5.6 Switch Vercel off, once traffic has moved

Two Vercel projects, `pristiqbuild-v2` and `pristique-build`, are both building
this repo and both failing on every push.

1. Each project → **Settings → Domains** → remove `pristiqbuild.com` and `www`.
2. Each project → **Settings → Git** → disconnect the repository. This stops the
   failed deploys and their emails.

Leave the projects themselves in place for a few days, until the new site has
proven itself.

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
