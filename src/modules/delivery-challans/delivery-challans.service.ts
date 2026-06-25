import { prisma } from '../../lib/prisma';

export const createChallan = async (organizationId: string, data: any) => {
  const { customerId, items, ...rest } = data;
  
  // Basic challan number generation if not provided
  const challanNumber = rest.challanNumber || `DC-${Date.now().toString().slice(-6)}`;

  return prisma.deliveryChallan.create({
    data: {
      ...rest,
      challanNumber,
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

export const getChallans = async (organizationId: string) => {
  return prisma.deliveryChallan.findMany({
    where: { organizationId },
    include: {
      customer: true,
      items: true
    },
    orderBy: { createdAt: 'desc' }
  });
};
