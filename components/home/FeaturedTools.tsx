import { IconArrowRight, IconClock, IconShield, IconPantry, IconSnowflake } from "@/components/icons";
import { Section, SectionHeading } from "./Section";

const TOOLS = [
  {
    href: "/shelf-life/",
    icon: <IconClock className="h-6 w-6" aria-hidden="true" />,
    title: "Shelf Life Chart",
    body: "Look up any food — pantry, fridge, and freezer times in one table.",
    cta: "Open the chart",
  },
  {
    href: "/storage-methods/food-safety/food-safety-temperature-guide/",
    icon: <IconShield className="h-6 w-6" aria-hidden="true" />,
    title: "Food Safety Temperature Guide",
    body: "Safe minimum cooking temps, the danger zone, and fridge settings.",
    cta: "See the temperatures",
  },
  {
    href: "/pantry-organization/pantry-inventory-checklist/",
    icon: <IconPantry className="h-6 w-6" aria-hidden="true" />,
    title: "Pantry Inventory Checklist",
    body: "A printable checklist that tracks what you have and what's expiring.",
    cta: "Print the checklist",
  },
  {
    href: "/shelf-life/freezer/",
    icon: <IconSnowflake className="h-6 w-6" aria-hidden="true" />,
    title: "Freezer Storage Guide",
    body: "Freezer-safe durations and how to prevent freezer burn.",
    cta: "Freezer times",
  },
];

export function FeaturedTools() {
  return (
    <Section id="tools" tone="green">
      <SectionHeading
        kicker="Tools that do the work"
        title="Featured food storage tools"
        subtitle="Free, printable, and built on the same USDA-, FDA-, and CDC-referenced numbers as every guide."
        href="/tools/"
        linkLabel="All tools"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t) => (
          <a key={t.href} href={t.href} className="card card--lift group flex flex-col gap-3 no-underline hover:no-underline">
            <span className="flex h-12 w-12 items-center justify-center rounded-card bg-brand-green-600 text-brand-paper" aria-hidden="true">
              {t.icon}
            </span>
            <span className="text-h4 font-semibold leading-snug text-brand-ink-900">{t.title}</span>
            <span className="text-small text-brand-ink-700">{t.body}</span>
            <span className="mt-auto flex items-center gap-1 pt-1 text-small font-semibold text-brand-green-700">
              {t.cta}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
