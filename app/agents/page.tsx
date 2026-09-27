import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { AiInteractionNotice } from "@/components/shared/ai-interaction-notice";
import { AgentCard } from "@/components/cards/agent-card";

export const metadata: Metadata = { title: "Agents" };
export const dynamic = "force-dynamic";

export default function AgentsPage() {
  const mod = getModule("agents");
  const agents = getStore().agents.list();

  return (
    <div>
      {/* Renders only when an external AI provider is active (real AI
          interaction); hidden with the default no-op provider. */}
      <AiInteractionNotice />
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />
      {agents.length === 0 ? (
        <EmptyState
          title="No agents registered"
          description="Agents bind a provider, a model and system instructions. The definition registry is operational; the active execution provider is the local no-op default (generation disabled by design) until AI_PROVIDER is set."
        />
      ) : (
        <ul className="grid gap-3">
          {agents.map((a) => (
            <AgentCard
              key={a.id}
              name={a.name}
              description={a.description}
              status={a.status}
              provider={a.provider}
              model={a.model}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
