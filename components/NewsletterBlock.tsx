import { IconMail } from "@/components/icons";

/**
 * Newsletter block (Phase 2 §4.13) — waiting state until an email provider is configured.
 * No submission is possible and no email is collected until a real provider is wired up.
 */
export function NewsletterBlock({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`card my-10 border-brand-green-600/30 bg-brand-paper-soft ${compact ? "" : "p-6"}`}
      aria-labelledby="newsletter-heading"
    >
      <h2 id="newsletter-heading" className="text-h3">
        Get the storage cheat sheet
      </h2>
      <p className="mt-2 text-body text-brand-ink-700">
        One short email a month with the exact shelf-life numbers that matter most — plus pantry
        organization tips. No spam, unsubscribe anytime.
      </p>
      <div className="mt-4 flex items-start gap-3 rounded-control border border-brand-line bg-brand-paper px-4 py-3">
        <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink-300" aria-hidden="true" />
        <p className="text-body text-brand-ink-700">
          <span className="font-semibold">Newsletter coming soon.</span> We are setting up our email
          list — this is where you will be able to subscribe.
        </p>
      </div>
      <p className="mt-3 text-micro text-brand-ink-500">
        Your email is never shared. Read our{" "}
        <a href="/privacy/" className="text-brand-ink-700 underline underline-offset-2 hover:text-brand-green-600">
          privacy policy
        </a>
        .
      </p>
    </section>
  );
}
