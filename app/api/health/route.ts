import { NextResponse } from "next/server";
import { getEnvironmentStatus } from "@/lib/validation/env";

export const dynamic = "force-dynamic";

/**
 * GET /api/health
 *
 * Safe, minimal liveness/readiness signal. Distinguishes application,
 * database and provider state WITHOUT leaking secrets, paths or env values.
 */
export async function GET() {
  const env = getEnvironmentStatus();

  return NextResponse.json(
    {
      status: "ok",
      service: "OPUS67",
      checks: {
        application: "healthy",
        database: env.database === "configured" ? "configured" : "not_configured",
        aiProvider: env.aiProvider === "configured" ? "configured" : "not_configured",
      },
    },
    { status: 200 },
  );
}
