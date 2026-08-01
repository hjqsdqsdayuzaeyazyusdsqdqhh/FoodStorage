import type { Metadata } from "next";
import { getPageOrThrow, getGuidePages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";
import { howToSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getGuidePages()
    .filter((p) => p.template === "guide")
    .map((page) => {
      const [, , , slug] = page.urlPath.split("/");
      const category = page.method ?? page.category ?? "refrigerator";
      return { category, slug };
    });
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return buildPageMetadata(getPageOrThrow(`/storage-methods/${category}/${slug}/`));
}

export default async function StorageGuide({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const page = getPageOrThrow(`/storage-methods/${category}/${slug}/`);
  const schemas = pageSchemas(page);
  if (page.howToSteps.length) {
    schemas.push(howToSchema(page.h1, page.howToSteps, page.urlPath));
  }
  return (
    <>
      <JsonLd data={schemas} />
      <ArticleLayout page={page} />
    </>
  );
}
