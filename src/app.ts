import express, { type Application, type Request, type Response } from 'express';
import { pool } from './db';
import { categoriesRoute } from './modules/categories/categories.route';
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

app.use('/api/v1/categories', categoriesRoute);

export default app;
