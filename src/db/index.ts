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
                slug VARCHAR(40) NOT NUll,
                description VARCHAR(255),
                status BOOLEAN DEFAULT false,

                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log('Database connected!!');
    } catch (error) {
        console.log(error);
    }
};
