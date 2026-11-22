import express, { type Application, type Request, type Response } from 'express';
import { pool } from './db';
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

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

export default app;
