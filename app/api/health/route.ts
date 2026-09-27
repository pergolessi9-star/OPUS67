import { NextResponse } from "next/server";
import { getEnvironmentStatus } from "@/lib/validation/env";

export const dynamic = "force-dynamic";

/**
 * GET /api/health
 *
 * Safe, minimal liveness/readiness signal. Reports the ACTIVE drivers
 * (storage and AI provider) WITHOUT leaking secrets, paths or env values.
 * The platform is always configured: defaults are the explicit local
 * drivers ("memory" storage, "null" provider); external services are
 * opt-in via server-side env vars.
 */
export async function GET() {
  const env = getEnvironmentStatus();

  return NextResponse.json(
    {
      status: "ok",
      service: "OPUS67",
      checks: {
        application: "healthy",
        storage: env.databaseDriver,
        aiProvider: env.aiProviderDriver,
      },
    },
    { status: 200 },
  );
}
