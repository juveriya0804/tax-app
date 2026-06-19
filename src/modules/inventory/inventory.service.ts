import { prisma } from '../../lib/prisma';

export class InventoryService {
  async getProducts(organizationId: string) {
    return prisma.product.findMany({
      where: { organizationId },
      orderBy: { name: 'asc' }
    });
  }

  async createProduct(organizationId: string, data: { name: string; sku: string; price: number; stockQuantity: number }) {
    return prisma.product.create({
      data: {
        organizationId,
        name: data.name,
        sku: data.sku,
        price: data.price,
        stockQuantity: data.stockQuantity
      }
    });
  }

  async updateStock(organizationId: string, productId: string, stockQuantity: number) {
    return prisma.product.updateMany({
      where: { id: productId, organizationId },
      data: { stockQuantity }
    });
  }
}
