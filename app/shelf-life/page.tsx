import type { Metadata } from "next";
import { getPageOrThrow, getShelfLifePages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ArticleLayout } from "@/components/ArticleLayout";
import { JsonLd } from "@/components/JsonLd";
import { pageSchemas } from "@/lib/pageSchemas";
import { ShelfLifeMasterTable, SubcategoryBlocks, MethodLinksModule } from "@/components/PillarSections";

export const metadata: Metadata = buildPageMetadata(getPageOrThrow("/shelf-life/"));

export default function ShelfLifePillar() {
  const page = getPageOrThrow("/shelf-life/");
  const foods = getShelfLifePages();
  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <ArticleLayout
        page={page}
        extraContent={
          <>
            <ShelfLifeMasterTable foods={foods} />
            <SubcategoryBlocks hub={page} />
            <MethodLinksModule hub={page} />
          </>
        }
      />
    </>
  );
}
