#!/bin/sh
set -e

# The migration toolchain is self-contained under this directory: CLI, schema
# and prisma.config.ts. Running from here is what lets the config resolve its
# own `prisma/config` import. Overridable so the layout can be exercised
# outside Docker.
PRISMA_DIR="${PRISMA_DIR:-/opt/prisma-cli}"

# Migrations run at start, not at build. The build has no route to the database
# on most platforms, and running them here means every deploy converges the
# schema before the first request is served.
if [ -z "$DATABASE_URL" ]; then
  echo "==> DATABASE_URL is not set. Skipping migrations; lead capture will fail."
elif [ ! -f "$PRISMA_DIR/node_modules/prisma/build/index.js" ]; then
  echo "==> Prisma CLI not found under $PRISMA_DIR. Skipping migrations."
else
  echo "==> applying migrations"
  # Subshell, so the app still starts from /app.
  (cd "$PRISMA_DIR" && node node_modules/prisma/build/index.js migrate deploy)
fi

# Auth.js throws on a missing secret rather than degrading, so without this
# every /admin request is a 500 with nothing in the response explaining why.
# The public site is unaffected, which is exactly what makes it easy to miss.
if [ -z "$AUTH_SECRET" ]; then
  echo "==> AUTH_SECRET is not set. The public site will serve, but /admin will"
  echo "    return 500 on every request. Generate one with: openssl rand -base64 32"
fi

echo "==> starting next"
exec "$@"
