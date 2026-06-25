"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuotation = exports.updateQuotation = exports.getQuotationById = exports.getQuotations = exports.createQuotation = void 0;
const prisma_1 = require("../../lib/prisma");
const createQuotation = async (organizationId, data) => {
    const amount = data.items?.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0) || 0;
    const vatAmount = 0;
    const totalAmount = amount + vatAmount;
    const quotationNumber = `QT-${Date.now()}`;
    return prisma_1.prisma.quotation.create({
        data: {
            customerId: data.customerId || undefined,
            issueDate: data.issueDate,
            validUntil: data.validUntil,
            amount,
            vatAmount,
            totalAmount,
            quotationNumber,
            organizationId,
            items: {
                create: data.items,
            },
        },
        include: {
            items: true,
            customer: true,
        },
    });
};
exports.createQuotation = createQuotation;
const getQuotations = async (organizationId) => {
    return prisma_1.prisma.quotation.findMany({
        where: { organizationId },
        include: {
            customer: true,
        },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getQuotations = getQuotations;
const getQuotationById = async (organizationId, id) => {
    return prisma_1.prisma.quotation.findFirst({
        where: { id, organizationId },
        include: {
            items: {
                include: { product: true }
            },
            customer: true,
        },
    });
};
exports.getQuotationById = getQuotationById;
const updateQuotation = async (organizationId, id, data) => {
    // Simple update for now; a real update would need to handle items properly
    return prisma_1.prisma.quotation.update({
        where: { id },
        data,
        include: {
            items: true,
            customer: true,
        },
    });
};
exports.updateQuotation = updateQuotation;
const deleteQuotation = async (organizationId, id) => {
    return prisma_1.prisma.quotation.delete({
        where: { id },
    });
};
exports.deleteQuotation = deleteQuotation;
