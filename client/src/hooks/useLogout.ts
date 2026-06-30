import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore.ts'
import { authService } from '../api/auth.service.ts'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '../types/types.ts'
import { useNavigate } from 'react-router'



export const useLogout = () => {
    const clearAuth = useAuthStore(state => state.logout);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => authService.logout(),

        onSuccess: (response) => {
            const message = response.message || 'Logged out successfully.';

            sessionStorage.setItem('logout_toast_msg', message);

            clearAuth();
            queryClient.clear();
            navigate('/login', { replace: true });
        },

        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Logout failed! Please try again.';

            sessionStorage.setItem('logout_toast_msg', message);

            clearAuth();
            queryClient.clear();
            navigate('/login', { replace: true });
        }
    });
};