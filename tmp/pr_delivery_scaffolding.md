### Pull Request Description

- **Summary:** Implement delivery service core scaffolding with real-time location tracking, status management, and inter-service callbacks to order service.
- **Related Issue:** #81

### Changes

- **DeliveryService**: Core business logic for delivery creation, status updates, and order notifications
- **DeliveryRepository**: Data access layer with CRUD operations and tracking history queries
- **DeliveryController**: HTTP endpoints for create, status updates, tracking, and listing
- **Module Setup**: NestJS DI configuration with Prisma and validation
- **DTOs**: Input validation using class-validator (@IsString, @IsDecimal, @IsOptional)
- **Prisma Schema**: Added delivery_schema with Delivery, DeliveryTracking models
- **Bootstrap**: main.ts with global ValidationPipe enabled
- **Integration**: ORDER_SERVICE_URL environment variable wired for callbacks
- **Documentation**: Comprehensive README with setup, API examples, and architecture overview

### Test Coverage

Manual testing with curl commands (documented in README):
```bash
# Create delivery
curl -X POST http://localhost:3005/delivery/create \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ord123","destLocationAddress":"123 Main St","destLocationLat":10.77,"destLocationLng":106.70,"estimatedDeliveryTime":"2026-05-19T10:00:00Z"}'

# Update status
curl -X PUT http://localhost:3005/delivery/status \
  -H "Content-Type: application/json" \
  -d '{"deliveryId":"<id>","status":"IN_TRANSIT","latitude":10.77,"longitude":106.70}'

# Track delivery
curl http://localhost:3005/delivery/track/<deliveryId>
```

### Closes #81
