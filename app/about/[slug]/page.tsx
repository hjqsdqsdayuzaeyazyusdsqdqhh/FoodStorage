import type { Metadata } from "next";
import { getPageOrThrow } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";

const EDITORIAL_SLUGS = ["editorial-policy", "how-we-test", "corrections"];

export function generateStaticParams() {
  return EDITORIAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildPageMetadata(getPageOrThrow(`/about/${slug}/`));
}

export default async function EditorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageOrThrow(`/about/${slug}/`);
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout page={page} />
    </>
  );
}
