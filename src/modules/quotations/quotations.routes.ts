import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import * as quotationsController from './quotations.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', quotationsController.createQuotation);
router.get('/', quotationsController.getQuotations);
router.get('/:id', quotationsController.getQuotationById);
router.put('/:id', quotationsController.updateQuotation);
router.delete('/:id', quotationsController.deleteQuotation);

export default router;
