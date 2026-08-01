import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import { searchIndex } from "@/lib/search";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search Home Storage Guide for exact food shelf-life answers.",
  path: "/search/",
  noindex: true,
});

export default function SearchPage() {
  const index = searchIndex();
  return (
    <Suspense fallback={null}>
      <SearchResults index={index} />
    </Suspense>
  );
}
