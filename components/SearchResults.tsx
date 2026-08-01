"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchIndex } from "@/lib/search";
import { SearchBar } from "@/components/SearchBar";
import { IconSearch } from "@/components/icons";

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

/** Search results page body (Phase 2 §2.16) — real crawlable result URLs. */
export function SearchResults({ index }: { index: SearchIndex }) {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [query, setQuery] = useState(q);

  const results = useMemo(() => {
    const tokens = tokenize(q);
    if (!tokens.length) return [];
    const scored = index.entries.map((entry) => {
      const title = tokenize(entry.title);
      const excerpt = tokenize(entry.excerpt);
      let score = 0;
      for (const t of tokens) {
        if (title.includes(t)) score += 5;
        if (excerpt.includes(t)) score += 2;
        if (entry.urlPath.includes(t)) score += 3;
      }
      return { entry, score };
    });
    return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).map((s) => s.entry);
  }, [q, index]);

  return (
    <div className="container-site py-10">
      <div className="prose-column mx-auto">
        <h1 className="text-h1">Search Home Storage Guide</h1>
        <p className="mt-2 text-body-lg text-brand-ink-700">
          Type a food or storage question to get exact shelf-life answers.
        </p>
        <div className="my-6 max-w-lg">
          <SearchBar big placeholder={q || "Try 'how long does milk last'"} />
        </div>

        <p className="text-small text-brand-ink-500" role="status">
          {q ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : "Enter a query to search."}
        </p>

        <ul className="mt-6 space-y-4">
          {results.slice(0, 50).map((entry) => (
            <li key={entry.urlPath} className="card card--hover">
              <a href={entry.urlPath} className="no-underline hover:no-underline">
                <p className="text-micro font-semibold uppercase tracking-wide text-brand-green-600">
                  {entry.template === "shelfLife" ? "Shelf life" : entry.template === "guide" ? "Storage guide" : "Guide"}
                </p>
                <h2 className="mt-1 text-h4 font-semibold">
                  <span className="hover:underline">{entry.title}</span>
                </h2>
                {entry.excerpt ? <p className="mt-1 text-small text-brand-ink-500 line-clamp-2">{entry.excerpt}</p> : null}
              </a>
            </li>
          ))}
        </ul>

        {q && !results.length ? (
          <div className="card mt-6">
            <p className="flex items-center gap-2 text-body text-brand-ink-700">
              <IconSearch className="h-5 w-5 text-brand-ink-300" aria-hidden="true" />
              No matches for “{q}”. Try a food name like “milk”, “chicken”, or “rice”.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
