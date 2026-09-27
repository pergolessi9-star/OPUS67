# Contributing — OPUS67

## Branch strategy

- `main` is the canonical production branch. Never force-push to `main`.
- Work happens on `feature/*`, `fix/*` or `chore/*` branches.

## Flow

1. Branch from `main`.
2. Commit coherently (small, auditable commits; no empty commits).
3. Push and open a pull request using the PR template.
4. Requirements for merge:
   - CI green (lint, typecheck, tests, build, secret scan).
   - Vercel Preview READY for the **current HEAD SHA** — if the SHA
     changes, the Preview must be revalidated.
   - Human review.
5. Merge. Vercel promotes `main` to Production.

## Rules

- Keep PRs small and reversible.
- Do not add dependencies without justification (purpose, necessity,
  maintenance status, no native alternative, lockfile pinning).
- Do not silence TypeScript/ESLint errors to get a green build.
- Do not introduce demo data presented as real; mark samples explicitly
  as DEMO/SAMPLE/MOCK.
- Update documentation when behaviour changes.
