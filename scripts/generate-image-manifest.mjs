#!/usr/bin/env node
/**
 * Image system manifest + prompt generator (docs/IMAGE-SYSTEM.md).
 *
 * Walks the content tree and produces, for every page:
 *   - public/images/manifest.json   (single source of truth consumed by components)
 *   - public/images/prompts/**      (one featured/pinterest/og/support .txt per page)
 *   - public/images/prompts/prompts.csv (bulk batch-generation spreadsheet)
 *
 * Usage:
 *   node scripts/generate-image-manifest.mjs            # all content pages
 *   node scripts/generate-image-manifest.mjs --slug X   # pages whose urlPath contains X
 *   node scripts/generate-image-manifest.mjs --dry-run  # print plan, write nothing
 *
 * Does NOT modify content, SEO, URLs, schema, or links.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_ROOT = path.join(ROOT, "content");
const IMG_ROOT = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(IMG_ROOT, "manifest.json");
const PROMPTS_DIR = path.join(IMG_ROOT, "prompts");

const STYLE =
  "ultra realistic editorial food photography, bright natural window light, white modern kitchen, premium magazine quality, 85mm lens, shallow depth of field, highly detailed texture";
const NEGATIVE = "no people, no text, no logos, no watermarks, no AI artifacts, no cartoon, no illustration";

/* ------------------------------------------------------------------ */
/* Subject library — add one line per new food as content grows.       */
/* ------------------------------------------------------------------ */
const SUBJECTS = {
  milk: "fresh milk in a glass bottle",
  eggs: "fresh eggs in a clean egg tray",
  butter: "a block of butter wrapped in parchment paper",
  cheese: "a wedge of artisanal cheese",
  yogurt: "thick yogurt in a glass jar",
  chicken: "raw chicken breast",
  "ground beef": "fresh ground beef",
  steak: "a raw marbled steak",
  salmon: "fresh salmon fillets",
  apples: "crisp apples",
  bananas: "ripe bananas",
  lettuce: "crisp green lettuce",
  mushrooms: "fresh button mushrooms",
  onions: "onions in a mesh bag",
  potatoes: "potatoes in a burlap sack",
  strawberries: "fresh strawberries",
  tomatoes: "ripe vine tomatoes",
  rice: "white rice",
  "cooked rice": "steamed rice in a covered glass bowl",
  "canned food": "food storage cans",
  coffee: "whole coffee beans",
  flour: "all-purpose flour",
  honey: "a jar of golden honey",
  pasta: "dried pasta",
  bread: "a fresh loaf of bread",
};

/** Guide pages carry no foodName — derive a subject from the title. */
const GUIDE_SUBJECTS = [
  [/freeze meat/i, "raw meat portions"],
  [/freeze fruit/i, "fresh fruit portions"],
  [/freeze vegetables/i, "fresh vegetable portions"],
  [/freeze leftovers/i, "cooked leftovers in glass containers"],
  [/prevent freezer burn/i, "vacuum-sealed frozen packages"],
  [/vacuum/i, "vacuum-sealed food pouches"],
  [/temperature/i, "a digital kitchen thermometer beside fresh ingredients"],
  [/dry goods/i, "bulk dry goods"],
  [/refrigerator/i, "organized food in glass containers"],
  [/canning/i, "glass canning jars of preserves"],
  [/pantry/i, "a neatly organized pantry"],
  [/store (rice|pasta|flour|staples)/i, "pantry staples in airtight containers"],
];

const CATEGORY_SUBJECTS = {
  dairy: "dairy foods",
  meat: "meat portions",
  produce: "fresh produce",
  pantry: "pantry staples",
  freezer: "frozen food packages",
};

const PILLAR_SUBJECTS = {
  "/shelf-life/": "pantry staples",
  "/storage-methods/": "airtight storage containers",
  "/pantry-organization/": "organized pantry staples",
};

/* ------------------------------------------------------------------ */
/* Scene library — chosen from template, category, method.             */
/* ------------------------------------------------------------------ */
function sceneFor(fm) {
  const cat = (fm.category ?? "").toLowerCase();
  const method = (fm.method ?? "").toLowerCase();
  const t = (fm.title ?? "").toLowerCase();
  switch (fm.template) {
    case "shelfLife": {
      const sl = fm.shelfLife ?? {};
      if (cat === "meat")
        return "portioned and wrapped in airtight freezer packaging on a clean white kitchen counter";
      if (cat === "freezer" || (!sl.pantry && !sl.fridge && sl.freezer))
        return "inside an airtight glass container in a clean frost-free freezer";
      if (sl.fridge && !sl.pantry)
        return "in a clean modern refrigerator on a glass shelf beside other fresh ingredients";
      return "in a clear airtight glass container on a natural wood pantry shelf, surrounded by organized jars and canisters";
    }
    case "guide":
      if (method === "freezing" || /freeze|freezer/i.test(t))
        return "portioned into labeled freezer bags and glass containers on a clean white kitchen counter";
      if (method === "refrigerator") return "organized in clear glass containers on the shelves of a clean modern refrigerator";
      if (method === "canning") return "glass canning jars filled with preserves on a white kitchen counter beside fresh produce";
      if (method === "dry-goods") return "bulk dry goods in clear glass canisters and jars on natural wood pantry shelves";
      if (method === "vacuum-sealing") return "vacuum-sealed pouches of food on a clean white kitchen counter";
      if (method === "food-safety") return "a digital kitchen thermometer beside fresh ingredients on a clean white counter";
      return "in a bright modern organized kitchen pantry";
    case "pantryGuide":
      return "a beautifully organized pantry with labeled clear glass containers, woven baskets, and natural wood shelves";
    case "category": {
      const loc = cat === "dairy" || cat === "meat" || cat === "produce" ? "clean modern refrigerator" : "bright modern kitchen pantry";
      return `a tidy arrangement of ${CATEGORY_SUBJECTS[cat] ?? "food"} in a ${loc}`;
    }
    case "pillar":
      return "a bright modern kitchen pantry with organized airtight glass containers";
    case "tool":
      return "clean kitchen storage tools and airtight containers arranged on a white counter";
    default:
      return "a bright modern organized kitchen pantry";
  }
}

function subjectFor(fm) {
  if (fm.template === "shelfLife") {
    const key = String(fm.foodName ?? "").toLowerCase();
    if (SUBJECTS[key]) return SUBJECTS[key];
    if (fm.cluster) return String(fm.cluster).toLowerCase();
    return String(fm.title ?? fm.h1 ?? "food").toLowerCase().replace(/^how long does | last\??$/g, "");
  }
  if (fm.template === "guide") {
    for (const [re, phrase] of GUIDE_SUBJECTS) if (re.test(fm.title ?? "")) return phrase;
    return "fresh food ready for storage";
  }
  if (fm.template === "pantryGuide") return "a neatly organized pantry";
  if (fm.template === "category") return CATEGORY_SUBJECTS[String(fm.category ?? "").toLowerCase()] ?? "food";
  if (fm.template === "pillar") return PILLAR_SUBJECTS[fm.urlPath] ?? "food storage";
  if (fm.template === "tool") return "kitchen storage tools";
  return "a bright modern organized kitchen";
}

/* ------------------------------------------------------------------ */
/* Alt text + captions                                                */
/* ------------------------------------------------------------------ */
function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function storagePhrase(fm) {
  const cat = (fm.category ?? "").toLowerCase();
  if (fm.template === "shelfLife") {
    const sl = fm.shelfLife ?? {};
    if (cat === "meat") return "wrapped airtight and ready for the freezer";
    if (cat === "freezer" || (!sl.pantry && !sl.fridge && sl.freezer)) return "stored in an airtight freezer container";
    if (sl.fridge && !sl.pantry) return "stored in a clean refrigerator";
    return "stored in an airtight glass container on a pantry shelf";
  }
  if (fm.template === "guide") {
    const method = (fm.method ?? "").toLowerCase();
    if (method === "freezing") return "portioned into freezer-safe containers for freezing";
    if (method === "vacuum-sealing") return "sealed in vacuum pouches for long-term storage";
    if (method === "canning") return "preserved in glass jars";
    return "stored in airtight containers in an organized pantry";
  }
  if (fm.template === "pantryGuide") return "arranged with labeled airtight containers";
  return "arranged in a bright, organized pantry";
}

function altFor(fm, subject, kind) {
  const base =
    fm.template === "pantryGuide"
      ? "A neatly organized pantry with labeled airtight containers"
      : cap(`${subject} ${storagePhrase(fm)}`);
  const withSuffix = kind === "support" ? `${base} — supporting storage detail` : base;
  return withSuffix.length <= 125 ? withSuffix : withSuffix.slice(0, 122).trimEnd() + "...";
}

function captionFor(fm, subject, kind) {
  if (kind === "hero" && fm.template === "shelfLife") return `Airtight storage keeps ${subject} fresh for its full shelf life.`;
  if (kind === "hero" && (fm.template === "guide" || fm.template === "pantryGuide"))
    return `Proper airtight storage keeps ${subject} fresh for months.`;
  if (kind === "support") return `Detail: ${subject} in airtight storage.`;
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Prompts                                                             */
/* ------------------------------------------------------------------ */
function promptFor(fm, subject, scene, kind) {
  const base = `${subject} ${scene}, ${STYLE}, ${NEGATIVE}`;
  switch (kind) {
    case "pin":
      return `Vertical editorial food photograph, ${subject} ${scene}, minimalist composition with clean negative space in the upper third for a title overlay, ${STYLE}, ${NEGATIVE}`;
    case "og":
      return `Wide horizontal editorial food photograph, ${subject} ${scene}, balanced composition centered on the food, ${STYLE}, ${NEGATIVE}`;
    case "support":
      return `Detail shot, ${subject} ${scene}, tight crop on the storage detail, ${STYLE}, ${NEGATIVE}`;
    case "portrait":
      return `Editorial portrait photograph of a professional, soft natural light, neutral light background, premium magazine quality, no text, no logos, no watermark`;
    default:
      return `Featured hero image, ${base}`;
  }
}

/* ------------------------------------------------------------------ */
/* Asset builders                                                      */
/* ------------------------------------------------------------------ */
const keyOf = (urlPath) => urlPath.replace(/^\/+|\/+$/g, "").split("/").join("/");

function asset(fm, { kind, variant, width, height, subject, scene, prompt, alt, caption, placement, sizes, widths, source, basePath }) {
  const key = keyOf(fm.urlPath);
  return {
    kind,
    variant,
    page: fm.urlPath,
    key,
    file: `${variant}.jpg`,
    subject,
    scene,
    prompt,
    alt,
    caption,
    placement,
    width,
    height,
    sizes: sizes ?? null,
    widths: widths ?? null,
    basePath: basePath ?? `/images/optimized/${key}/${variant}`,
    source: source ?? `/images/source/${key}/${variant}.jpg`,
    variants: null,
  };
}

const SIZES_HERO = { width: 1600, height: 900, widths: [400, 800, 1200, 1600], sizes: "(min-width: 1024px) 704px, 100vw" };
const SIZES_SUPPORT = { width: 1200, height: 675, widths: [400, 800, 1200], sizes: "(min-width: 1024px) 704px, 100vw" };
const SIZES_PORTRAIT = { width: 600, height: 600, widths: [300, 600], sizes: "240px" };
const PIN = { width: 1000, height: 1500, widths: null, sizes: null };
const OG = { width: 1200, height: 630, widths: null, sizes: null };

const PLACEMENT = {
  hero: "Hero — immediately below the H1",
  support: "Supporting — after the storage table (shelf-life) or how-to steps (guides)",
  pin: "Dedicated Pinterest asset (1000×1500) — not rendered on page",
  og: "Social share asset (1200×630) — not rendered on page",
  portrait: "Author portrait — author box and author pages",
};

function buildAssets(fm) {
  const subject = subjectFor(fm);
  const scene = sceneFor(fm);
  const assets = [];
  const add = (kind, size) => {
    const prompt = promptFor(fm, subject, scene, kind);
    const alt = kind === "portrait" ? `Portrait of ${fm.title ?? "the author"}` : altFor(fm, subject, kind);
    const caption = captionFor(fm, subject, kind);
    const file =
      kind === "pin"
        ? `/images/pins/${keyOf(fm.urlPath)}-pin-1000x1500.jpg`
        : kind === "og"
          ? `/images/og/${keyOf(fm.urlPath)}-og-1200x630.jpg`
          : null;
    assets.push(
      asset(fm, {
        kind,
        variant: kind === "portrait" ? "portrait" : kind,
        width: size.width,
        height: size.height,
        subject,
        scene,
        prompt,
        alt,
        caption,
        placement: PLACEMENT[kind],
        sizes: size.sizes,
        widths: size.widths,
        source: kind === "portrait" ? `/images/source/${keyOf(fm.urlPath)}/portrait.jpg` : undefined,
        ...(file ? { basePath: file, source: `/images/source/${keyOf(fm.urlPath)}/${kind}.jpg`, variants: null, widths: null } : {}),
      }),
    );
  };

  switch (fm.template) {
    case "shelfLife":
    case "guide":
    case "pantryGuide":
      add("hero", SIZES_HERO);
      add("support", SIZES_SUPPORT);
      add("pin", PIN);
      add("og", OG);
      break;
    case "category":
    case "pillar":
      add("hero", SIZES_HERO);
      add("pin", PIN);
      add("og", OG);
      break;
    case "tool":
      add("hero", SIZES_HERO);
      add("og", OG);
      break;
    case "author":
      add("portrait", SIZES_PORTRAIT);
      break;
    case "about":
    case "contact":
      add("hero", SIZES_HERO);
      break;
    default:
      return [];
  }
  return assets;
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const slugFilter = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

  const existing = {};
  try {
    Object.assign(existing, JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")));
  } catch {
    /* first run */
  }

  const pages = walk(CONTENT_ROOT)
    .map((file) => matter(fs.readFileSync(file, "utf8")).data)
    .filter((fm) => fm && fm.urlPath && fm.template)
    .filter((fm) => (slugFilter ? fm.urlPath.includes(slugFilter) : true));

  const manifest = {};
  let total = 0;
  const csv = [
    "page,url,template,kind,file,width,height,subject,prompt,alt,caption,placement,source",
  ];

  for (const fm of pages) {
    const assets = buildAssets(fm);
    if (!assets.length) continue;
    const entry = { key: keyOf(fm.urlPath), assets: {} };
    for (const a of assets) {
      const prev = existing[fm.urlPath]?.assets?.[a.kind];
      if (prev?.variants) a.variants = prev.variants;
      entry.assets[a.kind] = a;
      total += 1;
      csv.push(
        [
          fm.urlPath,
          fm.urlPath,
          fm.template,
          a.kind,
          a.file,
          a.width,
          a.height,
          `"${String(a.subject ?? "").replace(/"/g, '""')}"`,
          `"${String(a.prompt ?? "").replace(/"/g, '""')}"`,
          `"${String(a.alt ?? "").replace(/"/g, '""')}"`,
          `"${String(a.caption ?? "").replace(/"/g, '""')}"`,
          `"${String(a.placement ?? "").replace(/"/g, '""')}"`,
          a.source,
        ].join(","),
      );
    }
    manifest[fm.urlPath] = entry;
  }

  if (dryRun) {
    console.log(`Plan: ${pages.length} page(s), ${total} image asset(s). No files written.`);
    return;
  }

  fs.mkdirSync(PROMPTS_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(PROMPTS_DIR, "prompts.csv"), csv.join("\n"));

  for (const [, entry] of Object.entries(manifest)) {
    const dir = path.join(PROMPTS_DIR, ...entry.key.split("/"));
    fs.mkdirSync(dir, { recursive: true });
    for (const [, a] of Object.entries(entry.assets)) {
      const label =
        a.kind === "hero" ? "featured" : a.kind === "support" ? "support" : a.kind === "pin" ? "pinterest" : a.kind === "portrait" ? "portrait" : "og";
      fs.writeFileSync(path.join(dir, `${label}.txt`), `${a.prompt}\n`);
    }
  }

  console.log(`Wrote manifest for ${pages.length} page(s), ${total} asset(s).`);
  console.log(`  manifest.json   -> public/images/manifest.json`);
  console.log(`  prompts         -> public/images/prompts/**`);
  console.log(`  prompts.csv     -> public/images/prompts/prompts.csv`);
}

main();
