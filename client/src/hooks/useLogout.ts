import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore.ts'
import { authService } from '../api/auth.service.ts';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '../types/types.ts';



export const useLogout = () => {
    const clearAuth = useAuthStore(state => state.logout);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authService.logout(),

        onSuccess: (response) =>{
            clearAuth();
            queryClient.clear();

            const message = response.message || 'Logged out successfully.';
            toast.success(message);
        },

        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Logout failed! Please try again.';
            toast.error(message);

            clearAuth();
            queryClient.clear();
        }
    });
};