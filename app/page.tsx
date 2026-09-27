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
import { CommandHeader } from "@/components/opus/command-header";
import { ModuleCard } from "@/components/opus/module-card";
import { Pipeline } from "@/components/opus/pipeline";
import { RegulatoryBadge } from "@/components/opus/regulatory-badge";
import { SpectralLine } from "@/components/opus/spectral-line";
import { StatusBadge, type StatusTone } from "@/components/opus/status-badge";
import {
  AgentsIcon,
  EvidenceIcon,
  GovernanceIcon,
  ProjectsIcon,
  SettingsIcon,
  ToolsIcon,
  WorkflowsIcon,
} from "@/components/opus/icons";

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

const MODULE_META: Record<
  string,
  { accent: string; icon: (props: { className?: string }) => React.ReactNode }
> = {
  projects: { accent: "var(--opus-steel)", icon: ProjectsIcon },
  agents: { accent: "var(--opus-uv-deep)", icon: AgentsIcon },
  tools: { accent: "var(--opus-chartreuse)", icon: ToolsIcon },
  workflows: { accent: "var(--opus-amber)", icon: WorkflowsIcon },
  evidence: { accent: "var(--opus-cyan)", icon: EvidenceIcon },
  governance: { accent: "var(--opus-coral)", icon: GovernanceIcon },
  settings: { accent: "var(--opus-muted)", icon: SettingsIcon },
};

const moduleStatus: Record<string, { label: string; tone: StatusTone }> = {
  operational: { label: "Operational", tone: "active" },
  configuration_required: { label: "Config required", tone: "review" },
  planned: { label: "Planned", tone: "neutral" },
};

// Non-undefined fallbacks (noUncheckedIndexedAccess makes every Record lookup T | undefined).
const FALLBACK_MODULE_META = { accent: "var(--opus-steel)", icon: ProjectsIcon };
const FALLBACK_MODULE_STATUS: { label: string; tone: StatusTone } = { label: "Planned", tone: "neutral" };

export default function HomePage() {
  return (
    <div className="space-y-14">
      {/* HERO */}
      <section aria-labelledby="intro" className="pt-4">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ion">
              AI Systems Platform
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <h1 id="intro" className="font-mono text-5xl font-bold tracking-widest sm:text-6xl">
                <span className="text-ice">OPUS</span>
                <span className="text-chartreuse">67</span>
              </h1>
              <StatusBadge tone="review" pulse>
                {PLATFORM.stage} — {PLATFORM.stageLabel}
              </StatusBadge>
            </div>
            <p className="mt-4 max-w-2xl text-lg text-steel">
              OPUS67 is a modular technology platform for working with artificial
              intelligence systems: agents, tools, workflows, evidence and
              governance — built for traceability and human oversight.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="min-h-11 rounded-opus bg-chartreuse px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-obsidian transition-colors duration-150 ease-opus hover:bg-ice"
              >
                Open Dashboard
              </Link>
              <Link
                href="/governance"
                className="min-h-11 rounded-opus border border-line-strong px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-ice transition-colors duration-150 ease-opus hover:border-ion hover:text-ion"
              >
                Governance
              </Link>
            </div>
          </div>
          <div className="spectral-card p-5" style={{ "--card-accent": "var(--opus-chartreuse)" } as React.CSSProperties}>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Execution model
            </p>
            <Pipeline />
          </div>
        </div>
        <div className="mt-10">
          <SpectralLine />
        </div>
      </section>

      {/* EUROPEAN AI GOVERNANCE */}
      <section
        aria-labelledby="eu-ai-governance"
        className="spectral-card p-6"
        style={{ "--card-accent": "var(--opus-cyan)" } as React.CSSProperties}
      >
        <h2
          id="eu-ai-governance"
          className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-ion"
        >
          European AI Governance
        </h2>

        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
          <figure className="shrink-0">
            <span className="block w-40 overflow-hidden rounded-opus border border-line bg-white p-1">
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
            <figcaption className="mt-2 max-w-40 text-[10px] leading-snug text-muted">
              Official EU emblem —{" "}
              <a
                href={EU_EMBLEM.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ion hover:underline"
              >
                european-union.europa.eu
              </a>
            </figcaption>
          </figure>

          <div className="min-w-0 flex-1">
            <dl className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold uppercase tracking-widest text-ice">
                  {REGULATIONS.aiAct.label}
                </dt>
                <dd className="text-sm text-steel">
                  <a
                    href={REGULATIONS.aiAct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ion hover:underline"
                  >
                    {REGULATIONS.aiAct.citation}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold uppercase tracking-widest text-ice">
                  {REGULATIONS.gdpr.label}
                </dt>
                <dd className="text-sm text-steel">
                  <a
                    href={REGULATIONS.gdpr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ion hover:underline"
                  >
                    {REGULATIONS.gdpr.citation}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold tracking-widest text-ice">
                  OPUS67
                </dt>
                <dd className="text-sm text-steel">
                  {PLATFORM.stage} — {PLATFORM.stageLabel}
                </dd>
              </div>
            </dl>

            <p className="mt-4 max-w-3xl text-sm text-steel">
              {LEGAL_FRAMEWORK_STATEMENT}
            </p>
          </div>
        </div>

        <ul
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          aria-label="OPUS67 own informative badges"
        >
          {OWN_BADGES.map((badge) => (
            <li key={badge.label}>
              <RegulatoryBadge
                label={badge.label}
                sublabel={badge.sublabel}
                href={badge.href}
              />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">
          OPUS67 badges are the platform&apos;s own informative design. They are
          not certificates, seals or endorsements issued by the European Union
          or any other institution.
        </p>
      </section>

      {/* PROJECT STATUS */}
      <section
        aria-labelledby="project-status"
        className="spectral-card p-6"
        style={{ "--card-accent": "var(--opus-amber)" } as React.CSSProperties}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="project-status"
            className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-solar"
          >
            Project Status
          </h2>
          <StatusBadge tone="review">
            {PLATFORM.stage} — {PLATFORM.stageLabel}
          </StatusBadge>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-muted">{PLATFORM.stageNote}</p>
        <dl className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {PROJECT_STATUS.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-4 border-b border-line pb-2"
            >
              <dt className="text-sm text-muted">{item.label}:</dt>
              <dd className="text-right font-mono text-sm text-ice">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* GDPR / RGPD */}
      <section
        aria-labelledby="gdpr-rgpd"
        className="spectral-card p-6"
        style={{ "--card-accent": "var(--opus-cyan)" } as React.CSSProperties}
      >
        <h2 id="gdpr-rgpd" className="text-lg font-semibold text-ice">
          GDPR / RGPD
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-steel">
          OPUS67 incorporates privacy-by-design and data-governance principles
          intended to support operation aligned with Regulation (EU) 2016/679.
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
          Principles the system is prepared to document — current states on{" "}
          <Link href="/governance#data-governance" className="text-ion hover:underline">
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

      {/* MODULES */}
      <section aria-labelledby="modules">
        <CommandHeader
          eyebrow="OPUS67 // MODULES"
          title="Modules"
          description="Each module carries its own secondary chromatic identity within the shared spectral grammar. Statuses come from the live module registry."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.filter((m) => m.slug !== "dashboard").map((mod) => {
            const meta = MODULE_META[mod.slug] ?? FALLBACK_MODULE_META;
            const status = moduleStatus[mod.status] ?? FALLBACK_MODULE_STATUS;
            const Icon = meta.icon;
            return (
              <li key={mod.slug}>
                <ModuleCard
                  href={mod.href}
                  name={mod.name}
                  description={mod.description}
                  statusLabel={status.label}
                  statusTone={status.tone}
                  accent={meta.accent}
                  icon={<Icon />}
                />
              </li>
            );
          })}
        </ul>
      </section>

      {/* DESIGN PRINCIPLES */}
      <section aria-labelledby="principles" className="spectral-card p-6">
        <h2 id="principles" className="text-lg font-semibold text-ice">
          Design principles
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <li>Correctness before features.</li>
          <li>Security and traceability by design.</li>
          <li>No simulated functionality presented as real.</li>
          <li>Explicit empty states instead of invented metrics.</li>
          <li>Human oversight over relevant AI operations.</li>
          <li>Compliance-oriented controls — no automatic compliance claims.</li>
        </ul>
      </section>

      <footer className="space-y-3 border-t border-line pt-6 text-xs text-muted">
        <p>{REGULATORY_DISCLAIMER}</p>
        <p>
          {AUTHOR.heading}: {AUTHOR.name}
        </p>
        <p>
          <Link href="/legal/ai" className="text-ion hover:underline">
            Artificial Intelligence Legal Notice
          </Link>
        </p>
      </footer>
    </div>
  );
}
