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

// ---- Get All Categories ----
const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await categoriesService.getAllCategoriesFromDB();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Categories retrived successfully!!',
            data: result.rows,
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

// ---- Get Single Category ----
const getSingleCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await categoriesService.getSingleCategoryFronDB(id as string);

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Category not found!!',
            });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category retrived successfully!!',
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

// ---- Update Category ----
const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await categoriesService.updateCategoryFromDB(req.body, id as string);

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Category not found!!',
            });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category updated successfully!!',
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

// ---- Delete Category ----
const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await categoriesService.deleteCategoryFromDB(id as string);

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'Category not found!!',
            });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Category deleted successfully!!',
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
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
