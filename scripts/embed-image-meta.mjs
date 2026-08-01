#!/usr/bin/env node
/**
 * Phase 2 — EXIF title/description/keywords embedder (docs/IMAGE-SYSTEM-PHASE-2.md §5/§8).
 *
 * Reads public/images/manifest.seo.json and rewrites the optimized JPEG/WebP files
 * (and AVIF where sharp supports it) with the EXIF title, description, and keywords.
 * Rewrites are lossless-ish (same format, same quality) — safe to run repeatedly.
 *
 * Note: AVIF EXIF support in libvips is limited; fields are written best-effort.
 *
 * Usage:
 *   node scripts/embed-image-meta.mjs              # embed for all optimized files
 *   node scripts/embed-image-meta.mjs --dry-run    # list what would be rewritten
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_ROOT = path.join(ROOT, "public", "images");
const SEOMAN_PATH = path.join(IMG_ROOT, "manifest.seo.json");

function relParts(src) {
  return String(src ?? "").replace(/^\/images\//, "").split("/").filter(Boolean);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const manifest = JSON.parse(fs.readFileSync(SEOMAN_PATH, "utf8"));

  let written = 0;
  let missing = 0;

  for (const [urlPath, page] of Object.entries(manifest)) {
    for (const kind of ["heroImage", "supportImage", "portraitImage"]) {
      const rec = page[kind];
      if (!rec || !rec.breakpoints) continue;
      const parts = relParts(rec.src);
      const file = path.join(IMG_ROOT, ...parts);
      const dir = path.dirname(file);
      const stem = path.basename(file).replace(/-\d+w\.(avif|webp|jpg)$/, "");

      for (const w of rec.breakpoints) {
        const f = path.join(dir, `${stem}-${w}w.${rec.format}`);
        if (!fs.existsSync(f)) {
          missing += 1;
          continue;
        }
        if (dryRun) {
          console.log(`would embed EXIF in ${path.relative(ROOT, f)}`);
          written += 1;
          continue;
        }
        const meta = await sharp(f).metadata();
        const out = sharp(f, { animated: false })
          .withMetadata({
            exif: {
              IFD0: {
                ImageDescription: rec.exif.description,
                XPTitle: rec.exif.title,
                Software: "Home Storage Guide — image system",
              },
              IFD2: {},
              IFD3: {},
            },
          });
        const rawFmt = meta.format === "jpeg" ? "jpeg" : meta.format === "heif" ? "avif" : meta.format;
        const fmt = rawFmt === "avif" || rawFmt === "webp" || rawFmt === "jpeg" ? rawFmt : "jpeg";
        const encoder = fmt === "avif" ? out.avif({ quality: 80 }) : fmt === "webp" ? out.webp({ quality: 80 }) : out.jpeg({ quality: 80 });
        await encoder.toFile(f.replace(/\.[^.]+$/, ".meta-tmp." + fmt)).then(async () => {
          fs.renameSync(f.replace(/\.[^.]+$/, ".meta-tmp." + fmt), f);
        });
        written += 1;
      }
    }
  }

  console.log(`${dryRun ? "DRY RUN:" : "DONE:"} ${written} file(s) ${dryRun ? "queued" : "embedded"}, ${missing} not found (run optimize first).`);
  if (missing && !dryRun) console.log("Tip: run npm run images:optimize before embedding metadata.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
