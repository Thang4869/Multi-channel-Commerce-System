# Multi-Channel Commerce System

Lightweight monorepo for a multi-service commerce platform (Next.js frontend, Flutter mobile, and Node.js microservices).

## Overview

- Frontend: `apps/web/warehouse-dashboard` (Next.js)
- Mobile: `apps/mobile/delivery-mobile-app` (Flutter)
- Services: `services/*` (auth, order, etc.)
- Shared types: `packages/types`
- Infra: Docker Compose + Nginx reverse proxy

## Quick Start (recommended)

1. Clone and enter repo:

```bash
git clone <repo> && cd <repo>
```

2. Start all services with Docker:

```bash
docker-compose up -d --build
```

3. Seed the database (example):

```bash
docker-compose exec auth-service npx prisma migrate dev
docker-compose exec auth-service npx prisma db seed
```

4. Open the dashboard at: `http://localhost:3010`

## Local development

- Install dependencies: `yarn install`

- Start the dashboard:

```bash
cd apps/web/warehouse-dashboard
yarn dev
```

- Start a service (example):

```bash
cd services/auth-service
yarn dev
```

## Config files

Keep primary entries at the repository root (do not move): `package.json`, `yarn.lock`, `docker-compose.yml`, `apps/`, `services/`, `packages/`, `infrastructure/`, `database/`, `docs/`, `scripts/`, and `.github/`.

Smaller tool configs have been consolidated under `config/` to tidy the root while compatibility shims are provided where necessary.

## Troubleshooting

- If VS Code shows many TypeScript errors: run `yarn install` or follow `docs/runbooks/fixes/errors-fix.md`.
- If ports conflict: use `docker-compose ps` and stop conflicting services.

## Contributing

- Branch from `main`, make changes, and open a PR for review.

Last updated: April 2026
*** End Patch