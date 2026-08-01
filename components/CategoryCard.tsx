import { IconChevronRight } from "@/components/icons";

/** Category card (Phase 2 §4.2) — single stretched link, title = destination H1. */
export function CategoryCard({
  href,
  title,
  promise,
  description,
  icon,
}: {
  href: string;
  title: string;
  promise: string;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="card card--hover group flex flex-col gap-2 no-underline hover:no-underline"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-card bg-brand-green-100 text-brand-green-700" aria-hidden="true">
          {icon}
        </span>
        <IconChevronRight
          className="h-5 w-5 text-brand-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-green-600"
          aria-hidden="true"
        />
      </div>
      <h2 className="text-h4 font-semibold">{title}</h2>
      <p className="text-small font-medium text-brand-green-700">{promise}</p>
      <p className="text-body text-brand-ink-700">{description}</p>
    </a>
  );
}
