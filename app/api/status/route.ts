import { NextResponse } from "next/server";
import { getStore } from "@/lib/db/repository";
import { MODULES } from "@/config/modules";

export const dynamic = "force-dynamic";

/**
 * GET /api/status
 *
 * Aggregate platform status: module states and entity counts from the live
 * store. Contains no credentials or internal paths.
 */
export async function GET() {
  const store = getStore();

  return NextResponse.json(
    {
      status: "ok",
      service: "OPUS67",
      modules: MODULES.map((m) => ({ slug: m.slug, status: m.status })),
      counts: {
        projects: store.projects.list().length,
        agents: store.agents.list().length,
        tools: store.tools.list().length,
        workflows: store.workflows.list().length,
        evidence: store.evidence.list().length,
        executions: store.executions.list().length,
      },
    },
    { status: 200 },
  );
}
