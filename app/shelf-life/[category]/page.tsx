import type { Metadata } from "next";
import { getPageOrThrow } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";
import { CategoryHubContent, MethodLinksModule, SiblingHubs } from "@/components/PillarSections";

export const SHELF_LIFE_CATEGORIES = ["dairy", "meat", "produce", "pantry", "freezer"];

export function generateStaticParams() {
  return SHELF_LIFE_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return buildPageMetadata(getPageOrThrow(`/shelf-life/${category}/`));
}

export default async function ShelfLifeCategory({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const page = getPageOrThrow(`/shelf-life/${category}/`);
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout
        page={page}
        extraContent={
          <>
            <CategoryHubContent hub={page} />
            <MethodLinksModule hub={page} />
            <SiblingHubs current={page} />
          </>
        }
      />
    </>
  );
}
