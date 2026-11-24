import { pool } from '../../db';
import type { IUser } from './users.interface';
import bcrypt from 'bcryptjs';

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, role } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `
            INSERT INTO users (name, email, password, role) VALUES 
            ($1, $2, $3, COALESCE($4, 'user')) RETURNING *
        `,
        [name, email, hashPassword, role],
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

export const usersService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
};
