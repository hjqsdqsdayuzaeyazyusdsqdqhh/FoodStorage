import type { ReactNode } from "react";
import { getChildren, getShelfLifePages } from "@/lib/content";
import { pillars } from "@/lib/site";
import { IconArrowRight, IconClock, IconSnowflake, IconPantry } from "@/components/icons";
import { Section, SectionHeading } from "./Section";

function guideCount(parent: string): number {
  return getChildren(parent).filter((p) => p.template === "guide" || p.template === "pantryGuide").length;
}

const ICONS: Record<string, ReactNode> = {
  "/shelf-life/": <IconClock className="h-7 w-7" aria-hidden="true" />,
  "/storage-methods/": <IconSnowflake className="h-7 w-7" aria-hidden="true" />,
  "/pantry-organization/": <IconPantry className="h-7 w-7" aria-hidden="true" />,
};

const COUNTS: Record<string, string> = {
  "/shelf-life/": `${getShelfLifePages().length} foods & counting`,
  "/storage-methods/": `${guideCount("/storage-methods/")} step-by-step methods`,
  "/pantry-organization/": `${guideCount("/pantry-organization/")} organization guides`,
};

export function StartHere() {
  return (
    <Section id="start-here" tone="green">
      <SectionHeading
        kicker="New here?"
        title="Start with the food storage basics"
        subtitle="Three pillars cover everything on this site. Pick one and go as deep as you like."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {pillars.map((p) => (
          <a key={p.href} href={p.href} className="card card--lift group flex flex-col gap-4 no-underline hover:no-underline">
            <span className="flex h-14 w-14 items-center justify-center rounded-card bg-brand-green-600 text-brand-paper" aria-hidden="true">
              {ICONS[p.href]}
            </span>
            <span>
              <span className="block font-display text-h3 font-bold text-brand-ink-900">{p.title}</span>
              <span className="mt-1 block text-small font-medium text-brand-green-700">{p.promise}</span>
            </span>
            <span className="text-body text-brand-ink-700">{p.description}</span>
            <span className="mt-auto flex items-center justify-between pt-1">
              <span className="badge badge--ink">{COUNTS[p.href] ?? `${guideCount(p.href)} guides`}</span>
              <span className="flex items-center gap-1 text-small font-semibold text-brand-green-700">
                Start here
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
