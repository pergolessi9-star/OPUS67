import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { ensureBuiltInToolsRegistered } from "@/lib/tools/built-in-tools";
import { getModule } from "@/lib/utils/module";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { ToolCard } from "@/components/cards/tool-card";

export const metadata: Metadata = { title: "Tools" };
export const dynamic = "force-dynamic";

export default function ToolsPage() {
  const mod = getModule("tools");
  ensureBuiltInToolsRegistered();
  const tools = getStore().tools.list();

  return (
    <div>
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />
      {tools.length === 0 ? (
        <EmptyState
          title="No tools registered"
          description="Tools are encapsulated behind explicit schemas and permissions. Built-in system tools register automatically; external integrations are optional and none is claimed as available."
        />
      ) : (
        <ul className="grid gap-3">
          {tools.map((t) => (
            <ToolCard
              key={t.id}
              name={t.name}
              category={t.category}
              description={t.description}
              status={t.status}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
