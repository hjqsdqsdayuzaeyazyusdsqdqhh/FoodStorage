import type { ContentPage } from "@/lib/types";

/** Related content module (Phase 2 §4.14) — 3–6 cards, relevance-ranked. */
export function RelatedContent({ pages }: { pages: ContentPage[] }) {
  if (!pages.length) return null;
  return (
    <section className="my-10" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-h2 mb-4">
        Related reading
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.slice(0, 6).map((page) => (
          <a key={page.urlPath} href={page.urlPath} className="card card--hover no-underline hover:no-underline">
            <p className="text-micro font-semibold uppercase tracking-wide text-brand-ink-300">
              {page.kicker ?? "Home Storage Guide"}
            </p>
            <h3 className="mt-1 text-body font-semibold leading-snug">
              <span className="hover:underline">{page.title}</span>
            </h3>
            {page.snippetAnswer ? (
              <p className="mt-2 text-small text-brand-ink-500 line-clamp-3">{page.snippetAnswer}</p>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
