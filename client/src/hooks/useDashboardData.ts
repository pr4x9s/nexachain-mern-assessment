import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../api/dashboard.service.ts'
import type { ApiResponse, DashboardStats, DirectReferralUser, ReferralNode } from '../types/types.ts'



export const useDashboardStats = () => {
    return useQuery<ApiResponse<DashboardStats>, Error>({
        queryKey: ['dashboard', 'stats'],
        queryFn: async () => {
            return await dashboardService.getStats();
        },
        staleTime: 30 * 1000,
        refetchOnWindowFocus: false,
    });
};


export const useDirectReferrals = () => {
    return useQuery<ApiResponse<DirectReferralUser[]>, Error>({
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
    return useQuery<ApiResponse<ReferralNode[]>, Error>({
        queryKey: ['referrals', 'tree'],
        queryFn: async () => {
            return await dashboardService.getCompleteTree();
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};