import type { User } from '../types/types.ts'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'



interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isAuthInitialized: boolean;
    setAuth: (user: User) => void;
    logout: () => void;
    setInitialized: () => void;
}



export const useAuthStore = create<AuthState>()(
    devtools(
        (set): AuthState => ({
            user: null,
            isAuthenticated: false,
            isAuthInitialized: false,
            setAuth: (user) => set(
                {
                    user,
                    isAuthenticated: true,
                    isAuthInitialized: true
                },
                false,
                'auth/setAuth'
            ),
            logout: () => set(
                {
                    user: null,
                    isAuthenticated: false,
                },
                false,
                'auth/logout'
            ),
            setInitialized: () => set(
                {
                    isAuthInitialized: true
                },
                false,
                'auth/setInitialized'
            ),
        }),
        {
            name: 'AuthStore'
        }
    )
);