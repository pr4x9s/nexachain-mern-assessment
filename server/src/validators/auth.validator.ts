import z from 'zod'



export const baseRegisterUserSchema = z.object({
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
        .string()
        .min(6, 'Password must be atleast 6 characters long')
        .max(12, 'Password must not exceed 12 characters')
        .regex(/[A-Z]/, 'Password must contain atleast 1 uppercase letter')
        .regex(/[a-z]/, 'Password must contain atleast 1 lowercase letter')
        .regex(/[0-9]/, 'Password must contain atleast 1 number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain atleast 1 special character'),
    confirmPassword: z
        .string()
        .min(6, 'Please confirm your password'),
    referralCodeUsed: z
        .string()
        .trim()
        .optional()
});

export const registerUserSchema = baseRegisterUserSchema.superRefine(
    ({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword']
            });
        }
    }
);

export type RegisterReqBody = z.infer<typeof registerUserSchema>;


export const loginUserSchema = baseRegisterUserSchema.pick({
    email: true,
    password: true
});

export type LoginReqBody = z.infer<typeof loginUserSchema>;