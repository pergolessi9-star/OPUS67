import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * OPUS67 MetricCard — a single real count from the live store.
 * Never renders invented numbers.
 */
export function MetricCard({
  label,
  value,
  href,
  accent = "var(--opus-cyan)",
}: {
  label: string;
  value: number;
  href: string;
  accent?: string;
}) {
  return (
    <Link
      href={href}
      className="spectral-card block p-4"
      style={{ "--module-accent": accent } as CSSProperties}
    >
      <p className="font-mono text-3xl font-semibold tabular-nums text-opus-text">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-opus-muted">
        {label}
      </p>
    </Link>
  );
}
