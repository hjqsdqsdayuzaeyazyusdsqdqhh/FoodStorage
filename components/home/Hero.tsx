import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { IconShield, IconSparkle, IconClock } from "@/components/icons";

const heroTrust = [
  { icon: IconShield, label: "Cited to USDA, FDA & CDC" },
  { icon: IconSparkle, label: "Reviewed by a registered dietitian" },
  { icon: IconClock, label: "Re-checked every year" },
];

export function Hero() {
  return (
    <section className="bg-brand-green-700 text-brand-paper">
      <div className="container-site py-12 lg:py-[80px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
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
          <div className="min-w-0">
            <Image
              src="/images/hero-home.webp"
              alt="Organized pantry with labeled food containers and fresh ingredients."
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 650px, 100vw"
              loading="eager"
              priority
              fetchPriority="high"
              className="h-auto w-full rounded-[28px] object-contain shadow-lift"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
