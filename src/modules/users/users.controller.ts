import type { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { usersService } from './users.service';

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await usersService.createUserIntoDB(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User created successfully!!',
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
};
