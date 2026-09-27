import { cn } from "@/lib/utils/cn";

/**
 * HumanOversightGate — visual representation of the OPUS67 oversight
 * policy: certain processes require human intervention before a final
 * decision is produced. This is the DECLARED PLATFORM POLICY (governance
 * config), not fabricated record data: no HumanReview records exist yet
 * in the MVP store.
 */
const GATE_STATES = [
  { label: "AUTOMATED", tone: "text-steel border-line", active: false },
  { label: "HUMAN REVIEW REQUIRED", tone: "text-solar border-solar/40 bg-solar-dim", active: true },
  { label: "APPROVED", tone: "text-chartreuse border-line", active: false },
  { label: "REJECTED", tone: "text-coral border-line", active: false },
  { label: "ESCALATED", tone: "text-uv border-line", active: false },
] as const;

export function HumanOversightGate() {
  return (
    <section
      aria-labelledby="human-oversight-gate"
      className="spectral-card p-5"
      style={{ "--card-accent": "var(--opus-amber)" } as React.CSSProperties}
    >
      <h2
        id="human-oversight-gate"
        className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-solar"
      >
        Human Oversight Gate
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-steel">
        Platform policy: relevant AI operations require human intervention
        before a definitive decision is produced. No HumanReview records
        exist yet (MVP) — this gate shows the policy states, not live data.
      </p>
      <ol
        aria-label="Oversight gate states"
        className="mt-4 flex flex-wrap items-center gap-2"
      >
        {GATE_STATES.map((state, i) => (
          <li key={state.label} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true" className="spectral-line w-4" /> : null}
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide",
                state.tone,
              )}
            >
              {state.label}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
        Current policy state:{" "}
        <span className="text-solar">Human review required</span>.
      </p>
    </section>
  );
}
