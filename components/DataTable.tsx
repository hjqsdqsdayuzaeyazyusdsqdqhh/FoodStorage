import type { TableData } from "@/lib/types";

interface Props {
  data: TableData;
  /** Column index whose values should render in the emphasis (green, tabular-nums) style. */
  emphasisColumn?: number;
  /** Column index rendered as sticky on mobile (frozen first column pattern). */
  frozenColumn?: number;
}

/** Server-rendered HTML data table (Phase 2 §4.4 / §4.5). Never an image — snippet target. */
export function DataTable({ data, emphasisColumn, frozenColumn = 0 }: Props) {
  const { caption, columns, rows } = data;
  if (!columns.length) return null;
  return (
    <figure className="my-6">
      <div className="table-scroll rounded-card border border-brand-line">
        <table className="min-w-full border-collapse text-body">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} scope="col">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    scope={ci === frozenColumn ? "row" : undefined}
                    className={
                      ci === emphasisColumn
                        ? "font-semibold text-brand-green-700 !tabular-nums whitespace-nowrap"
                        : ci === 0
                          ? "font-medium"
                          : undefined
                    }
                    // Cells may contain trusted inline markup (badges, source markers)
                    dangerouslySetInnerHTML={{ __html: cell }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? <figcaption className="mt-2 text-small text-brand-ink-500">{caption}</figcaption> : null}
    </figure>
  );
}
