import { prisma } from '../../lib/prisma';

export const createCreditNote = async (organizationId: string, data: any) => {
  const { customerId, items, ...rest } = data;
  
  // Basic credit note number generation if not provided
  const creditNoteNumber = rest.creditNoteNumber || `CN-${Date.now().toString().slice(-6)}`;

  // Calculate totals
  const amount = items.reduce((acc: number, item: any) => acc + (Number(item.quantity) * Number(item.unitPrice)), 0);
  const vatAmount = amount * 0.05; // Dummy 5% VAT or use standard
  const totalAmount = amount + vatAmount;

  return prisma.creditNote.create({
    data: {
      ...rest,
      creditNoteNumber,
      amount,
      vatAmount,
      totalAmount,
      organizationId,
      customerId,
      items: {
        create: items?.map((item: any) => ({
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

export const getCreditNotes = async (organizationId: string) => {
  return prisma.creditNote.findMany({
    where: { organizationId },
    include: {
      customer: true,
      items: true
    },
    orderBy: { createdAt: 'desc' }
  });
};
