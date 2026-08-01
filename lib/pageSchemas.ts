import { getBreadcrumb } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema, articleSchema, faqPageSchema, collectionPageSchema, itemListSchema } from "@/lib/schema";
import type { ContentPage } from "@/lib/types";

export function authorName(page: ContentPage): string {
  return page.author === "rebecca-torres" ? "Rebecca Torres, RD" : "James Okafor";
}

export function pageSchemas(page: ContentPage) {
  const trail = getBreadcrumb(page);
  const schemas = [
    breadcrumbSchema(trail),
    articleSchema(page, authorName(page), page.reviewer),
  ];
  const faq = faqPageSchema(page.faq);
  if (faq) schemas.push(faq);
  return schemas;
}

export function listSchemas(page: ContentPage, items: { name: string; url: string }[]) {
  return [breadcrumbSchema(getBreadcrumb(page)), collectionPageSchema(page, items), itemListSchema(items)];
}

/** Structured data for legal/reference pages (privacy, terms, disclaimer). */
export function legalSchemas(page: ContentPage) {
  const trail = getBreadcrumb(page);
  return [
    breadcrumbSchema(trail),
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      url: new URL(page.urlPath, site.url).toString(),
      dateModified: page.updatedDate ?? page.reviewedDate,
      inLanguage: "en-US",
      isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    },
  ];
}
