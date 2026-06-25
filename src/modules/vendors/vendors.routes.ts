import { Router } from 'express';
import * as vendorsController from './vendors.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/vendor-leads', vendorsController.getVendorLeads);
router.post('/vendor-leads', vendorsController.createVendorLead);
router.put('/vendor-leads/:id', vendorsController.updateVendorLead);

router.get('/', vendorsController.getVendors);
router.post('/', vendorsController.createVendor);
router.get('/:id', vendorsController.getVendorById);
router.put('/:id', vendorsController.updateVendor);
router.delete('/:id', vendorsController.deleteVendor);

export default router;
