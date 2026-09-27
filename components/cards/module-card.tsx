import Link from "next/link";
import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import { ModuleGlyph } from "@/components/brand/module-glyph";
import { MODULE_ACCENTS, type ModuleSlug } from "@/config/modules";
import type { CSSProperties } from "react";

/**
 * OPUS67 ModuleCard — Spectral Card with per-module chromatic identity
 * (translucent surface, hairline border, micro top highlight, linear icon).
 */
export function ModuleCard({
  slug,
  name,
  description,
  href,
  status,
  statusLabel,
}: {
  slug: ModuleSlug;
  name: string;
  description: string;
  href: string;
  status: StatusTone;
  statusLabel: string;
}) {
  return (
    <Link
      href={href}
      className="spectral-card group block h-full p-4"
      style={{ "--module-accent": MODULE_ACCENTS[slug] } as CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ModuleGlyph slug={slug} />
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-opus-text">
            {name}
          </h3>
        </div>
        <StatusBadge tone={status}>{statusLabel}</StatusBadge>
      </div>
      <p className="mt-3 text-sm text-opus-steel">{description}</p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-opus-muted transition-colors group-hover:text-opus-cyan">
        Open module →
      </p>
    </Link>
  );
}
