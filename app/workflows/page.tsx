import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { StatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { WorkflowNode, WorkflowConnector } from "@/components/workflows/workflow-node";

export const metadata: Metadata = { title: "Workflows" };
export const dynamic = "force-dynamic";

export default function WorkflowsPage() {
  const mod = getModule("workflows");
  const workflows = getStore().workflows.list();

  return (
    <div>
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />
      {workflows.length === 0 ? (
        <EmptyState
          title="No workflows defined"
          description="A workflow orders steps that bind agents and tools, each with an explicit error policy. The execution engine is planned (see docs/ROADMAP.md)."
        />
      ) : (
        <ul className="grid gap-6">
          {workflows.map((w) => (
            <li key={w.id} className="spectral-card p-4" style={{ "--module-accent": "var(--opus-cyan)" } as React.CSSProperties}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-opus-text">{w.name}</p>
                <StatusBadge tone={w.status === "active" ? "chartreuse" : "neutral"}>
                  {w.status}
                </StatusBadge>
              </div>
              <p className="mt-1 text-xs text-opus-muted">
                {w.description || "No description"}
              </p>
              <div className="mt-4 max-w-sm">
                {w.steps.map((step, i) => (
                  <div key={`${w.id}-step-${i}`}>
                    {i > 0 ? <WorkflowConnector /> : null}
                    <WorkflowNode
                      kind={step.agentId ? "agent" : "tool"}
                      label={step.name}
                      detail={`Step ${i + 1} · error policy: ${step.errorPolicy}`}
                    />
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
