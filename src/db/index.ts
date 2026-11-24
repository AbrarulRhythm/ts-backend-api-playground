import { Pool } from 'pg';
import config from '../config';

export const pool = new Pool({
    connectionString: config.connection_string,
});

export const intiDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories(
                id SERIAL PRIMARY KEY,
                name VARCHAR(20) NOT NULL,
                slug VARCHAR(40) UNIQUE NOT NUll,
                description VARCHAR(255),
                status BOOLEAN DEFAULT false,

                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(40) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                status BOOLEAN DEFAULT true,

                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log('Database connected!!');
    } catch (error) {
        console.log(error);
    }
};
