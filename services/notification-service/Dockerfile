# ============================================
# DOCKERFILE - NOTIFICATION SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app


# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json yarn.lock ./
COPY packages/types ./packages/types
COPY services/notification-service/package.json ./services/notification-service/package.json
COPY services/notification-service/tsconfig.json ./services/notification-service/tsconfig.json
COPY services/notification-service/prisma ./services/notification-service/prisma
RUN yarn install --frozen-lockfile --non-interactive

WORKDIR /app/services/notification-service

COPY services/notification-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init


# Copy workspace manifests and shared types so runtime resolution matches build.
COPY package.json yarn.lock ./
COPY packages/types ./packages/types
COPY services/notification-service/package.json ./services/notification-service/package.json
COPY services/notification-service/prisma ./services/notification-service/prisma
RUN yarn install --frozen-lockfile --non-interactive --production

WORKDIR /app/services/notification-service
COPY --from=builder /app/services/notification-service/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3008

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
