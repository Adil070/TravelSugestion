/**
 * Auth Routes
 * Define authentication endpoints
 */
import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();
const controller = new AuthController();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/profile', authMiddleware, controller.getProfile);

export default router;
