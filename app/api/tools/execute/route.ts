import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureBuiltInToolsRegistered } from "@/lib/tools/built-in-tools";
import { executeBuiltInTool } from "@/lib/tools/executor";
import { logger } from "@/lib/observability/logger";
import { toPublicError } from "@/lib/security/sanitize";

export const dynamic = "force-dynamic";

const bodySchema = z
  .object({
    tool: z.string().min(1).max(100),
    input: z.unknown().optional(),
  })
  .strict();

/**
 * POST /api/tools/execute
 *
 * Executes a built-in system tool ({ tool, input }). Only tools registered
 * in lib/tools/built-in-tools.ts are executable; anything else returns 404.
 * Responses never expose internal errors.
 */
export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    ensureBuiltInToolsRegistered();
    const result = executeBuiltInTool(body.tool, body.input ?? {});
    logger.info("tool.executed", "api/tools/execute", {
      tool: result.tool,
      durationMs: result.durationMs,
    }, result.requestId);
    return NextResponse.json({ status: "ok", result }, { status: 200 });
  } catch (error) {
    const publicError = toPublicError(error);
    return NextResponse.json(
      { status: "error", error: publicError.body.error },
      { status: publicError.statusCode },
    );
  }
}
