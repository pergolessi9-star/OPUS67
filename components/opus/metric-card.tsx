import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * MetricCard — real counts only. The value comes from the live store;
 * zero is shown as zero, never replaced by invented metrics.
 */
export function MetricCard({
  href,
  label,
  value,
  accent,
}: {
  href: string;
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="spectral-card block p-4"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <p className="font-mono text-3xl font-semibold tabular-nums text-ice">{value}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
        {label}
      </p>
    </Link>
  );
}
