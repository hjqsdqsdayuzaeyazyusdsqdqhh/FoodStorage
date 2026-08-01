/** Key Takeaway box (Phase 2 §4.7) — max 3 numbered, data-rich bullets. */
export function KeyTakeaway({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="card bg-brand-green-100 border-brand-green-600/30">
      <h2 className="text-h3 mb-3">Key takeaways</h2>
      <ol className="list-none space-y-2">
        {items.slice(0, 3).map((item, i) => (
          <li key={i} className="flex gap-3 text-body">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-600 text-small font-bold text-brand-paper" aria-hidden="true">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
