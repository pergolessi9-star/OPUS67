import { cn } from "@/lib/utils/cn";

/**
 * OPUS67 StatusBadge — chromatic state + text label + status dot.
 * Color is never the only indicator: the label text always accompanies it.
 *
 * Hierarchy (Spectral System):
 * chartreuse = action / active system · cyan = intelligence / traceability
 * coral = alerts / critical · amber = pending / review · ultraviolet = agents
 */
export type StatusTone =
  | "chartreuse"
  | "cyan"
  | "coral"
  | "amber"
  | "ultraviolet"
  | "neutral";

const toneStyles: Record<StatusTone, string> = {
  chartreuse: "border-opus-chartreuse/40 text-opus-chartreuse",
  cyan: "border-opus-cyan/40 text-opus-cyan",
  coral: "border-opus-coral/50 text-opus-coral",
  amber: "border-opus-amber/50 text-opus-amber",
  ultraviolet: "border-opus-ultraviolet/50 text-opus-ultraviolet-hi",
  neutral: "border-opus-border text-opus-steel",
};

export function StatusBadge({
  tone = "neutral",
  pulse = false,
  children,
  className,
}: {
  tone?: StatusTone;
  /** One discreet confirmation beat (never constant). Reduced-motion safe. */
  pulse?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-opus-elevated/60 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider",
        toneStyles[tone],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("status-dot", pulse && "status-dot--pulse")} />
      {children}
    </span>
  );
}

/**
 * Backwards-compatible alias during the Spectral migration.
 * Prefer StatusBadge with an explicit spectral tone.
 */
export function Badge({
  tone,
  children,
}: {
  tone?: "green" | "amber" | "slate" | "red" | "blue";
  children: React.ReactNode;
}) {
  const map: Record<string, StatusTone> = {
    green: "chartreuse",
    amber: "amber",
    slate: "neutral",
    red: "coral",
    blue: "cyan",
  };
  return <StatusBadge tone={tone ? map[tone] : "neutral"}>{children}</StatusBadge>;
}
