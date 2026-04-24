# ============================================
# DOCKERFILE - AUTH SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY services/auth-service/package.json .
COPY services/auth-service/tsconfig.json .
RUN yarn install

# Copy source
COPY services/auth-service/src ./src

# Build
RUN yarn build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy package files
COPY services/auth-service/package.json .
RUN yarn install --production

# Copy built app
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3001

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
