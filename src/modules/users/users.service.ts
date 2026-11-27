import { pool } from '../../db';
import type { IUpdateUserPayload, IUser } from './users.interface';
import bcrypt from 'bcryptjs';
import { userRepository } from './users.repository';
import AppError from '../../utils/AppError';

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, role, status } = payload;

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw new AppError(409, 'Email already registered!!!!!!!!!!!');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    return await userRepository.createUser(name, email, hashPassword, role, status);
};

const getAllUsersFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM users;
    `);

    return result;
};

const getSingleUserFromDB = async (id: string) => {
    const result = await pool.query(
        `
            SELECT * FROM users WHERE id = $1;
        `,
        [id],
    );

    return result;
};

const updateUserFromDB = async (payload: IUpdateUserPayload, id: string) => {
    const { name, email, password, role, status } = payload;

    const result = await pool.query(
        `
            UPDATE users SET

            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            role = COALESCE($4, role),
            status = COALESCE($5, status),

            updated_at = NOW()

            WHERE id = $6 RETURNING *
        `,
        [name ?? null, email ?? null, password ?? null, role ?? null, status ?? null, id],
    );

    delete result.rows[0].password;
    return result;
};

const userDeleteFromDB = async (id: string) => {
    const result = await pool.query(
        `
            DELETE FROM users WHERE id = $1 
        `,
        [id],
    );

    return result;
};

export const usersService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    userDeleteFromDB,
};
