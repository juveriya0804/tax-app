"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const prisma_1 = require("../../lib/prisma");
class ExpensesService {
    async getExpenses(organizationId) {
        return prisma_1.prisma.expense.findMany({
            where: { organizationId },
            orderBy: { date: 'desc' },
        });
    }
    async createExpense(organizationId, data) {
        return prisma_1.prisma.expense.create({
            data: {
                organizationId,
                amount: data.amount,
                description: data.description,
                category: data.category,
                date: data.date ? new Date(data.date) : undefined,
            },
        });
    }
}
exports.ExpensesService = ExpensesService;
