import type { ApiResponse, GetUserInvestmentsResBody, Investment, RoiHistoryItem } from '../types/types.ts'
import type { CreateInvestmentData } from '../validators/investment.validator.ts'
import api from './api.ts'



export const investmentService = {
    createInvestment: async (data: CreateInvestmentData): Promise<ApiResponse<Investment>> => {
        const response = await api.post<ApiResponse<Investment>>('/investments/create-investment', data);
        return response.data;
    },

    getMyInvestments: async (status?: Investment['investmentStatus']): Promise<ApiResponse<GetUserInvestmentsResBody>> => {
        const response = await api.get<ApiResponse<GetUserInvestmentsResBody>>('/investments/get-my-investments', {
            params: status ? { investmentStatus: status } : undefined,
        });
        return response.data;
    },

    getRoiHistoryLogs: async (): Promise<ApiResponse<RoiHistoryItem[]>> => {
        const response = await api.get<ApiResponse<RoiHistoryItem[]>>('/investments/get-roi-history');
        return response.data;
    },
};