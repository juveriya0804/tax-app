import { Request, Response, NextFunction } from 'express';
import { ExpensesService } from './expenses.service';

export class ExpensesController {
  private expensesService = new ExpensesService();

  getExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const expenses = await this.expensesService.getExpenses(organizationId);
      res.status(200).json({ data: expenses });
    } catch (error) {
      next(error);
    }
  };

  createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const { amount, description, category, date } = req.body;
      const expense = await this.expensesService.createExpense(organizationId, {
        amount, description, category, date
      });
      res.status(201).json({ data: expense, message: 'Expense created successfully' });
    } catch (error) {
      next(error);
    }
  };
}
