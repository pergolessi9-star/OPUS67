import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import type { EvidenceStatus } from "@/types";

export const metadata: Metadata = { title: "Evidence" };
export const dynamic = "force-dynamic";

const statusTone: Record<EvidenceStatus, "green" | "amber" | "slate" | "red" | "blue"> = {
  UNVERIFIED: "slate",
  SYSTEM_GENERATED: "blue",
  SOURCE_VERIFIED: "blue",
  HUMAN_REVIEWED: "amber",
  APPROVED: "green",
  REJECTED: "red",
};

export default function EvidencePage() {
  const mod = getModule("evidence");
  const evidence = getStore().evidence.list();

  return (
    <div>
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />
      {evidence.length === 0 ? (
        <EmptyState
          title="No evidence records"
          description="Evidence links outputs to provenance, hashes, timestamps and human review. Records are never auto-promoted to APPROVED."
        />
      ) : (
        <ul className="divide-y divide-ink-700 rounded-lg border border-ink-700">
          {evidence.map((e) => (
            <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{e.source}</p>
                <p className="font-mono text-xs text-slate-500">
                  {e.sourceType} · {e.timestamp}
                  {e.hash ? ` · sha256:${e.hash.slice(0, 12)}…` : " · no hash"}
                </p>
              </div>
              <Badge tone={statusTone[e.status]}>{e.status.replaceAll("_", " ")}</Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
