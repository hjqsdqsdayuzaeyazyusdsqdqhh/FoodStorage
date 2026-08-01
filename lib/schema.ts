import { site } from "@/lib/site";
import type { ContentPage, FaqItem } from "@/lib/types";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icons/icon-512.png`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${site.url}/contact/`,
    },
  };
}

export function webSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.href)
      .map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        item: new URL(item.href as string, site.url).toString(),
      })),
  };
}

export function articleSchema(page: ContentPage, authorName: string, reviewerName?: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    mainEntityOfPage: new URL(page.urlPath, site.url).toString(),
    datePublished: page.publishedDate,
    dateModified: page.updatedDate ?? page.reviewedDate,
    author: { "@type": "Person", name: authorName },
    review: reviewerName
      ? {
          "@type": "Review",
          author: { "@type": "Person", name: reviewerName },
          reviewBody: "Reviewed for accuracy against tier-1 food-safety sources.",
          datePublished: page.reviewedDate,
        }
      : undefined,
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    inLanguage: "en-US",
    ...(page.lsi.length ? { keywords: page.lsi.join(", ") } : {}),
  };
}

export function faqPageSchema(faq: FaqItem[]): JsonLd | undefined {
  if (!faq.length) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function collectionPageSchema(page: ContentPage, items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.title,
    url: new URL(page.urlPath, site.url).toString(),
    hasPart: items.map((item) => ({
      "@type": "ListItem",
      position: items.indexOf(item) + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function personSchema(name: string, bio?: string, url?: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    ...(url ? { url } : {}),
    ...(bio ? { description: bio } : {}),
    affiliation: { "@type": "Organization", name: site.name },
  };
}

export function aboutPageSchema(title: string, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: new URL("/about/", site.url).toString(),
  };
}

export function contactPageSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact",
    url: new URL("/contact/", site.url).toString(),
    mainEntity: { "@type": "Organization", name: site.name, email: "hello@homestorageguide.com" },
  };
}

export function webApplicationSchema(title: string, urlPath: string, description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    url: new URL(urlPath, site.url).toString(),
    description,
    applicationCategory: "ReferenceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function howToSchema(
  name: string,
  steps: { name: string; text: string }[],
  urlPath: string,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    url: new URL(urlPath, site.url).toString(),
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
