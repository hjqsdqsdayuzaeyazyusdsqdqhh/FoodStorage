# HomeStorageGuide.com
## Phase 2 — Design System, Content Framework & Production Blueprint

**Status:** Production specification (Phase 2 — documentation only; no articles, no code, no frontend)
**Builds on:** Phase 1 — Foundation & SEO Architecture (single source of truth; URL scheme, categories, pillars, clusters, and linking rules are LOCKED and reused verbatim)
**Audience:** Designers, developers, SEO specialists, content writers, editors
**Primary sources applied:** *Made to Stick* (Copywriting Master Guide) and *Neil Patel's Advanced Cheat Sheet to SEO* (SEO Master Guide), exactly as encoded in Phase 1

---

## 0. How to Use This Document

This document is the complete production contract for HomeStorageGuide.com. It answers "how does every page look, get built, get written, and get published?" It is organized into 10 deliverables:

| # | Deliverable | Owner | Converts to |
|---|---|---|---|
| 1 | Design System | Designer + Dev | Figma/design tokens + CSS foundation |
| 2 | Page Templates | UX + Content lead | Wireframes + CMS layout definitions |
| 3 | Content Template System | Editorial | Content briefs + editor checklists |
| 4 | Component Library | Dev + Design | Reusable UI modules |
| 5 | Image System | Art director + Content | Image pipeline + asset standards |
| 6 | Internal Linking System | SEO | Link maps per page type |
| 7 | Content Quality Standards | Editorial + SEO | Production QA gate |
| 8 | Affiliate & AdSense Strategy | Monetization + SEO | Ad/affiliate placement rules |
| 9 | Development Specification | Dev | Codebase structure + conventions |
| 10 | Phase 3 Preparation | Project manager | Go-live checklists + workflows |

**Non-negotiables inherited from Phase 1 (do not redesign):**
- Domain `HomeStorageGuide.com`, brand **Home Storage Guide**, tagline **"Smart Food Storage, Shelf Life & Pantry Organization."**
- One-sentence promise: *"Home Storage Guide tells you exactly how long food lasts and how to keep it safe."*
- 3 pillars: Shelf Life · Storage Methods · Pantry Organization. Six URL roots: `/shelf-life/`, `/storage-methods/`, `/pantry-organization/`, `/comparisons/`, `/reviews/`, `/tools/`.
- Voice: 9th-grade reading level, conversational, concrete. SUCCESs discipline: Simple, Unexpected, Concrete, Credible, Emotional, Stories.
- Snippet pattern: H2 question → 40–60 word direct answer → elaboration. Depth: 1,500–2,500 words info, 2,000–3,500+ pillar/comparison.
- Link rules: every page ≥3 internal inbound links; 2–4 in-text links per 500 words; descriptive anchors; money pages linked contextually.
- EEAT gate: byline + reviewer + date on every page; citations (USDA/FDA/CDC/extension/peer-reviewed) on every numeric claim.

Every spec below includes a short **Why** so decisions are maintainable, not just mandated.

---

# DELIVERABLE 1 — DESIGN SYSTEM

## 1.1 Design Principles

| Principle | Definition | Why (source link) |
|---|---|---|
| **Calm & clean** | Restrained layout; content is the hero; visual noise is the enemy | Helps readers (and Google) parse answers instantly; "Simple" (Made to Stick) |
| **Concrete** | Real foods, real numbers, real temperatures rendered visibly — never abstract illustration | "Concrete over abstract" (Made to Stick) |
| **Trustworthy** | Stable, predictable components; clear sources, dates, authors | EEAT is a ranking gate in this YMYL-adjacent niche (Phase 1 §7) |
| **Mobile-first** | Design for 320px up; tables and cards degrade gracefully | Voice/mobile dominates; Core Web Vitals are non-negotiable (Phase 1 §8) |
| **Content-first & AdSense-safe** | Ads occupy reserved slots; content never squeezed; ad density capped | AdSense-compliance by design + Helpful Content posture (Phase 1 §7.3) |
| **Accessible** | WCAG 2.1 AA from the foundation, not retrofitted | Ranking + UX + AdSense eligibility (Phase 1 §8) |

## 1.2 Color System

Semantic tokens (not raw hex) so themes can evolve without rework. All text/background combinations below are WCAG AA contrast-checked (4.5:1 text, 3:1 large text/UI).

### Brand palette — "Fresh & Pantry"

| Token | Value | Usage | AA on white? |
|---|---|---|---|
| `--brand-green-700` | `#1B5E3B` | Dark brand green: link hover, headings accents, primary button hover | ✅ 7.4:1 |
| `--brand-green-600` | `#2E7D4F` | **Primary brand green**: primary buttons, active nav, key links | ✅ 5.1:1 |
| `--brand-green-500` | `#3E945F` | Hover states, focus rings | ✅ 4.1:1 (large text/UI) |
| `--brand-green-100` | `#E3F1E8` | Tinted section backgrounds, tip boxes | — |
| `--brand-amber-600` | `#B5712F` | Secondary brand: "method" badges, step markers | ✅ 5.0:1 |
| `--brand-amber-100` | `#FBF0E2` | Tinted backgrounds (how-to sections) | — |
| `--brand-ink-900` | `#1B1B1B` | Primary body text | ✅ 17.4:1 |
| `--brand-ink-700` | `#3F3F3F` | Secondary text, captions | ✅ 11.5:1 |
| `--brand-ink-500` | `#666666` | Muted text (metadata, disclaimers) | ✅ 5.7:1 |
| `--brand-ink-300` | `#9E9E9E` | Disabled, placeholder text | ⚠️ borders only, not text |
| `--brand-paper` | `#FFFFFF` | Page background | — |
| `--brand-paper-soft` | `#F6F7F5` | Section backgrounds, alternating rows | — |
| `--brand-line` | `#E4E7E2` | Borders, dividers, table rules | — |

**Why:** green = freshness + safety + food; amber = pantry warmth; both read as "food" without kitchen-sink cliché. High-contrast ink ensures 9th-grade readability is matched by visual legibility (Simple + Concrete).

### Semantic palette (content-critical)

| Token | Value | Background | Used for | Contrast |
|---|---|---|---|---|
| `--sem-danger-700` | `#B3261E` | `#FDECEA` | **Food safety warning boxes** (never decorative) | 7.2:1 |
| `--sem-danger-600` | `#C62828` | — | Warning icons, links in warnings | 5.7:1 |
| `--sem-warning-800` | `#8A4B08` | `#FEF3C7` | Caution/storage-risk notes | 7.3:1 |
| `--sem-success-700` | `#1E7A44` | `#EAF6EE` | Storage tip boxes, "safe to eat" verdicts | 5.6:1 |
| `--sem-info-700` | `#1D5F9E` | `#E8F2FB` | General notices, source callouts | 6.6:1 |

**Content rule:** The three content-critical boxes are *semantically typed*, not stylistically chosen — a writer cannot change a danger box to a tip box. This is a food-safety trust contract (EEAT, Phase 1 §7).

### Color usage rules

1. Never use color alone to convey meaning (always pair with icon + text) — WCAG 1.4.1.
2. Brand green reserved for interactive + brand elements only; body text is ink.
3. Links: green-600 underlined; hover green-700. Focus ring green-500 2px offset.
4. Danger color is reserved exclusively for genuine health/safety content — frequency builds meaning (Credible, Made to Stick: a warning that appears rarely is believed).

## 1.3 Typography

### Type families

| Role | Family | Weights | Why |
|---|---|---|---|
| Display & headings | **Plus Jakarta Sans** | 600, 700, 800 | Friendly, modern, strong but not corporate; reads "helpful neighbor" (brand personality) |
| Body & UI | **Inter** | 400, 500, 600, 700 | Best-in-class legibility at small sizes; tabular numerals for data |
| Data/tables | **Inter (tabular-nums)** | 400, 600 | Shelf-life durations align in columns |

**Why:** two families max keeps CLS stable (webfont subsetting) and rendering fast; geometric sans = Simple; tabular figures = concrete numbers line up (Concrete, Made to Stick).

### Fluid type scale (mobile-first, `clamp()`)

| Token | Desktop size | Mobile size | Line-height | Usage |
|---|---|---|---|---|
| `display` | 2.75rem / 44px | 2rem / 32px | 1.15 | Homepage H1 only |
| `h1` | 2.25rem / 36px | 1.75rem / 28px | 1.2 | Page H1 (one per page) |
| `h2` | 1.625rem / 26px | 1.375rem / 22px | 1.25 | Section headings |
| `h3` | 1.25rem / 20px | 1.1875rem / 19px | 1.3 | Sub-sections |
| `h4` | 1.125rem / 18px | 1.0625rem / 17px | 1.35 | Rarely used; prefer lists |
| `body-lg` | 1.125rem / 18px | 1.0625rem / 17px | 1.7 | Longform paragraphs |
| `body` | 1rem / 16px | 1rem | 1.6 | Default UI + prose |
| `small` | 0.875rem / 14px | 0.875rem | 1.5 | Captions, metadata, bylines |
| `micro` | 0.75rem / 12px | 0.75rem | 1.4 | Footnotes, disclaimers, legal |

### Readability rules

1. Measure (line length): prose 65–75 characters (approx 700px column). Never full-width paragraphs.
2. Never justify text (ragged-right; no rivers, better readability).
3. Body text ≥ 16px; `small` never used for essential instructions.
4. Headings use `letter-spacing: -0.01em`; body `letter-spacing: normal`.
5. 9th-grade target: enforce via Hemingway editor score ≤ 8 in QA (Phase 1 §3.1, Neil Patel readability + voice search).
6. Numbers that matter (temperatures, durations) always in tabular numerals and never split across lines (`white-space: nowrap`).

## 1.4 Spacing System

8px base unit (4px for micro-adjustments).

| Token | px | Typical use |
|---|---|---|
| `space-1` | 4 | Icon/atom gaps |
| `space-2` | 8 | Inline element gaps, badge padding |
| `space-3` | 12 | Compact list gaps |
| `space-4` | 16 | Component padding, card padding |
| `space-5` | 20 | Button horizontal padding |
| `space-6` | 24 | Section inner padding, card grids gutter |
| `space-8` | 32 | Module gaps |
| `space-10` | 40 | Between content blocks |
| `space-12` | 48 | Section breaks (mobile) |
| `space-16` | 64 | Section breaks (desktop) |
| `space-24` | 96 | Top-level page rhythm (desktop) |

**Rhythm rule:** vertical spacing between *sibling* content blocks = `space-10`/`space-12`; between *parent* sections = `space-16`/`space-24`. Consistent rhythm is a readability + CLS stabilizer.

**Why:** a strict scale prevents ad-hoc spacing drift across hundreds of template-built pages (scalability, Phase 1 §11).

## 1.5 Grid System

| Level | Columns | Gutter | Container |
|---|---|---|---|
| Mobile (<640px) | 4 | 16px | fluid, max 1200px |
| Tablet (640–1023px) | 8 | 24px | fluid |
| Desktop (≥1024px) | 12 | 24px | max 1200px |

**Standard layouts:**

```
Article layout (guides, reviews, comparisons):
+------------------------------------------+---------+
|  Main content column: 7 cols (~720px)    | Aside   |
|                                          | 3 cols  |
|                                          | (~320px)|
+------------------------------------------+---------+
             gap: 48px desktop / 0 mobile

Card grid: 4-col page grid → 3 cards/row desktop, 2 tablet, 1 mobile
Tool layout: centered single column max 860px
Hub page: card grid + featured modules
```

**Rules:**
1. Content column never exceeds 720px for prose; full-width allowed only for tables/charts/tools within max-width.
2. Ads occupy their own grid slots — content is never reflowed to fit ads.
3. Aspect-ratio cards use `aspect-ratio` CSS (no CLS from images).

## 1.6 Core Components (Design Tokens applied)

### 1.6.1 Buttons

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| Primary | green-600 | white | none | Main CTA (search, tool actions, primary links) |
| Secondary | amber-600 | white | none | Method/guide actions |
| Tertiary / ghost | transparent | green-700 | 1px line | Secondary actions inline |
| Danger | danger-600 | white | none | Destructive only (never content) |

- **Sizes:** `md` 40px height (touch-target OK), `lg` 48px (primary CTAs); both ≥44px tap targets on mobile (WCAG 2.5.5).
- **States:** hover darkens 8%; focus = 2px green-500 ring offset 2px; active pressed 95%; disabled 50% opacity (still focusable).
- **Radius:** 8px (subtle, modern; not pill).
- **Content rules:** 2–5 words, verb-led ("Check the chart", "Open the calculator"), never "Click here" (Phase 1 §10.2 anchor doctrine applies to buttons too).
- **A11y:** real `<button>`/`<a>`; aria-label when icon-only; no text as background-image.

### 1.6.2 Cards

- Base: white, 1px `line` border, radius 12px, shadow only on interactive hover (elevation `--shadow-1` soft, no harsh drop).
- Anatomy: media (16:9 or 1:1) → title (h3) → description (2 lines max) → metadata row → link ("Read more" styled as underlined text-link, not a button).
- Variants: **Category card** (icon + label), **Food card** (photo + name + shelf-life micro-badge), **Guide card** (kicker badge + title + excerpt), **Tool card** (icon + title + one-line promise).
- Entire card is clickable (stretched link) with visible focus ring — one anchor, no nested links (WCAG 2.4 + crawlable HTML anchor, Phase 1 §8).
- **SEO note:** card titles must match H1 anchors of destinations (anchor text = title, Phase 1 §10.2).

### 1.6.3 Tables (the most important component)

Shelf-life and data tables are the site's core product (snippet targets). Spec:

- Wrapper `.table-scroll` for horizontal scroll on mobile (never shrink columns illegibly).
- **Header row:** ink-900 background, white text, 600 weight (high contrast, sticky on desktop).
- **Row rules:** 1px `line`; zebra striping with `paper-soft` on even rows.
- **Duration column:** tabular-nums, semibold green-700 — the answer column is visually loudest (Concrete).
- **Mobile behavior:** primary key column (food name) frozen-left OR table becomes stacked cards per row. Pick frozen-first-column at ≥640px, stacked-cards below.
- **A11y:** `<caption>` visible for every table; proper `th scope="col"`/`row`; no empty cells — use "—" with `aria-label`.
- **SEO:** tables are the #1 featured-snippet extraction format (Phase 1 §3.2). Every shelf-life table ships with a JSON-LD companion where applicable and a "copy/print" affordance.
- **Row data rules:** each row cites its source via footnote marker (`[1]`) linking to the sources section.

### 1.6.4 Badges

- Pill-shaped, radius 999px, 12px/14px text, `space-2` padding.
- Semantic set: `Kicker` (category label, green-100 bg/green-700 text), `Method` (amber), `Safety` (danger), `Updated <month> <year>` (ink-500), `Verified` (green with check icon), `Affiliate` (ink, always present when applicable — trust).
- Rules: badges are metadata, never substitute for headings; max 2 per card header; not interactive.

### 1.6.5 Icons

- Line icon set, 24×24 viewBox, stroke 1.75, rounded caps/joins; filled variants only for ratings (stars) and warnings.
- Required set: search, clock, snowflake, thermometer, fridge, jar, box, calendar, check-circle, alert-triangle, info, external-link, printer, share, pin (Pinterest), leaf, home, chevron-right/left, star, magnifier.
- Icon + text pairs always (icon-only only with aria-label); icons inherit `currentColor`.
- **Why:** consistent iconography teaches the system (Simple); icons never carry the meaning alone (WCAG 1.1.1, color + non-text contrast 1.4.11).

### 1.6.6 Alerts & Content Boxes (the four typed boxes)

One container system, four semantic types (design stays identical; color/icon/label change):

| Box | Label | Icon | Colors | Use |
|---|---|---|---|---|
| **Food Safety** | "Food safety" | alert-triangle | danger | Health risks, unsafe storage, botulism, "discard if..." |
| **Warning** | "Watch out" | alert-triangle (outline) | warning | Storage-risk, not health-critical ("may turn to mush") |
| **Storage Tip** | "Storage tip" | lightbulb/check | success | Practical win, extend-life trick |
| **Note / Source** | "Note" / "Source" | info | info | General clarification, citation callout |

- Anatomy: icon (24px) + bold label + body (body-sm), radius 12px, tinted bg + 1px border of matching hue, `space-4` padding.
- Placement rule: inside flow, directly under the claim they qualify; never inline inside a table cell.
- **Why (Made to Stick):** typed boxes are the "flag" system — readers learn to trust the red box because it's rare and means something specific (Credibility through consistency).

### 1.6.7 Forms

- Fields: label above input (always visible, never placeholder-as-label), 44px min height, 1px line border, radius 8px, focus = green ring.
- Error states: inline message with error icon, red text + red border; errors announced via `aria-live`.
- Success: green check inline.
- Newsletter pattern: email field + submit button (not a bare "Sign up" link); GDPR-friendly single opt-in copy.

### 1.6.8 Search Box

- Anatomy: 16px search icon left, input, submit button (or live results on tools pages).
- Desktop: 240–360px in header; Mobile: icon button expands full-width overlay panel.
- Results: drop panel with "top answers" (snippet-style) + full results link. **SEO:** results render as crawlable URLs (Phase 1 §8), no AJAX-only.
- Placeholder text is a query, not "Search": *"Try 'how long does milk last'"* (voice-search mirror + teaches intent).

### 1.6.9 Navigation

- **Primary nav:** logo | Shelf Life | Storage Methods | Pantry Organization | Tools. Desktop = top bar; mobile = hamburger → slide-in drawer (focus-trapped, Esc closes, overlay click closes).
- **Sub-navigation:** mega-menu/drill-down lists subcategories (dairy, produce, meat…). Must match hub-and-spoke (Phase 1 §4.3).
- Sticky header only on content pages after scrolling 200px; never covers content; adds no CLS (reserve height).
- **SEO:** nav links are HTML anchors; active state = aria-current="page"; no JS-only links (Phase 1 §8).

### 1.6.10 Sidebar (article aside)

- Desktop only (≥1024px). Contents (priority order): Table of contents (jump links) → Quick answer box → Related guides (3) → Newsletter mini → Ad slot (reserved) → Author mini-box.
- Mobile: these modules reflow into the article flow (TOC becomes collapsible near top; others drop after content).
- Sticky on scroll, but stops before footer; max width 320px.
- **Why:** sidebar holds the "answer modules" that support snippets + dwell time without competing with the content column (UX + Core Web Vitals).

### 1.6.11 Footer

- Full-width, ink-900 background, white text (AA on dark: verify all tokens ≥4.5:1 on `#1B1B1B`).
- Rows: 1) brand blurb + tagline + one-liner promise; 2) category tree (all six roots + key subcategories); 3) legal row: Affiliate disclosure, Privacy, Terms, Contact, Editorial policy, sitemap, © year.
- Newsletter signup (single field) optional here; prefer dedicated blocks.
- **SEO:** footer links = trusted structural anchors for all hubs (every page links all hubs → reinforces pillars, Phase 1 §10.3).

### 1.6.12 Breadcrumbs

- Pattern: Home › Shelf Life › Dairy › *How Long Does Milk Last*
- Trailing item = current page, not a link; separator chevron-right; microdata `BreadcrumbList` JSON-LD on every content page.
- Truncate long paths with ellipsis on mobile (keep first + last two).

### 1.6.13 Call-to-Action (CTA) Blocks

- Full-width band, green-100 tinted bg, centered: headline (2–6 words) + body (1 line) + primary button.
- **Content rules:** one CTA per *section*, max 2 per article; CTA must match the reader's next step ("Look up the full shelf-life chart", "Find the right container in our comparison"). Never generic "Learn more".
- **Affiliate CTA variant** (reviews only): separate component, clearly labeled, includes disclosure line (Phase 1 §7.3).

### 1.6.14 Newsletter Blocks

- Anatomy: heading ("Get the storage cheat sheet") + one-line benefit + email field + button + privacy microcopy.
- Placed: after first 50% of long articles (≥1,500 words) and end-of-article; never before content (no ad-like interruption).
- Success/failure states per Forms (1.6.7).

### 1.6.15 FAQ Blocks

- `<details>`-based accordion (native, no JS) with visible question heading; each item = one H3 (or accordion content) answering one PAA question.
- Only questions with real search volume go here (from PAA research); content must answer fully in 40–80 words.
- Schema: FAQPage JSON-LD (as appropriate under current Google guidance).
- **Why:** PAA-driven FAQ blocks are both UX and snippet strategy (Phase 1 §3.2; Neil Patel snippet doctrine).

### 1.6.16 Comparison Tables

- Specialized table: attribute rows, two+ product/method columns; "winner" column cell highlighted green-100 with check icon.
- Mobile: horizontal scroll OR flip to stacked attribute cards; scroll preferred to preserve comparison at a glance.
- Always followed by verdict box (quick answer) — never left hanging.

### 1.6.17 Review Box

- The monetizable summary: score (0–5, half-star granularity) + verdict headline + pros/cons + "check price" buttons (affiliate) + disclosure line.
- Placement: top of review page (right after intro) for snippet + CTA value; repeated compressed at bottom.
- Score must be justified by rubric (factors table) — never arbitrary (EEAT trust).

### 1.6.18 Pros & Cons Box

- Two-column: green check list (Pros) / red x list (Cons). Equal visual weight — no pro bias.
- 3–7 bullets each, concrete and specific ("holds 1-liter mason jars", not "good quality").

### 1.6.19 Storage Tip Box

See 1.6.6 (success type). Single-purpose: actionable, one tip, 1–2 sentences.

### 1.6.20 Warning Box

See 1.6.6 (warning type). Non-health storage cautions.

### 1.6.21 Food Safety Notice Box

See 1.6.6 (danger type). Health/safety critical. Must include a direct instruction verb ("discard", "do not taste", "cook to 165°F").

## 1.7 Motion

- Durations 150–250ms; easing `cubic-bezier(0.2, 0, 0, 1)`; only opacity + transform.
- `prefers-reduced-motion: reduce` → disable all non-essential motion.
- **Why:** motion is UX polish, never a CLS contributor; reduced-motion is an accessibility requirement.

## 1.8 Breakpoints

| Name | Range | Behavior change |
|---|---|---|
| base | < 640px | Stack everything; tables scroll/stack |
| sm | ≥ 640px | 8-col; cards 2-up |
| md | ≥ 768px | Sidebar can appear |
| lg | ≥ 1024px | 12-col; sidebar fixed; 3-up cards; sticky elements |
| xl | ≥ 1200px | Container caps at 1200px |

## 1.9 AdSense Layout Constraints (Design System level)

1. Ad slots are reserved `min-height` placeholders in the grid; content is never reflowed to accommodate ad size (CLS protection).
2. No ad above the H1; no in-content ad before the first 25% of the article; max 2 in-content slots per article + 1 sidebar + 1 end-of-article.
3. Ad unit styling: no background that mimics content; explicit "Ad" or "Sponsored" label; standard 300×250 / 336×280 / 728×90 / 970×90 / in-feed only where permitted.
4. Zero sticky ads that cover > 15% of viewport height; zero interstitials/overlays (Helpful Content + intrusive-interstitial policy).
5. All ad placeholders hidden from screen readers (`aria-hidden`) until filled.

## 1.10 Accessibility Baseline (applies to every component)

| Requirement | Standard |
|---|---|
| Contrast | 4.5:1 text, 3:1 large/UI (WCAG 1.4.3, 1.4.11) |
| Keyboard | All interactive elements operable, visible focus, logical tab order |
| Touch targets | ≥ 44px on touch (WCAG 2.5.5) |
| Heading order | Single H1, no skipped levels, sequential |
| Landmarks | header/nav/main/aside/footer; `main` once |
| Alt text | Meaningful; empty `alt=""` for decorative; no keyword stuffing |
| Forms | Visible labels, inline errors, aria-live announcements |
| Reduced motion | Supported globally |
| Reading order | DOM order = visual order (no visual reordering that breaks SR) |

---
# DELIVERABLE 2 — PAGE TEMPLATES

Sixteen reusable templates. Each template defines: purpose, URL pattern (verbatim from Phase 1 §9), schema, section order (flow diagram), content hierarchy, word count, CTA placement, internal links, FAQ/image/table placement, and related-articles module.

**Universal skeleton every template inherits:**

```
<header>       logo · nav · search
<main>
  <article>
    breadcrumb
    H1 + kicker badge
    byline / review-date strip     ← every page (Phase 1 §7)
    quick answer block             ← every page (snippet doctrine)
    [content sections per template]
    FAQ block (when applicable)
    sources & citations            ← every page
    author box                     ← every page
    related content                ← every page
  </article>
  <aside>      TOC · quick answer · related · newsletter · ad slot (desktop)
</main>
<footer>       brand · category tree · legal
```

**Meta/SEO shell for every template (identical rules):**
- Title tag: `H1 pattern — Home Storage Guide` (≤ 60 chars ideal; brand suffix after a separator).
- Meta description: 140–160 chars, question-form or benefit, includes primary keyword, action verb.
- Canonical, OpenGraph, Twitter card, BreadcrumbList JSON-LD, Organization/WebSite on home.
- Core Web Vitals budget: LCP image ≤ 200KB, no render-blocking JS above fold, CLS-safe media.

---

## 2.1 Homepage

- **Purpose:** Search + navigation hub; brand promise delivery in 5 seconds (Phase 1 §6).
- **URL:** `/`
- **Schema:** WebSite + SearchAction, Organization, ItemList (top answers), BreadcrumbList (n/a), FAQPage (optional homepage FAQs).
- **Word count:** 250–450 words on-page (homepage is a launcher, not an article).

```
Section order (matches Phase 1 §6.1 exactly):
1. Header (nav + search)
2. HERO: H1 "How long does your food really last?"
   subhead (Phase 1 §6.3 copy) + big search bar + stat chip "300+ foods"
3. Pillar cards (3): Shelf Life / Storage Methods / Pantry Organization
4. Search-intent quick links (Can you freeze…? Does X go bad? Best containers?)
5. Featured shelf-life table sample (top 10 foods) → CTA to /shelf-life/
6. Tools strip (shelf-life calculator · expiration checker · storage finder)
7. Authority/EEAT strip (sources, authors, review process — logo-free trust)
8. Story/emotion block (one real pantry-save story) + CTA
9. Newsletter block
10. Footer
```

- **Internal links:** all 6 category roots (footer), 3 hubs (cards), top-10 foods (table), 3 tools, top 5 articles (related module). Total ≈ 35–45 links (home is the largest link hub by design).
- **CTAs:** hero search (primary), 1 CTA after table, 1 after story. Max 3.
- **Image placement:** hero background optional (photo: organized pantry, dark green overlay for contrast); 3 pillar card thumbnails; 1 story photo. No images above the search bar that compete with it.
- **Why:** the homepage mirrors on-site search intent (voice-search mirror) and pushes authority to pillars first (authority flow, Phase 1 §10.3).

## 2.2 Category Page (subcategory index, e.g. /shelf-life/dairy/)

- **Purpose:** Own one subcategory (dairy, produce, freezing…) and link every spoke.
- **URL:** `/shelf-life/dairy/` (max 3 segments, Phase 1 §9).
- **Schema:** BreadcrumbList, ItemList of spokes, CollectionPage.
- **Word count:** 300–600 words of *unique* intro/overview (the rest is cards) — thin-content guard applies (Phase 1 §12 risk #1).

```
1. Breadcrumb
2. H1 ("Dairy shelf life") + kicker (category)
3. Intro: 2–3 paragraphs — concrete overview + 1 vivid example (Made to Stick)
4. Quick answer box (snippet: "How long does dairy last?" → 40–60 word answer)
5. Food card grid (all spokes, sorted by popularity; each card shows shelf-life badge)
6. Storage method link module (fridge/freezer methods that apply to this category)
7. Newsletter (compact)
8. Sources
9. Related categories (siblings)
```

- **H2 → H1 mapping rule:** each card title = the spoke's H1 verbatim (anchor = title doctrine).
- **Internal links:** every spoke (children), parent hub, sibling categories, 2 method pages. Every spoke here counts toward its ≥3 inbound requirement.
- **FAQ:** 2–3 category-level PAA questions (e.g., "Does dairy freeze well?").
- **Why:** subcategories are the mid-level of hub-and-spoke (Phase 1 §4.3); they distribute authority top-down.

## 2.3 Pillar Page (hub, e.g. /shelf-life/)

- **Purpose:** Authority anchor for the head keyword ("food shelf life chart", "food storage methods", "pantry organization").
- **URL:** `/shelf-life/` (root-level hub).
- **Schema:** BreadcrumbList, ItemList, FAQPage.
- **Word count:** 1,500–2,500 words (a real resource, not a link farm — HCU compliance).

```
1. Breadcrumb
2. H1 (head keyword) + kicker
3. Intro with 1 vivid statistic ("the average household wastes $X/year…")
4. Quick answer box (snippet for the head keyword)
5. Master data module: THE searchable shelf-life chart (300 foods) with filters
6. Subcategory blocks (dairy, produce, meat, pantry, freezer) each with spoke links
7. Core method links (storage methods that govern shelf life)
8. Featured guides (top 3–5 by authority)
9. FAQ block (5–8 PAA questions)
10. Newsletter
11. Sources
12. Related content (cross-pillar: methods + pantry)
```

- **Internal links:** ALL children (subcategories + flagship spokes), 2 sibling hubs, 3 tools, 3 reviews/comparisons (money pages, contextual). Pillar pages carry the heaviest link load (≤ 120 links acceptable via nav modules + tables).
- **CTAs:** 1 to tools, 1 to newsletter, 1 to the companion method guide. Max 3.
- **Why:** pillars are the engine of topical authority (Phase 1 §5.1); the master chart makes the hub a genuine destination (link magnet + snippet owner).

## 2.4 Shelf Life Page (flagship spoke)

- **Purpose:** Answer "How long does [food] last?" completely (the site's core SKU, 300×).
- **URL:** `/shelf-life/dairy/how-long-does-milk-last`
- **Schema:** BreadcrumbList, FAQPage, Article (optional Recipe-type metadata where relevant).
- **Word count:** 1,200–2,000 words. **Never thin** (Phase 1 §12 risk #1).

```
1. Breadcrumb (Home › Shelf Life › Dairy › Milk)
2. H1: "How Long Does [Food] Last?" + kicker (category) + last-updated badge
3. Byline strip: author, reviewer, reviewed date
4. QUICK ANSWER BOX (40–60 words — direct answer under H1; snippet target)
   → "Milk lasts 5–7 days past the printed date if kept at 40°F or below.
      Keep it in the back of the fridge, not the door. Freezing extends
      shelf life up to 3 months but changes texture."
5. Storage conditions section (pantry / fridge / freezer) — sub-H3s
6. THE SHELF-LIFE TABLE (storage | duration | notes) — snippet table
7. How to tell if it's bad (spoilage signs — concrete list)
8. Storage tip box (extend-life trick)
9. Food safety notice box (when present: discarding instructions)
10. FAQ block (3–5 PAA questions: "Does [X] need to be refrigerated?",
    "Can you freeze [X]?", "How long past the date is [X] safe?")
11. Related foods (sibling spokes)
12. Sources & citations
13. Author box
14. Related content
```

- **Internal links:** parent subcategory, parent hub (anchor "shelf life"), 3–5 sibling foods, 2 storage-method pages, 1 comparison/container page (money), 1 tool (calculator). Outbound ≈ 10–15.
- **Image placement:** 1 featured (16:9), 1 storage-diagram or temperature chart where relevant, alt-rich. No images before the quick answer.
- **FAQ:** exactly the PAA family for this food.
- **Why:** this template is engineered to win "how long does X last" snippets — question H1, direct answer, table, PAA coverage (Phase 1 §3.2; Ahrefs top-30 snippet words).

## 2.5 Food Storage Guide (method guide, e.g. how to freeze meat)

- **Purpose:** Teach one method (freezing, vacuum sealing, canning, dehydrating…).
- **URL:** `/storage-methods/freezing/how-to-freeze-meat`
- **Schema:** BreadcrumbList, HowTo (where genuinely step-based), FAQPage, Article.
- **Word count:** 1,500–2,500 words.

```
1. Breadcrumb
2. H1: "How to [Freeze] [Food]: The Complete Guide" + method badge
3. Byline strip
4. Quick answer / TL;DR (steps in 1 paragraph)
5. Why it works (1–2 paragraphs, concrete)
6. Step-by-step section (numbered, each step = H3, each with an image)
7. Equipment & containers list (+ container comparison link)
8. Duration & temperature table (storage method | temperature | duration)
9. Common mistakes / troubleshooting (bullets)
10. Warning box (when relevant) + storage tip box
11. FAQ block (3–5 PAA)
12. Related guides (sibling methods + foods this applies to)
13. Sources, Author box, Related content
```

- **Internal links:** parent hub, sibling method guides, 3–5 foods this applies to (cross-entity, Phase 1 §5.2), 2 container reviews/comparisons (money), 1 tool. ≈ 12–18 outbound.
- **Image placement:** each step = 1 image (16:9 or 4:3); temperature chart; equipment photo. Steps without images are the exception.
- **CTA:** 1 "see the container comparison" + 1 newsletter.
- **Why:** numbered steps with images = HowTo + snippet targets; method guides connect the food entity graph (Phase 1 §5.2).

## 2.6 Pantry Organization Guide

- **Purpose:** Systems and layouts (FIFO, zones, rotation, labels, inventory).
- **URL:** `/pantry-organization/the-fifo-pantry-system`
- **Schema:** BreadcrumbList, Article, FAQPage, (HowTo only if truly procedural).
- **Word count:** 1,500–2,500 words.

```
1. Breadcrumb
2. H1 + kicker (Pantry Organization)
3. Byline strip
4. Quick answer (the system in one paragraph)
5. Before/after framing: the vivid problem (Concrete — "the jar you forgot")
6. The system: core rules (numbered/H3)
7. Zone/layout diagram (image) + steps to set it up
8. Container & label standards (+ comparison links)
9. Rotation rules (FIFO) + printable checklist link
10. FAQ block (3–5 PAA)
11. Related guides + tools (pantry audit tool)
12. Sources, Author box, Related content
```

- **Internal links:** parent hub, sibling org guides, container reviews/comparisons (money), 2 tools, 2 shelf-life spokes (rotation needs dates). ≈ 12–18.
- **Why:** pantry guides monetize via containers (money page adjacency) and link to the shelf-life engine (FIFO depends on dates).

## 2.7 Product Review

- **Purpose:** EEAT-first, affiliate-ready evaluation (Phase 1 §11 monetization).
- **URL:** `/reviews/oxo-good-grips-container-review`
- **Schema:** BreadcrumbList, Product + AggregateRating (own rating, honest), Review, FAQPage.
- **Word count:** 1,800–3,000 words.

```
1. Breadcrumb
2. H1: "[Product] Review: Is It Worth It?" + "Review" badge
3. Byline strip + disclosure line (affiliate, always visible — Phase 1 §7.3)
4. REVIEW SUMMARY BOX (top, for snippet + CTA):
   score · verdict · pros/cons · price-check buttons
5. First impressions (Experience signal: "we tested in our own kitchen")
6. Testing methodology ("How we test" — named, repeatable)
7. Key features (each = H3 with concrete detail)
8. Performance in real use (test data, photos)
9. Pros & Cons box (equal weight)
10. Price & value section (+ alternatives links)
11. Who it's for / who it's not for
12. FAQ block (3–5)
13. Verdict (repeat summary, compressed)
14. Related reviews + comparisons + related guide
15. Sources, Author box, Related content
```

- **Internal links:** parent `/reviews/`, 2–3 comparison pages (same product family), 2 guides using the product, sibling reviews. ≈ 10–15.
- **CTA:** price-check buttons (affiliate) ×2–3, disclosure adjacent.
- **Image:** 6–10 real photos (unboxing, in-use, measurements) + score table. No stock-photo-only reviews (EEAT experience).
- **Why:** honest, testable reviews are the long-term affiliate asset; scoring rubric = trust (Phase 1 §13 opportunity #9).

## 2.8 Comparison

- **Purpose:** "X vs Y" decisions (containers, jars, methods, sealers).
- **URL:** `/comparisons/glass-vs-plastic-food-storage`
- **Schema:** BreadcrumbList, Article, FAQPage; (Product pairs where applicable).
- **Word count:** 1,500–2,500 words.

```
1. Breadcrumb
2. H1: "[A] vs [B]: Which Is Better for [Use]?" + kicker
3. Byline strip
4. VERDICT BOX (quick answer: who should pick which, in 40–60 words)
5. At-a-glance comparison table (criteria rows × A/B columns, winner highlighted)
6. Section per criterion (price, durability, safety, weight, best for…) — each H3
7. Use-case recommendations ("Choose A if… Choose B if…")
8. Winner verdict summary + comparison table repeated (compressed)
9. FAQ block (3–5)
10. Related comparisons + reviews + guides
11. Sources, Author box, Related content
```

- **Internal links:** parent `/comparisons/`, sibling comparisons, 2 reviews (the compared products), 2 guides. ≈ 10–15.
- **Why:** comparisons are high commercial intent + snippet friendly ("vs" is a top snippet word — Ahrefs list, Phase 1 §3.2).

## 2.9 Tool Page

- **Purpose:** Interactive utilities (calculators, checkers, finders, generators).
- **URL:** `/tools/shelf-life-calculator`
- **Schema:** BreadcrumbList, WebApplication/SoftwareApplication where appropriate, Article (short).
- **Word count:** 300–600 words (the tool is the content; text supports it).

```
1. Breadcrumb
2. H1: "[What] Calculator — How Long Does Your [X] Last?" (one-sentence explanation)
3. TOOL EMBED (full width, centered, max 860px)
4. How to use it (3 steps, short)
5. How the math works (transparency = trust)
6. FAQ block (2–3)
7. Related guides (2–3) + related tools (2)
8. Sources, Author box
```

- **Internal links:** parent `/tools/`, 2–3 guides that use the tool, sibling tools. ≈ 6–10.
- **CTA:** newsletter (tool users convert well), related tools.
- **Why:** tools are link magnets + zero-click wins (Phase 1 §13 opportunity #4); each tool duplexes with a guide (Phase 1 §10.1).

## 2.10 Blog Article

- **Purpose:** Timely, shareable, shoulder-niche-friendly content (link building, Phase 1 §3.4). Lives outside the hub-and-spoke core but within a pillar.
- **URL:** `/blog/<slug>` (new root reserved; does not disturb core taxonomy — Phase 1 §11).
- **Schema:** Article (NewsArticle only for genuinely newsworthy), BreadcrumbList, FAQPage.
- **Word count:** 1,200–2,500 words.

```
1. Breadcrumb (Home › Blog › …)
2. H1 + kicker (topic) + date
3. Byline strip
4. Lede: hook in 1–2 sentences (Unexpected/Stories — Made to Stick)
5. Body (H2/H3s, scannable, one vivid example)
6. In-body CTA to the relevant pillar page (once)
7. FAQ block (2–4)
8. Author box
9. Related core content (the pillar page this blog supports)
10. Sources
```

- **Internal links:** 1–3 to the core pillar (the blog's purpose is feeding the hub), 1–2 sibling blogs, 1 money page max. Keep blog→core ratio high.
- **Why:** blogs are the shoulder-niche outreach vehicle; they exist to acquire links and route authority into the core (Phase 1 §3.4).

## 2.11 Author Page

- **Purpose:** Publicize expertise (EEAT, Phase 1 §7.1).
- **URL:** `/authors/<author-slug>`
- **Schema:** Person (sameAs, jobTitle, affiliation), ProfilePage.
- **Word count:** 200–400 words + credentials block.

```
1. H1: author name
2. Headshot (concrete, human — 4:5)
3. Bio (2–3 paragraphs, plain-English credentials)
4. Credentials & certifications (badges/list)
5. "Where to find me" (LinkedIn, institution pages — nofollow)
6. Their articles (sorted list, all their content)
```

- **Internal links:** every authored article links here (author box, §4.x); this page links back to their top 3 pieces.
- **Why:** named, linkable humans are the EEAT backbone (Phase 1 §7.1 — no anonymous content).

## 2.12 Editorial Page (Editorial Policy / How We Test / Corrections)

- **Purpose:** Public trust documents (Phase 1 §7.3).
- **URL:** `/about/editorial-policy`, `/about/how-we-test`, `/about/corrections`
- **Schema:** AboutPage/Article, BreadcrumbList.
- **Word count:** 500–1,200 words each.

```
1. H1 + intro
2. Process explanation (numbered)
3. Sources policy (which authorities, how chosen)
4. Review & correction process (public contact)
5. Affiliate/advertising disclosure (clear, warm, honest)
6. Contact link
```

- **Why:** public methods = trustworthiness signal; "How we test" makes every review credible by reference.

## 2.13 About Page

- **Purpose:** Mission + team + brand promise (Story, Made to Stick).
- **URL:** `/about/`
- **Schema:** AboutPage, Organization (sameAs, contactPoint).
- **Word count:** 400–800 words.

```
1. H1 + mission statement (the Commander's Intent from Phase 1 §2)
2. Why we exist (the problem: wasted food, bad info)
3. Team (humans with credentials + photos)
4. What we believe (identity positioning — "you're the person who…")
5. Contact + corrections + press links
```

## 2.14 Contact Page

- **Purpose:** Public, working contact (trust + corrections channel).
- **URL:** `/contact/`
- **Schema:** ContactPage, Organization contactPoint.
- **Word count:** 150–250 words + form.

```
1. H1 "Contact Us"
2. Contact form: name, email, topic (press/corrections/business/general), message
3. Response-time promise (e.g., "we reply within 2 business days")
4. Alternative: email link + mailing address (optional)
```

## 2.15 404 Page

- **Purpose:** Convert errors into assists (Neil Patel — custom 404).
- **URL:** any dead path → `/404/` (or same-URL 404 status + custom template)
- **Schema:** none. **Header:** HTTP 404 status (never 200).

```
1. Friendly message + brief humor ("That shelf is empty")
2. BIG SEARCH BOX (primary action — reroutes users, Phase 1 §8)
3. Popular pages (top 5 by traffic)
4. Category links (all 3 hubs + tools)
5. Footer
```

- **Why:** recovers lost users, keeps PageRank from dead links, satisfies the SEO guide's 404 playbook (Neil Patel §404).

## 2.16 Search Results Page

- **Purpose:** Fast, crawlable answers.
- **URL:** `/search?q=<query>` (server-rendered; real URLs, Phase 1 §8).
- **Schema:** BreadcrumbList, noindex on the search page itself.

```
1. H1 "Results for '<query>'"
2. Filter chips (Shelf life · Methods · Pantry · Tools · Reviews)
3. Top-answer result (snippet-style, direct answer pulled from best page) — "featured"
4. Results list (title = destination H1, description = meta/snippet)
5. Empty state: "Did you mean…" suggestions + popular pages
6. Pagination
```

- **Why:** mirrors voice search + provides on-site navigation; the featured-top-answer teaches the snippet format to both users and Google.

---

## Template → Requirement Matrix

| Template | Schema | Word count | Max CTAs | Max outbound links |
|---|---|---|---|---|
| Homepage | WebSite+SearchAction, Org, ItemList | 250–450 | 3 | 45 |
| Category | Breadcrumb, ItemList | 300–600 | 1 | 40 (spoke grid) |
| Pillar | Breadcrumb, ItemList, FAQ | 1,500–2,500 | 3 | 120 (incl. table/nav) |
| Shelf Life | Breadcrumb, FAQ, Article | 1,200–2,000 | 1 | 15 |
| Storage Guide | Breadcrumb, HowTo, FAQ | 1,500–2,500 | 2 | 18 |
| Pantry Guide | Breadcrumb, FAQ | 1,500–2,500 | 2 | 18 |
| Review | Product, Review, FAQ | 1,800–3,000 | 3 | 15 |
| Comparison | Breadcrumb, FAQ | 1,500–2,500 | 1 | 15 |
| Tool | WebApplication, Article | 300–600 | 2 | 10 |
| Blog | Article, FAQ | 1,200–2,500 | 1 | 8 |
| Author | Person, ProfilePage | 200–400 | 0 | 5 |
| Editorial | AboutPage | 500–1,200 | 1 | 5 |
| About | AboutPage, Org | 400–800 | 1 | 5 |
| Contact | ContactPage, Org | 150–250 | 1 | 2 |
| 404 | none | — | 1 (search) | 8 |
| Search | noindex | — | 0 | 0 (results only) |

# DELIVERABLE 3 — CONTENT TEMPLATE SYSTEM

Standardized editorial skeletons for the eight content types that will be produced at scale. Each defines: heading structure, required sections, required tables, FAQ requirements, entity coverage, internal linking rules, featured-snippet optimization, People-Also-Ask optimization, and Information Gain opportunities.

**Shared production rules (all types):**
- One H1 only. H2 = required sections; H3 = sub-points; H4 forbidden except inside FAQ/tables.
- Direct-answer block within the first 60 words of page body (below byline strip).
- Every claim that is a number, temperature, or duration carries an inline source marker.
- Every page contains the food/entity vocabulary from its content brief (LSI list, Phase 1 §5.3).
- Uniqueness gate: each page must contain ≥3 items found nowhere else on the site (original test data, local storage notes, original example, exclusive expert quote) — Phase 1 §12 risk #1 mitigation.
- Word counts are floors, not ceilings; quality (information gain) is the real gate.

---

## 3.1 Shelf Life Page (flagship template — 300 pages)

**Intent:** Informational ("how long does [food] last").

**Heading structure (verbatim):**
```
H1: How Long Does [Food] Last?
  intro + direct answer (40–60 words)
H2: How Long Does [Food] Last? [storage context]
  H3: Pantry / room temperature
  H3: Refrigerator
  H3: Freezer
  H3: Once opened
H2: [Food] Shelf Life Table        ← REQUIRED TABLE
H2: How to Tell If [Food] Has Gone Bad
  H3: Smell / appearance / texture / taste tests (per food)
H2: How to Store [Food] to Make It Last Longer
H2: Can You Freeze [Food]?        ← FAQ-form H2 (PAA family)
H2: How Long Past the Date Is [Food] Safe?
H2: Frequently Asked Questions    ← REQUIRED (PAA block, 3–5)
H2: Related [Food] Shelf Lives    ← sibling spokes
H2: Sources
```

**Required tables:**
| Table | Columns | Purpose |
|---|---|---|
| Shelf-life table | Storage method · Duration · Best practice / note | The snippet table (primary) |
| (optional) Temperature table | Storage location · Target temp (°F) | Only when food has strict temp needs |

**FAQ requirements:** 3–5 questions, drawn verbatim from PAA research for that food; each answered 40–80 words; FAQPage JSON-LD.

**Entity coverage (must mention/link):** the food; its storage methods (refrigerated/frozen/pantry); spoilage signs; best-by/use-by dates; related sibling foods; the food-safety hub.

**Internal links:** parent subcategory + hub ("shelf life"), 3–5 siblings, 2 method pages, 1 container comparison, 1 tool. ≈ 10–15 outbound.

**Snippet optimization:** H1 = question; quick answer is a self-contained paragraph (no pronouns from prior text, states number + condition); table's first column = storage method, duration column = clean numbers.

**PAA optimization:** the 5 FAQ items are the PAA set; answers also woven into body (not only in FAQ).

**Information Gain opportunities:** original "we tested" data for this food (e.g., actual freezer days from a home test); region/locale storage notes; brand-specific variations; cross-food comparison "milk vs almond milk"; updated USDA guideline callouts.

---

## 3.2 Food Storage Guide (method — 200 pages)

**Intent:** How-to / Method.

**Heading structure:**
```
H1: How to [Method] [Food]: The Complete Guide
  intro + TL;DR (1 paragraph: when to use, best result, time needed)
H2: Why [Method] [Food] Works
H2: What You'll Need            ← REQUIRED (equipment list)
H2: How to [Method] [Food] Step by Step
  H3: Step 1 … Step N (each 150–250 words + 1 image)
H2: [Method] Storage Times Table   ← REQUIRED TABLE
H2: Common Mistakes to Avoid
H2: Frequently Asked Questions
H2: Related Guides
H2: Sources
```

**Required tables:**
| Table | Columns |
|---|---|
| Storage times | Item · Method · Duration · Notes |

**FAQ:** 3–5 PAA ("does [X] need to be thawed before cooking?", "how long will [X] keep in the freezer?").

**Entity coverage:** the food, the method, equipment/containers (entities), temperature safety zone, related methods.

**Internal links:** parent hub, sibling method guides, 3–5 foods (applies-to links), 2 container reviews/comparisons, 1 tool. ≈ 12–18.

**Snippet optimization:** numbered steps (HowTo schema); each step begins with a verb; TL;DR answers "how long / how hard / what result".

**Information Gain:** tested times vs official estimates; altitude/humidity notes; equipment alternatives (no-sealer workaround); freezer-burn science in plain English.

---

## 3.3 Buying Guide (commercial intent — reviews category)

**Intent:** Commercial ("best food storage containers 2026").

**Heading structure:**
```
H1: The Best [Product Category] for [Use Case] in 2026
  intro + what we looked for (methodology teaser)
H2: How We Chose the Best [Category]     ← REQUIRED (test rubric)
H2: Our Top [3–5] Picks
  H3: [Product A] — Best Overall   (each pick: review summary box)
  H3: [Product B] — Best Value
  H3: [Product C] — Best for [Use Case]
H2: Comparison Table: Top Picks Side by Side   ← REQUIRED TABLE
H2: What to Look for in [Category]   ← buyer's criteria
H2: Frequently Asked Questions
H2: Verdict
H2: Related Guides and Reviews
H2: Sources
```

**Required tables:** comparison table (product × criteria rows); quick-spec table per pick optional.

**FAQ:** 3–5 commercial-intent PAA ("do glass containers break in the freezer?", "are plastic containers BPA-free?").

**Entity coverage:** products, materials (glass/plastic/silicone), brands, use cases (freezer/lunch/meal prep), certifications (BPA-free, dishwasher-safe).

**Internal links:** parent reviews hub, comparison pages, individual reviews, 2 usage guides. ≈ 10–15. Affiliate disclosure present.

**Snippet optimization:** "best" + year in H1/title; verdict-per-pick blocks; comparison table.

**Information Gain:** original test metrics (weight, leak test, freezer durability); price history notes; regional availability.

---

## 3.4 Product Review (single product)

**Intent:** Commercial/Review.

**Heading structure:**
```
H1: [Product] Review: Is It Worth It? (2026)
  intro + score summary
H2: Our Verdict            ← REQUIRED (score + one-paragraph verdict)
H2: How We Tested [Product]   ← REQUIRED (named method)
H2: What We Liked / What We Didn't   (Pros & Cons box)
H2: Key Features
  H3: [Feature 1] … (concrete detail each)
H2: Performance in Our Tests   ← REQUIRED (data + photos)
H2: Price and Value
H2: Who Should Buy It / Who Shouldn't
H2: How It Compares            (links to comparison pages)
H2: Frequently Asked Questions
H2: The Bottom Line
H2: Sources
```

**Required tables:** score rubric table (criterion · weight · score); spec table.

**FAQ:** 3–5 product-specific.

**Entity coverage:** product, brand, materials, certifications, alternatives.

**Internal links:** reviews hub, comparisons, related reviews, 2 usage guides. ≈ 10–15. Affiliate disclosure.

**Snippet optimization:** verdict box top of page; "worth it" question in H1; star score in Review schema.

**Information Gain:** real photos, measurement data, long-term-use notes (30-day retest), alternatives priced lower.

---

## 3.5 Comparison Article (100 pages)

**Intent:** Comparative.

**Heading structure:**
```
H1: [A] vs [B]: Which Is Better for [Use Case]?
  intro + verdict (40–60 words)
H2: [A] vs [B] at a Glance    ← REQUIRED TABLE
H2: [Criterion 1]: [A] vs [B]     (H3 per criterion, min 4 criteria)
H2: Price Comparison
H2: Durability / Safety / Ease of Use   (as applicable)
H2: Who Should Choose [A]
H2: Who Should Choose [B]
H2: Our Winner
H2: Frequently Asked Questions
H2: Related Comparisons
H2: Sources
```

**Required tables:** at-a-glance (criteria rows × A/B); winner highlighted.

**FAQ:** 3–5 comparison PAA ("is glass better than plastic for the freezer?").

**Entity coverage:** both entities + their attributes + the use case + alternative pairings.

**Internal links:** comparisons hub, 2 reviews (A and B), 2 guides. ≈ 10–15.

**Snippet optimization:** "vs" in H1/title (top snippet word), verdict block, comparison table.

**Information Gain:** decision matrix by use case; cost-over-time math; niche attributes most guides miss (lid durability, dishwasher warping).

---

## 3.6 Pantry Organization Article (100 pages)

**Intent:** How-to / Informational.

**Heading structure:**
```
H1: How to [Organize/System] Your Pantry: [Core Method]
  intro + quick answer
H2: Why Pantry Systems Fail      (vivid problem — Made to Stick)
H2: The [System Name] Method
  H3: Rule 1 … Rule N
H2: Step-by-Step Setup
  H3: Step 1 … Step N
H2: Pantry Zone Layout           (diagram image required)
H2: Containers and Labels        (+ comparison links)
H2: Rotation: The FIFO Rule      (+ shelf-life link)
H2: Printable Checklist          (link to checklist tool/PDF)
H2: Frequently Asked Questions
H2: Related Guides
H2: Sources
```

**Required tables:** zone/zone-purpose table; label color/meaning table (when applicable).

**FAQ:** 3–5 PAA ("how to organize a small pantry", "how to label pantry containers").

**Entity coverage:** pantry zones, FIFO, containers, labels, inventory, shelf life (rotation depends on dates).

**Internal links:** pantry hub, sibling guides, container reviews (money), 2 shelf-life spokes, 1 tool (audit/checklist). ≈ 12–18.

**Snippet optimization:** step lists; before/after framing; checklist download.

**Information Gain:** real pantry layouts (photos), cost breakdowns, small-space solutions, seasonal rotation schedules.

---

## 3.7 Meal Prep Article (supporting topic, feeds storage)

**Intent:** How-to / Informational.

**Heading structure:**
```
H1: [Meal Prep] Storage Guide: How Long Prep Food Lasts
  intro + quick answer
H2: Meal Prep Storage Rules       (the 2-hour rule, 40°F)
H2: How Long Prepared Meals Last   ← REQUIRED TABLE
  H3: Cooked proteins / grains / vegetables / sauces
H2: Best Containers for Meal Prep  (+ comparison/review links)
H2: Freezer Meal Prep
H2: Labeling and Rotation
H2: Frequently Asked Questions
H2: Related Guides
H2: Sources
```

**Required tables:** prepared-food shelf-life table (food · fridge · freezer).

**FAQ:** 3–5 PAA ("how long does cooked chicken last in the fridge?", "can you freeze meal prep containers?").

**Entity coverage:** cooked foods, containers, food-safety temps, method links (freezing/reheating).

**Internal links:** shelf-life hub, storage-method guides, container reviews (money), pantry hub. ≈ 10–15.

**Snippet optimization:** shelf-life table (snippet), "how long" H2 family.

**Information Gain:** batch-cooking food-safety specifics; reheating safety; container-specific guidance.

---

## 3.8 Food Safety Article (supporting topic — highest trust burden)

**Intent:** Informational (YMYL).

**Heading structure:**
```
H1: [Food Safety Topic]: Rules and Temperatures You Need to Know
  intro + direct answer
H2: The [Rule/Concept] Explained
H2: Safe Temperature Table        ← REQUIRED TABLE
H2: Common Mistakes
H2: What to Do if [Mistake Happened]     (recovery instructions)
H2: Food Safety Notice Box        ← REQUIRED where discard instructions apply
H2: Frequently Asked Questions
H2: Related Safety and Storage Guides
H2: Sources
```

**Required tables:** temperature table (food · min internal temp °F); time/temperature limits table.

**FAQ:** 3–5 PAA, prioritized.

**Entity coverage:** the pathogen/risk, affected foods, safe temps, cooling times, danger zone (40–140°F).

**Internal links:** safety hub (or shelf-life hub), affected food pages, method guides, tools (temperature calculator). ≈ 10–15.

**Snippet optimization:** temperature table = snippet; "how long can food sit out" question-answer blocks.

**Information Gain:** current USDA/FDA guideline versions with dates; myth-busting section (each myth concrete + cited).

**Mandatory:** credentialed reviewer byline on EVERY safety page (Phase 1 §7.1). No safety page publishes without review sign-off.

---

## Content Type → Requirement Matrix

| Content type | Pages | Core H2s (min) | Tables required | FAQ min | Reviewer required | Snippet target |
|---|---|---|---|---|---|---|
| Shelf Life | 300 | 6 | 1 | 3 | Yes | Table + answer |
| Storage Guide | 200 | 6 | 1 | 3 | Yes (temps) | Steps |
| Buying Guide | (reviews) | 7 | 1 | 3 | Yes | "Best" list |
| Product Review | 100 | 9 | 1 | 3 | Yes | Verdict |
| Comparison | 100 | 8 | 1 | 3 | No | Verdict + table |
| Pantry Org | 100 | 7 | 0–1 | 3 | No | Steps |
| Meal Prep | — | 5 | 1 | 3 | Yes (temps) | Table |
| Food Safety | — | 5 | 1 | 3 | **Mandatory** | Temp table |

# DELIVERABLE 4 — COMPONENT LIBRARY

Reusable UI modules. Each entry defines: **Purpose, Content rules, Responsive behavior, Accessibility, SEO impact.** Components map to design tokens (D1) and page templates (D2). Build once, use everywhere — this is what makes 850+ pages consistent (Phase 1 §11.1).

## 4.1 Search Component
- **Purpose:** The primary navigation affordance; mirrors voice search; powers the answer experience.
- **Content rules:** Placeholder = real example query ("Try 'how long does milk last'"); results panel shows "Top answers" (quick-answer blocks) above full results; keyboard `/` shortcut on desktop.
- **Responsive:** header inline (≥768px); icon-expanded full-width overlay (<768px) with auto-focus.
- **Accessibility:** label associated with input; `role="search"`; results as list with live region; Esc closes; focus trapped in overlay.
- **SEO impact:** results must render as real, crawlable URLs (Phase 1 §8 — no AJAX-only). Search page = noindex, but the answer content lives on indexed pages.

## 4.2 Category Cards
- **Purpose:** Navigate the six categories + subcategories from hubs/home.
- **Content rules:** icon + name + one-line concrete promise ("300+ foods, exact shelf lives"); title = destination H1 (anchor doctrine).
- **Responsive:** 3-up desktop, 2-up tablet, 1-up mobile.
- **Accessibility:** single stretched link per card; focus ring visible; icon decorative (`aria-hidden`).
- **SEO impact:** clean crawlable anchor text; distributes authority from hubs down to spokes.

## 4.3 Food Cards
- **Purpose:** The shelf-life browse surface (subcategory grids).
- **Content rules:** photo, food name, micro-badge with exact duration ("Fridge: 5–7 days"), link to spoke. Badge text = the quick answer's headline.
- **Responsive:** grid 4-up → 3 → 2 → 1.
- **Accessibility:** alt text describes food and storage context; badge readable in order.
- **SEO impact:** every card title links with the H1 anchor; cards add internal links at scale without content work.

## 4.4 Shelf-Life Table
- **Purpose:** The site's core deliverable — exact durations in scannable form; featured-snippet target.
- **Content rules:** columns = Storage method · Duration · Best practice/note; duration uses tabular-nums + green semibold; every row's claim source-marked; caption describes the table; sortable on desktop (JS-enhanced only, table must work without JS).
- **Responsive:** horizontal scroll <640px (frozen first column ≥640px); stacked cards below.
- **Accessibility:** `<caption>`, `th scope`, keyboard-sortable; no data lost in stacked view.
- **SEO impact:** the #1 snippet format (Phase 1 §3.2); tables earn "position 0" for "how long does X last". Never render tables as images — text tables win snippets.

## 4.5 Storage Temperature Table
- **Purpose:** Safety-critical numbers (freezer/fridge temps, danger zone).
- **Content rules:** temperature values always in °F (with °C in parentheses); every value cited; danger-zone rows styled with semantic warning.
- **Responsive:** same as 4.4.
- **Accessibility:** high-contrast warning styling; caption present.
- **SEO impact:** "temperature chart" queries; snippet target for safety terms.

## 4.6 Quick Answer Box
- **Purpose:** The 40–60 word direct answer under the H1 — the snippet block (Phase 1 §3.2).
- **Content rules:** self-contained answer (no "as mentioned above"); starts with the answer, not throat-clearing; one number minimum; 40–60 words; may include 1 line link ("Full chart →").
- **Responsive:** full-width within content column; also reused in sidebar (sticky) and search results.
- **Accessibility:** regular paragraph flow (not a `<blockquote>`, no screen-reader duplication); not `aria-live`.
- **SEO impact:** the exact Moz pattern (question → paragraph answer → elaboration) that wins featured snippets (Neil Patel).

## 4.7 Key Takeaway Box
- **Purpose:** Distill a section/page into 3 bullets for skimmers + knowledge capture.
- **Content rules:** 3 bullets max; each a complete sentence with a number; placed at section ends (guide type only), not top.
- **Responsive:** standard content width.
- **Accessibility:** normal list semantics; no color-only emphasis.
- **SEO impact:** reinforces LSI terms in natural prose; improves dwell/retention (helpful content signal).

## 4.8 Printable Checklist
- **Purpose:** Actionable step lists users save/print/share (pantry setup, freezer inventory).
- **Content rules:** checkbox list; concrete actions; includes blank lines for user notes; `print` stylesheet hides chrome.
- **Responsive:** single column; print-optimized.
- **Accessibility:** real checkboxes (interactive) or list semantics; not image-based.
- **SEO impact:** shareable asset = backlinks (shoulder-niche outreach fodder); also drives newsletter signups.

## 4.9 Affiliate CTA
- **Purpose:** Monetized next step on reviews/buying guides — honest and labeled.
- **Content rules:** button + "Check price on Amazon" + inline disclosure ("We may earn a commission, at no cost to you — see our disclosure."); only on commercial-intent pages; never on pure informational pages (Phase 1 §7.3, §8).
- **Responsive:** full-width button on mobile; inline desktop.
- **Accessibility:** real link, visible focus; disclosure in normal text (not tooltip-only).
- **SEO impact:** affiliate links `rel="sponsored"` (never disguising); disclosure protects Helpful Content + AdSense standing.

## 4.10 Product Comparison Table
- **Purpose:** Side-by-side decisions (compare products/methods).
- **Content rules:** criteria rows; winner cell highlighted green-100 + check icon; each product column links to its review; verdict row at bottom.
- **Responsive:** horizontal scroll; column persistence not required below 640px.
- **Accessibility:** header structure, `aria-sort` if sortable, winner indicated by text ("Winner") not color alone.
- **SEO impact:** "vs" and "best" snippet family; comparison tables earn position-0 tables.

## 4.11 Author Box
- **Purpose:** Humanize + credential every page (EEAT).
- **Content rules:** headshot, name, credential line ("Registered Dietitian · Reviewed by Food Safety Council"), link to author page, 1-sentence bio. On safety pages, add reviewer line ("Medically reviewed by [name], [credential], [date]").
- **Responsive:** horizontal desktop, stacked mobile.
- **Accessibility:** image alt = author name; text not duplicated for SR.
- **SEO impact:** person-entity signals; every page links its author (internal authority route, Phase 1 §7.1).

## 4.12 Table of Contents (TOC)
- **Purpose:** Navigation + "answer at a glance"; helps PAA/snippet comprehension.
- **Content rules:** mirrors H2 list (long-form ≥1,200 words only); auto-generated from headings; 6–10 items max (prune H3s).
- **Responsive:** sidebar (desktop), collapsible `<details>` at top of article (mobile).
- **Accessibility:** jump links with `aria-current`; native `<details>`; focus moves to target heading.
- **SEO impact:** anchor-rich structure helps Google map sections; jump links increase dwell on long pages.

## 4.13 Newsletter Block
- **Purpose:** Audience capture (the eventual list powers research + retargeting).
- **Content rules:** benefit-led headline ("Get the storage cheat sheet"), single email field, button, privacy microcopy; 1 per page max beyond homepage.
- **Responsive:** compact inline; full-width at article end.
- **Accessibility:** label + error handling per Forms (1.6.7).
- **SEO impact:** no direct rank effect; list = distribution for content refresh announcements (Phase 1 §3.5).

## 4.14 Related Content
- **Purpose:** Keep users in the entity graph; distribute internal links.
- **Content rules:** 3–6 cards, relevance-ranked (same category > siblings > cross-pillar); titles match destination H1; one "next step" CTA if commercial intent exists.
- **Responsive:** 3-up → 2 → 1.
- **Accessibility:** card link pattern per 4.2.
- **SEO impact:** the main mechanism for guaranteed ≥3 inbound links per page (Phase 1 §10.3 rule 1).

## 4.15 Breadcrumb
- **Purpose:** Orientation + BreadcrumbList schema.
- **Content rules:** Home › Category › Subcategory › *Page*; current item plain text; separators chevrons.
- **Responsive:** truncate middle on mobile (Home › … › *Page*).
- **Accessibility:** `nav aria-label="Breadcrumb"`; current page `aria-current="page"`.
- **SEO impact:** BreadcrumbList JSON-LD → rich breadcrumbs; reinforces parent-child relations (entity graph).

## 4.16 Review Summary Box
- **Purpose:** Score + verdict + pros/cons + price action — the review's monetization and snippet core.
- **Content rules:** score (0–5, half-stars), verdict in one sentence, 3–7 pros/cons each (concrete), price buttons, disclosure line.
- **Responsive:** two-column desktop, stacked mobile.
- **Accessibility:** score conveyed in text ("4.5 out of 5") not only stars; table semantics for pros/cons.
- **SEO impact:** Review/Product schema feeds rating stars; verdict text = snippet candidate.

---

## Component → Page-Type Availability Matrix

| Component | Shelf Life | Guide | Review | Comparison | Tool | Blog | Hub/Category |
|---|---|---|---|---|---|---|---|
| Search | ✅ (header) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Quick Answer | ✅ (top) | ✅ | ✅ (verdict) | ✅ | ✅ | ❌ | ✅ |
| Food Card | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Shelf-Life Table | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Temp Table | ⚠️ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Pros/Cons | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Affiliate CTA | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Newsletter | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| TOC | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ⚠️ |
| Author Box | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Related Content | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Breadcrumb | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

# DELIVERABLE 5 — IMAGE SYSTEM

## 5.1 Format & Delivery Standards

| Rule | Standard | Why |
|---|---|---|
| Formats | WebP primary, AVIF where supported, JPEG fallback; SVG for icons/diagrams | Performance (Core Web Vitals LCP < 2.5s, Phase 1 §8) |
| Compression | WebP quality 75–82; target ≤ 200KB featured, ≤ 120KB inline | Speed without visible degradation |
| Responsive | `srcset`/`sizes` at 480/768/1200/1600 widths; explicit `width`/`height` + `aspect-ratio` | Zero CLS (Phase 1 §8) |
| Loading | `loading="lazy"` for below-fold; featured image `eager` + `fetchpriority="high"` | LCP optimization |
| Caching | CDN cache headers; immutable hashed filenames | TTFB + repeat visits |
| Print | print stylesheet renders clear images | Shareability |

## 5.2 Image Type Specification

| Image type | Dimensions (px) | Aspect | File pattern | Notes |
|---|---|---|---|---|
| Featured image | 1200 × 630 (social) or 1200 × 800 (article) | 16:9 or 3:2 | `<slug>-featured` | One per page; LCP-critical |
| Pinterest image | 1000 × 1500 | 2:3 (vertical) | `<slug>-pinterest` | Optimized for pins; brand-colored overlay + headline text |
| Infographic | 1000 × 1500 (pin) / 1600 × 900 (web) | 2:3 / 16:9 | `<slug>-infographic` | Data-driven; original research assets |
| Storage diagram | 1200 × 900 | 4:3 | `<slug>-diagram-<zone>` | Step/zone layouts, labels rendered as real text layers |
| Shelf-life chart | 1200 × 900 | 4:3 | `<slug>-chart-shelf-life` | Companion to the HTML table; NEVER the only version (text table wins snippets) |
| Temperature chart | 1200 × 900 | 4:3 | `<slug>-chart-temp` | Companion to HTML temp table |
| Pantry illustration | 1600 × 900 | 16:9 | `<slug>-illustration` | Style: flat, warm, concrete (matches brand) |
| Container comparison graphic | 1600 × 900 | 16:9 | `<slug>-compare-<a>-vs-<b>` | Side-by-side, honest proportions |
| Step image | 1200 × 800 | 3:2 | `<slug>-step-<n>` | One per HowTo step |
| Author headshot | 800 × 1000 | 4:5 | `author-<slug>` | Consistent background, web-optimized |
| Tool screenshots | 1200 × 800 | 3:2 | `<tool-slug>-screenshot` | Real UI, not mockups |

**Why (Made to Stick — Concrete):** photos of real foods in real storage make the content vivid and credible; charts make the numbers sticky. Images are supporting evidence, never decoration.

## 5.3 Image Folder Structure (mirrors content)

```
images/
├── featured/          (per page, named by slug)
├── inline/            (step images, product photos)
├── pinterest/         (2:3 versions)
├── infographics/      (charts, diagrams, illustrations)
├── icons/             (SVG line icons)
├── logos/             (brand assets)
└── authors/           (headshots)
```

## 5.4 Alt Text Rules

1. **Describe what's shown, plainly:** "Mason jar of milk on a refrigerator shelf with a label reading 'opened Jul 14'". Not "milk jar".
2. **Include the food/storage keyword naturally** where it describes the image (no stuffing): "vacuum-sealed ground beef in the freezer".
3. **≤ 125 characters** (screen-reader cutoff); longer descriptions → adjacent caption text.
4. **Decorative images** (borders, icons, patterns): `alt=""` (empty).
5. **Diagrams/charts:** alt = the conclusion ("Shelf life of milk: 5–7 days refrigerated, up to 3 months frozen"), with full data in the adjacent HTML table/caption.
6. **Links/images in cards:** alt describes destination context (see Card rules 4.2/4.3).
7. **Never** use "image of…", "photo of…", file names, or URLs in alt.

**SEO impact:** images with descriptive alt contribute image-search + accessibility; alt mismatch is a quality-red-flag in EEAT reviews.

## 5.5 File Naming Convention

`<context>-<subject>-<variant>.<ext>` — lowercase kebab-case:

- `how-long-does-milk-last-featured.webp`
- `how-to-freeze-meat-step-3.webp`
- `glass-vs-plastic-food-storage-compare.webp`
- `shelf-life-chart-dairy-infographic.webp`

Rules: no spaces, no dates, no version numbers in the final path (hashes handled by build), no UPPERCASE, no underscores.

## 5.6 Compression & Pipeline

1. Source masters stored off-upload (RAW/PNG).
2. Build-time pipeline: convert → resize (5 widths) → WebP/AVIF → optimize → hash.
3. Budget: featured ≤ 200KB; inline ≤ 120KB; SVG ≤ 30KB. Failing images fail the build (CI gate).
4. Monthly audit: Lighthouse image-budget check across top 50 pages.

---

# DELIVERABLE 6 — INTERNAL LINKING SYSTEM

Expands Phase 1 §10 into per-page-type link maps. **All Phase 1 rules remain law:** ≥3 inbound per page; 2–4 in-text links per 500 words; descriptive anchors; money pages contextual-linked; hub phrases for hub links.

## 6.1 Link Type Definitions

| Type | Definition | Typical target |
|---|---|---|
| **Parent** | Immediate category above in hierarchy | Subcategory hub, pillar hub, home |
| **Child** | Pages this page must surface | Spokes under a subcategory |
| **Sibling** | Same level, same parent | Other foods in "dairy", other methods |
| **Related** | Topically adjacent (any level) | Cross-category, methods↔foods |
| **Pillar/hub** | The 3 authority anchors | `/shelf-life/`, `/storage-methods/`, `/pantry-organization/` |
| **Money page** | Monetized pages (reviews, comparisons, buying guides) | Reviews, comparisons |
| **Tool** | Interactive pages | `/tools/*` |

## 6.2 Anchor Text Strategy

| Target | Anchor phrase | Example |
|---|---|---|
| Hub | Pillar keyword, branded | "shelf life", "storage methods", "pantry organization" |
| Food spoke | Question-form natural phrase | "how long does ground beef last" |
| Method guide | Action phrase | "how to vacuum seal meat" |
| Review | Product name or "our [product] review" | "our OXO container review" |
| Comparison | "[A] vs [B]" | "glass vs plastic food storage" |
| Tool | Tool name | "shelf life calculator" |

Rules: never generic "click here"; never repeated identical anchors to the same target on one page; anchors are the *destination's* topic, not the source's; ≤2 hub-anchors per page (avoid over-reinforcement).

## 6.3 Per-Page-Type Link Map

| Page type | In (inbound, guaranteed) | Out (required) | Out (recommended) | Max total out |
|---|---|---|---|---|
| Home | — | 6 category roots, 3 hubs, 3 tools | top foods, top articles | 45 |
| Category (subcat) | home, hub, siblings | every spoke (children), parent hub, 2 siblings | 2 methods, 1 tool | 40 |
| Pillar | home, all pages via footer/related | all subcategories, flagship spokes, 2 hubs | 3 tools, 2 money | 120 (incl. table/nav) |
| Shelf Life | category, hub, siblings, related modules | parent cat + hub, 3–5 siblings | 2 methods, 1 comparison, 1 tool | 15 |
| Storage Guide | hub, foods, related | parent hub, 3–5 foods, sibling guides | 2 container reviews, 1 tool | 18 |
| Pantry Guide | hub, siblings, tools | parent hub, siblings, FIFO/shelf-life spoke | 2 container reviews, 1 tool | 18 |
| Review | reviews hub, comparisons, guides | reviews hub, 2–3 comparisons, 2 guides | 2 sibling reviews | 15 |
| Comparison | comparisons hub, reviews, guides | hub, 2 reviews (A&B), 2 guides | sibling comparisons | 15 |
| Tool | tools hub, guides | tools hub, 2 guides, sibling tools | 1 money page (contextual) | 10 |
| Blog | blog index, social | 1–3 core pillar pages, 1–2 sibling blogs | 1 money max | 8 |
| Author | author box on all their pages | top 3 authored pages | author links (nofollow) | 5 |
| Editorial/About/Contact | footer links | hubs, contact | — | 5 |
| 404 | — | search + top 5 + hubs | — | 8 |

## 6.4 Distribution Rules

1. **Authority flow is top-down only:** home → pillars → subcategories → spokes → money. Never link money pages as *navigation*; only contextually (Phase 1 §10.3 rule 4).
2. **Every spoke gets ≥3 inbounds:** parent (category), hub (pillar), + at least one of: sibling related-block, a method guide, or a tool page. Verify monthly.
3. **New content rule:** a new page must link back to its hub *within the body* (not only footer/breadcrumb) within the first 2 sections.
4. **Money-page rule:** reviews/comparisons receive links from guides and shelf-life pages contextually (1 per page, never in nav or card grids).
5. **Density:** 2–4 in-text internal links per 500 words; total outbound per page per matrix above. Over-linking dilutes both users and equity.
6. **Duplex rule:** every tool ↔ at least one guide (Phase 1 §10.1); every food ↔ its methods.
7. **No orphan/no dead-end:** every page is linked in and links out. Dead-ends flagged monthly.
8. **Breadcrumb + footer hubs** are structural and not counted toward in-text density (but count toward total out).

## 6.5 Anchor Integrity & Reporting

- Monthly crawl: report orphan pages, dead links, <3-inbound pages, hub-pages not receiving footer links.
- Quarterly: cannibalization check (two pages targeting same keyword — Phase 1 §12 risk #5).
- Automation: link maps generated from the content model (frontmatter), so a page's parent/siblings/related are computed, not hand-edited — scale-safe (Phase 1 §11).

# DELIVERABLE 7 — CONTENT QUALITY STANDARDS

The production QA contract. Every piece of content passes these gates before publish and on schedule after.

## 7.1 Minimum Quality Requirements

1. **Unique value:** ≥3 elements found nowhere else on the site (original test data, exclusive expert input, original example, locale notes).
2. **Depth:** meets the word-count floor of its template (D2 matrix) — measured, enforced.
3. **Accuracy:** every numeric claim (date, temperature, duration, %, cost) has a cited source from the approved list (§7.4).
4. **No fluff:** no "in today's fast-paced world" openers, no filler paragraphs, no repeated sentences across pages (duplicate detector >80% = block).
5. **Complete topic:** covers definition, how-to, risks, and FAQs for its one keyword (LSI coverage, Phase 1 §5.3).
6. **Concrete language:** every section references a specific food, number, temperature, or time (Made to Stick — Concrete).
7. **Answer-first:** quick answer block in the first 60 words.
8. **Readability:** Flesch-Kincaid grade ≤ 9; Hemingway score ≤ 8; sentences average ≤ 20 words.
9. **Structure:** one H1, sequential headings, required sections present per template.
10. **Signed:** author + reviewer + review date present and real.

## 7.2 EEAT Checklist (every page, pre-publish)

- [ ] Author is a real, named human with an author page and bio
- [ ] Reviewer named on safety-critical pages (credentialed)
- [ ] "Last reviewed" date visible
- [ ] "How we tested" method present on reviews/guides with data
- [ ] Every external claim links to its source (authoritative domain)
- [ ] No anonymous, borrowed, or scraped content
- [ ] Original images or clearly licensed media (no stock-photo-only reviews)
- [ ] Affiliate/ads disclosures visible where applicable
- [ ] Contact/corrections path referenced

## 7.3 Fact Verification Process

```
Claim → tagged as FACT (number/temp/duration)
  ↓
Writer attaches source (approved domain + date accessed)
  ↓
Editor verifies source exists, says what's claimed, is current
  ↓
Safety claims (< 40°F, 140°F danger zone, botulism, canning) → REQUIRED
credentialed reviewer sign-off
  ↓
Review date recorded; refresh clock starts (6-month safety / 12-month all)
```

- Any unsourced numeric claim fails QA. "Common knowledge" must still get a source for temperatures and durations (the site's entire value = precision).

## 7.4 Approved Source Hierarchy

| Tier | Sources | Use |
|---|---|---|
| 1 — Government/authority | USDA, FDA, CDC, university extension services, national institutes | Temperatures, durations, safety rules (default) |
| 2 — Industry/standards | National Center for Home Food Preservation, ISO, manufacturer spec sheets | Methods, equipment specs |
| 3 — Expert/academic | Peer-reviewed studies, credentialed professionals (RD, food scientists) | Nuance, novel claims |
| 4 — Primary research | Our own documented tests (with method + dates) | Original data (strongest) |
| — Never | Random blogs, forums, AI-generated "studies", anonymous sources | — |

Citation style: inline marker (`[1]`) + sources section at page end listing author, publication, title, date, URL. Temps in °F with °C in parentheses.

## 7.5 Writing Style

- 9th-grade, conversational, active voice ("Store it in the back of the fridge" not "It is recommended that…").
- Second person ("you"), concrete nouns, vivid verbs.
- Openers state the answer, then prove it (question→answer→elaborate).
- No marketing adjectives ("amazing", "perfect"); use data instead.
- Jargon translated immediately ("FIFO — first in, first out — means…").
- **Identity appeal** (Made to Stick): frame storage as being the resourceful, prepared person — not fear-based shaming.

## 7.6 Readability Enforcement

- Editor passes text through Hemingway + Flesch-Kincaid (target ≤ 9, score 60–75).
- Long sentences split; long words swapped; every H2 paraphrasable as a plain question.
- Voice-search phrasing test: read the H1 + first answer aloud — if it sounds like a real person asking/answering, it passes (Neil Patel voice doctrine).

## 7.7 Accessibility of Content

- Headings sequential; lists real lists; tables with captions/scope; images alt'd (D5).
- No content conveyed by color alone; no flashing elements; no autoplay media.
- Links descriptive (anchor text says where it goes).
- All PDFs/checklists have an HTML equivalent (never PDF-only for key content).

## 7.8 Helpful Content Compliance (people-first checklist)

- [ ] Written for a person who asked a real question, not for search engines
- [ ] Answers the query completely in one page (no "see part 2" loops)
- [ ] Demonstrates first-hand expertise/experience, not just rewording
- [ ] Substantially original — adds data, examples, or insights
- [ ] Satisfying after reading: the page is the destination, not a teaser
- [ ] No auto-generated content without human edit/verification
- [ ] No manipulative design or ad patterns that hide answers
- [ ] One clear purpose per page; no keyword-stuffed doorway content

## 7.9 AI Editing Workflow

1. **Draft:** AI-assisted draft is allowed as a *starting point only* — never published raw.
2. **Human edit:** a named editor rewrites for voice, adds original examples/data, removes filler.
3. **Fact pass:** editor verifies every number against sources (7.3); flags anything unverifiable.
4. **Subject pass:** credentialed reviewer on safety/commercial content.
5. **Uniqueness gate:** duplicate-detector + manual "is this meaningfully better than the top 3?" check.
6. **Transparency:** no reader-facing claim that content is human-only if it isn't; Google's stance is evaluated as guidance evolves — quality and edit rigor are the floor either way.

## 7.10 Content Freshness Policy

| Content tier | Review cadence | Refresh action |
|---|---|---|
| Food safety pages | Every 6 months | Full fact-check; update guideline versions; bump "last reviewed" |
| Shelf-life pages | Every 6 months | Verify USDA/FDA durations; add new data; rebuild table if needed |
| Method/pantry guides | Annually | Verify methods, update photos/tools, add new techniques |
| Reviews/buying guides | Annually + when product changes | Retest if possible; update prices; note date |
| Tools | Ongoing | Verify logic after every data update; version log |
| Blog/news | As events warrant | Update or remove stale posts; 301 if consolidated |

Refresh = Neil Patel's "optimize existing content" playbook: lengthen toward 2,000+, update facts, improve scannability, add images/tables, add internal links, reshare (Phase 1 §3.5).

---

# DELIVERABLE 8 — AFFILIATE & ADSENSE STRATEGY

Monetization must not degrade trust, Core Web Vitals, or Helpful Content standing (Phase 1 §7.3, §13 #9).

## 8.1 Principles (user-first)

1. **Informational pages = zero monetization pressure.** Shelf-life pages carry ads (in reserved slots) but no affiliate CTA. Answers are never paywalled or ads-first.
2. **Money pages monetize:** reviews, buying guides, comparisons — clearly labeled, EEAT-strong first.
3. **Disclosure everywhere:** affiliate disclosure visible on every monetized page and near every affiliate link; AdSense auto "Ads" label respected.
4. **Value precedes monetization:** the answer/summary comes before any ad or CTA.
5. **No dark patterns:** no fake "download" buttons, no ad interstitials, no sticky overlays.

## 8.2 AdSense Placement Strategy

| Slot | Location | Unit | Notes |
|---|---|---|---|
| Header/leaderboard | Below nav, above H1 area — NOT above H1 content | 728×90 | Desktop only; hidden mobile |
| In-content 1 | After first 25–30% of article | 336×280 / 300×250 | One per long-form page |
| In-content 2 | After 60–75% | 300×250 / in-feed | Only pages ≥1,800 words |
| Sidebar | Sticky aside | 300×600 / 300×250 | Desktop only |
| End-of-article | After verdict/related, before footer | 728×90 / in-feed | Every monetized page |
| Home/tools | In designated tool strip | 336×280 | Never near interactive elements |

**Rules:**
- Content-order priority: answer > images > tables > ads. Ads never interrupt a table or a step sequence.
- Max 2 in-content slots per article; total ad area ≤ 25% of viewport on any breakpoint.
- Placeholders reserve `min-height` (no CLS); slots `aria-hidden` until filled; no ad fills above-the-fold on mobile until content visible.
- No matching-background ads; no auto-refresh on visible units without permission; no deceptive placements.

## 8.3 Affiliate Placement Strategy

| Context | Placement | Disclosure |
|---|---|---|
| Product review | Price buttons in review summary + bottom verdict | Inline near each CTA |
| Buying guide | "Check price" per pick | Inline + top-of-page banner |
| Comparison | Winner's price button in verdict | Inline |
| Guides/pantry | Max 1 contextual "which container" CTA | Inline |

- Links use `rel="sponsored nofollow"` for affiliate/paid links (Google's `rel="sponsored"`).
- Affiliate content must be test-based; never "best" lists without testing methodology.
- Product criteria tables link to our reviews (internal) before affiliate links (external).

## 8.4 Money Page Hierarchy

```
HIGH COMMERCIAL INTENT (primary money):
  Buying guides (best containers/equipment)
  Product reviews
  Comparisons
LOW/NO COMMERCIAL INTENT (traffic + trust, monetized only by ads):
  Shelf-life pages · storage guides · pantry guides · tools
AUTHORITY SUPPORT (link/direct money):
  Pillars, original research, blog (shoulder-niche outreach)
```

**Money-page feeding rules (Phase 1 §10.3 rule 4):** money pages earn contextual links from guides — never nav blasts, never card grids at scale. Density: 1 contextual money link per guide page.

## 8.5 Core Web Vitals & Ad Integrity

- Ads load via the approved ad provider's async loader; never render-blocking; never delay LCP.
- Ads excluded from CLS: fixed `min-height` slots; no expanding units without user action.
- INP guard: no heavy ad scripts above the fold; ads below main content on mobile.
- Quarterly performance audit: top 50 pages must hold LCP < 2.5s / INP < 200ms / CLS < 0.1 with ads live.

## 8.6 Helpful Content & HCU Compliance for Monetized Pages

- Money pages must be genuinely useful *before* monetization (score, data, photos) — a page that only exists to push affiliate links fails the people-first test.
- No "thin best-of" pages; every list is backed by testing methodology.
- Ad density never forces content to paginate or split.
- Monetization additions (ads/affiliate) never change the URL, structure, or core content of an informational page — architecture stays stable (Phase 1 §11).

# DELIVERABLE 9 — DEVELOPMENT SPECIFICATION

Preparations for the engineering team. This is an architecture contract — no code is written in this phase.

## 9.1 Recommended Stack (decision + rationale)

| Layer | Recommendation | Why |
|---|---|---|
| Site generation | Static-first SSG (e.g., Astro or Next.js static export), or a CMS with static export | Speed (Core Web Vitals), security, scale to 3,000+ pages with zero server cost |
| Content | Structured Markdown/JSON (headless content model) | Templates + frontmatter = computed internal links + schema generation (Phase 1 §11.1) |
| Data | Content frontmatter fields, one source of truth per page | Shelf-life data reusable in tables, tools, cards, JSON-LD |
| Styling | Design tokens → CSS custom properties + utility layer | D1 tokens map 1:1 to CSS; themeable, consistent |
| Rendering | Server-side/static HTML with progressive enhancement (JS optional) | No JS-only navigation/links (Phase 1 §8); accessibility |
| Infrastructure | CDN + static hosting; HTTPS/HSTS enforced | Security ranking signal (Neil Patel); global TTFB |
| Media | Build-time image pipeline (D5) | Automation of compression, formats, hashing |

**Why this shape:** every decision serves the five hard requirements — speed, accessibility, crawlability, template scale, and future flexibility (Phase 1 §11). No lock-in: content is portable (Markdown + JSON) and the stack is replaceable.

## 9.2 Repository/Folder Structure

```
home-storage-guide/
├── content/                    ← the source of truth (Markdown + frontmatter)
│   ├── shelf-life/             (mirrors URL taxonomy, Phase 1 §9)
│   │   ├── dairy/
│   │   ├── produce/
│   │   ├── meat/
│   │   ├── pantry/
│   │   └── freezer/
│   ├── storage-methods/
│   ├── pantry-organization/
│   ├── comparisons/
│   ├── reviews/
│   ├── tools/
│   ├── blog/
│   └── pages/                  (about, contact, editorial, 404, search)
├── src/
│   ├── components/             (per D4 component library)
│   ├── layouts/                (per D2 page templates)
│   ├── styles/
│   │   ├── tokens.css          (D1 design tokens)
│   │   ├── base.css            (reset, typography, rhythm)
│   │   ├── components/         (one file per component)
│   │   └── utilities.css       (layout primitives, spacing)
│   ├── data/                   (shelf-life dataset, sources DB, link rules)
│   ├── lib/                    (schema generators, table builders, link mapper)
│   └── assets/
│       └── images/             (mirror D5.3 structure)
├── public/                     (static: robots.txt, sitemaps, icons, favicons)
├── scripts/                    (QA gates: lint, a11y, perf, duplicate, link audits)
└── tests/
```

**Why:** `content/` and `data/` are the business; `src/` is the machinery. Writers never touch code; developers never hand-edit articles.

## 9.3 Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files/folders | lowercase-kebab-case | `how-long-does-milk-last.md` |
| Components | PascalCase (file = component) | `QuickAnswer.tsx` |
| CSS classes | BEM-like: `block__element--modifier` | `table--shelf-life__duration` |
| Design tokens | `--category-property-state` | `--brand-green-600` |
| Data fields | camelCase in frontmatter | `shelfLifeFridge: "5–7 days"` |
| Images | D5.5 kebab pattern | `how-long-does-milk-last-featured.webp` |
| Slugs | D5/Phase 1 §9 rules | `how-long-does-milk-last` |
| Branches/PRs | `feat/<id>-<desc>` | `feat/123-shelf-life-milk` |

## 9.4 Component Naming (maps to D4)

| Component | File |
|---|---|
| Search | `SearchBar`, `SearchResults` |
| Category/Food cards | `CategoryCard`, `FoodCard` |
| Tables | `ShelfLifeTable`, `TempTable`, `ComparisonTable` |
| Answer blocks | `QuickAnswer`, `KeyTakeaway`, `VerdictBox` |
| Boxes | `SafetyBox`, `WarningBox`, `TipBox`, `NoteBox` |
| Review | `ReviewSummary`, `ProsCons` |
| Meta | `AuthorBox`, `Breadcrumb`, `Toc` |
| CTA | `CtaBand`, `AffiliateCta`, `NewsletterBlock` |
| Layout | `SiteHeader`, `SiteFooter`, `ArticleLayout`, `Sidebar` |

## 9.5 CSS Organization

1. `tokens.css` — colors, type scale, spacing, radius, shadows, breakpoints (D1 as CSS custom properties).
2. `base.css` — reset, box-sizing, fluid type, spacing rhythm, focus styles, reduced-motion.
3. `components/*.css` — one file per component (D4), scoped classes.
4. `utilities.css` — grid, container, spacing helpers, aspect-ratio, table-scroll.
5. **Rules:** no inline styles in content; no `!important` except targeted overrides; all colors via tokens (theme-able); media queries inside component files (mobile-first `min-width`).
6. **Critical CSS:** above-fold CSS inlined at build; rest loaded async — LCP/INP budget (Phase 1 §8).

## 9.6 JavaScript Organization

- **Progressive enhancement only:** page fully functional without JS (tables render server-side, navigation is HTML, FAQs native `<details>`).
- Small framework-free modules or a lightweight component script; no JS framework required for content pages.
- Scripts split by feature: search, table-sort, tool logic, newsletter, analytics.
- No render-blocking scripts; `defer` everywhere; analytics async.
- **Accessibility:** every JS interaction has a non-JS fallback or is genuinely optional (WCAG, Phase 1 §8).
- **Performance budgets:** JS total ≤ 50KB gzip on content pages; no third-party scripts beyond approved (analytics, ads loader).

## 9.7 Image Folders

See D5.3. Build pipeline outputs to `src/assets/images/` from a single source; hashed filenames; `images/` never hand-managed in git (except curated sources).

## 9.8 Content Folders & Frontmatter Contract

Every content file's frontmatter drives generation (templates, links, schema, breadcrumbs). Required fields:

| Field | Purpose |
|---|---|
| `slug`, `urlPath` | URL (validated against Phase 1 §9 rules) |
| `template` | D2 template ID |
| `title`, `h1` | Title tag + H1 |
| `metaDescription` | 140–160 chars |
| `intent` | Phase 1 §3.3 taxonomy |
| `parent`, `category` | Link map (computed parent/children/siblings) |
| `related[]` | Related content IDs |
| `lsi[]` | LSI/topic terms (Phase 1 §5.3) |
| `faq[]` | Q/A for FAQ block + schema |
| `author`, `reviewer`, `reviewedDate` | EEAT (Phase 1 §7.1) |
| `sources[]` | Citation list |
| `snippetAnswer` | The 40–60 word quick answer |
| `tables[]` | Table data (rendered server-side as HTML + JSON-LD) |
| `adSlots[]` | Approved slot config (D8.2) |
| `image: featured` | D5.2 featured image reference |

**Why:** the frontmatter contract is the scale engine — 850 pages are data, not bespoke builds (Phase 1 §11.1).

## 9.9 Schema Organization

- One central schema library (`src/lib/schema/`) generating JSON-LD server-side from frontmatter: Organization, WebSite+SearchAction, BreadcrumbList, Article, FAQPage, HowTo, Product, Review, AggregateRating, Person, AboutPage, ContactPage, WebApplication.
- No hand-written JSON-LD in content files.
- Validation step in CI (Schema.org validator) on every build.
- Only valid-for-content schema (FAQPage where FAQ exists, HowTo only for true steps) — schema must match page reality (helpful-content integrity).

## 9.10 Future Scalability (dev-level)

| Future trigger | Dev readiness |
|---|---|
| 850 → 3,000 pages | Template + frontmatter model scales linearly; data-driven tables/cards |
| New hub | Add a top-level content folder + nav entry; nothing else changes |
| Multilingual | Content model supports `locale` field + `hreflang` map from day one |
| YouTube/video | Content model supports `video[]` (embed + description) fields |
| Monetization | `adSlots[]` + affiliate fields are already part of the model |
| Migration | Content is portable Markdown + JSON; SSG can be swapped without data loss |

---

# DELIVERABLE 10 — PHASE 3 PREPARATION

Everything production needs to go live. These checklists/workflows become the operating system for publishing at scale.

## 10.1 Master Content Checklist (pre-brief → publish)

1. **Keyword/brief approved** — one intent, one keyword, no cannibalization (Phase 1 §3.3).
2. **Snippet research done** — current position-0 holder reviewed; PAA questions captured.
3. **LSI list populated** (8–15 terms) and entity links mapped.
4. **Source list gathered** — tier-1 authorities per §7.4; claims pre-tagged.
5. **Draft written** to template (D3), 9th-grade, answer-first.
6. **Images produced** per D5 (featured, inline, Pinterest, charts).
7. **Internal links added** per D6 map (parent, siblings, related, money).
8. **FAQ final** (3–5 PAA questions, answered 40–80 words).
9. **Schema data set** in frontmatter.
10. **Disclosures present** if monetized (D8).
11. **QA passed** (10.3) + reviewer sign-off for safety content.
12. **Pre-publish SEO checklist** (10.5) green.
13. **Publish** → submit in Search Console → social/share.
14. **Post-publish checklist** (10.6).

## 10.2 Publishing Workflow (flowchart)

```
BRIEF ──> RESEARCH ──> DRAFT ──> EDIT ──> FACT-CHECK ──> IMAGES ──> QA ──> PUBLISH
  ▲                                                                    │
  └─────────────────────────────── REVISE ◄── reviewer sign-off ◄─────┘
                                                                        │
                                   SCHEDULED REFRESH (6/12 mo) ◄───────┘
```

Gate points: every arrow = sign-off. Nobody bypasses fact-check or reviewer gate on safety pages.

## 10.3 Quality Assurance Checklist (QA gate)

- [ ] Template compliance (all required sections present, D2/D3)
- [ ] One H1; heading order sequential; no skipped levels
- [ ] Quick answer present, 40–60 words, answer-first
- [ ] Required tables present with captions + scope; data matches sources
- [ ] Every numeric claim sourced (marker + sources list)
- [ ] LSI terms naturally integrated (no stuffing)
- [ ] Internal links per map; anchors descriptive; no dead links
- [ ] ≥3 inbound links verified
- [ ] Meta title/description set; canonical correct
- [ ] Images: formats, sizes, alt text, CLS-safe dimensions
- [ ] Readability: grade ≤ 9, Hemingway ≤ 8
- [ ] Accessibility: keyboard walkthrough, contrast, focus, labels
- [ ] Duplicate content check (< 80% similarity vs all other pages)
- [ ] Author + reviewer + reviewed date populated
- [ ] Schema validates; matches page content
- [ ] Mobile render check (320px) — tables scroll, no overflow
- [ ] Ad slots: placeholders reserved, no ad above H1 (mobile)

## 10.4 SEO Checklist (per page, pre-publish)

- [ ] Title ≤ 60 chars, keyword near front, brand suffix
- [ ] Meta description 140–160 chars, action verb, question-form where apt
- [ ] URL matches Phase 1 §9 naming; max 3 segments
- [ ] Breadcrumb set + BreadcrumbList schema
- [ ] Snippet block optimized (question → answer → elaboration)
- [ ] FAQ block → FAQPage schema (where appropriate)
- [ ] Internal links: 2–4/500 words in-text; money link contextual
- [ ] Image alt + file naming per D5
- [ ] No cannibalizing keyword (checked against registry)
- [ ] Canonical + sitemap entry generated by build
- [ ] Page passes duplicate/plagiarism check

## 10.5 Pre-Publication Checklist (go-live gate)

- [ ] Staging render verified on mobile + desktop
- [ ] Build passes CI: lint, a11y, perf budgets, schema validation, duplicate gate
- [ ] Search Console: page live, request indexing submitted
- [ ] Internal links from related pages actually exist (link map executed)
- [ ] Breadcrumb/nav updated if new subcategory
- [ ] No orphan risk: inbound links verified ≥3
- [ ] Analytics events wired (GA4); tool pages logging interactions
- [ ] Ads/affiliate verified live and labeled (monetized pages only)

## 10.6 Post-Publication Checklist (72 hours)

- [ ] Index check in GSC; fix any indexing errors
- [ ] Crawl new page (URL inspection) — confirm render
- [ ] Monitor Core Web Vitals field data (CrUX) for the new URL
- [ ] Monitor 404s/errors from internal links
- [ ] Share: Pinterest pin(s), social, newsletter if significant
- [ ] Log page in content calendar with refresh due date
- [ ] Add to internal-link audit list (monthly)

## 10.7 Monthly Maintenance Checklist

- [ ] Crawl site: orphans, dead links, <3-inbound pages (D6.5)
- [ ] Search Console: coverage errors, manual actions, Core Web Vitals report
- [ ] Cannibalization scan (two pages, one keyword)
- [ ] Ad performance: unit density, CLS impact review
- [ ] Speed audit: top 50 pages with ads live
- [ ] Refresh-due list generated (pages entering 6/12-month window)
- [ ] Backlink monitoring: new links, toxic links (disavow candidates)
- [ ] Snippet tracking: wins/losses for top 100 keywords
- [ ] PAA monitoring: new questions for top pages → queue for content updates
- [ ] Analytics review: dwell, bounce on money pages; QA weak pages

## 10.8 Content Update Workflow

```
PAGE ENTERS REFRESH WINDOW (6 or 12 months)
  → Pull current ranking, snippet status, PAA, traffic
  → Identify update targets (facts, LSI, length, tables, links)
  → Rewrite affected sections + re-verify all numbers against sources
  → New reviewed-date; version note in frontmatter
  → Re-run QA + SEO checklists (10.3, 10.4)
  → Republish → GSC request reindex → reshare
```

## 10.9 Internal Linking Workflow

```
NEW PAGE:
  → Frontmatter declares parent/category/related
  → Build computes inbound/outbound map (D6)
  → Writer adds contextual in-text links per D6.2–6.4
  → QA verifies ≥3 inbound + hub link within first 2 sections
  → Related content module auto-updates across affected pages

MONTHLY AUDIT:
  → Scan → report → fix orphans/dead/under-linked → re-crawl
```

## 10.10 Phase 3 Launch Sequence (from Phase 1 §14, now executable)

| Milestone | Content | Gate |
|---|---|---|
| 3.0 | Build site skeleton + 8 templates + token system | Dev smoke test + Lighthouse ≥ 90 |
| 3.1 | Home + 3 hubs + tools foundation (15 pages) | All checklists green |
| 3.2 | Top-100 shelf-life foods | Batch QA + refresh schedule created |
| 3.3 | 40 storage-method guides + 20 pantry org | Link maps verified |
| 3.4 | 15 flagship tools + 20 comparisons | Analytics + ad slots validated |
| **Phase 3 total** | **~210 pages** | — |

---

# APPENDIX A — Phase 2 ↔ Phase 1 Traceability

| Phase 2 artifact | Phase 1 dependency | Enforced how |
|---|---|---|
| Design System colors/type/spacing | Brand identity §2, voice §2.1 | Tokens named per brand; 9th-grade in type rules |
| Page Templates section order | Homepage §6.1, H1 patterns §8.1, category map §4 | Template H1 strings copied verbatim |
| Content Template System | Intent taxonomy §3.3, depth §3.1, snippet §3.2, LSI §5.3 | Required sections + snippetAnswer field |
| Component Library | SUCCESs (quick answer, boxes, story), snippets §3.2 | Box types typed; answer-first everywhere |
| Image System | Concrete §2.3, Core Web Vitals §8 | Real-food photography + CLS-safe media |
| Internal Linking System | Blueprint §10 (roles, anchors, 4 golden rules) | Link maps reference §10.1–10.3 verbatim |
| Content Quality | EEAT §7, risks §12 (#1,#2,#8), LSI §5.3 | EEAT checklist, source hierarchy, freshness |
| Affiliate & AdSense | Trustworthiness §7.3, scalability §11, risks §3 | Disclosure-first, slot caps, no ad-above-H1 |
| Dev Specification | Tech blueprint §8, scalability §11.1 | Folder/token/CI mirrors Phase 1 standards |
| Phase 3 Prep | Expansion roadmap §14 | Launch sequence matches Phase 2 milestones |

# APPENDIX B — Source-PDF Principles Reinforced in Phase 2

| Principle | Applied in |
|---|---|
| Made to Stick — Simple (Commander's Intent) | D1 design principles; one-promise homepage; card copy |
| Made to Stick — Unexpected | Homepage hero + vivid "lost groceries" framing; blog ledes |
| Made to Stick — Concrete | Vivid per-page example requirement; real numbers in tables/badges |
| Made to Stick — Credible | Source hierarchy; typed boxes; review rubrics; "how we tested" |
| Made to Stick — Emotional (identity, not fear) | Voice rules §7.5; food-safety box usage discipline |
| Made to Stick — Stories | Blog template, story block on home, author/About story |
| Neil Patel — topic coverage/LSI | Frontmatter `lsi[]`, required sections, content templates |
| Neil Patel — featured snippets (Moz pattern) | Quick answer component; every H2-question pattern; tables |
| Neil Patel — voice search/readability | 9th-grade gates; question-form H1s; 2,000-word floor |
| Neil Patel — optimize existing content | Refresh workflow §7.10/§10.8 |
| Neil Patel — custom 404 | 404 template (D2.15) |
| Neil Patel — HTTPS/security | Stack §9.1, HTTPS/HSTS |
| Neil Patel — shoulder niche + micro influencers | Blog template purpose; printable-checklist shareability |

---

*End of Phase 2 — Design System, Content Framework & Production Blueprint. Documentation complete. No articles, code, or frontend are authorized by this phase; production begins in Phase 3 after approval.*
