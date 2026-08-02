import Image from "next/image";
import type { ContentPage } from "@/lib/types";

function badgeText(page: ContentPage): string {
  const sl = page.shelfLife;
  if (!sl) return "";
  if (sl.fridge && sl.freezer && sl.pantry) return `Fridge ${sl.fridge}`;
  if (sl.fridge) return `Fridge ${sl.fridge}`;
  if (sl.pantry) return `Pantry ${sl.pantry}`;
  return "";
}

/** Food card (Phase 2 §4.3) — optional image, name, exact-duration micro-badge, link to spoke. */
export function FoodCard({ page, image }: { page: ContentPage; image?: string }) {
  const badge = badgeText(page);
  return (
    <a href={page.urlPath} className="card card--hover flex flex-col gap-2 no-underline hover:no-underline">
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 373px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-brand-green-100/60 text-brand-green-700" aria-hidden="true">
          <span className="font-display text-h4 font-bold">{page.foodName ?? page.title}</span>
        </div>
      )}
      <h3 className="text-body font-semibold leading-snug">
        <span className="hover:underline">{page.title}</span>
      </h3>
      {badge ? (
        <span className="badge badge--verified w-fit">{badge}</span>
      ) : (
        <span className="badge badge--ink w-fit">Storage guide</span>
      )}
    </a>
  );
}
