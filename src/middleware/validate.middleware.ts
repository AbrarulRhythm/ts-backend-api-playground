import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodType } from 'zod';
import AppError from '../utils/AppError';

const validateRequest = (schema: ZodType<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed: any = await schema.parseAsync({
                body: req.body ?? {},
                query: req.query,
                params: req.params,
            });

            if (parsed.body) {
                req.body = parsed.body;
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((issue) => ({
                    field: issue.path.slice(1).join('.') || issue.path.join('.'),
                    message: issue.message,
                }));

                return next(new AppError(400, 'Validation Error', errors));
            }

            next(error);
        }
    };
};

export default validateRequest;
