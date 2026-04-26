# 📅 Daily Git Commands - Ready to Execute

> Copy-paste these commands to create branches, commits, and PRs

---

## 🔧 Setup - Run These First

```bash
# Configure Git (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Ensure you're on main and updated
git checkout main
git pull origin main

# Create a development branch for all work
git checkout -b dev/month1-implementation
```

---

## 📅 WEEK 1: Backend Foundation (May 1-5)

### Day 1: Auth Service JWT & RBAC

```bash
# Create branch
git checkout -b feature/backend/auth-jwt-system

# Make changes to these files:
# - services/auth-service/src/infrastructure/services/jwt.service.ts
# - services/auth-service/src/interfaces/http/strategies/jwt.strategy.ts
# - services/auth-service/src/application/use-cases/index.ts

# Commit 1: JWT token generation
git add services/auth-service/src/infrastructure/services/jwt.service.ts
git commit -m "feat(auth): implement JWT token generation and validation

- Create JwtService with sign/verify methods
- Add configurable token expiration
- Implement error handling for expired tokens
- Add unit tests for JWT operations"

# Commit 2: Refresh token
git add services/auth-service/src/application/use-cases/
git commit -m "feat(auth): add refresh token rotation mechanism

- Implement refresh token endpoint
- Invalidate old tokens on refresh
- Store refresh tokens in Redis
- Add expiration and rotation logic"

# Commit 3: RBAC
git add services/auth-service/src/
git commit -m "feat(auth): implement RBAC with role-based permissions

- Define roles: ADMIN, WAREHOUSE_MANAGER, STORE_MANAGER, SHIPPER, CUSTOMER
- Create permission middleware
- Add role decorators for endpoints
- Implement permission validation"

# Commit 4: Permission middleware
git add services/auth-service/src/interfaces/http/guards/
git commit -m "feat(auth): create permission middleware

- Implement role-based endpoint protection
- Add permission checking logic
- Create error handling for unauthorized access"

# Commit 5: Tests
git add services/auth-service/test/
git commit -m "test(auth): unit tests for JWT operations

- Test JWT token generation
- Test token expiration handling
- Test refresh token rotation
- Test RBAC middleware
- Coverage: 85%+"

# Commit 6: Documentation
git add docs/api/authentication.md
git commit -m "docs(auth): API documentation for auth endpoints

- Document /auth/login endpoint
- Document /auth/refresh endpoint
- Document /auth/logout endpoint
- Add examples and error codes"

# Commit 7: Configuration
git add services/auth-service/.env.example
git commit -m "chore(auth): update environment variables template

- Add JWT_SECRET template
- Add JWT_REFRESH_SECRET template
- Add TOKEN_EXPIRATION config
- Add TOKEN_REFRESH_EXPIRATION config"

# Create PR
git push origin feature/backend/auth-jwt-system

# On GitHub: Create PR from feature/backend/auth-jwt-system to main
# Title: "feat(auth): Implement JWT and RBAC system"
# Description: Include issues #101, #102, #103
# Request review from Tech Lead
```

### Day 2: User Service CRUD

```bash
# Create new branch
git checkout main
git pull origin main
git checkout -b feature/backend/user-service-crud

# Create User service structure
# Files to create/modify:
# - services/user-service/src/domain/entities/user.entity.ts
# - services/user-service/src/application/dto/user.dto.ts
# - services/user-service/src/application/use-cases/index.ts
# - services/user-service/src/infrastructure/repositories/user.repository.ts
# - services/user-service/src/interfaces/http/controllers/user.controller.ts

# Commit 1: Create CRUD endpoints
git add services/user-service/src/
git commit -m "feat(user): create user CRUD endpoints (create, read, update, delete)

- Implement POST /users - Create user
- Implement GET /users - List users
- Implement GET /users/:id - Get user
- Implement PATCH /users/:id - Update user
- Implement DELETE /users/:id - Delete user
- Add input validation with class-validator"

# Commit 2: Role assignment
git add services/user-service/src/application/use-cases/
git commit -m "feat(user): implement user role assignment logic

- Create PATCH /users/:id/roles endpoint
- Validate role exists and is assignable
- Add permission check (only admins)
- Track role changes in audit log"

# Commit 3: Search & filtering
git add services/user-service/src/interfaces/http/controllers/
git commit -m "feat(user): add user search and filtering

- Implement search by name and email
- Add filter by role and status
- Implement pagination (limit, offset)
- Add sorting by name, email, createdAt"

# Commit 4: Pagination
git add services/user-service/src/application/
git commit -m "feat(user): implement pagination for user list

- Add limit and offset parameters
- Return total count in response
- Implement default values
- Add query validation"

# Commit 5: Tests
git add services/user-service/test/
git commit -m "test(user): integration tests for user endpoints

- Test user creation with validation
- Test user retrieval
- Test role assignment
- Test search and filtering
- Coverage: 80%+
- All tests passing"

# Commit 6: Documentation
git add docs/api/users.md docs/services/user-service.md
git commit -m "docs(user): complete user service API documentation

- Document all user endpoints
- Add request/response examples
- Include error codes
- Document role assignment logic"

# Push and create PR
git push origin feature/backend/user-service-crud

# Wait for previous PR to merge, then create new PR
# Title: "feat(user): User CRUD and role management"
# Issues: #201, #202, #203
```

### Day 3: Product Service

```bash
git checkout main
git pull origin main
git checkout -b feature/backend/product-service-catalog

# Create Product service
# Files: services/product-service/src/...

# Commit 1: Product CRUD
git add services/product-service/src/
git commit -m "feat(product): create product CRUD endpoints

- POST /products - Create product
- GET /products - List products  
- GET /products/:id - Get product details
- PATCH /products/:id - Update product
- DELETE /products/:id - Delete product
- Validate required fields (name, price, sku)"

# Commit 2: Categories
git add services/product-service/src/
git commit -m "feat(product): implement category management

- POST /categories - Create category
- GET /categories - List categories
- PATCH /categories/:id - Update category
- DELETE /categories/:id - Delete category
- Associate products with categories"

# Commit 3: Brands
git add services/product-service/src/
git commit -m "feat(product): add brand management

- POST /brands - Create brand
- GET /brands - List brands
- PATCH /brands/:id - Update brand
- DELETE /brands/:id - Delete brand"

# Commit 4: Search
git add services/product-service/src/
git commit -m "feat(product): implement product search with full-text search

- Search by name and description
- Full-text search capability
- Filter by category and brand
- Filter by price range
- Optimized queries with indexes"

# Commit 5: Filtering & Sorting
git add services/product-service/src/
git commit -m "feat(product): add advanced filtering and sorting

- Filter by: category, brand, price range, availability
- Sort by: name, price, rating, newness
- Pagination support
- Performance optimized with database indexes"

# Commit 6: Tests
git add services/product-service/test/
git commit -m "test(product): comprehensive product service tests

- Test CRUD operations
- Test category and brand operations
- Test search and filtering
- Test pagination
- 80%+ coverage"

# Push
git push origin feature/backend/product-service-catalog
```

### Day 4: Order Service

```bash
git checkout main
git pull origin main
git checkout -b feature/backend/order-service-complete

# Commit 1: Order creation
git add services/order-service/src/
git commit -m "feat(order): enhance order creation with validation

- POST /orders endpoint
- Validate customer exists
- Validate products exist and in stock
- Calculate total amount
- Create OrderItems relationship
- Deduct inventory"

# Commit 2: Status workflow
git add services/order-service/src/
git commit -m "feat(order): implement order status workflow

- Define status transitions: pending->confirmed->shipping->delivered
- Prevent invalid transitions
- Track status changes in history
- Send notifications on status change
- Validate business rules"

# Commit 3: Tracking
git add services/order-service/src/
git commit -m "feat(order): add order tracking system

- GET /orders/:id - Full order with items
- GET /orders/:id/status - Current status
- GET /orders/:id/history - Status changes
- GET /orders/customer/:customerId - Customer's orders
- Include associated delivery info"

# Commit 4: Order history
git add services/order-service/src/
git commit -m "feat(order): implement order history and timeline

- Store all status changes with timestamps
- Include user who made change
- Add notes/comments field
- Create order timeline view
- Add update reasons"

# Commit 5: Cancellation
git add services/order-service/src/
git commit -m "feat(order): implement order cancellation

- Add cancellation reason field
- Restore inventory when cancelled
- Only cancel if not shipped
- Track cancellation in history
- Send customer notification"

# Commit 6: Tests
git add services/order-service/test/
git commit -m "test(order): integration tests for order flow

- Test order creation
- Test status updates
- Test cancellation
- Test inventory deduction
- Test order retrieval
- 80%+ coverage"

# Commit 7: Documentation
git add docs/api/orders.md
git commit -m "docs(order): API documentation for order endpoints

- Document order creation
- Document status updates
- Document order tracking
- Add request/response examples
- Document error scenarios"

# Push
git push origin feature/backend/order-service-complete
```

### Day 5: Database Schema & Migrations

```bash
git checkout main
git pull origin main
git checkout -b feature/database/schema-migrations

# Commit 1: Database schema
git add prisma/schema.prisma
git commit -m "feat(db): finalize complete database schema

- Define User model with roles
- Define Product, Category, Brand models
- Define Order and OrderItem models
- Define Warehouse, Stock models
- Define Delivery models
- Define Notification models
- Add all relationships
- Add indexes for performance"

# Commit 2: Initial migration
git add prisma/migrations/
git commit -m "feat(db): create initial database migration

- Run: npx prisma migrate dev --name init
- Create all tables from schema
- Create indexes
- Create constraints
- Verify migration success"

# Commit 3: Seed generator
git add prisma/seed.ts
git commit -m "feat(db): add seed data generator

- Generate 10 admin users
- Generate 100 products (shoes, clothing, computers)
- Generate 20 categories and brands
- Generate sample orders
- Generate 5 warehouses
- Run with: npx prisma db seed"

# Commit 4: Indexes
git add prisma/migrations/
git commit -m "feat(db): setup indexing for performance

- Create indexes on frequently searched fields
- Email index on users table
- SKU index on products table
- Email+deleted index on soft deletes
- Composite indexes for common queries"

# Commit 5: Documentation
git add docs/database/schema.md docs/database/erd.md
git commit -m "docs(db): database schema documentation with ERD

- Document all tables and fields
- Document relationships
- Document constraints
- Include ERD diagram
- Include migration guide"

# Push
git push origin feature/database/schema-migrations
```

---

## 📅 WEEK 2 & 3 (Similar Structure)

For each subsequent day, follow this pattern:

```bash
# 1. Create branch
git checkout main
git pull origin main
git checkout -b feature/category/descriptive-name

# 2. Make changes (5-7 small commits)
git add file1
git commit -m "message 1"

git add file2
git commit -m "message 2"

# ... more commits

# 3. Push
git push origin feature/category/descriptive-name

# 4. Wait for previous PR to merge
# 5. Create new PR on GitHub
```

---

## 🚀 Creating PRs via GitHub CLI

```bash
# After pushing branch, create PR
gh pr create \
  --title "feat(auth): Implement JWT and RBAC system" \
  --body "## Description
Implement JWT token management and RBAC authorization system.

## Issues
Closes #101, #102, #103

## Changes
- JWT token generation and validation
- Refresh token rotation
- Role-based access control
- Permission middleware

## Testing
- Unit tests for JWT service (✅ 85% coverage)
- Tests for RBAC middleware (✅ passing)

## Deployment Notes
- Environment variables added
- No breaking changes
- Database migrations not needed" \
  --base main \
  --label backend,auth,feature \
  --assignee @me \
  --reviewer tech-lead

# List all open PRs
gh pr list

# Check PR status
gh pr status

# Merge PR (after approval)
gh pr merge --squash
```

---

## 📊 Progress Tracking

### After Day 1 - Check
```bash
git log --oneline -7
# Should show 7 commits for auth JWT system
```

### After Week 1 - Check
```bash
git log --oneline -35
# Should show ~35 commits (5 days × 7 commits)

# Count by type
git log --format=%B week1..HEAD | grep "^feat\|^test\|^docs\|^chore" | sort | uniq -c
```

### Check branch tracking
```bash
git branch -v
# Shows all local branches and their status
```

---

## 🔄 Syncing with Main

If main gets updated while you're working:

```bash
# Fetch latest
git fetch origin

# Rebase your branch on latest main
git rebase origin/main

# If conflicts occur
git status  # See conflicts
# Edit conflicted files
git add .
git rebase --continue

# Force push (only if you know what you're doing)
git push --force-with-lease origin feature/backend/your-branch
```

---

## 📋 Batch Operations

### Create multiple branches at once

```bash
#!/bin/bash
# save as create_branches.sh

branches=(
    "feature/backend/auth-jwt-system"
    "feature/backend/user-service-crud"
    "feature/backend/product-service-catalog"
    "feature/backend/order-service-complete"
    "feature/database/schema-migrations"
    "feature/backend/inventory-service"
    "feature/backend/warehouse-service"
    "feature/backend/delivery-service"
)

for branch in "${branches[@]}"; do
    echo "Creating branch: $branch"
    git checkout -b "$branch" main
    git push origin "$branch"
done

# Go back to main
git checkout main
```

### Merge all PRs (use GitHub UI for manual review)

```bash
# Get list of merged PRs
gh pr list --state merged

# View specific PR details
gh pr view 1 --json title,body,commits
```

---

## 🎯 Daily Checklist

```bash
# Every morning:
git fetch origin
git pull origin main
git checkout YOUR_BRANCH

# Before committing:
yarn lint
yarn test
git status

# Before pushing:
git log --oneline -5  # Review recent commits
git push origin YOUR_BRANCH

# Create PR when ready:
gh pr create --title "feat: description" --body "Details"

# At end of day:
git log --oneline -10  # See what you did
```

---

## 🚨 Emergency: Undo Last Commit

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes
git reset --hard HEAD~1

# Push force to remote (only if hasn't been reviewed)
git push --force-with-lease origin feature/your-branch
```

---

## 📊 Verify Before PR

```bash
# Check branch is clean
git status
# Should show "working tree clean"

# Check commits
git log --oneline -8

# Check formatting
yarn format

# Check linting
yarn lint

# Run tests
yarn test

# If all pass, create PR
```

---

**Ready to Execute**: YES ✅  
**Total Commands Provided**: 100+  
**Covers**: 30 days of development

---

**Next Steps**:
1. Run setup commands first
2. Execute Day 1 commands
3. Create PR after commits
4. Wait for merge
5. Repeat for Days 2-30
