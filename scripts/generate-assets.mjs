/**
 * Generates the blog cover images through the Higgsfield platform API.
 *
 *   node --env-file=.env scripts/generate-assets.mjs --dry-run
 *   node --env-file=.env scripts/generate-assets.mjs --limit 1
 *   node --env-file=.env scripts/generate-assets.mjs
 *
 * Every call is billable, so the defaults are cautious: it skips anything
 * already on disk, caps concurrency, and never retries a terminal failure into
 * more spend. Re-running after a partial batch resumes rather than restarts.
 */
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { buildManifest } from "./asset-prompts.mjs";
import { QUALITY_SETTINGS } from "./optimize-images.mjs";

const BASE = "https://platform.higgsfield.ai";

/** gpt-image-2 is the only model with credit on this account as of 2026-08-27. */
const MODEL = process.env.HF_MODEL ?? "openai/gpt-image-2";

/** Cards render at 16/10; article headers crop from the same file. */
const TARGET = { width: 1600, height: 1000 };

const CONCURRENCY = 3;
const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 180_000;
const TERMINAL = new Set(["completed", "failed", "nsfw", "canceled"]);

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const limitFlag = args.indexOf("--limit");
const limit = limitFlag >= 0 ? Number(args[limitFlag + 1]) : Infinity;

const KEY_ID = process.env.HF_API_KEY_ID;
const KEY_SECRET = process.env.HF_API_KEY_SECRET;

/** Never logged, never written to the manifest. */
const authHeaders = () => ({
  Authorization: `Key ${KEY_ID}:${KEY_SECRET}`,
  "Content-Type": "application/json",
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pollUntilTerminal(statusUrl) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  let payload = {};

  while (Date.now() < deadline) {
    await sleep(POLL_INTERVAL_MS);
    const res = await fetch(statusUrl, { headers: authHeaders() });
    payload = await res.json();
    if (TERMINAL.has(payload.status)) return payload;
  }
  return { ...payload, status: "timeout" };
}

async function generate(entry) {
  const res = await fetch(`${BASE}/${MODEL}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ prompt: entry.prompt }),
  });

  if (!res.ok) {
    const detail = await res.text();
    // 403 not_enough_credits is the common one. Surface it plainly rather than
    // burning the rest of the batch discovering the same thing 65 more times.
    throw new Error(`HTTP ${res.status}: ${detail.slice(0, 200)}`);
  }

  const job = await res.json();
  if (!job.status_url) throw new Error("no status_url in job response");

  const result = await pollUntilTerminal(job.status_url);
  if (result.status !== "completed") {
    throw new Error(`${result.status}: ${result.error ?? "no detail"}`);
  }

  const url = result.images?.[0]?.url ?? result.image?.url;
  if (!url) throw new Error("completed but no image url");

  return { url, requestId: job.request_id };
}

async function download(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());

  await fsp.mkdir(path.dirname(outPath), { recursive: true });

  // Cover-crop to the target box, then encode with the same settings the
  // existing optimiser uses so generated and photographed assets match.
  await sharp(buf)
    .resize({ ...TARGET, fit: "cover", position: "attention" })
    .webp(QUALITY_SETTINGS.webp)
    .toFile(outPath);

  return (await fsp.stat(outPath)).size;
}

async function run() {
  const manifest = buildManifest();
  // Keep these two counts separate. Folding --limit into the skip count made
  // the script report 65 covers "already on disk" when none existed.
  const missing = manifest.filter((e) => !fs.existsSync(e.outPath));
  const onDisk = manifest.length - missing.length;
  const pending = missing.slice(0, limit);

  console.log(`model      : ${MODEL}`);
  console.log(`slots      : ${manifest.length} total, ${onDisk} already on disk, ${missing.length} missing`);
  console.log(`to generate: ${pending.length}${limit !== Infinity ? ` (capped by --limit ${limit})` : ""}`);

  if (dryRun) {
    console.log("\n--dry-run, no API calls\n");
    for (const e of pending.slice(0, 5)) {
      console.log(`  ${e.id}\n    ${e.category} -> ${e.outPath}\n    ${e.prompt.slice(0, 110)}…`);
    }
    if (pending.length > 5) console.log(`  … and ${pending.length - 5} more`);
    return;
  }

  if (!KEY_ID || !KEY_SECRET) {
    console.error("HF_API_KEY_ID / HF_API_KEY_SECRET not set. Run with --env-file=.env");
    process.exit(1);
  }
  if (pending.length === 0) return;

  const records = [];
  const failures = [];
  let index = 0;

  async function worker() {
    while (index < pending.length) {
      const entry = pending[index++];
      try {
        const { url, requestId } = await generate(entry);
        const bytes = await download(url, entry.outPath);
        records.push({
          id: entry.id,
          category: entry.category,
          model: MODEL,
          prompt: entry.prompt,
          requestId,
          generatedAt: new Date().toISOString().slice(0, 10),
          usedBy: entry.usedBy,
          bytes,
        });
        console.log(`  ok   ${entry.id} (${(bytes / 1024).toFixed(0)}KB)`);
      } catch (err) {
        failures.push({ id: entry.id, reason: err.message });
        console.log(`  FAIL ${entry.id}: ${err.message}`);
        // Credit exhaustion applies to every remaining call. Stop the batch.
        if (/not_enough_credits|HTTP 401|HTTP 403/.test(err.message)) {
          index = pending.length;
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Merge into any existing provenance record rather than overwriting it.
  const manifestPath = "public/generated/manifest.json";
  let existing = [];
  if (fs.existsSync(manifestPath)) {
    existing = JSON.parse(await fsp.readFile(manifestPath, "utf8"));
  }
  const merged = [...existing.filter((e) => !records.some((r) => r.id === e.id)), ...records];
  await fsp.mkdir(path.dirname(manifestPath), { recursive: true });
  await fsp.writeFile(manifestPath, JSON.stringify(merged, null, 2) + "\n");

  console.log(`\ngenerated ${records.length}, failed ${failures.length}`);
  if (failures.length) process.exitCode = 1;
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
