import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  productId: string;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      // --- Helper Methods ---
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      // --- Actions ---

      addItem: async (item) => {
        // 1. Generate Temp ID for optimistic UI
        const tempId = `temp-${Date.now()}`;
        const optimisticItem = { ...item, id: tempId };

        // 2. OPTIMISTIC UPDATE: Update UI Immediately
        set((state) => {
          // Check if same product + size already exists
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.size === item.size
          );

          if (existingIndex > -1) {
            // Item exists: Increment quantity
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += item.quantity;
            return { items: updatedItems, isLoading: true, error: null };
          } else {
            // Item is new: Add to list
            return { items: [...state.items, optimisticItem], isLoading: true, error: null };
          }
        });

        try {
          // 3. API CALL (Background Sync)
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: item.productId,
              quantity: item.quantity,
              size: item.size || ''
            })
          });

          const data = await response.json();

          if (!response.ok) throw new Error(data.error);

          // 4. RECONCILIATION: Swap Temp ID with Real DB ID
          set((state) => ({
            items: state.items.map((i) => {
              // If this is the item we just added (by tempId), update it with real ID
              if (i.id === tempId) {
                return { ...i, id: data.cartItem.id };
              }
              return i;
            }),
            isLoading: false
          }));

        } catch (error) {
          console.error("Add item failed:", error);
          // 5. ROLLBACK: Remove the temp item if API failed
          set((state) => ({
            items: state.items.filter((i) => i.id !== tempId),
            error: "Failed to add item to cart",
            isLoading: false
          }));
        }
      },

      removeItem: async (id: string) => {
        // Optimistic Remove
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          isLoading: true,
          error: null
        }));

        // API Call
        try {
          if (!id.startsWith('temp')) {
            await fetch(`/api/cart/${id}`, { method: 'DELETE' });
          }
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to remove item:', error);
          // Optional: Re-fetch cart here if needed
          set({ error: 'Failed to remove item', isLoading: false });
        }
      },

      updateQuantity: async (id: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }

        // Optimistic Update
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
          isLoading: true,
          error: null
        }));

        // API Call
        try {
          if (!id.startsWith('temp')) {
            await fetch(`/api/cart/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ quantity })
            });
          }
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to update quantity:', error);
          set({ error: 'Failed to update quantity', isLoading: false });
        }
      },

      clearCart: async () => {
        // Optimistic Clear
        set({ items: [], isLoading: true, error: null });

        try {
          await fetch('/api/cart/clear', { method: 'DELETE' });
          set({ isLoading: false });
        } catch (error) {
          console.error('Failed to clear cart:', error);
          set({ error: 'Failed to clear cart', isLoading: false });
        }
      },

      syncCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/cart');
          if (response.ok) {
            const data = await response.json();
            // Replace local state completely with server state (Source of Truth)
            set({ items: data.cart || [], isLoading: false });
          }
        } catch (error) {
          console.error('Failed to sync cart:', error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items 
      }),
    }
  )
);