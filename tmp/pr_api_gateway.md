### Pull Request Description

**Mục Đích:** Nâng cấp API Gateway bằng cách thêm rate limiting, CORS, security headers, xác thực token và tài liệu toàn diện.

**Phạm Vi Ảnh Hưởng:** 
- Infrastructure: Nginx configuration cho API routing
- Microservices: Tất cả services (8 services được routing qua gateway)
- Client apps: Mobile app, Web dashboard (sẽ sử dụng gateway routes)

**Các File Thay Đổi/Được Thêm:**
- `infrastructure/nginx/conf.d/api-gateway.conf` - Enhanced nginx routing configuration
- `infrastructure/nginx/API_GATEWAY_README.md` - Comprehensive gateway documentation
- `docs/API_ENDPOINTS.md` - Complete API endpoints reference

**Tóm Tắt Thay Đổi Chi Tiết:**

#### 1. Enhanced Nginx Configuration
- **Rate Limiting:** 3 zones với mức khác nhau
  - Standard APIs: 10 req/s
  - Auth APIs: 5 req/s
  - Heavy operations: 2 req/s
- **Authentication:** Token validation cho protected endpoints
- **Security Headers:** XSS protection, clickjacking prevention, MIME sniffing prevention
- **CORS:** Full CORS support cho web/mobile clients
- **Request Tracing:** X-Request-ID headers cho distributed tracing
- **Upstream Health Checks:** Health check configuration cho service resilience
- **Logging:** Service-specific log files cho debugging

#### 2. API Gateway Documentation
- Architecture overview
- Detailed routing table cho 8 microservices
- Authentication & authorization flow
- Rate limiting explanation
- Security features documentation
- Health check & monitoring
- Development & testing guide
- Troubleshooting guide

#### 3. API Endpoints Reference
- Complete endpoint documentation cho tất cả services
- Request/response examples (JSON)
- Authentication requirements
- Pagination, filtering, sorting parameters
- Error handling & status codes
- Rate limit information

**Testing:**
```bash
# Health check
curl http://localhost/health

# Login (public endpoint)
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "password": "pass"}'

# Protected endpoint
curl -X GET http://localhost/api/orders \
  -H "Authorization: Bearer <token>"

# Test rate limiting
for i in {1..15}; do curl -X GET http://localhost/api/products; done
```

**Breaking Changes:** Không có

**Next Steps:**
1. Review API Gateway configuration (security & performance settings)
2. Test rate limiting behavior
3. Verify CORS headers được set đúng
4. Test authentication flow
5. Merge vào main
6. Deploy lên staging environment

**Deployment Checklist:**
- [ ] Nginx config reload không lỗi
- [ ] All upstream services reachable
- [ ] Rate limiting zones working
- [ ] CORS preflight requests successful
- [ ] Authentication validation active
- [ ] Logging active cho tất cả services
- [ ] Health check endpoint responsive
