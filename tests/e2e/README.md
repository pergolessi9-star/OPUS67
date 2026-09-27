# E2E tests — status: HOLD

End-to-end browser tests (Playwright) are **planned but not implemented** in
this milestone. Declaring them green without running them would violate the
project truthfulness rules, so this directory intentionally contains only
this note.

Planned coverage (docs/ROADMAP.md, phase 2):

- main render at 320 / 375 / 768 / 1024 / 1440 px without horizontal overflow;
- primary navigation across all modules;
- `GET /api/health` smoke check against a running instance;
- keyboard navigation and visible focus.

Until then, `npm run check` covers lint + typecheck + unit/integration tests
+ build validation (see `scripts` in package.json and `.github/workflows/ci.yml`).
