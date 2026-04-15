# ============================================
# DOCKERFILE - ORDER SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY services/order-service/package.json .
COPY services/order-service/tsconfig.json .
RUN yarn install

COPY services/order-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY services/order-service/package.json .
RUN yarn install --production

COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3002

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
