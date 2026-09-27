import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { AgentCard } from "@/components/opus/agent-card";
import { CommandHeader } from "@/components/opus/command-header";
import { EmptyState } from "@/components/ui/empty-state";
import { AiInteractionNotice } from "@/components/shared/ai-interaction-notice";

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
      <CommandHeader
        eyebrow="OPUS67 // AGENTS"
        title={mod.name}
        description={mod.description}
        status="Operational"
        statusTone="active"
      />
      {agents.length === 0 ? (
        <EmptyState
          title="No agents registered"
          description="Agents bind a provider, a model and system instructions. The definition registry is operational; the active execution provider is the local no-op default (generation disabled by design)."
          hint="To enable real execution: set AI_PROVIDER + a server-side API key, then register an agent definition."
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {agents.map((a) => (
            <li key={a.id}>
              <AgentCard agent={a} />
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-muted">{mod.statusNote}</p>
    </div>
  );
}
