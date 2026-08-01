import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site, pillars } from "@/lib/site";
import { getTopFoods } from "@/lib/content";
import { itemListSchema } from "@/lib/schema";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { DataTable } from "@/components/DataTable";
import { CtaBand } from "@/components/CtaBand";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { Badge } from "@/components/Badge";
import {
  IconClock,
  IconSnowflake,
  IconPantry,
  IconFridge,
  IconCalculator,
  IconShield,
  IconArrowRight,
} from "@/components/icons";

export const metadata: Metadata = buildMetadata({
  title: "Home Storage Guide",
  description: site.description,
  path: "/",
});

const quickLinks = [
  { label: "How long does milk last?", href: "/shelf-life/dairy/how-long-does-milk-last" },
  { label: "How long does cooked rice last?", href: "/shelf-life/pantry/how-long-does-cooked-rice-last" },
  { label: "Can you freeze eggs?", href: "/shelf-life/dairy/how-long-does-eggs-last" },
  { label: "Does canned food expire?", href: "/shelf-life/pantry/how-long-does-canned-food-last" },
  { label: "How to freeze meat", href: "/storage-methods/freezing/how-to-freeze-meat" },
  { label: "Best pantry containers", href: "/pantry-organization/pantry-container-guide" },
];

export default function HomePage() {
  const topFoods = getTopFoods(10);
  const topAnswers = getTopFoods(5);

  const featuredTable = {
    caption: "How long the 10 most-asked foods last, from our shelf-life chart.",
    columns: ["Food", "Pantry", "Fridge", "Freezer"],
    rows: topFoods.map((f) => [
      `<a href="${f.urlPath}" class="no-underline hover:underline font-medium">${f.foodName ?? f.title}</a>`,
      f.shelfLife?.pantry ?? "—",
      f.shelfLife?.fridge ?? "—",
      f.shelfLife?.freezer ?? "—",
    ]),
  };

  const jsonLd = [itemListSchema(topAnswers.map((f) => ({ name: f.title, url: `${site.url}${f.urlPath}` })))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 2. HERO */}
      <section className="bg-brand-green-700 text-brand-paper">
        <div className="container-site py-14 sm:py-20">
          <span className="badge badge--verified">300+ foods, exact shelf lives</span>
          <h1 className="mt-4 max-w-3xl text-display font-extrabold leading-tight text-brand-paper">
            How long does your food really last?
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-brand-green-100">
            Not “best by” guesses. Exact shelf-life answers for 300+ foods — how to store them, how long they last, and
            how to tell when they are actually bad.
          </p>
          <div className="mt-6 max-w-xl">
            <SearchBar big placeholder="Try 'how long does milk last'" />
          </div>
        </div>
      </section>

      {/* 3. PILLAR CARDS */}
      <section className="container-site section-pad">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <CategoryCard
              key={p.href}
              href={p.href}
              title={p.title}
              promise={p.promise}
              description={p.description}
              icon={
                p.href === "/shelf-life/" ? (
                  <IconClock />
                ) : p.href === "/storage-methods/" ? (
                  <IconSnowflake />
                ) : (
                  <IconPantry />
                )
              }
            />
          ))}
        </div>
      </section>

      {/* 4. SEARCH-INTENT QUICK LINKS */}
      <section className="container-site pb-4">
        <div className="card bg-brand-paper-soft">
          <p className="font-display text-h4 font-semibold">Most-asked questions, answered</p>
          <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="flex items-center gap-1.5 text-body font-medium no-underline hover:underline">
                  {l.label}
                  <IconArrowRight className="h-4 w-4 shrink-0 text-brand-green-600" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. FEATURED SHELF-LIFE TABLE */}
      <section className="container-site section-pad">
        <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-h2">The most-asked shelf lives</h2>
            <p className="mt-1 text-body text-brand-ink-700">
              Every number below is cited to USDA, FDA, or CDC guidance.
            </p>
          </div>
          <a href="/shelf-life/" className="btn btn--ghost">
            See the full chart
            <IconArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <DataTable data={featuredTable} />
      </section>

      {/* 6. TOOLS STRIP */}
      <section className="container-site section-pad pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              icon: <IconCalculator className="h-6 w-6" aria-hidden="true" />,
              title: "Tools & calculators",
              body: "Shelf-life calculators, storage finders, and printable checklists.",
              href: "/tools/",
            },
            {
              icon: <IconFridge className="h-6 w-6" aria-hidden="true" />,
              title: "Storage methods",
              body: "Freeze, vacuum-seal, can, and store dry goods the safe way.",
              href: "/storage-methods/",
            },
            {
              icon: <IconSnowflake className="h-6 w-6" aria-hidden="true" />,
              title: "Frozen food shelf life",
              body: "Freezer-safe durations and how to prevent freezer burn.",
              href: "/shelf-life/freezer/",
            },
          ].map((t) => (
            <a key={t.href} href={t.href} className="card card--hover flex items-start gap-4 no-underline hover:no-underline">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-brand-green-100 text-brand-green-700" aria-hidden="true">
                {t.icon}
              </span>
              <span>
                <span className="font-display text-h4 font-semibold text-brand-ink-900">{t.title}</span>
                <span className="mt-1 block text-small text-brand-ink-700">{t.body}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 7. AUTHORITY / EEAT STRIP */}
      <section className="container-site section-pad pt-0">
        <div className="card border-brand-line bg-brand-paper-soft">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green-600 text-brand-paper" aria-hidden="true">
              <IconShield className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h2 className="text-h4 font-semibold">Every number checked, by humans</h2>
              <p className="mt-1 text-body text-brand-ink-700">
                Shelf-life and temperature claims are cited to USDA, FDA, CDC, and university extensions. Each article
                lists its author and the credentialed reviewer who checked it, with the review date.
              </p>
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-small">
                <a href="/about/how-we-test/" className="font-medium no-underline hover:underline">
                  How we test
                </a>
                <a href="/about/editorial-policy/" className="font-medium no-underline hover:underline">
                  Editorial policy
                </a>
                <a href="/about/corrections/" className="font-medium no-underline hover:underline">
                  Corrections
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STORY / EMOTION BLOCK */}
      <section className="container-site section-pad pt-0">
        <div className="card overflow-hidden border-brand-green-600/30 bg-brand-green-100/40">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <Badge tone="kicker">A real pantry save</Badge>
              <h2 className="mt-2 text-h2">The jar you forgot at the back of the shelf</h2>
              <p className="mt-2 text-body text-brand-ink-700">
                Every pantry has one: the rice pushed behind the lentils, the canned tomatoes bought “just in case.”
                Two years later it is still fine — but you already bought a new bag. The average household throws away
                hundreds of dollars a year of food that was perfectly safe, simply because nobody could tell how long it
                actually lasts. Our rotation system fixes that.
              </p>
              <a href="/pantry-organization/" className="btn btn--primary mt-4">
                Build a pantry that uses itself
                <IconArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER */}
      <section className="container-site section-pad pt-0">
        <div className="max-w-2xl">
          <NewsletterBlock />
        </div>
      </section>
    </>
  );
}
