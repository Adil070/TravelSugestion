/**
 * User Routes
 */
import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();
const controller = new UserController();

router.use(authMiddleware); // All user routes require authentication

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
