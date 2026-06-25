import { prisma } from '../../lib/prisma';

export const createQuotation = async (organizationId: string, data: any) => {
  const amount = data.items?.reduce((acc: number, item: any) => acc + (item.quantity * item.unitPrice), 0) || 0;
  const vatAmount = 0;
  const totalAmount = amount + vatAmount;
  const quotationNumber = `QT-${Date.now()}`;

  return prisma.quotation.create({
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

export const getQuotations = async (organizationId: string) => {
  return prisma.quotation.findMany({
    where: { organizationId },
    include: {
      customer: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getQuotationById = async (organizationId: string, id: string) => {
  return prisma.quotation.findFirst({
    where: { id, organizationId },
    include: {
      items: {
        include: { product: true }
      },
      customer: true,
    },
  });
};

export const updateQuotation = async (organizationId: string, id: string, data: any) => {
  // Simple update for now; a real update would need to handle items properly
  return prisma.quotation.update({
    where: { id },
    data,
    include: {
      items: true,
      customer: true,
    },
  });
};

export const deleteQuotation = async (organizationId: string, id: string) => {
  return prisma.quotation.delete({
    where: { id },
  });
};
