#!/usr/bin/env node
/**
 * Pinterest pin image generator (Phase 2 §5 / Phase 3 §6.5).
 *
 * Generates branded 1000x1500 PNG pins for content pages using the Home Storage Guide
 * design system. This is INFRASTRUCTURE: run it when ready to produce image assets.
 *
 * Usage:
 *   node scripts/generate-pins.mjs                # generate pins for all pinnable pages
 *   node scripts/generate-pins.mjs --slug <part>  # only pages whose urlPath contains <part>
 *   node scripts/generate-pins.mjs --dry-run      # list pages without writing files
 *
 * Output: public/pins/<urlPath-slugged>.png (matches lib/pins.ts pinPath()).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_ROOT = path.join(ROOT, "content");
const OUT_DIR = path.join(ROOT, "public", "pins");

const PIN_WIDTH = 1000;
const PIN_HEIGHT = 1500;

/* Design system tokens (Phase 2 §1.1). */
const COLORS = {
  green600: "#2E7D4F",
  green700: "#1F5B39",
  amber600: "#B5712F",
  paper: "#FFFFFF",
  ink900: "#1B1B1B",
  ink500: "#5C6B5F",
  line: "#E4E7E2",
};

/* Content templates that are pinnable. */
const PINNABLE_TEMPLATES = new Set(["shelfLife", "guide", "pantryGuide"]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function pinFileName(urlPath) {
  return `${urlPath.replace(/^\/+|\/+$/g, "").replace(/\//g, "-")}.png`;
}

function escXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Build an SVG string for one pin. Title is wrapped into up to N lines. */
function pinSvg({ kicker, title, shelfLife, url }) {
  const lines = wrap(title, 24, 3);
  const lineHeight = 92;
  const titleBlockHeight = lines.length * lineHeight;
  const titleY = 520;
  const shelfY = 1080;

  const shelfRows = [
    { label: "Pantry", value: shelfLife?.pantry ?? "—" },
    { label: "Fridge", value: shelfLife?.fridge ?? "—" },
    { label: "Freezer", value: shelfLife?.freezer ?? "—" },
  ]
    .filter((r) => r.value !== "—")
    .map(
      (r, i) => `
      <g>
        <text x="90" y="${shelfY + i * 96}" font-family="Plus Jakarta Sans, Inter, Arial, sans-serif" font-size="34" font-weight="600" fill="#5C6B5F">${escXml(r.label)}</text>
        <text x="910" y="${shelfY + i * 96}" font-family="Plus Jakarta Sans, Inter, Arial, sans-serif" font-size="38" font-weight="700" fill="#FFFFFF" text-anchor="end">${escXml(r.value)}</text>
        <line x1="90" x2="910" y1="${shelfY + i * 96 + 28}" y2="${shelfY + i * 96 + 28}" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="2"/>
      </g>`,
    )
    .join("");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${PIN_WIDTH}" height="${PIN_HEIGHT}" viewBox="0 0 ${PIN_WIDTH} ${PIN_HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${COLORS.green700}"/>
      <stop offset="1" stop-color="${COLORS.green600}"/>
    </linearGradient>
  </defs>
  <rect width="${PIN_WIDTH}" height="${PIN_HEIGHT}" fill="url(#bg)"/>
  <rect x="60" y="60" width="880" height="1380" rx="24" fill="none" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="2"/>
  <circle cx="880" cy="180" r="220" fill="#FFFFFF" fill-opacity="0.06"/>
  <g>
    <rect x="90" y="300" rx="12" fill="${COLORS.amber600}"/>
    <text x="112" y="338" font-family="Plus Jakarta Sans, Inter, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="2" fill="${COLORS.paper}">${escXml(kicker ?? "SHELF LIFE")}</text>
  </g>
  ${lines
    .map(
      (line, i) =>
        `<text x="90" y="${titleY + i * lineHeight}" font-family="Plus Jakarta Sans, Inter, Arial, sans-serif" font-size="78" font-weight="800" fill="${COLORS.paper}">${escXml(line)}</text>`,
    )
    .join("")}
  <text x="90" y="${titleY + titleBlockHeight + 48}" font-family="Plus Jakarta Sans, Inter, Arial, sans-serif" font-size="30" font-weight="400" fill="#FFFFFF" fill-opacity="0.85">How long it lasts &amp; how to store it right</text>
  <text x="90" y="${PIN_HEIGHT - 120}" font-family="Plus Jakarta Sans, Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="${COLORS.paper}">Home Storage Guide</text>
  <text x="90" y="${PIN_HEIGHT - 72}" font-family="Plus Jakarta Sans, Inter, Arial, sans-serif" font-size="26" fill="#FFFFFF" fill-opacity="0.7">${escXml(url)}</text>
  ${shelfRows}
</svg>`;
}

/** Split text into lines of at most maxChars, up to maxLines. */
function wrap(text, maxChars, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const candidate = cur ? `${cur} ${w}` : w;
    if (candidate.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = candidate;
    }
    if (lines.length === maxLines) break;
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const slugFilter = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

  const pages = walk(CONTENT_ROOT)
    .map((file) => {
      const { data } = matter(fs.readFileSync(file, "utf8"));
      return data;
    })
    .filter((fm) => fm && fm.urlPath && PINNABLE_TEMPLATES.has(fm.template))
    .filter((fm) => (slugFilter ? fm.urlPath.includes(slugFilter) : true));

  if (!pages.length) {
    console.log("No pinnable pages matched.");
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const fm of pages) {
    const fileName = pinFileName(fm.urlPath);
    const outPath = path.join(OUT_DIR, fileName);
    if (dryRun) {
      console.log(`would write ${outPath}`);
      continue;
    }
    const svg = pinSvg({
      kicker: fm.kicker ?? fm.badge,
      title: fm.foodName ?? fm.title ?? fm.h1,
      shelfLife: fm.shelfLife,
      url: `homestorageguide.com${fm.urlPath}`,
    });
    await sharp(Buffer.from(svg)).resize(PIN_WIDTH, PIN_HEIGHT).png().toFile(outPath);
    console.log(`wrote ${outPath}`);
  }
  console.log(`\nDone. ${dryRun ? "Dry run — no files written." : `${pages.length} pin(s) generated.`}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
