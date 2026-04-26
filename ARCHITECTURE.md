# 🏗️ ARCHITECTURE - Multi-Channel Commerce System

**Version:** 2.0 (Post-Refactor)  
**Last Updated:** 2026-04-26  
**Status:** Blueprint for Implementation

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Principles](#architecture-principles)
4. [Service Architecture](#service-architecture)
5. [Data Flow](#data-flow)
6. [Deployment Model](#deployment-model)
7. [Scaling Strategy](#scaling-strategy)
8. [Security Architecture](#security-architecture)

---

## 🎯 System Overview

This is a **multi-channel commerce system** built as a microservices monorepo designed to:

- Scale horizontally with multiple services
- Support multiple channels (web, mobile)
- Maintain data consistency across services
- Enable independent deployment of services
- Provide a clear developer experience

### High-Level Architecture

```
┌─────────────────────────────────────────────┐
│          API Gateway / Load Balancer        │
└────────────┬────────────────────────────────┘
             │
     ┌───────┼───────┐
     │       │       │
     ▼       ▼       ▼
  ┌─────┐ ┌─────┐ ┌─────┐
  │ Web │ │ App │ │ API │
  │     │ │     │ │     │
  └──┬──┘ └──┬──┘ └──┬──┘
     │       │       │
     └───────┼───────┘
             │
     ┌───────┴───────┐
     │   Auth        │
     │   Service     │
     │               │
     └───────┬───────┘
             │
     ┌───────┴──────────┐
     │                  │
     ▼                  ▼
  ┌────────┐      ┌─────────┐
  │ Order  │      │ Payment │
  │Service │      │ Service │
  └────────┘      └─────────┘
     │                  │
     └───────┬──────────┘
             │
        ┌────▼────┐
        │Database │
        │(Per SVC)│
        └─────────┘

Event Bus (Message Queue)
- Kafka / RabbitMQ
- For async communication between services
```

---

## 🛠️ Technology Stack

### Backend

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | NestJS | REST API, dependency injection |
| **Language** | TypeScript | Type safety, developer experience |
| **ORM** | Prisma | Database abstraction, migrations |
| **Database** | PostgreSQL / MongoDB | Per-service data store |
| **Auth** | JWT + Passport | Stateless authentication |
| **Validation** | Class-validator | Input validation |
| **Logging** | Winston / Pino | Structured logging |
| **Monitoring** | Prometheus + Grafana | Metrics & observability |
| **Message Queue** | RabbitMQ / Kafka | Async communication |

### Frontend

| Platform | Technology | Stack |
|----------|-----------|-------|
| **Web** | React / Next.js | React 18+, TypeScript |
| **Mobile** | Flutter | Dart, cross-platform |

### DevOps

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Containers** | Docker | Service containerization |
| **Orchestration** | Kubernetes | Container orchestration |
| **CI/CD** | GitHub Actions | Automated testing & deployment |
| **Infrastructure** | Terraform | Infrastructure as Code |
| **Reverse Proxy** | Nginx | Load balancing, routing |

---

## 🎨 Architecture Principles

### 1. **Clean Architecture (Per Service)**

Each microservice follows Clean Architecture with 4 layers:

```
┌─────────────────────────────────────────┐
│         Interfaces (HTTP Layer)         │
│  Controllers, Filters, Guards, Pipes    │
├─────────────────────────────────────────┤
│       Application (Use Case Layer)      │
│  Use Cases, DTOs, Application Services  │
├─────────────────────────────────────────┤
│        Domain (Business Logic)          │
│     Entities, Value Objects, Enums      │
├─────────────────────────────────────────┤
│     Infrastructure (Data Access)        │
│  Repositories, External Services        │
└─────────────────────────────────────────┘
```

**Benefits:**
- ✅ Testability (each layer can be tested independently)
- ✅ Flexibility (easy to swap implementations)
- ✅ Maintainability (clear separation of concerns)
- ✅ Reusability (business logic independent of frameworks)

---

### 2. **Domain-Driven Design (DDD)**

Organize code around business domains:

- **Auth Service**: User management, authentication, authorization
- **Order Service**: Order processing, order status, order history
- **Future Services**: Payment, Inventory, Shipping, etc.

Each service owns:
- Its data store
- Its business logic
- Its API contracts

---

### 3. **SOLID Principles**

| Principle | Implementation |
|-----------|-----------------|
| **S** - Single Responsibility | Each class has one reason to change |
| **O** - Open/Closed | Open for extension, closed for modification |
| **L** - Liskov Substitution | Services implement consistent interfaces |
| **I** - Interface Segregation | Specific interfaces, not fat interfaces |
| **D** - Dependency Inversion | Depend on abstractions, not implementations |

---

## 📦 Service Architecture

### Auth Service

**Purpose**: User management, authentication, authorization

**Modules:**
- `auth/`: Login, register, token refresh
- `user/`: User profile, role management (future)

**Database Schema** (Simplified):
```sql
users:
  - id (PK)
  - email (unique)
  - password_hash
  - created_at
  - updated_at

tokens:
  - id (PK)
  - user_id (FK)
  - token
  - expires_at
  - created_at
```

**API Endpoints:**
```
POST   /auth/register     - Create new user
POST   /auth/login        - Authenticate user
POST   /auth/refresh      - Refresh token
GET    /auth/verify       - Verify token (internal)
GET    /users/:id         - Get user profile
PATCH  /users/:id         - Update user profile
```

---

### Order Service

**Purpose**: Order management, order processing

**Modules:**
- `order/`: Create order, cancel order, update status
- `payment/`: Payment processing (future)

**Database Schema** (Simplified):
```sql
orders:
  - id (PK)
  - user_id (external)
  - total_amount
  - status (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)
  - created_at
  - updated_at

order_items:
  - id (PK)
  - order_id (FK)
  - product_id
  - quantity
  - unit_price
```

**API Endpoints:**
```
POST   /orders            - Create order
GET    /orders/:id        - Get order details
PATCH  /orders/:id        - Update order status
DELETE /orders/:id        - Cancel order
GET    /orders            - List user orders
```

---

## 🔄 Data Flow

### Scenario 1: User Registration

```
1. Web App → Auth Service (POST /auth/register)
   {
     "email": "user@example.com",
     "password": "secure123"
   }

2. Auth Service:
   - Validate input (use RegisterUseCase)
   - Hash password (HashService)
   - Save to DB (UserRepository)
   - Generate JWT token

3. Response:
   {
     "user": { "id": "123", "email": "user@example.com" },
     "token": "eyJhbGc..."
   }

4. Web App stores token in localStorage
```

---

### Scenario 2: Create Order

```
1. Web App → API Gateway → Order Service (POST /orders)
   Headers: { "Authorization": "Bearer <token>" }
   Body: { "items": [...], "shipping_address": {...} }

2. Order Service:
   a. AuthGuard verifies token via Auth Service
      GET http://auth-service:3001/auth/verify
   
   b. CreateOrderUseCase processes:
      - Validate input (DTOs)
      - Create Order entity
      - Save to DB (OrderRepository)
      - Publish event: order.created
   
   c. Message Queue receives event
      → Payment Service: Charge payment
      → Inventory Service: Reserve items (future)
      → Shipping Service: Schedule pickup (future)

3. Response:
   {
     "order": { "id": "456", "status": "PENDING", ... }
   }

4. Services receive events and process independently
```

---

## 🚀 Deployment Model

### Local Development
```bash
docker-compose up
# Starts: Auth Service, Order Service, Postgres, Redis, etc.
```

### Production Deployment
```
GitHub Repository
    ↓ (push to main)
GitHub Actions Pipeline
    ↓ (CI/CD)
    ├─ Lint & Type Check
    ├─ Run Tests
    ├─ Build Services
    └─ Build Docker Images
        ↓
Docker Registry (ECR / Docker Hub)
    ↓
Kubernetes Cluster
    ├─ Auth Service Pod (3 replicas)
    ├─ Order Service Pod (3 replicas)
    ├─ PostgreSQL StatefulSet
    ├─ Redis StatefulSet
    ├─ Nginx Ingress
    └─ Service Mesh (future)
```

### Kubernetes Manifests

**Auth Service Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: auth-service
  template:
    metadata:
      labels:
        app: auth-service
    spec:
      containers:
      - name: auth-service
        image: registry.example.com/auth-service:1.0.0
        ports:
        - containerPort: 3001
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: auth-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: auth-secrets
              key: jwt-secret
```

---

## 📈 Scaling Strategy

### Horizontal Scaling (Services)

**Current (2 services):**
- Auth Service
- Order Service

**Future (5-7 services):**
- Auth Service
- Order Service
- Payment Service
- Inventory Service
- Shipping Service
- Notification Service
- Analytics Service

**Each service**:
- Runs independently
- Has its own database
- Deployed separately
- Scales independently

### Vertical Scaling (Performance)

**Caching:**
- Redis for session tokens
- Redis for frequently accessed data
- Application-level caching

**Database Optimization:**
- Indexes on frequently queried columns
- Query optimization
- Connection pooling

**API Optimization:**
- Pagination for list endpoints
- Partial responses (field selection)
- Compression (gzip)

---

## 🔐 Security Architecture

### Authentication Flow

```
1. Login
   User → POST /auth/login → Auth Service
   
2. Validation
   Auth Service checks credentials
   
3. Token Generation
   Auth Service creates JWT token:
   {
     "iss": "auth-service",
     "sub": "user-id",
     "iat": 1234567890,
     "exp": 1234571490,
     "roles": ["user"]
   }
   
4. Token Storage
   Client stores JWT (secure, httpOnly cookie)
   
5. Subsequent Requests
   Client → Request + JWT Token → Order Service
   
6. Token Verification
   Order Service calls Auth Service
   GET /auth/verify?token=...
   
7. Authorization
   If verified, process request with user context
```

### Authorization Levels

**Role-Based Access Control (RBAC):**

```
USER ROLES:
├─ ADMIN
│  ├─ Read all orders
│  ├─ Update all orders
│  └─ View analytics
├─ MANAGER
│  ├─ Read assigned orders
│  └─ Update order status
└─ CUSTOMER
   ├─ Create orders
   ├─ View own orders
   └─ Cancel own orders
```

### Data Protection

| Level | Method | Implementation |
|-------|--------|-----------------|
| **In Transit** | HTTPS/TLS | Nginx termination |
| **At Rest** | Encryption | Database encryption |
| **Secrets** | Kubernetes Secrets | Env variables |
| **Passwords** | Bcrypt | Min 12 rounds |
| **API Keys** | Rotation | Monthly rotation |

---

## 🔗 Communication Patterns

### Service-to-Service Communication

#### Pattern 1: Synchronous (HTTP/REST)

Used for: Real-time queries, immediate responses

**Example: Verify Token**
```typescript
// Order Service needs to verify user token
const response = await fetch(
  `http://auth-service:3001/auth/verify?token=${token}`
);
const user = await response.json();
```

**Pros:** Simple, immediate response
**Cons:** Tight coupling, cascading failures

---

#### Pattern 2: Asynchronous (Events)

Used for: Data consistency, eventual consistency

**Example: Order Created Event**
```typescript
// Order Service publishes event
eventBus.publish(new OrderCreatedEvent({
  orderId: '123',
  userId: 'user-123',
  amount: 99.99,
  timestamp: new Date()
}));

// Other services subscribe
@EventListener(OrderCreatedEvent)
async onOrderCreated(event: OrderCreatedEvent) {
  // Payment Service: Charge payment
  // Inventory Service: Reserve items
  // Shipping Service: Create shipment
}
```

**Pros:** Loose coupling, resilient to failures
**Cons:** Eventual consistency, complexity

---

## 📊 Monitoring & Observability

### Metrics

**Application Metrics:**
- Request rate (req/s)
- Error rate (errors/s)
- Response time (p50, p95, p99)
- Active users

**Infrastructure Metrics:**
- CPU usage
- Memory usage
- Disk I/O
- Network I/O

**Business Metrics:**
- Orders created/day
- Revenue/day
- Cart abandonment rate
- User acquisition

### Logging

**Log Levels:**
- ERROR: System failures, critical issues
- WARN: Deprecated features, performance concerns
- INFO: Important business events (login, order created)
- DEBUG: Detailed execution flow
- TRACE: Data in/out of functions

**Structured Logging Example:**
```json
{
  "timestamp": "2026-04-26T10:30:45.123Z",
  "level": "INFO",
  "service": "auth-service",
  "event": "user.login",
  "userId": "user-123",
  "ip": "192.168.1.1",
  "duration_ms": 245
}
```

---

## 🎓 Development Workflow

### Local Development

```bash
# 1. Clone repo
git clone <repo>

# 2. Install dependencies
yarn install

# 3. Start local environment
docker-compose up

# 4. Run services in dev mode
yarn dev

# 5. Run tests
yarn test

# 6. Create feature branch
git checkout -b feat/new-feature
```

### Creating a New Service

**Template structure** (ready to copy):

```bash
# 1. Copy template
cp -r services/_template services/my-new-service

# 2. Update package.json
sed -i 's/_template/my-new-service/g' services/my-new-service/package.json

# 3. Create database schema
# Edit: services/my-new-service/prisma/schema.prisma

# 4. Implement modules
# Folder: services/my-new-service/src/modules/

# 5. Add to root package.json workspaces

# 6. Build and test
yarn build
yarn test
```

---

## ✅ Checklist: Before Production

- [ ] All services pass tests
- [ ] Code coverage > 80%
- [ ] No security vulnerabilities (npm audit)
- [ ] Documentation is up-to-date
- [ ] Monitoring is configured
- [ ] Backup strategy is in place
- [ ] Disaster recovery plan exists
- [ ] Performance tested under load
- [ ] Deployed to staging environment
- [ ] Smoke tests passed on staging
- [ ] Team trained on runbooks

---

## 📚 Related Documentation

- [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) - Migration roadmap
- [FILE_MIGRATION_MAPPING.md](./FILE_MIGRATION_MAPPING.md) - Detailed file mappings
- [CONFIG_FILES_TEMPLATES.md](./CONFIG_FILES_TEMPLATES.md) - Configuration examples
- [CLAUDE.md](./CLAUDE.md) - Development conventions
- [docs/deployment/](./docs/deployment/) - Deployment guides
- [docs/runbooks/](./docs/runbooks/) - Operational procedures

---

**Last Updated:** 2026-04-26  
**Owner:** Engineering Team  
**Status:** Approved for Implementation
