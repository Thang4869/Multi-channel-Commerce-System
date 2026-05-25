import { create } from 'zustand';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}

interface AuthStore {
  token: string | null;
  user: UserProfile | null;
  setAuth: (token: string, user: UserProfile) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  setAuth: (token: string, user: UserProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({ token, user });
  },
  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ token: null, user: null });
  },
}));

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item: CartItem) => {
    const items = get().items;
    const existing = items.find((entry) => entry.id === item.id);
    if (existing) {
      set({
        items: items.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + item.quantity }
            : entry
        ),
      });
      return;
    }
    set({ items: [...items, item] });
  },
  removeItem: (id: string) => {
    set({ items: get().items.filter((entry) => entry.id !== id) });
  },
  setQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((entry) => entry.id !== id) });
      return;
    }
    set({
      items: get().items.map((entry) =>
        entry.id === id ? { ...entry, quantity } : entry
      ),
    });
  },
  clearCart: () => {
    set({ items: [] });
  },
}));
