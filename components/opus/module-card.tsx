import Link from "next/link";
import type { CSSProperties } from "react";
import { StatusBadge, type StatusTone } from "./status-badge";

/**
 * ModuleCard — Spectral Card with a per-module secondary chromatic
 * identity (--card-accent drives the micro-highlight and icon tone),
 * keeping global cohesion through the shared card grammar.
 */
export function ModuleCard({
  href,
  name,
  description,
  statusLabel,
  statusTone = "neutral",
  accent,
  icon,
}: {
  href: string;
  name: string;
  description: string;
  statusLabel: string;
  statusTone?: StatusTone;
  /** CSS var of the module accent, e.g. "var(--opus-cyan)". */
  accent: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="spectral-card block h-full p-4"
      style={{ "--card-accent": accent } as CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-steel" aria-hidden="true">
          {icon}
        </span>
        <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
      </div>
      <h3 className="mt-3 font-medium text-ice">{name}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </Link>
  );
}
