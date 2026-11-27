import { Router } from 'express';
import { usersController } from './users.controller';
import validateRequest from '../../middleware/validate.middleware';
import { createUserValidationSchema } from './users.validation';

const router = Router();

router.post('/', validateRequest(createUserValidationSchema), usersController.createUser);
router.get('/', usersController.getAllUser);
router.get('/:id', usersController.getSingleUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.userDelete);

export const userRoute = router;
