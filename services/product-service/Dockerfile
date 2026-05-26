# ============================================
# DOCKERFILE - PRODUCT SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app


# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/product-service/package.json ./services/product-service/package.json
COPY services/product-service/tsconfig.json ./services/product-service/tsconfig.json
COPY services/product-service/prisma ./services/product-service/prisma
RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/services/product-service
RUN npx prisma generate

COPY services/product-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init


# Copy workspace manifests and shared types so runtime resolution matches build.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/product-service/package.json ./services/product-service/package.json
COPY services/product-service/prisma ./services/product-service/prisma
RUN yarn install --frozen-lockfile --non-interactive --production
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

WORKDIR /app/services/product-service
COPY --from=builder /app/services/product-service/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3003

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
