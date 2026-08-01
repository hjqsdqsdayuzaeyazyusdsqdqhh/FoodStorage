import { registry } from "@/lib/content";
import { site } from "@/lib/site";

export interface SearchEntry {
  title: string;
  urlPath: string;
  excerpt: string;
  template: string;
}

export interface SearchIndex {
  siteUrl: string;
  entries: SearchEntry[];
}

/** Serializable search index built at build time (passed to client components). */
export function buildSearchIndex(): SearchIndex {
  const entries = registry
    .all()
    .filter((p) => p.template !== "search")
    .map((p) => ({
      title: p.title,
      urlPath: p.urlPath,
      excerpt: p.snippetAnswer ?? p.metaDescription ?? "",
      template: p.template,
    }));
  return { siteUrl: site.url, entries };
}

export function searchIndex(): SearchIndex {
  return buildSearchIndex();
}
