#!/usr/bin/env node
/**
 * Phase 2 — SEO image optimization framework (docs/IMAGE-SYSTEM-PHASE-2.md).
 *
 * Reads Phase 1's public/images/manifest.json + the content tree and emits:
 *   - public/images/manifest.seo.json   (heroImage/supportImage/pinterestImage/ogImage per page)
 *   - public/images/seo-images.csv      (flat spreadsheet of every SEO field)
 *   - public/images/seo/imageobject/<page>/imageobject.json (ImageObject JSON-LD)
 *   - public/images/qa/qa-gates.csv     (machine + 9 human quality gates per asset)
 *   - public/images/qa/IMAGE-QA-CHECKLIST.md
 *
 * Usage:
 *   node scripts/generate-image-seo.mjs            # all pages
 *   node scripts/generate-image-seo.mjs --slug X   # pages whose urlPath contains X
 *
 * Pure extension — does not modify Phase 1 files, content, SEO, or components.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_ROOT = path.join(ROOT, "content");
const IMG_ROOT = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(IMG_ROOT, "manifest.json");
const OUT_PATH = path.join(IMG_ROOT, "manifest.seo.json");
const SEO_DIR = path.join(IMG_ROOT, "seo");
const QA_DIR = path.join(IMG_ROOT, "qa");

const SITE_URL = "https://homestorageguide.com";
const STYLE_NOTE = "Editorial photograph, bright natural light, premium magazine quality.";

const STOPWORDS = new Set([
  "how", "to", "does", "do", "long", "a", "an", "the", "in", "of", "your", "you",
  "it", "at", "and", "keep", "can", "i", "is", "with", "for", "from", "on", "its",
]);

const HUMAN_GATES = [
  "blurry-food",
  "duplicated-objects",
  "ai-artifacts",
  "wrong-shadows",
  "unrealistic-hands",
  "melted-textures",
  "incorrect-labels",
  "unreadable-containers",
  "unrealistic-fridge-interiors",
];

const KIND_CONFIG = {
  hero: { format: "avif", priority: true, loading: "eager", fetchPriority: "high", sizes: "(min-width: 1024px) 704px, 100vw", breakpoints: [400, 800, 1200, 1600] },
  support: { format: "avif", priority: false, loading: "lazy", fetchPriority: "auto", sizes: "(min-width: 1024px) 704px, 100vw", breakpoints: [400, 800, 1200] },
  pinterest: { format: "webp", priority: false, loading: "lazy", fetchPriority: "auto", sizes: null, breakpoints: null },
  og: { format: "jpg", priority: false, loading: "lazy", fetchPriority: "auto", sizes: null, breakpoints: null },
  portrait: { format: "webp", priority: false, loading: "lazy", fetchPriority: "auto", sizes: "240px", breakpoints: [300, 600] },
};

const KIND_MAP = { hero: "hero", support: "support", pin: "pinterest", og: "og", portrait: "portrait" };

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function slug(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function shortKey(fm) {
  if (fm.template === "shelfLife" && fm.foodName) return slug(fm.foodName).slice(0, 22) + "-storage";
  const words = slug(fm.title ?? fm.h1 ?? "").split("-").filter((w) => w && !STOPWORDS.has(w));
  let base = words.join("-");
  if (!base) {
    base = slug(fm.urlPath.replace(/[/]+/g, " ")).split("-").filter((w) => w && !STOPWORDS.has(w)).join("-");
  }
  return base.slice(0, 28) || "food-storage";
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function imageTitle(alt) {
  return cap(String(alt).replace(/\.\s*$/, ""));
}

function descriptionFor(subject, scene) {
  const sceneClause = String(scene ?? "").replace(/,/g, " ").replace(/\s{2,}/g, " ").trim();
  const core = sceneClause ? `${cap(subject)} ${sceneClause}` : `${cap(subject)} in a modern kitchen pantry`;
  return `${core}. ${STYLE_NOTE}`.slice(0, 180);
}

function keywordsFor(fm, subject, kind) {
  const fromLsi = Array.isArray(fm.lsi) ? fm.lsi.slice(0, 5) : [];
  const generic = [`${slug(subject)} storage`, "food storage", "shelf life", kind === "pinterest" ? "pinterest food storage" : "how to store food"];
  const kw = [...fromLsi, ...generic].map((k) => String(k).trim()).filter((k, i, a) => k && a.indexOf(k) === i);
  return kw.slice(0, 8);
}

function filenameFor(kind, key, index) {
  switch (kind) {
    case "hero":
      return `${key}-hero.avif`;
    case "support":
      return `${key}-support-${index}.avif`;
    case "pinterest":
      return `${key}-pinterest.webp`;
    case "og":
      return `${key}-og.jpg`;
    case "portrait":
      return `${key}-portrait.webp`;
  }
}

function srcsetFor(kind, filename, breakpoints) {
  if (!breakpoints) return null;
  const base = filename.replace(/\.(avif|webp|jpg)$/, "");
  const fmt = filename.split(".").pop();
  return breakpoints.map((w) => `${base}-${w}w.${fmt} ${w}w`);
}

function actualSrc(asset) {
  const vars = asset.variants;
  if (vars && vars.length) return vars[vars.length - 1].avif;
  if (asset.basePath.endsWith(".jpg")) return asset.basePath;
  const maxW = Math.max(...(asset.widths ?? [1600]));
  return `${asset.basePath}-${maxW}w.avif`;
}

function imageObject(asset, record, fm, kind, index) {
  const src = SITE_URL + actualSrc(asset);
  return {
    "@type": "ImageObject",
    "@id": src,
    url: src,
    contentUrl: src,
    name: record.title,
    ...(record.caption ? { caption: record.caption } : {}),
    description: record.description,
    width: record.width,
    height: record.height,
    encodingFormat: `image/${record.format}`,
    representativeOfPage: kind === "hero",
  };
}

function buildRecord(fm, asset, kind, index, keywords) {
  const cfg = KIND_CONFIG[kind];
  const subject = asset.subject ?? fm.foodName ?? "food";
  const scene = asset.scene;
  const filename = filenameFor(kind, shortKey(fm), index);
  const isAuthor = String(fm.urlPath ?? "").startsWith("/authors/") || fm.template === "author";
  const alt =
    kind === "portrait" && isAuthor && fm.role
      ? `Portrait of ${fm.h1 ?? fm.title}, ${fm.role}`
      : asset.alt;
  const title = kind === "pinterest" ? `${fm.h1 ?? fm.title}: Shelf Life & Storage Guide` : imageTitle(alt);
  const description = descriptionFor(subject, scene);
  const src = actualSrc(asset);
  const format = String(src).split(".").pop();
  const record = {
    filename,
    title,
    alt,
    caption: asset.caption ?? null,
    description,
    width: asset.width,
    height: asset.height,
    format,
    priority: cfg.priority,
    loading: cfg.loading,
    fetchPriority: cfg.fetchPriority,
    decoding: "async",
    sizes: cfg.sizes,
    breakpoints: cfg.breakpoints,
    srcset: srcsetFor(kind, filename, cfg.breakpoints),
    exif: { title, description: `${description} ${alt}`, keywords },
    keywords,
    pinterest:
      kind === "pinterest"
        ? {
            title: `${fm.h1 ?? fm.title} — Pin It`,
            description: `${alt}. Save this shelf-life guide for later. ${SITE_URL}${fm.urlPath} #FoodStorage #${cap(fm.category ?? "Pantry")} #ShelfLife`,
          }
        : undefined,
    structuredData: null,
    src,
    quality: { status: "pending-human-review", machineChecks: [] },
  };
  record.structuredData = imageObject(asset, record, fm, kind, index);
  return record;
}

function main() {
  const args = process.argv.slice(2);
  const slugFilter = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const fmByUrl = {};
  for (const file of walk(CONTENT_ROOT)) {
    const { data } = matter(fs.readFileSync(file, "utf8"));
    if (data && data.urlPath) fmByUrl[data.urlPath] = data;
  }

  const seoManifest = {};
  const altSeen = new Map();
  const csv = [
    "page,url,template,kind,filename,title,alt,caption,description,width,height,format,exifTitle,exifDescription,keywords,pinterestTitle,pinterestDescription,srcset,src",
  ];
  const gates = [
    "page,url,kind,filename,machine-status," + HUMAN_GATES.join(","),
  ];

  for (const [urlPath, entry] of Object.entries(manifest)) {
    if (slugFilter && !urlPath.includes(slugFilter)) continue;
    const fm = fmByUrl[urlPath] ?? {};
    const subject = entry.assets.hero?.subject ?? fm.foodName ?? "food";
    const keywordKey = shortKey(fm);
    const keywords = keywordsFor(fm, subject, "hero");
    const page = {
      pageTitle: fm.title ?? urlPath,
      pageH1: fm.h1 ?? fm.title ?? urlPath,
      canonical: `${SITE_URL}${urlPath}`,
      subject,
      keywordKey,
      keywords,
      heroImage: null,
      supportImage: null,
      pinterestImage: null,
      ogImage: null,
      portraitImage: null,
      structuredData: [],
    };

    const supportIndex = { count: 0 };
    const kindOf = (a) => KIND_MAP[a.kind] ?? a.kind;
    for (const [kind, asset] of Object.entries(entry.assets)) {
      const mapped = kindOf(asset);
      const index = mapped === "support" ? (supportIndex.count += 1) : 1;
      const record = buildRecord(fm, asset, mapped, index, keywords);
      const field = `${mapped}Image`;
      page[field] = record;
      page.structuredData.push(record.structuredData);

      const exif = record.exif;
      csv.push(
        [
          urlPath,
          urlPath,
          fm.template ?? "",
          mapped,
          record.filename,
          `"${record.title.replace(/"/g, '""')}"`,
          `"${record.alt.replace(/"/g, '""')}"`,
          `"${String(record.caption ?? "").replace(/"/g, '""')}"`,
          `"${record.description.replace(/"/g, '""')}"`,
          record.width,
          record.height,
          record.format,
          `"${exif.title.replace(/"/g, '""')}"`,
          `"${exif.description.replace(/"/g, '""')}"`,
          `"${exif.keywords.join(" | ").replace(/"/g, '""')}"`,
          `"${String(record.pinterest?.title ?? "").replace(/"/g, '""')}"`,
          `"${String(record.pinterest?.description ?? "").replace(/"/g, '""')}"`,
          `"${(record.srcset ?? []).join(" | ")}"`,
          record.src,
        ].join(","),
      );
      gates.push([urlPath, urlPath, fm.template ?? "", mapped, record.filename, "pending", ...HUMAN_GATES.map(() => "pending")].join(","));
    }

    seoManifest[urlPath] = page;
    const jsonldDir = path.join(SEO_DIR, "imageobject", ...entry.key.split("/"));
    fs.mkdirSync(jsonldDir, { recursive: true });
    fs.writeFileSync(
      path.join(jsonldDir, "imageobject.json"),
      JSON.stringify({ "@context": "https://schema.org", "@graph": page.structuredData }, null, 2),
    );
  }

  for (const [url, page] of Object.entries(seoManifest)) {
    for (const field of ["heroImage", "supportImage", "pinterestImage", "ogImage", "portraitImage"]) {
      const rec = page[field];
      if (!rec) continue;
      const prior = altSeen.get(rec.alt);
      if (prior && prior !== url) {
        const suffix = page.keywordKey || page.subject.split(" ")[0].toLowerCase();
        rec.alt = `${rec.alt} — ${suffix}`;
        rec.title = imageTitle(rec.alt);
        rec.description = `${rec.alt}. ${STYLE_NOTE}`.slice(0, 180);
        rec.exif.title = rec.title;
        rec.exif.description = rec.description;
        if (rec.pinterest) rec.pinterest.description = `${rec.alt}. Save this shelf-life guide for later. ${SITE_URL}${url} #FoodStorage`;
        if (rec.structuredData) {
          rec.structuredData.name = rec.title;
          rec.structuredData.description = rec.description;
        }
        const idx = csv.findIndex((r) => r.startsWith(`${url},`) && r.includes(rec.filename));
        if (idx !== -1) {
          const cells = csv[idx].split(",");
          cells[5] = `"${rec.title.replace(/"/g, '""')}"`;
          cells[6] = `"${rec.alt.replace(/"/g, '""')}"`;
          cells[8] = `"${rec.description.replace(/"/g, '""')}"`;
          cells[12] = `"${rec.exif.title.replace(/"/g, '""')}"`;
          cells[13] = `"${rec.exif.description.replace(/"/g, '""')}"`;
          if (rec.pinterest) cells[16] = `"${rec.pinterest.description.replace(/"/g, '""')}"`;
          csv[idx] = cells.join(",");
        }
      }
      altSeen.set(rec.alt, url);
    }
  }

  fs.mkdirSync(QA_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(seoManifest, null, 2));
  fs.writeFileSync(path.join(IMG_ROOT, "seo-images.csv"), csv.join("\n"));
  fs.writeFileSync(path.join(QA_DIR, "qa-gates.csv"), gates.join("\n"));

  const checklist = [
    "# Image QA checklist",
    "",
    "Reject any image that fails any of these 9 gates. Machine checks are marked `ok`/`fail` by `npm run images:validate`; human gates stay `pending` until a reviewer signs off.",
    "",
    ...HUMAN_GATES.map((g, i) => `${i + 1}. ${g.replace(/-/g, " ")}`),
    "",
    "Plus: no text, no logos, no watermarks; food is the subject; bright natural light; matches the house style (docs/IMAGE-SYSTEM.md §2).",
    "",
  ];
  fs.writeFileSync(path.join(QA_DIR, "IMAGE-QA-CHECKLIST.md"), checklist.join("\n"));

  console.log(`Wrote SEO records for ${Object.keys(seoManifest).length} page(s).`);
  console.log("  manifest.seo.json      -> public/images/manifest.seo.json");
  console.log("  seo-images.csv         -> public/images/seo-images.csv");
  console.log("  imageobject.json       -> public/images/seo/imageobject/**");
  console.log("  qa-gates.csv           -> public/images/qa/qa-gates.csv");
  console.log("  IMAGE-QA-CHECKLIST.md  -> public/images/qa/IMAGE-QA-CHECKLIST.md");
}

main();
