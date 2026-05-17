# Inventory Service

Dịch vụ quản lý kho với API lock/release hỗ trợ các đơn hàng.

## Chạy trên máy tính cục bộ

```bash
cd services/inventory-service
npm install
npm run prisma:generate
npm run dev
```

## Các Endpoint

### POST /inventory/lock
Khóa hàng tồn kho cho đơn hàng.

**Request:**
```json
{
  "orderId": "ord1",
  "productId": "prod1",
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "lockId": "lock-uuid",
  "source": "STORE",
  "stockId": "stock-id"
}
```

**Chiến lược:** Ưu tiên `store_stocks` trước, nếu không đủ sẽ chọn `warehouse_stocks` có số lượng khả dụng lớn nhất.

### POST /inventory/release
Giải phóng hàng tồn kho đã khóa.

**Request:**
```json
{
  "lockId": "lock-uuid"
}
```

**Response:**
```json
{
  "success": true
}
```

## Ví dụ Curl

```bash
# Lock stock
curl -X POST http://localhost:4003/inventory/lock \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ord1","productId":"prod1","quantity":2}'

# Release stock
curl -X POST http://localhost:4003/inventory/release \
  -H "Content-Type: application/json" \
  -d '{"lockId":"lock-uuid-from-response"}'
```

## Biến môi trường

- `DATABASE_URL` - Kết nối PostgreSQL
- `PORT` - Cổng lắng nghe (mặc định: 4003)
- `ORDER_SERVICE_URL` - URL tùy chọn để thông báo events tới Order Service

## Kiến trúc

- **application/inventory.service.ts** - Logic business, chiến lược chọn kho
- **infrastructure/repositories/** - Tương tác Prisma
- **interfaces/http/controllers/** - NestJS controllers
- **dtos/** - Data transfer objects với validation
