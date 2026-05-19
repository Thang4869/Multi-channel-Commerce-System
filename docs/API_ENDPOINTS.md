# API Endpoints Reference

## Base URL

```
http://localhost/api
```

---

## Auth Service - `/api/auth`

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "expires_in": 3600,
  "user": { "id": 1, "email": "user@example.com" }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "+84912345678"
}

Response (201):
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": { "id": 2, "email": "newuser@example.com" }
}
```

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGc..."
}

Response (200):
{
  "access_token": "eyJhbGc...",
  "expires_in": 3600
}
```

### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer eyJhbGc...

Response (200):
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "+84912345678",
  "role": "user",
  "created_at": "2026-05-19T10:00:00Z"
}
```

---

## Product Service - `/api/products`, `/api/categories`, `/api/brands`

### List Products
```http
GET /api/products?page=1&limit=20&category_id=1&brand_id=1&sort=name&order=asc

Response (200):
{
  "data": [
    { "id": 1, "name": "Product 1", "price": 100000, "stock": 50 }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### Get Product Details
```http
GET /api/products/{product_id}

Response (200):
{
  "id": 1,
  "name": "Product 1",
  "description": "...",
  "price": 100000,
  "category_id": 1,
  "brand_id": 1,
  "stock": 50,
  "images": ["url1", "url2"],
  "created_at": "2026-05-19T10:00:00Z"
}
```

### Create Product
```http
POST /api/products
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "name": "New Product",
  "description": "...",
  "price": 150000,
  "category_id": 1,
  "brand_id": 1,
  "stock": 100
}

Response (201):
{ "id": 101, "name": "New Product", ... }
```

### List Categories
```http
GET /api/categories

Response (200):
{
  "data": [
    { "id": 1, "name": "Electronics", "description": "..." }
  ]
}
```

### List Brands
```http
GET /api/brands

Response (200):
{
  "data": [
    { "id": 1, "name": "Samsung", "description": "..." }
  ]
}
```

---

## Order Service - `/api/orders`

### Create Order
```http
POST /api/orders
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "items": [
    { "product_id": 1, "quantity": 2, "price": 100000 },
    { "product_id": 2, "quantity": 1, "price": 150000 }
  ],
  "delivery_address": "123 Main Street, Hanoi",
  "phone": "+84912345678",
  "notes": "Please deliver before 5 PM"
}

Response (201):
{
  "id": "ORD-001",
  "user_id": 1,
  "items": [...],
  "total": 350000,
  "status": "pending",
  "created_at": "2026-05-19T10:00:00Z"
}
```

### List Orders
```http
GET /api/orders?page=1&limit=10&status=pending

Response (200):
{
  "data": [
    { "id": "ORD-001", "status": "pending", "total": 350000 }
  ],
  "pagination": { ... }
}
```

### Get Order Details
```http
GET /api/orders/{order_id}
Authorization: Bearer eyJhbGc...

Response (200):
{
  "id": "ORD-001",
  "items": [...],
  "delivery": { ... },
  "status": "pending"
}
```

### Update Order
```http
PUT /api/orders/{order_id}
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "delivery_address": "456 New Street",
  "phone": "+84987654321"
}

Response (200):
{ "id": "ORD-001", ... }
```

### Cancel Order
```http
DELETE /api/orders/{order_id}
Authorization: Bearer eyJhbGc...

Response (204): No Content
```

---

## Inventory Service - `/api/inventory`

### Lock Stock
```http
POST /api/inventory/lock
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "order_id": "ORD-001",
  "items": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 2, "quantity": 1 }
  ]
}

Response (200):
{
  "lock_id": "LOCK-001",
  "reserved_from": "store",
  "items": [
    { "product_id": 1, "reserved": 2, "location": "Store A" }
  ]
}
```

### Release Stock
```http
POST /api/inventory/release
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "lock_id": "LOCK-001"
}

Response (200):
{
  "lock_id": "LOCK-001",
  "status": "released"
}
```

### Get Store Inventory
```http
GET /api/inventory/stores

Response (200):
{
  "data": [
    {
      "id": "STORE-001",
      "name": "Store A",
      "products": [
        { "product_id": 1, "available": 50, "reserved": 5 }
      ]
    }
  ]
}
```

### Get Warehouse Inventory
```http
GET /api/inventory/warehouses

Response (200):
{
  "data": [
    {
      "id": "WH-001",
      "name": "Central Warehouse",
      "products": [
        { "product_id": 1, "available": 500, "reserved": 50 }
      ]
    }
  ]
}
```

---

## Delivery Service - `/api/deliveries`

### Create Delivery
```http
POST /api/deliveries
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "order_id": "ORD-001",
  "delivery_address": "123 Main Street, Hanoi",
  "receiver_phone": "+84912345678",
  "receiver_name": "John Doe",
  "delivery_type": "standard",
  "cod": 0
}

Response (201):
{
  "id": "DEL-001",
  "order_id": "ORD-001",
  "status": "pending",
  "created_at": "2026-05-19T10:00:00Z"
}
```

### List Deliveries
```http
GET /api/deliveries?page=1&limit=10&status=pending
Authorization: Bearer eyJhbGc...

Response (200):
{
  "data": [
    { "id": "DEL-001", "status": "pending", "delivery_address": "..." }
  ],
  "pagination": { ... }
}
```

### Get Delivery Details
```http
GET /api/deliveries/{delivery_id}
Authorization: Bearer eyJhbGc...

Response (200):
{
  "id": "DEL-001",
  "order_id": "ORD-001",
  "status": "pending",
  "tracking_history": [...]
}
```

### Update Delivery Status
```http
PATCH /api/deliveries/{delivery_id}/status
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "status": "shipped",
  "notes": "Dispatched to carrier"
}

Response (200):
{
  "id": "DEL-001",
  "status": "shipped"
}
```

---

## Warehouse Service - `/api/warehouses`

### List Warehouses
```http
GET /api/warehouses?page=1&limit=10
Authorization: Bearer eyJhbGc...

Response (200):
{
  "data": [
    { "id": "WH-001", "name": "Central Warehouse", "location": "Hanoi" }
  ],
  "pagination": { ... }
}
```

### Get Warehouse Details
```http
GET /api/warehouses/{warehouse_id}
Authorization: Bearer eyJhbGc...

Response (200):
{
  "id": "WH-001",
  "name": "Central Warehouse",
  "location": "Hanoi",
  "capacity": 10000,
  "current_stock": 5000,
  "created_at": "2026-05-19T10:00:00Z"
}
```

### Create Distribution
```http
POST /api/warehouses/{warehouse_id}/distribution
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "items": [
    { "product_id": 1, "quantity": 100, "destination_store": "STORE-001" }
  ],
  "notes": "Restock for Store A"
}

Response (201):
{
  "id": "DIST-001",
  "warehouse_id": "WH-001",
  "status": "pending",
  "created_at": "2026-05-19T10:00:00Z"
}
```

### Get Warehouse Transactions
```http
GET /api/warehouses/{warehouse_id}/transactions?page=1&limit=20
Authorization: Bearer eyJhbGc...

Response (200):
{
  "data": [
    {
      "id": "TXN-001",
      "type": "inbound",
      "items": [...],
      "created_at": "2026-05-19T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## Notification Service - `/api/notifications`

### Send Notification
```http
POST /api/notifications/send
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "recipient_id": 1,
  "type": "order_status",
  "title": "Order Updated",
  "message": "Your order ORD-001 has been shipped",
  "data": { "order_id": "ORD-001" }
}

Response (201):
{
  "id": "NOTIF-001",
  "status": "sent"
}
```

### List Notifications
```http
GET /api/notifications?page=1&limit=20&read=false
Authorization: Bearer eyJhbGc...

Response (200):
{
  "data": [
    {
      "id": "NOTIF-001",
      "type": "order_status",
      "title": "Order Updated",
      "read": false,
      "created_at": "2026-05-19T10:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

### Mark as Read
```http
PUT /api/notifications/{notification_id}/read
Authorization: Bearer eyJhbGc...

Response (200):
{
  "id": "NOTIF-001",
  "read": true
}
```

---

## Documentation

```http
GET /api/docs

Response: HTML/JSON with Swagger/OpenAPI spec
```

---

## Error Responses

All endpoints return consistent error format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "BadRequest",
  "timestamp": "2026-05-19T10:00:00Z"
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

---

## Rate Limits

All responses include rate limit headers:

```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
X-RateLimit-Reset: 1621413660
```

When limit exceeded:
```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Retry-After: 60
```

---

Last Updated: 2026-05-19
