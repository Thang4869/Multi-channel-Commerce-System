# ============================================
# DOCKERFILE - AUTH SERVICE
# ============================================

FROM node:22.22.3-bookworm-slim AS deps

WORKDIR /app

# Copy manifests first to maximize layer cache hit rate.
COPY package.json ./
COPY yarn.lock ./
COPY packages/types/package.json ./packages/types/package.json
COPY services/auth-service/package.json ./services/auth-service/package.json

RUN yarn install --frozen-lockfile --non-interactive

FROM deps AS builder

# Copy shared and service sources required for compile.
COPY packages/types ./packages/types
COPY services/auth-service/tsconfig.json ./services/auth-service/tsconfig.json
COPY services/auth-service/prisma ./services/auth-service/prisma

WORKDIR /app/services/auth-service

RUN npx prisma generate

# Copy source
COPY services/auth-service/src ./src

# Build
RUN yarn build

FROM node:22.22.3-bookworm-slim AS prod-deps

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY packages/types ./packages/types
COPY services/auth-service/package.json ./services/auth-service/package.json
COPY services/auth-service/prisma ./services/auth-service/prisma

RUN yarn install --frozen-lockfile --non-interactive --production=true && \
	cd services/auth-service && npx prisma generate && \
	yarn cache clean

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app/services/auth-service

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages/types /app/packages/types
COPY --from=builder /app/services/auth-service/dist ./dist

USER nonroot

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
	CMD ["node", "-e", "fetch('http://127.0.0.1:3001/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["dist/main.js"]
