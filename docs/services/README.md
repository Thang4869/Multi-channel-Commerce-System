# Microservices Documentation

> Individual service documentation and API specifications

---

## 📋 Services

1. [auth-service.md](./auth-service.md) - Authentication & JWT
2. [user-service.md](./user-service.md) - User management
3. [product-service.md](./product-service.md) - Product catalog
4. [order-service.md](./order-service.md) - Order processing
5. [inventory-service.md](./inventory-service.md) - Stock management
6. [warehouse-service.md](./warehouse-service.md) - Warehouse ops
7. [delivery-service.md](./delivery-service.md) - Delivery tracking
8. [notification-service.md](./notification-service.md) - Notifications

---

## Service Overview

| Service | Port | Purpose | Dependencies |
|---------|------|---------|--------------|
| Auth | 3001 | User authentication | PostgreSQL, Redis |
| User | 3006 | User management | PostgreSQL, Auth |
| Product | 3003 | Product catalog | PostgreSQL |
| Order | 3002 | Order management | PostgreSQL, Product |
| Inventory | 3004 | Stock management | PostgreSQL, Product |
| Warehouse | 3007 | Warehouse ops | PostgreSQL, Inventory |
| Delivery | 3005 | Delivery tracking | PostgreSQL, Order |
| Notification | 3008 | Notifications | PostgreSQL, Redis |

---

## Quick Links

### Service Details
- **Code Structure**: Each service has `src/` with Domain/Application/Infrastructure/Interfaces
- **Configuration**: Check `.env.example` in each service
- **Testing**: Run `yarn test` in service directory
- **Building**: Run `yarn build` to compile TypeScript

---

**Last Updated**: 2026-04-25
