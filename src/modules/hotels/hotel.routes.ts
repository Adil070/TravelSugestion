/**
 * Hotel Routes
 */
import { Router } from 'express';
import { HotelController } from './hotel.controller';
import { authMiddleware } from '../../shared/middleware/auth.middleware';

const router = Router();
const controller = new HotelController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

export default router;
