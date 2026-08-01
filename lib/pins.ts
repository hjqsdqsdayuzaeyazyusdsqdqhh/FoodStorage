/** Infrastructure for Pinterest pin images (Phase 2 §5 / Phase 3 §6.5). */

/** Canonical on-site path for a content page's Pinterest pin image (1000×1500). */
export function pinPath(urlPath: string): string {
  const key = urlPath.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
  return `/pins/${key}.png`;
}

/** URL of the pin image, usable by pages, Open Graph, and Pinterest verification. */
export function pinUrl(urlPath: string): string {
  return pinPath(urlPath);
}
