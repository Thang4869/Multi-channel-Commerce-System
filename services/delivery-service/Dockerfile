# ============================================
# DOCKERFILE - DELIVERY SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY services/delivery-service/package.json .
COPY services/delivery-service/tsconfig.json .
COPY services/delivery-service/prisma ./prisma
RUN yarn install

COPY services/delivery-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY services/delivery-service/package.json .
COPY services/delivery-service/prisma ./prisma
RUN yarn install --production

COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3005

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
