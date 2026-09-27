import { randomUUID } from "crypto";

/** Generates a unique identifier (UUID v4, crypto-random). */
export function newId(): string {
  return randomUUID();
}

/** Current timestamp in ISO 8601. */
export function nowIso(): string {
  return new Date().toISOString();
}
