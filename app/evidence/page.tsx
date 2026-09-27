import type { Metadata } from "next";
import { getStore } from "@/lib/db/repository";
import { getModule } from "@/lib/utils/module";
import { CommandHeader } from "@/components/opus/command-header";
import { EvidenceRecord } from "@/components/opus/evidence-record";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Evidence" };
export const dynamic = "force-dynamic";

export default function EvidencePage() {
  const mod = getModule("evidence");
  const evidence = getStore().evidence.list();

  return (
    <div>
      <CommandHeader
        eyebrow="OPUS67 // EVIDENCE"
        title="Evidence Ledger"
        description="Traceability records with provenance, SHA-256 hashes, timestamps and explicit human review states. Records are never auto-promoted to APPROVED; no immutability is claimed."
        status="Operational"
        statusTone="active"
      />
      {evidence.length === 0 ? (
        <EmptyState
          title="Evidence ledger empty"
          description="Evidence links outputs to provenance, hashes, timestamps and human review. No records exist yet — nothing is auto-generated or backfilled."
          hint="Records appear here when evidence is registered through the platform."
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="hidden grid-cols-[3rem_8rem_1fr_auto] gap-x-4 px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted sm:grid"
          >
            <span>Entry</span>
            <span>Timestamp</span>
            <span>Source / Hash</span>
            <span className="text-right">Status · Human review</span>
          </div>
          <ol className="spectral-card">
            {evidence.map((e, i) => (
              <EvidenceRecord key={e.id} record={e} index={i} />
            ))}
          </ol>
        </>
      )}
      <p className="mt-6 text-xs text-muted">{mod.statusNote}</p>
    </div>
  );
}
