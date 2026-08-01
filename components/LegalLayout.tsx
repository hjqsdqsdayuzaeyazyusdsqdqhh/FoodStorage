import { getBreadcrumb } from "@/lib/content";
import type { ContentPage } from "@/lib/types";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/Badge";

/** Minimal layout for legal/reference pages (privacy, terms, disclaimer) — no byline, newsletter, or related links. */
export function LegalLayout({ page }: { page: ContentPage }) {
  const trail = getBreadcrumb(page);
  const lastUpdated = page.updatedDate ?? page.reviewedDate;
  return (
    <div className="container-site">
      <article className="prose-column mx-auto max-w-3xl py-10">
        <Breadcrumb items={trail} />
        <header>
          {page.kicker ? <Badge tone="kicker">{page.kicker}</Badge> : null}
          <h1 className="mt-2 text-h1">{page.h1}</h1>
          <p className="mt-3 text-small text-brand-ink-500">Last updated: {lastUpdated}</p>
        </header>
        {page.bodyHtml ? (
          <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        ) : null}
      </article>
    </div>
  );
}
