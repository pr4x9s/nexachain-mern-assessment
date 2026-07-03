import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ApiErrorResponse, ApiResponse, GetUserInvestmentsResBody, Investment } from '../types/types.ts'
import { investmentService } from '../api/investment.api.ts'
import type { AxiosError } from 'axios'
import type { CreateInvestmentData } from '../validators/investment.validator.ts'
import { toast } from 'sonner'



export const useGetUserInvestments = (status?: Investment['investmentStatus']) => {
    return useQuery<ApiResponse<GetUserInvestmentsResBody>, AxiosError<ApiErrorResponse>>({
        queryKey: ['investments', 'list', status || 'all'],
        queryFn: async () => {
            return await investmentService.getMyInvestments(status)
        },
        staleTime:  30 * 1000,
        refetchOnWindowFocus: false,
    });
};


export const useCreateInvestment = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Investment>, AxiosError<ApiErrorResponse>, CreateInvestmentData>({
        mutationFn: async (data: CreateInvestmentData) => {
            return await investmentService.createInvestment(data);
        },

        onSuccess: (response) => {
            const message = response.message || 'Investment activated successfully!';
            toast(message);

            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard', 'stats'] });
        },

        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data.message || 'Failed to process investment. Please try again';
            toast.error(message);
        },
    });
};