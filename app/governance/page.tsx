import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import {
  GOVERNANCE_CONTROLS,
  REGULATORY_MATRIX,
  REGULATORY_DISCLAIMER,
  type ControlStatus,
} from "@/config/governance";
import { StatusBadge, type StatusTone } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { GovernanceControl } from "@/components/governance/governance-control";

export const metadata: Metadata = { title: "Governance" };

const controlTone: Record<ControlStatus, StatusTone> = {
  IMPLEMENTED: "chartreuse",
  PARTIAL: "cyan",
  PLANNED: "neutral",
  NOT_APPLICABLE: "neutral",
  REQUIRES_ASSESSMENT: "amber",
};

const governanceAreas = [
  {
    title: "AI system inventory",
    description:
      "Register AI systems with owner, purpose and risk classification (minimal / limited / high / unacceptable).",
  },
  {
    title: "Risks and controls",
    description:
      "Link risks to systems and controls to risks, with proposed → implemented → verified control states.",
  },
  {
    title: "Evidence management",
    description:
      "Traceability records with provenance and SHA-256 fingerprinting, reviewed through explicit states.",
  },
  {
    title: "Human oversight records",
    description:
      "Human reviews and decisions are first-class entities: AI output → evidence → human review → decision → audit event.",
  },
  {
    title: "Audit logging",
    description:
      "Structured audit events (actor, action, resource, requestId) that never record secrets.",
  },
];

export default function GovernancePage() {
  const mod = getModule("governance");

  return (
    <div>
      <PageHeader
        title={mod.name}
        description={mod.description}
        status={mod.status}
        statusNote={mod.statusNote}
      />

      <div className="spectral-card mb-8 border-l-2 border-l-opus-amber p-4" role="note">
        <p className="text-sm text-opus-amber">
          OPUS67 provides governance support and compliance-oriented controls.
          It does <strong>not</strong> claim EU AI Act compliance by itself;
          conformity requires organisational measures outside this software.
        </p>
      </div>

      <section aria-labelledby="control-states" className="mb-10">
        <h2
          id="control-states"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Regulatory Controls — Verifiable States
        </h2>
        <p className="mt-2 text-xs text-opus-muted">
          States are IMPLEMENTED / PARTIAL / PLANNED / NOT APPLICABLE / REQUIRES ASSESSMENT.
          &quot;COMPLIANT&quot; is never used as an automatic state.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE_CONTROLS.map((control) => (
            <GovernanceControl
              key={control.slug}
              id={control.slug}
              name={control.name}
              status={control.status}
              summary={control.summary}
            />
          ))}
        </ul>
      </section>

      <section aria-labelledby="regulatory-matrix" className="mb-10">
        <h2
          id="regulatory-matrix"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Governance Control Matrix
        </h2>
        <p className="mt-2 text-xs text-opus-muted">
          Regulation → requirement → control → implementation status → evidence → human
          review → last review. Article references point to Regulation (EU) 2024/1689 and
          Regulation (EU) 2016/679 for orientation; they are not a legal assessment.
        </p>
        <div className="spectral-card mt-4 overflow-x-auto p-0">
          <table className="min-w-full divide-y divide-opus-border/60 text-left text-xs">
            <thead className="text-opus-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">Framework</th>
                <th scope="col" className="px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">Requirement</th>
                <th scope="col" className="px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">Control</th>
                <th scope="col" className="px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">Status</th>
                <th scope="col" className="px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">Evidence</th>
                <th scope="col" className="px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">Human oversight</th>
                <th scope="col" className="px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">Last review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-opus-border/60 text-opus-steel">
              {REGULATORY_MATRIX.map((row) => (
                <tr key={`${row.regulation}-${row.requirement}`}>
                  <td className="whitespace-nowrap px-3 py-2 text-opus-text">{row.regulation}</td>
                  <td className="px-3 py-2">{row.requirement}</td>
                  <td className="px-3 py-2">{row.control}</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <StatusBadge tone={controlTone[row.status]}>
                      {row.status.replaceAll("_", " ")}
                    </StatusBadge>
                  </td>
                  <td className="opus-id px-3 py-2 text-opus-muted">{row.evidence}</td>
                  <td className="whitespace-nowrap px-3 py-2">{row.humanReview}</td>
                  <td className="opus-id whitespace-nowrap px-3 py-2">{row.lastReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="governance-areas" className="mb-10">
        <h2
          id="governance-areas"
          className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-opus-muted"
        >
          Platform Governance Capabilities
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {governanceAreas.map((area) => (
            <li
              key={area.title}
              className="spectral-card p-4"
              style={{ "--module-accent": "var(--opus-amber)" } as React.CSSProperties}
            >
              <h3 className="text-sm font-semibold text-opus-text">{area.title}</h3>
              <p className="mt-1 text-sm text-opus-steel">{area.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-8">
        <EmptyState
          title="No AI systems registered"
          description="The inventory is empty. Registered systems, risks, controls, decisions and human reviews will appear here."
        />
      </div>

      <p className="border-t border-opus-border pt-6 text-xs text-opus-muted">
        {REGULATORY_DISCLAIMER}
      </p>
    </div>
  );
}
