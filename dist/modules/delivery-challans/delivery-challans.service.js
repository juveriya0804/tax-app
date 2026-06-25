"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallans = exports.createChallan = void 0;
const prisma_1 = require("../../lib/prisma");
const createChallan = async (organizationId, data) => {
    const { customerId, items, ...rest } = data;
    // Basic challan number generation if not provided
    const challanNumber = rest.challanNumber || `DC-${Date.now().toString().slice(-6)}`;
    return prisma_1.prisma.deliveryChallan.create({
        data: {
            ...rest,
            challanNumber,
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
exports.createChallan = createChallan;
const getChallans = async (organizationId) => {
    return prisma_1.prisma.deliveryChallan.findMany({
        where: { organizationId },
        include: {
            customer: true,
            items: true
        },
        orderBy: { createdAt: 'desc' }
    });
};
exports.getChallans = getChallans;
