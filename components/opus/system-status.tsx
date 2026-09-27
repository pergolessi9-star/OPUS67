import { StatusBadge, type StatusTone } from "./status-badge";

/**
 * SystemStatus — compact command-surface status bar. Every state is
 * derived from real configuration (environment drivers, module registry,
 * governance config). States: ACTIVE / READY / NOT CONFIGURED / REVIEW /
 * DEGRADED — never faked.
 */
export type SystemState = "ACTIVE" | "READY" | "NOT CONFIGURED" | "REVIEW" | "DEGRADED";

const stateTone: Record<SystemState, StatusTone> = {
  ACTIVE: "active",
  READY: "info",
  "NOT CONFIGURED": "neutral",
  REVIEW: "review",
  DEGRADED: "critical",
};

export function SystemStatusBar({
  items,
}: {
  items: { label: string; state: SystemState; detail?: string }[];
}) {
  return (
    <ul
      aria-label="System status"
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="spectral-card flex flex-col gap-2 px-3 py-2.5"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {item.label}
          </span>
          <StatusBadge tone={stateTone[item.state]} pulse={item.state === "ACTIVE"}>
            {item.state}
          </StatusBadge>
          {item.detail ? (
            <span className="font-mono text-[10px] text-steel">{item.detail}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
