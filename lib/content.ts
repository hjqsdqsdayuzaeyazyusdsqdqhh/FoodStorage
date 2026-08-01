import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/markdown";
import type { ContentPage, Frontmatter } from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function strDate(v: unknown): string | undefined {
  if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString().slice(0, 10);
  if (typeof v === "string" && v.trim()) return v.trim();
  return undefined;
}

function parsePage(file: string): ContentPage {
  const raw = fs.readFileSync(file, "utf8");
  const stat = fs.statSync(file);
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  if (!fm.urlPath || !fm.title || !fm.h1) {
    throw new Error(`Content file missing required frontmatter (urlPath/title/h1): ${file}`);
  }  const page: ContentPage = {
    slug: fm.slug,
    urlPath: fm.urlPath,
    template: fm.template,
    title: fm.title,
    h1: fm.h1,
    metaDescription: fm.metaDescription ?? "",
    intent: fm.intent ?? "Informational",
    parent: fm.parent,
    category: fm.category,
    method: fm.method,
    kicker: fm.kicker,
    badge: fm.badge,
    risk: fm.risk ?? false,
    priority: fm.priority,
    cluster: fm.cluster,
    foodName: fm.foodName,
    shelfLife: fm.shelfLife,
    related: fm.related ?? [],
    lsi: fm.lsi ?? [],
    faq: fm.faq ?? [],
    author: fm.author,
    reviewer: fm.reviewer,
    publishedDate: strDate(fm.publishedDate) ?? strDate(fm.reviewedDate) ?? "2026-01-01",
    reviewedDate: strDate(fm.reviewedDate) ?? strDate(fm.publishedDate) ?? "2026-01-01",
    updatedDate: strDate(fm.updatedDate),
    sources: fm.sources ?? [],
    snippetAnswer: fm.snippetAnswer,
    tables: fm.tables ?? [],
    howToSteps: fm.howToSteps ?? [],
    bodyHtml: content.trim() ? renderMarkdown(content) : undefined,
    dataOnly: fm.dataOnly ?? !content.trim(),
    credential: fm.credential,
    role: fm.role,
    bio: fm.bio,
    fileMtime: stat.mtime.toISOString(),
  };
  return page;
}

function toPathKey(urlPath: string): string {
  let p = urlPath;
  if (!p.startsWith("/")) p = "/" + p;
  if (p.endsWith("/") && p.length > 1) p = p.slice(0, -1);
  return p;
}

class Registry {
  private pages: ContentPage[] = [];
  private byPath = new Map<string, ContentPage>();
  private childrenByParent = new Map<string, ContentPage[]>();

  constructor() {
    for (const file of walk(CONTENT_ROOT)) {
      const page = parsePage(file);
      this.pages.push(page);
    }
    for (const page of this.pages) {
      this.byPath.set(toPathKey(page.urlPath), page);
    }
    for (const page of this.pages) {
      const key = toPathKey(page.parent ?? "/");
      const list = this.childrenByParent.get(key) ?? [];
      list.push(page);
      this.childrenByParent.set(key, list);
    }
    for (const [key, list] of this.childrenByParent) {
      list.sort((a, b) => rank(a) - rank(b));
    }
    this.pages.sort((a, b) => rank(a) - rank(b));
  }

  all(): ContentPage[] {
    return this.pages;
  }

  get(urlPath: string): ContentPage | undefined {
    return this.byPath.get(toPathKey(urlPath));
  }

  getOrThrow(urlPath: string): ContentPage {
    const page = this.get(urlPath);
    if (!page) throw new Error(`Content not found for urlPath: ${urlPath}`);
    return page;
  }

  children(parentUrl: string): ContentPage[] {
    return this.childrenByParent.get(toPathKey(parentUrl)) ?? [];
  }

  siblings(page: ContentPage): ContentPage[] {
    return this.children(page.parent ?? "/").filter((p) => p.urlPath !== page.urlPath);
  }

  /** Related pages: explicit `related` list first, then same-parent siblings. */
  relatedFor(page: ContentPage, limit = 6): ContentPage[] {
    const fromIds: ContentPage[] = [];
    for (const id of page.related) {
      const p = this.get(id);
      if (p && p.urlPath !== page.urlPath) fromIds.push(p);
    }
    const siblings = this.siblings(page).filter((p) => !fromIds.includes(p));
    return [...fromIds, ...siblings].slice(0, limit);
  }

  byTemplate(template: ContentPage["template"]): ContentPage[] {
    return this.pages.filter((p) => p.template === template);
  }

  byCategory(category: string): ContentPage[] {
    return this.pages.filter((p) => p.category === category);
  }

  /** Breadcrumb trail: home → pillar → category → page. Plain segments lack pages. */
  breadcrumb(page: ContentPage): { label: string; href?: string }[] {
    const trail: { label: string; href?: string }[] = [];
    let cur: ContentPage | undefined = page;
    const seen = new Set<string>();
    while (cur && !seen.has(cur.urlPath)) {
      seen.add(cur.urlPath);
      trail.unshift({ label: cur.title, href: cur.urlPath });
      cur = cur.parent ? this.get(cur.parent) : undefined;
    }
    trail.unshift({ label: "Home", href: "/" });
    return trail;
  }
}

function rank(p: ContentPage): number {
  const pMap: Record<string, number> = { P1: 0, P2: 1, P3: 2, P4: 3 };
  const pr = pMap[p.priority ?? "P4"];
  const tMap: Record<string, number> = { pillar: 0, category: 1, shelfLife: 2, guide: 2, tool: 2 };
  return (tMap[p.template] ?? 3) * 1000 + (pr ?? 3);
}

export const registry = new Registry();

export function getPage(urlPath: string): ContentPage | undefined {
  return registry.get(urlPath);
}

export function getPageOrThrow(urlPath: string): ContentPage {
  return registry.getOrThrow(urlPath);
}

export function getChildren(parentUrl: string): ContentPage[] {
  return registry.children(parentUrl);
}

export function getSiblings(page: ContentPage): ContentPage[] {
  return registry.siblings(page);
}

export function getRelated(page: ContentPage, limit = 6): ContentPage[] {
  return registry.relatedFor(page, limit);
}

export function getBreadcrumb(page: ContentPage): { label: string; href?: string }[] {
  return registry.breadcrumb(page);
}

export function getFoodsByCategory(category: string): ContentPage[] {
  return registry.byCategory(category).filter((p) => p.template === "shelfLife");
}

export function getTopFoods(count = 10): ContentPage[] {
  return registry.byTemplate("shelfLife").slice(0, count);
}

export function getShelfLifePages(): ContentPage[] {
  return registry.byTemplate("shelfLife");
}

export function getGuidePages(): ContentPage[] {
  return registry
    .byTemplate("guide")
    .concat(registry.byTemplate("pantryGuide"))
    .sort((a, b) => rank(a) - rank(b));
}

export function getAuthorPages(): ContentPage[] {
  return registry.byTemplate("author");
}

export function getAuthorArticles(authorSlug: string): ContentPage[] {
  return registry.all().filter((p) => p.author === authorSlug && p.template !== "author");
}

export function getTopAnswers(count = 5): ContentPage[] {
  return registry.byTemplate("shelfLife").slice(0, count);
}

/** Approximate read time in minutes, derived from the page's rendered body. */
export function readingMinutes(page: ContentPage): number {
  if (!page.bodyHtml) return 3;
  const text = page.bodyHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
}

/** Newest published food and guide pages (published date, then review date, then edit recency). */
export function getLatestArticles(count = 6): ContentPage[] {
  const key = (p: ContentPage) => `${p.publishedDate}|${p.reviewedDate}|${p.fileMtime ?? ""}`;
  return registry
    .all()
    .filter((p) => p.template === "shelfLife" || p.template === "guide" || p.template === "pantryGuide")
    .sort((a, b) => key(b).localeCompare(key(a)))
    .slice(0, count);
}
