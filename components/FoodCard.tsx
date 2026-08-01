import type { ContentPage } from "@/lib/types";

function badgeText(page: ContentPage): string {
  const sl = page.shelfLife;
  if (!sl) return "";
  if (sl.fridge && sl.freezer && sl.pantry) return `Fridge ${sl.fridge}`;
  if (sl.fridge) return `Fridge ${sl.fridge}`;
  if (sl.pantry) return `Pantry ${sl.pantry}`;
  return "";
}

/** Food card (Phase 2 §4.3) — photo, name, exact-duration micro-badge, link to spoke. */
export function FoodCard({ page }: { page: ContentPage }) {
  const badge = badgeText(page);
  return (
    <a href={page.urlPath} className="card card--hover flex flex-col gap-2 no-underline hover:no-underline">
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-brand-green-100/60 text-brand-green-700" aria-hidden="true">
        <span className="font-display text-h4 font-bold">{page.foodName ?? page.title}</span>
      </div>
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
