import { beforeEach, describe, expect, it } from "vitest";
import { getStore, resetStore } from "@/lib/db/repository";
import { GET as healthGET } from "@/app/api/health/route";
import { GET as statusGET } from "@/app/api/status/route";

describe("in-memory repository", () => {
  beforeEach(() => resetStore());

  it("starts empty — no seeded demo data", () => {
    const store = getStore();
    expect(store.projects.list()).toHaveLength(0);
    expect(store.agents.list()).toHaveLength(0);
    expect(store.evidence.list()).toHaveLength(0);
  });

  it("creates and retrieves entities with generated ids and timestamps", () => {
    const store = getStore();
    const project = store.projects.create({
      name: "Pilot",
      description: "",
      status: "draft",
      owner: "ops@example.com",
    });
    expect(project.id).toBeTruthy();
    expect(project.createdAt).toBeTruthy();
    expect(store.projects.getById(project.id)?.name).toBe("Pilot");
    expect(store.projects.list()).toHaveLength(1);
  });
});

describe("GET /api/health", () => {
  it("returns a safe minimal payload without secrets", async () => {
    const res = await healthGET();
    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body.status).toBe("ok");
    expect(body.service).toBe("OPUS67");
    const serialized = JSON.stringify(body);
    expect(serialized).not.toMatch(/password|secret|token|api[-_]?key/i);
  });
});

describe("GET /api/status", () => {
  it("reports module states and zero counts on an empty store", async () => {
    resetStore();
    const res = await statusGET();
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      modules: { slug: string; status: string }[];
      counts: Record<string, number>;
    };
    expect(body.modules.length).toBeGreaterThan(0);
    expect(Object.values(body.counts).every((n) => n === 0)).toBe(true);
  });
});
