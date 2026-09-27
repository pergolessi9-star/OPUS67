import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { CommandHeader } from "@/components/opus/command-header";
import { StatusBadge, type StatusTone } from "@/components/opus/status-badge";
import { EmptyState } from "@/components/ui/empty-state";
import type { ProjectStatus } from "@/types";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

const statusTone: Record<ProjectStatus, StatusTone> = {
  draft: "neutral",
  active: "active",
  archived: "review",
};

export default function ProjectsPage() {
  const mod = getModule("projects");
  const projects = getStore().projects.list();

  return (
    <div>
      <CommandHeader
        eyebrow="OPUS67 // PROJECTS"
        title={mod.name}
        description={mod.description}
        status="Operational"
        statusTone="active"
      />
      {projects.length === 0 ? (
        <EmptyState
          title="No projects configured"
          description="Projects group agents, workflows, executions and evidence. None has been registered yet."
          hint="Project registration will be available in a future milestone; the store layer is ready."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id} className="spectral-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-ice">{p.name}</h3>
                <StatusBadge tone={statusTone[p.status]}>{p.status}</StatusBadge>
              </div>
              <p className="mt-1 text-sm text-muted">
                {p.description || "No description"}
              </p>
              <p className="mt-3 border-t border-line pt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                Owner: {p.owner}
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-xs text-muted">{mod.statusNote}</p>
    </div>
  );
}
