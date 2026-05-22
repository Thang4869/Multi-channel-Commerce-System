### Pull Request Description

**Mục đích:** Thêm scaffold cho `warehouse-service` bao gồm mô hình Prisma, repository, service, controller và bộ DTO để bắt đầu phát triển quản lý kho và phân phối.

**Phạm vi ảnh hưởng:** services/warehouse-service, prisma schema @@schema("warehouse_schema"), liên quan đến Docker Compose và cấu hình chung.

**Tóm tắt thay đổi:**
- Thêm Prisma schema cho `warehouse_schema` và migration-ready models.
- Thêm scaffold NestJS: `main.ts`, `warehouse.module.ts`, `application/warehouse.service.ts`, `infrastructure/repositories/warehouse.repository.ts`, controller, DTOs.
- Thêm README hướng dẫn khởi tạo local, env cần thiết và ví dụ curl.

**Các file chính thay đổi/được thêm:**
- services/warehouse-service/prisma/schema.prisma
- services/warehouse-service/src/** (module, service, repository, controller, dtos)
- docker-compose.yml (nếu cần cấu hình service)

**Kiểm thử:**
- Chạy `npm install` và `npm run start:dev` trong `services/warehouse-service` để khởi động dev server.
- Kiểm tra kết nối Prisma với DB đã cấu hình.

**Lưu ý Breaking Changes:**
- Thêm schema mới `warehouse_schema` trong Prisma; cần đảm bảo database role/schema phù hợp trước khi chạy migration.

**Next steps:**
1. Viết unit/integration tests cho các phương thức repository và service.
2. Kết nối event bus Redis để nhận sự kiện phân phối từ `order-service`/`inventory-service`.
3. Chuẩn hóa API contract và thêm e2e tests.

---

### Merge Follow-up Comment (to post after merge)

PR đã merge vào `main`. Thực hiện các bước sau để hoàn tất:
- Chạy migration Prisma cho `warehouse_schema` trên môi trường staging.
- Triaging: gán người review tiếp theo cho việc viết tests và tích hợp event bus.

---

### Issue Closing (single-line comment to close issue)

Đã hoàn thành scaffold `warehouse-service` và merge từ `feat/warehouse-service-scaffolding` vào `main`. Đóng issue liên quan.
