import type { Metadata } from "next";
import { getPageOrThrow, getGuidePages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";

export function generateStaticParams() {
  return getGuidePages()
    .filter((p) => p.template === "pantryGuide")
    .map((page) => {
      const [, , slug] = page.urlPath.split("/");
      return { slug };
    });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildPageMetadata(getPageOrThrow(`/pantry-organization/${slug}/`));
}

export default async function PantryGuide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageOrThrow(`/pantry-organization/${slug}/`);
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout page={page} />
    </>
  );
}
