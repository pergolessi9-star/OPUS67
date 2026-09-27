import { Badge } from "@/components/ui/badge";
import type { ModuleStatus } from "@/config/modules";

const statusTone: Record<ModuleStatus, "green" | "amber" | "slate"> = {
  operational: "green",
  configuration_required: "amber",
  planned: "slate",
};

const statusLabel: Record<ModuleStatus, string> = {
  operational: "Operational",
  configuration_required: "Configuration required",
  planned: "Planned",
};

export function PageHeader({
  title,
  description,
  status,
  statusNote,
}: {
  title: string;
  description: string;
  status?: ModuleStatus;
  statusNote?: string;
}) {
  return (
    <div className="mb-8 border-b border-ink-700 pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {status ? <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge> : null}
      </div>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">{description}</p>
      {statusNote ? <p className="mt-1 text-xs text-slate-500">{statusNote}</p> : null}
    </div>
  );
}
