import type { Metadata } from "next";
import { getPageOrThrow } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";
import { SubcategoryBlocks } from "@/components/PillarSections";

export const metadata: Metadata = buildPageMetadata(getPageOrThrow("/pantry-organization/"));

export default function PantryPillar() {
  const page = getPageOrThrow("/pantry-organization/");
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout page={page} extraContent={<SubcategoryBlocks hub={page} />} />
    </>
  );
}
