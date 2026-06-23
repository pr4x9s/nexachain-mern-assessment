import z from 'zod'



export const registerUserSchema = z.object({
    fullName: z
        .string({ error: 'Full name is required' })
        .trim()
        .min(3, 'Full name must be atleast 3 characters long')
        .max(255, 'Full name must not exceed 255 characters'),
    email: z
        .email({ error: 'Invalid email address format', pattern: z.regexes.rfc5322Email }),
    mobileNumber: z
        .e164({ error: 'Mobile number must be in valid E.164 international format (e.g., +919876543210)' }),
    password: z
        .string({ error: 'Password is required' })
        .min(6, 'Password must be atleast 6 characters long')
        .max(12, 'Password must not exceed 12 characters'),
    referralCodeUsed: z
        .string()
        .trim()
        .optional()
});

export type RegisterReqBody = z.infer<typeof registerUserSchema>;


export const loginUserSchema = registerUserSchema.pick({
    email: true,
    password: true
});

export type LoginReqBody = z.infer<typeof loginUserSchema>;