# ⚡ Quick Start Guide

> **Get the system running in 5 minutes!**

## Prerequisites

- ✅ Docker Desktop installed
- ✅ Docker Compose (included with Docker Desktop)
- ✅ Git
- ✅ At least 4GB RAM free

## Option 1: Automated Setup (Recommended)

```bash
# 1. Clone the repository
git clone <repository-url>
cd multi-channel-commerce-system

# 2. Run the setup script
chmod +x scripts/start.sh
./scripts/start.sh
```

The script will automatically:
- ✅ Check Docker installation
- ✅ Create environment files
- ✅ Build Docker images
- ✅ Start all services
- ✅ Run database migrations
- ✅ Seed sample data
- ✅ Show you the dashboard URL

**Done!** 🎉 Dashboard is available at `http://localhost:3010`

## Option 2: Manual Setup

### Step 1: Clone & Setup

```bash
git clone <repository-url>
cd multi-channel-commerce-system

# Copy environment files
cp services/auth-service/.env.example services/auth-service/.env
cp services/order-service/.env.example services/order-service/.env
```

### Step 2: Start Services

```bash
docker-compose up -d
```

This will start:
- ✅ PostgreSQL (port 5432)
- ✅ Redis (port 6379)
- ✅ Auth Service (port 3001)
- ✅ Order Service (port 3002)
- ✅ Warehouse Dashboard (port 3010)
- ✅ Nginx Gateway (port 80)

### Step 3: Initialize Database

```bash
# Wait for PostgreSQL to be ready (check docker-compose logs)
docker-compose exec auth-service npx prisma migrate deploy
docker-compose exec auth-service npx prisma db seed
```

### Step 4: Access the Dashboard

Open browser and go to: **http://localhost:3010**

## ✅ Default Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Warehouse Manager | manager@warehouse.local | password123 |
| Store Manager | manager@store.local | password123 |
| Shipper | shipper@delivery.local | password123 |
| Customer | customer@example.com | password123 |

## 📚 Available URLs

### Frontend
- **Dashboard**: http://localhost:3010
- **API Gateway**: http://localhost

### APIs & Documentation
- **Swagger Docs**: http://localhost:3001/api/docs
- **Auth Service**: http://localhost:3001
- **Order Service**: http://localhost:3002

### Database
- **PostgreSQL**: `localhost:5432`
  - Username: `postgres`
  - Password: `password`
  - Database: `commerce_db`
- **Redis**: `localhost:6379`

### Admin Tools
- **Database Studio**: Run `docker-compose exec auth-service npx prisma studio`

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 3010
lsof -i :3010

# Kill the process
kill -9 <PID>
```

### Docker Container Issues

```bash
# View logs
docker-compose logs -f auth-service

# Restart specific service
docker-compose restart auth-service

# Full restart
docker-compose down --volumes
docker-compose up -d
```

### Database Connection Error

```bash
# Check PostgreSQL status
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U postgres -d commerce_db -c "SELECT 1"
```

### Services Not Starting

```bash
# Check all container status
docker-compose ps

# View detailed logs
docker-compose logs

# Full reset (warning: deletes data)
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 🚀 Next Steps

### 1. Explore the Dashboard
- Navigate to http://localhost:3010
- Login with admin credentials
- View orders, inventory, and deliveries

### 2. Test the APIs

```bash
# Get authentication token
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Copy the accessToken from response

# Use token to test authenticated endpoints
curl -H "Authorization: Bearer <your-token>" \
  http://localhost:3001/auth/me
```

### 3. View API Documentation

Visit **http://localhost:3001/api/docs** for interactive Swagger documentation

### 4. Mobile App Development

```bash
cd apps/mobile/delivery-mobile-app
flutter pub get
flutter run
```

## 📋 Service Status Check

```bash
# Check if all services are running
docker-compose ps

# Check logs for specific service
docker-compose logs auth-service

# Follow logs in real-time
docker-compose logs -f
```

## 🛑 Stopping the System

```bash
# Stop services (keep data)
docker-compose stop

# Stop and remove containers (keep data)
docker-compose down

# Stop, remove containers, and delete data
docker-compose down -v

# Stop everything and clean up
docker-compose down -v --rmi all
```

## 📱 Next: Local Development

When ready to develop locally:

```bash
# Install dependencies
yarn install

# Start services individually
cd services/auth-service
yarn dev

# In another terminal
cd services/order-service
yarn dev

# In another terminal
cd apps/web/warehouse-dashboard
yarn dev
```

## 💡 Common Tasks

### View Database

```bash
# Open Prisma Studio
docker-compose exec auth-service npx prisma studio

# Or use PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d commerce_db
```

### Create Migration

```bash
docker-compose exec auth-service npx prisma migrate dev --name add_new_field
```

### View Service Logs

```bash
# Last 50 lines
docker-compose logs auth-service --tail=50

# Real-time logs
docker-compose logs -f auth-service

# All services
docker-compose logs -f
```

### Rebuild Specific Service

```bash
docker-compose build auth-service
docker-compose up -d auth-service
```

## 📞 Need Help?

Check the detailed documentation:
- **Architecture**: `ARCHITECTURE.md` (repo root)
- **API Guide**: `README.md` → API Documentation section
- **Database Schema**: Open Prisma Studio

---

Congratulations! 🎉 Your multi-channel commerce system is now running!

**Created**: 2026-04-16  
**Last Updated**: 2026-04-16

```
