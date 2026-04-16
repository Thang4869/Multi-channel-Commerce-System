# Project Structure & Architecture

## Directory Organization

### `/apps` - Frontend & Mobile Applications

```
apps/
├── web/
│   ├── warehouse-dashboard/    # Main warehouse management dashboard
│   │   ├── src/
│   │   │   ├── app/           # Next.js app directory
│   │   │   ├── components/    # React components
│   │   │   ├── lib/           # Utilities and API client
│   │   │   └── store/         # Zustand state management
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   └── Dockerfile
│   │
│   ├── shoe-store/            # Shoe e-commerce storefront
│   ├── clothing-store/        # Clothing e-commerce storefront
│   ├── computer-store/        # Computer e-commerce storefront
│   ├── delivery-admin/        # Delivery admin panel
│   └── pos-system/            # Point of Sale system
│
└── mobile/
    └── delivery-mobile-app/   # Flutter mobile app for deliveries
        ├── lib/
        │   ├── main.dart
        │   ├── models/        # Data models
        │   ├── screens/       # UI screens
        │   ├── services/      # API services
        │   └── providers/     # State management
        ├── pubspec.yaml
        └── android/           # Android configuration
```

### `/services` - Microservices (NestJS + Clean Architecture)

Each service follows this structure:

```
service-name/
├── src/
│   ├── domain/                # Business logic layer
│   │   ├── entities/         # Domain models
│   │   ├── value-objects/    # Immutable objects
│   │   └── enums/            # Enumerations
│   │
│   ├── application/          # Use case layer
│   │   ├── use-cases/        # Business operations
│   │   ├── dto/              # Data transfer objects
│   │   ├── interfaces/       # Service contracts
│   │   └── mappers/          # DTO mappers
│   │
│   ├── infrastructure/       # Technical layer
│   │   ├── database/         # Database setup
│   │   ├── repositories/     # Data access
│   │   ├── services/         # External services
│   │   └── external/         # API clients
│   │
│   ├── interfaces/           # HTTP layer
│   │   ├── http/
│   │   │   ├── controllers/  # API endpoints
│   │   │   ├── guards/       # Authorization
│   │   │   ├── strategies/   # Passport strategies
│   │   │   └── middlewares/  # Express middleware
│   │
│   ├── service.module.ts     # NestJS module
│   └── main.ts               # Application entry
│
├── test/                     # Tests
├── package.json
├── tsconfig.json
├── .env.example
├── Dockerfile
└── .dockerignore
```

#### Services

1. **auth-service** (Port: 3001)
   - User authentication
   - JWT token management
   - Role-based access control
   - User profile management

2. **order-service** (Port: 3002)
   - Order creation & management
   - Order status tracking
   - Order fulfillment

3. **product-service** (Port: 3003)
   - Product catalog
   - Categories & brands
   - Product search & filter
   - Pricing management

4. **inventory-service** (Port: 3004)
   - Stock management
   - Stock reservations
   - Low stock alerts
   - Stock synchronization

5. **warehouse-service** (Port: 3007)
   - Warehouse management
   - Stock distribution
   - Import/export operations
   - Warehouse transfers

6. **delivery-service** (Port: 3005)
   - Delivery order creation
   - Shipper assignment
   - Real-time tracking
   - Delivery status updates

7. **notification-service** (Port: 3008)
   - Email notifications
   - In-app notifications
   - SMS alerts
   - Notification history

8. **user-service** (Port: 3006)
   - User management
   - User profiles
   - Customer segments
   - User preferences

### `/shared` - Shared Code & Types

```
shared/
├── types/                 # TypeScript interfaces
│   ├── src/
│   │   └── index.ts      # All type definitions
│   └── package.json
│
├── contracts/            # API contracts
│   ├── requests/         # Request schemas
│   └── responses/        # Response schemas
│
└── utils/               # Shared utilities
    ├── src/
    │   ├── helpers/
    │   ├── validators/
    │   └── transforms/
    └── package.json
```

### `/infrastructure` - DevOps & Deployment

```
infrastructure/
├── docker/
│   ├── base.dockerfile       # Base image for all services
│   ├── nginx.dockerfile      # API Gateway
│   └── postgres.dockerfile   # Custom PostgreSQL setup
│
├── nginx/
│   ├── nginx.conf           # Main Nginx config
│   ├── conf.d/
│   │   ├── default.conf     # Virtual hosts
│   │   ├── ssl.conf         # SSL configuration
│   │   └── cache.conf       # Caching rules
│   └── ssl/                 # SSL certificates
│
├── k8s/                      # Kubernetes manifests
│   ├── namespaces/
│   ├── services/
│   ├── deployments/
│   ├── configmaps/
│   ├── secrets/
│   └── ingress/
│
├── scripts/
│   ├── init-db.sh           # Database initialization
│   ├── seed-data.sh         # Sample data loading
│   ├── backup.sh            # Database backup
│   └── restore.sh           # Database restore
│
└── monitoring/              # Observability
    ├── prometheus/
    ├── grafana/
    └── logging/
```

### `/docs` - Documentation

```
docs/
├── architecture/
│   ├── overview.md
│   ├── services.md
│   ├── database.md
│   └── security.md
│
├── erd/
│   └── database-diagram.md
│
├── flows/
│   ├── order-flow.md
│   ├── delivery-flow.md
│   ├── warehouse-flow.md
│   └── payment-flow.md
│
├── api/
│   ├── auth-api.md
│   ├── order-api.md
│   └── product-api.md
│
└── deployment/
    ├── local-setup.md
    ├── docker-deployment.md
    ├── kubernetes-setup.md
    └── production-checklist.md
```

### `.github` - CI/CD Pipelines

```
.github/
├── workflows/
│   ├── ci-cd.yml            # Build & test pipeline
│   ├── deploy.yml           # Production deployment
│   ├── security.yml         # Security scans
│   └── performance.yml      # Performance tests
│
├── pull_request_template.md
└── issue_templates/
    ├── bug_report.md
    ├── feature_request.md
    └── documentation.md
```

## Technology Stack

### Backend

- **Runtime**: Node.js 20 (LTS)
- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **ORM**: Prisma 5
- **Validation**: class-validator, Joi
- **Authentication**: JWT, Passport
- **API Docs**: Swagger/OpenAPI

### Database

- **Primary**: PostgreSQL 15
- **Cache**: Redis 7
- **Search**: PostgreSQL Full-Text Search

### Frontend (Next.js)

- **Framework**: Next.js 14 (App Router)
- **UI**: TailwindCSS 3
- **State**: Zustand 4
- **HTTP**: Axios, React Query
- **Forms**: React Hook Form

### Mobile (Flutter)

- **Framework**: Flutter 3.0
- **State**: Riverpod 2
- **HTTP**: Dio 5
- **UI**: Material 3
- **Location**: Geolocator

### DevOps

- **Containerization**: Docker & docker-compose
- **Reverse Proxy**: Nginx
- **Orchestration**: Kubernetes (optional)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Logging**: ELK Stack (optional)

## Clean Architecture Principles

### Dependency Rule
>
> **Inner layers never depend on outer layers**

- Domain (entities, use cases) → No external dependencies
- Application (use cases) → Depends on Domain
- Infrastructure (repositories) → Depends on Application
- Interfaces (controllers) → Depends on Infrastructure

### Separation of Concerns

- **Domain**: Pure business logic
- **Application**: Use cases & orchestration
- **Infrastructure**: Technical implementation
- **Interfaces**: HTTP/RPC endpoints

### Testing Strategy

- **Unit Tests**: Domain & use cases
- **Integration Tests**: Repositories & services
- **E2E Tests**: API endpoints
- **Mobile Tests**: Widget & integration tests

## API Versioning

All APIs use URL-based versioning:

```
/api/v1/orders    # Current stable API
/api/v2/orders    # Next version (beta)
```

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  }
}
```

## Security

- **Authentication**: JWT tokens with RS256
- **Authorization**: Role-based access control (RBAC)
- **Validation**: Input validation on all endpoints
- **CORS**: Configured per environment
- **HTTPS**: Required in production
- **Rate Limiting**: 100 requests/minute per IP
- **SQL Injection**: Protected by ORM (Prisma)
- **CSRF**: Token-based protection

## Performance

- **Database**: Indexed queries, connection pooling
- **Caching**: Redis for sessions & hot data
- **API**: Response compression (gzip)
- **Frontend**: Code splitting, lazy loading
- **Mobile**: Offline sync, image optimization

---

**For more details**, see individual service README.md files.
