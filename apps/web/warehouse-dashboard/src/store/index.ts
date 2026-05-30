// ============================================
// WAREHOUSE DASHBOARD - ZUSTAND STORE
// ============================================

import { create } from 'zustand';
import { UserDto, WarehouseStockDto, OrderDto } from '@commerce/types';

interface AuthStore {
  token: string | null;
  user: UserDto | null;
  setAuth: (token: string, user: UserDto) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  setAuth: (token: string, user: UserDto) => {
    localStorage.setItem('token', token);
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));

interface WarehouseStore {
  stocks: WarehouseStockDto[];
  isLoading: boolean;
  setStocks: (stocks: WarehouseStockDto[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  stocks: [],
  isLoading: false,
  setStocks: (stocks: WarehouseStockDto[]) => set({ stocks }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

interface OrderStore {
  orders: OrderDto[];
  isLoading: boolean;
  setOrders: (orders: OrderDto[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  isLoading: false,
  setOrders: (orders: OrderDto[]) => set({ orders }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
