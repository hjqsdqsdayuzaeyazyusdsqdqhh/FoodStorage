/** Table of contents (Phase 2 §4.12) — mirrors H2 list, collapsible on mobile. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  if (!items.length) return null;
  return (
    <nav className="card my-6" aria-label="Table of contents">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between font-display text-h4 font-semibold text-brand-ink-900">
          <span>On this page</span>
          <span className="text-brand-green-600 transition-transform group-open:rotate-180" aria-hidden="true">
            ▾
          </span>
        </summary>
        <ol className="toc mt-3">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
