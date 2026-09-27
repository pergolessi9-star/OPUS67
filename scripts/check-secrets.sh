#!/usr/bin/env bash
# OPUS67 — repository secret scan.
# Searches tracked source for patterns that look like committed secrets.
# .env.example is intentionally excluded: it contains placeholder NAMES only.
set -euo pipefail

PATTERN_FILE="$(mktemp)"
trap 'rm -f "$PATTERN_FILE"' EXIT

cat > "$PATTERN_FILE" <<'PATTERNS'
sk-[A-Za-z0-9]{20,}
-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----
xox[baprs]-[A-Za-z0-9-]{10,}
ghp_[A-Za-z0-9]{20,}
VERCEL_TOKEN=["'][^"']+
PASSWORD=["'][^"']+
PATTERNS

if grep -rEnf "$PATTERN_FILE" \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  --exclude-dir=.git \
  --exclude=package-lock.json \
  --exclude=check-secrets.sh \
  .; then
  echo "ERROR: potential secret material found in the repository." >&2
  exit 1
fi

echo "Secret scan: no potential secrets found."
