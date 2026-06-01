# ============================================
# DOCKERFILE - NEXT.JS SHOE STORE
# ============================================

FROM node:22.22.3-bookworm-slim AS deps

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY packages/types/package.json ./packages/types/package.json
COPY apps/web/shoe-store/package.json ./apps/web/shoe-store/package.json

RUN yarn install --frozen-lockfile --non-interactive

FROM deps AS builder

COPY packages/types ./packages/types
COPY apps/web/shoe-store ./apps/web/shoe-store

WORKDIR /app/apps/web/shoe-store

RUN yarn build

FROM node:22.22.3-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3020

COPY package.json ./
COPY yarn.lock ./
COPY packages/types ./packages/types
COPY apps/web/shoe-store/package.json ./apps/web/shoe-store/package.json

RUN yarn install --frozen-lockfile --non-interactive --production=true && yarn cache clean

COPY --from=builder /app/apps/web/shoe-store/.next ./apps/web/shoe-store/.next
COPY apps/web/shoe-store/next.config.js ./apps/web/shoe-store/next.config.js
COPY apps/web/shoe-store/tsconfig.json ./apps/web/shoe-store/tsconfig.json
COPY apps/web/shoe-store/src ./apps/web/shoe-store/src

WORKDIR /app/apps/web/shoe-store

EXPOSE 3020

CMD ["yarn", "start"]
