import { getBreadcrumb, getRelated } from "@/lib/content";
import { getAuthorInfo, getReviewerInfo } from "@/lib/authors";
import type { ContentPage } from "@/lib/types";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuickAnswer } from "@/components/QuickAnswer";
import { Toc } from "@/components/Toc";
import { FaqBlock } from "@/components/FaqBlock";
import { AuthorBox } from "@/components/AuthorBox";
import { RelatedContent } from "@/components/RelatedContent";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { Badge } from "@/components/Badge";
import { ArticleHeroImage, ArticleSupportImage } from "@/components/ArticleImage";
import { IconClock } from "@/components/icons";

export function extractHeadings(html: string): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  const re = /<h2[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const label = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (label) out.push({ id: m[1], label });
  }
  return out;
}

function Byline({ page }: { page: ContentPage }) {
  const author = getAuthorInfo(page.author);
  const reviewer = getReviewerInfo(page.reviewer);
  return (
    <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-small text-brand-ink-500">
      <span className="font-medium text-brand-ink-700">By {author.name}</span>
      {reviewer ? <span>· Reviewed by {reviewer.name}</span> : null}
      <span className="flex items-center gap-1.5">
        <IconClock className="h-3.5 w-3.5" aria-hidden="true" />
        Reviewed {page.reviewedDate}
      </span>
    </p>
  );
}

function Sources({ page }: { page: ContentPage }) {
  if (!page.sources.length) return null;
  return (
    <section className="my-10">
      <h2 className="text-h2 mb-3">Sources</h2>
      <p className="text-small text-brand-ink-500">
        Shelf-life and temperature claims on this page are cited from tier-1 food-safety authorities. Always confirm
        current guidance before relying on dated information.
      </p>
      <ul className="mt-3 list-none space-y-1.5">
        {page.sources.map((s, i) => (
          <li key={i} className="text-small">
            <a href={s.url} className="text-brand-green-600 underline-offset-2 hover:text-brand-green-700" rel="nofollow noopener">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Universal article shell (Phase 2 §D2 skeleton) — breadcrumb → article → aside → related. */
export function ArticleLayout({
  page,
  extraContent,
}: {
  page: ContentPage;
  extraContent?: React.ReactNode;
}) {
  const trail = getBreadcrumb(page);
  const related = getRelated(page, 6);
  const headings = page.bodyHtml ? extractHeadings(page.bodyHtml) : [];
  const author = getAuthorInfo(page.author);
  const reviewer = getReviewerInfo(page.reviewer);

  return (
    <div className="container-site">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="prose-column min-w-0">
          <Breadcrumb items={trail} />

          <header>
            {page.kicker ? <Badge tone="kicker">{page.kicker}</Badge> : null}
            <h1 className="mt-2 text-h1">{page.h1}</h1>
            <Byline page={page} />
          </header>

          <ArticleHeroImage page={page} />

          {page.snippetAnswer ? <QuickAnswer text={page.snippetAnswer} /> : null}

          {headings.length >= 3 ? <Toc items={headings} /> : null}

          {page.bodyHtml ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
          ) : null}

          <ArticleSupportImage page={page} />

          {extraContent}

          {page.faq.length ? <FaqBlock items={page.faq} /> : null}

          <Sources page={page} />

          <AuthorBox
            author={{
              name: author.name,
              slug: author.slug,
              credential: author.credential,
              bio: author.bio,
            }}
            reviewer={
              reviewer
                ? {
                    name: reviewer.name,
                    slug: reviewer.slug,
                    credential: reviewer.credential,
                    bio: reviewer.bio,
                    reviewerCredential: reviewer.reviewerCredential,
                  }
                : undefined
            }
            reviewedDate={page.reviewedDate}
          />

          <NewsletterBlock compact />
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {headings.length >= 3 ? (
              <nav className="card" aria-label="Table of contents">
                <p className="font-display text-h4 font-semibold">On this page</p>
                <ol className="toc mt-3">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.label}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <NewsletterBlock compact />
          </div>
        </aside>
      </div>

      <div className="container-site pb-4">
        <RelatedContent pages={related} />
      </div>
    </div>
  );
}
