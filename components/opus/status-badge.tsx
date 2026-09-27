import { cn } from "@/lib/utils/cn";

/**
 * StatusBadge — spectral status indicator. The label text is ALWAYS
 * present: color is never the only indicator of state (WCAG 1.4.1).
 *
 * Tone hierarchy (OPUS67 SPECTRAL):
 *  active   → Electric Chartreuse (acción / sistema activo)
 *  info     → Ion Cyan (inteligencia / datos / trazabilidad)
 *  review   → Solar Amber (pendiente / revisión)
 *  critical → Hyper Coral (alertas / decisiones críticas)
 *  agent    → Ultraviolet (agentes / modelos / inferencia)
 *  neutral  → Steel
 */
export type StatusTone =
  | "active"
  | "info"
  | "review"
  | "critical"
  | "agent"
  | "neutral";

const tones: Record<StatusTone, { dot: string; text: string; box: string }> = {
  active: {
    dot: "bg-chartreuse",
    text: "text-chartreuse",
    box: "border-chartreuse/30 bg-chartreuse-dim",
  },
  info: {
    dot: "bg-ion",
    text: "text-ion",
    box: "border-ion/30 bg-ion-dim",
  },
  review: {
    dot: "bg-solar",
    text: "text-solar",
    box: "border-solar/30 bg-solar-dim",
  },
  critical: {
    dot: "bg-coral",
    text: "text-coral",
    box: "border-coral/30 bg-coral-dim",
  },
  agent: {
    dot: "bg-uv",
    text: "text-uv",
    box: "border-uv/30 bg-uv-dim",
  },
  neutral: {
    dot: "bg-steel",
    text: "text-steel",
    box: "border-line bg-graphite/60",
  },
};

export function StatusBadge({
  tone = "neutral",
  pulse = false,
  children,
}: {
  tone?: StatusTone;
  /** Discrete status pulse (disabled automatically under reduced motion). */
  pulse?: boolean;
  children: React.ReactNode;
}) {
  const t = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide",
        t.box,
        t.text,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", t.dot, pulse ? "status-pulse" : "")}
      />
      {children}
    </span>
  );
}
