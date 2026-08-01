# Home Storage Guide — Image System

> Production-ready editorial image system for **850+ pages**.
> One consistent visual style, fully automated manifests, prompts, naming, placement, and optimization.

---

## 1. Objective

Give every article a premium editorial visual experience comparable to **Healthline**, **The Spruce Eats**, **Serious Eats**, and **Wirecutter** — while keeping the site trustworthy, modern, clean, and professional.

Each article automatically includes:

| Asset | Where it appears | Intrinsic size |
| --- | --- | --- |
| Featured hero image | Immediately below the H1 | 1600×900 (16:9) |
| Supporting image(s) | After the storage table / how-to steps | 1200×675 (16:9) |
| Pinterest vertical image | Dedicated pin asset (off-page) | 1000×1500 (2:3) |
| OG image | Social share card (optional wiring) | 1200×630 (1.91:1) |
| Author portrait | Author pages / author box (EEAT) | 600×600 (1:1) |

Everything is generated from the content tree. Adding a new article to `content/` and re-running one script produces its complete image manifest, prompts, filenames, alt text, and placement.

---

## 2. Image style — the single house style

Every image must look like it came from the same shoot, in the same magazine.

**Always:**
- Ultra-realistic editorial food photography
- Bright natural window light
- White modern kitchens
- Organized pantry / clean refrigerator
- Glass containers, airtight storage
- Natural wood shelves
- Premium magazine quality
- Shallow depth of field, 85mm lens, highly detailed texture
- Food is always the subject, centered and proud

**Never:**
- No AI artifacts, warped hands, melting text, or mutation
- No text inside images
- No logos
- No watermarks
- No people unless absolutely necessary (author portraits are the one exception)
- No filters, no heavy HDR, no dark moody styling
- No cartoon, illustration, or 3D-render look

The style tokens are constants injected into every prompt:

```
STYLE = "Ultra realistic editorial food photography, bright natural window light,
white modern kitchen, premium magazine quality, 85mm lens, shallow depth of field,
highly detailed texture"

NEGATIVE = "no people, no text, no logos, no watermarks, no AI artifacts,
no cartoon, no illustration"
```

---

## 3. Prompt templates

Three prompts per content page, auto-generated from frontmatter (`foodName`, `category`, `method`, `template`, `cluster`).

### 3.1 Featured prompt (hero)

```
<SUBJECT> <SCENE>, STYLE, NEGATIVE
```

Example — *How Long Does Rice Last?*

```
White rice stored in a clear airtight glass container on a natural wood pantry
shelf, surrounded by organized jars and canisters, ultra realistic editorial food
photography, bright natural window light, white modern kitchen, premium magazine
quality, 85mm lens, shallow depth of field, highly detailed texture, no people,
no text, no logos, no watermarks, no AI artifacts, no cartoon, no illustration
```

### 3.2 Pinterest prompt (vertical)

```
Vertical editorial food photograph, <SUBJECT> <SCENE>, minimalist composition with
clean negative space in the upper third for a title overlay, STYLE, NEGATIVE
```

### 3.3 OG prompt (horizontal)

```
Wide horizontal editorial food photograph, <SUBJECT> <SCENE>, balanced composition
centered on the food, STYLE, NEGATIVE
```

### 3.4 Subject library

The generator maps `foodName` → an editorial subject phrase. Unknown foods fall back to a descriptive phrase built from `cluster`/`title`.

| foodName | Subject phrase |
| --- | --- |
| milk | fresh milk in a glass bottle |
| eggs | fresh eggs in a clean egg tray |
| butter | a block of butter wrapped in parchment paper |
| cheese | a wedge of artisanal cheese |
| yogurt | thick yogurt in a glass jar |
| chicken | raw chicken breast |
| ground beef | fresh ground beef |
| steak | a raw marbled steak |
| salmon | fresh salmon fillets |
| apples | crisp apples |
| bananas | ripe bananas |
| lettuce | crisp green lettuce |
| mushrooms | fresh button mushrooms |
| onions | onions in a mesh bag |
| potatoes | potatoes in a burlap sack |
| strawberries | fresh strawberries |
| tomatoes | ripe vine tomatoes |
| rice | white rice |
| cooked rice | steamed rice in a covered glass bowl |
| canned food | food storage cans |
| coffee | whole coffee beans |
| flour | all-purpose flour |
| honey | a jar of golden honey |
| pasta | dried pasta |
| bread | a fresh loaf of bread |

### 3.5 Scene library

The generator picks a scene from `category`/`method`/`template`.

| Context | Scene |
| --- | --- |
| Shelf life · pantry | in a clear airtight glass container on a natural wood pantry shelf, surrounded by organized jars and canisters |
| Shelf life · fridge (dairy/eggs/produce) | in a clean modern refrigerator on a glass shelf beside other fresh ingredients |
| Shelf life · freezer | inside an airtight glass container in a clean frost-free freezer |
| Shelf life · meat | portioned and wrapped in airtight freezer packaging on a clean white kitchen counter |
| Guide · freezing | portioned into labeled freezer bags and glass containers on a clean white kitchen counter |
| Guide · refrigerator | organized in clear glass containers on the shelves of a clean modern refrigerator |
| Guide · canning | glass canning jars filled with preserves on a white kitchen counter beside fresh produce |
| Guide · dry goods | bulk dry goods in clear glass canisters and jars on natural wood pantry shelves |
| Guide · vacuum sealing | vacuum-sealed pouches of food on a clean white kitchen counter |
| Guide · food safety | a digital kitchen thermometer beside fresh ingredients on a clean white counter |
| Guide · default | in a bright modern organized kitchen pantry |
| Pantry organization | a beautifully organized pantry with labeled clear glass containers, woven baskets, and natural wood shelves |
| Category hub | a tidy arrangement of <category> foods in a bright modern kitchen <pantry/refrigerator> |

---

## 4. Naming convention

Clean, lowercase, hyphenated, derived from the URL slug. Never contains the word "image", "photo", or a date.

```
shelf-life/pantry/how-long-does-rice-last/hero-1600w.avif
shelf-life/pantry/how-long-does-rice-last/hero-1600w.webp
shelf-life/pantry/how-long-does-rice-last/hero-1600w.jpg
shelf-life/pantry/how-long-does-rice-last/support-1200w.jpg
shelf-life/pantry/how-long-does-rice-last/pin-1000x1500.jpg
shelf-life/pantry/how-long-does-rice-last/og-1200x630.jpg
```

Pattern: `<pillar>/<category>/<page-slug>/<variant>[-<size>].<ext>`

Variants: `hero`, `support`, `pin`, `og`, `portrait`. Widths append only to on-page responsive variants (`-400w`, `-800w`, `-1200w`, `-1600w`).

---

## 5. Folder structure

```
public/images/
├── manifest.json          # single source of truth (generated) — consumed by components
├── README.md
├── prompts/               # generated — text files + CSV for the image team
│   ├── shelf-life/pantry/how-long-does-rice-last/
│   │   ├── featured.txt
│   │   ├── pinterest.txt
│   │   └── og.txt
│   └── prompts.csv        # bulk spreadsheet for batch generation
├── source/                # creative team drops generated photos here (master quality)
│   └── shelf-life/pantry/how-long-does-rice-last/
│       ├── hero.jpg       # ≥1600×900 master
│       └── support.jpg    # ≥1200×675 (optional)
├── optimized/             # generated by scripts/optimize-images.mjs
│   └── shelf-life/pantry/how-long-does-rice-last/
│       ├── hero-400w.avif  hero-800w.avif  hero-1200w.avif  hero-1600w.avif
│       ├── hero-400w.webp  hero-800w.webp  hero-1200w.webp  hero-1600w.webp
│       ├── hero-400w.jpg   hero-800w.jpg   hero-1200w.jpg   hero-1600w.jpg
│       └── support-*.{avif,webp,jpg}
├── pins/                  # generated 1000×1500 (dedicated pin source if provided, else hero crop)
└── og/                    # generated 1200×630
```

`.gitignore`: the `source/` masters and generated `optimized/`, `pins/`, `og/` are build artifacts — add `/public/images/source/`, `/public/images/optimized/`, `/public/images/pins/`, `/public/images/og/` to `.gitignore`. `manifest.json`, `prompts/`, and `README.md` are committed so components render at build time.

---

## 6. Alt text standards

Descriptive, SEO-friendly, food-first, unique per page.

**Pattern:** `<Subject> stored in <container> on/in <location>`

- 8–12 words, ≤125 characters
- Start with the subject noun, not "Image of", "Photo of", "Picture of"
- Include storage context (container + location) — the actual query intent
- No keyword stuffing, no generic "food storage" filler
- Unique per page (derived from `foodName`/slug)

Examples:

| Page | Alt |
| --- | --- |
| How Long Does Rice Last? | White rice stored in an airtight glass container on a pantry shelf |
| How Long Does Milk Last? | Fresh milk in a glass bottle stored in a clean refrigerator |
| How to Freeze Meat | Raw meat portioned into labeled freezer bags ready for freezing |

Supporting images and the Pinterest image reuse the alt with a suffix when on-page (` — supporting storage detail`).

---

## 7. Placement guide

| Asset | Placement |
| --- | --- |
| Hero | Immediately below the H1 + byline, above the quick answer. Preload (eager, `fetchpriority="high"`). |
| Supporting | After the storage table (shelf-life pages) or after the how-to steps (guides). Lazy-loaded. |
| Pinterest | Dedicated off-page asset. Never rendered in the article body. Referenced by `data-pin-media` on Pinterest-ready modules. |
| OG | Social share card via Open Graph / Twitter metadata (optional wiring — per-page OG wiring touches SEO metadata, so it is intentionally **not** enabled by this system). |
| Author portrait | Author box + author pages (EEAT). |

---

## 8. Optimization guide

### 8.1 Formats
- **AVIF** primary (quality 50) — smallest, modern browsers
- **WebP** fallback (quality 75)
- **JPEG** last resort (quality 80)

### 8.2 Responsive breakpoints
- Hero: `400w, 800w, 1200w, 1600w` · sizes `(min-width: 1024px) 704px, 100vw`
- Supporting: `400w, 800w, 1200w` · sizes `(min-width: 1024px) 704px, 100vw`

Rendered with a `<picture>` element so the browser picks AVIF → WebP → JPEG, plus a `srcset`/`sizes` chain.

### 8.3 Loading rules
- **Hero only**: `loading="eager"`, `fetchpriority="high"` (this is the LCP image)
- **Everything else**: `loading="lazy"`, `decoding="async"`
- Always set `width` + `height` (aspect-ratio preserved, no CLS)
- No `title` attributes (not read by AT, redundant)

### 8.4 Compression
- AVIF q50, WebP q75, JPEG q80; strips EXIF; color profile sRGB; `fit: cover` never upscales beyond source.

---

## 9. Production pipeline

```
content/*.md
      │  scripts/generate-image-manifest.mjs  (node, gray-matter)
      ▼
public/images/manifest.json + prompts/**/*.txt + prompts.csv
      │  (committed)
      ▼
Image team generates photos from prompts (Midjourney/Flux/DALL-E/Stock)
      ▼
Drop masters into public/images/source/**  (hero.jpg ≥1600×900)
      │  scripts/optimize-images.mjs  (sharp)
      ▼
public/images/optimized/**, pins/**, og/**  + manifest.json updated
      ▼
Components render automatically (hero + support slots, null-safe)
```

### Commands

```
npm run images:manifest     # regenerate manifest + prompts from content/
npm run images:optimize     # optimize source/ -> optimized/, pins/, og/, update manifest
npm run images:optimize -- --check   # report missing source images
```

### Scaling to 850+ pages
- Add a new article to `content/` → run `npm run images:manifest` → prompts appear.
- New foods need a subject phrase only when `foodName` is unknown — add one line to the subject library. Unknown foods fall back to a `cluster`/title-derived phrase, so the pipeline never breaks.
- Author/legal/pillar pages get only the assets they need (`portrait`/`hero`/`og`), never pins.

---

## 10. QA checklist (no AI artifacts)

Before any master image ships:
1. No warped fingers, melting glass, mutated produce, or stray text.
2. Bright natural light; white/green palette consistent with the site.
3. Airtight container or clean fridge/pantry clearly readable.
4. Composition leaves safe space (no brand text under it).
5. Sharpen at the final export size; check at 100% zoom.
6. Alt text matches the visible image (don't describe what's not there).

---

## 11. Constraints respected

- No URL, routing, metadata, schema, canonical, internal-link, content, or layout-structure changes.
- Only two additive, null-safe slots in `ArticleLayout` (hero below H1, supporting after body) — they render nothing until optimized images exist.
- Per-page OG images are produced by the pipeline but **not** wired into metadata, keeping SEO metadata untouched.
