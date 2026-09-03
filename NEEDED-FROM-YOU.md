# What I need from you

Everything blocked on a decision, a credential or a fact only you have. Ordered
by what it blocks, not by effort. Tick things off as they land.

Deployment target, decided 3 September 2026: **frontend on Vercel, database on
Neon.** The Dokploy container work stays in the repo and still builds, but
nothing below assumes it.

---

## A. Blocking a working site

The site is live and serving, but every contact form currently answers
"We could not save your message. Please call +234 813 027 2706 or email
info@pristiqbuild.com." That is the fallback doing its job, not a crash. It
stops the moment there is a database.

- [ ] **A1. Create a Neon project and send me nothing.**
  Copy the **pooled** connection string, the one with `-pooler` in the host. It
  ends `?sslmode=require`. Keep it out of chat, email and screenshots.

- [ ] **A2. Set `DATABASE_URL` in Vercel.**
  Project → Settings → Environment Variables. Set it for **Production** only to
  begin with. If you also tick Preview, every pull request build points at the
  live database, which is how test data ends up in real records.

- [ ] **A3. Set `AUTH_SECRET` in Vercel.**
  Generate it locally, never reuse one from anywhere else:
  ```
  openssl rand -base64 32
  ```
  Without it the public site looks perfect and every `/admin` request returns
  500. Changing it later signs everyone out, which is the fastest way to revoke
  access if a laptop goes missing.

- [ ] **A4. Create the tables.**
  Vercel has nowhere to run migrations, and running them during a build is a
  trap: preview deploys would migrate whatever database they point at. Run it
  yourself once, from this repo, and again whenever I add a migration:
  ```
  DATABASE_URL="<your neon pooled url>" pnpm db:deploy
  ```

- [ ] **A5. Redeploy** in Vercel so the app picks up the new variables, then
  submit one enquiry through the contact form and confirm it appears under
  Leads.

---

## B. Blocking the AI expense assistant

The finance tab works without this. The assistant box is simply hidden, and the
page says why.

- [ ] **B1. An OpenAI API key.**
  `platform.openai.com` → API keys. Put it in `.env` locally as
  `OPENAI_API_KEY=sk-...` and in Vercel as a Production variable.

  Roughly $0.50 a month at your volume on `gpt-5-mini`, which is the default.
  Set `OPENAI_MODEL` only if you want something larger.

  **Be aware:** this code has never made a real API call. I could verify that it
  compiles, that the box hides correctly without a key, and that manual entry
  works. The extraction itself is unproven until a key exists.

---

## C. Facts only you have

Without these the finance tab is a working demo rather than your books.

- [ ] **C1. Your real projects.** Name, client, location, budget, status for
  each internal job you want to track. Add them yourself at `/admin/projects`,
  or send me the list and I will load them.

  The database currently holds my test data: one project called "Idu Residence"
  and two sample expenses. Say the word and I will delete it.

- [ ] **C2. Who gets accounts.** Email, full name and role for each person:

  | Role | Sees |
  |---|---|
  | `CO_FOUNDER` | Everything, including the books and the team |
  | `ADMIN` | The same operational reach, runs the day to day |
  | `MANAGER` | Leads and delivery. Costs only for projects they are assigned to |
  | `CONTENT_SPECIALIST` | Blog and site content. Never leads, never money |

  Yours gets created from your laptop, once:
  ```
  DATABASE_URL="<your neon pooled url>" \
    pnpm admin:create you@example.com "Your Name" CO_FOUNDER
  ```
  It prints a password once and stores only a bcrypt hash. Everyone else you
  add from the Team tab afterwards.

- [ ] **C3. Confirm the cost calculator's rates.** The numbers it quotes have
  never been checked by you. It is giving real prices to real prospects.

- [ ] **C4. Resolve the `/team` page.** It lists entirely different people from
  the founders named on the homepage. One of the two is wrong and I cannot tell
  which.

---

## D. Soon

- [ ] **D1. `RESEND_API_KEY`, or a decision to use Zoho SMTP.** Without it lead
  notification emails are written to the server log instead of sent. Leads are
  still saved either way, so this is about whether you find out quickly, not
  whether you lose them. The from address has to be on a domain verified in
  Resend.

- [ ] **D2. Blog cover images.** This is the real liability in the project.
  66 covers are hot-linked from other companies' servers, including four direct
  competitors: usframefactory, scottsdalesteelframes, framecad and howick. You
  are publishing their photography from their bandwidth. Eight links are already
  dead, which breaks the cover and the social card on twelve posts.

  Fix needs one of: working Higgsfield credits so I can generate replacements,
  your own photography, or a stock licence.

- [ ] **D3. Analytics.** A GA4 measurement ID if you want Google. I would
  suggest Umami or Cloudflare Web Analytics instead: no cookie banner, no
  consent burden, and they do not slow the page down.

  Note this one is set as a **build argument**, not an environment variable,
  because the pages are prerendered.

---

## E. Small decisions

- [ ] **E1. The `feat/lead-capture` branch on GitHub is stale.** It still has
  the vulnerable `next-mdx-remote` 5.0.0 that broke every build from 30 August
  until yesterday. Anything built from it fails the same way. Delete it, or I
  bring it up to master?

- [ ] **E2. Rotate the Postgres password** from the Dokploy database, if you
  keep that server for anything. It was pasted into a chat and should be treated
  as public.

---

## Already handled, for the record

Nothing here needs action. Listed so you can see what the credentials above
actually unlock.

- Lead capture writes to the database, with rate limiting, a honeypot and a
  timing check against bots.
- Admin at `/admin`, gated by signed session cookie. Verified that every admin
  route refuses an unauthenticated request, including under the prefetch headers
  that recent Next.js advisories describe as bypass vectors.
- Role-based access enforced in three places: the proxy, every server action and
  the database queries. Not just hidden in the UI.
- Finance: projects, budgets, expenses, spend by category, per-project scoping.
- Every dependency advisory closed. Next is on 16.3.4.
