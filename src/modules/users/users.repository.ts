import { pool } from '../../db';

const findUserByEmail = async (email: string) => {
    const result = await pool.query(
        `
            SELECT * FROM users WHERE email = $1
        `,
        [email],
    );

    return result.rows[0] ?? null;
};

const createUser = async (name: string, email: string, hashPassword: string, role?: string, status?: boolean) => {
    const result = await pool.query(
        `
            INSERT INTO users (name, email, password, role, status) VALUES
            ($1, $2, $3, COALESCE($4, 'user'), COALESCE($5, true)) RETURNING *
        `,
        [name, email, hashPassword, role, status],
    );

    delete result.rows[0].password;
    return result.rows[0];
};

export const userRepository = {
    createUser,
    findUserByEmail,
};
