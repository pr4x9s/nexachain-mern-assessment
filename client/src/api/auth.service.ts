import type { ApiResponse, User } from '../types/types.ts'
import type { LoginData, RegisterData } from '../validators/auth.validator.ts';
import api from './api.ts'



export const authService = {
    register: async (data: RegisterData): Promise<ApiResponse<User>> => {
        const response = await api.post<ApiResponse<User>>('/users/register', data);
        return response.data;
    },

    login: async (data: LoginData): Promise<ApiResponse<{ user: User }>> => {
        const response = await api.post<ApiResponse<{ user: User }>>('/users/login', data);
        return response.data;
    },

    logout: async (): Promise<ApiResponse<null>> => {
        const response = await api.post<ApiResponse<null>>('/users/logout');
        return response.data;
    },
};