import type { ReactNode } from "react";

export type BadgeTone = "kicker" | "method" | "safety" | "ink" | "verified" | "affiliate";

export function Badge({ tone = "kicker", children }: { tone?: BadgeTone; children: ReactNode }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
