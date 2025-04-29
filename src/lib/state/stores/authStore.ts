import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../types';
import { authApi } from '../../api/endpoints';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authApi.login(email, password);
                    set({
                        user: response.user,
                        token: response.token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.message || 'Failed to login',
                        isLoading: false,
                    });
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await authApi.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },

            checkAuth: async () => {
                const { token } = get();
                if (!token) return;

                set({ isLoading: true });
                try {
                    const user = await authApi.me();
                    set({ user, isAuthenticated: true, isLoading: false });
                } catch (error) {
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },
        }),
        {
            name: 'erp-auth-storage',
            partialize: (state) => ({ token: state.token }),
        }
    )
);
