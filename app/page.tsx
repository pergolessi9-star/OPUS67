import Link from "next/link";
import { MODULES } from "@/config/modules";
import { PLATFORM } from "@/config/platform";
import { REGULATORY_DISCLAIMER } from "@/config/governance";
import {
  AUTHOR,
  EU_EMBLEM,
  LEGAL_FRAMEWORK_STATEMENT,
  OWN_BADGES,
  PROJECT_STATUS,
  REGULATIONS,
} from "@/config/regulatory";
import { StatusBadge } from "@/components/ui/badge";
import { SpectralLine } from "@/components/spectral/spectral-line";
import { ModuleCard } from "@/components/cards/module-card";
import { RegulatoryBadge } from "@/components/regulatory/regulatory-badge";
import { WorkflowNode } from "@/components/workflows/workflow-node";
import type { ModuleSlug, ModuleStatus } from "@/config/modules";
import type { StatusTone } from "@/components/ui/badge";

const moduleTone: Record<ModuleStatus, StatusTone> = {
  operational: "chartreuse",
  configuration_required: "amber",
  planned: "neutral",
};

const moduleStatusLabel: Record<ModuleStatus, string> = {
  operational: "Operational",
  configuration_required: "Config required",
  planned: "Planned",
};

/**
 * GDPR/RGPD principles the system is PREPARED to document. They are design
 * commitments, not implemented controls — current states are published on
 * /governance (PLANNED / PARTIAL / REQUIRES ASSESSMENT, never "COMPLIANT").
 */
const GDPR_PRINCIPLES = [
  "Lawful basis",
  "Data minimisation",
  "Purpose limitation",
  "Transparency",
  "Access control",
  "Retention",
  "Auditability",
  "Data subject rights",
  "Privacy by design",
  "Privacy by default",
  "Security",
  "Accountability",
] as const;

/** Connector segment of the oversight pipeline: horizontal on desktop, vertical on mobile. */
function FlowConnector() {
  return (
    <>
      <span aria-hidden="true" className="spectral-line mx-1 hidden w-6 shrink-0 lg:block" />
      <span aria-hidden="true" className="spectral-line spectral-line--vertical mx-auto my-1 h-6 lg:hidden" />
    </>
  );
}

/**
 * Abstract oversight chain: HUMAN → AGENT → TOOL → WORKFLOW → EVIDENCE →
 * DECISION. Pure geometry — nodes, lines and states. No robots, no brains,
 * no stock imagery.
 */
function OversightPipeline() {
  const nodes = [
    { kind: "human", label: "Human", detail: "Oversight authority" },
    { kind: "agent", label: "Agent", detail: "Provider + model binding" },
    { kind: "tool", label: "Tool", detail: "Schema-bound capability" },
    { kind: "workflow", label: "Workflow", detail: "Ordered steps" },
    { kind: "evidence", label: "Evidence", detail: "SHA-256 provenance" },
    { kind: "decision", label: "Decision", detail: "Human review gate" },
  ] as const;

  return (
    <div
      role="img"
      aria-label="Oversight chain: human, agent, tool, workflow, evidence, decision — connected by the spectral line."
      className="flex flex-col items-stretch lg:flex-row lg:items-center"
    >
      {nodes.map((node, i) => (
        <div key={node.kind} className="flex min-w-0 flex-1 flex-col items-stretch lg:flex-row lg:items-center">
          {i > 0 ? <FlowConnector /> : null}
          <div className="min-w-0 flex-1">
            <WorkflowNode kind={node.kind} label={node.label} detail={node.detail} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-14">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="intro" className="pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-opus-chartreuse">
          AI Systems Platform
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h1
            id="intro"
            className="font-mono text-4xl font-bold tracking-[0.18em] text-opus-text sm:text-5xl"
          >
            OPUS<span className="text-opus-chartreuse">67</span>
          </h1>
          <StatusBadge tone="amber">
            {PLATFORM.stage} · {PLATFORM.stageLabel}
          </StatusBadge>
        </div>
        <SpectralLine animated className="mt-5 max-w-md" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-opus-steel">
          OPUS67 is a modular technology platform for working with artificial
          intelligence systems: agents, tools, workflows, evidence and
          governance — built for traceability and human oversight.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="border border-opus-chartreuse bg-opus-chartreuse px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-opus-bg transition-colors hover:bg-transparent hover:text-opus-chartreuse"
          >
            Open Dashboard
          </Link>
          <Link
            href="/governance"
            className="border border-opus-border px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-opus-text transition-colors hover:border-opus-amber hover:text-opus-amber"
          >
            Governance
          </Link>
        </div>
      </section>

      {/* ── Oversight pipeline ───────────────────────────────────────── */}
      <section aria-labelledby="oversight-chain">
        <h2
          id="oversight-chain"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Oversight Chain
        </h2>
        <div className="mt-4">
          <OversightPipeline />
        </div>
        <p className="mt-4 text-xs text-opus-muted">
          Every AI output can be traced back through evidence to a human
          decision. Nothing in this chain is simulated.
        </p>
      </section>

      {/* ── European AI governance ───────────────────────────────────── */}
      <section aria-labelledby="eu-ai-governance" className="spectral-card p-6">
        <h2
          id="eu-ai-governance"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-cyan"
        >
          European AI Governance
        </h2>

        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
          <figure className="shrink-0">
            <span className="block w-40 overflow-hidden border border-opus-border bg-white p-1">
              {/* Official reproduction of the EU emblem, byte-identical to the
                  file published at european-union.europa.eu (see
                  docs/REGULATORY-SOURCES.md). Do not recolour or crop. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={EU_EMBLEM.localFile}
                alt={EU_EMBLEM.alt}
                className="h-auto w-full"
              />
            </span>
            <figcaption className="mt-2 max-w-40 text-[10px] leading-snug text-opus-muted">
              Official EU emblem —{" "}
              <a
                href={EU_EMBLEM.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-opus-cyan hover:underline"
              >
                european-union.europa.eu
              </a>
            </figcaption>
          </figure>

          <div className="min-w-0 flex-1">
            <dl className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold uppercase tracking-widest text-opus-text">
                  {REGULATIONS.aiAct.label}
                </dt>
                <dd className="text-sm text-opus-steel">
                  <a
                    href={REGULATIONS.aiAct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-opus-cyan hover:underline"
                  >
                    {REGULATIONS.aiAct.citation}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold uppercase tracking-widest text-opus-text">
                  {REGULATIONS.gdpr.label}
                </dt>
                <dd className="text-sm text-opus-steel">
                  <a
                    href={REGULATIONS.gdpr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-opus-cyan hover:underline"
                  >
                    {REGULATIONS.gdpr.citation}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold tracking-widest text-opus-text">
                  OPUS67
                </dt>
                <dd className="text-sm text-opus-steel">
                  {PLATFORM.stage} — {PLATFORM.stageLabel}
                </dd>
              </div>
            </dl>

            <p className="mt-4 max-w-3xl text-sm text-opus-steel">
              {LEGAL_FRAMEWORK_STATEMENT}
            </p>
          </div>
        </div>

        <ul
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          aria-label="OPUS67 own informative badges"
        >
          {OWN_BADGES.map((badge) => (
            <RegulatoryBadge
              key={badge.label}
              label={badge.label}
              sublabel={badge.sublabel ?? undefined}
              href={badge.href}
            />
          ))}
        </ul>
        <p className="mt-4 text-xs text-opus-muted">
          OPUS67 badges are the platform&apos;s own informative design. They are
          not certificates, seals or endorsements issued by the European Union
          or any other institution.
        </p>
      </section>

      {/* ── Project status ───────────────────────────────────────────── */}
      <section aria-labelledby="project-status" className="spectral-card p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="project-status"
            className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
          >
            Project Status
          </h2>
          <StatusBadge tone="amber">
            {PLATFORM.stage} · {PLATFORM.stageLabel}
          </StatusBadge>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-opus-steel">{PLATFORM.stageNote}</p>
        <dl className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {PROJECT_STATUS.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-4 border-b border-opus-border/60 pb-2"
            >
              <dt className="text-sm text-opus-muted">{item.label}:</dt>
              <dd className="text-right font-mono text-sm text-opus-text">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── GDPR / RGPD ──────────────────────────────────────────────── */}
      <section aria-labelledby="gdpr-rgpd" className="spectral-card p-6">
        <h2 id="gdpr-rgpd" className="text-lg font-semibold text-opus-text">
          GDPR / RGPD
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-opus-steel">
          OPUS67 incorporates privacy-by-design and data-governance principles
          intended to support operation aligned with Regulation (EU) 2016/679.
        </p>
        <p className="mt-4 text-xs uppercase tracking-wide text-opus-muted">
          Principles the system is prepared to document — current states on{" "}
          <Link href="/governance#data-governance" className="text-opus-cyan hover:underline">
            Governance
          </Link>
          :
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="GDPR principles">
          {GDPR_PRINCIPLES.map((principle) => (
            <li key={principle}>
              <StatusBadge tone="neutral">{principle}</StatusBadge>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Modules ──────────────────────────────────────────────────── */}
      <section aria-labelledby="modules">
        <h2 id="modules" className="text-lg font-semibold text-opus-text">
          Modules
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.filter((m) => m.slug !== "dashboard").map((mod) => (
            <li key={mod.slug}>
              <ModuleCard
                slug={mod.slug as ModuleSlug}
                name={mod.name}
                description={mod.description}
                href={mod.href}
                status={moduleTone[mod.status]}
                statusLabel={moduleStatusLabel[mod.status]}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ── Design principles ────────────────────────────────────────── */}
      <section aria-labelledby="principles" className="spectral-card p-6">
        <h2 id="principles" className="text-lg font-semibold text-opus-text">
          Design principles
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-opus-steel sm:grid-cols-2">
          <li>Correctness before features.</li>
          <li>Security and traceability by design.</li>
          <li>No simulated functionality presented as real.</li>
          <li>Explicit empty states instead of invented metrics.</li>
          <li>Human oversight over relevant AI operations.</li>
          <li>Compliance-oriented controls — no automatic compliance claims.</li>
        </ul>
      </section>

      <footer className="space-y-3 border-t border-opus-border pt-6 text-xs text-opus-muted">
        <p>{REGULATORY_DISCLAIMER}</p>
        <p>
          {AUTHOR.heading}: {AUTHOR.name}
        </p>
        <p>
          <Link href="/legal/ai" className="text-opus-cyan hover:underline">
            Artificial Intelligence Legal Notice
          </Link>
        </p>
      </footer>
    </div>
  );
}
