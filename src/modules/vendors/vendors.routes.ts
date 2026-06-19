import { Router } from 'express';
import * as vendorsController from './vendors.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', vendorsController.getVendors);
router.post('/', vendorsController.createVendor);
router.get('/:id', vendorsController.getVendorById);
router.put('/:id', vendorsController.updateVendor);
router.delete('/:id', vendorsController.deleteVendor);

export default router;
