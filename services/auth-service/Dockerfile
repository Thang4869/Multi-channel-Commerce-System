# ============================================
# DOCKERFILE - AUTH SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app


# Copy workspace manifests and shared types so Yarn resolves the local package.
COPY package.json ./
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

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy workspace manifests and shared types so runtime resolution matches build.
COPY package.json ./
COPY packages/types ./packages/types
COPY services/auth-service/package.json ./services/auth-service/package.json
COPY services/auth-service/prisma ./services/auth-service/prisma
RUN yarn install --frozen-lockfile --non-interactive --production
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy built app
WORKDIR /app/services/auth-service
COPY --from=builder /app/services/auth-service/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3001

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
