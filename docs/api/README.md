# API Documentation

> RESTful API endpoints, authentication, and integration guides

---

## 📋 Contents

1. [authentication.md](./authentication.md) - Auth & JWT endpoints
2. [users.md](./users.md) - User management endpoints
3. [products.md](./products.md) - Product catalog endpoints
4. [orders.md](./orders.md) - Order management endpoints
5. [inventory.md](./inventory.md) - Inventory endpoints
6. [warehouse.md](./warehouse.md) - Warehouse endpoints
7. [delivery.md](./delivery.md) - Delivery endpoints
8. [notifications.md](./notifications.md) - Notification endpoints
9. [error-handling.md](./error-handling.md) - Error codes & responses
10. [pagination.md](./pagination.md) - Pagination standards
11. [rate-limiting.md](./rate-limiting.md) - Rate limiting policy

---

## Quick Links

- **Base URL**: `http://localhost/api`
- **Authentication**: See [authentication.md](./authentication.md)
- **OpenAPI Spec**: See [assets/openapi-spec.yaml](./assets/openapi-spec.yaml)
- **Postman Collection**: See [assets/postman-collection.json](./assets/postman-collection.json)

---

## Getting Started

### 1. Authentication
First, authenticate using [authentication.md](./authentication.md)

### 2. Choose an Endpoint
Browse the relevant service docs (users, products, orders, etc.)

### 3. Make Request
```bash
curl -X GET http://localhost/api/users/123 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

---

## All Endpoints

### Auth Service
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Current user
- `POST /api/auth/logout` - Logout

### User Service
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Product Service
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Order Service
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update status
- `DELETE /api/orders/:id` - Cancel order

### Other Services
See respective documentation files

---

**Last Updated**: 2026-04-25
