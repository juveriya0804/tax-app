import { prisma } from '../../lib/prisma';

export class ExpensesService {
  async getExpenses(organizationId: string) {
    return prisma.expense.findMany({
      where: { organizationId },
      orderBy: { date: 'desc' },
    });
  }

  async createExpense(organizationId: string, data: { amount: number; description: string; category?: string; date?: Date }) {
    return prisma.expense.create({
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
