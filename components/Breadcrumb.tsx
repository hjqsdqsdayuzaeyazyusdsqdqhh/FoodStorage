import { IconChevronRight } from "@/components/icons";

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb (Phase 2 §4.15) with BreadcrumbList schema emitted by the page. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="print-hidden mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-small text-brand-ink-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <a href={item.href} className="font-medium no-underline hover:underline">
                  {item.label}
                </a>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "font-medium text-brand-ink-700" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <IconChevronRight className="h-3.5 w-3.5 text-brand-ink-300" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
