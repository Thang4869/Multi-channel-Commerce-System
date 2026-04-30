# Git Workflow Execution Plan

## Overview
- Tong so thay doi: 112 files (4193 insertions, 199 deletions) so voi origin/chore/clean-docs
- So luong commit du kien: 53
- So ngay phan bo: 21 (moi ngay 2-3 commits)
- So PR du kien: 7

---

## Daily Execution Plan

### Day 1 - 2026-04-29

#### 1. Scope
- Prisma schemas for auth/order and env alignment

#### 2. Issue
- Title: Prisma schema split and env templates
- Description:
  - Add Prisma schemas for auth and order
  - Align auth/order env examples
- Labels:
  - backend: service-infra
  - security: none
  - refactor: infra

#### 3. Branch
chore/prisma-env-split

#### 4. Commits (Conventional)
1. chore(prisma): add auth schema
2. chore(prisma): add order schema
3. chore(env): update auth and order env examples

#### 5. Git Commands
```bash
git checkout -b chore/prisma-env-split origin/chore/clean-docs
git cherry-pick -n fe308a2 007e7fe
git add services/auth-service/prisma/schema.prisma
git commit -m "chore(prisma): add auth schema"
git add services/order-service/prisma/schema.prisma
git commit -m "chore(prisma): add order schema"
git add services/auth-service/.env.example services/order-service/.env.example
git commit -m "chore(env): update auth and order env examples"
git push origin chore/prisma-env-split
```

### Day 2 - 2026-04-30

#### 1. Scope
- Prisma schemas for product, inventory, delivery, warehouse

#### 2. Issue
- Title: Prisma schema split and env templates
- Description:
  - Add Prisma schemas for product and inventory
  - Add Prisma schemas for delivery and warehouse
- Labels:
  - backend: service-infra
  - security: none
  - refactor: infra

#### 3. Branch
chore/prisma-env-split

#### 4. Commits (Conventional)
1. chore(prisma): add product and inventory schemas
2. chore(prisma): add delivery and warehouse schemas

#### 5. Git Commands
```bash
git checkout chore/prisma-env-split
git add services/product-service/prisma/schema.prisma services/inventory-service/prisma/schema.prisma
git commit -m "chore(prisma): add product and inventory schemas"
git add services/delivery-service/prisma/schema.prisma services/warehouse-service/prisma/schema.prisma
git commit -m "chore(prisma): add delivery and warehouse schemas"
git push origin chore/prisma-env-split
```

### Day 3 - 2026-05-01

#### 1. Scope
- Notification schema, env templates, docs update

#### 2. Issue
- Title: Prisma schema split and env templates
- Description:
  - Add notification schema
  - Add env examples for new services
  - Update workflow docs and remove stale index
- Labels:
  - backend: service-infra
  - security: none
  - refactor: infra

#### 3. Branch
chore/prisma-env-split

#### 4. Commits (Conventional)
1. chore(prisma): add notification schema
2. chore(env): add env examples for new services
3. docs(git): remove stale index and update workflow plan

#### 5. Git Commands
```bash
git checkout chore/prisma-env-split
git add services/notification-service/prisma/schema.prisma
git commit -m "chore(prisma): add notification schema"
git add services/product-service/.env.example services/inventory-service/.env.example services/delivery-service/.env.example services/warehouse-service/.env.example services/notification-service/.env.example
git commit -m "chore(env): add env examples for new services"
git add MARKDOWN_INDEX.md docs/git-workflow-plan.md
git commit -m "docs(git): remove stale index and update workflow plan"
git push origin chore/prisma-env-split
```

### Day 4 - 2026-05-02

#### 1. Scope
- Service package metadata (auth/order/product/inventory)

#### 2. Issue
- Title: Service packaging and build metadata
- Description:
  - Add prisma scripts and shared types dependency
  - Add package.json for product/inventory
- Labels:
  - backend: build
  - security: none
  - refactor: build

#### 3. Branch
chore/service-packaging

#### 4. Commits (Conventional)
1. chore(auth): add prisma scripts and types dependency
2. chore(order): add prisma scripts and types dependency
3. chore(services): add package.json for product and inventory

#### 5. Git Commands
```bash
git checkout -b chore/service-packaging origin/chore/clean-docs
git cherry-pick -n fe308a2 007e7fe
git add services/auth-service/package.json
git commit -m "chore(auth): add prisma scripts and types dependency"
git add services/order-service/package.json
git commit -m "chore(order): add prisma scripts and types dependency"
git add services/product-service/package.json services/inventory-service/package.json
git commit -m "chore(services): add package.json for product and inventory"
git push origin chore/service-packaging
```

### Day 5 - 2026-05-03

#### 1. Scope
- Service package metadata (delivery/warehouse/notification) and tsconfig

#### 2. Issue
- Title: Service packaging and build metadata
- Description:
  - Add package.json for delivery/warehouse/notification
  - Add tsconfig for new services
- Labels:
  - backend: build
  - security: none
  - refactor: build

#### 3. Branch
chore/service-packaging

#### 4. Commits (Conventional)
1. chore(services): add package.json for delivery and warehouse
2. chore(services): add package.json for notification
3. chore(build): add tsconfig for new services

#### 5. Git Commands
```bash
git checkout chore/service-packaging
git add services/delivery-service/package.json services/warehouse-service/package.json
git commit -m "chore(services): add package.json for delivery and warehouse"
git add services/notification-service/package.json
git commit -m "chore(services): add package.json for notification"
git add services/product-service/tsconfig.json services/inventory-service/tsconfig.json services/delivery-service/tsconfig.json services/warehouse-service/tsconfig.json services/notification-service/tsconfig.json
git commit -m "chore(build): add tsconfig for new services"
git push origin chore/service-packaging
```

### Day 6 - 2026-05-04

#### 1. Scope
- Dockerfiles for services (auth/order/product/inventory)

#### 2. Issue
- Title: Docker build assets
- Description:
  - Update auth/order dockerfiles for prisma
  - Add dockerfiles for product/inventory
- Labels:
  - backend: build
  - security: none
  - refactor: build

#### 3. Branch
chore/compose-gateway-ci

#### 4. Commits (Conventional)
1. chore(docker): update auth and order dockerfiles for prisma
2. chore(docker): add dockerfiles for product and inventory

#### 5. Git Commands
```bash
git checkout -b chore/compose-gateway-ci origin/chore/clean-docs
git cherry-pick -n fe308a2 007e7fe
git add services/auth-service/Dockerfile services/order-service/Dockerfile
git commit -m "chore(docker): update auth and order dockerfiles for prisma"
git add services/product-service/Dockerfile services/inventory-service/Dockerfile
git commit -m "chore(docker): add dockerfiles for product and inventory"
git push origin chore/compose-gateway-ci
```

### Day 7 - 2026-05-05

#### 1. Scope
- Dockerfiles for services (delivery/warehouse/notification)

#### 2. Issue
- Title: Docker build assets
- Description:
  - Add dockerfiles for delivery/warehouse
  - Add dockerfile for notification
- Labels:
  - backend: build
  - security: none
  - refactor: build

#### 3. Branch
chore/compose-gateway-ci

#### 4. Commits (Conventional)
1. chore(docker): add dockerfiles for delivery and warehouse
2. chore(docker): add dockerfile for notification

#### 5. Git Commands
```bash
git checkout chore/compose-gateway-ci
git add services/delivery-service/Dockerfile services/warehouse-service/Dockerfile
git commit -m "chore(docker): add dockerfiles for delivery and warehouse"
git add services/notification-service/Dockerfile
git commit -m "chore(docker): add dockerfile for notification"
git push origin chore/compose-gateway-ci
```

### Day 8 - 2026-05-06

#### 1. Scope
- Docker compose wiring (services and env)

#### 2. Issue
- Title: Compose and gateway wiring
- Description:
  - Add services to docker-compose (part 1)
  - Add services to docker-compose (part 2)
- Labels:
  - backend: infra
  - security: none
  - refactor: infra

#### 3. Branch
chore/compose-gateway-ci

#### 4. Commits (Conventional)
1. chore(compose): add services to docker-compose (part 1)
2. chore(compose): add services to docker-compose (part 2)

#### 5. Git Commands
```bash
git checkout chore/compose-gateway-ci
git add -p docker-compose.yml
git commit -m "chore(compose): add services to docker-compose (part 1)"
git add -p docker-compose.yml
git commit -m "chore(compose): add services to docker-compose (part 2)"
git push origin chore/compose-gateway-ci
```

### Day 9 - 2026-05-07

#### 1. Scope
- Compose env alignment, nginx routes, CI

#### 2. Issue
- Title: Compose and gateway wiring
- Description:
  - Align schema env and API URL
  - Add nginx upstreams and routes
  - Extend CI build steps
- Labels:
  - backend: infra
  - security: none
  - refactor: infra

#### 3. Branch
chore/compose-gateway-ci

#### 4. Commits (Conventional)
1. chore(compose): align schema env and API URL
2. feat(gateway): add nginx upstreams and routes
3. chore(ci): extend workflow build steps

#### 5. Git Commands
```bash
git checkout chore/compose-gateway-ci
git add docker-compose.yml
git commit -m "chore(compose): align schema env and API URL"
git add infrastructure/nginx/conf.d/default.conf
git commit -m "feat(gateway): add nginx upstreams and routes"
git add .github/workflows/ci-cd.yml
git commit -m "chore(ci): extend workflow build steps"
git push origin chore/compose-gateway-ci
```

### Day 10 - 2026-05-08

#### 1. Scope
- Product service bootstrap and domain

#### 2. Issue
- Title: Product catalog service
- Description:
  - Add bootstrap and module wiring
  - Add domain entities
  - Add DTOs and interfaces
- Labels:
  - backend: catalog
  - security: none
  - refactor: none

#### 3. Branch
feat/product-service-core

#### 4. Commits (Conventional)
1. feat(product): add bootstrap and module
2. feat(product): add domain entities
3. feat(product): add DTOs and interfaces

#### 5. Git Commands
```bash
git checkout -b feat/product-service-core origin/chore/clean-docs
git cherry-pick -n fe308a2 007e7fe
git add services/product-service/src/main.ts services/product-service/src/modules/product/product.module.ts
git commit -m "feat(product): add bootstrap and module"
git add services/product-service/src/modules/product/domain
git commit -m "feat(product): add domain entities"
git add services/product-service/src/modules/product/application/dto services/product-service/src/modules/product/application/interfaces
git commit -m "feat(product): add DTOs and interfaces"
git push origin feat/product-service-core
```

### Day 11 - 2026-05-09

#### 1. Scope
- Product repositories and controllers

#### 2. Issue
- Title: Product catalog service
- Description:
  - Add repositories
  - Add service layer
  - Add controllers
- Labels:
  - backend: catalog
  - security: none
  - refactor: none

#### 3. Branch
feat/product-service-core

#### 4. Commits (Conventional)
1. feat(product): add repositories
2. feat(product): add service layer
3. feat(product): add controllers

#### 5. Git Commands
```bash
git checkout feat/product-service-core
git add services/product-service/src/modules/product/infrastructure/repositories
git commit -m "feat(product): add repositories"
git add services/product-service/src/modules/product/application/use-cases/product.service.ts
git commit -m "feat(product): add service layer"
git add services/product-service/src/modules/product/interfaces
git commit -m "feat(product): add controllers"
git push origin feat/product-service-core
```

### Day 12 - 2026-05-10

#### 1. Scope
- Inventory bootstrap and domain

#### 2. Issue
- Title: Inventory lock flow and order events
- Description:
  - Add inventory bootstrap/module
  - Add inventory entities and DTOs
- Labels:
  - backend: inventory
  - security: none
  - refactor: order-flow

#### 3. Branch
feat/inventory-order-flow

#### 4. Commits (Conventional)
1. feat(inventory): add bootstrap and module
2. feat(inventory): add entities
3. feat(inventory): add DTOs

#### 5. Git Commands
```bash
git checkout -b feat/inventory-order-flow origin/chore/clean-docs
git cherry-pick -n fe308a2 007e7fe
git add services/inventory-service/src/main.ts services/inventory-service/src/modules/inventory/inventory.module.ts
git commit -m "feat(inventory): add bootstrap and module"
git add services/inventory-service/src/modules/inventory/domain
git commit -m "feat(inventory): add entities"
git add services/inventory-service/src/modules/inventory/application/dto
git commit -m "feat(inventory): add DTOs"
git push origin feat/inventory-order-flow
```

### Day 13 - 2026-05-11

#### 1. Scope
- Inventory repository, controller, events

#### 2. Issue
- Title: Inventory lock flow and order events
- Description:
  - Add repository and controller
  - Add redis event bus and consumer
- Labels:
  - backend: inventory
  - security: none
  - refactor: order-flow

#### 3. Branch
feat/inventory-order-flow

#### 4. Commits (Conventional)
1. feat(inventory): add repository and controller
2. feat(inventory): add redis event bus
3. feat(inventory): add event consumer

#### 5. Git Commands
```bash
git checkout feat/inventory-order-flow
git add services/inventory-service/src/modules/inventory/infrastructure/repositories services/inventory-service/src/modules/inventory/interfaces
git commit -m "feat(inventory): add repository and controller"
git add services/inventory-service/src/modules/inventory/infrastructure/events/redis-event-bus.ts
git commit -m "feat(inventory): add redis event bus"
git add services/inventory-service/src/modules/inventory/infrastructure/events/inventory-events.consumer.ts
git commit -m "feat(inventory): add event consumer"
git push origin feat/inventory-order-flow
```

### Day 14 - 2026-05-12

#### 1. Scope
- Order events and query endpoints

#### 2. Issue
- Title: Inventory lock flow and order events
- Description:
  - Publish order events
  - Add order event consumer updates
  - Add order query use cases and endpoints
- Labels:
  - backend: order
  - security: none
  - refactor: order-flow

#### 3. Branch
feat/inventory-order-flow

#### 4. Commits (Conventional)
1. refactor(order): publish order events
2. refactor(order): update order events consumer
3. feat(order): add query use cases and endpoints

#### 5. Git Commands
```bash
git checkout feat/inventory-order-flow
git add services/order-service/src/modules/order/application/use-cases/create-order.use-case.ts services/order-service/src/modules/order/application/use-cases/confirm-order.use-case.ts services/order-service/src/modules/order/application/use-cases/cancel-order.use-case.ts services/order-service/src/modules/order/application/use-cases/update-order-status.use-case.ts services/order-service/src/modules/order/infrastructure/events/redis-event-bus.ts services/order-service/src/modules/order/order.module.ts
git commit -m "refactor(order): publish order events"
git add services/order-service/src/modules/order/infrastructure/events/order-events.consumer.ts
git commit -m "refactor(order): update order events consumer"
git add services/order-service/src/modules/order/application/use-cases/get-order.use-case.ts services/order-service/src/modules/order/application/use-cases/list-orders.use-case.ts services/order-service/src/modules/order/application/use-cases/index.ts services/order-service/src/modules/order/interfaces/http/controllers/order.controller.ts
git commit -m "feat(order): add query use cases and endpoints"
git push origin feat/inventory-order-flow
```

### Day 15 - 2026-05-13

#### 1. Scope
- Delivery bootstrap and domain

#### 2. Issue
- Title: Fulfillment services
- Description:
  - Add delivery bootstrap/module
  - Add delivery entities
  - Add delivery DTOs/interfaces
- Labels:
  - backend: fulfillment
  - security: none
  - refactor: none

#### 3. Branch
feat/fulfillment-services

#### 4. Commits (Conventional)
1. feat(delivery): add bootstrap and module
2. feat(delivery): add entities
3. feat(delivery): add DTOs and interfaces

#### 5. Git Commands
```bash
git checkout -b feat/fulfillment-services origin/chore/clean-docs
git cherry-pick -n fe308a2 007e7fe
git add services/delivery-service/src/main.ts services/delivery-service/src/modules/delivery/delivery.module.ts
git commit -m "feat(delivery): add bootstrap and module"
git add services/delivery-service/src/modules/delivery/domain
git commit -m "feat(delivery): add entities"
git add services/delivery-service/src/modules/delivery/application/dto services/delivery-service/src/modules/delivery/application/interfaces
git commit -m "feat(delivery): add DTOs and interfaces"
git push origin feat/fulfillment-services
```

### Day 16 - 2026-05-14

#### 1. Scope
- Delivery repository, controller, events

#### 2. Issue
- Title: Fulfillment services
- Description:
  - Add delivery repository and controller
  - Add redis event bus and consumer
- Labels:
  - backend: fulfillment
  - security: none
  - refactor: none

#### 3. Branch
feat/fulfillment-services

#### 4. Commits (Conventional)
1. feat(delivery): add repository
2. feat(delivery): add controllers
3. feat(delivery): add redis event bus and consumer

#### 5. Git Commands
```bash
git checkout feat/fulfillment-services
git add services/delivery-service/src/modules/delivery/infrastructure/repositories
git commit -m "feat(delivery): add repository"
git add services/delivery-service/src/modules/delivery/interfaces
git commit -m "feat(delivery): add controllers"
git add services/delivery-service/src/modules/delivery/infrastructure/events
git commit -m "feat(delivery): add redis event bus and consumer"
git push origin feat/fulfillment-services
```

### Day 17 - 2026-05-15

#### 1. Scope
- Delivery status publish and warehouse core

#### 2. Issue
- Title: Fulfillment services
- Description:
  - Publish delivery status updates
  - Add warehouse bootstrap/module and entities
- Labels:
  - backend: fulfillment
  - security: none
  - refactor: none

#### 3. Branch
feat/fulfillment-services

#### 4. Commits (Conventional)
1. feat(delivery): publish status updates
2. feat(warehouse): add bootstrap and module
3. feat(warehouse): add entities and repository

#### 5. Git Commands
```bash
git checkout feat/fulfillment-services
git add services/delivery-service/src/modules/delivery/application/use-cases/delivery.service.ts
git commit -m "feat(delivery): publish status updates"
git add services/warehouse-service/src/main.ts services/warehouse-service/src/modules/warehouse/warehouse.module.ts
git commit -m "feat(warehouse): add bootstrap and module"
git add services/warehouse-service/src/modules/warehouse/domain services/warehouse-service/src/modules/warehouse/infrastructure/repositories
git commit -m "feat(warehouse): add entities and repository"
git push origin feat/fulfillment-services
```

### Day 18 - 2026-05-16

#### 1. Scope
- Warehouse DTOs, service, controller, inventory client

#### 2. Issue
- Title: Fulfillment services
- Description:
  - Add DTOs and service layer
  - Add controller and inventory HTTP client
- Labels:
  - backend: fulfillment
  - security: none
  - refactor: none

#### 3. Branch
feat/fulfillment-services

#### 4. Commits (Conventional)
1. feat(warehouse): add DTOs and service layer
2. feat(warehouse): add controller and inventory client

#### 5. Git Commands
```bash
git checkout feat/fulfillment-services
git add services/warehouse-service/src/modules/warehouse/application services/warehouse-service/src/modules/warehouse/application/use-cases/warehouse.service.ts
git commit -m "feat(warehouse): add DTOs and service layer"
git add services/warehouse-service/src/modules/warehouse/interfaces services/warehouse-service/src/modules/warehouse/infrastructure/services
git commit -m "feat(warehouse): add controller and inventory client"
git push origin feat/fulfillment-services
```

### Day 19 - 2026-05-17

#### 1. Scope
- Notification bootstrap and domain

#### 2. Issue
- Title: Notifications and client integration
- Description:
  - Add notification bootstrap/module
  - Add entities and DTOs
  - Add repository and controller
- Labels:
  - backend: notification
  - security: none
  - refactor: none

#### 3. Branch
feat/notification-and-clients

#### 4. Commits (Conventional)
1. feat(notification): add bootstrap and module
2. feat(notification): add entities and DTOs
3. feat(notification): add repository and controller

#### 5. Git Commands
```bash
git checkout -b feat/notification-and-clients origin/chore/clean-docs
git cherry-pick -n fe308a2 007e7fe
git add services/notification-service/src/main.ts services/notification-service/src/modules/notification/notification.module.ts
git commit -m "feat(notification): add bootstrap and module"
git add services/notification-service/src/modules/notification/domain services/notification-service/src/modules/notification/application
git commit -m "feat(notification): add entities and DTOs"
git add services/notification-service/src/modules/notification/infrastructure/repositories services/notification-service/src/modules/notification/interfaces
git commit -m "feat(notification): add repository and controller"
git push origin feat/notification-and-clients
```

### Day 20 - 2026-05-18

#### 1. Scope
- Notification events and client integration (web/mobile)

#### 2. Issue
- Title: Notifications and client integration
- Description:
  - Add redis event bus and consumer
  - Integrate web products and checkout
  - Update mobile delivery app API config
- Labels:
  - backend: notification
  - security: none
  - refactor: none

#### 3. Branch
feat/notification-and-clients

#### 4. Commits (Conventional)
1. feat(notification): add redis event bus and consumer
2. feat(web): add products and checkout flows
3. feat(mobile): update delivery app API config

#### 5. Git Commands
```bash
git checkout feat/notification-and-clients
git add services/notification-service/src/modules/notification/infrastructure/events
git commit -m "feat(notification): add redis event bus and consumer"
git add apps/web/warehouse-dashboard/src/app/products apps/web/warehouse-dashboard/src/app/checkout apps/web/warehouse-dashboard/src/lib/api.ts apps/web/warehouse-dashboard/src/store/index.ts apps/web/warehouse-dashboard/src/app/dashboard/page.tsx
git commit -m "feat(web): add products and checkout flows"
git add apps/mobile/delivery-mobile-app/lib/services/api_service.dart apps/mobile/delivery-mobile-app/lib/providers/providers.dart
git commit -m "feat(mobile): update delivery app API config"
git push origin feat/notification-and-clients
```

### Day 21 - 2026-05-19

#### 1. Scope
- Optional polish (if needed): web API base alignment and compose verification

#### 2. Issue
- Title: Notifications and client integration
- Description:
  - Reserve day for small fixes and follow-up commits
- Labels:
  - backend: notification
  - security: none
  - refactor: none

#### 3. Branch
feat/notification-and-clients

#### 4. Commits (Conventional)
1. chore(client): optional follow-up fixes
2. chore(compose): optional follow-up fixes

#### 5. Git Commands
```bash
git checkout feat/notification-and-clients
# If no follow-up changes, skip commits and only push status
git status -sb
```
```
