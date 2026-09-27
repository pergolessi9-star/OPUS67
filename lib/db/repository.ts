import { newId, nowIso } from "@/lib/utils/id";
import type {
  Agent,
  AuditEvent,
  Evidence,
  Execution,
  Project,
  Tool,
  Workflow,
} from "@/types";
import type {
  CreateAgentInput,
  CreateEvidenceInput,
  CreateProjectInput,
  CreateToolInput,
  CreateWorkflowInput,
} from "@/lib/validation/schemas";

/**
 * OPUS67 — Repository layer.
 *
 * UI → services → repository → database. React components never touch SQL.
 *
 * Current implementation: InMemoryStore (process-local, NON-persistent).
 * It exists so the application is fully functional and testable today.
 * The PostgreSQL adapter (Neon/Supabase-compatible) implements the same
 * interfaces and is tracked in docs/ROADMAP.md — until it lands, nothing
 * here claims durability across restarts.
 */

export interface Repository<TEntity, TCreate> {
  list(): TEntity[];
  getById(id: string): TEntity | null;
  create(input: TCreate): TEntity;
}

function makeRepo<TEntity extends { id: string }, TCreate>(
  seed: TEntity[] = [],
): Repository<TEntity, TCreate> {
  const items = new Map<string, TEntity>(seed.map((item) => [item.id, item]));
  return {
    list: () => Array.from(items.values()),
    getById: (id) => items.get(id) ?? null,
    create: (input) => {
      const now = nowIso();
      const entity = {
        ...(input as object),
        id: newId(),
        createdAt: now,
        updatedAt: now,
      } as unknown as TEntity;
      items.set(entity.id, entity);
      return entity;
    },
  };
}

export interface AppStore {
  projects: Repository<Project, CreateProjectInput>;
  agents: Repository<Agent, CreateAgentInput>;
  tools: Repository<Tool, CreateToolInput>;
  workflows: Repository<Workflow, CreateWorkflowInput>;
  evidence: Repository<Evidence, CreateEvidenceInput>;
  executions: Repository<Execution, Omit<Execution, "id">>;
  auditEvents: {
    list(): AuditEvent[];
    append(event: Omit<AuditEvent, "id" | "timestamp">): AuditEvent;
  };
}

/**
 * Global in-memory store. Empty by design: no fabricated demo data is
 * seeded. The UI renders explicit empty states instead (see SUPERPROMPT §7).
 */
const globalStore = globalThis as unknown as { __opus67Store?: AppStore };

export function getStore(): AppStore {
  if (!globalStore.__opus67Store) {
    globalStore.__opus67Store = {
      projects: makeRepo<Project, CreateProjectInput>(),
      agents: makeRepo<Agent, CreateAgentInput>(),
      tools: makeRepo<Tool, CreateToolInput>(),
      workflows: makeRepo<Workflow, CreateWorkflowInput>(),
      evidence: makeRepo<Evidence, CreateEvidenceInput>(),
      executions: makeRepo<Execution, Omit<Execution, "id">>(),
      auditEvents: {
        list: () => [],
        append: (event) => ({ ...event, id: newId(), timestamp: nowIso() }),
      },
    };
  }
  return globalStore.__opus67Store;
}

/** Test hook: resets the store between tests. */
export function resetStore(): void {
  delete globalStore.__opus67Store;
}
