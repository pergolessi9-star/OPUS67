# OPUS67 — Deployment

## Canonical flow

```
GitHub: OPUS67 (main)
   → Vercel project: OPUS67 (Git Integration)
   → Preview per pull request
   → main → Production
```

## Vercel setup (one-time, human action)

Do not connect this GitHub repository to multiple Vercel projects unless
this is an explicit architectural decision.

1. In Vercel, import the repository `pergolessi9-star/OPUS67` **once**,
   project name `OPUS67`.
2. Framework preset: **Next.js** (auto-detected).
3. Production branch: **main**.
4. Do **not** set a custom `buildCommand` or `outputDirectory` — the
   project follows the standard `npm run build` → `next build` contract.
5. Root directory: repository root (no monorepo nesting).
6. Environment variables: configure per environment (Preview / Production)
   from `.env.example`. The app boots with none set.

## Merge criteria

same HEAD SHA → CI green → Vercel Preview READY → review → merge.
If the SHA changes, the Preview is invalid and must be revalidated.

## Pre-promotion checklist (Production)

- build green, tests green
- Preview READY for current HEAD
- no secrets (`npm run check:secrets`)
- no TypeScript errors, no critical ESLint errors
- `/api/health` responds on the Preview

## Rollback

- **Deployment**: redeploy the previous Production deployment from the
  Vercel dashboard (instant rollback), then revert the offending commit.
- **Database migrations**: none exist yet; when they do, every migration
  must ship with a reverse migration. Destructive migrations require
  explicit owner approval.
- **Providers**: unset the provider env vars; the `NullProvider` restores
  safe degraded behaviour.
- **GitHub integration**: disconnecting the Vercel project does not affect
  the repository; reconnect only the canonical project.

## Docker (alternative runtime)

```bash
docker build -t opus67 .
docker run -p 3000:3000 opus67
```

The image uses Next.js standalone output (`output: "standalone"`).
