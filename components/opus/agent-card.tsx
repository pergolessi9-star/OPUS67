import type { CSSProperties } from "react";
import type { Agent } from "@/types";
import { StatusBadge, type StatusTone } from "./status-badge";

/**
 * AgentCard — honest agent representation. Provider/model come from the
 * record itself; if none is configured the card says so — a provider is
 * never claimed when not configured.
 */
const agentTone: Record<Agent["status"], StatusTone> = {
  draft: "neutral",
  active: "active",
  paused: "review",
  disabled: "critical",
};

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</dt>
      <dd className={`mt-0.5 text-sm text-steel ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}

export function AgentCard({ agent }: { agent: Agent }) {
  const providerConfigured = agent.provider.trim().length > 0;
  return (
    <article
      className="spectral-card p-4"
      style={{ "--card-accent": "var(--opus-uv-deep)" } as CSSProperties}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium text-ice">{agent.name}</h3>
        <StatusBadge tone={agentTone[agent.status]}>{agent.status}</StatusBadge>
      </div>
      {agent.description ? (
        <p className="mt-1 text-sm text-muted">{agent.description}</p>
      ) : null}

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Field
          label="Provider"
          value={providerConfigured ? agent.provider : "No provider configured"}
          mono={providerConfigured}
        />
        <Field
          label="Model"
          value={agent.model.trim().length > 0 ? agent.model : "—"}
          mono
        />
        <Field label="Tools" value={String(agent.tools.length)} mono />
        <Field label="Last activity" value="None recorded" />
      </dl>

      {/* Agent → Tools → Workflow → Evidence */}
      <ol
        aria-label="Agent binding chain"
        className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest"
      >
        {["Agent", "Tools", "Workflow", "Evidence"].map((stage, i) => (
          <li key={stage} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true" className="spectral-line w-4" /> : null}
            <span className={i === 0 ? "text-uv" : "text-steel"}>{stage}</span>
          </li>
        ))}
      </ol>

      <p className="mt-3 border-t border-line pt-3 text-xs text-muted">
        Governance state:{" "}
        <span className="text-solar">Human review required before execution</span>
        {" — platform policy (MVP)."}
      </p>
    </article>
  );
}
