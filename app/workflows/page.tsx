import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";

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
        <ul className="divide-y divide-ink-700 rounded-lg border border-ink-700">
          {workflows.map((w) => (
            <li key={w.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{w.name}</p>
                <p className="text-xs text-slate-500">
                  {w.steps.length} step(s) · {w.description || "No description"}
                </p>
              </div>
              <Badge tone={w.status === "active" ? "green" : "slate"}>{w.status}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
