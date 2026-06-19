import { Router } from 'express';
import { BillingController } from './billing.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const billingController = new BillingController();

// Apply auth middleware to all billing routes to extract organizationId
router.use(authMiddleware);

// Customer routes
router.post('/customers', billingController.createCustomer);
router.get('/customers', billingController.getCustomers);
router.put('/customers/:id', billingController.updateCustomer);

// Invoice routes
router.post('/invoices', billingController.createInvoice);
router.get('/invoices', billingController.getInvoices);

export default router;
