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
import { Badge } from "@/components/ui/badge";

const statusTone = {
  operational: "green",
  configuration_required: "amber",
  planned: "slate",
} as const;

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

export default function HomePage() {
  return (
    <div className="space-y-14">
      <section aria-labelledby="intro" className="pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          AI systems platform
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <h1 id="intro" className="font-mono text-4xl font-bold tracking-widest text-white sm:text-5xl">
            OPUS<span className="text-accent">67</span>
          </h1>
          <Badge tone="amber">
            {PLATFORM.stage} — {PLATFORM.stageLabel}
          </Badge>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          OPUS67 is a modular technology platform for working with artificial
          intelligence systems: agents, tools, workflows, evidence and
          governance — built for traceability and human oversight.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-muted"
          >
            Open dashboard
          </Link>
          <Link
            href="/governance"
            className="rounded-md border border-ink-600 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-ink-800"
          >
            Governance model
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="eu-ai-governance"
        className="rounded-lg border border-ink-700 bg-ink-900/40 p-6"
      >
        <h2
          id="eu-ai-governance"
          className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent"
        >
          European AI Governance
        </h2>

        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
          <figure className="shrink-0">
            <span className="block w-40 overflow-hidden rounded-md border border-ink-600 bg-white p-1">
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
            <figcaption className="mt-2 max-w-40 text-[10px] leading-snug text-slate-500">
              Official EU emblem —{" "}
              <a
                href={EU_EMBLEM.sourcePage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                european-union.europa.eu
              </a>
            </figcaption>
          </figure>

          <div className="min-w-0 flex-1">
            <dl className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold uppercase tracking-widest text-white">
                  {REGULATIONS.aiAct.label}
                </dt>
                <dd className="text-sm text-slate-400">
                  <a
                    href={REGULATIONS.aiAct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent hover:underline"
                  >
                    {REGULATIONS.aiAct.citation}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold uppercase tracking-widest text-white">
                  {REGULATIONS.gdpr.label}
                </dt>
                <dd className="text-sm text-slate-400">
                  <a
                    href={REGULATIONS.gdpr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent hover:underline"
                  >
                    {REGULATIONS.gdpr.citation}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <dt className="font-mono text-sm font-semibold tracking-widest text-white">
                  OPUS67
                </dt>
                <dd className="text-sm text-slate-400">
                  {PLATFORM.stage} — {PLATFORM.stageLabel}
                </dd>
              </div>
            </dl>

            <p className="mt-4 max-w-3xl text-sm text-slate-300">
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
              <Link
                href={badge.href}
                className="block h-full rounded-md border border-accent/50 bg-accent/10 px-3 py-2 text-center transition-colors hover:bg-accent/20"
              >
                <span className="block font-mono text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {badge.label}
                </span>
                {badge.sublabel ? (
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-slate-400">
                    {badge.sublabel}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-slate-500">
          OPUS67 badges are the platform&apos;s own informative design. They are
          not certificates, seals or endorsements issued by the European Union
          or any other institution.
        </p>
      </section>

      <section
        aria-labelledby="project-status"
        className="rounded-lg border border-ink-700 bg-ink-900/40 p-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="project-status"
            className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-accent"
          >
            Project Status
          </h2>
          <Badge tone="amber">
            {PLATFORM.stage} — {PLATFORM.stageLabel}
          </Badge>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-slate-400">{PLATFORM.stageNote}</p>
        <dl className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {PROJECT_STATUS.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-4 border-b border-ink-800 pb-2"
            >
              <dt className="text-sm text-slate-400">{item.label}:</dt>
              <dd className="text-right font-mono text-sm text-slate-200">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="gdpr-rgpd"
        className="rounded-lg border border-ink-700 bg-ink-900/40 p-6"
      >
        <h2 id="gdpr-rgpd" className="text-lg font-semibold text-white">
          GDPR / RGPD
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-300">
          OPUS67 incorporates privacy-by-design and data-governance principles
          intended to support operation aligned with Regulation (EU) 2016/679.
        </p>
        <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
          Principles the system is prepared to document — current states on{" "}
          <Link href="/governance#data-governance" className="text-accent hover:underline">
            Governance
          </Link>
          :
        </p>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="GDPR principles">
          {GDPR_PRINCIPLES.map((principle) => (
            <li key={principle}>
              <Badge tone="slate">{principle}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="modules">
        <h2 id="modules" className="text-lg font-semibold text-white">
          Modules
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.filter((m) => m.slug !== "dashboard").map((mod) => (
            <li key={mod.slug}>
              <Link
                href={mod.href}
                className="block h-full rounded-lg border border-ink-700 bg-ink-900/50 p-4 transition-colors hover:border-accent/60"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-white">{mod.name}</h3>
                  <Badge tone={statusTone[mod.status]}>
                    {mod.status === "operational"
                      ? "Operational"
                      : mod.status === "configuration_required"
                        ? "Config required"
                        : "Planned"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-400">{mod.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="principles" className="rounded-lg border border-ink-700 bg-ink-900/40 p-6">
        <h2 id="principles" className="text-lg font-semibold text-white">
          Design principles
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
          <li>Correctness before features.</li>
          <li>Security and traceability by design.</li>
          <li>No simulated functionality presented as real.</li>
          <li>Explicit empty states instead of invented metrics.</li>
          <li>Human oversight over relevant AI operations.</li>
          <li>Compliance-oriented controls — no automatic compliance claims.</li>
        </ul>
      </section>

      <footer className="space-y-3 border-t border-ink-700 pt-6 text-xs text-slate-500">
        <p>{REGULATORY_DISCLAIMER}</p>
        <p>
          {AUTHOR.heading}: {AUTHOR.name}
        </p>
        <p>
          <Link href="/legal/ai" className="text-accent hover:underline">
            Artificial Intelligence Legal Notice
          </Link>
        </p>
      </footer>
    </div>
  );
}
