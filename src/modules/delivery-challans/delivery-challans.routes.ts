import { Router } from 'express';
import * as deliveryChallansController from './delivery-challans.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', deliveryChallansController.createChallan);
router.get('/', deliveryChallansController.getChallans);

export default router;
