import { IconArrowRight } from "@/components/icons";
import { Section, SectionHeading } from "./Section";

const TIPS = [
  {
    n: "1",
    title: "Keep the fridge at 40°F or below",
    body: "The cold zone is the whole ballgame. At 40°F or below, perishables stay safe for their full shelf life — above it, bacteria double fast.",
    href: "/storage-methods/food-safety/food-safety-temperature-guide/",
    label: "Food safety temperature guide",
  },
  {
    n: "2",
    title: "Follow the 2-hour rule",
    body: "Perishable food left at room temperature longer than 2 hours (1 hour above 90°F) enters the danger zone. Discard it — reheating does not make it safe.",
    href: "/storage-methods/food-safety/food-safety-temperature-guide/",
    label: "See the danger-zone rules",
  },
  {
    n: "3",
    title: "Store like you'll use it — FIFO",
    body: "First in, first out: oldest food to the front, newest to the back. It is the single biggest lever against food waste in a pantry.",
    href: "/pantry-organization/the-fifo-pantry-system/",
    label: "The FIFO pantry system",
  },
];

export function SafetyTips() {
  return (
    <Section id="safety-tips" tone="white">
      <SectionHeading
        kicker="Food safety"
        title="Food safety tips that actually matter"
        subtitle="Three rules cover most kitchen mistakes — and every one is straight from public food-safety guidance."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {TIPS.map((t) => (
          <div key={t.n} className="card card--lift flex flex-col gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green-600 font-display text-h4 font-extrabold text-brand-paper"
              aria-hidden="true"
            >
              {t.n}
            </span>
            <h3 className="text-h4 font-semibold text-brand-ink-900">{t.title}</h3>
            <p className="text-small text-brand-ink-700">{t.body}</p>
            <a href={t.href} className="mt-auto flex items-center gap-1 pt-1 text-small font-semibold text-brand-green-700 no-underline hover:underline">
              {t.label}
              <IconArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-card border border-brand-green-600/30 bg-brand-green-100/50">
        <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="badge badge--kicker">A real pantry save</span>
            <h3 className="mt-3 text-h2">The jar you forgot at the back of the shelf</h3>
            <p className="mt-3 text-body text-brand-ink-700">
              Every pantry has one: the rice pushed behind the lentils, the canned tomatoes bought “just in case.” The
              average household throws away hundreds of dollars a year of food that was perfectly safe — simply because
              nobody could tell how long it actually lasts. Our rotation system fixes that.
            </p>
          </div>
          <a href="/pantry-organization/" className="btn btn--primary shrink-0">
            Build a pantry that uses itself
            <IconArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}
