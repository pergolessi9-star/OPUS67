import { StatusBadge, type StatusTone } from "@/components/ui/badge";

/**
 * OPUS67 HumanOversightGate — marks a process step that requires human
 * intervention before any definitive decision. States are explicit and
 * color is never the only indicator.
 */
export type OversightState =
  | "AUTOMATED"
  | "HUMAN REVIEW REQUIRED"
  | "APPROVED"
  | "REJECTED"
  | "ESCALATED";

const gateTone: Record<OversightState, StatusTone> = {
  AUTOMATED: "cyan",
  "HUMAN REVIEW REQUIRED": "amber",
  APPROVED: "chartreuse",
  REJECTED: "coral",
  ESCALATED: "ultraviolet",
};

export function HumanOversightGate({
  state,
  label = "Human Oversight Gate",
  description,
}: {
  state: OversightState;
  label?: string;
  description?: string;
}) {
  return (
    <div
      role="status"
      className="spectral-card flex items-center gap-3 px-4 py-3"
      style={{ "--module-accent": "var(--opus-amber)" } as React.CSSProperties}
    >
      <svg
        aria-hidden="true"
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--opus-amber)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-opus-muted">{label}</p>
        {description ? <p className="mt-0.5 text-xs text-opus-steel">{description}</p> : null}
      </div>
      <StatusBadge tone={gateTone[state]} pulse={state === "HUMAN REVIEW REQUIRED"}>
        {state}
      </StatusBadge>
    </div>
  );
}
