# ============================================
# DOCKERFILE - DELIVERY SERVICE
# ============================================

FROM node:22.22.3-bookworm-slim AS builder

WORKDIR /app


# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/delivery-service/package.json ./services/delivery-service/package.json
COPY services/delivery-service/tsconfig.json ./services/delivery-service/tsconfig.json
COPY services/delivery-service/prisma ./services/delivery-service/prisma
RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/services/delivery-service

COPY services/delivery-service/src ./src

RUN yarn build

FROM node:22.22.3-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*


# Copy workspace manifests and shared types so runtime resolution matches build.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/delivery-service/package.json ./services/delivery-service/package.json
COPY services/delivery-service/prisma ./services/delivery-service/prisma
RUN yarn install --frozen-lockfile --non-interactive --production

WORKDIR /app/services/delivery-service
COPY --from=builder /app/services/delivery-service/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3005

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
