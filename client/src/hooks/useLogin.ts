import { authService } from '../api/auth.service.ts'
import { useAuthStore } from '../store/authStore.ts'
import { useMutation } from '@tanstack/react-query'
import type { LoginData } from '../validators/auth.validator.ts'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '../types/types.ts'
import { useNavigate } from 'react-router'



export const useLogin = () => {
    const setAuth = useAuthStore(state => state.setAuth);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: LoginData) => authService.login(data),

        onSuccess: (response) => {
            setAuth(response.data.user);
            toast.success(`Welcome back, ${response.data.user.fullName}!`);
            navigate('/dashboard');
        },

        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(message);
        }
    });
};