import type { CSSProperties } from "react";

/**
 * Pipeline — abstract, lightweight visualization of the OPUS67 execution
 * chain: HUMAN → AGENT → TOOL → WORKFLOW → EVIDENCE → DECISION.
 * Built purely with geometry, nodes, lines and states — no robots, no AI
 * brains, no stock photography, no cliché circuits. This is the platform's
 * conceptual model, not live data.
 */
const STAGES = [
  { label: "HUMAN", accent: "var(--opus-text)", shape: "circle" },
  { label: "AGENT", accent: "var(--opus-uv)", shape: "hex" },
  { label: "TOOL", accent: "var(--opus-chartreuse)", shape: "diamond" },
  { label: "WORKFLOW", accent: "var(--opus-amber)", shape: "diamond" },
  { label: "EVIDENCE", accent: "var(--opus-cyan)", shape: "square" },
  { label: "DECISION", accent: "var(--opus-coral)", shape: "diamond" },
] as const;

function NodeMarker({
  accent,
  shape,
}: {
  accent: string;
  shape: (typeof STAGES)[number]["shape"];
}) {
  const style = { borderColor: accent, color: accent } as CSSProperties;
  if (shape === "circle") {
    return <span aria-hidden="true" style={style} className="h-3 w-3 rounded-full border-2" />;
  }
  if (shape === "square") {
    return <span aria-hidden="true" style={style} className="h-3 w-3 border-2" />;
  }
  if (shape === "hex") {
    return (
      <span aria-hidden="true" style={style} className="h-3 w-3 border-2 [clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]" />
    );
  }
  return (
    <span aria-hidden="true" style={style} className="h-3 w-3 rotate-45 border-2" />
  );
}

export function Pipeline({ className = "" }: { className?: string }) {
  return (
    <ol
      aria-label="Execution model: human, agent, tool, workflow, evidence, decision"
      className={`flex flex-col gap-0 ${className}`}
    >
      {STAGES.map((stage, i) => (
        <li key={stage.label} className="flex items-stretch gap-3">
          <div className="flex w-3 flex-col items-center">
            {i > 0 ? <span aria-hidden="true" className="spectral-line-v h-4" /> : null}
            <NodeMarker accent={stage.accent} shape={stage.shape} />
            {i < STAGES.length - 1 ? (
              <span aria-hidden="true" className="spectral-line-v h-4" />
            ) : null}
          </div>
          <p
            className="py-1 font-mono text-[11px] uppercase tracking-[0.25em]"
            style={{ color: stage.accent } as CSSProperties}
          >
            {stage.label}
          </p>
        </li>
      ))}
    </ol>
  );
}
