import type { Metadata } from "next";
import { getPageOrThrow, getAuthorPages, getAuthorArticles } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/Badge";
import { FoodCard } from "@/components/FoodCard";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAuthorPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildPageMetadata(getPageOrThrow(`/authors/${slug}/`));
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageOrThrow(`/authors/${slug}/`);
  const articles = getAuthorArticles(slug);
  const trail = [{ label: "Home", href: "/" }, { label: "Authors" }, { label: page.title }];

  const jsonLd = [
    breadcrumbSchema(trail),
    personSchema(page.title, page.bio ?? page.snippetAnswer ?? "", page.urlPath),
  ];

  return (
    <div className="container-site">
      <div className="mx-auto max-w-3xl py-8">
        <Breadcrumb items={trail} />
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand-green-100 font-display text-display font-bold text-brand-green-700" aria-hidden="true">
            {page.title
              .replace(", RD", "")
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0">
            <Badge tone="kicker">{page.credential ?? "Contributor"}</Badge>
            <h1 className="mt-2 text-h1">{page.title}</h1>
            <p className="mt-1 text-body text-brand-ink-700">{page.role ?? "Home Storage Guide contributor"}</p>
          </div>
        </header>

        {page.bodyHtml ? (
          <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
        ) : null}

        {articles.length ? (
          <section className="mt-10">
            <h2 className="text-h2 mb-4">Articles by {page.title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <FoodCard key={a.urlPath} page={a} />
              ))}
            </div>
          </section>
        ) : null}

        <JsonLd data={jsonLd} />
      </div>
    </div>
  );
}
