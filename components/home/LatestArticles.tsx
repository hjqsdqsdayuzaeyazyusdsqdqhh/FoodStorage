import { getLatestArticles } from "@/lib/content";
import { FoodCard } from "@/components/FoodCard";
import { Section, SectionHeading } from "./Section";

const LATEST_IMAGES: Record<string, string> = {
  "/storage-methods/food-safety/food-safety-temperature-guide/": "/images/home/food-safety-temperature-guide.webp",
  "/storage-methods/refrigerator/how-to-store-food-in-the-refrigerator/": "/images/home/how-to-store-food-in-the-refrigerator.webp",
  "/storage-methods/freezing/how-to-freeze-meat/": "/images/home/how-to-freeze-meat.webp",
  "/storage-methods/freezing/how-to-freeze-leftovers/": "/images/home/how-to-freeze-leftovers.webp",
};

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
          <FoodCard key={p.urlPath} page={p} image={LATEST_IMAGES[p.urlPath]} />
        ))}
      </div>
    </Section>
  );
}
