import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export class ReportsService {
  async getDashboardStats(organizationId: string) {
    const [customersCount, invoices] = await Promise.all([
      prisma.customer.count({
        where: { organizationId }
      }),
      prisma.invoice.findMany({
        where: { organizationId },
        select: {
          status: true,
          totalAmount: true,
          vatAmount: true,
        }
      })
    ]);

    let totalRevenue = new Prisma.Decimal(0);
    let totalOutstanding = new Prisma.Decimal(0);
    let totalVatCollected = new Prisma.Decimal(0);

    for (const invoice of invoices) {
      if (invoice.status === 'PAID') {
        totalRevenue = totalRevenue.add(invoice.totalAmount);
        totalVatCollected = totalVatCollected.add(invoice.vatAmount);
      } else if (invoice.status === 'UNPAID') {
        totalOutstanding = totalOutstanding.add(invoice.totalAmount);
      }
    }

    return {
      customersCount,
      totalRevenue: totalRevenue.toNumber(),
      totalOutstanding: totalOutstanding.toNumber(),
      totalVatCollected: totalVatCollected.toNumber(),
    };
  }

  async getRevenueTrends(organizationId: string) {
    const invoices = await prisma.invoice.findMany({
      where: { organizationId, status: 'PAID' },
      select: {
        totalAmount: true,
        dueDate: true
      },
      orderBy: { dueDate: 'asc' }
    });

    const monthlyData: Record<string, number> = {};

    for (const inv of invoices) {
      // Group by YYYY-MM
      const month = inv.dueDate.toISOString().slice(0, 7); 
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += inv.totalAmount.toNumber();
    }

    const result = Object.keys(monthlyData).map(month => ({
      name: month,
      revenue: monthlyData[month]
    }));

    return result;
  }

  async getVatBreakdown(organizationId: string) {
    const invoices = await prisma.invoice.findMany({
      where: { organizationId },
      select: { status: true, vatAmount: true }
    });

    let collected = new Prisma.Decimal(0);
    let outstanding = new Prisma.Decimal(0);

    for (const inv of invoices) {
      if (inv.status === 'PAID') {
        collected = collected.add(inv.vatAmount);
      } else if (inv.status === 'UNPAID') {
        outstanding = outstanding.add(inv.vatAmount);
      }
    }

    return [
      { name: 'Collected VAT', value: collected.toNumber() },
      { name: 'Outstanding VAT', value: outstanding.toNumber() }
    ];
  }

  async getCustomerGrowth(organizationId: string) {
    const customers = await prisma.customer.findMany({
      where: { organizationId },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' }
    });

    const monthlyData: Record<string, number> = {};

    for (const cust of customers) {
      const month = cust.createdAt.toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month]++;
    }

    const result = Object.keys(monthlyData).map(month => ({
      month,
      customers: monthlyData[month]
    }));

    return result;
  }
}

