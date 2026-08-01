import type { MetadataRoute } from "next";
import { registry } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function pageDate(p: { fileMtime?: string; updatedDate?: string; reviewedDate?: string }): Date | string {
  return p.fileMtime ?? p.updatedDate ?? p.reviewedDate ?? "2026-01-01";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = registry.all().filter((p) => p.template !== "search");
  const latest = pages.reduce((max, p) => {
    const t = p.fileMtime ? new Date(p.fileMtime).getTime() : 0;
    return t > max ? t : max;
  }, 0);
  const entries: MetadataRoute.Sitemap = [
    {
      url: new URL("/", site.url).toString(),
      lastModified: latest ? new Date(latest) : new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
  for (const p of pages) {
    entries.push({
      url: new URL(p.urlPath, site.url).toString(),
      lastModified: pageDate(p),
      changeFrequency: "monthly",
      priority: p.template === "pillar" ? 1 : p.template === "category" ? 0.8 : 0.6,
    });
  }
  return entries;
}
