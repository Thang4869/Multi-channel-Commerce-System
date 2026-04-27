# Multi-Channel Commerce System

Lightweight monorepo for a multi-service commerce platform (Next.js frontend, Flutter mobile, and Node.js microservices).

## Overview
- Frontend: `apps/web/warehouse-dashboard` (Next.js)
- Mobile: `apps/mobile/delivery-mobile-app` (Flutter)
- Services: `services/*` (auth, order, etc.)
- Shared types: `packages/types`
- Infra: Docker compose + Nginx reverse proxy

## Quick Start (recommended)
1. Clone and enter repo
   ```bash
   git clone <repo> && cd <repo>
   ```
2. Start all services with Docker
   ```bash
   docker-compose up -d --build
   ```
3. Seed DB (example)
   ```bash
   docker-compose exec auth-service npx prisma migrate dev
   docker-compose exec auth-service npx prisma db seed
   ```
4. Dashboard: http://localhost:3010

## Local development
- Install deps: `yarn install`
- Start dashboard:
  ```bash
  cd apps/web/warehouse-dashboard
  yarn dev
  ```
- Start service (example):
  ```bash
  cd services/auth-service
  yarn dev
  ```

## Config files
Root contains primary entries (do not move): `package.json`, `yarn.lock`, `docker-compose.yml`, `apps/`, `services/`, `packages/`, `infrastructure/`, `database/`, `docs/`, `scripts/`, `.github/`.
Other small config files were consolidated under `config/` to tidy the root.

## Troubleshooting
- If VS Code shows many TypeScript errors: run `yarn install` or follow `docs/runbooks/fixes/errors-fix.md`.
- If ports conflict: use `docker-compose ps` and stop conflicting services.

## Contributing
- Branch from `main`, make changes, open a PR.

Last updated: April 2026
*** End Patch