import type { FaqItem } from "@/lib/types";

/** FAQ block (Phase 2 §4.15 / §6.3) — native <details> for progressive enhancement. */
export function FaqBlock({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section className="my-10">
      <h2 className="text-h2 mb-4">Frequently asked questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details key={i} className="card group" open={false}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-body font-semibold text-brand-ink-900">
              <span className="font-display font-semibold">{item.q}</span>
              <span className="text-brand-green-600 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 text-body text-brand-ink-700">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
