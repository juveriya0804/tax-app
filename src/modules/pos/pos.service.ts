import { prisma } from '../../lib/prisma';


export class PosService {
  async checkout(organizationId: string, items: { productId: string; quantity: number }[], customerId?: string) {
    return prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const invoiceItemsData = [];

      for (const item of items) {
        // Fetch product and lock row if necessary, or just read
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product || product.organizationId !== organizationId) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        // Deduct stock
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQuantity: product.stockQuantity - item.quantity }
        });

        const lineTotal = Number(product.price) * item.quantity;
        totalAmount += lineTotal;

        invoiceItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          unitPrice: product.price
        });
      }

      const vatAmount = totalAmount * 0.05; // 5% VAT
      const grandTotal = totalAmount + vatAmount;

      // Create a paid invoice for POS walk-in
      const invoice = await tx.invoice.create({
        data: {
          organizationId,
          invoiceNumber: `POS-${Date.now().toString().slice(-6)}`,
          amount: totalAmount,
          vatAmount,
          totalAmount: grandTotal,
          status: 'PAID',
          dueDate: new Date(), // Immediate
          customerId,
          items: {
            create: invoiceItemsData
          }
        }
      });

      return invoice;
    });
  }
}
