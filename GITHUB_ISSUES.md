# GitHub Issues - Ready for Creation

> Copy-paste these issues into GitHub or use GitHub CLI to create them

---

## How to Create Issues

### Option 1: GitHub CLI (Recommended)
```bash
# Install GitHub CLI: https://cli.github.com
gh issue create --title "Title" --body "Description" --label "label1,label2"
```

### Option 2: GitHub Web UI
- Go to https://github.com/Thang4869/Multi-channel-Commerce-System/issues
- Click "New issue"
- Copy title and description

---

## 📋 Issue Template by Category

### BACKEND SERVICES (Issues #101-#703)

#### Authentication & Authorization (Issues #101-#103)

**Issue #101**: Implement JWT Refresh Token Rotation
```
Title: Implement JWT refresh token rotation mechanism

Labels: backend, auth, security, feature, week-1

Body:
## Description
Implement JWT refresh token rotation to improve security. 
When a user refreshes their token, the old refresh token should be invalidated
and a new one issued.

## Acceptance Criteria
- [ ] Refresh token rotation implemented
- [ ] Old tokens invalidated on refresh
- [ ] Token revocation list working
- [ ] Tests for rotation logic
- [ ] Security best practices documented

## Related to
- PR: feature/backend/auth-jwt-system
- Milestone: Week 1

## Estimate: 4 hours
```

**Issue #102**: Add Role-Based Access Control (RBAC)
```
Title: Implement RBAC with role-based permissions

Labels: backend, auth, feature, week-1

Body:
## Description
Implement comprehensive RBAC system with role-based permissions
to control what different users can access.

## Acceptance Criteria
- [ ] Roles defined (Admin, Manager, Customer, Shipper)
- [ ] Permission middleware created
- [ ] All endpoints protected with role checks
- [ ] Permission tests written
- [ ] Documentation updated

## Roles to Create
- ADMIN - Full access
- WAREHOUSE_MANAGER - Warehouse ops
- STORE_MANAGER - Store management
- SHIPPER - Delivery operations
- CUSTOMER - Customer access

## Related to
- PR: feature/backend/auth-jwt-system
- Issue #101
```

**Issue #103**: Implement Token Blacklist & Logout
```
Title: Implement token blacklist and logout functionality

Labels: backend, auth, feature, week-1

Body:
## Description
Implement token blacklist for logout and prevent token reuse
after user logs out.

## Tasks
- [ ] Redis-based blacklist implementation
- [ ] Logout endpoint
- [ ] Token validation against blacklist
- [ ] Blacklist cleanup (expired tokens)
- [ ] Tests

## Related to
- Issue #101, #102
```

---

#### User Service (Issues #201-#203)

**Issue #201**: Create User CRUD Endpoints
```
Title: Implement User CRUD endpoints

Labels: backend, user-service, feature, week-1

Body:
## Endpoints to Create
- GET /users - List all users
- GET /users/:id - Get user by ID
- POST /users - Create new user
- PATCH /users/:id - Update user
- DELETE /users/:id - Delete user

## Acceptance Criteria
- [ ] All CRUD endpoints working
- [ ] Input validation implemented
- [ ] Error handling complete
- [ ] Tests written (80%+ coverage)
- [ ] API documented

## Database
Uses Users table from Prisma schema
```

**Issue #202**: User Role Assignment
```
Title: Implement user role assignment functionality

Labels: backend, user-service, feature, week-1

Body:
## Tasks
- [ ] Endpoint: PATCH /users/:id/roles
- [ ] Role assignment logic
- [ ] Validation (only admins can assign)
- [ ] Role history tracking
- [ ] Tests

## Related to
- Issue #201, #102
```

**Issue #203**: User Search & Filtering
```
Title: Add user search and pagination

Labels: backend, user-service, feature, week-1

Body:
## Features
- [ ] Full-text search on name, email
- [ ] Filter by role, status
- [ ] Pagination (limit, offset)
- [ ] Sorting options
- [ ] Performance optimized (indexes)

## Related to
- Issue #201
```

---

#### Product Service (Issues #301-#303)

**Issue #301**: Create Product CRUD Endpoints
```
Title: Implement Product CRUD endpoints

Labels: backend, product-service, feature, week-1

Body:
## Endpoints
- GET /products - List products
- GET /products/:id - Get product
- POST /products - Create product
- PATCH /products/:id - Update product
- DELETE /products/:id - Delete product

## Fields
- name, description, sku
- price, cost
- images
- category, brand
- stock quantity

## Related to
- PR: feature/backend/product-service-catalog
```

**Issue #302**: Category & Brand Management
```
Title: Implement category and brand management

Labels: backend, product-service, feature, week-1

Body:
## Tasks
- [ ] Category CRUD endpoints
- [ ] Brand CRUD endpoints
- [ ] Product-category relationship
- [ ] Product-brand relationship
- [ ] Validations

## Endpoints
- GET/POST /categories
- GET/POST /brands
- PATCH /categories/:id
- DELETE /categories/:id
```

**Issue #303**: Product Search & Advanced Filtering
```
Title: Implement product search and filtering

Labels: backend, product-service, feature, week-1

Body:
## Features
- [ ] Search by name, description
- [ ] Filter by price range
- [ ] Filter by category
- [ ] Filter by brand
- [ ] Filter by rating
- [ ] Pagination
- [ ] Sorting

## Performance
- [ ] Database indexes on search fields
- [ ] Query optimization
```

---

#### Order Service (Issues #401-#403)

**Issue #401**: Complete Order Creation Flow
```
Title: Implement complete order creation flow

Labels: backend, order-service, feature, week-1

Body:
## Endpoint: POST /orders

## Request Body
{
  "customerId": "string",
  "items": [
    {
      "productId": "string",
      "quantity": number,
      "price": number
    }
  ],
  "shippingAddress": "string",
  "paymentMethod": "string"
}

## Tasks
- [ ] Order creation logic
- [ ] OrderItems creation
- [ ] Inventory deduction
- [ ] Total calculation
- [ ] Validation
- [ ] Tests

## Related to
- PR: feature/backend/order-service-complete
```

**Issue #402**: Order Status Management
```
Title: Implement order status workflow

Labels: backend, order-service, feature, week-1

Body:
## Statuses
- pending - Created
- confirmed - Confirmed
- processing - Being processed
- shipped - In transit
- delivered - Delivered
- cancelled - Cancelled

## Endpoint: PATCH /orders/:id/status
- Update status
- Status history
- Notifications on change
- Validations (can't go backwards)

## Related to
- Issue #401
```

**Issue #403**: Order Tracking System
```
Title: Implement order tracking

Labels: backend, order-service, feature, week-1

Body:
## Features
- [ ] GET /orders/:id - Full order details
- [ ] Order timeline/history
- [ ] Last updated timestamp
- [ ] Associated delivery info
- [ ] Customer notifications

## Related to
- Issue #401, #402
```

---

#### Infrastructure Services (Issues #501, #601, #701)

**Issue #501**: Create Inventory Service
```
Title: Create Inventory Service for stock management

Labels: backend, inventory-service, feature, week-2

Body:
## Responsibilities
- Warehouse stock tracking
- Store stock tracking
- Stock synchronization
- Low stock alerts
- Stock movements

## Endpoints
- GET /inventory/warehouse/:id
- GET /inventory/store/:id
- POST /inventory/sync
- PATCH /inventory/stock/:id

## Related to
- PR: feature/backend/inventory-service
```

**Issue #601**: Create Warehouse Service
```
Title: Create Warehouse Service

Labels: backend, warehouse-service, feature, week-2

Body:
## Responsibilities
- Warehouse management
- Import from supplier
- Export to store
- Stock movements tracking

## Endpoints
- GET /warehouse
- POST /warehouse/import
- POST /warehouse/export
- GET /warehouse/movements

## Related to
- PR: feature/backend/warehouse-service
```

**Issue #701**: Create Delivery Service
```
Title: Create Delivery Service for tracking

Labels: backend, delivery-service, feature, week-2

Body:
## Responsibilities
- Delivery order creation
- Shipper assignment
- Delivery tracking
- Status updates
- Route optimization

## Endpoints
- GET /deliveries
- POST /deliveries
- PATCH /deliveries/:id/status
- POST /deliveries/:id/assign-shipper
- GET /deliveries/:id/tracking

## Related to
- PR: feature/backend/delivery-service
```

---

### FRONTEND (Issues #801-#1003)

**Issue #801**: Setup Warehouse Dashboard Foundation
```
Title: Setup Next.js Warehouse Dashboard

Labels: frontend, dashboard, feature, week-2

Body:
## Tasks
- [ ] Next.js 14 App Router setup
- [ ] TailwindCSS configuration
- [ ] Authentication integration
- [ ] Layout components
- [ ] Navigation structure
- [ ] Protected routes

## Related to
- PR: feature/frontend/warehouse-dashboard-foundation
```

**Issue #802**: Create Inventory Management Page
```
Title: Implement inventory management dashboard page

Labels: frontend, dashboard, feature, week-2

Body:
## Components
- [ ] Inventory table
- [ ] Search and filter
- [ ] Stock visualization
- [ ] Low stock alerts
- [ ] Edit stock quantity

## Related to
- Issue #801
- PR: feature/frontend/warehouse-dashboard-inventory
```

**Issue #901**: Create Shoe Store Frontend
```
Title: Launch Shoe Store frontend application

Labels: frontend, store, feature, week-3

Body:
## Pages
- [ ] Home with featured products
- [ ] Product listing with filters
- [ ] Product detail page
- [ ] Category browsing

## Features
- [ ] Product images gallery
- [ ] Reviews and ratings
- [ ] Related products

## Related to
- PR: feature/frontend/shoe-store-launch
```

---

### MOBILE (Issues #1101-#1105)

**Issue #1101**: Flutter Auth Implementation
```
Title: Implement authentication in Flutter app

Labels: mobile, delivery-app, feature, week-4

Body:
## Tasks
- [ ] Login screen UI
- [ ] Token storage (secure)
- [ ] Auto-login
- [ ] Logout
- [ ] Token refresh

## Related to
- PR: feature/mobile/delivery-app-auth
```

**Issue #1102**: Delivery Orders List Screen
```
Title: Create delivery orders list screen

Labels: mobile, delivery-app, feature, week-4

Body:
## UI
- [ ] Orders list
- [ ] Search and filter
- [ ] Order status colors
- [ ] Pull to refresh

## Data
- [ ] Fetch from API
- [ ] Local caching
- [ ] Real-time updates

## Related to
- Issue #1101
- PR: feature/mobile/delivery-app-orders
```

---

### DATABASE (Issues #1201-#1205)

**Issue #1201**: Finalize Prisma Schema
```
Title: Complete Prisma database schema

Labels: database, feature, week-1

Body:
## Models to Create/Update
- [ ] User model
- [ ] Order model
- [ ] Product model
- [ ] Inventory model
- [ ] Warehouse model
- [ ] Delivery model
- [ ] Notification model

## Quality
- [ ] Relationships defined
- [ ] Indexes created
- [ ] Constraints set
- [ ] Enums used properly

## Related to
- PR: feature/database/schema-migrations
```

**Issue #1202**: Create Database Migrations
```
Title: Setup database migrations

Labels: database, feature, week-1

Body:
## Tasks
- [ ] Initial migration
- [ ] Constraints and indexes
- [ ] Seed data
- [ ] Migration testing
- [ ] Rollback testing

## Related to
- Issue #1201
```

---

### TESTING (Issues #1301-#1305)

**Issue #1301**: Unit Tests Suite
```
Title: Create comprehensive unit tests

Labels: testing, backend, feature, week-5

Body:
## Coverage Target: 80%+

## Services to Test
- [ ] Auth service
- [ ] User service
- [ ] Product service
- [ ] Order service
- [ ] Inventory service
- [ ] Warehouse service
- [ ] Delivery service

## Related to
- PR: test/backend/unit-tests-suite
```

**Issue #1302**: Integration Tests
```
Title: Create integration tests for APIs

Labels: testing, backend, feature, week-5

Body:
## Test Scenarios
- [ ] User registration flow
- [ ] Product search
- [ ] Order creation
- [ ] Order status updates
- [ ] Inventory sync

## Database: Use test database
## Tools: Jest, Supertest

## Related to
- PR: test/backend/integration-tests
```

---

### DEVOPS (Issues #1401-#1406)

**Issue #1401**: Docker Setup for All Services
```
Title: Complete Docker configuration for all services

Labels: devops, infra, feature, week-6

Body:
## Tasks
- [ ] Dockerfile for each service
- [ ] Docker Compose with all services
- [ ] Multi-stage builds
- [ ] Health checks
- [ ] Production compose file

## Services (14 total)
- 8 backend services
- 6 frontend apps
- 1 mobile app (optional)

## Related to
- PR: chore/infra/docker-complete-setup
```

**Issue #1402**: CI/CD Pipeline
```
Title: Setup GitHub Actions CI/CD pipeline

Labels: devops, ci, feature, week-6

Body:
## Workflows
- [ ] Build workflow
- [ ] Lint checks
- [ ] Tests
- [ ] Docker build
- [ ] Deploy to staging
- [ ] Deploy to production

## Related to
- PR: ci/github-actions-pipeline
```

**Issue #1403**: Monitoring & Logging
```
Title: Implement monitoring and logging

Labels: devops, infra, feature, week-6

Body:
## Monitoring
- [ ] Prometheus metrics
- [ ] Grafana dashboards
- [ ] Alerts

## Logging
- [ ] Winston logger setup
- [ ] Log aggregation
- [ ] Error tracking

## Related to
- PR: infra/monitoring-logging-redis
```

---

### DOCUMENTATION (Issues #1501-#1504)

**Issue #1501**: Complete API Documentation
```
Title: Write complete API documentation

Labels: documentation, feature, week-6

Body:
## Documentation Needed
- [ ] All endpoints documented
- [ ] Request/response examples
- [ ] Error codes
- [ ] Authentication guide
- [ ] Rate limiting

## Format
- [ ] Swagger/OpenAPI
- [ ] Markdown guides
- [ ] Postman collection

## Related to
- PR: docs/complete-documentation-suite
```

**Issue #1502**: Deployment Guide
```
Title: Write deployment procedures

Labels: documentation, feature, week-6

Body:
## Topics
- [ ] Local setup
- [ ] Docker deployment
- [ ] Production checklist
- [ ] Troubleshooting
- [ ] Backup procedures

## Related to
- PR: docs/complete-documentation-suite
```

---

## Creating Issues via CLI

```bash
# Create a single issue
gh issue create \
  --title "Implement JWT refresh token rotation mechanism" \
  --body "$(cat <<'EOF'
## Description
Implement JWT refresh token rotation to improve security.

## Acceptance Criteria
- [ ] Rotation implemented
- [ ] Tests passing
- [ ] Documentation updated
EOF
)" \
  --label backend,auth,security

# Create multiple issues from file
# (First, prepare a JSON file with all issues)
```

---

## Bulk Creation Script

```bash
#!/bin/bash
# save as create_issues.sh

# Issue 101
gh issue create --title "Implement JWT refresh token rotation" \
  --label backend,auth --milestone "Week 1"

# Issue 102
gh issue create --title "Implement RBAC with role-based permissions" \
  --label backend,auth --milestone "Week 1"

# ... (repeat for all 45 issues)
```

---

## Labels to Create

```bash
# Backend labels
gh label create "backend" --color "0052cc" --description "Backend services"
gh label create "auth" --color "1f6feb" --description "Authentication"
gh label create "user-service" --color "0052cc" --description "User service"
gh label create "order-service" --color "0052cc" --description "Order service"
gh label create "inventory" --color "0052cc" --description "Inventory"

# Frontend labels
gh label create "frontend" --color "d4c5f9" --description "Frontend"
gh label create "dashboard" --color "d4c5f9" --description "Dashboard"
gh label create "store" --color "d4c5f9" --description "E-commerce store"

# Mobile labels
gh label create "mobile" --color "fbca04" --description "Mobile app"

# Type labels
gh label create "feature" --color "a2eeef" --description "New feature"
gh label create "bug" --color "ee0701" --description "Bug fix"
gh label create "documentation" --color "0075ca" --description "Documentation"

# Week labels
gh label create "week-1" --color "d0bcff"
gh label create "week-2" --color "c5e1a5"
gh label create "week-3" --color "fff59d"
gh label create "week-4" --color "ffccbc"
gh label create "week-5" --color "ffab91"
gh label create "week-6" --color "ef9a9a"
```

---

## Milestones Setup

```bash
# Create milestones for each week
gh milestone create \
  --title "Week 1: Backend Foundation" \
  --due-date 2026-05-05 \
  --description "Auth, User, Product, Order services + Database"

gh milestone create \
  --title "Week 2: Services & Frontend Start" \
  --due-date 2026-05-12 \
  --description "Inventory, Warehouse, Delivery + Dashboard"

# ... (repeat for weeks 3-6)
```

---

**Total Issues Ready**: 45+  
**Total Branches Ready**: 40+  
**Total Commits Estimated**: 200+  

---

**Ready to Create**: YES ✅
