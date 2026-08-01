#!/usr/bin/env node
/**
 * Image optimization pipeline (docs/IMAGE-SYSTEM.md §8-9).
 *
 * Reads public/images/manifest.json, finds source masters under public/images/source/,
 * and generates optimized variants:
 *   - hero/support/portrait -> AVIF + WebP + JPEG at responsive widths (optimized/)
 *   - pin  -> 1000x1500 JPEG (pins/)  — derived from hero master when no pin source
 *   - og   -> 1200x630 JPEG (og/)     — derived from hero master when no og source
 * Then updates the manifest so components render automatically.
 *
 * Usage:
 *   node scripts/optimize-images.mjs             # optimize everything that has a source
 *   node scripts/optimize-images.mjs --check     # report missing sources, write nothing
 *   node scripts/optimize-images.mjs --slug X    # only pages whose urlPath contains X
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_ROOT = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(IMG_ROOT, "manifest.json");

const HERO_WIDTHS = [400, 800, 1200, 1600];
const SUPPORT_WIDTHS = [400, 800, 1200];
const PORTRAIT_WIDTHS = [300, 600];

const EXTS = ["jpg", "jpeg", "png", "webp"];

function findSource(asset) {
  if (!asset || !asset.source) return null;
  const rel = String(asset.source).replace(/^\/images\/source\//, "");
  const parts = rel.split("/");
  const fileBase = parts.pop().split(".")[0];
  const dir = path.join(IMG_ROOT, "source", ...parts);
  for (const ext of EXTS) {
    const p = path.join(dir, `${fileBase}.${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const slugFilter = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  let optimized = 0;
  let missing = 0;
  const report = [];

  for (const [urlPath, entry] of Object.entries(manifest)) {
    if (slugFilter && !urlPath.includes(slugFilter)) continue;
    for (const [kind, asset] of Object.entries(entry.assets)) {
      const key = path.join(IMG_ROOT, "optimized", asset.key);
      const pinDir = path.join(IMG_ROOT, "pins");
      const ogDir = path.join(IMG_ROOT, "og");
      const heroSource = findSource(entry.assets.hero);
      let source = findSource(asset);

      if (!source && (kind === "pin" || kind === "og")) source = heroSource;
      if (!source) {
        missing += 1;
        report.push(`missing  ${urlPath}  (${kind})`);
        continue;
      }

      if (check) continue;

      fs.mkdirSync(key, { recursive: true });
      fs.mkdirSync(pinDir, { recursive: true });
      fs.mkdirSync(ogDir, { recursive: true });

      if (kind === "hero" || kind === "support" || kind === "portrait") {
        const widths = kind === "hero" ? HERO_WIDTHS : kind === "support" ? SUPPORT_WIDTHS : PORTRAIT_WIDTHS;
        const [w, h] = [asset.width, asset.height];
        const base = await sharp(source).resize(w, h, { fit: "cover", position: "centre" }).rotate().toBuffer();
        const variants = [];
        for (const width of widths) {
          const buffer = await sharp(base).resize({ width }).toBuffer();
          const out = `${path.join(key, asset.variant)}-${width}w`;
          await sharp(buffer).avif({ quality: 50 }).toFile(`${out}.avif`);
          await sharp(buffer).webp({ quality: 75 }).toFile(`${out}.webp`);
          await sharp(buffer).jpeg({ quality: 80, progressive: true }).toFile(`${out}.jpg`);
          variants.push({ width, avif: `/images/optimized/${asset.key}/${asset.variant}-${width}w.avif`, webp: `/images/optimized/${asset.key}/${asset.variant}-${width}w.webp`, jpg: `/images/optimized/${asset.key}/${asset.variant}-${width}w.jpg` });
        }
        asset.variants = variants;
        optimized += variants.length;
        report.push(`ok       ${urlPath}  (${kind}, ${variants.length} variants)`);
      } else if (kind === "pin") {
        await sharp(source).resize(1000, 1500, { fit: "cover", position: "top" }).rotate().jpeg({ quality: 82 }).toFile(path.join(pinDir, `${asset.key}-pin-1000x1500.jpg`));
        optimized += 1;
        report.push(`ok       ${urlPath}  (pin 1000x1500)`);
      } else if (kind === "og") {
        await sharp(source).resize(1200, 630, { fit: "cover", position: "centre" }).rotate().jpeg({ quality: 80 }).toFile(path.join(ogDir, `${asset.key}-og-1200x630.jpg`));
        optimized += 1;
        report.push(`ok       ${urlPath}  (og 1200x630)`);
      }
    }
  }

  if (!check) {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  }

  console.log(report.join("\n"));
  console.log(`\n${check ? "CHECK" : "DONE"}: ${optimized} file(s) written, ${missing} asset(s) missing a source master.`);
  if (missing) console.log("Drop masters into public/images/source/<page>/ then re-run.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
