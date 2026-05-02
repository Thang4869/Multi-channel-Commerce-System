# ============================================
# DOCKERFILE - INVENTORY SERVICE
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY services/inventory-service/package.json .
COPY services/inventory-service/tsconfig.json .
COPY services/inventory-service/prisma ./prisma
RUN yarn install
RUN npx prisma generate

COPY services/inventory-service/src ./src

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY services/inventory-service/package.json .
COPY services/inventory-service/prisma ./prisma
RUN yarn install --production
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

COPY --from=builder /app/dist ./dist

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3004

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
