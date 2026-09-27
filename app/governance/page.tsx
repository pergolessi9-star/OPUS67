import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import {
  GOVERNANCE_CONTROLS,
  REGULATORY_MATRIX,
  REGULATORY_DISCLAIMER,
  type ControlStatus,
} from "@/config/governance";
import { CommandHeader } from "@/components/opus/command-header";
import { HumanOversightGate } from "@/components/opus/human-oversight-gate";
import { StatusBadge, type StatusTone } from "@/components/opus/status-badge";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Governance" };

const controlTone: Record<ControlStatus, StatusTone> = {
  IMPLEMENTED: "active",
  PARTIAL: "review",
  PLANNED: "neutral",
  NOT_APPLICABLE: "neutral",
  REQUIRES_ASSESSMENT: "info",
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
      <CommandHeader
        eyebrow="OPUS67 // GOVERNANCE"
        title="Governance Control Matrix"
        description={mod.description}
        status="Operational"
        statusTone="active"
      />

      <div className="spectral-card mb-8 p-4" style={{ "--card-accent": "var(--opus-amber)" } as React.CSSProperties}>
        <p className="text-sm text-solar">
          OPUS67 provides governance support and compliance-oriented controls.
          It does <strong>not</strong> claim EU AI Act compliance by itself;
          conformity requires organisational measures outside this software.
        </p>
      </div>

      <div className="mb-10">
        <HumanOversightGate />
      </div>

      <section aria-labelledby="control-states" className="mb-10">
        <h2
          id="control-states"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Regulatory controls — verifiable states
        </h2>
        <p className="mt-1 text-xs text-muted">
          States are IMPLEMENTED / PARTIAL / PLANNED / NOT APPLICABLE / REQUIRES ASSESSMENT.
          &quot;COMPLIANT&quot; is never used as an automatic state.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE_CONTROLS.map((control) => (
            <li
              key={control.slug}
              id={control.slug}
              className="spectral-card scroll-mt-20 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-ice">{control.name}</h3>
                <StatusBadge tone={controlTone[control.status]}>
                  {control.status.replaceAll("_", " ")}
                </StatusBadge>
              </div>
              <p className="mt-2 text-xs text-muted">{control.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="regulatory-matrix" className="mb-10">
        <h2
          id="regulatory-matrix"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Regulatory traceability matrix
        </h2>
        <p className="mt-1 text-xs text-muted">
          Regulation → requirement → control → implementation status → evidence → human
          review → last review. Article references point to Regulation (EU) 2024/1689 and
          Regulation (EU) 2016/679 for orientation; they are not a legal assessment.
        </p>
        <div className="spectral-card mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-line text-left text-xs">
            <thead className="bg-graphite/60 text-steel">
              <tr>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Control</th>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Framework</th>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Requirement</th>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Status</th>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Evidence</th>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Owner</th>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Human oversight</th>
                <th scope="col" className="px-3 py-2 font-mono font-medium uppercase tracking-wider">Last review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-steel">
              {REGULATORY_MATRIX.map((row) => (
                <tr key={`${row.regulation}-${row.requirement}`}>
                  <td className="px-3 py-2">{row.control}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-ion">
                    {row.regulation}
                  </td>
                  <td className="px-3 py-2">{row.requirement}</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <StatusBadge tone={controlTone[row.status]}>
                      {row.status.replaceAll("_", " ")}
                    </StatusBadge>
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px] text-muted">{row.evidence}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted">Unassigned — MVP</td>
                  <td className="whitespace-nowrap px-3 py-2">{row.humanReview}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-[11px]">{row.lastReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="governance-areas" className="mb-10">
        <h2
          id="governance-areas"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Platform governance capabilities
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {governanceAreas.map((area) => (
            <li key={area.title} className="spectral-card p-4">
              <h3 className="text-sm font-semibold text-ice">{area.title}</h3>
              <p className="mt-1 text-sm text-muted">{area.description}</p>
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

      <p className="border-t border-line pt-6 text-xs text-muted">
        {REGULATORY_DISCLAIMER}
      </p>
    </div>
  );
}
