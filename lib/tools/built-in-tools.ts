import { z } from "zod";
import { getStore } from "@/lib/db/repository";
import { sha256Hex } from "@/lib/utils/hash";
import { sanitizeText } from "@/lib/security/sanitize";

/**
 * OPUS67 — Built-in system tools.
 *
 * These are REAL, executable capabilities: each one runs server-side code
 * that already exists in the platform (hashing, sanitisation, clock). No
 * external integration is claimed. Permissions are empty because none of
 * these tools accesses the network, the filesystem or any secret.
 *
 * The JSON Schemas below are the published contract; the Zod validators are
 * the enforced runtime contract used by lib/tools/executor.ts.
 */

export interface BuiltInToolDefinition {
  name: string;
  description: string;
  category: string;
  permissions: string[];
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  inputValidator: z.ZodTypeAny;
  run: (input: unknown) => Record<string, unknown>;
}

const sha256Input = z.object({ text: z.string().min(1).max(20_000) }).strict();

const sanitizeInput = z.object({ text: z.string().max(50_000) }).strict();

const timeNowInput = z.object({}).strict();

export const BUILT_IN_TOOLS: BuiltInToolDefinition[] = [
  {
    name: "system.sha256",
    description: "Computes the SHA-256 hex digest of a UTF-8 text payload.",
    category: "system",
    permissions: [],
    inputSchema: {
      type: "object",
      properties: { text: { type: "string", minLength: 1, maxLength: 20000 } },
      required: ["text"],
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      properties: { sha256: { type: "string", pattern: "^[a-f0-9]{64}$" } },
      required: ["sha256"],
    },
    inputValidator: sha256Input,
    run: (input) => {
      const { text } = sha256Input.parse(input);
      return { sha256: sha256Hex(text) };
    },
  },
  {
    name: "system.sanitize-text",
    description:
      "Strips C0/C1 control characters (except \\n, \\t) and caps length, per lib/security/sanitize.ts.",
    category: "system",
    permissions: [],
    inputSchema: {
      type: "object",
      properties: { text: { type: "string", maxLength: 50000 } },
      required: ["text"],
      additionalProperties: false,
    },
    outputSchema: {
      type: "object",
      properties: {
        sanitized: { type: "string" },
        changed: { type: "boolean" },
      },
      required: ["sanitized", "changed"],
    },
    inputValidator: sanitizeInput,
    run: (input) => {
      const { text } = sanitizeInput.parse(input);
      const sanitized = sanitizeText(text);
      return { sanitized, changed: sanitized !== text };
    },
  },
  {
    name: "system.time-now",
    description: "Returns the current server time (ISO 8601 and Unix milliseconds).",
    category: "system",
    permissions: [],
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    outputSchema: {
      type: "object",
      properties: {
        iso: { type: "string", format: "date-time" },
        unixMs: { type: "integer" },
      },
      required: ["iso", "unixMs"],
    },
    inputValidator: timeNowInput,
    run: (input) => {
      timeNowInput.parse(input);
      const now = new Date();
      return { iso: now.toISOString(), unixMs: now.getTime() };
    },
  },
];

export function getBuiltInTool(name: string): BuiltInToolDefinition | undefined {
  return BUILT_IN_TOOLS.find((tool) => tool.name === name);
}

/**
 * Registers the built-in tools in the repository (idempotent, keyed by
 * name). They are marked AVAILABLE because they are genuinely executable
 * via lib/tools/executor.ts and POST /api/tools/execute.
 */
export function ensureBuiltInToolsRegistered(): void {
  const store = getStore();
  const existing = new Set(store.tools.list().map((tool) => tool.name));
  for (const def of BUILT_IN_TOOLS) {
    if (!existing.has(def.name)) {
      store.tools.create({
        name: def.name,
        description: def.description,
        category: def.category,
        status: "AVAILABLE",
        inputSchema: def.inputSchema,
        outputSchema: def.outputSchema,
        permissions: def.permissions,
      });
    }
  }
}
