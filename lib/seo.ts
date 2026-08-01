import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { ContentPage } from "@/lib/types";

function abs(path: string): string {
  if (path.startsWith("http")) return path;
  return new URL(path, site.url).toString();
}

const ogImage = { url: "/og.png", width: 1200, height: 630, alt: "Home Storage Guide — exact shelf lives for 300+ foods" };

/** Build the Next.js Metadata object for a content page. */
export function buildPageMetadata(page: ContentPage, opts?: { noindex?: boolean }): Metadata {
  const title = `${page.title} — ${site.defaultTitleSuffix}`;
  const description =
    page.metaDescription ||
    page.snippetAnswer ||
    `${page.h1} — exact storage times and food-safety guidance from Home Storage Guide.`;
  const canonical = abs(page.urlPath);
  return {
    title: {
      absolute: title,
    },
    description,
    applicationName: site.name,
    authors: page.author ? [{ name: page.author }] : undefined,
    keywords: page.lsi,
    alternates: { canonical },
    openGraph: {
      title: page.h1,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.h1,
      description,
      images: [ogImage.url],
    },
    robots: opts?.noindex ? { index: false, follow: false } : undefined,
  };
}

export function buildMetadata(args: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  keywords?: string[];
}): Metadata {
  const canonical = abs(args.path);
  const title =
    args.title === site.name || args.title.endsWith(`— ${site.defaultTitleSuffix}`)
      ? args.title
      : `${args.title} — ${site.defaultTitleSuffix}`;
  return {
    title: { absolute: title },
    description: args.description,
    alternates: { canonical },
    keywords: args.keywords,
    openGraph: {
      title: args.title,
      description: args.description,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: args.title, description: args.description, images: [ogImage.url] },
    robots: args.noindex ? { index: false, follow: false } : undefined,
  };
}
