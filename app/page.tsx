import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getTopFoods } from "@/lib/content";
import { itemListSchema } from "@/lib/schema";
import { DataTable } from "@/components/DataTable";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { IconArrowRight } from "@/components/icons";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { PopularGuides } from "@/components/home/PopularGuides";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { Expertise } from "@/components/home/Expertise";
import { SafetyTips } from "@/components/home/SafetyTips";
import { LatestArticles } from "@/components/home/LatestArticles";
import { StartHere } from "@/components/home/StartHere";
import { Section } from "@/components/home/Section";

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

      {/* 1. HERO */}
      <Hero />

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. BROWSE BY FOOD CATEGORY */}
      <CategoryGrid />

      {/* 4. MOST POPULAR GUIDES */}
      <PopularGuides />

      {/* 5. QUICK ANSWERS + FEATURED SHELF-LIFE TABLE */}
      <Section id="table" tone="white">
        <div className="card card--lift mb-10 bg-brand-paper-soft">
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
      </Section>

      {/* 6. FEATURED TOOLS */}
      <FeaturedTools />

      {/* 7. EXPERTISE / EEAT */}
      <Expertise />

      {/* 8. FOOD SAFETY TIPS */}
      <SafetyTips />

      {/* 9. LATEST ARTICLES */}
      <LatestArticles />

      {/* 10. START HERE */}
      <StartHere />

      {/* 11. NEWSLETTER */}
      <div className="bg-brand-paper-soft">
        <div className="container-site py-12 lg:py-16">
          <div className="mx-auto max-w-2xl">
            <NewsletterBlock />
          </div>
        </div>
      </div>
    </>
  );
}
