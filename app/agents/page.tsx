import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import type { AgentStatus } from "@/types";

export const metadata: Metadata = { title: "Agents" };
export const dynamic = "force-dynamic";

const statusTone: Record<AgentStatus, "green" | "amber" | "slate" | "red"> = {
  draft: "slate",
  active: "green",
  paused: "amber",
  disabled: "red",
};

export default function AgentsPage() {
  const mod = getModule("agents");
  const agents = getStore().agents.list();

  return (
    <div>
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />
      {agents.length === 0 ? (
        <EmptyState
          title="No agents configured"
          description="Agents bind a provider, a model and system instructions. Execution additionally requires a configured AI provider — no provider is currently wired."
        />
      ) : (
        <ul className="divide-y divide-ink-700 rounded-lg border border-ink-700">
          {agents.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{a.name}</p>
                <p className="text-xs text-slate-500">
                  {a.provider}/{a.model} · {a.description || "No description"}
                </p>
              </div>
              <Badge tone={statusTone[a.status]}>{a.status}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
