import Image from "next/image";
import type { ContentPage } from "@/lib/types";
import { getPageOrThrow, readingMinutes } from "@/lib/content";
import { pinUrl } from "@/lib/pins";
import { IconArrowRight, IconClock } from "@/components/icons";
import { Section, SectionHeading } from "./Section";

const POPULAR = [
  { path: "/shelf-life/dairy/how-long-does-milk-last", image: "/images/home/milk.webp" },
  { path: "/shelf-life/dairy/how-long-does-eggs-last", image: "/images/home/eggs.webp" },
  { path: "/shelf-life/pantry/how-long-does-bread-last", image: "/images/home/bread.webp" },
  { path: "/shelf-life/pantry/how-long-does-rice-last", image: "/images/home/rice.webp" },
  { path: "/pantry-organization/pantry-container-guide", image: "/images/home/pantry-containers.webp" },
  { path: "/storage-methods/freezing/how-to-freeze-meat", image: "/images/home/freeze-meat.webp" },
];

const CATEGORY_LABEL: Record<string, string> = {
  dairy: "Dairy & eggs",
  meat: "Meat & seafood",
  produce: "Produce",
  pantry: "Pantry staples",
  freezing: "Freezing",
};

function categoryLabel(page: ContentPage): string {
  if (page.method === "containers") return "Pantry organization";
  if (page.category && CATEGORY_LABEL[page.category]) return CATEGORY_LABEL[page.category];
  return page.method ? page.method.replace(/-/g, " ") : "Storage guide";
}

export function PopularGuides() {
  const guides = POPULAR.map((g) => ({ ...g, page: getPageOrThrow(g.path) }));

  return (
    <Section id="popular" tone="soft">
      <SectionHeading
        kicker="Reader favorites"
        title="Most popular food storage guides"
        subtitle="The questions people search for most — answered with exact numbers and the source to back them up."
        href="/shelf-life/"
        linkLabel="All shelf-life guides"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map(({ page, image }) => (
          <a
            key={page.urlPath}
            href={page.urlPath}
            data-pin-media={pinUrl(page.urlPath)}
            className="card card--lift group flex flex-col gap-3 no-underline hover:no-underline"
          >
            <span className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-brand-line">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1024px) 373px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </span>
            <span className="text-micro font-semibold uppercase tracking-wide text-brand-green-700">
              {categoryLabel(page)}
            </span>
            <span className="text-h4 font-semibold leading-snug text-brand-ink-900">
              <span className="group-hover:underline">{page.title}</span>
            </span>
            <span className="mt-auto flex items-center justify-between pt-1">
              <span className="flex items-center gap-1.5 text-small text-brand-ink-500">
                <IconClock className="h-4 w-4" aria-hidden="true" />
                {readingMinutes(page)} min read
              </span>
              <IconArrowRight className="h-4 w-4 text-brand-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-green-600" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
