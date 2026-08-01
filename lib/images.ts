import fs from "node:fs";
import path from "node:path";

/** One responsive output width of an on-page image (AVIF + WebP + JPEG). */
export interface ImageVariant {
  width: number;
  avif: string;
  webp: string;
  jpg: string;
}

export type ImageKind = "hero" | "support" | "pin" | "og" | "portrait";

export interface ImageAsset {
  kind: ImageKind;
  variant: string;
  page: string;
  key: string;
  file: string;
  subject?: string;
  scene?: string;
  prompt?: string;
  alt: string;
  caption?: string;
  placement: string;
  width: number;
  height: number;
  sizes: string | null;
  widths: number[] | null;
  basePath: string;
  source: string;
  variants: ImageVariant[] | null;
}

export interface PageImageSet {
  key: string;
  assets: Partial<Record<ImageKind, ImageAsset>>;
}

const MANIFEST_PATH = path.join(process.cwd(), "public", "images", "manifest.json");

let cache: Record<string, PageImageSet> | null = null;

function loadManifest(): Record<string, PageImageSet> {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as Record<string, PageImageSet>;
  } catch {
    cache = {};
  }
  return cache;
}

/** Image set for a page urlPath (hero/support/pin/og/portrait). Undefined when absent. */
export function getPageImages(urlPath: string): PageImageSet | undefined {
  return loadManifest()[urlPath];
}

/** True when the asset has been optimized (files exist on disk + variants recorded). */
export function isOptimized(asset: ImageAsset | undefined): asset is ImageAsset {
  return !!asset && !!asset.variants && asset.variants.length > 0;
}
