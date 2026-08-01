import type { ContentPage } from "@/lib/types";
import { getPageImages, isOptimized } from "@/lib/images";
import { ResponsiveImage } from "@/components/ResponsiveImage";

/**
 * Hero image slot — renders immediately below the H1 when an optimized
 * hero exists for the page. Null-safe: no manifest entry, no image.
 */
export function ArticleHeroImage({ page }: { page: ContentPage }) {
  const hero = getPageImages(page.urlPath)?.assets.hero;
  if (!isOptimized(hero)) return null;
  return <ResponsiveImage asset={hero} priority className="mt-5 first:mt-0" />;
}

/**
 * Supporting image slot — renders after the body content (after the storage
 * table on shelf-life pages, after the how-to steps on guides). Lazy-loaded.
 */
export function ArticleSupportImage({ page }: { page: ContentPage }) {
  const support = getPageImages(page.urlPath)?.assets.support;
  if (!isOptimized(support)) return null;
  return <ResponsiveImage asset={support} className="mb-4" />;
}
