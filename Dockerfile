# syntax=docker/dockerfile:1

# Debian slim rather than Alpine on purpose. sharp and the Prisma engines are
# native binaries; on musl they either need extra packages or silently fall back
# to a slower path. Matching glibc here avoids a class of "works locally, breaks
# in the container" failures.
FROM node:22-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable
# openssl is required by the Prisma query engine.
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------------------------- deps
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# The postinstall hook runs `prisma generate`, so the schema and its config
# have to be present before install.
COPY prisma ./prisma
COPY prisma.config.ts ./
# --node-linker=hoisted is load-bearing, not a preference.
#
# With pnpm's default symlinked layout, Next's standalone tracer only picked up
# 6 packages and missed styled-jsx, which next/dist/server/require-hook.js
# requires at startup. The container built fine and then died on the first
# boot with "Cannot find module 'styled-jsx/package.json'". A flat layout
# traces 129 packages and starts.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --node-linker=hoisted

# ---------------------------------------------------------------- build
FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Analytics is a server component, so this looks like a runtime variable, but
# most of the site is prerendered: with a value set it is baked into 482 files
# of HTML and RSC payload during the build. Setting it on the running service
# would only reach whatever renders on demand. It has to be a build argument.
# Left empty the component returns null, which is the intended default.
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=""
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# No DATABASE_URL here. The build must not need one: verified by building with
# the variable explicitly unset.
RUN pnpm build

# ------------------------------------------------------------ prisma cli
# Built in isolation, with a manifest containing only the CLI.
#
# Installing it alongside the app's package.json pulled the entire dependency
# tree back down: next, lucide-react and the rest, taking node_modules to
# 849MB. npm installs the named package *and* reconciles everything else the
# manifest declares. A minimal manifest is the fix.
FROM base AS prisma-cli
WORKDIR /cli
COPY package.json /tmp/app-package.json
RUN node -e "const a=require('/tmp/app-package.json'); \
      require('fs').writeFileSync('package.json', JSON.stringify({ \
        name:'prisma-cli', private:true, \
        dependencies:{ prisma: a.dependencies.prisma } \
      }))" \
 && npm install --no-audit --no-fund --omit=dev \
 && npm cache clean --force

# ---------------------------------------------------------------- runtime
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

# Next's standalone output does not include either of these.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# The migration toolchain lives entirely under /opt/prisma-cli: the CLI, the
# schema and the config together. Keeping it out of /app avoids colliding with
# the node_modules that Next's standalone build traced, and keeping the three
# together means prisma.config.ts can resolve its own `prisma/config` import,
# which it cannot do from a directory with no prisma package in it.
COPY --from=prisma-cli /cli /opt/prisma-cli
COPY --from=builder /app/prisma /opt/prisma-cli/prisma
COPY --from=builder /app/prisma.config.ts /opt/prisma-cli/prisma.config.ts

COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

USER nextjs
EXPOSE 3000

# Dokploy uses this to decide whether the container came up.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
