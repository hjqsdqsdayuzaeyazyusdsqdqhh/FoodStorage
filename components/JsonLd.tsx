/** Render JSON-LD structured data (Phase 2 §9.9) — never hand-written in content. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }}
    />
  );
}
