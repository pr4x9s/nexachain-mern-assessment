import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authService } from '../api/auth.service.ts'
import type { RegisterData } from '../validators/auth.validator.ts'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '../types/types.ts'



export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: RegisterData) => authService.register(data),

        onSuccess: (response) => {
            const message = response.message || 'Registration successful! Please sign in.';
            toast.success(message);
            navigate('/login');
        },

        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Registration failed. Please try again.'
            toast.error(message);
        }
    });
};