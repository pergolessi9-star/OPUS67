import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import type { AgentStatus } from "@/types";

/**
 * OPUS67 AgentCard — one agent definition. Provider/model are shown only
 * when they exist; nothing is claimed when no provider is configured.
 */
const statusTone: Record<AgentStatus, StatusTone> = {
  draft: "neutral",
  active: "chartreuse",
  paused: "amber",
  disabled: "coral",
};

export function AgentCard({
  name,
  description,
  status,
  provider,
  model,
  capabilities,
}: {
  name: string;
  description?: string;
  status: AgentStatus;
  provider?: string | null;
  model?: string | null;
  capabilities?: string[];
}) {
  return (
    <li className="spectral-card p-4" style={{ "--module-accent": "var(--opus-ultraviolet)" } as React.CSSProperties}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-opus-text">{name}</p>
        <StatusBadge tone={statusTone[status]}>{status}</StatusBadge>
      </div>
      {description ? <p className="mt-1 text-xs text-opus-muted">{description}</p> : null}
      <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        <div className="flex gap-1.5">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-opus-muted">Provider</dt>
          <dd className="opus-id text-opus-ultraviolet-hi">{provider ?? "not configured"}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-opus-muted">Model</dt>
          <dd className="opus-id text-opus-ultraviolet-hi">{model ?? "not configured"}</dd>
        </div>
      </dl>
      {capabilities && capabilities.length > 0 ? (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-opus-muted">
          {capabilities.join(" · ")}
        </p>
      ) : null}
    </li>
  );
}
