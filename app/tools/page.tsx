import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { ensureBuiltInToolsRegistered } from "@/lib/tools/built-in-tools";
import { getModule } from "@/lib/utils/module";
import { CommandHeader } from "@/components/opus/command-header";
import { ToolCard } from "@/components/opus/tool-card";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Tools" };
export const dynamic = "force-dynamic";

export default function ToolsPage() {
  const mod = getModule("tools");
  ensureBuiltInToolsRegistered();
  const tools = getStore().tools.list();

  return (
    <div>
      <CommandHeader
        eyebrow="OPUS67 // TOOLS"
        title={mod.name}
        description={mod.description}
        status="Operational"
        statusTone="active"
      />
      {tools.length === 0 ? (
        <EmptyState
          title="No tools registered"
          description="Tools are encapsulated behind explicit schemas and permissions. Built-in system tools register automatically; external integrations are optional and none is claimed as available."
        />
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {tools.map((t) => (
            <li key={t.id}>
              <ToolCard tool={t} />
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-muted">{mod.statusNote}</p>
    </div>
  );
}
