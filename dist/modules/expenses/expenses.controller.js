"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesController = void 0;
const expenses_service_1 = require("./expenses.service");
class ExpensesController {
    constructor() {
        this.expensesService = new expenses_service_1.ExpensesService();
        this.getExpenses = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const expenses = await this.expensesService.getExpenses(organizationId);
                res.status(200).json({ data: expenses });
            }
            catch (error) {
                next(error);
            }
        };
        this.createExpense = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const { amount, description, category, date } = req.body;
                const expense = await this.expensesService.createExpense(organizationId, {
                    amount, description, category, date
                });
                res.status(201).json({ data: expense, message: 'Expense created successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.ExpensesController = ExpensesController;
