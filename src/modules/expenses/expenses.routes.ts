import { Router } from 'express';
import { ExpensesController } from './expenses.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const expensesController = new ExpensesController();

router.use(authMiddleware);

router.get('/', expensesController.getExpenses);
router.post('/', expensesController.createExpense);

export default router;
