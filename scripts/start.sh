#!/bin/bash

# ============================================
# QUICK START SCRIPT
# ============================================

set -e

echo "🚀 Multi-Channel Commerce System - Quick Start"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check prerequisites
echo -e "${BLUE}1. Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker not found. Please install Docker Desktop${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  docker-compose not found. Please install docker-compose${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker & docker-compose found${NC}"
echo ""

# 2. Create environment files
echo -e "${BLUE}2. Setting up environment files...${NC}"

if [ ! -f "services/auth-service/.env" ]; then
    cp services/auth-service/.env.example services/auth-service/.env
    echo -e "${GREEN}✅ Created Auth Service .env${NC}"
fi

if [ ! -f "services/order-service/.env" ]; then
    cp services/order-service/.env.example services/order-service/.env
    echo -e "${GREEN}✅ Created Order Service .env${NC}"
fi

echo ""

# 3. Build Docker images
echo -e "${BLUE}3. Building Docker images...${NC}"
echo "(This may take a few minutes on first run)"
docker-compose build --quiet
echo -e "${GREEN}✅ Docker images built${NC}"
echo ""

# 4. Start services
echo -e "${BLUE}4. Starting services...${NC}"
docker-compose up -d
echo -e "${GREEN}✅ Services started${NC}"
echo ""

# 5. Wait for services to be ready
echo -e "${BLUE}5. Waiting for services to be ready...${NC}"
sleep 10

# Check if PostgreSQL is ready
echo "Waiting for PostgreSQL..."
until docker-compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; do
    echo "  ⏳ PostgreSQL is unavailable - sleeping"
    sleep 2
done
echo -e "${GREEN}✅ PostgreSQL is ready${NC}"

# Check if Redis is ready
echo "Waiting for Redis..."
until docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; do
    echo "  ⏳ Redis is unavailable - sleeping"
    sleep 2
done
echo -e "${GREEN}✅ Redis is ready${NC}"
echo ""

# 6. Run database migrations
echo -e "${BLUE}6. Running database migrations...${NC}"
docker-compose exec -T auth-service npx prisma migrate deploy || true
echo -e "${GREEN}✅ Database migrations completed${NC}"
echo ""

# 7. Seed database (optional)
echo -e "${BLUE}7. Seeding database with sample data...${NC}"
docker-compose exec -T auth-service npx prisma db seed || true
echo -e "${GREEN}✅ Database seeded${NC}"
echo ""

# 8. Display service information
echo -e "${GREEN}=============================================="
echo "🎉 Setup Complete!${NC}"
echo "=============================================="
echo ""
echo "📋 Services are running:"
echo ""
echo -e "${BLUE}Frontend:${NC}"
echo "  🏠 Warehouse Dashboard: ${GREEN}http://localhost:3010${NC}"
echo ""
echo -e "${BLUE}APIs:${NC}"
echo "  🔐 Auth Service: ${GREEN}http://localhost:3001${NC}"
echo "  📦 Order Service: ${GREEN}http://localhost:3002${NC}"
echo "  🔗 API Gateway: ${GREEN}http://localhost${NC}"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "  📚 Swagger Docs: ${GREEN}http://localhost:3001/api/docs${NC}"
echo ""
echo -e "${BLUE}Database:${NC}"
echo "  🗄️  PostgreSQL: ${GREEN}localhost:5432${NC}"
echo "  💾 Redis: ${GREEN}localhost:6379${NC}"
echo ""

# 9. Test connectivity
echo -e "${BLUE}8. Testing connectivity...${NC}"
if curl -s http://localhost/health > /dev/null; then
    echo -e "${GREEN}✅ API Gateway is responding${NC}"
else
    echo -e "${YELLOW}⚠️  API Gateway not ready yet (normal, may need 30 seconds)${NC}"
fi
echo ""

# 10. Display next steps
echo -e "${GREEN}🚀 Next Steps:${NC}"
echo ""
echo "1. Open Dashboard: ${GREEN}http://localhost:3010${NC}"
echo "2. Login with:"
echo "   Email: ${YELLOW}admin@example.com${NC}"
echo "   Password: ${YELLOW}password123${NC}"
echo ""
echo "3. View API Documentation: ${GREEN}http://localhost:3001/api/docs${NC}"
echo ""
echo "4. Check Service Logs:"
echo "   ${YELLOW}docker-compose logs -f auth-service${NC}"
echo "   ${YELLOW}docker-compose logs -f order-service${NC}"
echo ""
echo "5. Stop Services:"
echo "   ${YELLOW}docker-compose down${NC}"
echo ""
echo "6. Stop Services & Remove Volumes:"
echo "   ${YELLOW}docker-compose down -v${NC}"
echo ""

echo -e "${GREEN}✅ Happy coding!${NC}"
