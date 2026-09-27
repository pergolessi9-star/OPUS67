import Link from "next/link";
import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import type { ControlStatus } from "@/config/governance";

/**
 * OPUS67 GovernanceControl — one verifiable control with an explicit status.
 * Statuses are evidence-based: IMPLEMENTED only when evidence exists, never
 * "COMPLIANT". Amber signals assessment/review is still required.
 */
const statusTone: Record<ControlStatus, StatusTone> = {
  IMPLEMENTED: "chartreuse",
  PARTIAL: "cyan",
  PLANNED: "neutral",
  NOT_APPLICABLE: "neutral",
  REQUIRES_ASSESSMENT: "amber",
};

export function GovernanceControl({
  id,
  name,
  status,
  summary,
  href,
}: {
  id?: string;
  name: string;
  status: ControlStatus;
  summary: string;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-opus-text">{name}</p>
        <StatusBadge tone={statusTone[status]}>{status.replaceAll("_", " ")}</StatusBadge>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-opus-muted">{summary}</p>
    </>
  );

  const className = "spectral-card block scroll-mt-20 p-4";
  const style = { "--module-accent": "var(--opus-amber)" } as React.CSSProperties;

  if (href) {
    return (
      <li id={id}>
        <Link href={href} className={className} style={style}>
          {body}
        </Link>
      </li>
    );
  }
  return (
    <li id={id} className={className} style={style}>
      {body}
    </li>
  );
}
