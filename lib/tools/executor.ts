import { AppError } from "@/lib/security/sanitize";
import { newId } from "@/lib/utils/id";
import { getBuiltInTool } from "@/lib/tools/built-in-tools";

/**
 * OPUS67 — Tool executor.
 *
 * Executes built-in system tools with runtime input validation (Zod).
 * Unknown tools and invalid inputs fail with typed, safe errors — internal
 * details never leak to API responses (see lib/security/sanitize.ts).
 */

export interface ToolExecutionResult {
  tool: string;
  requestId: string;
  durationMs: number;
  output: Record<string, unknown>;
}

export function executeBuiltInTool(name: string, input: unknown): ToolExecutionResult {
  const tool = getBuiltInTool(name);
  if (!tool) {
    throw new AppError(404, `Unknown tool: ${name}`);
  }

  const parsed = tool.inputValidator.safeParse(input);
  if (!parsed.success) {
    throw new AppError(
      400,
      `Invalid input for tool ${name}: ${parsed.error.issues
        .map((issue) => issue.path.join(".") || "(root)")
        .join(", ")}`,
    );
  }

  const started = Date.now();
  const output = tool.run(parsed.data);
  return {
    tool: tool.name,
    requestId: newId(),
    durationMs: Date.now() - started,
    output,
  };
}
