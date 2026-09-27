import type { StatusTone } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

/**
 * OPUS67 WorkflowNode — node in a workflow/oversight chain, connected with
 * the Spectral Line. Pure geometry: nodes, lines and states.
 */
const nodeTone: Record<string, StatusTone> = {
  input: "neutral",
  human: "amber",
  agent: "ultraviolet",
  tool: "cyan",
  workflow: "cyan",
  validation: "cyan",
  evidence: "chartreuse",
  decision: "coral",
};

export function WorkflowNode({
  kind,
  label,
  detail,
  active = false,
}: {
  kind: keyof typeof nodeTone;
  label: string;
  detail?: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "spectral-card flex min-w-0 items-center gap-3 px-4 py-3",
        active && "border-opus-chartreuse/50",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("status-dot h-2 w-2", active && "status-dot--pulse")}
        style={{ color: `var(--opus-${nodeTone[kind] === "neutral" ? "steel" : nodeTone[kind]})` }}
      />
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-opus-muted">{kind}</p>
        <p className="truncate text-sm font-medium text-opus-text">{label}</p>
        {detail ? <p className="truncate text-xs text-opus-muted">{detail}</p> : null}
      </div>
    </div>
  );
}

/** Vertical Spectral Line connector between workflow nodes. */
export function WorkflowConnector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1">
      <span className="spectral-line spectral-line--vertical h-5" />
    </div>
  );
}
