import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import conf from '../conf/conf.ts'
import { useAuthStore } from '../store/authStore.ts'
import type { ApiResponse, RefreshTheAccessTokenResBody } from '../types/types.ts'



const api: AxiosInstance = axios.create({
    baseURL: conf.baseUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});



interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}


let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        }
        else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

        const is401 = error.response?.status === 401;

        const isLoginRequest = originalRequest?.url?.includes('/users/login');

        if (is401 && isLoginRequest) {
            return Promise.reject(error);
        }

        if (is401 && originalRequest && !originalRequest._retry) {
            if (originalRequest.url?.includes('/users/refresh-token')) {
                isRefreshing = false;
                failedQueue = [];
                const { logout } = useAuthStore.getState();
                logout();
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then(() => api(originalRequest))
                .catch((error) => Promise.reject(error));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await api.post<Promise<ApiResponse<RefreshTheAccessTokenResBody>>>('/users/refresh-token');

                isRefreshing = false;
                processQueue(null);

                return api(originalRequest);
            }
            catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError);

                const { logout } = useAuthStore.getState();
                logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default api;