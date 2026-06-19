import { Router } from 'express';
import { ReportsController } from './reports.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const controller = new ReportsController();

router.get('/dashboard-stats', authMiddleware, controller.getDashboardStats.bind(controller));
router.get('/revenue-trends', authMiddleware, controller.getRevenueTrends.bind(controller));
router.get('/vat-breakdown', authMiddleware, controller.getVatBreakdown.bind(controller));
router.get('/customer-growth', authMiddleware, controller.getCustomerGrowth.bind(controller));

export default router;
