import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const mod = getModule("projects");
  const projects = getStore().projects.list();

  return (
    <div>
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />
      {projects.length === 0 ? (
        <EmptyState
          title="No projects configured"
          description="Projects group agents, workflows, executions and evidence. None has been registered yet."
        />
      ) : (
        <ul className="divide-y divide-ink-700 rounded-lg border border-ink-700">
          {projects.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-slate-500">
                  {p.description || "No description"} · Owner: {p.owner}
                </p>
              </div>
              <Badge tone={p.status === "active" ? "green" : "slate"}>{p.status}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
