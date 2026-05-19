# Warehouse Dashboard - Next.js Application

## Tổng Quan

Warehouse Dashboard là một ứng dụng Next.js hiện đại được xây dựng để quản lý hoạt động kho hàng, bao gồm quản lý inventory, phân phối hàng, theo dõi đơn hàng và giao hàng.

**Công Nghệ Sử Dụng:**
- Next.js 14 - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Zustand - State management
- React Query - Data fetching & caching
- Axios - HTTP client
- NextUI - Component library

## Tính Năng Chính

### 1. **Authentication**
- Đăng nhập với email/password
- JWT token-based authentication
- Token storage trong localStorage
- Automatic redirect to login if not authenticated

### 2. **Dashboard Overview**
- Tổng số kho (Warehouses)
- Tổng inventory hiện tại
- Số phân phối đang chờ xử lý
- Số sản phẩm hết hàng/cạn stock

### 3. **Warehouse Management**
- Danh sách tất cả kho
- Chi tiết kho (vị trí, sức chứa, stock hiện tại)
- Biểu đồ mức occupancy
- Lịch sử transactions

### 4. **Inventory Tracking**
- Xem toàn bộ inventory theo sản phẩm
- Theo dõi số lượng available vs reserved
- Lọc theo warehouse, trạng thái
- Cảnh báo low stock

### 5. **Distribution Management**
- Tạo phân phối mới từ warehouse đến store
- Duyệt/reject phân phối
- Theo dõi trạng thái (pending, approved, shipped, delivered)
- Lịch sử phân phối

### 6. **Real-time Notifications**
- Cập nhật trạng thái giao hàng
- Cảnh báo low stock
- Thông báo phân phối mới

## Cấu Trúc Dự Án

```
warehouse-dashboard/
├── src/
│   ├── app/                           # Next.js App Router pages
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Main dashboard
│   │   ├── warehouses/
│   │   │   ├── page.tsx              # Warehouses list
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Warehouse detail
│   │   ├── inventory/
│   │   │   └── page.tsx              # Inventory management
│   │   ├── distributions/
│   │   │   ├── page.tsx              # Distributions list
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Distribution detail
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Root redirect
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   └── DashboardLayout.tsx   # Main layout component
│   │   └── dashboard/
│   │       ├── WarehouseOverview.tsx # Stats overview
│   │       ├── InventoryStatus.tsx   # Inventory table
│   │       └── RecentTransactions.tsx # Recent activity
│   ├── lib/
│   │   └── api.ts                    # API client service
│   ├── store/
│   │   └── index.ts                  # Zustand state management
│   └── types/
│       └── index.ts                  # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── Dockerfile
└── README.md
```

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running at http://localhost/api

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev

# App will be available at http://localhost:3010
```

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost/api
NODE_ENV=development
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Or using Docker
docker build -t warehouse-dashboard .
docker run -p 3010:3010 warehouse-dashboard
```

## API Integration

Warehouse Dashboard tích hợp với backend APIs qua API Gateway:

### Authentication
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/profile
```

### Warehouses
```
GET    /api/warehouses
GET    /api/warehouses/{id}
POST   /api/warehouses/{id}/distribution
GET    /api/warehouses/{id}/transactions
```

### Inventory
```
GET  /api/inventory
GET  /api/inventory/stores
GET  /api/inventory/warehouses
POST /api/inventory/lock
POST /api/inventory/release
```

### Orders & Deliveries
```
GET    /api/orders
GET    /api/orders/{id}
GET    /api/deliveries
GET    /api/deliveries/{id}
PATCH  /api/deliveries/{id}/status
```

### Products
```
GET /api/products
GET /api/products/{id}
```

**Chi tiết API:** Xem [docs/API_ENDPOINTS.md](../../docs/API_ENDPOINTS.md)

## State Management

Sử dụng Zustand cho state management:

```typescript
// store/index.ts
export const useAuthStore = create((set) => ({
  token: null,
  isLoading: false,
  error: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
  // ...
}));
```

## Component Structure

### Layout Components
- **DashboardLayout** - Main layout với sidebar navigation
  - Responsive design
  - Mobile-friendly hamburger menu
  - Logout functionality

### Dashboard Components
- **WarehouseOverview** - 4 stats cards
- **InventoryStatus** - Inventory table
- **RecentTransactions** - Activity feed

### Page Components
- **Login** - Authentication
- **Dashboard** - Overview
- **Warehouses** - List & detail
- **Inventory** - Management
- **Distributions** - List & detail

## Styling

- **Tailwind CSS** - Utility-first CSS framework
- **NextUI** - Pre-built component library (optional)
- **Custom CSS** - Global styles in `globals.css`

### Responsive Design
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Error Handling

Implemented at multiple levels:

1. **API Errors** - Caught by axios interceptors
2. **Component Errors** - Try-catch in useEffect
3. **Network Errors** - Retry logic & fallbacks
4. **User Feedback** - Toast notifications & error messages

## Performance Optimization

- **Code Splitting** - Automatic with Next.js
- **Image Optimization** - Next.js Image component
- **Lazy Loading** - Dynamic imports for heavy components
- **Caching** - React Query for data caching

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## Deployment

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3010

CMD ["npm", "start"]
```

### Docker Compose

```yaml
warehouse-dashboard:
  build: ./apps/web/warehouse-dashboard
  ports:
    - "3010:3010"
  environment:
    - NEXT_PUBLIC_API_URL=http://nginx/api
  depends_on:
    - nginx
```

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| "Cannot find API" | Check NEXT_PUBLIC_API_URL environment variable |
| "Login failed" | Verify backend auth service is running |
| "404 Not Found" | Check page file exists in src/app directory |
| "CORS error" | Verify API Gateway CORS headers are configured |
| "Blank page" | Check browser console for errors |

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev

# Check Next.js build output
npm run build -- --debug
```

## Development Workflow

### Adding a New Page

1. Create folder in `src/app` (e.g., `src/app/reports`)
2. Create `page.tsx` file
3. Use `DashboardLayout` component
4. Call API using `apiClient` service

### Example:
```typescript
'use client';
import { useAuthStore } from '@/store';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { apiClient } from '@/lib/api';

export default function ReportsPage() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // Fetch data
  }, [token]);

  return (
    <DashboardLayout>
      {/* Page content */}
    </DashboardLayout>
  );
}
```

### Adding a New Component

1. Create file in `src/components/{category}`
2. Export React component
3. Use in page or other components

## Security Considerations

1. **JWT Tokens** - Stored in localStorage (consider sessionStorage for more security)
2. **HTTPS** - Always use HTTPS in production
3. **API Keys** - Never commit .env files with keys
4. **Input Validation** - Validate user input on client & server
5. **CORS** - Configured on API Gateway, verify allowed origins

## Future Enhancements

- [ ] Real-time updates with WebSocket
- [ ] Advanced charts & analytics
- [ ] Export reports (PDF, Excel)
- [ ] Multi-language support (i18n)
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Role-based access control (RBAC)
- [ ] Audit logging

## Contributing

1. Create feature branch: `git checkout -b feat/new-feature`
2. Make changes & commit with conventional commits
3. Push to origin: `git push -u origin feat/new-feature`
4. Create Pull Request

## Support & Documentation

- **API Docs:** See [docs/API_ENDPOINTS.md](../../docs/API_ENDPOINTS.md)
- **Architecture:** See [docs/](../../docs/)
- **Issues:** Report bugs on GitHub Issues

## License

Proprietary - All rights reserved

---

**Last Updated:** 2026-05-20
**Version:** 1.0.0
