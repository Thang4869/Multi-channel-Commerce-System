# ============================================
# DOCKERFILE - NEXT.JS WAREHOUSE DASHBOARD
# ============================================

FROM node:22.22.3-bookworm-slim AS builder

WORKDIR /app

COPY apps/web/warehouse-dashboard/package.json .
RUN yarn install

COPY apps/web/warehouse-dashboard .

RUN yarn build

FROM node:22.22.3-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

COPY apps/web/warehouse-dashboard/package.json .
RUN yarn install --production

COPY --from=builder /app/.next ./.next
COPY apps/web/warehouse-dashboard/next.config.js .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3010

ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "start"]
