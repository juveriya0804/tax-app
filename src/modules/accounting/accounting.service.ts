import { prisma } from '../../lib/prisma';

export class AccountingService {
  async getLedger(organizationId: string) {
    const invoices = await prisma.invoice.findMany({
      where: { organizationId },
      include: { customer: true },
    });

    const expenses = await prisma.expense.findMany({
      where: { organizationId },
    });

    const ledger = [
      ...invoices.map(inv => ({
        id: inv.id,
        date: inv.dueDate, // or createdAt if added
        type: 'INCOME',
        description: `Invoice ${inv.invoiceNumber} - ${inv.customer?.name || 'Customer'}`,
        amount: Number(inv.totalAmount),
      })),
      ...expenses.map(exp => ({
        id: exp.id,
        date: exp.date,
        type: 'EXPENSE',
        description: exp.description,
        amount: -Number(exp.amount),
      }))
    ];

    // Sort by date ascending
    ledger.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate running balance
    let balance = 0;
    const ledgerWithBalance = ledger.map(entry => {
      balance += entry.amount;
      return { ...entry, balance };
    });

    // Sort by date descending for UI display
    ledgerWithBalance.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return ledgerWithBalance;
  }
}
