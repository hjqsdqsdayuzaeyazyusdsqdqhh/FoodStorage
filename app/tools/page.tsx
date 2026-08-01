import type { Metadata } from "next";
import { getPageOrThrow, getShelfLifePages, getGuidePages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";
import { FoodCard } from "@/components/FoodCard";

export const metadata: Metadata = buildPageMetadata(getPageOrThrow("/tools/"));

export default function ToolsHub() {
  const page = getPageOrThrow("/tools/");
  const guides = getGuidePages().slice(0, 6);
  const foods = getShelfLifePages().slice(0, 6);
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout
        page={page}
        extraContent={
          <>
            <section className="my-10" aria-labelledby="tools-guides-heading">
              <h2 id="tools-guides-heading" className="text-h2 mb-1">
                Guides that work like tools
              </h2>
              <p className="mb-5 text-body text-brand-ink-700">
                Until the interactive calculators launch, these step-by-step guides and printable checklists give you the
                same answers — exact numbers, ready to use.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((g) => (
                  <FoodCard key={g.urlPath} page={g} />
                ))}
              </div>
            </section>
            <section className="my-10" aria-labelledby="tools-foods-heading">
              <h2 id="tools-foods-heading" className="text-h2 mb-1">
                Look up a shelf life
              </h2>
              <p className="mb-5 text-body text-brand-ink-700">
                Every food page includes the full storage table — pantry, fridge, and freezer.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {foods.map((f) => (
                  <FoodCard key={f.urlPath} page={f} />
                ))}
              </div>
            </section>
          </>
        }
      />
    </>
  );
}
