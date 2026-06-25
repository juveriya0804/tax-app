"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreditNotes = exports.createCreditNote = void 0;
const prisma_1 = require("../../lib/prisma");
const createCreditNote = async (organizationId, data) => {
    const { customerId, items, ...rest } = data;
    // Basic credit note number generation if not provided
    const creditNoteNumber = rest.creditNoteNumber || `CN-${Date.now().toString().slice(-6)}`;
    // Calculate totals
    const amount = items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.unitPrice)), 0);
    const vatAmount = amount * 0.05; // Dummy 5% VAT or use standard
    const totalAmount = amount + vatAmount;
    return prisma_1.prisma.creditNote.create({
        data: {
            ...rest,
            creditNoteNumber,
            amount,
            vatAmount,
            totalAmount,
            organizationId,
            customerId,
            items: {
                create: items?.map((item) => ({
                    productId: item.productId,
                    description: item.description,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice
                })) || []
            }
        },
        include: {
            items: true,
            customer: true
        }
    });
};
exports.createCreditNote = createCreditNote;
const getCreditNotes = async (organizationId) => {
    return prisma_1.prisma.creditNote.findMany({
        where: { organizationId },
        include: {
            customer: true,
            items: true
        },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getCreditNotes = getCreditNotes;
