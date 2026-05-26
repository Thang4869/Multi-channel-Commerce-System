# ============================================
# DOCKERFILE - WAREHOUSE SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app


# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/warehouse-service/package.json ./services/warehouse-service/package.json
COPY services/warehouse-service/tsconfig.json ./services/warehouse-service/tsconfig.json
COPY services/warehouse-service/prisma ./services/warehouse-service/prisma
RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/services/warehouse-service

COPY services/warehouse-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init


# Copy workspace manifests and shared types so runtime resolution matches build.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/warehouse-service/package.json ./services/warehouse-service/package.json
COPY services/warehouse-service/prisma ./services/warehouse-service/prisma
RUN yarn install --frozen-lockfile --non-interactive --production

WORKDIR /app/services/warehouse-service
COPY --from=builder /app/services/warehouse-service/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3006

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
