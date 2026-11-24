import { pool } from '../../db';
import type { IUser } from './users.interface';

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, role } = payload;

    const result = await pool.query(
        `
            INSERT INTO users (name, email, password, role) VALUES 
            ($1, $2, $3, COALESCE($4, 'user')) RETURNING *
        `,
        [name, email, password, role],
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
