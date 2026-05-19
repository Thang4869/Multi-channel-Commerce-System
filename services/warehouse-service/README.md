# Warehouse Service

Warehouse orchestration and outbound distribution service for the multi-channel commerce system.

## Purpose

Provides warehouse management, transaction tracking, and distribution lifecycle APIs.

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL with `warehouse_schema`
- Redis (already wired in compose for future event-driven flows)

### Local Run

```bash
cd services/warehouse-service
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Service listens on `http://localhost:3006` by default.

## API Overview

### Warehouse Management
- `POST /warehouse` create warehouse
- `GET /warehouse` list warehouses
- `GET /warehouse/:id` warehouse detail with transactions and distributions
- `PUT /warehouse/:id` update warehouse metadata

### Transactions
- `POST /warehouse/transactions` record warehouse transaction

### Distributions
- `POST /warehouse/distributions` create distribution request
- `PUT /warehouse/distributions/:id/status` update distribution status
- `GET /warehouse/distributions` list distributions

## Environment Variables

```
PORT=3006
DATABASE_URL=postgresql://postgres:password@localhost:5432/commerce_db?schema=warehouse_schema
INVENTORY_SERVICE_URL=http://inventory-service:3004
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:3010,http://localhost:3000
NODE_ENV=development
```

## Architecture

- `application/`: Business rules and callbacks
- `infrastructure/`: Prisma-backed repository
- `interfaces/http/`: REST controllers
- `dtos/`: Request validation models

## Inventory Callback

When a distribution is completed or fails, the service notifies inventory service via:

- `POST {INVENTORY_SERVICE_URL}/internal/warehouse/distribution-callback`
- Payload: `{ warehouseId, productId, quantity, status }`
