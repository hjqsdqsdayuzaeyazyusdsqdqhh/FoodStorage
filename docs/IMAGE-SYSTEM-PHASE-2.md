# Home Storage Guide — Image System · Phase 2

> SEO image optimization framework. Pure extension of Phase 1 — no content, URL, SEO, metadata, schema, layout, or component files were modified.

---

## 1. What this adds

For **every** generated image, automatically produce an SEO record:

| Field | Example |
| --- | --- |
| Image title | White Rice Stored in an Airtight Glass Container |
| Image filename | rice-storage-hero.avif |
| Alt text | White rice stored in an airtight glass container on a pantry shelf |
| Caption | Airtight storage keeps white rice fresh for its full shelf life. |
| Description | Editorial photograph of white rice in a clear airtight glass container on a natural wood pantry shelf. |
| EXIF title | White Rice Stored in an Airtight Glass Container |
| EXIF description | Editorial photograph of white rice stored airtight in a modern pantry, bright natural light. |
| Image keywords | rice shelf life, how long does rice last, white rice storage, food storage, shelf life |
| Pinterest title | How Long Does Rice Last? + Storage Guide |
| Pinterest description | White rice stored in an airtight glass container on a pantry shelf. Save this shelf-life guide for later. #FoodStorage #Pantry #ShelfLife |

These are emitted into `public/images/manifest.seo.json`, a flat spreadsheet `public/images/seo-images.csv`, and per-page ImageObject JSON-LD files.

---

## 2. Manifest shape

The enriched manifest mirrors Phase 1, one entry per page, with the four named image objects.

```jsonc
{
  "/shelf-life/pantry/how-long-does-rice-last/": {
    "pageTitle": "How Long Does Rice Last?",
    "canonical": "https://homestorageguide.com/shelf-life/pantry/how-long-does-rice-last/",
    "subject": "white rice",
    "keywordKey": "rice-storage",
    "keywords": ["rice shelf life", "how long does rice last", "white rice storage", "food storage", "shelf life"],
    "heroImage":      { /* ImageRecord */ },
    "supportImage":   { /* ImageRecord */ },
    "pinterestImage": { /* ImageRecord */ },
    "ogImage":        { /* ImageRecord */ },
    "structuredData": [ /* ImageObject … */ ]
  }
}
```

Each `ImageRecord` contains exactly the required fields, plus deterministic extras:

```jsonc
{
  "filename": "rice-storage-hero.avif",
  "title": "White Rice Stored in an Airtight Glass Container",
  "alt": "White rice stored in an airtight glass container on a pantry shelf",
  "caption": "Airtight storage keeps white rice fresh for its full shelf life.",
  "description": "Editorial photograph of white rice in a clear airtight glass container on a natural wood pantry shelf.",
  "width": 1600,
  "height": 900,
  "format": "avif",
  "priority": true,
  "loading": "eager",
  "fetchPriority": "high",
  "decoding": "async",
  "sizes": "(min-width: 1024px) 704px, 100vw",
  "breakpoints": [400, 800, 1200, 1600],
  "srcset": ["rice-storage-hero-400w.avif 400w", "rice-storage-hero-800w.avif 800w", "rice-storage-hero-1200w.avif 1200w", "rice-storage-hero-1600w.avif 1600w"],
  "exif": { "title": "…", "description": "…", "keywords": ["…"] },
  "pinterest": { "title": "…", "description": "…" },
  "structuredData": { "@type": "ImageObject", … },
  "src": "/images/optimized/shelf-life/pantry/how-long-does-rice-last/hero-1600w.avif",
  "quality": { "status": "pending-human-review", "machineChecks": ["format:ok", "dimensions:ok", …] }
}
```

`pinterest` is present only on `pinterestImage`; `srcset`/`breakpoints` only on on-page images (`heroImage`, `supportImage`).

---

## 3. Automatic naming rules

Short, keyword-first, derived from `foodName`/`title`. Pattern:

```
<keyword-key>-<kind>[<index>].<format>
```

| Kind | Format | Example |
| --- | --- | --- |
| hero | avif | rice-storage-hero.avif |
| support (1st) | avif | rice-storage-support-1.avif |
| support (2nd) | avif | rice-storage-support-2.avif |
| pinterest | webp | rice-storage-pinterest.webp |
| og | jpg | rice-storage-og.jpg |
| portrait | webp | james-okafor-portrait.webp |

Rules:
- All lowercase, hyphens only, no dates/versions/campaign tags.
- `keyword-key` ≤ 28 chars; shelf-life pages use `<foodName>-storage` (milk-storage, ground-beef-storage); guides strip stopwords from the title (`how to freeze meat` → `freeze-meat`); hubs use the pillar segment (`dairy`, `shelf-life`).
- One keyword per filename; `support-N` enumerates multiple supporting shots.
- The `filename` field is the **recommended** SEO name. Phase 1's on-disk names stay untouched; this framework emits the recommendation so a later rename pass (or fresh generation) can adopt it without breaking anything.

---

## 4. Responsive breakpoints + srcset recommendations

Standardized breakpoints across all on-page images:

```
400w · 800w · 1200w · 1600w
```

`srcset` is generated per asset from the filename + breakpoints:

```
srcset: [
  "rice-storage-hero-400w.avif 400w",
  "rice-storage-hero-800w.avif 800w",
  "rice-storage-hero-1200w.avif 1200w",
  "rice-storage-hero-1600w.avif 1600w"
]
sizes: "(min-width: 1024px) 704px, 100vw"
```

Loading contract per kind:

| Kind | priority | loading | fetchPriority | decoding |
| --- | --- | --- | --- | --- |
| hero | true | eager | high | async |
| support | false | lazy | auto | async |
| pinterest | false | lazy | auto | async |
| og | false | lazy | auto | async |

---

## 5. Structured data — ImageObject

Every image carries a ready-to-inject `ImageObject` (also emitted as per-page JSON-LD under `public/images/seo/imageobject/<page>/imageobject.json`).

```json
{
  "@type": "ImageObject",
  "@id": "https://homestorageguide.com/images/optimized/shelf-life/pantry/how-long-does-rice-last/hero-1600w.avif",
  "url": "…", "contentUrl": "…",
  "name": "White Rice Stored in an Airtight Glass Container",
  "caption": "Airtight storage keeps white rice fresh for its full shelf life.",
  "description": "Editorial photograph of white rice …",
  "width": 1600, "height": 900,
  "encodingFormat": "image/avif",
  "representativeOfPage": true
}
```

`representativeOfPage: true` only on the hero. Not injected into pages (schema untouched by design) — ready for a future publish step.

---

## 6. Image quality validation

`npm run images:validate` runs machine checks on the optimized files when they exist, and always emits the human-review gates.

**Machine checks (deterministic):**
- File exists per variant
- Encoded dimensions match the declared `width`/`height`
- `encodingFormat` matches extension (avif/webp/jpg)
- File-size sanity bounds (AVIF 5–400 KB, WebP 5–500 KB, JPEG 10–800 KB)
- Filename matches the naming rule (regex-verified)
- Alt 40–125 chars, no leading "image of"/"photo of"
- Alt uniqueness across the site
- Duplicate-content detection (md5 collision across files)
- EXIF title/description presence (after `npm run images:meta`)

**Human gates — reject on any failure:**

1. Blurry food
2. Duplicated objects
3. AI artifacts (warped hands, melting glass, mutated produce)
4. Wrong shadows
5. Unrealistic hands
6. Melted textures
7. Incorrect labels
8. Unreadable containers
9. Unrealistic refrigerator interiors

These gates are emitted per asset in `public/images/qa/qa-gates.csv` (status `pending`) and summarized in `public/images/qa/IMAGE-QA-CHECKLIST.md`.

---

## 7. Outputs

| Path | Contents |
| --- | --- |
| `public/images/manifest.seo.json` | Enriched per-page manifest (the four ImageRecords + structured data) |
| `public/images/seo-images.csv` | Flat spreadsheet of every SEO field per image |
| `public/images/seo/imageobject/<page>/imageobject.json` | Per-page ImageObject JSON-LD |
| `public/images/qa/qa-gates.csv` | Per-asset gate matrix (machine + 9 human gates) |
| `public/images/qa/IMAGE-QA-CHECKLIST.md` | Reusable QA checklist |
| `docs/IMAGE-SYSTEM-PHASE-2.md` | This framework |

## 8. Commands

```
npm run images:manifest   # Phase 1 — base manifest (unchanged)
npm run images:seo        # Phase 2 — enrich into manifest.seo.json + CSV + JSON-LD + QA
npm run images:validate   # machine validation + gate report
npm run images:meta       # embed EXIF title/description/keywords (jpeg/webp)
```

## 9. Scaling to 1000+ pages

Everything is generated. Adding one article to `content/` and running `images:manifest` then `images:seo` produces its full SEO record set — no per-page hand-writing. Subject/`keywordKey` derivation falls back to title slugification, so the pipeline never breaks on new foods.
