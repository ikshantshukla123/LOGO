import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string | null;
  mobile: string | null;
}

type AuthView = 'login' | 'cart' | 'checkout';

interface AuthStore {
  user: User | null;
  isModalOpen: boolean;
  view: AuthView; // <--- ADDED: To track why modal opened
  
  login: (user: User) => void;
  logout: () => void;
  openModal: (view?: AuthView) => void; // <--- UPDATED
  closeModal: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isModalOpen: false,
      view: 'login',

      login: (user) => set({ user }),
      logout: () => set({ user: null }),

      openModal: (view = 'login') => set({ isModalOpen: true, view }),
      closeModal: () => set({ isModalOpen: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);