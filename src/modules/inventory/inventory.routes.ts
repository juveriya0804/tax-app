import { Router } from 'express';
import { InventoryController } from './inventory.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new InventoryController();

router.use(authMiddleware);

router.get('/', controller.getProducts.bind(controller));
router.post('/', controller.createProduct.bind(controller));
router.put('/:id/stock', controller.updateStock.bind(controller));

export default router;
