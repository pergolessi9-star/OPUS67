import type { Evidence } from "@/types";
import { StatusBadge, type StatusTone } from "./status-badge";

/**
 * EvidenceRecord — one row of the EVIDENCE LEDGER. Conceptually inspired
 * by scientific instrumentation: numbered entries, fine rules, monospace
 * identifiers and hashes. No blockchain marketing, no immutability claims.
 */
const evidenceTone: Record<Evidence["status"], StatusTone> = {
  UNVERIFIED: "neutral",
  SYSTEM_GENERATED: "info",
  SOURCE_VERIFIED: "info",
  HUMAN_REVIEWED: "review",
  APPROVED: "active",
  REJECTED: "critical",
};

function humanReviewLabel(status: Evidence["status"]): string {
  if (status === "APPROVED" || status === "REJECTED" || status === "HUMAN_REVIEWED") {
    return "Reviewed";
  }
  return "Pending";
}

export function EvidenceRecord({
  record,
  index,
}: {
  record: Evidence;
  index: number;
}) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-line px-3 py-3 transition-colors duration-150 ease-opus hover:bg-graphite/40 sm:grid-cols-[3rem_8rem_1fr_auto] sm:items-baseline">
      <span className="font-mono text-xs tabular-nums text-muted">
        {String(index + 1).padStart(3, "0")}
      </span>
      <span className="font-mono text-xs text-steel">{record.timestamp}</span>
      <span className="col-span-2 mt-1 min-w-0 sm:col-span-1 sm:mt-0">
        <span className="block truncate text-sm text-ice">{record.source}</span>
        <span className="block truncate font-mono text-xs text-muted">
          {record.sourceType}
          {record.hash ? ` · sha256:${record.hash.slice(0, 16)}…` : " · no hash"}
        </span>
      </span>
      <span className="col-span-2 mt-2 flex flex-wrap items-center gap-2 sm:col-span-1 sm:mt-0 sm:justify-end">
        <StatusBadge tone={evidenceTone[record.status]}>
          {record.status.replaceAll("_", " ")}
        </StatusBadge>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          HR: {humanReviewLabel(record.status)}
        </span>
      </span>
    </li>
  );
}
