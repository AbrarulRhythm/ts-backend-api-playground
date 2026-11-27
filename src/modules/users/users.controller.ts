import type { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { usersService } from './users.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await usersService.createUserIntoDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User created successfully!!',
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await usersService.getAllUsersFromDB();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User retrived successfully!!',
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

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await usersService.getSingleUserFromDB(id as string);

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'User not found!!',
            });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User retrived successfully!!',
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

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await usersService.updateUserFromDB(req.body, id as string);

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'User not found!!',
            });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User updated successfully!!',
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

const userDelete = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await usersService.userDeleteFromDB(id as string);

        if (result.rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'User not found!!',
            });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User deleted successfully!!',
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

export const usersController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    userDelete,
};
