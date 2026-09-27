import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { EvidenceRecord } from "@/components/evidence/evidence-record";

export const metadata: Metadata = { title: "Evidence" };
export const dynamic = "force-dynamic";

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
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-opus-muted">
        Evidence Ledger
      </p>
      {evidence.length === 0 ? (
        <EmptyState
          title="No evidence records"
          description="Evidence links outputs to provenance, hashes, timestamps and human review. Records are never auto-promoted to APPROVED."
        />
      ) : (
        <ol className="grid gap-3">
          {evidence.map((e) => (
            <EvidenceRecord
              key={e.id}
              id={e.id}
              source={e.source}
              sourceType={e.sourceType}
              timestamp={e.timestamp}
              hash={e.hash ?? undefined}
              status={e.status}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
