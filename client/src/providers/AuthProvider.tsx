import { useEffect, type ReactNode } from 'react'
import { useAuthStore } from '../store/authStore.ts'
import { useQuery } from '@tanstack/react-query'
import api from '../api/api.ts'
import { Commet } from 'react-loading-indicators'
import type { ApiResponse, RefreshTheAccessTokenResBody } from '../types/types.ts'



interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {

    const setAuth = useAuthStore((state) => state.setAuth);
    const setInitialized = useAuthStore((state) => state.setInitialized);
    const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const { data, isSuccess, isError, isLoading } = useQuery({
        queryKey: ['sessionHandshake'],
        queryFn: async (): Promise<ApiResponse<RefreshTheAccessTokenResBody>> => {
            const response = await api.post<Promise<ApiResponse<RefreshTheAccessTokenResBody>>>('/users/refresh-token');
            return response.data;
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !isAuthenticated,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (isAuthenticated) {
            setInitialized();
            return;
        }

        if (isSuccess) {
            if (data?.data?.user) {
                setAuth(data.data.user);
            }
            else {
                useAuthStore.setState({ 
                    isAuthenticated: true, 
                    isAuthInitialized: true 
                });
            }
        } 
        else if (isError) {
            setInitialized();
        }
    }, [isSuccess, isError, isAuthenticated, data, setAuth, setInitialized]);

    if (!isAuthInitialized || isLoading) {
        return (
            <div className='flex items-center justify-center h-screen bg-white dark:bg-zinc-950 transition-colors duration-300'>
                <Commet color={['#6004a7', '#7d05d9', '#9717fa', '#ad49fb']} />
            </div>
        );
    }

    return <>{children}</>;
};