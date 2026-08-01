import { nav, site } from "@/lib/site";
import { IconLeaf } from "@/components/icons";
import { SearchBar } from "@/components/SearchBar";
import { MobileMenu } from "@/components/MobileMenu";

/** Site header (Phase 2 §1.6.9) — logo, primary nav, inline search, mobile drawer. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-paper/95 backdrop-blur">
      <div className="container-site flex items-center justify-between gap-4 py-3">
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-card bg-brand-green-600 text-brand-paper" aria-hidden="true">
            <IconLeaf className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-body font-bold text-brand-ink-900">Home Storage Guide</span>
            <span className="hidden text-micro text-brand-ink-500 sm:block">{site.tagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-control px-3 py-2 text-small font-semibold no-underline text-brand-ink-700 hover:bg-brand-paper-soft hover:text-brand-green-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <SearchBar />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
