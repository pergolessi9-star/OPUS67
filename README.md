# OPUS67

OPUS67 is a modular technology platform for working with AI systems:
agents, tools, workflows, evidence and governance — designed for
correctness, security, traceability and human oversight.

## Overview

OPUS67 provides a solid core that can evolve towards a full AI operations
environment. It deliberately implements a small, verifiable feature set
instead of many superficial functions. Anything that depends on external
credentials or infrastructure is implemented at the interface level and
explicitly marked as **configuration required** — nothing is simulated.

## Architecture

- **Next.js (App Router) + React + strict TypeScript** — UI and API routes.
- **Tailwind CSS** — sober, responsive, accessible styling.
- **Zod** — runtime validation at every system boundary.
- **Repository layer** — UI → services → repository → database. Current
  adapter is in-memory (non-persistent); PostgreSQL (Neon/Supabase) support
  is designed and documented in `docs/DATA_MODEL.md` / `docs/ROADMAP.md`.
- **AI provider abstraction** — all model access goes through
  `lib/ai/provider.ts`. No vendor SDK is wired by default.

See `docs/ARCHITECTURE.md` for the full description and ADRs.

## Features

| Module | Route | State |
| --- | --- | --- |
| Dashboard | `/dashboard` | Operational (live store, honest empty states) |
| Projects | `/projects` | Operational |
| Agents | `/agents` | Operational (registry; execution via local no-op provider by default) |
| Tools | `/tools` | Operational (3 built-in system tools, executable) |
| Workflows | `/workflows` | Operational (definition model) |
| Evidence | `/evidence` | Operational (SHA-256 fingerprinting) |
| Governance | `/governance` | Operational (compliance-oriented controls) |
| Settings | `/settings` | Operational |
| AI Legal Notice | `/legal/ai` | Operational |
| Health API | `/api/health` | Operational |
| Status API | `/api/status` | Operational |
| Tools execute API | `/api/tools/execute` | Operational |

## Requirements

- Node.js >= 20 (LTS)
- npm >= 10

## Installation

```bash
npm ci
cp .env.example .env.local   # optional; the app boots with no variables set
```

## Development

```bash
npm run dev        # local dev server
npm run check      # lint + typecheck + tests
```

## Environment

All variables are optional and documented (by class: REQUIRED / OPTIONAL /
PROVIDER-SPECIFIC / DATABASE / OBSERVABILITY) in `.env.example`.
Secrets are server-side only, never prefixed with `NEXT_PUBLIC_`, never
committed.

## Testing

```bash
npm run test         # unit + integration (Vitest)
npm run test:unit    # unit only
```

E2E tests are planned and explicitly on HOLD (`tests/e2e/README.md`).

## Build

```bash
npm run build    # next build (single build contract)
```

## Deployment

Canonical flow: GitHub `main` → Vercel (Git Integration) → Production;
every pull request gets a Preview deployment. See `docs/DEPLOYMENT.md`.
A multi-stage `Dockerfile` (Next.js standalone output) is also provided.

## Security

See `SECURITY.md` and `docs/SECURITY.md`. Never commit secrets; run
`npm run check:secrets` before pushing.

## Repository structure

```
app/            Next.js App Router (pages + API routes)
components/     ui / layout / dashboard / shared components
lib/            ai, db, security, governance, validation, observability, utils
types/          core domain types
config/         module registry
tests/          unit / integration / e2e (HOLD)
docs/           architecture, deployment, security, governance, data model, API, operations, roadmap
scripts/        operational scripts (secret scan)
.github/        CI workflow, PR template, issue templates
```

## Contributing

See `CONTRIBUTING.md`. Trunk-based flow: `feature/*` / `fix/*` / `chore/*`
branches → PR → CI green → Vercel Preview READY → review → merge.

## Status

Version 0.1.0 — core milestone. Known limitations and HOLD items are
listed in `docs/ROADMAP.md`. License: pending owner decision (no license
file is shipped until the owner chooses one).
