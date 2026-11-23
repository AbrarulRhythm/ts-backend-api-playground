import { pool } from '../../db';
import type { ICategories } from './categories.interface';

// ---- Create Category -----
const createCategoryIntoDB = async (payload: ICategories) => {
    const { name, slug, description } = payload;

    const result = await pool.query(
        `
            INSERT INTO categories (name, slug, description) VALUES
            ($1, $2, $3) RETURNING *
        `,
        [name, slug, description],
    );

    return result;
};

// ---- Get All Categories -----
const getAllCategoriesFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM categories
    `);

    return result;
};

export const categoriesService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
};
