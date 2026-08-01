import { getPage } from "@/lib/content";

export interface AuthorInfo {
  name: string;
  slug?: string;
  credential: string;
  bio: string;
  reviewerCredential?: string;
}

const DEFAULTS: Record<string, AuthorInfo> = {
  "james-okafor": {
    name: "James Okafor",
    slug: "james-okafor",
    credential: "Senior food storage writer",
    bio: "Writer covering food storage shelf life, storage methods, and kitchen organization.",
  },
  "rebecca-torres": {
    name: "Rebecca Torres, RD",
    slug: "rebecca-torres",
    credential: "Registered Dietitian",
    bio: "Registered dietitian and editor-in-chief, reviewing every food-safety claim against tier-1 guidance.",
    reviewerCredential: "RD",
  },
};

export function getAuthorInfo(slug?: string): AuthorInfo {
  if (!slug) return DEFAULTS["james-okafor"];
  const page = getPage(`/authors/${slug}/`);
  if (page) {
    return {
      name: page.title,
      slug,
      credential: page.credential ?? "Home Storage Guide contributor",
      bio: page.bio ?? page.snippetAnswer ?? "",
      reviewerCredential: page.credential ?? undefined,
    };
  }
  return DEFAULTS[slug] ?? DEFAULTS["james-okafor"];
}

export function getReviewerInfo(slug?: string): AuthorInfo | undefined {
  if (!slug) return undefined;
  return getAuthorInfo(slug);
}
