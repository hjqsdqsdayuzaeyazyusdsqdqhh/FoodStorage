import { site, pillars } from "@/lib/site";
import { IconLeaf } from "@/components/icons";

const shelfLifeSubcats = [
  { href: "/shelf-life/pantry/", label: "Pantry food shelf life" },
  { href: "/shelf-life/produce/", label: "Produce shelf life" },
  { href: "/shelf-life/dairy/", label: "Dairy shelf life" },
  { href: "/shelf-life/meat/", label: "Meat shelf life" },
  { href: "/shelf-life/freezer/", label: "Frozen food shelf life" },
];

const legalLinks = [
  { href: "/about/", label: "About us" },
  { href: "/about/editorial-policy/", label: "Editorial policy" },
  { href: "/about/how-we-test/", label: "How we test" },
  { href: "/about/corrections/", label: "Corrections" },
  { href: "/privacy/", label: "Privacy policy" },
  { href: "/terms/", label: "Terms of use" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/contact/", label: "Contact" },
];

/** Site footer (Phase 2 §1.6.11) — brand, category tree, legal. */
export function SiteFooter() {
  return (
    <footer className="border-t border-brand-line bg-brand-ink-900 text-brand-paper">
      <div className="container-site grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <span className="flex h-9 w-9 items-center justify-center rounded-card bg-brand-green-500 text-brand-ink-900" aria-hidden="true">
              <IconLeaf className="h-5 w-5" />
            </span>
            <span className="font-display text-body font-bold">{site.name}</span>
          </a>
          <p className="mt-3 text-small text-brand-ink-300">{site.tagline}.</p>
          <p className="mt-2 text-small text-brand-ink-300">
            Exact shelf-life answers for hundreds of foods — how to store them, how long they last, and how to tell when
            they are actually bad.
          </p>
        </div>

        <nav aria-label="Pillars">
          <p className="font-display text-h4 font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-small">
            {pillars.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="text-brand-ink-300 no-underline hover:text-brand-paper hover:underline">
                  {p.title}
                </a>
              </li>
            ))}
            <li>
              <a href="/tools/" className="text-brand-ink-300 no-underline hover:text-brand-paper hover:underline">
                Tools
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Shelf life by category">
          <p className="font-display text-h4 font-semibold">Shelf life</p>
          <ul className="mt-3 space-y-2 text-small">
            {shelfLifeSubcats.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-brand-ink-300 no-underline hover:text-brand-paper hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company and legal">
          <p className="font-display text-h4 font-semibold">Company</p>
          <ul className="mt-3 space-y-2 text-small">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-brand-ink-300 no-underline hover:text-brand-paper hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-brand-ink-700/60">
        <div className="container-site py-5 text-micro text-brand-ink-300">
          <p>
            Affiliate disclosure: some links are affiliate links. We may earn a commission, at no cost to you, when you
            buy through them — see our{" "}
            <a href="/about/editorial-policy/" className="text-brand-ink-300 underline hover:text-brand-paper">
              editorial policy
            </a>
            .
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} {site.name}. All rights reserved. Food-safety guidance is general information,
            not medical advice — see our{" "}
            <a href="/disclaimer/" className="text-brand-ink-300 underline hover:text-brand-paper">
              disclaimer
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
