import { getPageOrThrow } from "@/lib/content";
import { IconShield, IconLeaf, IconClock, IconSparkle, IconCalculator } from "@/components/icons";
import { Section, SectionHeading } from "./Section";

const PILLARS = [
  { icon: IconShield, title: "USDA-based shelf-life data", body: "Every duration on the site is traced back to USDA guidance — never a “best by” guess." },
  { icon: IconLeaf, title: "FDA & CDC food-safety rules", body: "Storage temperatures and handling rules follow FDA and CDC guidance." },
  { icon: IconSparkle, title: "USDA FoodKeeper referenced", body: "The USDA FoodKeeper app data underpins the storage chart and food pages." },
  { icon: IconCalculator, title: "Evidence-based research", body: "Sources are listed on every page so you can verify any claim yourself." },
  { icon: IconShield, title: "Expert editorial review", body: "A registered dietitian reviews every safety-tier page before it publishes." },
  { icon: IconClock, title: "Updated regularly", body: "Pages are re-checked annually and stamped with the date they were last reviewed." },
];

export function Expertise() {
  const writer = getPageOrThrow("/authors/james-okafor/");
  const reviewer = getPageOrThrow("/authors/rebecca-torres/");

  return (
    <Section id="expertise" tone="soft">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <SectionHeading
            kicker="Editorial standards"
            title="Why millions trust Home Storage Guide"
            subtitle="Everything here is built on public food-safety guidance, then checked by a credentialed reviewer before it goes live."
          />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="card card--lift flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-brand-green-100 text-brand-green-700" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="font-display text-h4 font-semibold text-brand-ink-900">{title}</span>
                  <span className="mt-1 block text-small text-brand-ink-700">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="card card--lift p-6">
            <p className="font-display text-h4 font-semibold">The people behind the numbers</p>
            <ul className="mt-4 space-y-4">
              {[
                { page: writer, name: "James Okafor", role: "Senior writer" },
                { page: reviewer, name: "Rebecca Torres, RD", role: "Editor-in-chief & food-safety reviewer" },
              ].map(({ page, name, role }) => (
                <li key={name}>
                  <a href={page.urlPath} className="group flex items-center gap-3 no-underline">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-600 font-display text-h4 font-extrabold text-brand-paper" aria-hidden="true">
                      {name.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-body font-semibold text-brand-ink-900 group-hover:underline">{name}</span>
                      <span className="block text-small text-brand-ink-500">{role}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav className="card card--lift p-6" aria-label="Editorial transparency">
            <p className="font-display text-h4 font-semibold">How we stay accountable</p>
            <ul className="mt-3 space-y-2 text-body">
              {[
                { href: "/about/how-we-test/", label: "How we test" },
                { href: "/about/editorial-policy/", label: "Editorial policy" },
                { href: "/about/corrections/", label: "Corrections" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-medium text-brand-green-700 no-underline hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </Section>
  );
}
