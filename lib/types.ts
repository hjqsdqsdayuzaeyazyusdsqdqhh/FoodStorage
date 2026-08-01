export type TemplateId =
  | "home"
  | "pillar"
  | "category"
  | "shelfLife"
  | "guide"
  | "pantryGuide"
  | "review"
  | "comparison"
  | "tool"
  | "author"
  | "editorial"
  | "about"
  | "contact"
  | "search";

export type Intent =
  | "Informational"
  | "How-to"
  | "Comparative"
  | "Commercial"
  | "Transactional"
  | "Interactive"
  | "Navigation";

export interface FaqItem {
  q: string;
  a: string;
}

export interface Source {
  name: string;
  url: string;
}

export interface TableData {
  name?: string;
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface ShelfLifeSummary {
  pantry?: string;
  fridge?: string;
  freezer?: string;
  opened?: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface Frontmatter {
  slug: string;
  urlPath: string;
  template: TemplateId;
  title: string;
  h1: string;
  metaDescription: string;
  intent: Intent;
  parent?: string;
  category?: string;
  method?: string;
  kicker?: string;
  badge?: string;
  risk?: boolean;
  priority?: string;
  cluster?: string;
  foodName?: string;
  shelfLife?: ShelfLifeSummary;
  related?: string[];
  lsi?: string[];
  faq?: FaqItem[];
  author?: string;
  reviewer?: string;
  publishedDate: string;
  reviewedDate: string;
  updatedDate?: string;
  sources?: Source[];
  snippetAnswer?: string;
  tables?: TableData[];
  howToSteps?: HowToStep[];
  /** True when the page has no full body markdown and is rendered from data only. */
  dataOnly?: boolean;
  credential?: string;
  role?: string;
  bio?: string;
}

/** Optional author-profile fields carried on author pages. */
export interface AuthorExtras {
  credential?: string;
  role?: string;
  bio?: string;
}

export interface ContentPage {
  slug: string;
  urlPath: string;
  template: TemplateId;
  title: string;
  h1: string;
  metaDescription: string;
  intent: Intent;
  parent?: string;
  category?: string;
  method?: string;
  kicker?: string;
  badge?: string;
  risk?: boolean;
  priority?: string;
  cluster?: string;
  foodName?: string;
  shelfLife?: ShelfLifeSummary;
  related: string[];
  lsi: string[];
  faq: FaqItem[];
  author?: string;
  reviewer?: string;
  publishedDate: string;
  reviewedDate: string;
  updatedDate?: string;
  sources: Source[];
  snippetAnswer?: string;
  tables: TableData[];
  howToSteps: HowToStep[];
  bodyHtml?: string;
  dataOnly: boolean;
  /** ISO timestamp of the content file's last modification (filesystem mtime). */
  fileMtime?: string;
  credential?: string;
  role?: string;
  bio?: string;
}
