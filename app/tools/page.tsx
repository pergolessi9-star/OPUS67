import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { ensureBuiltInToolsRegistered } from "@/lib/tools/built-in-tools";
import { getModule } from "@/lib/utils/module";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import type { ToolStatus } from "@/types";

export const metadata: Metadata = { title: "Tools" };
export const dynamic = "force-dynamic";

const statusTone: Record<ToolStatus, "green" | "amber" | "slate" | "red"> = {
  AVAILABLE: "green",
  CONFIGURATION_REQUIRED: "amber",
  DISABLED: "slate",
  ERROR: "red",
};

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
        <ul className="divide-y divide-ink-700 rounded-lg border border-ink-700">
          {tools.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-slate-500">
                  {t.category} · {t.description || "No description"}
                </p>
              </div>
              <Badge tone={statusTone[t.status]}>{t.status.replaceAll("_", " ")}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
