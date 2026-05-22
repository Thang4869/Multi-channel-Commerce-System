## Mụс Đíсh
Xây dựng Product Service API để quản lý sản phẩm, danh mục và thương hiệu, hỗ trợ full CRUD operations và filtering/sorting.

## Phạm Vi Ảnh Hưởng
- services/product-service: Toàn bộ service
- API Gateway: Routing /api/products, /api/categories, /api/brands
- Frontend (web, mobile): Product browsing functionality

## Thay Đổi Chính
- Thêm Prisma schema cho Product, Category, Brand models
- Thêm ProductService với business logic
- Thêm ProductRepository cho data access
- Thêm ProductController với HTTP endpoints
- Thêm DTOs cho request/response validation
- Thêm unit tests

## Breaking Changes
Không có - đây là new service

## Endpoints Đượс Thêm
- GET /api/products - List products (with pagination)
- POST /api/products - Create product
- GET /api/products/{id} - Get product details
- PUT /api/products/{id} - Update product
- DELETE /api/products/{id} - Delete product
- GET /api/categories - List categories
- POST /api/categories - Create category
- GET /api/brands - List brands
- POST /api/brands - Create brand
