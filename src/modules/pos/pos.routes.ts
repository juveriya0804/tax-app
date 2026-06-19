import { Router } from 'express';
import { PosController } from './pos.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new PosController();

router.use(authMiddleware);

router.post('/checkout', controller.checkout.bind(controller));

export default router;
