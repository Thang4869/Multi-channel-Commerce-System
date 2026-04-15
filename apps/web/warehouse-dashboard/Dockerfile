# ============================================
# DOCKERFILE - NEXT.JS WAREHOUSE DASHBOARD
# ============================================

FROM node:22-alpine AS builder

WORKDIR /app

COPY apps/web/warehouse-dashboard/package.json .
RUN yarn install

COPY apps/web/warehouse-dashboard .

RUN yarn build

FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY apps/web/warehouse-dashboard/package.json .
RUN yarn install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY apps/web/warehouse-dashboard/next.config.js .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3010

ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "start"]
