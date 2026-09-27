import type { CSSProperties } from "react";
import type { Tool } from "@/types";
import { StatusBadge, type StatusTone } from "./status-badge";

/**
 * ToolCard — tool representation with explicit input/output contract and
 * unambiguous chromatic state. Execution and evidence fields report real
 * records only ("No executions recorded" when none exist).
 */
const toolTone: Record<Tool["status"], StatusTone> = {
  AVAILABLE: "active",
  CONFIGURATION_REQUIRED: "review",
  DISABLED: "neutral",
  ERROR: "critical",
};

function schemaSummary(schema: Record<string, unknown>): string {
  const props = (schema as { properties?: Record<string, unknown> }).properties;
  if (!props || Object.keys(props).length === 0) {
    return "{}";
  }
  return `{ ${Object.keys(props).join(", ")} }`;
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article
      className="spectral-card p-4"
      style={{ "--card-accent": "var(--opus-chartreuse)" } as CSSProperties}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-mono text-sm font-semibold text-ice">{tool.name}</h3>
        <StatusBadge tone={toolTone[tool.status]}>
          {tool.status.replaceAll("_", " ")}
        </StatusBadge>
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ion">
        {tool.category}
      </p>
      {tool.description ? (
        <p className="mt-2 text-sm text-muted">{tool.description}</p>
      ) : null}

      <dl className="mt-4 space-y-2 font-mono text-xs">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 uppercase tracking-widest text-muted">Input</dt>
          <dd className="text-steel">{schemaSummary(tool.inputSchema)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 uppercase tracking-widest text-muted">Output</dt>
          <dd className="text-steel">{schemaSummary(tool.outputSchema)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 uppercase tracking-widest text-muted">Perms</dt>
          <dd className="text-steel">
            {tool.permissions.length === 0 ? "None (no external access)" : tool.permissions.join(", ")}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-3 text-xs text-muted">
        <p>
          Last execution: <span className="text-steel">No executions recorded</span>
        </p>
        <p>
          Evidence generated: <span className="text-steel">None</span>
        </p>
      </div>
    </article>
  );
}
