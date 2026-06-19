import { Router } from 'express';
import { AccountingController } from './accounting.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

import accountsRoutes from './accounts.routes';

const router = Router();
const accountingController = new AccountingController();

router.use(authMiddleware);

router.use('/accounts', accountsRoutes);

router.get('/ledger', accountingController.getLedger);

export default router;
