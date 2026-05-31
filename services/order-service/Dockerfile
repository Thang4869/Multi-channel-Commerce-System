# ============================================
# DOCKERFILE - ORDER SERVICE
# ============================================

FROM node:22.22.3-bookworm-slim AS builder

WORKDIR /app


# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/order-service/package.json ./services/order-service/package.json
COPY services/order-service/tsconfig.json ./services/order-service/tsconfig.json
COPY services/order-service/prisma ./services/order-service/prisma
RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/services/order-service
RUN npx prisma generate

COPY services/order-service/src ./src

RUN yarn build

FROM node:22.22.3-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*


# Copy workspace manifests and shared types so runtime resolution matches build.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/order-service/package.json ./services/order-service/package.json
COPY services/order-service/prisma ./services/order-service/prisma
RUN yarn install --frozen-lockfile --non-interactive --production
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

WORKDIR /app/services/order-service
COPY --from=builder /app/services/order-service/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3002

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
