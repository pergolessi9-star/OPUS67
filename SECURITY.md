# Security Policy — OPUS67

## Reporting a vulnerability

Do not open public issues for security vulnerabilities. Contact the
repository owner privately (see the GitHub profile of
`pergolessi9-star`). Include reproduction steps and affected commit SHA.

## Scope

This document covers the OPUS67 application and its CI configuration.
The detailed threat model, secret management rules and incident response
procedure live in `docs/SECURITY.md`.

## Hard rules

- No secrets in the repository. Run `npm run check:secrets` before pushing.
- No secret values in logs; the logger redacts secret-shaped keys defensively.
- API keys are server-side only (never `NEXT_PUBLIC_*`, never the browser).
- Production errors never expose stack traces or internal details.
