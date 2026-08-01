import { getTopFoods } from "@/lib/content";
import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/Badge";
import { IconArrowRight } from "@/components/icons";

/** Custom 404 (Phase 1 §8) — brand, search box, and links to top pages. */
export default function NotFound() {
  const top = getTopFoods(6);
  return (
    <div className="container-site py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge tone="kicker">404</Badge>
        <h1 className="mt-4 text-display">That shelf is empty</h1>
        <p className="mt-3 text-body-lg text-brand-ink-700">
          The page you are looking for has been moved or never existed. Let us point you to the exact answer instead.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <SearchBar big />
        </div>
      </div>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="text-h2 mb-4 text-center">Popular shelf lives</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {top.map((f) => (
            <li key={f.urlPath}>
              <a
                href={f.urlPath}
                className="flex items-center justify-between rounded-card border border-brand-line px-4 py-3 no-underline hover:border-brand-green-500 hover:bg-brand-paper-soft"
              >
                <span className="font-medium text-brand-ink-900">{f.title}</span>
                <IconArrowRight className="h-4 w-4 shrink-0 text-brand-green-600" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-small">
          <a href="/" className="font-medium no-underline hover:underline">
            Go to the homepage
          </a>
          {" · "}
          <a href="/shelf-life/" className="font-medium no-underline hover:underline">
            Full shelf-life chart
          </a>
        </p>
      </section>
    </div>
  );
}
