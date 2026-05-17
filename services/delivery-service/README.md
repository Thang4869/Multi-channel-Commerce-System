# Delivery Service

Real-time delivery tracking and status management microservice for the multi-channel commerce system.

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL with `delivery_schema` (via Prisma migrations)
- Redis (optional, for future event-driven enhancements)

### Local Development

```bash
cd services/delivery-service
npm install
npm run prisma:generate

# Create/migrate database
npm run prisma:migrate

# Start development server
npm run dev
```

Server runs on `http://localhost:3005` by default.

## API Endpoints

### Create Delivery
**POST** `/delivery/create`

```bash
curl -X POST http://localhost:3005/delivery/create \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ord123",
    "destLocationAddress": "123 Main St, City",
    "destLocationLat": 10.7769,
    "destLocationLng": 106.7009,
    "estimatedDeliveryTime": "2026-05-19T10:00:00Z",
    "notes": "Handle with care"
  }'
```

Response:
```json
{
  "id": "delivery-uuid",
  "orderId": "ord123",
  "status": "PENDING",
  "destLocationAddress": "123 Main St, City",
  "destLocationLat": 10.7769,
  "destLocationLng": 106.7009,
  "estimatedDeliveryTime": "2026-05-19T10:00:00Z",
  "createdAt": "2026-05-18T...",
  "tracking": [...]
}
```

### Update Delivery Status
**PUT** `/delivery/status`

```bash
curl -X PUT http://localhost:3005/delivery/status \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryId": "delivery-uuid",
    "status": "IN_TRANSIT",
    "latitude": 10.7770,
    "longitude": 106.7010,
    "address": "Street ABC",
    "notes": "On the way"
  }'
```

Supported statuses: `PENDING`, `IN_TRANSIT`, `DELIVERED`, `FAILED`

### Track Delivery
**GET** `/delivery/track/:deliveryId`

```bash
curl http://localhost:3005/delivery/track/delivery-uuid
```

Response:
```json
{
  "success": true,
  "delivery": { ... },
  "tracking": [
    {
      "id": "track-uuid",
      "lat": 10.7770,
      "lng": 106.7010,
      "address": "Street ABC",
      "status": "IN_TRANSIT",
      "timestamp": "2026-05-18T..."
    }
  ]
}
```

### List Deliveries
**GET** `/delivery/list?page=1&limit=10`

```bash
curl "http://localhost:3005/delivery/list?page=1&limit=20"
```

## Database Schema

Models in `delivery_schema`:
- **Delivery**: Order delivery record (status, location, ETA, actual delivery time)
- **DeliveryTracking**: GPS/status history entries (timestamp, coordinates, address, status)
- **Vehicle**: Shipper vehicle inventory (plate, driver, capacity, status)

Enables multi-schema Prisma with `@@schema("delivery_schema")` directive.

## Environment Variables

```
PORT=3005
DATABASE_URL=postgresql://user:password@localhost:5432/commerce_db?schema=delivery_schema
NODE_ENV=development
ORDER_SERVICE_URL=http://order-service:3002
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:3010,http://localhost:3000
```

## Order Service Integration

On delivery completion or failure, notifies order service via:
- **POST** `{ORDER_SERVICE_URL}/internal/orders/{orderId}/delivery-callback`
- Payload: `{ deliveryId, status }`
- Non-blocking; logs warning on failure.

## Architecture

Follows clean architecture pattern:
- `application/`: Business logic (DeliveryService)
- `infrastructure/`: Data access (DeliveryRepository)
- `interfaces/http/`: HTTP handlers (DeliveryController)
- `dtos/`: Input validation and transfer objects
