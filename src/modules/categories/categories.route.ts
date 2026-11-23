import { Router } from 'express';
import { categoriesController } from './categories.controller';

const router = Router();

router.post('/', categoriesController.createCategory);
router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getSingleCategory);

export const categoriesRoute = router;
