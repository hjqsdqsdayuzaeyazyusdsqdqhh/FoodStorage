import type { ImageAsset, ImageVariant } from "@/lib/images";

function srcSet(variants: ImageVariant[], format: "avif" | "webp" | "jpg"): string {
  return variants.map((v) => `${v[format]} ${v.width}w`).join(", ");
}

/**
 * Responsive <picture> image — AVIF → WebP → JPEG with srcset/sizes.
 * Width/height are always set (no CLS). Lazy by default; heroes pass priority.
 * Renders nothing when the asset has no optimized variants.
 */
export function ResponsiveImage({
  asset,
  className = "",
  priority = false,
}: {
  asset: ImageAsset;
  className?: string;
  priority?: boolean;
}) {
  if (!asset.variants || asset.variants.length === 0) return null;
  const variants = [...asset.variants].sort((a, b) => a.width - b.width);
  const sizes = asset.sizes ?? "(min-width: 1024px) 704px, 100vw";

  return (
    <figure className={`my-6 ${className}`}>
      <picture>
        <source type="image/avif" srcSet={srcSet(variants, "avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet(variants, "webp")} sizes={sizes} />
        <img
          src={variants[variants.length - 1].jpg}
          srcSet={srcSet(variants, "jpg")}
          sizes={sizes}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={`h-auto w-full rounded-card ${className}`}
        />
      </picture>
      {asset.caption ? (
        <figcaption className="mt-2 text-center text-small text-brand-ink-500">{asset.caption}</figcaption>
      ) : null}
    </figure>
  );
}
