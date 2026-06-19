import { Router } from 'express';
import * as accountsController from './accounts.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', accountsController.getAccounts);
router.post('/', accountsController.createAccount);
router.get('/:id', accountsController.getAccountById);
router.put('/:id', accountsController.updateAccount);
router.delete('/:id', accountsController.deleteAccount);

export default router;
