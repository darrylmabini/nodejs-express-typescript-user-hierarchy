import { Router } from 'express';
import UsersController from '@controllers/UsersController';

const router = Router();

router.get('/users', UsersController.all);
router.get('/users/:id', UsersController.getUserById);
router.get('/users/:id/subordinates', UsersController.getSubordinates);

export default router;
