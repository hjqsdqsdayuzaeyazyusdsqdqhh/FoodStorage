import type { Metadata } from "next";
import { getPageOrThrow, getShelfLifePages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";

export function generateStaticParams() {
  return getShelfLifePages().map((page) => {
    const [, , category, slug] = page.urlPath.split("/");
    return { category, slug };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return buildPageMetadata(getPageOrThrow(`/shelf-life/${category}/${slug}/`));
}

export default async function ShelfLifePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const page = getPageOrThrow(`/shelf-life/${category}/${slug}/`);
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout page={page} />
    </>
  );
}
