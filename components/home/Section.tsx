import type { ReactNode } from "react";
import { Badge } from "@/components/Badge";
import { IconArrowRight } from "@/components/icons";

type Tone = "white" | "soft" | "green";

const toneBg: Record<Tone, string> = {
  white: "bg-brand-paper",
  soft: "bg-brand-paper-soft",
  green: "bg-brand-green-100/40",
};

/** Full-width homepage section with consistent rhythm, background tone, and Pinterest hooks. */
export function Section({
  tone = "white",
  id,
  className,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} data-pin-ready="true" className={`${toneBg[tone]} ${className ?? ""}`}>
      <div className="container-site py-12 lg:py-16">{children}</div>
    </section>
  );
}

/** Kicker + title + subtitle, with an optional "view all" link in the header row. */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  href,
  linkLabel,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {kicker ? <Badge tone="kicker">{kicker}</Badge> : null}
        <h2 className="mt-3 text-h2">{title}</h2>
        {subtitle ? <p className="mt-2 text-body text-brand-ink-700">{subtitle}</p> : null}
      </div>
      {href && linkLabel ? (
        <a href={href} className="btn btn--ghost shrink-0">
          {linkLabel}
          <IconArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
