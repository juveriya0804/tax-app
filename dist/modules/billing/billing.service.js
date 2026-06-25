"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const prisma_1 = require("../../lib/prisma");
const client_1 = require("@prisma/client");
class BillingService {
    async createCustomer(data) {
        return prisma_1.prisma.customer.create({
            data,
        });
    }
    async getCustomersByOrganization(organizationId) {
        return prisma_1.prisma.customer.findMany({
            where: { organizationId },
            include: {
                _count: {
                    select: { invoices: true }
                }
            }
        });
    }
    async updateCustomer(id, organizationId, data) {
        return prisma_1.prisma.customer.updateMany({
            where: { id, organizationId },
            data,
        });
    }
    async createInvoice(data) {
        // Convert to Prisma.Decimal
        const amountDec = new client_1.Prisma.Decimal(data.amount);
        const vatAmountDec = new client_1.Prisma.Decimal(data.vatAmount);
        const totalAmount = amountDec.add(vatAmountDec);
        return prisma_1.prisma.invoice.create({
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
    async getInvoicesByOrganization(organizationId) {
        return prisma_1.prisma.invoice.findMany({
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
exports.BillingService = BillingService;
