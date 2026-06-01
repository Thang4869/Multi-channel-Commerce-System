import axios from 'axios';
import { ApiResponse, RegisterRequest, UserDto } from '@commerce/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  login: (email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user?: UserDto }> =>
    apiClient.post<{ accessToken: string; refreshToken: string; user?: UserDto }>('/auth/login', { email, password }).then((r) => r.data),
  register: (data: RegisterRequest): Promise<ApiResponse<UserDto>> =>
    apiClient.post<ApiResponse<UserDto>>('/auth/register', data).then((r) => r.data),
  getCurrentUser: (): Promise<ApiResponse<UserDto>> => apiClient.get<ApiResponse<UserDto>>('/auth/me').then((r) => r.data),
};

export default apiClient;
