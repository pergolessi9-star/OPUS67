import type { Metadata } from "next";
import { getModule } from "@/lib/utils/module";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Governance" };

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

      <ul className="grid gap-4 sm:grid-cols-2">
        {governanceAreas.map((area) => (
          <li key={area.title} className="rounded-lg border border-ink-700 bg-ink-900/50 p-4">
            <h2 className="text-sm font-semibold text-white">{area.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{area.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <EmptyState
          title="No AI systems registered"
          description="The inventory is empty. Registered systems, risks, controls, decisions and human reviews will appear here."
        />
      </div>
    </div>
  );
}
