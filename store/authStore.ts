import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string | null;
  mobile: string | null;
  role?: "USER" | "ADMIN";
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
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isModalOpen: false,
      view: 'login',

      login: (user) => set({ user }),
      logout: () => set({ user: null }),

      openModal: (view = 'login') => set({ isModalOpen: true, view }),
      closeModal: () => set({ isModalOpen: false }),
      isAdmin: () => {
        const { user } = get();
        return user?.role === "ADMIN";
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);