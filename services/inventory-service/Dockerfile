# ============================================
# DOCKERFILE - INVENTORY SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app


# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json yarn.lock ./
COPY packages/types ./packages/types
COPY services/inventory-service/package.json ./services/inventory-service/package.json
COPY services/inventory-service/tsconfig.json ./services/inventory-service/tsconfig.json
COPY services/inventory-service/prisma ./services/inventory-service/prisma
RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/services/inventory-service

RUN npx prisma generate

COPY services/inventory-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init


# Copy workspace manifests and shared types so runtime resolution matches build.
COPY package.json yarn.lock ./
COPY packages/types ./packages/types
COPY services/inventory-service/package.json ./services/inventory-service/package.json
COPY services/inventory-service/prisma ./services/inventory-service/prisma
RUN yarn install --frozen-lockfile --non-interactive --production
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

WORKDIR /app/services/inventory-service
COPY --from=builder /app/services/inventory-service/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3004

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
