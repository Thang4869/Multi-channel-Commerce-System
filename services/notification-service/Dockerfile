# ============================================
# DOCKERFILE - NOTIFICATION SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY services/notification-service/package.json .
COPY services/notification-service/tsconfig.json .
COPY services/notification-service/prisma ./prisma
RUN yarn install

COPY services/notification-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY services/notification-service/package.json .
COPY services/notification-service/prisma ./prisma
RUN yarn install --production

COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3008

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
