import { getLatestArticles } from "@/lib/content";
import { FoodCard } from "@/components/FoodCard";
import { Section, SectionHeading } from "./Section";

export function LatestArticles() {
  const latest = getLatestArticles(6);
  if (!latest.length) return null;
  return (
    <Section id="latest" tone="soft">
      <SectionHeading
        kicker="Fresh from the kitchen"
        title="Latest food storage guides"
        subtitle="The newest shelf-life answers and storage guides, written and reviewed by our editorial team."
        href="/storage-methods/"
        linkLabel="Browse storage methods"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((p) => (
          <FoodCard key={p.urlPath} page={p} />
        ))}
      </div>
    </Section>
  );
}
