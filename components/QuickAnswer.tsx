/** Quick Answer block (Phase 2 §4.6) — the featured-snippet answer under the H1. */
export function QuickAnswer({ text }: { text: string }) {
  if (!text) return null;
  return (
    <section className="border-l-4 border-brand-green-600 bg-brand-paper-soft py-4 pl-4 pr-5 my-6 rounded-r-lg rounded-l-sm" aria-label="Quick answer">
      <p className="text-body-lg text-brand-ink-900 leading-[1.7]">{text}</p>
    </section>
  );
}
