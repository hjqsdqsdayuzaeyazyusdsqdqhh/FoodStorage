import { IconShield, IconClock } from "@/components/icons";
import { site } from "@/lib/site";

interface AuthorInfo {
  name: string;
  slug?: string;
  credential: string;
  bio: string;
  reviewer?: boolean;
  reviewerCredential?: string;
}

/** Author box (Phase 2 §4.11) — EEAT signature on every page. */
export function AuthorBox({
  author,
  reviewer,
  reviewedDate,
}: {
  author: AuthorInfo;
  reviewer?: AuthorInfo;
  reviewedDate?: string;
}) {
  const authorHref = author.slug ? `${site.url}/authors/${author.slug}/` : undefined;
  return (
    <section className="card my-10" aria-label="Author information">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-green-100 font-display text-h4 font-bold text-brand-green-700" aria-hidden="true">
          {author.name
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="min-w-0">
          <p className="text-small font-semibold text-brand-ink-500">Written by</p>
          {authorHref ? (
            <p className="font-display text-h4 font-semibold">
              <a href={authorHref} className="no-underline hover:underline">
                {author.name}
              </a>
            </p>
          ) : (
            <p className="font-display text-h4 font-semibold">{author.name}</p>
          )}
          <p className="text-small font-medium text-brand-green-700">{author.credential}</p>
          <p className="mt-2 text-body text-brand-ink-700">{author.bio}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-small text-brand-ink-500">
              <IconClock className="h-4 w-4" />
              Last reviewed {reviewedDate}
            </span>
            {reviewer ? (
              <span className="flex items-center gap-1.5 text-small font-medium text-sem-success-700">
                <IconShield className="h-4 w-4" />
                Reviewed by {reviewer.name}, {reviewer.reviewerCredential ?? reviewer.credential}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
