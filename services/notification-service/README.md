# Notification Service

Service quản lý thông báo trong hệ thống commerce đa kênh. Giai đoạn hiện tại tập trung vào scaffold API CRUD cơ bản để phục vụ các luồng thông báo theo sự kiện.

## Mục tiêu

- Lưu thông báo theo người dùng.
- Truy vấn danh sách thông báo theo user.
- Đánh dấu thông báo đã đọc.
- Là nền tảng để bổ sung Redis event consumer và push notifications ở bước tiếp theo.

## Phạm vi API

| Method | Endpoint | Mục đích |
|---|---|---|
| POST | `/api/notifications` | Tạo thông báo mới |
| GET | `/api/notifications/user/:userId` | Lấy danh sách thông báo theo user |
| PATCH | `/api/notifications/:id` | Cập nhật trạng thái thông báo |

## Cấu hình môi trường

```bash
NODE_ENV=development
PORT=3008
DATABASE_URL=postgresql://postgres:password@postgres:5432/commerce_db?schema=notification_schema
REDIS_URL=redis://redis:6379
```

## Chạy cục bộ

```bash
cd services/notification-service
npm install
npm run prisma:generate
npm test
npm run dev
```

## Kiểm thử

- `npm test`: chạy unit test cho controller/service.
- `npm run build`: kiểm tra biên dịch TypeScript.
- `npm run prisma:generate`: xác nhận Prisma client sinh đúng theo schema.

## Lưu ý kỹ thuật

- Prisma client hiện được khởi tạo trực tiếp trong repository.
- `PORT` mặc định đồng bộ với `docker-compose.yml` là `3008`.
- Bước tiếp theo cần bổ sung Redis consumer và luồng gửi push notifications.
