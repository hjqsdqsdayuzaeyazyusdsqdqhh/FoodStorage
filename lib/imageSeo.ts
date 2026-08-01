import fs from "node:fs";
import path from "node:path";

/** Phase 2 enriched manifest — one SEO record per image per page. */

export interface ImageExif {
  title: string;
  description: string;
  keywords: string[];
}

export interface ImageRecord {
  filename: string;
  title: string;
  alt: string;
  caption: string | null;
  description: string;
  width: number;
  height: number;
  format: "avif" | "webp" | "jpg";
  priority: boolean;
  loading: "eager" | "lazy";
  fetchPriority: "high" | "auto";
  decoding: string;
  sizes: string | null;
  breakpoints: number[] | null;
  srcset: string[] | null;
  exif: ImageExif;
  keywords: string[];
  pinterest?: { title: string; description: string };
  structuredData: Record<string, unknown>;
  src: string;
  quality: { status: string; machineChecks: string[] };
}

export interface PageSeo {
  pageTitle: string;
  pageH1: string;
  canonical: string;
  subject: string;
  keywordKey: string;
  keywords: string[];
  heroImage: ImageRecord | null;
  supportImage: ImageRecord | null;
  pinterestImage: ImageRecord | null;
  ogImage: ImageRecord | null;
  portraitImage: ImageRecord | null;
  structuredData: Record<string, unknown>[];
}

const MANIFEST_PATH = path.join(process.cwd(), "public", "images", "manifest.seo.json");

let cache: Record<string, PageSeo> | null = null;

function loadSeoManifest(): Record<string, PageSeo> {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as Record<string, PageSeo>;
  } catch {
    cache = {};
  }
  return cache;
}

/** Phase 2 SEO record for a page urlPath. Undefined when the manifest is absent. */
export function getImageSeo(urlPath: string): PageSeo | undefined {
  return loadSeoManifest()[urlPath];
}
