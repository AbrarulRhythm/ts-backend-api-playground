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

// ---- Get Single Categories -----
const getSingleCategoryFronDB = async (id: string) => {
    const result = await pool.query(
        `
            SELECT * FROM categories WHERE id = $1
        `,
        [id],
    );

    return result;
};

// ---- Update Categories -----
const updateCategoryFromDB = async (payload: any, id: string) => {
    const { name, slug, description, status } = payload;

    const result = await pool.query(
        `
            UPDATE categories SET 
            name = COALESCE($1, name),
            slug = COALESCE($2, slug),
            description = COALESCE($3, description),
            status = COALESCE($4, status),
            updated_at = NOW()
            WHERE id = $5 RETURNING *
        `,
        [name ?? null, slug ?? null, description ?? null, status ?? null, id],
    );

    return result;
};

// ---- Delete Categories -----
const deleteCategoryFromDB = async (id: string) => {
    const result = await pool.query(
        `
            DELETE FROM categories WHERE id = $1
        `,
        [id],
    );

    return result;
};

export const categoriesService = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getSingleCategoryFronDB,
    updateCategoryFromDB,
    deleteCategoryFromDB,
};
