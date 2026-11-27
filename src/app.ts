import express, { type Application, type Request, type Response } from 'express';
import { categoriesRoute } from './modules/categories/categories.route';
import { authRoute } from './modules/auth/auth.route';
import { userRoute } from './modules/users/users.route';
import globalErrorHandler from './middleware/error.middleware';
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     console.log('Time:', Date.now());
//     next();
// });

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'This is root route',
        author: 'Abrarul Rhythm',
    });
});

app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

app.use(globalErrorHandler);

export default app;
