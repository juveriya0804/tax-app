"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const prisma_1 = require("../../lib/prisma");
class InventoryService {
    async getProducts(organizationId) {
        return prisma_1.prisma.product.findMany({
            where: { organizationId },
            orderBy: { name: 'asc' }
        });
    }
    async createProduct(organizationId, data) {
        return prisma_1.prisma.product.create({
            data: {
                organizationId,
                name: data.name,
                sku: data.sku,
                price: data.price,
                stockQuantity: data.stockQuantity
            }
        });
    }
    async updateStock(organizationId, productId, stockQuantity) {
        return prisma_1.prisma.product.updateMany({
            where: { id: productId, organizationId },
            data: { stockQuantity }
        });
    }
}
exports.InventoryService = InventoryService;
