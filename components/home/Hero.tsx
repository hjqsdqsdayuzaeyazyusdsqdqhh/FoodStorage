import { SearchBar } from "@/components/SearchBar";
import { IconShield, IconSparkle, IconClock } from "@/components/icons";
import { HeroIllustration } from "./HeroIllustration";

const heroTrust = [
  { icon: IconShield, label: "Cited to USDA, FDA & CDC" },
  { icon: IconSparkle, label: "Reviewed by a registered dietitian" },
  { icon: IconClock, label: "Re-checked every year" },
];

export function Hero() {
  return (
    <section className="bg-brand-green-700 text-brand-paper">
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="badge badge--verified">300+ foods, exact shelf lives</span>
            <h1 className="mt-4 max-w-3xl text-display font-extrabold leading-tight text-brand-paper">
              How long does your food really last?
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-brand-green-100">
              Not “best by” guesses. Exact shelf-life answers for 300+ foods — how to store them, how long they last, and
              how to tell when they are actually bad.
            </p>
            <div className="mt-6 max-w-xl">
              <SearchBar big placeholder="Try 'how long does milk last'" />
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-small text-brand-green-100">
              {heroTrust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green-600 text-brand-paper" aria-hidden="true">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
