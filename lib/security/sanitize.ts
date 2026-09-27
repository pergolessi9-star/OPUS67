/**
 * OPUS67 — Security helpers (server-side).
 *
 * - sanitizeText: neutralises control characters and caps length for
 *   free-text user input before it reaches services or repositories.
 * - Prompt-safety: lib/ai/messages.ts separates SYSTEM / USER / EXTERNAL /
 *   TOOL content channels (see docs/SECURITY.md, "Prompt injection").
 */

const MAX_TEXT_LENGTH = 20_000;

/** Strips C0/C1 control characters (except \n, \t) and caps length. */
export function sanitizeText(input: string, maxLength: number = MAX_TEXT_LENGTH): string {
  const stripped = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "");
  return stripped.slice(0, maxLength);
}

/** Generic typed application error with a safe public message. */
export class AppError extends Error {
  readonly statusCode: number;
  readonly publicMessage: string;

  constructor(statusCode: number, publicMessage: string, internalMessage?: string) {
    super(internalMessage ?? publicMessage);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.publicMessage = publicMessage;
  }
}

/**
 * Converts an unknown thrown value into a safe API error payload.
 * Internal details (stack traces, driver errors) are never exposed.
 */
export function toPublicError(err: unknown): { statusCode: number; body: { error: string } } {
  if (err instanceof AppError) {
    return { statusCode: err.statusCode, body: { error: err.publicMessage } };
  }
  return { statusCode: 500, body: { error: "Internal server error" } };
}
