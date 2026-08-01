# HomeStorageGuide.com
## Phase 3 — Content Production System & Launch Blueprint

**Status:** Production planning (Phase 3 — documentation only; no articles, no code)
**Builds on:** Phase 1 — Foundation & SEO Architecture and Phase 2 — Design System, Content Framework & Production Blueprint (both are the ONLY source of truth; URLs, categories, pillars, clusters, templates, and linking rules are LOCKED and reused verbatim)
**Audience:** Content team, SEO team, developers, editors, monetization lead
**Primary sources applied:** *Made to Stick* (Copywriting Master Guide) and *Neil Patel's Advanced Cheat Sheet to SEO* (SEO Master Guide), as encoded in Phase 1 and Phase 2

---

## 0. How to Use This Document

Phase 3 turns the approved architecture into an executable production system. It answers: *what do we publish, in what order, at what quality, and how do we measure it?*

| # | Deliverable | Answers |
|---|---|---|
| 1 | Complete Content Inventory | What pages exist, and their full production metadata |
| 2 | Shelf Life Database | The data model + 21 food categories of the core product |
| 3 | Content Clusters | How topics connect into rankable clusters |
| 4 | Publishing Roadmap | What gets published when, and why (4 batches) |
| 5 | Content Priority System | The scoring model that ranks every page |
| 6 | Database Standards | The fixed spec for every shelf-life page |
| 7 | SEO Opportunities | Where wins come from in each search channel |
| 8 | Content Operations | The end-to-end publishing workflow |
| 9 | Success Metrics | KPIs and targets at 30/90/180/365 days |
| 10 | Launch Master Plan | The chronological go-live sequence |
| **Golden Batch** | The first 50 pages, fully specified — the quality benchmark |

**Non-negotiables inherited (do not redesign):**
- Brand: **Home Storage Guide** · Tagline: **"Smart Food Storage, Shelf Life & Pantry Organization."**
- 3 pillars → 6 URL roots: `/shelf-life/`, `/storage-methods/`, `/pantry-organization/`, `/comparisons/`, `/reviews/`, `/tools/`.
- Scale targets: 300 shelf-life · 200 storage guides · 100 pantry-org · 100 comparisons · 100 reviews · 50 tools (850 core + tools).
- URL rules (Phase 1 §9): kebab-case, max 3 segments, stable slugs, no keyword stacking.
- Templates, components, word counts, schema, link maps, QA/SEO checklists: all from Phase 2 D2/D4/D6/D7/D10.
- Voice: 9th grade, answer-first, SUCCESs discipline; EEAT gate on every page.

Every page below is produced via the Phase 2 content model (frontmatter contract, §9.8) and must pass the Phase 2 QA/SEO gates (§10.3–10.6) before publish.

---

# DELIVERABLE 1 — COMPLETE CONTENT INVENTORY

## 1.1 Inventory Model & Method

**How the master inventory is managed:** the canonical inventory is a **content dataset** (spreadsheet/DB seeded from the Phase 2 content model) — not a static list. Each record = one content file's frontmatter (Phase 2 §9.8). This document defines the inventory *schema*, enumerates all **silos, hubs, and the Golden Batch fully**, and gives per-category representative rows. The remaining pages are generated from this schema + the Shelf Life Database (D2) and cluster maps (D3) — this is exactly how 850 pages stay consistent (Phase 1 §11.1).

**Why this method:** listing 850 individual rows would produce a document that is obsolete within a week; a data-driven inventory is the scale engine. Every page in the Golden Batch (50) is fully specified so the pattern is unambiguous for every subsequent page.

### 1.1.1 Page-Type Taxonomy (maps to Phase 2 templates)

| Type | Count | Phase 2 template | URL root | Primary intent |
|---|---|---|---|---|
| Pillar Pages | 5 | 2.1 Homepage, 2.3 Pillar | `/`, `/shelf-life/`, `/storage-methods/`, `/pantry-organization/`, `/tools/` | Authority/navigation |
| Hub Pages (subcategory) | ~19 | 2.2 Category | `/shelf-life/<cat>/`, `/storage-methods/<cat>/`, `/pantry-organization/<cat>/` | Navigation + topical |
| Database Pages | 300 | 2.4 Shelf Life | `/shelf-life/<cat>/<food>` | Informational |
| Supporting Guides | 300 | 2.5 Storage, 2.6 Pantry | `/storage-methods/…`, `/pantry-organization/…` | Informational/How-to |
| Reviews | 100 | 2.7 Review | `/reviews/…` | Commercial |
| Comparisons | 100 | 2.8 Comparison | `/comparisons/…` | Comparative/Commercial |
| Tools | 50 | 2.9 Tool | `/tools/…` | Interactive |
| Resources | ~30 | 2.10 Blog, 2.11–2.14 Static | `/blog/…`, `/about/…`, `/authors/…` | Trust + outreach |

## 1.2 Silos Overview (Phase 1 §4, verbatim)

```
home-storage-guide.com/
├── shelf-life/            PILLAR 1 — Database silo (300 pages + 5 hubs)
│   ├── /shelf-life/pantry/    (pantry staples, grains, rice, flour, sugar, beans,
│   │                           pasta, spices, baking, oils, canned, snacks,
│   │                           beverages, condiments)
│   ├── /shelf-life/produce/   (vegetables, fruit)
│   ├── /shelf-life/dairy/     (dairy, eggs)
│   ├── /shelf-life/meat/      (meat, seafood)
│   └── /shelf-life/freezer/   (frozen foods)
├── storage-methods/      PILLAR 2 — Guide silo (200 pages)
│   ├── freezing/ refrigerator/ dry-goods/ vacuum-sealing/ canning/
│   ├── dehydrating/ fermenting/ root-cellar/ emergency-storage/ food-safety/
├── pantry-organization/  PILLAR 3 — Guide silo (100 pages)
│   ├── systems/ layout/ containers/ labels/ rotation/ inventory/ small-spaces/
├── comparisons/          Money silo (100 pages)
├── reviews/              Money silo (100 pages)
└── tools/                Interactive silo (50 pages)
```

**Note on subcategories:** adding subcategory *indexes* under existing roots is explicitly allowed by Phase 1 §11 ("add subcategories under existing hubs"); no new URL roots are introduced.

## 1.3 Inventory Record Schema (per page)

| Field | Rule | Source |
|---|---|---|
| URL | Phase 1 §9 rules; kebab, ≤3 segments | Phase 1 §9 |
| Primary keyword | One keyword, one intent (registry — no cannibalization) | Phase 1 §3.3 |
| Search intent | Informational / How-to / Comparative / Commercial / Transactional / Interactive | Phase 1 §3.3 |
| Funnel stage | TOFU (awareness) / MOFU (consideration) / BOFU (conversion) | D5 |
| Priority | P1–P4 from the D5 scoring model | D5 |
| Target word count | Per Phase 2 D2 matrix | Phase 2 §2 |
| Internal link targets | Parent, siblings, related, money (Phase 2 D6 map) | Phase 2 D6 |
| Schema | From Phase 2 §9.9 library | Phase 2 §9.9 |
| EEAT requirements | Byline, reviewer, sources tier, "how we tested" where required | Phase 2 D7 |

## 1.4 Full Inventory — Pillar Pages (5)

| # | URL | Primary keyword | Intent | Funnel | Priority | Words | Schema | EEAT |
|---|---|---|---|---|---|---|---|---|
| P1 | `/` | (homepage) | Navigation | — | P1 | 250–450 | WebSite+SearchAction, Org, ItemList | Mission, team, contact |
| P2 | `/shelf-life/` | "food shelf life chart" | Informational | TOFU | P1 | 1,500–2,500 | Breadcrumb, ItemList, FAQ | Reviewer |
| P3 | `/storage-methods/` | "food storage methods" | Informational | TOFU | P1 | 1,500–2,500 | Breadcrumb, ItemList, FAQ | Reviewer |
| P4 | `/pantry-organization/` | "pantry organization" | Informational | TOFU | P1 | 1,500–2,500 | Breadcrumb, ItemList, FAQ | Author + reviewer |
| P5 | `/tools/` | "food storage tools" | Interactive | TOFU | P1 | 400–800 | WebApplication, ItemList | Author |

**Internal links (P1–P5):** every pillar links all six roots (footer), the other 2 pillars (contextual), and its flagship sub-pages; home is the single authority source feeding all pillars (Phase 1 §10.3).

## 1.5 Full Inventory — Hub Pages (subcategory indexes, ~19)

### 1.5.1 Shelf Life hubs (5)

| URL | Keywords | Children (count) | Words | Priority |
|---|---|---|---|---|
| `/shelf-life/pantry/` | "pantry food shelf life" | 170+ | 300–600 | P1 |
| `/shelf-life/produce/` | "produce shelf life" / "vegetable & fruit shelf life" | 45+ | 300–600 | P1 |
| `/shelf-life/dairy/` | "dairy shelf life" | 25+ | 300–600 | P1 |
| `/shelf-life/meat/` | "meat shelf life" | 40+ | 300–600 | P1 |
| `/shelf-life/freezer/` | "frozen food shelf life" | 20+ | 300–600 | P1 |

### 1.5.2 Storage Methods hubs (9)

`/storage-methods/freezing/`, `/storage-methods/refrigerator/`, `/storage-methods/dry-goods/`, `/storage-methods/vacuum-sealing/`, `/storage-methods/canning/`, `/storage-methods/dehydrating/`, `/storage-methods/fermenting/`, `/storage-methods/root-cellar/`, `/storage-methods/emergency-storage/`, `/storage-methods/food-safety/` (10 indexes; each 300–600 words, links every child guide).

### 1.5.3 Pantry Organization (no URL subfolders)

Per Phase 1 §9.3, pantry-organization pages live **directly** under `/pantry-organization/<slug>` (e.g., `/pantry-organization/the-fifo-pantry-system`). Thematic groupings (`systems`, `layout`, `containers`, `labels`, `rotation`, `inventory`, `small-spaces`) are **content tags/cluster groupings**, not URL folders — URLs remain 2 segments and are never reorganized (Phase 1 §9.2 rule 3, §11).

**Hub EEAT/schema:** Breadcrumb + ItemList; named author + reviewer; no thin hub allowed (Phase 2 §2.2 word floor; Phase 1 §12 risk #1).

## 1.6 Inventory — Database Pages (300 shelf-life pages)

**URL pattern:** `/shelf-life/<subcat>/how-long-does-<food>-last`
**Schema:** Breadcrumb, FAQPage, Article
**Words:** 1,200–2,000 (Phase 2 §2.4)
**EEAT:** author + reviewer (safety-tier foods require credentialed reviewer); every numeric claim cited (Phase 1 §7)
**Links:** parent hub + pillar, 3–5 siblings, 2 method guides, 1 comparison, 1 tool (Phase 2 §6.3 → 15 max out)

Distribution by DB category (full page lists in D2):

| DB Category | Hub URL | Pages | DB Category | Hub URL | Pages |
|---|---|---|---|---|---|
| Pantry Staples | `/shelf-life/pantry/` | 20 | Vegetables | `/shelf-life/produce/` | 30 |
| Grains | `/shelf-life/pantry/` | 15 | Fruit | `/shelf-life/produce/` | 25 |
| Rice | `/shelf-life/pantry/` | 10 | Dairy | `/shelf-life/dairy/` | 20 |
| Flour | `/shelf-life/pantry/` | 8 | Eggs | `/shelf-life/dairy/` | 5 |
| Sugar & Sweeteners | `/shelf-life/pantry/` | 6 | Meat | `/shelf-life/meat/` | 25 |
| Beans & Legumes | `/shelf-life/pantry/` | 12 | Seafood | `/shelf-life/meat/` | 12 |
| Pasta | `/shelf-life/pantry/` | 7 | Frozen Foods | `/shelf-life/freezer/` | 20 |
| Spices & Herbs | `/shelf-life/pantry/` | 12 | Snacks | `/shelf-life/pantry/` | 12 |
| Baking | `/shelf-life/pantry/` | 12 | Beverages | `/shelf-life/pantry/` | 10 |
| Oils & Fats | `/shelf-life/pantry/` | 8 | Condiments | `/shelf-life/pantry/` | 15 |
| Canned Foods | `/shelf-life/pantry/` | 10 | — | — | — |

**Representative rows (pattern for every DB page):**

| URL | Primary keyword | Intent | Funnel | Words | Priority basis |
|---|---|---|---|---|---|
| `/shelf-life/dairy/how-long-does-milk-last` | how long does milk last | Informational | TOFU | 1,200–2,000 | High volume + snippet |
| `/shelf-life/meat/how-long-does-ground-beef-last` | how long does ground beef last | Informational | TOFU | 1,200–2,000 | High volume + safety |
| `/shelf-life/pantry/how-long-does-rice-last` | how long does rice last | Informational | TOFU | 1,200–2,000 | High volume + cluster hub |

## 1.7 Inventory — Supporting Guides (300: 200 methods + 100 pantry)

**URL patterns:** `/storage-methods/<cat>/how-to-<action>-<food-or-target>` · `/pantry-organization/<slug>`
**Schema:** Breadcrumb, HowTo (steps), FAQ, Article
**Words:** 1,500–2,500 (Phase 2 §2.5/§2.6)
**EEAT:** named author + reviewer; "how we tested" note where equipment/method claims are made
**Links:** parent hub, sibling methods, 3–5 foods (applies-to), 2 container reviews/comparisons, 1 tool (Phase 2 §6.3)

Method guide categories (with page counts): freezing 45 · refrigerator 25 · dry-goods 20 · vacuum-sealing 15 · canning 20 · dehydrating 15 · fermenting 10 · root-cellar 10 · emergency-storage 15 · food-safety 25 = 200.
Pantry-org pages (100, tagged by group): systems 20 · layout 15 · containers 15 · labels 10 · rotation 15 · inventory 10 · small-spaces 15. All at `/pantry-organization/<slug>` (2 segments).

## 1.8 Inventory — Reviews (100) & Comparisons (100)

**Review URL:** `/reviews/<product>-review` — words 1,800–3,000; schema Product+Review+FAQ; EEAT: tested with named method + date; affiliate disclosure (Phase 2 §2.7).
**Comparison URL:** `/comparisons/<a>-vs-<b>` — words 1,500–2,500; schema Breadcrumb+FAQ (+Product pairs); verdict-first (Phase 2 §2.8).

Priority targets by product family: food-storage containers (20) · vacuum sealers (10) · canning supplies (10) · pantry organizers/labels (10) · lunch/meal-prep containers (10) · fridge/freezer organizers (10) · jar sets (5) · appliances (5) · preservation kits (5) · misc/home storage (15). Comparison pairs align with the D2 "comparison opportunities" and D3 cluster maps (e.g., glass-vs-plastic-food-storage).

## 1.9 Inventory — Tools (50)

**URL:** `/tools/<name>` — words 300–600; schema WebApplication + Article; interactive core (Phase 2 §2.9).

Tool families: shelf-life calculators (8) · expiration date checkers (6) · storage-rule finders (8) · temperature charts (4) · pantry audit & checklist generators (6) · freezer inventory loggers (5) · canning time/density converters (4) · meal-prep calculators (4) · emergency-storage planners (3) · printable generators (2). **Every tool duplexes with ≥1 guide and ≥1 shelf-life page** (Phase 1 §10.1).

## 1.10 Inventory — Resources (~30)

| Group | URLs | Purpose |
|---|---|---|
| Editorial/trust | `/about/`, `/about/editorial-policy`, `/about/how-we-test`, `/about/corrections`, `/contact/` | EEAT + trust (Phase 2 §2.12–2.14) |
| Authors | `/authors/<slug>` | Person entity + credentials (Phase 2 §2.11) |
| Blog | `/blog/<slug>` (8–15 in Phase 3) | Shoulder-niche link acquisition (Phase 1 §3.4) |
| Original research | `/blog/…-report` or hub-attached | Link magnets + press (Phase 1 §7.2) |
| Printables | attached to guides/tools | Shareability + email capture |

---

# DELIVERABLE 2 — SHELF LIFE DATABASE

The Shelf Life Database is the product. It powers the 300 database pages, the master chart on `/shelf-life/`, the tools, the internal link engine, and the JSON-LD output. Everything below follows the Phase 2 data contract (frontmatter tables + central data layer, §9.2/§9.8).

## 2.1 Data Model (one record per food)

| Field | Example (milk) | Drives |
|---|---|---|
| `foodId` | `milk` | slugs, links |
| `category` | `dairy` | URL + hub |
| `dbGroup` | `Dairy` | cluster grouping |
| `commonName`, `aliases` | milk, whole milk, 2% | voice/PAA matching |
| `storage[ ]` | pantry/fridge/freezer | shelf-life table rows |
| `durations[ ]` | fridge: 5–7 days past date | shelf-life table + cards |
| `temperatures[ ]` | fridge ≤40°F, freezer 0°F | temp tables + warnings |
| `spoilageSigns[ ]` | sour smell, curdling, mold | content sections |
| `sources[ ]` | USDA, FDA, extension | citations + schema |
| `safetyTier` | standard / risk | reviewer requirement (D6) |
| `seasons[ ]` | year-round | seasonal content + PAA |
| `relatedFoods[ ]` | cheese, cream | sibling links |
| `methods[ ]` | refrigeration, freezing | method-guide links |
| `containerTypes[ ]` | glass, carton | comparison/review links |
| `pinterestTerms[ ]` | milk shelf life chart | image system |

**Why:** one record renders the page, the chart, the cards, the tools, and the links — no duplication, no drift (Phase 1 §11.1, Phase 2 §9.8).

## 2.2 Database → URL Mapping

| DB Group | URL subcategory | Count |
|---|---|---|
| Pantry Staples, Grains, Rice, Flour, Sugar, Beans, Pasta, Spices, Baking, Oils, Canned, Snacks, Beverages, Condiments | `/shelf-life/pantry/` | 172 |
| Vegetables, Fruit | `/shelf-life/produce/` | 55 |
| Dairy, Eggs | `/shelf-life/dairy/` | 25 |
| Meat, Seafood | `/shelf-life/meat/` | 37 |
| Frozen Foods | `/shelf-life/freezer/` | 11 |
| **Total** | | **300** |

## 2.3 The 21 Database Categories

For each: **Parent Hub · Child Pages (examples) · Related Pages · Comparison Opportunities · Future Expansion.**

### 2.3.1 Pantry Staples (20 pages)
- **Parent hub:** `/shelf-life/pantry/` · **Sub-groups:** all pantry DB groups aggregate here; staples = the everyday non-perishable base.
- **Child pages:** how-long-does-bread-last · how-long-does-cereal-last · how-long-does-crackers-last · how-long-does-cornmeal-last · how-long-does-oats-last · how-long-does-coconut-last · how-long-does-nuts-last · how-long-does-peanut-butter-last · how-long-does-honey-last · how-long-does-syrup-last · how-long-does-jam-last · how-long-does-cereal-bars-last · how-long-does-flour-last (also in Flour) · how-long-does-rice-last (also in Rice) · etc.
- **Related pages:** bread storage guide · dry-goods storage guide · pantry containers · FIFO system.
- **Comparison opportunities:** bread box vs pantry · airtight vs regular containers.
- **Future expansion:** gluten-free pantry staples; pantry staples by climate/humidity; emergency pantry staples.

### 2.3.2 Grains (15)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** oats · quinoa · barley · couscous · bulgur · farro · millet · cornmeal · grits · rolled vs instant oats (each a page, e.g., how-long-does-quinoa-last).
- **Related:** rice · flour · pasta · dry-goods storage · whole-grain spoilage (rancidity).
- **Comparisons:** quinoa vs rice shelf life · whole grain vs refined grain shelf life.
- **Future expansion:** sprouted grains; grain storage for emergency; bulk grain CO2/long-term storage.

### 2.3.3 Rice (10)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** white rice · brown rice · basmati · jasmine · wild rice · arborio · cooked rice · frozen rice · instant rice · rice noodles.
- **Related:** grains · beans · how-to-store-dry-goods · how-to-freeze-leftovers · rice spoilage section.
- **Comparisons:** brown vs white rice shelf life · cooked vs dry rice.
- **Future expansion:** parboiled rice; sushi rice; rice for emergency storage; regional varieties.

### 2.3.4 Flour (8)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** all-purpose · whole wheat · bread flour · almond flour · coconut flour · gluten-free flour · self-rising · cornstarch.
- **Related:** baking · grains · pantry pests · how-to-store-dry-goods.
- **Comparisons:** all-purpose vs whole wheat shelf life · nut flours (fridge vs pantry).
- **Future expansion:** flour storage temperature studies; grain mill freshness.

### 2.3.5 Sugar & Sweeteners (6)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** white sugar · brown sugar · powdered sugar · honey (shared with staples) · maple syrup · molasses · agave · stevia/artificial sweeteners.
- **Related:** baking · beverages · condiments.
- **Comparisons:** honey vs sugar shelf life · natural vs artificial sweetener stability.
- **Future expansion:** sugar hardening/crystallization fixes; bulk sugar long-term storage.

### 2.3.6 Beans & Legumes (12)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** dried beans · lentils · chickpeas · black beans · pinto beans · kidney beans · canned beans · peas (dried) · soybeans · tofu (refrigerated) · tempeh · bean sprouts.
- **Related:** canned foods · rice (rice+beans cluster) · dry-goods storage.
- **Comparisons:** dried vs canned bean shelf life · fresh tofu vs vacuum-packed tofu.
- **Future expansion:** heirloom beans; sprouting for freshness.

### 2.3.7 Pasta (7)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** dried pasta · fresh pasta · whole-wheat pasta · gluten-free pasta · rice noodles · egg noodles · cooked pasta.
- **Related:** flour · grains · leftovers · how-to-store-dry-goods.
- **Comparisons:** fresh vs dried pasta shelf life · refrigerated vs frozen fresh pasta.
- **Future expansion:** artisan/long pasta; pasta-making freshness.

### 2.3.8 Spices & Herbs (12)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** ground spices · whole spices · dried herbs · black pepper · salt · paprika · cinnamon · garlic powder · onion powder · chili powder · bay leaves · dried ginger.
- **Related:** baking · food safety (botulism in herbs in oil) · how-to-store-dry-goods.
- **Comparisons:** ground vs whole spice shelf life · fresh vs dried herbs.
- **Future expansion:** spice testing (potency) guides; spice rack rotation.

### 2.3.9 Baking (12)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** baking powder · baking soda · yeast (dry/fresh) · cocoa powder · chocolate chips · vanilla extract · cream of tartar · corn syrup · gelatin · shredded coconut · sprinkles · fruitcake/dried fruit (shared with Fruit).
- **Related:** flour · sugar · spices · eggs · how-to-store-dry-goods.
- **Comparisons:** baking powder vs baking soda shelf life · dry vs fresh yeast.
- **Future expansion:** sourdough starter storage; baking staples for emergencies.

### 2.3.10 Oils & Fats (8)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** olive oil · vegetable oil · canola oil · coconut oil · avocado oil · sesame oil · peanut oil · butter (shared with Dairy) · shortening · lard.
- **Related:** condiments · baking · food-safety (rancidity) · how-to-store-dry-goods.
- **Comparisons:** olive vs avocado oil shelf life · refined vs extra-virgin shelf life · pantry vs fridge oils.
- **Future expansion:** oil rancidity testing; infusing oils safety.

### 2.3.11 Canned Foods (10)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** canned vegetables · canned fruit · canned beans (shared) · canned soup · canned tuna (shared with Seafood) · canned chicken · canned tomatoes · canned pumpkin · canned chili/meals · expired-canned-food page.
- **Related:** food-safety hub · canning method guides · emergency storage.
- **Comparisons:** best-by vs use-by for canned goods · canning vs freezing shelf life.
- **Future expansion:** dented-can policy deep dive; home-canned shelf-life nuances.

### 2.3.12 Vegetables (30)
- **Parent hub:** `/shelf-life/produce/`
- **Child pages:** lettuce · spinach/leafy greens · tomatoes · potatoes · onions · garlic · carrots · broccoli · cauliflower · mushrooms · bell peppers · cucumbers · zucchini · celery · cabbage · corn · asparagus · beets · radishes · green beans · peas (fresh) · avocado · artichoke · kale · sweet potatoes · eggplant · leeks · parsnips · squash (summer) · squash (winter).
- **Related:** produce hub · how-to-store-vegetables · freezing vegetables · root-cellar.
- **Comparisons:** refrigerator vs countertop storage for each (potatoes/onions/tomatoes).
- **Future expansion:** hydroponic/vertical storage; market-run planning; vegetable crisper settings.

### 2.3.13 Fruit (25)
- **Parent hub:** `/shelf-life/produce/`
- **Child pages:** apples · bananas · strawberries · blueberries · grapes · oranges · lemons · limes · peaches · pears · watermelon · cantaloupe · pineapple · mango · kiwi · cherries · plums · raspberries · blackberries · avocado (shared with Veg) · pomegranate · figs · dates · dried fruit · canned fruit (shared).
- **Related:** produce hub · how-to-store-fruit · freezing fruit · ripening (ethylene) guide.
- **Comparisons:** counter vs fridge fruit storage · ethylene producers vs sensitive produce.
- **Future expansion:** fruit storage by season; long-term fruit (cellar, preserving).

### 2.3.14 Dairy (20)
- **Parent hub:** `/shelf-life/dairy/`
- **Child pages:** milk · cheese (hard) · cheese (soft) · cream cheese · yogurt · butter · sour cream · heavy cream · buttermilk · half-and-half · cottage cheese · parmesan · mozzarella · cheddar · gouda · ricotta · condensed milk · evaporated milk · powdered milk · plant-based milk (almond/oat/soy).
- **Related:** eggs · dairy hub · fridge temperature · how-to-store-in-refrigerator · freezing dairy.
- **Comparisons:** hard vs soft cheese shelf life · dairy vs plant-milk shelf life · sell-by vs use-by.
- **Future expansion:** raw milk debate (safety), cheese cave aging, cultured dairy.

### 2.3.15 Eggs (5)
- **Parent hub:** `/shelf-life/dairy/`
- **Child pages:** shell eggs · refrigerated vs room-temp eggs · hard-boiled eggs · egg whites · duck eggs.
- **Related:** dairy · baking · food-safety hub · egg float test (spoilage).
- **Comparisons:** refrigerated vs countertop eggs · fresh vs store-bought eggs.
- **Future expansion:** pasteurized eggs; egg storage for baking business.

### 2.3.16 Meat (25)
- **Parent hub:** `/shelf-life/meat/`
- **Child pages:** chicken (breast/thighs/whole) · ground beef · steak/beef · pork chops · pork loin · bacon · ham · deli meat · turkey (ground/breast) · lamb · sausage · hot dogs · cooked meat · leftovers (meat) · beef jerky · cured meat · salami · corned beef · ribs · brisket · ground turkey · chicken wings · rotisserie chicken · giblets/organs · venison/game.
- **Related:** meat hub · freezing meat · vacuum sealing · food-safety hub · safe minimum temps.
- **Comparisons:** fresh vs frozen meat shelf life · ground vs whole-cut meat · deli vs whole ham.
- **Future expansion:** sous-vide storage; grass-fed vs conventional; slaughter/aging.

### 2.3.17 Seafood (12)
- **Parent hub:** `/shelf-life/meat/`
- **Child pages:** salmon · shrimp · cod · tilapia · tuna (fresh) · canned tuna (shared) · shellfish (clams/mussels/oysters) · crab · lobster · scallops · trout · frozen fish.
- **Related:** meat hub · freezing seafood · vacuum sealing · food-safety hub.
- **Comparisons:** fresh vs frozen fish · farmed vs wild shelf life · canned vs fresh.
- **Future expansion:** sushi-grade standards; smoked fish storage.

### 2.3.18 Frozen Foods (11)
- **Parent hub:** `/shelf-life/freezer/`
- **Child pages:** frozen vegetables · frozen fruit · frozen meat · frozen poultry · frozen fish · frozen meals · frozen pizza · frozen bread/dough · frozen leftovers · frozen desserts · freezer-burn page.
- **Related:** freezer temperature · freezing guides · vacuum sealing · frozen-foods hub.
- **Comparisons:** frozen vs fresh nutrition/shelf life · frost-free vs chest freezer storage.
- **Future expansion:** freezer inventory system (tool); power-outage freezer page.

### 2.3.19 Snacks (12)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** potato chips · tortilla chips · pretzels · popcorn · granola bars · granola · crackers (shared) · nuts (shared) · trail mix · cookies · candy/chocolate · jerky (shared).
- **Related:** pantry staples · pantry-organization containers · how-to-store-dry-goods.
- **Comparisons:** fresh snack vs processed snack shelf life · chip bag vs airtight container.
- **Future expansion:** baking-snack freshness; snack stash rotation systems.

### 2.3.20 Beverages (10)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** coffee (beans) · ground coffee · tea (bags/loose) · juice · soda · beer · wine · water (bottled) · milk alternatives (shared) · powdered drink mixes.
- **Related:** condiments · dairy (milk) · how-to-store-dry-goods · freezer (freeze coffee?).
- **Comparisons:** whole-bean vs ground coffee shelf life · bottled water vs tap freshness.
- **Future expansion:** home-brew storage; coffee-freezing debate.

### 2.3.21 Condiments (15)
- **Parent hub:** `/shelf-life/pantry/`
- **Child pages:** ketchup · mustard · mayonnaise · hot sauce · soy sauce · vinegar (white, apple cider, balsamic) · salad dressing · barbecue sauce · salsa · pickle relish · pickles · jam/jelly (shared) · honey (shared) · maple syrup (shared) · fish sauce · Worcestershire · hoisin · pesto.
- **Related:** oils · beverages · fridge door storage warning · how-to-store-in-refrigerator.
- **Comparisons:** refrigerate-after-opening rules (ketchup vs mayo vs hot sauce) · vinegar types shelf life.
- **Future expansion:** fermented condiments (kimchi, miso); clean-label vs conventional.

## 2.4 Database Governance

1. **Single record → many pages:** one food record drives its database page, chart row, card badge, tool output, and related links (no duplicated facts).
2. **Source lock:** duration/temperature fields accept only tier-1 sources (Phase 2 §7.4); a source change triggers a review flag on every page using it.
3. **Refresh clock:** every record's `reviewedDate` feeds the 6/12-month freshness scheduler (Phase 2 §7.10).
4. **Safety tier:** foods with pathogen risk (eggs, poultry, canned low-acid, cooked rice) are flagged `risk` → mandatory credentialed reviewer (Phase 2 §7.2).
5. **Uniqueness gate:** page text is written per-food (never templated prose) — DB stores *data*, humans write *copy* (Phase 1 §12 risk #1).

---

# DELIVERABLE 3 — CONTENT CLUSTERS

A cluster = one food family fully covered across silos, interconnected by internal links (Phase 1 §5.2 entity graph). Clusters are **topical relationships, not URL folders** — pages live in their silo URLs but link as a cluster. This is the entity-SEO engine (Phase 1 §5).

## 3.1 Cluster Anatomy (standard shape)

```
                [CLUSTER HUB = the food's database page]
                /how-long-does-<food>-last (owns the head keyword)
                 |            |             |           |
   [variant pages]      [method pages]  [money pages]  [tools]
   white/brown/cooked   storage guides  comparisons    calculators
   (shelf-life silo)    (methods silo)  (money silo)   (tools silo)
```

**Link obligations per cluster (Phase 2 D6):**
- Variant pages ↔ hub page (siblings + parent).
- Hub page ↔ 2 method pages, 1 comparison, 1 tool.
- Method pages ↔ 3–5 foods of the cluster (applies-to links).
- Every cluster has ≥3 inbound and feeds ≥1 money page contextually.

## 3.2 RICE CLUSTER (worked example — matches the brief)

| Page | URL | Silo | Role |
|---|---|---|---|
| Rice shelf life (hub) | `/shelf-life/pantry/how-long-does-rice-last` | Shelf Life | Cluster hub; owns "how long does rice last" + FAQ + spoilage |
| White rice | `/shelf-life/pantry/how-long-does-white-rice-last` | Shelf Life | Variant |
| Brown rice | `/shelf-life/pantry/how-long-does-brown-rice-last` | Shelf Life | Variant |
| Cooked rice | `/shelf-life/pantry/how-long-does-cooked-rice-last` | Shelf Life | Variant (+ risk tier: fried-rice syndrome) |
| Frozen rice | `/shelf-life/freezer/how-long-does-frozen-rice-last` | Shelf Life | Variant (freezer silo) |
| Rice storage | `/storage-methods/dry-goods/how-to-store-rice` | Methods | Method |
| Freeze cooked rice | `/storage-methods/freezing/how-to-freeze-cooked-rice` | Methods | Method |
| Rice containers | `/comparisons/rice-storage-containers` | Money | Comparison |
| Rice container review | `/reviews/oxo-pop-container-review` (representative) | Money | Review |
| Rice calculator | `/tools/shelf-life-calculator` | Tools | Tool |

**Rice FAQ content (hub page):** does rice expire? · how long does cooked rice last? · how to tell if rice has gone bad · can you freeze rice? · does rice go bad in the fridge?
**Rice entity coverage:** white/brown/wild/basmati/jasmine, moisture, pantry pests (weevils), fried-rice syndrome (B. cereus), FIFO.

## 3.3 DAIRY CLUSTER (Milk)

| Page | URL | Silo | Role |
|---|---|---|---|
| Milk shelf life | `/shelf-life/dairy/how-long-does-milk-last` | Shelf Life | Hub |
| Plant milk | `/shelf-life/dairy/how-long-does-almond-milk-last` | Shelf Life | Variant |
| Powdered milk | `/shelf-life/dairy/how-long-does-powdered-milk-last` | Shelf Life | Variant |
| Milk storage | `/storage-methods/refrigerator/how-to-store-milk` | Methods | Method |
| Freeze milk | `/storage-methods/freezing/how-to-freeze-milk` | Methods | Method |
| Glass vs plastic containers | `/comparisons/glass-vs-plastic-food-storage` | Money | Comparison |
| Milk shelf life chart | `/tools/shelf-life-calculator` | Tools | Tool |

## 3.4 POULTRY/MEAT CLUSTER (Chicken)

| Page | URL | Silo | Role |
|---|---|---|---|
| Chicken shelf life | `/shelf-life/meat/how-long-does-chicken-last` | Shelf Life | Hub (risk tier) |
| Ground chicken | `/shelf-life/meat/how-long-does-ground-chicken-last` | Shelf Life | Variant |
| Cooked chicken | `/shelf-life/meat/how-long-does-cooked-chicken-last` | Shelf Life | Variant |
| Freeze chicken | `/storage-methods/freezing/how-to-freeze-meat` | Methods | Method |
| Safe temps | `/storage-methods/food-safety/food-safety-temperature-guide` | Methods | Method (risk) |
| Vacuum sealer | `/comparisons/best-vacuum-sealer` → reviews | Money | Money |
| Leftover timer | `/tools/leftover-tracker` (or calculator) | Tools | Tool |

## 3.5 PRODUCE CLUSTERS (Vegetables · Fruit)

| Cluster | Hub page | Key variants | Method links | Money | Tool |
|---|---|---|---|---|---|
| Leafy greens | `/shelf-life/produce/how-long-does-lettuce-last` | spinach, kale, spring mix | how-to-store-vegetables | glass vs plastic | produce storage finder |
| Root veg | `/shelf-life/produce/how-long-does-potatoes-last` | sweet potatoes, carrots, onions, garlic | root-cellar guide | root cellar vs fridge | calculator |
| Nightshades | `/shelf-life/produce/how-long-does-tomatoes-last` | peppers, eggplant | how-to-store-vegetables | counter vs fridge | ripening guide tool |
| Berries | `/shelf-life/produce/how-long-does-strawberries-last` | blueberries, raspberries | how-to-freeze-fruit | berry keeper review | fruit storage finder |
| Tree fruit | `/shelf-life/produce/how-long-does-apples-last` | pears, peaches | how-to-store-fruit | ethylene vs non-ethylene | ripeness tool |
| Citrus | `/shelf-life/produce/how-long-does-oranges-last` | lemons, limes | how-to-store-fruit | fridge vs counter | — |

## 3.6 PANTRY CLUSTERS (Rice-adjacent families)

| Cluster | Hub page | Key variants | Method links | Money | Tool |
|---|---|---|---|---|---|
| Rice | (3.2) | white, brown, cooked, frozen | store-dry-goods, freeze-cooked-rice | rice containers | shelf-life calculator |
| Pasta | `/shelf-life/pantry/how-long-does-pasta-last` | fresh pasta, cooked pasta | store-dry-goods, freeze-leftovers | pasta containers | — |
| Flour/Baking | `/shelf-life/pantry/how-long-does-flour-last` | whole wheat, almond, cornstarch | store-dry-goods | flour keeper review | — |
| Beans | `/shelf-life/pantry/how-long-does-dried-beans-last` | lentils, canned beans | store-dry-goods | canning supplies | — |
| Oils | `/shelf-life/pantry/how-long-does-olive-oil-last` | avocado, coconut, sesame | rancidity guide | oil dispenser review | — |
| Coffee | `/shelf-life/pantry/how-long-does-coffee-last` | ground, beans | store-dry-goods | coffee container | — |
| Honey | `/shelf-life/pantry/how-long-does-honey-last` | raw, crystallized | store-dry-goods | jar set review | — |

## 3.7 ALL DATABASE GROUPS → CLUSTER MAP (summary)

Every DB category in D2 yields at least one cluster. Cluster generation rule: each DB group's foods share a **hub page** (the highest-volume food), **variant pages** (each other food), and shared **method/money/tool** edges. This produces the internal-link web without hand-editing (computed from the data model, Phase 2 §9.8).

**Cluster counts by group:** Pantry Staples 3 · Grains 1 · Rice 1 · Flour 1 · Sugar 1 · Beans 1 · Pasta 1 · Spices 1 · Baking 1 · Oils 1 · Canned 1 · Vegetables 6 · Fruit 6 · Dairy 2 · Eggs 1 · Meat 4 · Seafood 2 · Frozen 1 · Snacks 1 · Beverages 1 · Condiments 1 = **39 clusters** covering all 300 database pages.

**Cluster priority rule (links to D5):** golden-batch foods (D5 P1) get full clusters first; P2 clusters follow in Batch 2–3; P3/P4 clusters complete during scale-out.

---

# DELIVERABLE 4 — PUBLISHING ROADMAP

Four batches, aligned to Phase 2 §10.10 (Phase 3 ≈ 210 pages). **Each batch has a strategic reason; order is deliberate.**

## 4.1 Batch Plan

| Batch | Name | Pages | Composition | Cumulative |
|---|---|---|---|---|
| **Batch 1** | Golden / Benchmark | 50 | 5 pillars · 25 shelf-life · 10 pantry · 10 storage | 50 |
| **Batch 2** | Database & Money Start | 60 | 40 shelf-life · 10 comparisons · 10 storage | 110 |
| **Batch 3** | Chart Complete + Tools | 50 | 35 shelf-life · 15 tools | 160 |
| **Batch 4** | Full Surface + Monetization | 50 | 20 storage · 10 pantry · 10 comparisons · 10 reviews | 210 |

**Why these batches exist:**

- **Batch 1 (Benchmark):** every template type (except reviews) goes live at once → the whole system is validated before volume. The 25 shelf-life pages seed the flagship chart; 10+10 guides give the link web depth; EEAT baseline (authors, reviewers, sources) is established. This batch *defines quality* for everything after (Golden Batch spec below).
- **Batch 2 (Database & Money Start):** shelf-life to 65 foods makes the "300+ foods" claim credible and wins snippet clusters at scale; the first 10 comparisons start the money ecosystem while guides still dominate (money pages need contextual sources to link from — they must arrive *after* enough guides exist, per Phase 1 §10.3 rule 4).
- **Batch 3 (Chart Complete + Tools):** finishing the top-100 shelf-life foods completes the flagship *food shelf life chart* — the link magnet and Pinterest asset (Phase 1 §13 #1/#8). All 15 tools launch here: interactive pages are zero-click + backlink magnets, and they duplex-link with the now-large guide/web (Phase 1 §10.1).
- **Batch 4 (Full Surface + Monetization):** methods to 40, pantry to 20 (Phase 2 §10.10 targets complete), comparisons to 20, and the first 10 EEAT-built reviews. Reviews monetize only after trust infrastructure + traffic exist (Phase 2 D8; Phase 1 §7.3). Original research/blog seeds follow the batches.

## 4.2 Batch Sequencing Rules

1. **Hub-first within every batch:** never publish spokes before their hub page (crawl order + link integrity, Phase 1 §12 risk #4).
2. **Cluster-complete:** a food added to the chart must also publish its method link targets (or link to an existing one) — no dangling cluster edges.
3. **Intention mix per batch:** each batch includes TOFU (shelf-life), MOFU (comparisons), and interactive (tools) — diversified intent protects against Core/HCU volatility (Phase 1 §12 risk #6).
4. **Reviewer capacity caps velocity:** safety-tier pages can't exceed the credentialed reviewer's sign-off capacity (quality > speed; EEAT gate).
5. **Crawl-budget pacing:** submit ≤ 10 URLs/day to GSC post-launch; monitor coverage before accelerating (Phase 1 §12 risk #4).

## 4.3 Publishing Calendar (illustrative, weeks)

| Week | Batch focus | Volume/wk |
|---|---|---|
| 1–2 | Build + templates + DB seed + QA (dev gate) | 0 (dev) |
| 3–4 | Batch 1: pillars + 25 shelf-life + 10 pantry + 10 storage | 8–12/wk |
| 5–8 | Batch 2: 40 shelf-life + 10 comparisons + 10 storage | 12–15/wk |
| 9–12 | Batch 3: 35 shelf-life + 15 tools | 10–14/wk |
| 13–16 | Batch 4: 20 storage + 10 pantry + 10 comparisons + 10 reviews | 12–14/wk |

**Why weekly caps:** writer + editor + fact-check + reviewer capacity; 15 pages/week is the sustainable ceiling with the QA gates from Phase 2 §10.3 (never sacrifice quality for speed — this is the anti-thin-content guard, Phase 1 §12 risk #1).

---

# DELIVERABLE 5 — CONTENT PRIORITY SYSTEM

A transparent, repeatable scoring model so "what do we write next?" is never a guess. Score = weighted sum of eight factors → priority tier → batch slot.

## 5.1 Scoring Model

| Factor | Weight | Definition | Scoring guide |
|---|---|---|---|
| Search Volume | 20 | Combined monthly demand (primary + PAA family) | 20 = >50k; 15 = 10–50k; 10 = 1–10k; 5 = <1k |
| Competition | 20 | Inverted difficulty to rank (KD/Difficulty) | 20 = very low; 12 = medium; 4 = high; 0 = dominated by authorities |
| Commercial Intent | 15 | Money-page value (affiliate/ads) | 15 = reviews/comparisons; 8 = comparison-adjacent guides; 0 = pure info |
| Topical Importance | 15 | Contribution to pillar authority + entity coverage | 15 = pillar food of a big cluster; 8 = supporting variant; 3 = long-tail novelty |
| Internal Linking Value | 10 | Links the page will receive/send (hub potential) | 10 = cluster hub; 6 = variant; 3 = leaf |
| Seasonality | 5 | Timing of demand | 5 = seasonal window <60 days away; 3 = mild; 1 = evergreen |
| Pinterest Potential | 5 | Pin-worthiness (chart/table/list/visual) | 5 = chart; 4 = list; 2 = plain prose |
| Information Gain | 10 | Room to beat existing results (original data, gaps) | 10 = clear gap; 5 = partial gap; 0 = saturated |
| **Total** | **100** | | |

## 5.2 Priority Tiers

| Tier | Score | Meaning | Batch |
|---|---|---|---|
| **P1** | ≥ 75 | Launch-critical; builds the pillar & benchmark | Batch 1 (Golden) |
| **P2** | 60–74 | Core authority; completes clusters + money start | Batch 2–3 |
| **P3** | 45–59 | Depth pages; fills clusters; long-tail | Batch 4 + scale |
| **P4** | < 45 | Defer or skip unless cluster requires | Scale-out |

**Rule:** every cluster hub is at least P2 even if volume is modest — topical importance + linking value floor keeps clusters complete (you cannot rank a variant without its hub).

## 5.3 Priority Scores by Page Type (expected ranges)

| Page type | Volume | Compet. | Comm. | Topical | Linking | Season | Pinterest | InfoGain | Typical |
|---|---|---|---|---|---|---|---|---|---|
| Pillar/hub | 12 | 8 | 2 | 15 | 10 | 2 | 3 | 8 | **60–72 (P2, scheduled in Batch 1)** |
| Shelf-life hub food (milk, chicken, rice) | 18 | 14 | 0 | 15 | 10 | 2 | 4 | 9 | **72–78 (P1)** |
| Shelf-life variant (brown rice, ground chicken) | 12 | 15 | 0 | 8 | 6 | 2 | 4 | 8 | **55–62 (P2)** |
| Storage method guide | 10 | 12 | 4 | 12 | 8 | 2 | 3 | 8 | **55–64 (P2)** |
| Pantry org guide | 10 | 12 | 6 | 12 | 7 | 2 | 4 | 8 | **56–66 (P2)** |
| Comparison | 14 | 10 | 15 | 10 | 5 | 2 | 3 | 8 | **60–70 (P2)** |
| Review (hero product) | 12 | 10 | 15 | 8 | 4 | 3 | 3 | 7 | **56–66 (P2, Batch 4)** |
| Tool | 8 | 15 | 4 | 10 | 8 | 2 | 3 | 10 | **56–66 (P2, Batch 3)** |
| Blog/research | 6 | 14 | 2 | 6 | 4 | 4 | 4 | 9 | **44–55 (P3)** |

## 5.4 Ties, Overrides & Governance

1. **Tie-break order:** Topical Importance → Information Gain → Internal Linking Value.
2. **Overrides (documented exceptions):** cluster completeness, safety urgency (USDA guideline change), monetization readiness, or a ranking emergency (a P3 food already at position 5 — publish to capture).
3. **Recalc cadence:** scores re-run quarterly (volumes/competition shift) and before each batch is locked.
4. **Registry check:** the priority system feeds the keyword registry; a new page can't enter the pipeline without a P1–P4 slot (prevents cannibalization, Phase 1 §12 risk #5).

---

# DELIVERABLE 6 — DATABASE STANDARDS

The fixed spec every shelf-life page must satisfy (data-driven from D2 records, rendered via the Phase 2 §2.4 template). These standards ARE the anti-thin-content contract (Phase 1 §12 risk #1).

## 6.1 Non-negotiable page components

| Component | Requirement | Source |
|---|---|---|
| Quick answer | 40–60 word direct answer under H1, answer-first | Phase 2 §4.6; snippet doctrine |
| Shelf-life table | REQUIRED: Storage method · Duration · Notes; source-marked rows | Phase 2 §4.4 |
| Storage conditions | H2 covering pantry / fridge / freezer / once-opened (as applicable) | Phase 2 D3 §3.1 |
| Spoilage signs | Concrete list (smell, appearance, texture, taste where safe) | Phase 2 D3 §3.1 |
| Storage tips | ≥1 Storage Tip box (extend-life trick) | Phase 2 §4.6/1.6.6 |
| Food safety notice | REQUIRED when discard/health-risk applies (risk-tier foods) | Phase 2 §1.6.21 |
| FAQ | 3–5 PAA questions, 40–80 word answers, FAQPage schema | Phase 2 §4.15 |
| Sources | ≥3 tier-1 sources; every number cited | Phase 2 §7.4 |
| Related foods | 3–5 sibling links (same DB group) | Phase 2 §6.3 |
| Printable section | Print-friendly shelf-life strip or chart excerpt | Phase 2 §4.8 |

## 6.2 Required tables (with schemas)

| Table | Columns | Required? |
|---|---|---|
| Shelf-life table | Storage method · Duration · Best practice/notes | **Always** |
| Storage temperature table | Location · Target temp °F (+°C) | Risk-tier foods + foods with strict temps (dairy, meat, eggs) |
| Comparison table | X vs Y within page (e.g., salted vs unsalted butter) | When a comparison section exists |
| Best-by/use-by date table | Date type · What it means | Refrigerated foods |

## 6.3 Required FAQ set (from PAA research, per food)

1. How long does [food] last? (self-referential primary)
2. Does [food] go bad / expire?
3. Can you freeze [food]?
4. How to tell if [food] has gone bad?
5. How long past the date is [food] safe?
(Adjust to the actual PAA family; never invent questions without search evidence.)

## 6.4 Required entities (must appear + link)

The food (self) · its storage methods · spoilage signs · best-by/use-by concept · sibling foods · food-safety hub · applicable container/comparison. This is the Phase 1 §5.2 entity graph, enforced per page.

## 6.5 Required images

| Image | Spec (Phase 2 D5) | Required? |
|---|---|---|
| Featured photo | 1200×800, real food/storage | **Always** |
| Pinterest version | 1000×1500 vertical | **Always** (chart foods) |
| Temperature chart | 1200×900 | Risk-tier foods |
| Inline step/setup photo | 1200×800 | When a method is described |
| Spoilage visual | 1200×800 (mold/curdle close-up, honest) | When spoilage signs are text-heavy |

## 6.6 Required sources & warnings

- **Sources:** every duration/temperature row cites tier-1 (USDA/FDA/CDC/extension); sources section at page end; no unsourced numbers.
- **Warnings:** `risk`-tier foods (eggs, poultry, ground meat, cooked rice, low-acid canned) REQUIRE a Food Safety notice box with a discard/cook verb + reviewer sign-off. Non-risk foods get Storage Tip boxes instead (box-typing discipline, Phase 2 §1.6.6).

## 6.7 Internal links (exact budget)

| Role | Count |
|---|---|
| Breadcrumb | 1 |
| Parent hub + pillar (anchor "shelf life") | 1–2 |
| Sibling foods | 3–5 |
| Method pages (applies-to) | 2 |
| Comparison or review (money, contextual) | 1 |
| Tool (calculator/finder) | 1 |
| **Max outbound** | **15** (Phase 2 §6.3) |

## 6.8 Quality & freshness

- Uniqueness: ≥3 elements not found on any other page (original test, local note, exclusive example).
- Readability: grade ≤ 9, Hemingway ≤ 8 (Phase 2 §7.6).
- Freshness: reviewed within 6 months for risk-tier, 12 for others; `reviewedDate` in frontmatter; refresh clock armed at publish (Phase 2 §7.10).

---

# DELIVERABLE 7 — SEO OPPORTUNITIES

Where the wins come from, channel by channel. Each row = strategy, owning page types, and the phase/batch that captures it.

## 7.1 Featured Snippets (position 0)

| Strategy | Page types | Mechanics | Source |
|---|---|---|---|
| Question-form H1s | Shelf-life, guides | "How long does X last?" maps to the top-30 snippet word set | Phase 1 §3.2; Ahrefs list |
| Direct answer block | ALL content | 40–60 word paragraph, answer-first, self-contained | Phase 2 §4.6 |
| Snippet tables | Shelf-life, temp, comparison | HTML tables with caption/scope; never images | Phase 2 §4.4 |
| "best/vs/make/definition/can" vocabulary | Reviews, comparisons, guides | Build these into briefs | Phase 1 §3.2 |
| Position-gate discipline | All | Only optimize for position 0 when page is already in top 10 (99.6% of snippets) | Neil Patel guide |

**KPI:** snippet share of top-100 target keywords ≥ 10% at 12 months.

## 7.2 People Also Ask (PAA)

| Strategy | Page types | Mechanics |
|---|---|---|
| PAA research per brief | Shelf-life, guides | Capture PAA set in keyword research phase; write FAQ to it |
| FAQ block + FAQPage schema | All content | Each FAQ = one PAA question, fully answered 40–80 words |
| Answer-in-body (not only FAQ) | All | PAA answers also woven into content so the block isn't the only source |
| New-question monitoring | All top pages | Quarterly PAA capture → content-update queue (Phase 2 §10.7) |

## 7.3 Image Search

| Strategy | Mechanics |
|---|---|
| Descriptive alt text per D5.4 | Alt = what the image shows + storage context, ≤125 chars |
| Real food photography | Original photos (mold, storage, setups) — unique in SERPs |
| Image file naming | `how-long-does-milk-last-featured.webp` (D5.5) |
| Captions on charts | Every chart/image carries a text caption + conclusion |
| Structured data | imageObject metadata in Article schema |

## 7.4 Video Search

| Strategy | Page types | Mechanics |
|---|---|---|
| YouTube-first "how to" channel (Phase 4) | Method guides | Titles ≥5 words, keyword in title/description, say keyword in video, tags (Neil Patel guide) |
| Embedded videos on guides | Storage/pantry guides | Video embeds + transcript text on page (transcripts = indexed text) |
| Video snippet alignment | Guides | HowTo sections mirror the video steps |

## 7.5 Pinterest

| Strategy | Page types | Mechanics |
|---|---|---|
| Vertical pins on every chart food | Shelf-life pages | 1000×1500 pins with headline text overlay (D5.2) |
| Infographics for research | Pillars, tools, blog | Data-rich verticals (shelf-life chart, danger zone, FIFO diagram) |
| Board taxonomy = silo taxonomy | All | Boards mirror: Shelf Life · Storage Methods · Pantry Organization |
| Pin-to-page alignment | All | Each pin links to the matching page; pin titles use the H1 |
| Consistent brand overlay | All | Green/amber brand frame + logo = recognition (Made to Stick — Simple) |

**Why:** the shelf-life chart and pantry checklists are inherently pinnable; Pinterest is a top-3 referrer for food content and a distribution loop for link magnets (Phase 1 §13 #8).

## 7.6 Google Discover

| Strategy | Page types | Mechanics |
|---|---|---|
| Evergreen + timely mix | Blog, seasonal guides | Discover favors fresh, helpful, surprising content (Unexpected — Made to Stick) |
| Strong visuals + accurate titles | Featured images | Non-clickbait titles; real photos; entity clarity |
| E-E-A-T consistency | All | Discover throttles low-trust content; author/reviewer signals help |

## 7.7 Voice Search

| Strategy | Page types | Mechanics |
|---|---|---|
| Natural-language H1s | Shelf-life, FAQ | "How long does milk last in the fridge?" phrasing (Neil Patel voice guide) |
| 9th-grade readability | All | Grade ≤ 9 enforcement (Phase 2 §7.6) |
| Depth floor | All info pages | ≥ 1,200 words; average voice result ≈ 2,312 words |
| Direct answers | All | Voice assistants pull the 40–60 word answer block |

## 7.8 Zero-Click Searches

| Strategy | Page types | Mechanics |
|---|---|---|
| Own the answer | Shelf-life pages | The quick-answer block + table win the zero-click panel; brand exposure accrues even without the click (Neil Patel — featured snippet branding value) |
| Companion "next action" | Answer pages | After the answer, route users to the tool/guide (internal link in answer block) |
| Measurement | All | Track position-0 impressions + assisted conversions, not just clicks |

## 7.9 Information Gain

| Strategy | Page types | Mechanics |
|---|---|---|
| Original test data | Shelf-life, reviews | "We tested in our kitchen" duration/temperature results (Phase 2 §7.4 tier-4) |
| Research reports | Pillars, blog | 100-Pantry Audit, Cold-Storage Test (Phase 1 §7.2) |
| Gap-filling sections | All | Sections competitors lack: altitude notes, local climate, brand variants, cost math |
| Refresh as information gain | All | Updates add new data, not just new dates (Phase 1 §3.5) |

## 7.10 Entity SEO

| Strategy | Mechanics |
|---|---|
| Consistent terminology | "shelf life", "spoilage", "FIFO", "best-by" used identically site-wide (Phase 1 §5.2) |
| Entity graph via links | Every page links its entities (methods, foods, containers) |
| Person/Org schema | Author pages (Person) + Organization on home (Phase 2 §9.9) |
| Cluster completeness | 39 clusters (D3) = entity coverage breadth |
| Structured data validity | CI-validated schema on every build (Phase 2 §9.9) |

---

# DELIVERABLE 8 — CONTENT OPERATIONS

The production pipeline. **Every stage has an owner and a gate — no stage is skipped, no gate is bypassed.**

## 8.1 Pipeline (flowchart)

```
KEYWORD & PRIORITY
  │  (D5 scoring → registry slot → batch assignment)
  ▼
RESEARCH
  │  (PAA capture · competitor/snippet scan · source list · LSI set)
  ▼
WRITING
  │  (template brief · DB record pulled · draft to Phase 2 D3 structure)
  ▼
EDITING
  │  (voice pass · 9th grade · Concrete: numbers + examples · de-fluff)
  ▼
FACT-CHECKING
  │  (every numeric claim vs tier-1 source · markers added)
  ▼
IMAGE CREATION
  │  (D5: featured · inline · Pinterest · charts · alt text)
  ▼
SEO REVIEW
  │  (Phase 2 §10.4 checklist · title/meta · LSI · snippet block · links)
  ▼
INTERNAL LINKING
  │  (D6 map computed from DB · contextual anchors · money links)
  ▼
SCHEMA VALIDATION
  │  (JSON-LD generated from frontmatter · validator gate)
  ▼
QUALITY ASSURANCE
  │  (Phase 2 §10.3 checklist · reviewer sign-off on risk-tier)
  ▼
PUBLISHING
  │  (build · GSC submit ≤10/day · share)
  ▼
CONTENT REFRESH
  │  (6/12-month clock armed → §8.2 workflow)
```

## 8.2 Stage Definitions & SLAs

| Stage | Owner | Gate (exit criteria) | SLA |
|---|---|---|---|
| Keyword & priority | SEO lead | Registry slot confirmed; priority tier locked | 1 day |
| Research | SEO/editorial | PAA set, snippet holder analyzed, ≥3 tier-1 sources, LSI list | 1–2 days |
| Writing | Writer | Draft matches D3 heading structure + DB record; word floor met | 2–3 days |
| Editing | Editor | Voice, grade ≤ 9, concrete, no fluff, ≥3 unique elements | 1 day |
| Fact-checking | Fact-checker (or reviewer) | Every number cited; unverifiable claims removed | 1 day |
| Image creation | Designer | D5 specs met; alt text; ≤ budgets | 1–2 days |
| SEO review | SEO lead | Phase 2 §10.4 checklist green | 0.5 day |
| Internal linking | Editor + SEO | D6 map complete; no orphan; money links contextual | 0.5 day |
| Schema validation | Developer | Validator green; schema matches content | automated |
| QA | Editor-in-chief | Phase 2 §10.3 checklist; reviewer sign-off where required | 1 day |
| Publishing | Content ops | Build green; GSC request; analytics live | 0.5 day |
| Refresh | Editorial | Clock armed; next-review date in calendar | auto |

**Team sizing reference (batch rate ≈ 12–15 pages/wk):** 2 writers · 1 editor · 1 fact-checker · 1 SEO lead (part-time) · 1 designer (part-time) · 1 reviewer (safety-tier, credentialed, part-time). Quality gates in Phase 2 §10 are the constraint, not the calendar.

## 8.3 Content Refresh Workflow (Phase 2 §10.8, operationalized)

1. Refresh-due list generated monthly (D6.8 clocks).
2. Pull ranking, snippet status, PAA, traffic for each due page.
3. Verify every number vs current tier-1 sources; flag changes.
4. Update content + tables; re-run SEO/QA gates; bump `reviewedDate`.
5. Republish → GSC reindex request → reshare (Pinterest/social).
6. If page is now irrelevant/cannibalized → consolidate with 301 (Phase 1 §12 risk #8).

## 8.4 Quality-Audit Cadence (post-launch)

| Cadence | Audit |
|---|---|
| Monthly | Orphans/dead links/<3-inbound (Phase 2 §10.7) · Core Web Vitals · ad density |
| Quarterly | Cannibalization scan · priority recalc · PAA refresh · snippet wins/losses |
| Every 6 months | Risk-tier content full fact-check · product price/test updates |
| Annually | Full-site refresh sweep · template/token maintenance review |

---

# DELIVERABLE 9 — SUCCESS METRICS

KPIs at 30 / 90 / 180 / 365 days. **Targets are benchmarks for an authority site in a new domain — they assume zero existing equity, so early targets are operational, later targets are performance.**

## 9.1 KPI Table

| KPI | Measure | 30 days | 90 days | 6 months | 12 months |
|---|---|---|---|---|---|
| **Indexed pages** | GSC coverage | ≥ 45 of 50 published | ≥ 100 | ≥ 150 | ≥ 190 |
| **Organic sessions** | GA4 | ≥ 1,000/mo | ≥ 8,000/mo | ≥ 25,000/mo | ≥ 60,000/mo |
| **Organic clicks** | GSC | ≥ 800/mo | ≥ 6,000/mo | ≥ 18,000/mo | ≥ 40,000/mo |
| **Average position** | GSC (top-100 targets) | ≤ 35 | ≤ 20 | ≤ 15 | ≤ 10 |
| **CTR** | GSC | ≥ 2.5% | ≥ 3.5% | ≥ 4.5% | ≥ 5.5% |
| **Featured snippets won** | Rank tracker | ≥ 3 | ≥ 15 | ≥ 40 | ≥ 100 |
| **Snippet share (top-100)** | Rank tracker | — | ≥ 5% | ≥ 8% | ≥ 10% |
| **Internal link coverage** | Crawl audit | 100% pages ≥3 in | 100% | 100% | 100% |
| **Zero orphan pages** | Crawl audit | 0 | 0 | 0 | 0 |
| **Core Web Vitals (pass)** | CrUX/Lighthouse | 100% (green) | 100% | 100% | 100% |
| **Indexing velocity** | GSC | ≤10/day submitted | sustained | sustained | sustained |
| **AdSense readiness** | Policy/placements | Slots live (placeholder) | Approved if eligible | AdSense active | Revenue tracked |
| **Affiliate readiness** | Links/disclosures | 0 affiliate links (not yet) | First 10 comparisons | Reviews (Batch 4) live | Affiliate program active |
| **Pinterest** | Impressions/saves | Boards created; 50 pins | 500 saves/mo | 3,000 saves/mo | 10,000 saves/mo |
| **Backlinks (referring domains)** | Ahrefs | 5 | 30 | 80 | 200 |
| **Topical authority** | Keyword count in top-20 | ≥ 20 kwds | ≥ 150 | ≥ 400 | ≥ 800 |
| **EEAT compliance** | Internal audit | 100% pages (byline+review+date) | 100% | 100% | 100% |
| **Zero manual actions / HCU flags** | GSC | 0 | 0 | 0 | 0 |

## 9.2 Metric Rationales (why these numbers)

- **30 days = operations:** 30-day targets prove the *machine* works (indexing, links, EEAT, CWV) — traffic is not the goal yet; correctness is.
- **90 days = early proof:** the top-100 shelf-life foods + comparisons begin to rank; snippet share is the lead signal because the site is structurally engineered for position 0 (Phase 1 §3.2).
- **6 months = compounding:** chart complete + 15 tools = link magnets + zero-click wins; Pinterest loop active; backlinks climb as shoulder-niche PR (Phase 1 §3.4) lands.
- **12 months = authority:** >800 keywords in top-20 and >100 snippets = topical authority established; monetization (AdSense + affiliates) is now traffic-backed (Phase 2 D8).

## 9.3 Guardrail Metrics (success that must NOT break)

| Guardrail | Threshold | Why |
|---|---|---|
| Thin-content rate | 0 pages below template word floor | Phase 1 §12 risk #1 |
| Duplicate-content rate | 0 pages >80% similar | Phase 1 §12 risk #1 |
| EEAT compliance | 100% | YMYL gate (Phase 1 §7) |
| CWV failure | 0 pages failing | Phase 1 §8 |
| Cannibalization | 0 pairs in top-20 | Phase 1 §12 risk #5 |
| Ad/affiliate policy violations | 0 | Phase 2 D8 |
| Orphans | 0 | Phase 1 §10.3 |

**Decision rule:** guardrail breach = STOP publishing new pages until fixed. Volume never outruns quality.

---

# DELIVERABLE 10 — LAUNCH MASTER PLAN

Chronological go-live sequence. **Order is a dependency chain — later steps assume earlier steps are green.** Timeline: weeks, not days (reviewer capacity is the pacing constraint).

## 10.1 Phase A — Development & Foundation (Weeks 1–2)

| # | Step | Owner | Exit criteria |
|---|---|---|---|
| A1 | Repo + tokens + base CSS + grid | Dev | Phase 2 D1 tokens in CSS; build runs |
| A2 | 16 templates as layouts | Dev | Phase 2 D2 templates render from frontmatter |
| A3 | Component library build | Dev | Phase 2 D4 components, a11y baseline tested |
| A4 | DB + data model + seed script | Dev | D2 shelf-life records load; frontmatter contract validated |
| A5 | Schema library + generators | Dev | Phase 2 §9.9 JSON-LD output validates |
| A6 | Image pipeline | Dev | D5 formats/resizing/hashes automated |
| A7 | Search + navigation + 404 + tools shell | Dev | Phase 2 D2 §2.9/§2.15/§2.16 functional |
| A8 | **DEV QA gate** | QA lead | Phase 2 §10.3 checklist on 3 test pages; Lighthouse ≥ 90 |

## 10.2 Phase B — Content Upload & Quality (Weeks 3–6, Batch 1)

| # | Step | Owner | Exit criteria |
|---|---|---|---|
| B1 | Content files for Golden Batch (50) | Writers | All frontmatter fields complete |
| B2 | Images for Batch 1 | Designer | D5 specs met; ≤ budgets |
| B3 | Internal links applied (D6 maps) | Editors | No orphans; money links contextual |
| B4 | Schema validation pass | Dev | Validator green on 100% of batch |
| B5 | QA + reviewer sign-offs | Editor-in-chief | Phase 2 §10.3 green; risk-tier reviewed |
| B6 | Staging render + mobile check | QA | 320px render; tables scroll; no CLS |

## 10.3 Phase C — Technical Launch Prep (Weeks 5–6, parallel with B)

| # | Step | Owner | Exit criteria |
|---|---|---|---|
| C1 | Sitemap generation (per-category) | Dev | Phase 1 §8 — auto-updated XML sitemaps |
| C2 | robots.txt (minimal, allow-all core) | Dev | No blocked core; tool/search considerations set |
| C3 | Canonical + redirects rules | Dev | Every page canonical; 301 map ready |
| C4 | Analytics (GA4 + events) | Dev/Analytics | Events wired incl. tool interactions (Phase 1 §8) |
| C5 | Search Console verification | SEO | Property verified; sitemap submitted |
| C6 | Bing Webmaster verification | SEO | Property verified; indexNow or sitemap |
| C7 | AdSense placeholders live | Dev | Slots reserved; `aria-hidden`; no above-H1 mobile ad |
| C8 | Pinterest business account + boards | Social | Boards mirror silos; pins for Batch 1 |
| C9 | **GO/NO-GO gate** | PM + leads | All checklists green; no open P0/P1 issues |

## 10.4 Phase D — Public Launch & Monitoring (Weeks 6–8+)

| # | Step | Owner | Exit criteria |
|---|---|---|---|
| D1 | Deploy + DNS + HTTPS/HSTS verify | Dev | Live; SSL valid (Neil Patel security signal) |
| D2 | Request indexing ≤ 10 URLs/day | SEO | Coverage rising; no errors |
| D3 | 404 + redirect smoke test | QA | Custom 404 serves; dead links fixed |
| D4 | Daily monitoring (week 1) | SEO | GSC coverage, CWV field data, 4xx/5xx |
| D5 | Share Batch 1 (Pinterest/social) | Social | 50 pins; social distribution set |
| D6 | AdSense application (if eligible) | Monetization | Approval or re-application plan |
| D7 | Batch 2 kickoff (per D4 roadmap) | Editorial | 12–15 pages/wk cadence confirmed |

## 10.5 Post-Launch Monitoring Cadence

| Cadence | Activity |
|---|---|
| Daily (first 2 weeks) | GSC coverage · errors · CWV field data |
| Weekly (month 1) | Rank/snippet tracking · indexing velocity · 404s |
| Monthly | Phase 2 §10.7 full audit · ad density · backlinks |
| Quarterly | Priority recalc · PAA refresh · cannibalization · snippet wins |
| Continuous | Guardrail metrics (§9.3) — breach = pause publishing |

## 10.6 Launch Risk Map (from Phase 1 §12, operationalized)

| Risk | Launch control |
|---|---|
| Slow crawl budget | ≤10 URLs/day indexing requests; hub-first order |
| Thin content | D6 standards + word-floor gates per page |
| Misinformation | Risk-tier reviewer gate + tier-1 source lock |
| HCU volatility | Diversified intent in every batch (§4.2 rule 3) |
| Monetization trust | No affiliate links until Batch 4; ads in reserved slots only |

---

# GOLDEN BATCH — THE FIRST 50 PAGES (QUALITY BENCHMARK)

**Purpose:** the first 50 pages define the quality bar for every future page. They validate all templates, establish the EEAT baseline, seed the flagship chart, and build the internal-link spine. Every page below specifies URL · Keyword · Intent · Priority · Cluster · Internal Links. Nothing publishes before this batch passes the Phase 2 QA/SEO gates.

**Composition:** 5 Pillar Pages · 25 Shelf Life Pages · 10 Pantry Organization Pages · 10 Food Storage Guides.

## G.1 Pillar Pages (5)

| # | URL | Keyword | Intent | Priority | Cluster | Internal links |
|---|---|---|---|---|---|---|
| G01 | `/` | (homepage) | Navigation | P1 | Sitewide | 6 roots (footer) · 3 pillars (cards) · tools strip · top-10 foods · 1 story CTA |
| G02 | `/shelf-life/` | food shelf life chart | Informational | P1 | Shelf Life pillar | All 5 subcat hubs · top-25 foods (chart) · 2 methods · 1 tool · 1 comparison |
| G03 | `/storage-methods/` | food storage methods | Informational | P1 | Storage pillar | All method subcats · 10 golden guides · 3 foods · 1 comparison |
| G04 | `/pantry-organization/` | pantry organization | Informational | P1 | Pantry pillar | All 10 golden pantry pages · 2 methods · 1 comparison · 1 tool |
| G05 | `/tools/` | food storage tools | Interactive | P1 | Tools hub | 3 flagship tools · 3 guides · 3 foods |

## G.2 Shelf Life Pages (25)

### Dairy & Eggs (5)

| # | URL | Keyword | Intent | Priority | Cluster | Internal links |
|---|---|---|---|---|---|---|
| G06 | `/shelf-life/dairy/how-long-does-milk-last` | how long does milk last | Informational | P1 | Dairy/Milk | dairy hub + shelf-life pillar · cheese, butter, yogurt (siblings) · how-to-store-milk · glass-vs-plastic · calculator |
| G07 | `/shelf-life/dairy/how-long-does-cheese-last` | how long does cheese last | Informational | P1 | Dairy/Cheese | dairy hub · milk, butter, yogurt · how-to-store-in-refrigerator · cheese keeper comparison · calculator |
| G08 | `/shelf-life/dairy/how-long-does-butter-last` | how long does butter last | Informational | P2 | Dairy/Butter | dairy hub · milk, cheese · how-to-freeze-butter (link to freeze-guide) · glass-vs-plastic · calculator |
| G09 | `/shelf-life/dairy/how-long-does-yogurt-last` | how long does yogurt last | Informational | P2 | Dairy/Yogurt | dairy hub · milk, butter · how-to-store-in-refrigerator · freezer guide · calculator |
| G10 | `/shelf-life/dairy/how-long-does-eggs-last` | how long do eggs last | Informational | P1 | Eggs (risk) | dairy hub + food-safety guide · milk · how-to-store-in-refrigerator · egg storage comparison · calculator |

### Meat & Seafood (4)

| # | URL | Keyword | Intent | Priority | Cluster | Internal links |
|---|---|---|---|---|---|---|
| G11 | `/shelf-life/meat/how-long-does-chicken-last` | how long does chicken last | Informational | P1 | Poultry (risk) | meat hub + safety temp guide · ground beef, steak (siblings) · how-to-freeze-meat · vacuum-sealer comparison · leftover tracker |
| G12 | `/shelf-life/meat/how-long-does-ground-beef-last` | how long does ground beef last | Informational | P1 | Beef (risk) | meat hub · chicken, steak · how-to-freeze-meat · food-safety temp guide · calculator |
| G13 | `/shelf-life/meat/how-long-does-steak-last` | how long does steak last | Informational | P1 | Beef (risk) | meat hub · ground beef, chicken · how-to-freeze-meat · vacuum-sealer comparison · calculator |
| G14 | `/shelf-life/meat/how-long-does-salmon-last` | how long does salmon last | Informational | P2 | Seafood (risk) | meat hub · how-to-freeze-fish (freeze guide) · food-safety guide · vacuum-sealer comparison · calculator |

### Produce (8)

| # | URL | Keyword | Intent | Priority | Cluster | Internal links |
|---|---|---|---|---|---|---|
| G15 | `/shelf-life/produce/how-long-does-bananas-last` | how long do bananas last | Informational | P1 | Fruit/Bananas | produce hub · apples, strawberries · how-to-store-fruit · ethylene vs non-ethylene · calculator |
| G16 | `/shelf-life/produce/how-long-does-apples-last` | how long do apples last | Informational | P1 | Fruit/Tree | produce hub · bananas, strawberries · how-to-store-fruit · root-cellar guide · calculator |
| G17 | `/shelf-life/produce/how-long-does-strawberries-last` | how long do strawberries last | Informational | P1 | Fruit/Berries | produce hub · blueberries (later) · how-to-freeze-fruit · berry keeper comparison · calculator |
| G18 | `/shelf-life/produce/how-long-does-tomatoes-last` | how long do tomatoes last | Informational | P1 | Nightshades | produce hub · lettuce, potatoes · how-to-store-vegetables · counter-vs-fridge comparison · calculator |
| G19 | `/shelf-life/produce/how-long-does-potatoes-last` | how long do potatoes last | Informational | P1 | Root veg | produce hub · onions · how-to-store-dry-goods · root-cellar guide · calculator |
| G20 | `/shelf-life/produce/how-long-does-onions-last` | how long do onions last | Informational | P2 | Root veg | produce hub · potatoes, garlic (later) · how-to-store-vegetables · root-cellar guide · calculator |
| G21 | `/shelf-life/produce/how-long-does-lettuce-last` | how long does lettuce last | Informational | P1 | Leafy greens | produce hub · spinach (later) · how-to-store-vegetables · produce-keeper comparison · calculator |
| G22 | `/shelf-life/produce/how-long-does-mushrooms-last` | how long do mushrooms last | Informational | P2 | Vegetables | produce hub · lettuce, tomatoes · how-to-store-vegetables · paper-bag vs container · calculator |

### Pantry (8)

| # | URL | Keyword | Intent | Priority | Cluster | Internal links |
|---|---|---|---|---|---|---|
| G23 | `/shelf-life/pantry/how-long-does-rice-last` | how long does rice last | Informational | P1 | Rice (hub) | pantry hub + shelf-life pillar · cooked rice, pasta, flour (siblings) · how-to-store-rice · rice-storage comparison · calculator |
| G24 | `/shelf-life/pantry/how-long-does-cooked-rice-last` | how long does cooked rice last | Informational | P1 | Rice (risk) | rice hub · how-to-freeze-leftovers · food-safety guide (B. cereus) · fridge-temp guide · calculator |
| G25 | `/shelf-life/pantry/how-long-does-flour-last` | how long does flour last | Informational | P2 | Flour/Baking | pantry hub · rice, pasta · how-to-store-dry-goods · flour-keeper comparison · calculator |
| G26 | `/shelf-life/pantry/how-long-does-pasta-last` | how long does pasta last | Informational | P2 | Pasta | pantry hub · rice, flour · how-to-store-dry-goods · glass-vs-plastic · calculator |
| G27 | `/shelf-life/pantry/how-long-does-bread-last` | how long does bread last | Informational | P1 | Bread/Staples | pantry hub · how-to-freeze-bread (freeze guide) · bread-box comparison · how-to-store-dry-goods · calculator |
| G28 | `/shelf-life/pantry/how-long-does-coffee-last` | how long does coffee last | Informational | P2 | Beverages | pantry hub · how-to-store-dry-goods · coffee-container comparison · freezer guide · calculator |
| G29 | `/shelf-life/pantry/how-long-does-honey-last` | how long does honey last | Informational | P2 | Condiments | pantry hub · how-to-store-dry-goods · crystallized-honey tip box · glass-jar review · calculator |
| G30 | `/shelf-life/pantry/how-long-does-canned-food-last` | how long does canned food last | Informational | P1 | Canned (risk) | pantry hub + food-safety guide · canning guide · dented-can policy section · emergency-storage guide · calculator |

## G.3 Pantry Organization Pages (10)

| # | URL | Keyword | Intent | Priority | Cluster | Internal links |
|---|---|---|---|---|---|---|
| G31 | `/pantry-organization/how-to-organize-your-pantry` | how to organize your pantry | How-to | P1 | Systems | pantry pillar · FIFO, zones (siblings) · how-to-store-pantry-staples · container guide · pantry audit tool |
| G32 | `/pantry-organization/the-fifo-pantry-system` | FIFO pantry system | How-to | P1 | Rotation | pantry pillar · rotation, labels · how-long-does-canned-food-last · shelf-life hub · printable checklist |
| G33 | `/pantry-organization/pantry-zones-and-layout` | pantry zones layout | How-to | P2 | Layout | pantry pillar · organize, small-pantry · pantry-container guide · pantry audit tool |
| G34 | `/pantry-organization/pantry-rotation-system` | pantry rotation | How-to | P2 | Rotation | pantry pillar · FIFO, inventory · shelf-life pages (canned, rice) · printable checklist |
| G35 | `/pantry-organization/how-to-label-pantry-containers` | how to label pantry containers | How-to | P2 | Labels | pantry pillar · FIFO, inventory · label-maker review · container guide |
| G36 | `/pantry-organization/pantry-inventory-checklist` | pantry inventory checklist | How-to | P2 | Inventory | pantry pillar · rotation · pantry audit tool · printable checklist |
| G37 | `/pantry-organization/small-pantry-organization` | small pantry organization | How-to | P2 | Layout | pantry pillar · zones, organize · small-space containers review |
| G38 | `/pantry-organization/how-to-store-pantry-staples` | how to store pantry staples | How-to | P1 | Storage | pantry pillar + dry-goods guide · shelf-life pages (flour, rice) · container guide |
| G39 | `/pantry-organization/pantry-container-guide` | best pantry containers | Commercial | P1 | Containers | pantry pillar · glass-vs-plastic comparison · storage-methods dry-goods · labels guide |
| G40 | `/pantry-organization/seasonal-pantry-cleanout` | pantry cleanout checklist | How-to | P3 | Rotation | pantry pillar · FIFO, inventory · shelf-life hub · printable checklist |

## G.4 Food Storage Guides (10)

| # | URL | Keyword | Intent | Priority | Cluster | Internal links |
|---|---|---|---|---|---|---|
| G41 | `/storage-methods/refrigerator/how-to-store-food-in-the-refrigerator` | how to store food in the refrigerator | How-to | P1 | Refrigerator | storage pillar + fridge temp guide · milk, eggs, chicken (applies-to) · fridge-organizer comparison |
| G42 | `/storage-methods/freezing/how-to-freeze-meat` | how to freeze meat | How-to | P1 | Freezing | storage pillar + meat hub · chicken, ground beef, steak · vacuum-sealer comparison · freezer chart tool |
| G43 | `/storage-methods/freezing/how-to-freeze-vegetables` | how to freeze vegetables | How-to | P2 | Freezing | storage pillar · produce hub · lettuce, tomatoes · glass-vs-plastic · freezer chart tool |
| G44 | `/storage-methods/freezing/how-to-freeze-fruit` | how to freeze fruit | How-to | P2 | Freezing | storage pillar · produce hub · strawberries, bananas · freezer chart tool |
| G45 | `/storage-methods/freezing/how-to-freeze-leftovers` | how to freeze leftovers | How-to | P1 | Freezing | storage pillar + food-safety · cooked rice, cooked chicken · how-long-do-leftovers-last (guide) · leftover tracker |
| G46 | `/storage-methods/freezing/how-to-prevent-freezer-burn` | how to prevent freezer burn | How-to | P2 | Freezing | storage pillar · how-to-vacuum-seal-food · freezer chart tool |
| G47 | `/storage-methods/dry-goods/how-to-store-dry-goods` | how to store dry goods | How-to | P1 | Dry goods | storage pillar + pantry pillar · rice, flour, pasta (applies-to) · pantry-container-guide · shelf-life chart |
| G48 | `/storage-methods/vacuum-sealing/how-to-vacuum-seal-food` | how to vacuum seal food | How-to | P2 | Vacuum sealing | storage pillar · how-to-freeze-meat · salmon, cheese · vacuum-sealer comparison · sealer review |
| G49 | `/storage-methods/canning/canning-basics-for-beginners` | canning for beginners | How-to | P2 | Canning (risk) | storage pillar + food-safety · canned-food shelf-life · canning-supplies review · canning-time tool |
| G50 | `/storage-methods/food-safety/food-safety-temperature-guide` | food safety temperature guide | Informational | P1 | Food safety (risk) | storage pillar + meat/dairy hubs · chicken, eggs, canned food (applies-to) · danger-zone chart · temperature tool |

## G.5 Golden Batch Internal-Link Integrity Check

| Requirement | Verification |
|---|---|
| Every page ≥3 inbound | Computed by link map (Phase 2 §9.8) before publish |
| No orphan / no dead-end | Batch crawl gate |
| Pillar spines complete | Each of the 6 roots reachable from home; each golden page within 2 clicks of its hub |
| Money links contextual | G39, G48, G49, G50 links are in-body, max 1 per page |
| Risk-tier review sign-off | G10–G14, G24, G30, G49, G50 mandatory credentialed reviewer |
| Snippet blocks present | All 25 shelf-life + G41–G50 have quick answers + tables |

## G.6 Golden Batch Success Definition

- 100% of pages pass Phase 2 QA/SEO checklists.
- ≥ 90% of the 25 shelf-life pages structured for position 0 (question H1 + table + FAQ).
- The 50 pages form a fully linked web: no orphans, ≥3 inbound each, all money links contextual.
- 15+ original images meeting D5 budgets; 50 Pinterest pins live.
- Reviewer sign-offs on all risk-tier pages before Batch 2 begins.

**This batch is the benchmark.** Any page in later batches that does not match the Golden Batch's component completeness, EEAT rigor, and link integrity is rejected until it does.

---

# APPENDIX A — Phase 3 ↔ Phase 1/2 Traceability

| Phase 3 artifact | Depends on |
|---|---|
| Inventory schema + page-type taxonomy | Phase 1 §3.3, §4, §9; Phase 2 D2 templates, §9.8 frontmatter |
| Shelf Life Database model | Phase 1 §5.2 entity map, §9.1 URL subcats; Phase 2 §9.2 data layer |
| Content clusters | Phase 1 §5 (topical authority), §10 linking; Phase 2 D6 link maps |
| Publishing roadmap (210 pages) | Phase 1 §14 roadmap; Phase 2 §10.10 launch sequence |
| Priority scoring model | Phase 1 §3.3 intent + §12 risks; Phase 2 D7 quality gates |
| Database standards (per-page spec) | Phase 1 §3.2 snippets, §5.3 LSI, §7 EEAT; Phase 2 D3/D6 |
| SEO opportunities | Phase 1 §3.2, §13; Neil Patel guide (snippets, voice, LSI, refresh) |
| Content operations | Phase 2 §10.2–10.9 checklists and workflows |
| Success metrics | Phase 1 §8 (CWV), §13 (opportunities); Phase 2 D9 guardrails |
| Launch master plan | Phase 1 §12 risks; Phase 2 §10.5 pre/post-publication |
| Golden Batch | Phase 1 §9.3 URL examples; Phase 2 D2/D3/D6 specs; Made to Stick voice |

# APPENDIX B — Source-PDF Principles Reinforced in Phase 3

| Principle | Applied in |
|---|---|
| Made to Stick — Simple | Golden Batch pillars; one keyword per page; consistent terminology |
| Made to Stick — Concrete | D6 required tables/numbers; real-food images; vivid examples per food |
| Made to Stick — Credible | Source lock (D6.6); reviewer gates on risk-tier; "how we tested" |
| Made to Stick — Stories | Blog/research resources; seasonal cleanout story hooks |
| Neil Patel — featured snippets | Question H1s + quick-answer blocks + tables across all 25 shelf-life pages |
| Neil Patel — LSI/topic coverage | Content clusters + LSI lists per brief (D3, D6.4) |
| Neil Patel — voice search | Question-form keywords; 9th-grade; 2,000-word floor |
| Neil Patel — shoulder niches | Resources/blog + research assets for outreach |
| Neil Patel — content refresh | D8.3 refresh workflow; 6/12-month clocks |
| Neil Patel — optimize existing content | KPI-driven update queue; information-gain refreshes |
| Neil Patel — security | D10 C2/D1 HTTPS + HSTS gate |

---

*End of Phase 3 — Content Production System & Launch Blueprint. Documentation complete. No articles or code are authorized by this phase; article production and development begin upon approval of the Golden Batch.*
