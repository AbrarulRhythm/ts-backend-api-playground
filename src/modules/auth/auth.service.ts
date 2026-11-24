import bcrypt from 'bcryptjs';
import { pool } from '../../db';
import type { IAuth } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUserIntoDB = async (payload: IAuth) => {
    const { email, password } = payload;

    // Check if the user exist
    const user = await pool.query(
        `
            SELECT * FROM users WHERE email = $1
        `,
        [email],
    );

    if (user.rowCount === 0) {
        throw new Error('Invalid credentials!!');
    }

    // Check if the password match
    const matchPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!matchPassword) {
        throw new Error('Invalid credentials!!');
    }

    // Check the user status
    if (!user.rows[0].status) {
        throw new Error('Access denied!!');
    }

    // If pass all then generate JWT token
    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
        status: user.rows[0].status,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret, { expiresIn: '1d' });

    delete user.rows[0].password;
    return { accessToken, user: user.rows[0] };
};

export const authService = {
    loginUserIntoDB,
};
