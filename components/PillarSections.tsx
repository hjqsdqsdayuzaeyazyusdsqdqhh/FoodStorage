import { getChildren, getFoodsByCategory, getPage } from "@/lib/content";
import type { ContentPage } from "@/lib/types";
import { DataTable } from "@/components/DataTable";
import { FoodCard } from "@/components/FoodCard";
import { CategoryCard } from "@/components/CategoryCard";
import { IconSnowflake, IconPantry, IconFridge } from "@/components/icons";

const CATEGORY_META: Record<string, { title: string; blurb: string }> = {
  dairy: { title: "Dairy & eggs", blurb: "Milk, cheese, butter, yogurt, and eggs — exact fridge and freezer lives." },
  meat: { title: "Meat & seafood", blurb: "Chicken, beef, and fish — plus the food-safety rules that keep them safe." },
  produce: { title: "Produce", blurb: "Fruit and vegetables — counter, fridge, and freezer shelf lives." },
  pantry: { title: "Pantry staples", blurb: "Rice, flour, pasta, bread, coffee, honey, and canned goods." },
  freezer: { title: "Frozen foods", blurb: "Freezer-safe durations and how to prevent freezer burn." },
};

const METHOD_META: Record<string, { title: string; blurb: string }> = {
  freezing: { title: "Freezing", blurb: "How to freeze meat, produce, and leftovers without ruining texture." },
  refrigerator: { title: "Refrigerator storage", blurb: "Keep the fridge at or below 40°F and store food the right way." },
  "dry-goods": { title: "Dry goods", blurb: "Pantry staples that stay fresh for months with the right setup." },
  "vacuum-sealing": { title: "Vacuum sealing", blurb: "Seal out air to multiply freezer and pantry shelf life." },
  canning: { title: "Canning", blurb: "Safe home canning basics for low-acid and high-acid foods." },
  "food-safety": { title: "Food safety", blurb: "Temperatures, danger zones, and rules that prevent foodborne illness." },
  systems: { title: "Pantry systems", blurb: "The frameworks — zones, FIFO, and labels — that keep a pantry organized." },
  rotation: { title: "Rotation & inventory", blurb: "FIFO, checklists, and cleanouts that stop food from expiring in the pantry." },
  layout: { title: "Pantry layout", blurb: "Zones, shelves, and small-space setups that make a pantry use itself." },
  labels: { title: "Labels & containers", blurb: "Dated labels and airtight containers that keep staples visible and fresh." },
  inventory: { title: "Inventory & checklists", blurb: "Printable checklists that track what you have and what's about to expire." },
  containers: { title: "Containers", blurb: "Airtight containers that protect dry staples and keep the pantry organized." },
  storage: { title: "Storing staples", blurb: "How to store rice, flour, pasta, and cans so they keep their full shelf life." },
};

/** The master shelf-life chart (Phase 2 §2.3 #5) — every published food, one table. */
export function ShelfLifeMasterTable({ foods }: { foods: ContentPage[] }) {
  const table = {
    caption: "The Home Storage Guide shelf-life chart — how long each food lasts in the pantry, fridge, and freezer.",
    columns: ["Food", "Pantry", "Fridge", "Freezer"],
    rows: foods.map((f) => [
      `<a href="${f.urlPath}" class="no-underline hover:underline font-medium">${f.foodName ?? f.title}</a>`,
      f.shelfLife?.pantry ?? "—",
      f.shelfLife?.fridge ?? "—",
      f.shelfLife?.freezer ?? "—",
    ]),
  };
  return (
    <section className="my-10" aria-labelledby="master-chart-heading">
      <h2 id="master-chart-heading" className="text-h2 mb-3">
        The food shelf life chart
      </h2>
      <p className="mb-4 text-body text-brand-ink-700">
        Every duration is cited to USDA, FDA, or CDC guidance and reviewed by a registered dietitian. Tap any food for
        the full guide.
      </p>
      <DataTable data={table} />
    </section>
  );
}

/** Subcategory blocks: hub → its food cards; or method grouping → guide cards. */
export function SubcategoryBlocks({ hub }: { hub: ContentPage }) {
  if (hub.template === "pillar" && hub.category === "shelf-life-root") {
    return (
      <section className="my-10" aria-label="Shelf life by category">
        <h2 className="text-h2 mb-4">Shelf life by category</h2>
        <div className="space-y-10">
          {["dairy", "meat", "produce", "pantry", "freezer"].map((cat) => {
            const foods = getFoodsByCategory(cat);
            const meta = CATEGORY_META[cat];
            if (!meta) return null;
            return (
              <div key={cat}>
                <h3 className="text-h3 mb-1">
                  <a href={`/shelf-life/${cat}/`} className="no-underline hover:underline">
                    {meta.title}
                  </a>
                </h3>
                <p className="mb-4 text-small text-brand-ink-500">{meta.blurb}</p>
                {foods.length ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {foods.map((f) => (
                      <FoodCard key={f.urlPath} page={f} />
                    ))}
                  </div>
                ) : (
                  <p className="text-small text-brand-ink-500">
                    Guides for this category are in production. Meanwhile, see the{" "}
                    <a href="/storage-methods/freezing/how-to-freeze-meat/" className="no-underline hover:underline">
                      freezer storage guide
                    </a>{" "}
                    or the{" "}
                    <a href="/storage-methods/refrigerator/how-to-store-food-in-the-refrigerator/" className="no-underline hover:underline">
                      refrigerator guide
                    </a>
                    .
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Guide pillars: group children by method (category field).
  const children = getChildren(hub.urlPath).filter((p) => p.template === "guide" || p.template === "pantryGuide");
  const groups = new Map<string, ContentPage[]>();
  for (const child of children) {
    const key = child.method ?? child.category ?? "other";
    const list = groups.get(key) ?? [];
    list.push(child);
    groups.set(key, list);
  }
  return (
    <section className="my-10" aria-label="Guides">
      {[...groups.entries()].map(([method, pages]) => {
        const meta = METHOD_META[method] ?? { title: method.replace(/-/g, " "), blurb: "" };
        return (
          <div key={method} className="mb-10">
            <h2 className="text-h2 mb-1">{meta.title}</h2>
            {meta.blurb ? <p className="mb-4 text-body text-brand-ink-700">{meta.blurb}</p> : null}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((p) => (
                <FoodCard key={p.urlPath} page={p} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

/** Category hub page body (Phase 2 §2.2): overview + food grid + related modules. */
export function CategoryHubContent({ hub }: { hub: ContentPage }) {
  const foods = getChildren(hub.urlPath).filter((p) => p.template === "shelfLife");
  const meta = CATEGORY_META[hub.category ?? ""] ?? { title: hub.title, blurb: "" };
  return (
    <section className="my-10" aria-label="Foods in this category">
      <h2 className="text-h2 mb-1">{meta.title}</h2>
      {meta.blurb ? <p className="mb-5 text-body text-brand-ink-700">{meta.blurb}</p> : null}
      {foods.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {foods.map((f) => (
            <FoodCard key={f.urlPath} page={f} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

/** Cross-pillar method module shown on hubs: fridge/freezer method links that apply. */
export function MethodLinksModule({ hub }: { hub: ContentPage }) {
  const links = [
    { href: "/storage-methods/refrigerator/how-to-store-food-in-the-refrigerator/", label: "How to store food in the refrigerator", icon: <IconFridge className="h-5 w-5" aria-hidden="true" /> },
    { href: "/storage-methods/freezing/how-to-freeze-meat/", label: "How to freeze meat", icon: <IconSnowflake className="h-5 w-5" aria-hidden="true" /> },
    { href: "/storage-methods/dry-goods/how-to-store-dry-goods/", label: "How to store dry goods", icon: <IconPantry className="h-5 w-5" aria-hidden="true" /> },
  ];
  void hub;
  return (
    <section className="my-10" aria-labelledby="storage-methods-heading">
      <h2 id="storage-methods-heading" className="text-h2 mb-4">
        Storage methods that apply here
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="card card--hover flex items-center gap-3 no-underline hover:no-underline">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-brand-green-100 text-brand-green-700" aria-hidden="true">
              {l.icon}
            </span>
            <span className="text-small font-semibold leading-snug">{l.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/** Sibling hubs module (Phase 2 §2.2 #9). */
export function SiblingHubs({ current }: { current: ContentPage }) {
  const shelfLifeHubs = ["dairy", "meat", "produce", "pantry", "freezer"];
  const items = shelfLifeHubs
    .filter((cat) => cat !== current.category)
    .map((cat) => getPage(`/shelf-life/${cat}/`))
    .filter((p): p is ContentPage => Boolean(p));
  if (!items.length) return null;
  return (
    <section className="my-10" aria-labelledby="sibling-heading">
      <h2 id="sibling-heading" className="text-h2 mb-4">
        Other shelf life categories
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <CategoryCard
            key={p.urlPath}
            href={p.urlPath}
            title={p.title}
            promise={p.metaDescription ?? ""}
            description={CATEGORY_META[p.category ?? ""]?.blurb ?? ""}
            icon={<IconPantry className="h-5 w-5" aria-hidden="true" />}
          />
        ))}
      </div>
    </section>
  );
}
