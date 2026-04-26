// ============================================
// SHARED TYPES & CONTRACTS
// ============================================

// ========== AUTH ==========
export enum UserRole {
  ADMIN = 'ADMIN',
  WAREHOUSE_MANAGER = 'WAREHOUSE_MANAGER',
  STORE_MANAGER = 'STORE_MANAGER',
  SHIPPER = 'SHIPPER',
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
}

export interface JwtPayload {
  userId: string;
  email: string;
  roles: UserRole[];
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: UserRole;
}

// ========== USER ==========
export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  roles: UserRole[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ========== PRODUCT ==========
export interface ProductDto {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  brandId: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
}

export interface BrandDto {
  id: string;
  name: string;
  logo: string;
}

export interface CreateProductRequest {
  sku: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  brandId: string;
  imageUrl: string;
}

// ========== ORDER ==========
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItemDto {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderDto {
  id: string;
  orderNumber: string;
  customerId: string;
  shippingAddress: string;
  billingAddress: string;
  totalPrice: number;
  status: OrderStatus;
  items: OrderItemDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderRequest {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  shippingAddress: string;
  billingAddress?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  notes?: string;
}

// ========== INVENTORY ==========
export interface WarehouseStockDto {
  id: string;
  warehouseId: string;
  productId: string;
  quantity: number;
  reserved: number;
  available: number;
  lastRestocked: Date;
}

export interface StoreStockDto {
  id: string;
  storeId: string;
  productId: string;
  quantity: number;
  minThreshold: number;
  lastUpdated: Date;
}

export interface UpdateStockRequest {
  productId: string;
  quantity: number;
  operation: 'ADD' | 'SUBTRACT' | 'SET';
}

// ========== WAREHOUSE ==========
export interface WarehouseDto {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentLoad: number;
  manager: UserDto;
  createdAt: Date;
  updatedAt: Date;
}

export enum WarehouseTransactionType {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND',
  TRANSFER = 'TRANSFER',
  ADJUSTMENT = 'ADJUSTMENT',
}

export interface WarehouseTransactionDto {
  id: string;
  warehouseId: string;
  productId: string;
  quantity: number;
  type: WarehouseTransactionType;
  referenceId: string;
  notes: string;
  createdAt: Date;
}

export interface CreateWarehouseTransactionRequest {
  productId: string;
  quantity: number;
  type: WarehouseTransactionType;
  referenceId: string;
  notes?: string;
}

// ========== DELIVERY ==========
export enum DeliveryStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export interface DeliveryDto {
  id: string;
  orderId: string;
  shipperId?: string;
  status: DeliveryStatus;
  currentLocation: GeoLocation;
  destinationLocation: GeoLocation;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  address: string;
}

export interface UpdateDeliveryStatusRequest {
  status: DeliveryStatus;
  currentLocation?: GeoLocation;
  notes?: string;
}

export interface AssignDeliveryRequest {
  shipperId: string;
  estimatedDeliveryTime: Date;
}

// ========== NOTIFICATION ==========
export enum NotificationType {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_SHIPPED = 'ORDER_SHIPPED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  STOCK_LOW = 'STOCK_LOW',
  DELIVERY_ASSIGNED = 'DELIVERY_ASSIGNED',
  DELIVERY_IN_TRANSIT = 'DELIVERY_IN_TRANSIT',
  DELIVERY_COMPLETED = 'DELIVERY_COMPLETED',
}

export interface NotificationDto {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

export interface SendNotificationRequest {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
}

// ========== API RESPONSE ==========
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
}

export interface PaginationRequest {
  page: number;
  limit: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}
