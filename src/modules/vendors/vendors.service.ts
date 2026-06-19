import { prisma } from '../../lib/prisma';

export const getVendors = async (organizationId: string) => {
  return prisma.vendor.findMany({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getVendorById = async (organizationId: string, vendorId: string) => {
  return prisma.vendor.findFirst({
    where: {
      id: vendorId,
      organizationId,
    },
  });
};

export const createVendor = async (organizationId: string, data: any) => {
  return prisma.vendor.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const updateVendor = async (organizationId: string, vendorId: string, data: any) => {
  return prisma.vendor.updateMany({
    where: {
      id: vendorId,
      organizationId,
    },
    data,
  });
};

export const deleteVendor = async (organizationId: string, vendorId: string) => {
  return prisma.vendor.deleteMany({
    where: {
      id: vendorId,
      organizationId,
    },
  });
};
