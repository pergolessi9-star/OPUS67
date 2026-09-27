import { StatusBadge, type StatusTone } from "@/components/ui/badge";

/**
 * OPUS67 SystemStatus — compact status bar for the command surface.
 * Every state derives from real configuration; states are never faked.
 * Color is never the only indicator: each item carries an explicit label.
 */
export type SystemStatusState =
  | "ACTIVE"
  | "READY"
  | "NOT CONFIGURED"
  | "REVIEW"
  | "DEGRADED";

const stateTone: Record<SystemStatusState, StatusTone> = {
  ACTIVE: "chartreuse",
  READY: "cyan",
  "NOT CONFIGURED": "neutral",
  REVIEW: "amber",
  DEGRADED: "coral",
};

export interface SystemStatusItem {
  label: string;
  state: SystemStatusState;
  note?: string;
}

export function SystemStatus({ items }: { items: SystemStatusItem[] }) {
  return (
    <section aria-label="System status" className="spectral-card px-4 py-3">
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-opus-muted">
              {item.label}
            </span>
            <StatusBadge tone={stateTone[item.state]}>{item.state}</StatusBadge>
            {item.note ? (
              <span className="text-[11px] text-opus-muted">{item.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
