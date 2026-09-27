import type { CSSProperties } from "react";

/**
 * WorkflowNode — node representation for workflow/model diagrams.
 * Connections between nodes use the OPUS67 Spectral Line.
 */
export function WorkflowNode({
  label,
  accent,
  detail,
  last = false,
  first = false,
}: {
  label: string;
  accent: string;
  detail?: string;
  last?: boolean;
  first?: boolean;
}) {
  return (
    <li className="flex items-stretch gap-3">
      <div className="flex w-3 flex-col items-center">
        {!first ? <span aria-hidden="true" className="spectral-line-v h-4" /> : null}
        <span
          aria-hidden="true"
          className="h-3 w-3 rotate-45 border-2"
          style={{ borderColor: accent } as CSSProperties}
        />
        {!last ? <span aria-hidden="true" className="spectral-line-v h-4" /> : null}
      </div>
      <div className="py-1">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.25em]"
          style={{ color: accent } as CSSProperties}
        >
          {label}
        </p>
        {detail ? <p className="mt-0.5 text-xs text-muted">{detail}</p> : null}
      </div>
    </li>
  );
}

export function WorkflowChain({ children }: { children: React.ReactNode }) {
  return <ol className="flex flex-col">{children}</ol>;
}
