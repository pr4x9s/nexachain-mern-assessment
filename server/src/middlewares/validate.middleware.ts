import type { Request, Response, NextFunction } from 'express'
import { ZodError, type ZodObject } from 'zod'
import { ApiError } from '../utils/ApiError.ts'



export const validate = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const dataToValidate = req.method === 'GET' ? (req.query || {}) : req.body;
            schema.parse(dataToValidate);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const validationErrors = error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                }));

                return next(new ApiError(400, 'Validation failed', validationErrors));
            }
            next(error);
        }
    };
};