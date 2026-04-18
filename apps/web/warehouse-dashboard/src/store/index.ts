// ============================================
// WAREHOUSE DASHBOARD - ZUSTAND STORE
// ============================================

import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  user: Record<string, any> | null;
  setAuth: (token: string, user: Record<string, any>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  setAuth: (token: string, user: Record<string, any>) => {
    localStorage.setItem('token', token);
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));

interface WarehouseStore {
  stocks: Record<string, any>[];
  isLoading: boolean;
  setStocks: (stocks: Record<string, any>[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  stocks: [],
  isLoading: false,
  setStocks: (stocks: Record<string, any>[]) => set({ stocks }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

interface OrderStore {
  orders: Record<string, any>[];
  isLoading: boolean;
  setOrders: (orders: Record<string, any>[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  isLoading: false,
  setOrders: (orders: Record<string, any>[]) => set({ orders }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
