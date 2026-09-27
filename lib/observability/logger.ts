/**
 * OPUS67 — Observability: minimal structured logger.
 *
 * Emits single-line JSON log records with: timestamp, level, event,
 * requestId and component. Designed so a future external sink
 * (e.g. an OTel collector or log drain) can replace `write` without
 * touching call sites.
 *
 * SECURITY: never pass secrets, tokens, passwords or API keys in `fields`.
 * `redactFields` defensively strips common secret-shaped keys anyway.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogRecord {
  timestamp: string;
  level: LogLevel;
  event: string;
  requestId: string | null;
  component: string;
  fields: Record<string, unknown>;
}

const SECRET_KEY_PATTERN =
  /secret|token|password|api[-_]?key|credential|authorization|database[-_]?url|private[-_]?key/i;

/** Defensively removes secret-shaped keys from a field bag. */
export function redactFields(fields: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields)) {
    out[key] = SECRET_KEY_PATTERN.test(key) ? "[REDACTED]" : value;
  }
  return out;
}

type Sink = (line: string) => void;

const defaultSink: Sink = (line) => {
  console.log(line);
};

let sink: Sink = defaultSink;

/** Test/support hook: replace the output sink. */
export function setLogSink(next: Sink): void {
  sink = next;
}

export function log(
  level: LogLevel,
  event: string,
  component: string,
  fields: Record<string, unknown> = {},
  requestId: string | null = null,
): void {
  const record: LogRecord = {
    timestamp: new Date().toISOString(),
    level,
    event,
    requestId,
    component,
    fields: redactFields(fields),
  };
  sink(JSON.stringify(record));
}

export const logger = {
  debug: (event: string, component: string, fields?: Record<string, unknown>, requestId?: string) =>
    log("debug", event, component, fields, requestId ?? null),
  info: (event: string, component: string, fields?: Record<string, unknown>, requestId?: string) =>
    log("info", event, component, fields, requestId ?? null),
  warn: (event: string, component: string, fields?: Record<string, unknown>, requestId?: string) =>
    log("warn", event, component, fields, requestId ?? null),
  error: (event: string, component: string, fields?: Record<string, unknown>, requestId?: string) =>
    log("error", event, component, fields, requestId ?? null),
};
