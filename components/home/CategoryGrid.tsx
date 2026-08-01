import { getFoodsByCategory, getShelfLifePages } from "@/lib/content";
import { IconArrowRight } from "@/components/icons";
import { Section, SectionHeading } from "./Section";

const CATEGORIES = [
  { cat: "dairy", icon: "🥛", name: "Dairy", blurb: "Milk, cheese, butter, yogurt & eggs — exact fridge and freezer lives." },
  { cat: "meat", icon: "🥩", name: "Meat", blurb: "Chicken, beef, salmon & steak — plus the food-safety rules that matter." },
  { cat: "produce", icon: "🍎", name: "Produce", blurb: "Fruit and vegetables — counter, fridge, and freezer shelf lives." },
  { cat: "pantry", icon: "🥫", name: "Pantry", blurb: "Rice, flour, pasta, bread, coffee & canned goods." },
  { cat: "freezer", icon: "❄️", name: "Frozen", blurb: "Freezer-safe times and how to prevent freezer burn." },
];

export function CategoryGrid() {
  const freezerFoods = getShelfLifePages().filter((f) => f.shelfLife?.freezer && f.shelfLife.freezer !== "—").length;

  return (
    <Section id="categories" tone="white">
      <SectionHeading
        kicker="Browse by category"
        title="Browse by food category"
        subtitle="Every shelf life on the site is exact, cited, and reviewed. Pick a category and get the numbers."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c) => {
          const count =
            c.cat === "freezer" ? `${freezerFoods} foods` : `${getFoodsByCategory(c.cat).length} guides`;
          return (
            <a
              key={c.cat}
              href={`/shelf-life/${c.cat}/`}
              className="card card--lift group flex flex-col gap-3 no-underline hover:no-underline"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-card bg-brand-green-100 text-2xl"
                aria-hidden="true"
              >
                {c.icon}
              </span>
              <span className="text-h4 font-semibold text-brand-ink-900">{c.name}</span>
              <span className="text-small text-brand-ink-700">{c.blurb}</span>
              <span className="mt-auto flex items-center justify-between pt-1">
                <span className="badge badge--ink">{count}</span>
                <span className="flex items-center gap-1 text-small font-semibold text-brand-green-700">
                  Explore
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
