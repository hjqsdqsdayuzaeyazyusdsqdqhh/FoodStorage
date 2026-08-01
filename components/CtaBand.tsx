import type { ReactNode } from "react";
import { IconArrowRight } from "@/components/icons";

/** CTA band (Phase 2 §1.6.13) — headline, supporting line, one button. */
export function CtaBand({
  title,
  body,
  href,
  cta,
  tone = "primary",
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
  tone?: "primary" | "secondary";
}) {
  return (
    <section className="card my-10 border-brand-green-600/30 bg-brand-green-100/50">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-h3">{title}</h2>
          <p className="mt-1 text-body text-brand-ink-700">{body}</p>
        </div>
        <a href={href} className={`btn ${tone === "primary" ? "btn--primary" : "btn--secondary"} shrink-0`}>
          {cta}
          <IconArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/** Affiliate CTA (Phase 2 §4.9) — commercial-intent pages only, disclosure always visible. */
export function AffiliateCta({
  href,
  label,
  note,
  children,
}: {
  href: string;
  label: string;
  note?: string;
  children?: ReactNode;
}) {
  return (
    <section className="my-6 rounded-card border border-brand-line bg-brand-paper p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          {children}
          <p className="mt-1 text-small text-brand-ink-500">
            <span className="badge badge--affiliate mr-2">Affiliate</span>
            {note ?? "We may earn a commission, at no cost to you — see our disclosure."}
          </p>
        </div>
        <a href={href} rel="sponsored" className="btn btn--secondary shrink-0">
          {label}
        </a>
      </div>
    </section>
  );
}
