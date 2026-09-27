import { SpectralLine } from "@/components/spectral/spectral-line";
import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import type { ModuleStatus } from "@/config/modules";

const statusTone: Record<ModuleStatus, StatusTone> = {
  operational: "chartreuse",
  configuration_required: "amber",
  planned: "neutral",
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
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-opus-text">{title}</h1>
        {status ? <StatusBadge tone={statusTone[status]}>{statusLabel[status]}</StatusBadge> : null}
      </div>
      <SpectralLine className="mt-3 w-40" />
      <p className="mt-3 max-w-2xl text-sm text-opus-steel">{description}</p>
      {statusNote ? <p className="mt-1 text-xs text-opus-muted">{statusNote}</p> : null}
    </div>
  );
}
