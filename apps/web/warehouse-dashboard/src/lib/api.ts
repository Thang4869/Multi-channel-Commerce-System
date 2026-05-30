// ============================================
// API CLIENT
// ============================================

import axios from 'axios';
import {
  LoginRequest,
  RegisterRequest,
  AuthTokens,
  ApiResponse,
  UserDto,
  OrderDto,
  PaginationResponse,
  CreateOrderRequest,
  WarehouseStockDto,
  UpdateStockRequest,
} from '@commerce/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  // backend returns tokens + user on login
  login: (email: string, password: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string; user?: UserDto }>> =>
    apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string; user?: UserDto }>>('/auth/login', { email, password }).then((r) => r.data),
  register: (data: RegisterRequest): Promise<ApiResponse<UserDto>> =>
    apiClient.post<ApiResponse<UserDto>>('/auth/register', data).then((r) => r.data),
  refreshToken: (refreshToken: string): Promise<ApiResponse<AuthTokens>> =>
    apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken }).then((r) => r.data),
  getCurrentUser: (): Promise<ApiResponse<UserDto>> =>
    apiClient.get<ApiResponse<UserDto>>('/auth/me').then((r) => r.data),
};

export const orderApi = {
  getAll: (page = 1, limit = 10): Promise<ApiResponse<PaginationResponse<OrderDto>>> =>
    apiClient.get<ApiResponse<PaginationResponse<OrderDto>>>(`/orders?page=${page}&limit=${limit}`).then((r) => r.data),
  getById: (id: string): Promise<ApiResponse<OrderDto>> =>
    apiClient.get<ApiResponse<OrderDto>>(`/orders/${id}`).then((r) => r.data),
  create: (data: CreateOrderRequest): Promise<ApiResponse<OrderDto>> =>
    apiClient.post<ApiResponse<OrderDto>>('/orders', data).then((r) => r.data),
  updateStatus: (id: string, status: string): Promise<ApiResponse<OrderDto>> =>
    apiClient.patch<ApiResponse<OrderDto>>(`/orders/${id}/status`, { status }).then((r) => r.data),
  confirm: (id: string): Promise<ApiResponse<OrderDto>> =>
    apiClient.patch<ApiResponse<OrderDto>>(`/orders/${id}/confirm`, {}).then((r) => r.data),
  cancel: (id: string): Promise<ApiResponse<OrderDto>> =>
    apiClient.patch<ApiResponse<OrderDto>>(`/orders/${id}/cancel`, {}).then((r) => r.data),
};

export const warehouseApi = {
  getStocks: (warehouseId: string): Promise<ApiResponse<WarehouseStockDto[]>> =>
    apiClient.get<ApiResponse<WarehouseStockDto[]>>(`/warehouse/${warehouseId}/stocks`).then((r) => r.data),
  updateStock: (stockId: string, quantity: number): Promise<ApiResponse<WarehouseStockDto>> =>
    apiClient.patch<ApiResponse<WarehouseStockDto>>(`/stocks/${stockId}`, { quantity }).then((r) => r.data),
};

export default apiClient;
