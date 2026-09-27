import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import type { EvidenceStatus } from "@/types";

/**
 * OPUS67 EvidenceRecord — one row of the Evidence Ledger. Conceptually
 * inspired by scientific instrumentation: precise identifiers, monospace
 * hashes, explicit review states. Records are never auto-promoted.
 */
const statusTone: Record<EvidenceStatus, StatusTone> = {
  UNVERIFIED: "neutral",
  SYSTEM_GENERATED: "cyan",
  SOURCE_VERIFIED: "cyan",
  HUMAN_REVIEWED: "amber",
  APPROVED: "chartreuse",
  REJECTED: "coral",
};

export function EvidenceRecord({
  id,
  source,
  sourceType,
  timestamp,
  hash,
  status,
}: {
  id: string;
  source: string;
  sourceType: string;
  timestamp: string;
  hash?: string | null;
  status: EvidenceStatus;
}) {
  return (
    <li className="spectral-card px-4 py-3" style={{ "--module-accent": "var(--opus-cyan)" } as React.CSSProperties}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-opus-text">{source}</p>
        <StatusBadge tone={statusTone[status]}>{status.replaceAll("_", " ")}</StatusBadge>
      </div>
      <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
        <div className="flex gap-1.5">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-opus-muted">ID</dt>
          <dd className="opus-id text-opus-steel">{id.slice(0, 8)}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-opus-muted">Source</dt>
          <dd className="opus-id text-opus-steel">{sourceType}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-opus-muted">Time</dt>
          <dd className="opus-id text-opus-steel">{timestamp}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-mono text-[10px] uppercase tracking-wider text-opus-muted">SHA-256</dt>
          <dd className="opus-id text-opus-cyan">
            {hash ? `${hash.slice(0, 12)}…` : "pending"}
          </dd>
        </div>
      </dl>
    </li>
  );
}
