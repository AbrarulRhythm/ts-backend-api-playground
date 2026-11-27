import type { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            ...(err.errors ? { errors: err.errors } : {}),
        });
    }

    if (err?.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON body',
        });
    }

    if (err?.code === '23505') {
        return res.status(409).json({
            success: false,
            message: 'Email already registered',
        });
    }

    console.error(err);
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

export default globalErrorHandler;
