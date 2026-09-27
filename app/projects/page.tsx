import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import type { ProjectStatus } from "@/types";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

const statusTone: Record<ProjectStatus, StatusTone> = {
  draft: "neutral",
  active: "chartreuse",
  archived: "neutral",
};

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
        <ul className="grid gap-3">
          {projects.map((p) => (
            <li
              key={p.id}
              className="spectral-card p-4"
              style={{ "--module-accent": "var(--opus-chartreuse)" } as React.CSSProperties}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-opus-text">{p.name}</p>
                <StatusBadge tone={statusTone[p.status]}>{p.status}</StatusBadge>
              </div>
              <p className="mt-1 text-xs text-opus-muted">
                {p.description || "No description"} · Owner:{" "}
                <span className="text-opus-steel">{p.owner}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
