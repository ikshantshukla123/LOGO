// store/cartStore.ts
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

// Generate a temporary ID for local storage
const generateTempId = () => `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      // Helper methods
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      addItem: async (item) => {
        set({ isLoading: true, error: null });
        
        try {
          // Try to add to database if user is authenticated
          let cartItemId: string;
          
          try {
            const response = await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size || ''
              })
            });
            
            if (response.ok) {
              const data = await response.json();
              cartItemId = data.cartItem.id;
            } else {
              // If not authenticated, use local storage
              cartItemId = generateTempId();
            }
          } catch (error) {
            // Fallback to local storage
            cartItemId = generateTempId();
          }

          const newItem: CartItem = {
            ...item,
            id: cartItemId
          };

          set(state => {
            // Check if item already exists (same product and size)
            const existingItemIndex = state.items.findIndex(
              i => i.productId === item.productId && i.size === item.size
            );

            if (existingItemIndex >= 0) {
              // Update quantity if item exists
              const updatedItems = [...state.items];
              updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + item.quantity
              };
              return { items: updatedItems, isLoading: false };
            } else {
              // Add new item
              return { items: [...state.items, newItem], isLoading: false };
            }
          });

        } catch (error) {
          console.error('Failed to add item:', error);
          set({ 
            error: 'Failed to add item to cart', 
            isLoading: false 
          });
        }
      },

      removeItem: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Try to remove from database if it's not a temp ID
          if (!id.startsWith('temp_')) {
            try {
              await fetch(`/api/cart/${id}`, {
                method: 'DELETE',
              });
            } catch (error) {
              console.error('Failed to remove from database:', error);
            }
          }

          set(state => ({
            items: state.items.filter(item => item.id !== id),
            isLoading: false
          }));

        } catch (error) {
          console.error('Failed to remove item:', error);
          set({ 
            error: 'Failed to remove item from cart', 
            isLoading: false 
          });
        }
      },

      updateQuantity: async (id: string, quantity: number) => {
        if (quantity < 1) {
          // Remove item if quantity is 0
          await get().removeItem(id);
          return;
        }

        set({ isLoading: true, error: null });
        
        try {
          // Try to update database if it's not a temp ID
          if (!id.startsWith('temp_')) {
            try {
              await fetch(`/api/cart/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity })
              });
            } catch (error) {
              console.error('Failed to update in database:', error);
            }
          }

          set(state => ({
            items: state.items.map(item =>
              item.id === id ? { ...item, quantity } : item
            ),
            isLoading: false
          }));

        } catch (error) {
          console.error('Failed to update quantity:', error);
          set({ 
            error: 'Failed to update quantity', 
            isLoading: false 
          });
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Try to clear from database
          try {
            await fetch('/api/cart/clear', {
              method: 'DELETE',
            });
          } catch (error) {
            console.error('Failed to clear from database:', error);
          }

          set({ items: [], isLoading: false });

        } catch (error) {
          console.error('Failed to clear cart:', error);
          set({ 
            error: 'Failed to clear cart', 
            isLoading: false 
          });
        }
      },

      syncCart: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // Try to sync from database
          try {
            const response = await fetch('/api/cart');
            if (response.ok) {
              const data = await response.json();
              
              // Merge local and remote cart
              const localItems = get().items.filter(item => item.id.startsWith('temp_'));
              const remoteItems = data.cart || [];
              
              // Combine items, prioritizing remote items
              const combinedItems = [...remoteItems, ...localItems];
              
              // Remove duplicates (keep remote version)
              const uniqueItems = combinedItems.reduce((acc: CartItem[], item) => {
                const existing = acc.find(i => 
                  i.productId === item.productId && i.size === item.size
                );
                if (!existing) {
                  acc.push(item);
                }
                return acc;
              }, []);

              set({ items: uniqueItems, isLoading: false });
              return;
            }
          } catch (error) {
            console.error('Failed to sync from database:', error);
          }

          set({ isLoading: false });

        } catch (error) {
          console.error('Failed to sync cart:', error);
          set({ 
            error: 'Failed to sync cart', 
            isLoading: false 
          });
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