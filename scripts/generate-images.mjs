#!/usr/bin/env node
/**
 * Pollinations source-image generator.
 *
 * Produces the photorealistic master photos in public/images/source/ from the
 * curated prompts in public/images/prompts/ using Pollinations AI
 * (https://image.pollinations.ai/prompt/... — anonymous, no API key required).
 *
 * For every asset declared in public/images/manifest.json this script:
 *   1. reads the matching prompt (public/images/prompts/<page>/<kind>.txt,
 *      falling back to the asset's embedded prompt field)
 *   2. appends the house style suffix (hero/support/og/pin only; author
 *      portraits are excluded so faces are not styled as food)
 *   3. requests the image at the asset's target dimensions
 *   4. verifies the response is real image bytes (JPEG/PNG/WebP)
 *   5. writes it to the asset's source path, e.g. public/images/source/<page>/hero.jpg
 *
 * Pollinations' anonymous tier caps output at ~0.6MP while preserving the
 * requested aspect ratio, so files are saved as-is; scripts/optimize-images.mjs
 * handles the final geometry (crop/upscale) and responsive variants.
 *
 * Flags:
 *   --check        dry run: print the plan without hitting the network
 *   --limit N      only the first N missing images (smoke test)
 *   --page X       only assets whose page path includes X
 *   --force        regenerate images that already exist on disk
 *   --suffix       append the house-style suffix (default off: the prompt
 *                  files already carry the full house style)
 *   --no-suffix    explicitly disable the suffix (inverts --suffix)
 *   --retries N    download attempts per image (default 3)
 *   --timeout MS   per-attempt timeout (default 60000)
 *   --no-delay     skip the polite minimum gap between request starts
 *   --no-pipeline  do not run optimize -> meta -> validate afterwards
 *
 * On success it runs the production pipeline:
 *   npm run images:optimize -> images:meta -> images:validate --strict
 *
 * Exit codes: 0 ok · 1 any image failed to generate or the pipeline failed.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_ROOT = path.join(ROOT, "public", "images");
const PROMPTS_DIR = path.join(IMG_ROOT, "prompts");
const SOURCE_DIR = path.join(IMG_ROOT, "source");
const MANIFEST_PATH = path.join(IMG_ROOT, "manifest.json");

const API = "https://image.pollinations.ai/prompt/";
const MAX_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 60000;
const MIN_REQUEST_GAP_MS = 15000;

const KIND_PROMPT = { hero: "featured", support: "support", pin: "pinterest", og: "og", portrait: "portrait" };

const STYLE_SUFFIX =
  "Ultra realistic food photography, natural daylight, editorial cooking magazine, high detail, clean kitchen, soft shadows, 35mm, professional food styling, commercial quality, no text, no watermark, no logo, no people unless requested, real ingredients, photorealistic.";

function parseArgs(argv) {
  const args = { check: false, force: false, suffix: false, noDelay: false, noPipeline: false, limit: null, page: null, retries: MAX_ATTEMPTS, timeout: DEFAULT_TIMEOUT_MS };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--check") args.check = true;
    else if (a === "--force") args.force = true;
    else if (a === "--suffix") args.suffix = true;
    else if (a === "--no-suffix") args.suffix = false;
    else if (a === "--no-delay") args.noDelay = true;
    else if (a === "--no-pipeline") args.noPipeline = true;
    else if (a === "--limit") args.limit = Number(argv[++i]);
    else if (a === "--page") args.page = argv[++i];
    else if (a === "--retries") args.retries = Math.max(1, Number(argv[++i]));
    else if (a === "--timeout") args.timeout = Math.max(5000, Number(argv[++i]));
    else {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

function hashSeed(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 2147483647;
}

function loadJobs() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const jobs = [];
  for (const [urlPath, entry] of Object.entries(manifest)) {
    const rel = String(urlPath).replace(/^\/|\/$/g, "");
    for (const [kind, asset] of Object.entries(entry.assets)) {
      const file = String(asset.source).split("/").pop();
      const sourcePath = path.join(SOURCE_DIR, rel, file);
      const promptFile = path.join(PROMPTS_DIR, rel, `${KIND_PROMPT[kind]}.txt`);
      let promptText = fs.existsSync(promptFile) ? fs.readFileSync(promptFile, "utf8").trim() : null;
      if (!promptText) promptText = String(asset.prompt ?? "").trim();
      if (promptText.endsWith(".")) promptText = promptText.slice(0, -1);
      jobs.push({
        urlPath,
        kind,
        rel,
        sourcePath,
        width: Number(asset.width),
        height: Number(asset.height),
        promptText,
        seed: hashSeed(`${urlPath}:${kind}`),
      });
    }
  }
  return jobs;
}

async function looksLikeImage(buf) {
  if (!buf || buf.length < 1024) return false;
  if (buf.length > 15 && buf.readUInt32BE(0) === 0xffd8ffe0) return true;
  if (buf.length > 8 && buf.readUInt32BE(0) === 0x89504e47) return true;
  if (buf.length > 12 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return true;
  return false;
}

let lastRequestStart = 0;

async function waitGap(args) {
  if (args.noDelay) return;
  const wait = Math.max(0, MIN_REQUEST_GAP_MS - (Date.now() - lastRequestStart));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
}

async function download(url, args) {
  const res = await fetch(url, { signal: AbortSignal.timeout(args.timeout), redirect: "follow" });
  if (res.status === 402 || res.status === 429) {
    const retryAfter = Number(res.headers.get("retry-after")) || 15000;
    await new Promise((r) => setTimeout(r, retryAfter));
    throw new Error(`rate-limited (HTTP ${res.status}); waiting ${Math.round(retryAfter / 1000)}s`);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ctype = String(res.headers.get("content-type") ?? "");
  if (!ctype.includes("image")) throw new Error(`non-image content-type "${ctype}"`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!looksLikeImage(buf)) throw new Error("response is not valid image bytes");
  await sharp(buf).metadata();
  return buf;
}

async function generateOne(job, args) {
  const prompt = args.suffix ? `${job.promptText}, ${STYLE_SUFFIX}` : job.promptText;
  const url = `${API}${encodeURIComponent(prompt)}?width=${job.width}&height=${job.height}&nologo=true&seed=${job.seed}`;
  let lastErr = null;
  for (let attempt = 1; attempt <= args.retries; attempt++) {
    await waitGap(args);
    lastRequestStart = Date.now();
    const started = Date.now();
    try {
      const buf = await download(url, args);
      fs.mkdirSync(path.dirname(job.sourcePath), { recursive: true });
      fs.writeFileSync(job.sourcePath, buf);
      const meta = await sharp(buf).metadata();
      return { ok: true, attempt, took: Date.now() - started, w: meta.width, h: meta.height };
    } catch (err) {
      lastErr = err;
      if (attempt < args.retries) {
        const backoff = 2000 * 2 ** (attempt - 1) + Math.floor(Math.random() * 1000);
        await new Promise((r) => setTimeout(r, backoff));
      }
    }
  }
  return { ok: false, error: lastErr ? lastErr.message : "unknown error" };
}

function runStep(script, extraArgs) {
  return new Promise((resolve) => {
    const args = [path.join(ROOT, "scripts", script), ...(extraArgs ?? [])];
    const child = spawn(process.execPath, args, { stdio: "inherit", cwd: ROOT });
    child.on("exit", (code) => resolve(code ?? 1));
    child.on("error", () => resolve(1));
  });
}

async function runPipeline() {
  const steps = [
    ["optimize-images.mjs", []],
    ["embed-image-meta.mjs", []],
    ["validate-images.mjs", ["--strict"]],
  ];
  const results = [];
  for (const [script, extra] of steps) {
    const code = await runStep(script, extra);
    results.push({ script, code });
    if (code !== 0) {
      console.log(`\n[images:generate] ${script} exited ${code} — pipeline aborted.`);
      return results;
    }
  }
  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const jobs = loadJobs();
  const pending = jobs.filter((j) => !fs.existsSync(j.sourcePath));
  const skipped = jobs.length - pending.length;

  console.log(`Pollinations generator · ${jobs.length} asset(s) · ${skipped} already on disk`);

  if (args.check) {
    console.log("\nDry run — nothing will be downloaded. Missing masters:");
    let shown = 0;
    for (const j of pending) {
      if (args.page && !j.urlPath.includes(args.page)) continue;
      console.log(`  ${j.rel}/${path.basename(j.sourcePath)}  (${j.kind} ${j.width}x${j.height})`);
      shown++;
    }
    console.log(`\nWould generate ${shown} image(s).`);
    return;
  }

  const work = pending.filter((j) => !args.page || j.urlPath.includes(args.page));
  if (args.limit != null) work.length = Math.min(work.length, args.limit);
  const target = jobs.length;

  let generated = 0;
  let failed = 0;
  const failures = [];
  const started = Date.now();

  console.log(`Generating ${work.length} image(s) via Pollinations (${work.length} of ${target} total, ${skipped} skipped).\n`);

  for (let i = 0; i < work.length; i++) {
    const job = work[i];
    const label = `${job.rel}/${path.basename(job.sourcePath)}`;
    process.stdout.write(`[${i + 1}/${work.length}] ${job.kind} ${label} (${job.width}x${job.height}) ... `);
    const result = await generateOne(job, args);
    if (result.ok) {
      generated++;
      console.log(`ok ${result.w}x${result.h} in ${(result.took / 1000).toFixed(1)}s (attempt ${result.attempt})`);
    } else {
      failed++;
      failures.push(label);
      console.log(`FAIL after ${args.retries} attempt(s): ${result.error}`);
    }
  }

  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`\nFinished in ${elapsed}s — Total ${target} · Generated ${generated} · Skipped ${skipped} · Failed ${failed}`);
  if (failures.length) {
    console.log("\nFailed images (re-run the script to retry only these):");
    for (const f of failures) console.log(`  - ${f}`);
  }

  if (!args.noPipeline && (generated > 0 || skipped > 0)) {
    console.log("\nRunning production pipeline (optimize -> meta -> validate --strict):\n");
    const results = await runPipeline();
    for (const { script, code } of results) console.log(`[images:generate] ${script} -> exit ${code}`);
  } else if (args.noPipeline) {
    console.log("\nSkipping pipeline (--no-pipeline).");
  }

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
