export const site = {
  name: "Home Storage Guide",
  domain: "HomeStorageGuide.com",
  url: "https://homestorageguide.com",
  tagline: "Smart Food Storage, Shelf Life & Pantry Organization",
  description:
    "Home Storage Guide tells you how long food lasts and how to keep it safe — exact shelf-life answers for 300+ foods, plus storage and pantry organization.",
  twitter: "@HomeStorageGde",
  locale: "en_US",
  defaultTitleSuffix: "Home Storage Guide",
  /* Default authors used across the editorial model (EEAT, Phase 1 §7.1).
     Swappable at launch; content lives in /content/authors. */
  editor: "rebecca-torres",
  defaultAuthor: "james-okafor",
} as const;

export const pillars = [
  {
    href: "/shelf-life/",
    title: "Shelf Life",
    kicker: "Food shelf life chart",
    promise: "300+ foods, exact shelf lives",
    description:
      "How long every food lasts in the pantry, fridge, and freezer — plus how to tell when it's actually bad.",
  },
  {
    href: "/storage-methods/",
    title: "Storage Methods",
    kicker: "Food storage methods",
    promise: "Store anything, safely",
    description:
      "Freezing, vacuum sealing, canning, and dry-goods storage — step-by-step methods that keep food fresh longer.",
  },
  {
    href: "/pantry-organization/",
    title: "Pantry Organization",
    kicker: "Pantry organization",
    promise: "A pantry that uses itself",
    description:
      "FIFO rotation, zones, labels, and inventory systems that make food visible and keep it from expiring.",
  },
] as const;

export const nav = [
  { href: "/shelf-life/", label: "Shelf Life" },
  { href: "/storage-methods/", label: "Storage Methods" },
  { href: "/pantry-organization/", label: "Pantry Organization" },
  { href: "/tools/", label: "Tools" },
] as const;
