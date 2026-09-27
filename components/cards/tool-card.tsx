import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import type { ToolStatus } from "@/types";

/**
 * OPUS67 ToolCard — one tool with explicit category, schemas and status.
 * Statuses are unequivocal; no integration is shown as AVAILABLE unless it
 * really is.
 */
const statusTone: Record<ToolStatus, StatusTone> = {
  AVAILABLE: "chartreuse",
  CONFIGURATION_REQUIRED: "amber",
  DISABLED: "neutral",
  ERROR: "coral",
};

export function ToolCard({
  name,
  category,
  description,
  status,
}: {
  name: string;
  category: string;
  description?: string;
  status: ToolStatus;
}) {
  return (
    <li className="spectral-card p-4" style={{ "--module-accent": "var(--opus-cyan)" } as React.CSSProperties}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="status-dot" style={{ color: "var(--opus-cyan)" }} />
          <p className="text-sm font-medium text-opus-text">{name}</p>
        </div>
        <StatusBadge tone={statusTone[status]}>{status.replaceAll("_", " ")}</StatusBadge>
      </div>
      <p className="mt-2 text-xs text-opus-muted">
        <span className="font-mono text-[10px] uppercase tracking-wider text-opus-cyan">
          {category}
        </span>
        {description ? ` · ${description}` : ""}
      </p>
    </li>
  );
}
