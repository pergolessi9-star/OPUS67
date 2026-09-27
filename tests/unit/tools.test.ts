import { describe, expect, it } from "vitest";
import {
  BUILT_IN_TOOLS,
  ensureBuiltInToolsRegistered,
  getBuiltInTool,
} from "@/lib/tools/built-in-tools";
import { executeBuiltInTool } from "@/lib/tools/executor";
import { AppError } from "@/lib/security/sanitize";
import { getStore, resetStore } from "@/lib/db/repository";

describe("built-in tools registry", () => {
  it("exposes exactly the documented system tools", () => {
    expect(BUILT_IN_TOOLS.map((t) => t.name)).toEqual([
      "system.sha256",
      "system.sanitize-text",
      "system.time-now",
    ]);
  });

  it("declares no permissions (no external access)", () => {
    for (const tool of BUILT_IN_TOOLS) {
      expect(tool.permissions).toEqual([]);
    }
  });

  it("registers tools in the store as AVAILABLE, idempotently", () => {
    resetStore();
    ensureBuiltInToolsRegistered();
    ensureBuiltInToolsRegistered();
    const tools = getStore().tools.list();
    expect(tools).toHaveLength(3);
    for (const tool of tools) {
      expect(tool.status).toBe("AVAILABLE");
    }
  });
});

describe("executeBuiltInTool", () => {
  it("system.sha256 returns the published digest for a known input", () => {
    const result = executeBuiltInTool("system.sha256", { text: "hello" });
    expect(result.output.sha256).toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    );
    expect(result.requestId).toBeTruthy();
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
  });

  it("system.sanitize-text strips control characters and reports the change", () => {
    const result = executeBuiltInTool("system.sanitize-text", {
      text: "ab\u0007c\n",
    });
    expect(result.output).toEqual({ sanitized: "abc\n", changed: true });
  });

  it("system.time-now returns ISO time and unix milliseconds", () => {
    const result = executeBuiltInTool("system.time-now", {});
    expect(typeof result.output.iso).toBe("string");
    expect(typeof result.output.unixMs).toBe("number");
  });

  it("rejects unknown tools with a 404 AppError", () => {
    expect(() => executeBuiltInTool("system.does-not-exist", {})).toThrowError(AppError);
    try {
      executeBuiltInTool("system.does-not-exist", {});
    } catch (error) {
      expect((error as AppError).statusCode).toBe(404);
    }
  });

  it("rejects invalid input with a 400 AppError", () => {
    try {
      executeBuiltInTool("system.sha256", { text: "" });
      expect.unreachable("empty text must be rejected");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).statusCode).toBe(400);
    }
  });

  it("rejects unexpected fields (strict schemas)", () => {
    try {
      executeBuiltInTool("system.sha256", { text: "hello", extra: true });
      expect.unreachable("unknown keys must be rejected");
    } catch (error) {
      expect((error as AppError).statusCode).toBe(400);
    }
  });

  it("getBuiltInTool returns undefined for unknown names", () => {
    expect(getBuiltInTool("nope")).toBeUndefined();
  });
});
