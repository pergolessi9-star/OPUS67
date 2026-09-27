import { describe, expect, it } from "vitest";
import {
  agentSchema,
  createAgentSchema,
  evidenceSchema,
  executionSchema,
  projectSchema,
  toolSchema,
  workflowSchema,
} from "@/lib/validation/schemas";

const NOW = "2026-01-01T00:00:00.000Z";

describe("agent schema", () => {
  const valid = {
    id: "a1",
    name: "Research agent",
    description: "Draft agent",
    status: "draft",
    provider: "none",
    model: "none",
    systemInstructions: "You are careful.",
    capabilities: ["summarise"],
    tools: [],
    createdAt: NOW,
    updatedAt: NOW,
  };

  it("accepts a valid agent", () => {
    expect(agentSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid status", () => {
    expect(agentSchema.safeParse({ ...valid, status: "running" }).success).toBe(false);
  });

  it("create schema omits server-generated fields", () => {
    const input = {
      name: valid.name,
      description: valid.description,
      status: valid.status,
      provider: valid.provider,
      model: valid.model,
      systemInstructions: valid.systemInstructions,
      capabilities: valid.capabilities,
      tools: valid.tools,
    };
    expect(createAgentSchema.safeParse(input).success).toBe(true);
    expect(createAgentSchema.safeParse(valid).success).toBe(false);
  });
});

describe("tool schema", () => {
  it("enforces the explicit status set", () => {
    const base = {
      id: "t1",
      name: "Web fetch",
      description: "Fetches a URL",
      category: "retrieval",
      inputSchema: { type: "object" },
      outputSchema: { type: "object" },
      permissions: ["network:read"],
      createdAt: NOW,
      updatedAt: NOW,
    };
    for (const status of ["AVAILABLE", "CONFIGURATION_REQUIRED", "DISABLED", "ERROR"]) {
      expect(toolSchema.safeParse({ ...base, status }).success).toBe(true);
    }
    expect(toolSchema.safeParse({ ...base, status: "BROKEN" }).success).toBe(false);
  });
});

describe("workflow schema", () => {
  it("validates steps with error policies", () => {
    const wf = {
      id: "w1",
      name: "Review pipeline",
      description: "",
      status: "draft",
      steps: [
        {
          id: "s1",
          name: "Draft",
          agentId: "a1",
          toolId: null,
          input: {},
          output: {},
          dependsOn: [],
          errorPolicy: "abort",
        },
      ],
      triggers: [{ type: "manual", config: {} }],
      createdAt: NOW,
      updatedAt: NOW,
    };
    expect(workflowSchema.safeParse(wf).success).toBe(true);
  });
});

describe("evidence schema", () => {
  const base = {
    id: "e1",
    projectId: null,
    source: "run-123/output.txt",
    sourceType: "artefact",
    timestamp: NOW,
    metadata: {},
    status: "SYSTEM_GENERATED",
    createdAt: NOW,
  };

  it("accepts a valid SHA-256 hash or null", () => {
    const hash = "a".repeat(64);
    expect(evidenceSchema.safeParse({ ...base, hash }).success).toBe(true);
    expect(evidenceSchema.safeParse({ ...base, hash: null }).success).toBe(true);
  });

  it("rejects malformed hashes", () => {
    expect(evidenceSchema.safeParse({ ...base, hash: "not-a-hash" }).success).toBe(false);
  });

  it("rejects unknown evidence states", () => {
    expect(evidenceSchema.safeParse({ ...base, hash: null, status: "TRUSTED" }).success).toBe(false);
  });
});

describe("execution schema", () => {
  it("validates execution lifecycle fields", () => {
    const exec = {
      id: "x1",
      projectId: "p1",
      workflowId: null,
      agentId: "a1",
      status: "queued",
      startedAt: NOW,
      completedAt: null,
      input: {},
      output: {},
      error: null,
      provider: null,
      model: null,
      requestId: "req-1",
    };
    expect(executionSchema.safeParse(exec).success).toBe(true);
  });
});

describe("project schema", () => {
  it("requires an owner", () => {
    const p = {
      id: "p1",
      name: "Pilot",
      description: "",
      status: "draft",
      owner: "",
      createdAt: NOW,
      updatedAt: NOW,
    };
    expect(projectSchema.safeParse(p).success).toBe(false);
  });
});
