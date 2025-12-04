"use client";

import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
}


export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      // If product already exists → increase quantity
      const existing = state.items.find((p) => p.id === item.id);
      if (existing) {
        return {
          items: state.items.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }

      return { items: [...state.items, item] };
    }),




  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),





  increaseQty: (id) =>
    set((state) => ({
      items: state.items.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      ),
    })),





  decreaseQty: (id) =>
    set((state) => ({
      items: state.items
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
        ),
    })),

  clearCart: () => set({ items: [] }),
}));
