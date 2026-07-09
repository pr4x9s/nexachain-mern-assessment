import type { ApiResponse, DashboardStats, DirectReferralUser, ReferralIncomeItem, ReferralNode } from '../types/types.ts'
import api from './api.ts'



export const dashboardService = {
    getStats: async (): Promise<ApiResponse<DashboardStats>> => {
        const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
        return response.data;
    },

    getDirectReferrals: async (): Promise<ApiResponse<DirectReferralUser[]>> => {
        const response = await api.get<ApiResponse<DirectReferralUser[]>>('/referrals/direct-refs');
        return response.data;
    },

    getCompleteTree: async (): Promise<ApiResponse<ReferralNode[]>> => {
        const response = await api.get<ApiResponse<ReferralNode[]>>('/referrals/comp-ref-tree');
        return response.data;
    },

    getReferralIncomeLogs: async (): Promise<ApiResponse<ReferralIncomeItem[]>> => {
        const response = await api.get<ApiResponse<ReferralIncomeItem[]>>('/referrals/get-referral-income-history');
        return response.data;
    },
};