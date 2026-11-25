import { pool } from '../../db';
import type { IUpdateUserPayload, IUser } from './users.interface';
import bcrypt from 'bcryptjs';

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, role, status } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
            INSERT INTO users (name, email, password, role, status) VALUES 
            ($1, $2, $3, COALESCE($4, 'user'), COALESCE($5, true)) RETURNING *
        `,
        [name, email, hashPassword, role, status],
    );

    delete result.rows[0].password;
    return result;
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
