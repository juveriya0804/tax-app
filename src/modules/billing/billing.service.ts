import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export class BillingService {
  async createCustomer(data: { name: string; phone: string; email?: string; organizationId: string }) {
    return prisma.customer.create({
      data,
    });
  }

  async getCustomersByOrganization(organizationId: string) {
    return prisma.customer.findMany({
      where: { organizationId },
      include: {
        _count: {
          select: { invoices: true }
        }
      }
    });
  }

  async updateCustomer(id: string, organizationId: string, data: { name: string; phone: string; email?: string }) {
    return prisma.customer.updateMany({
      where: { id, organizationId },
      data,
    });
  }

  async createInvoice(data: {
    invoiceNumber: string;
    amount: number | string;
    vatAmount: number | string;
    dueDate: Date;
    customerId: string;
    organizationId: string;
  }) {
    // Convert to Prisma.Decimal
    const amountDec = new Prisma.Decimal(data.amount);
    const vatAmountDec = new Prisma.Decimal(data.vatAmount);
    const totalAmount = amountDec.add(vatAmountDec);

    return prisma.invoice.create({
      data: {
        invoiceNumber: data.invoiceNumber,
        amount: amountDec,
        vatAmount: vatAmountDec,
        totalAmount,
        dueDate: data.dueDate,
        status: 'UNPAID', // Default status from enum
        customerId: data.customerId,
        organizationId: data.organizationId,
      },
    });
  }

  async getInvoicesByOrganization(organizationId: string) {
    return prisma.invoice.findMany({
      where: { organizationId },
      include: {
        customer: true,
      },
      orderBy: {
        dueDate: 'asc',
      }
    });
  }
}
