#!/usr/bin/env node
/**
 * Phase 2 — image quality validation (docs/IMAGE-SYSTEM-PHASE-2.md §6).
 *
 * Reads public/images/manifest.seo.json and runs deterministic machine checks:
 *   - filename naming-rule conformance
 *   - alt length / leading-word / uniqueness rules
 *   - within-page hero/support alt collisions
 *   - file presence per breakpoint (only when files exist on disk)
 *   - encoded dimensions vs declared size
 *   - encodingFormat vs extension
 *   - file-size sanity bounds
 *   - duplicate-content detection (md5)
 *   - EXIF title/description presence (after `npm run images:meta`)
 *
 * The 9 human-review gates are emitted as `pending` for every asset.
 *
 * Usage:
 *   node scripts/validate-images.mjs            # report, exit 0
 *   node scripts/validate-images.mjs --strict   # exit 1 when machine checks fail
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_ROOT = path.join(ROOT, "public", "images");
const SEOMAN_PATH = path.join(IMG_ROOT, "manifest.seo.json");

const SIZEBOUNDS = { avif: [5, 400], webp: [5, 500], jpg: [10, 800] };
const FILENAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*-(hero|support(?:-[0-9]+)?|pinterest|og|portrait)\.(avif|webp|jpg)$/;
const BAD_ALT_START = /^(image of|photo of|picture of|a photo of|an image of)\s/i;

function relParts(src) {
  return String(src ?? "").replace(/^\/images\//, "").split("/").filter(Boolean);
}

async function main() {
  const args = process.argv.slice(2);
  const strict = args.includes("--strict");

  const manifest = JSON.parse(fs.readFileSync(SEOMAN_PATH, "utf8"));
  const pages = Object.entries(manifest);
  const records = [];
  for (const [urlPath, page] of pages) {
    for (const kind of ["heroImage", "supportImage", "pinterestImage", "ogImage", "portraitImage"]) {
      const rec = page[kind];
      if (rec) records.push({ urlPath, kind: kind.replace("Image", ""), rec });
    }
  }

  const problems = [];
  const md5s = new Map();
  const altSeen = new Map();
  let files = 0;
  let anyFile = false;

  for (const { urlPath, kind, rec } of records) {
    const alt = String(rec.alt ?? "");
    if (!FILENAME_RE.test(rec.filename)) {
      problems.push(`${urlPath} [${kind}] filename '${rec.filename}' violates naming rule`);
    }
    if (alt.length < 40 || alt.length > 125) problems.push(`${urlPath} [${kind}] alt length ${alt.length} outside 40-125`);
    if (BAD_ALT_START.test(alt)) problems.push(`${urlPath} [${kind}] alt starts with 'image of/photo of'`);

    const prior = altSeen.get(alt);
    if (prior && prior !== urlPath) problems.push(`${urlPath} [${kind}] duplicate alt (also on ${prior})`);
    else altSeen.set(alt, urlPath);
  }

  for (const [urlPath, page] of pages) {
    const hero = page.heroImage;
    const support = page.supportImage;
    if (hero && support && hero.alt && hero.alt === support.alt) {
      problems.push(`${urlPath} hero and support share the same alt`);
    }
  }

  const parts = records.map(({ rec }) => relParts(rec.src));
  for (const partsOf of parts) {
    const f = path.join(IMG_ROOT, ...partsOf);
    if (fs.existsSync(f)) anyFile = true;
  }

  if (anyFile) {
    for (const { urlPath, kind, rec } of records) {
      const partsOf = relParts(rec.src);
      const file = path.join(IMG_ROOT, ...partsOf);
      const dir = path.dirname(file);
      const stem = path.basename(file).replace(/-\d+w\.(avif|webp|jpg)$/, "");

      if (rec.breakpoints && rec.breakpoints.length) {
        for (const w of rec.breakpoints) {
          const f = path.join(dir, `${stem}-${w}w.${rec.format}`);
          if (!fs.existsSync(f)) {
            problems.push(`${urlPath} [${kind}] missing ${path.basename(f)}`);
            continue;
          }
          files += 1;
          const meta = await sharp(f).metadata();
          const expectedH = Math.round((rec.height / rec.width) * w);
          if (meta.width !== w || meta.height !== expectedH) {
            problems.push(`${urlPath} [${kind}] ${path.basename(f)}: ${meta.width}x${meta.height} != ${w}x${expectedH}`);
          }
          const fmt = meta.format === "jpeg" ? "jpg" : meta.format;
          if (fmt !== rec.format) {
            problems.push(`${urlPath} [${kind}] ${path.basename(f)}: format ${fmt} != ${rec.format}`);
          }
          const kb = meta.size / 1024;
          const [lo, hi] = SIZEBOUNDS[rec.format];
          if (kb < lo || kb > hi) {
            problems.push(`${urlPath} [${kind}] ${path.basename(f)}: ${kb.toFixed(0)}KB outside ${lo}-${hi}KB`);
          }
          if (!meta.exif) {
            problems.push(`${urlPath} [${kind}] ${path.basename(f)}: no EXIF (run npm run images:meta)`);
          }
          const hash = crypto.createHash("md5").update(fs.readFileSync(f)).digest("hex");
          if (md5s.has(hash)) problems.push(`${urlPath} [${kind}] duplicate content of ${md5s.get(hash)}`);
          else md5s.set(hash, path.basename(f));
        }
      } else if (fs.existsSync(file)) {
        files += 1;
        const meta = await sharp(file).metadata();
        const fmt = meta.format === "jpeg" ? "jpg" : meta.format;
        if (fmt !== rec.format) problems.push(`${urlPath} [${kind}] ${path.basename(file)}: format ${fmt} != ${rec.format}`);
        if (meta.width !== rec.width || meta.height !== rec.height) {
          problems.push(`${urlPath} [${kind}] ${path.basename(file)}: ${meta.width}x${meta.height} != ${rec.width}x${rec.height}`);
        }
      } else {
        problems.push(`${urlPath} [${kind}] missing ${path.basename(file)}`);
      }
    }
  }

  const dedup = [...new Set(problems)];
  const anyDupes = dedup.some((p) => p.includes("duplicate alt"));
  console.log(`Assets checked: ${records.length} · files on disk: ${files}`);
  if (anyFile) {
    console.log(`Optimized files present — running full file checks.`);
  } else {
    console.log(`No optimized files on disk yet — file checks skipped (run npm run images:optimize first).`);
  }
  if (dedup.length) {
    console.log(`\n${dedup.length} problem(s):`);
    for (const p of dedup) console.log(`  - ${p}`);
    if (anyDupes) console.log("\nHint: duplicate alt text must be unique per page — rewrite by hand or re-run the SEO generator after fixing templates.");
  } else {
    console.log("No machine-check problems found.");
  }
  console.log(`\nHuman-review gates pending for ${records.length} asset(s) — see public/images/qa/qa-gates.csv`);

  if (strict && dedup.length) {
    console.error("\nSTRICT: machine checks failed.");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
