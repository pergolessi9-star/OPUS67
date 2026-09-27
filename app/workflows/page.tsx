import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { CommandHeader } from "@/components/opus/command-header";
import { StatusBadge, type StatusTone } from "@/components/opus/status-badge";
import { WorkflowChain, WorkflowNode } from "@/components/opus/workflow-node";
import { EmptyState } from "@/components/ui/empty-state";
import type { WorkflowStatus } from "@/types";

export const metadata: Metadata = { title: "Workflows" };
export const dynamic = "force-dynamic";

const statusTone: Record<WorkflowStatus, StatusTone> = {
  draft: "neutral",
  active: "active",
  paused: "review",
  disabled: "critical",
};

/**
 * Canonical execution model (design contract, engine planned — see
 * docs/ROADMAP.md). Rendered with WorkflowNodes and Spectral Line
 * connections. This is the documented model, not live execution data.
 */
const CANONICAL_MODEL = [
  { label: "INPUT", accent: "var(--opus-text)", detail: "Validated at the boundary (Zod)" },
  { label: "AGENT", accent: "var(--opus-uv)", detail: "Provider/model binding" },
  { label: "TOOL", accent: "var(--opus-chartreuse)", detail: "Explicit schema + permissions" },
  { label: "VALIDATION", accent: "var(--opus-cyan)", detail: "Output contract check" },
  { label: "EVIDENCE", accent: "var(--opus-cyan)", detail: "SHA-256 provenance record" },
  { label: "HUMAN DECISION", accent: "var(--opus-coral)", detail: "Oversight gate before final decision" },
] as const;

export default function WorkflowsPage() {
  const mod = getModule("workflows");
  const workflows = getStore().workflows.list();

  return (
    <div>
      <CommandHeader
        eyebrow="OPUS67 // WORKFLOWS"
        title={mod.name}
        description={mod.description}
        status="Operational"
        statusTone="active"
      />

      <section
        aria-labelledby="canonical-model"
        className="spectral-card mb-10 p-5"
        style={{ "--card-accent": "var(--opus-amber)" } as React.CSSProperties}
      >
        <h2
          id="canonical-model"
          className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-solar"
        >
          Canonical execution model
        </h2>
        <p className="mt-1 text-xs text-muted">
          Design contract for the planned execution engine — not live data.
        </p>
        <div className="mt-4">
          <WorkflowChain>
            {CANONICAL_MODEL.map((node, i) => (
              <WorkflowNode
                key={node.label}
                label={node.label}
                accent={node.accent}
                detail={node.detail}
                first={i === 0}
                last={i === CANONICAL_MODEL.length - 1}
              />
            ))}
          </WorkflowChain>
        </div>
      </section>

      {workflows.length === 0 ? (
        <EmptyState
          title="No workflows defined"
          description="A workflow orders steps that bind agents and tools, each with an explicit error policy. The execution engine is planned (see docs/ROADMAP.md)."
          hint="Workflow definitions will appear here once registered."
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {workflows.map((w) => (
            <li key={w.id} className="spectral-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-ice">{w.name}</h3>
                <StatusBadge tone={statusTone[w.status]}>{w.status}</StatusBadge>
              </div>
              <p className="mt-1 text-sm text-muted">
                {w.steps.length} step(s) · {w.description || "No description"}
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-muted">{mod.statusNote}</p>
    </div>
  );
}
