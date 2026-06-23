import z from 'zod'



export const createInvestmentSchema = z.object({
    investmentAmount: z
        .number({ error: 'Investment amount is required' })
        .positive({ error: 'Investment amount must be greater than 0' }),
    planDetails: z
        .string({ error: 'Plan details are required' })
        .trim()
        .min(5, 'Plan details must be atleast 5 characters long')
        .max(700, 'Plan details must not exceed 700 characters')
});

export type CreateInvestmentReqBody = z.infer<typeof createInvestmentSchema>;



export const getUserInvestmentSchema = z.object({
    investmentStatus: z
        .enum(['Active', 'Completed', 'Cancelled'], {
            error: () => ({ message: "Status must be either 'Active', 'Completed' or 'Cancelled'" })
        })
        .optional()
});

export type GetUserInvestmentsQuery = z.infer<typeof getUserInvestmentSchema>;