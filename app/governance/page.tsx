import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import {
  GOVERNANCE_CONTROLS,
  REGULATORY_MATRIX,
  REGULATORY_DISCLAIMER,
  type ControlStatus,
} from "@/config/governance";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Governance" };

const controlTone: Record<ControlStatus, "green" | "amber" | "slate" | "blue"> = {
  IMPLEMENTED: "green",
  PARTIAL: "amber",
  PLANNED: "slate",
  NOT_APPLICABLE: "slate",
  REQUIRES_ASSESSMENT: "blue",
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

      <div className="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-sm text-amber-200">
          OPUS67 provides governance support and compliance-oriented controls.
          It does <strong>not</strong> claim EU AI Act compliance by itself;
          conformity requires organisational measures outside this software.
        </p>
      </div>

      <section aria-labelledby="control-states" className="mb-10">
        <h2 id="control-states" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Regulatory controls — verifiable states
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          States are IMPLEMENTED / PARTIAL / PLANNED / NOT APPLICABLE / REQUIRES ASSESSMENT.
          &quot;COMPLIANT&quot; is never used as an automatic state.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOVERNANCE_CONTROLS.map((control) => (
            <li
              key={control.slug}
              id={control.slug}
              className="scroll-mt-20 rounded-lg border border-ink-700 bg-ink-900/50 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-white">{control.name}</h3>
                <Badge tone={controlTone[control.status]}>
                  {control.status.replaceAll("_", " ")}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-slate-400">{control.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="regulatory-matrix" className="mb-10">
        <h2 id="regulatory-matrix" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Regulatory traceability matrix
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Regulation → requirement → control → implementation status → evidence → human
          review → last review. Article references point to Regulation (EU) 2024/1689 and
          Regulation (EU) 2016/679 for orientation; they are not a legal assessment.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-ink-700">
          <table className="min-w-full divide-y divide-ink-700 text-left text-xs">
            <thead className="bg-ink-900/80 text-slate-400">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Regulation</th>
                <th scope="col" className="px-3 py-2 font-medium">Requirement</th>
                <th scope="col" className="px-3 py-2 font-medium">Control</th>
                <th scope="col" className="px-3 py-2 font-medium">Status</th>
                <th scope="col" className="px-3 py-2 font-medium">Evidence</th>
                <th scope="col" className="px-3 py-2 font-medium">Human review</th>
                <th scope="col" className="px-3 py-2 font-medium">Last review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-700 text-slate-300">
              {REGULATORY_MATRIX.map((row) => (
                <tr key={`${row.regulation}-${row.requirement}`}>
                  <td className="px-3 py-2 whitespace-nowrap">{row.regulation}</td>
                  <td className="px-3 py-2">{row.requirement}</td>
                  <td className="px-3 py-2">{row.control}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Badge tone={controlTone[row.status]}>
                      {row.status.replaceAll("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px] text-slate-400">{row.evidence}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.humanReview}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.lastReview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="governance-areas" className="mb-10">
        <h2 id="governance-areas" className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Platform governance capabilities
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {governanceAreas.map((area) => (
            <li key={area.title} className="rounded-lg border border-ink-700 bg-ink-900/50 p-4">
              <h3 className="text-sm font-semibold text-white">{area.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{area.description}</p>
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

      <p className="border-t border-ink-700 pt-6 text-xs text-slate-500">
        {REGULATORY_DISCLAIMER}
      </p>
    </div>
  );
}
