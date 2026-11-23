import { Router } from 'express';
import { categoriesController } from './categories.controller';

const router = Router();

router.post('/', categoriesController.createCategory);
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getSingleCategory);
router.put('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export const categoriesRoute = router;
