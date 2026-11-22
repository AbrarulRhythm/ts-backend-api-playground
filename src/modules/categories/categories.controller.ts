import type { Request, Response } from 'express';
import { categoriesService } from './categories.service';
import sendResponse from '../../utils/sendResponse';

// ---- Categories Create ----
const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.createCategoryIntoDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'Category created successfully!!',
            data: result.rows[0],
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error?.message,
            error: error,
        });
    }
};

export const categoriesController = {
    createCategory,
};
