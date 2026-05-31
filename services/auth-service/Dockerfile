# ============================================
# DOCKERFILE - AUTH SERVICE
# ============================================

FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json ./
COPY yarn.lock ./
COPY packages/types ./packages/types
COPY services/auth-service/package.json ./services/auth-service/package.json
COPY services/auth-service/tsconfig.json ./services/auth-service/tsconfig.json
COPY services/auth-service/prisma ./services/auth-service/prisma

RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/services/auth-service

RUN npx prisma generate

# Copy source
COPY services/auth-service/src ./src

# Build
RUN yarn build

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app/services/auth-service

ENV NODE_ENV=production

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/services/auth-service/dist ./dist

USER nonroot

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
	CMD ["node", "-e", "fetch('http://127.0.0.1:3001/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["dist/main.js"]
