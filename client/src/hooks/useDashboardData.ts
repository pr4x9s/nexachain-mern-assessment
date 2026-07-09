import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../api/dashboard.service.ts'
import type { ApiErrorResponse, ApiResponse, DashboardStats, DirectReferralUser, ReferralIncomeItem, ReferralNode } from '../types/types.ts'
import type { AxiosError } from 'axios';



export const useDashboardStats = () => {
    return useQuery<ApiResponse<DashboardStats>, AxiosError<ApiErrorResponse>>({
        queryKey: ['dashboard', 'stats'],
        queryFn: async () => {
            return await dashboardService.getStats();
        },
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
};


export const useDirectReferrals = () => {
    return useQuery<ApiResponse<DirectReferralUser[]>, AxiosError<ApiErrorResponse>>({
        queryKey: ['referrals', 'direct'],
        queryFn: async () => {
            return await dashboardService.getDirectReferrals();
        },
        placeholderData: (previousData) => previousData,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
    });
};


export const useReferralTree = () => {
    return useQuery<ApiResponse<ReferralNode[]>, AxiosError<ApiErrorResponse>>({
        queryKey: ['referrals', 'tree'],
        queryFn: async () => {
            return await dashboardService.getCompleteTree();
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};


export const useGetReferralIncomeHistory = () => {
    return useQuery<ApiResponse<ReferralIncomeItem[]>, AxiosError<ApiErrorResponse>>({
        queryKey: ['referrals', 'income-history'],
        queryFn: async () => {
            return await dashboardService.getReferralIncomeLogs();
        },
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
};