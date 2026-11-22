import express, { type Application, type Request, type Response } from 'express';
import { Pool } from 'pg';
import config from './config';
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    connectionString: config.connection_string,
});

const intiDB = async () => {
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
intiDB();

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'This is root route',
        author: 'Abrarul Rhythm',
    });
});

app.post('/api/v1/categories', async (req: Request, res: Response) => {
    try {
        const { name, slug, description } = req.body;

        const result = await pool.query(
            `
                INSERT INTO categories (name, slug, description) VALUES
                ($1, $2, $3) RETURNING *
            `,
            [name, slug, description],
        );

        res.status(201).json({
            success: true,
            message: 'Category created successfully!!',
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        });
    }
});

app.listen(config.port, () => {
    console.log(`The Express server is running on the port: ${config.port}`);
});
