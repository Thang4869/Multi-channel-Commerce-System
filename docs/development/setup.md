# Development Setup Guide

> How to set up your local development environment

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [Database Setup](#database-setup)
4. [Running Services](#running-services)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Git** (v2.0+)
  ```bash
  git --version
  ```

- **Node.js & npm** (v20 LTS recommended)
  ```bash
  node --version  # v20.x.x
  npm --version   # 10.x.x
  ```
  Download: https://nodejs.org

- **Docker & Docker Compose** (v20.10+)
  ```bash
  docker --version
  docker-compose --version
  ```
  Download: https://www.docker.com

- **Yarn** (v4+)
  ```bash
  npm install -g yarn
  yarn --version
  ```

### Recommended Tools

- **VS Code** - Editor
- **Thunder Client** or **Postman** - API testing
- **DBeaver** - Database GUI
- **Docker Desktop** - Visual Docker management (Windows/Mac)

---

## Local Setup

### Step 1: Clone Repository

```bash
git clone <repo-url>
cd multi-channel-commerce-system
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
yarn install

# Install all workspace dependencies
yarn install-all
```

### Step 3: Configure Environment

```bash
# Copy environment files
cp services/auth-service/.env.example services/auth-service/.env
cp services/order-service/.env.example services/order-service/.env

# Update .env files with your values (optional for local dev)
# Default values should work for development
```

---

## Database Setup

### Start Database Services

```bash
# Start PostgreSQL and Redis with Docker Compose
docker-compose up -d postgres redis

# Verify services are running
docker-compose ps

# Output should show:
# - commerce_postgres  Up
# - commerce_redis     Up
```

### Run Database Migrations

```bash
# Navigate to a service directory
cd services/auth-service

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed database (optional)
npx prisma db seed
```

---

## Running Services

### Option 1: Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Option 2: Local Node.js Services

#### Terminal 1: Auth Service
```bash
cd services/auth-service
npm install
yarn dev
# Running on http://localhost:3001
```

#### Terminal 2: Order Service
```bash
cd services/order-service
npm install
yarn dev
# Running on http://localhost:3002
```

#### Terminal 3: Dashboard Frontend
```bash
cd apps/web/warehouse-dashboard
npm install
yarn dev
# Running on http://localhost:3000
```

---

## Verification

### Check API Health

```bash
# Auth Service
curl http://localhost:3001/api/health

# Order Service
curl http://localhost:3002/api/health

# Database
docker-compose exec postgres psql -U postgres -d commerce_db -c "SELECT 1"

# Redis
docker-compose exec redis redis-cli ping
```

### Test Authentication

```bash
# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Expected response:
# {
#   "accessToken": "eyJhbGc...",
#   "refreshToken": "eyJhbGc...",
#   "user": { ... }
# }
```

---

## Development Commands

### Root Level (Monorepo)

```bash
# Install all dependencies
yarn install

# Build all services
yarn build

# Start development servers
yarn dev

# Run tests
yarn test

# Run linter
yarn lint

# Format code
yarn format
```

### Service Level

```bash
cd services/auth-service

# Install dependencies
yarn install

# Start development server
yarn dev

# Build TypeScript
yarn build

# Run tests
yarn test

# Run linter
yarn lint

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed
```

---

## File Structure Overview

```
.
├── services/              # Backend microservices
│   ├── auth-service/      # Authentication
│   ├── order-service/     # Orders
│   ├── user-service/      # Users
│   └── ...
├── apps/
│   ├── web/               # Next.js web applications
│   │   ├── warehouse-dashboard/
│   │   ├── shoe-store/
│   │   └── ...
│   └── mobile/            # Flutter mobile app
│       └── delivery-mobile-app/
├── shared/                # Shared code & types
├── prisma/                # Database schema & migrations
└── docker-compose.yml     # Docker configuration
```

---

## Database Access

### Access PostgreSQL

```bash
# Connect to database
docker-compose exec postgres psql -U postgres -d commerce_db

# List tables
\dt

# Exit
\q
```

### Access Redis

```bash
# Connect to Redis
docker-compose exec redis redis-cli

# Check keys
KEYS *

# Exit
EXIT
```

### GUI Tools

**DBeaver** (PostgreSQL):
- Host: localhost
- Port: 5432
- User: postgres
- Password: password
- Database: commerce_db

**Redis** (with Redis Desktop Manager):
- Host: localhost
- Port: 6379

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Docker Issues

```bash
# View service logs
docker-compose logs -f auth-service

# Remove all containers
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View PostgreSQL logs
docker-compose logs postgres

# Reset database
docker-compose exec postgres psql -U postgres -c "DROP DATABASE commerce_db;"
docker-compose exec postgres psql -U postgres -c "CREATE DATABASE commerce_db;"
```

### Prisma Client Errors

```bash
# Regenerate Prisma client
npx prisma generate

# Clear cache and reinstall
rm -rf node_modules/.prisma
yarn install
npx prisma generate
```

### Node Modules Issues

```bash
# Clear all node_modules
rm -rf node_modules
rm -rf services/*/node_modules

# Reinstall everything
yarn install-all
```

---

## IDE Setup (VS Code)

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
2. **Prettier** - esbenp.prettier-vscode
3. **ESLint** - dbaeumer.vscode-eslint
4. **Thunder Client** - rangav.vscode-thunder-client
5. **REST Client** - humao.rest-client
6. **Prisma** - Prisma.prisma
7. **Docker** - ms-azuretools.vscode-docker
8. **GitLens** - eamodio.gitlens

### Settings (.vscode/settings.json)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["typescript", "typescriptreact"],
  "files.exclude": {
    "node_modules": true
  }
}
```

---

## Quick Commands Cheat Sheet

```bash
# Development workflow
git checkout -b feature/my-feature      # Create branch
yarn dev                                 # Start dev servers
yarn test                                # Run tests
yarn lint                                # Check code quality
git add .                                # Stage changes
git commit -m "feat: add feature"        # Commit
git push origin feature/my-feature       # Push

# Docker workflow
docker-compose up -d                     # Start services
docker-compose logs -f                   # View logs
docker-compose down                      # Stop services

# Database workflow
npx prisma migrate dev                   # Create migration
npx prisma db seed                       # Seed data
npx prisma studio                        # Open GUI
```

---

## Next Steps

1. ✅ Complete local setup
2. 📖 Read [coding-standards.md](./coding-standards.md)
3. 🔍 Explore [API Documentation](../api/README.md)
4. 🧪 Run tests: `yarn test`
5. 💻 Start coding!

---

## Getting Help

- 📖 Check [troubleshooting.md](../guides/troubleshooting.md)
- ❓ See [faq.md](../guides/faq.md)
- 💬 Ask team on Slack/Chat
- 👤 Contact Tech Lead

---

**Version**: 1.0.0  
**Last Updated**: 2026-04-25  
**Verified On**: macOS, Windows, Linux
