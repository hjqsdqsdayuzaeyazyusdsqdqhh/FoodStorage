import type { Metadata } from "next";
import { getPageOrThrow } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";

export const metadata: Metadata = buildPageMetadata(getPageOrThrow("/about/"));

export default function AboutPage() {
  const page = getPageOrThrow("/about/");
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout page={page} />
    </>
  );
}
