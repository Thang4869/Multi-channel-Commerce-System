// ============================================
// API CLIENT
// ============================================

import axios from 'axios';

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
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  register: (data: Record<string, any>) =>
    apiClient.post('/auth/register', data),
  refreshToken: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
};

export const orderApi = {
  getAll: (page = 1, limit = 10) =>
    apiClient.get(`/orders?page=${page}&limit=${limit}`),
  getById: (id: string) =>
    apiClient.get(`/orders/${id}`),
  create: (data: Record<string, any>) =>
    apiClient.post('/orders', data),
  updateStatus: (id: string, status: string) =>
    apiClient.patch(`/orders/${id}/status`, { status }),
  confirm: (id: string) =>
    apiClient.patch(`/orders/${id}/confirm`, {}),
  cancel: (id: string) =>
    apiClient.patch(`/orders/${id}/cancel`, {}),
};

export const warehouseApi = {
  getStocks: (warehouseId: string) =>
    apiClient.get(`/warehouse/${warehouseId}/stocks`),
  updateStock: (stockId: string, quantity: number) =>
    apiClient.patch(`/stocks/${stockId}`, { quantity }),
};

export default apiClient;
