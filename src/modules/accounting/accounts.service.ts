import { prisma } from '../../lib/prisma';

export const getAccounts = async (organizationId: string) => {
  return prisma.account.findMany({
    where: { organizationId },
    orderBy: [{ type: 'asc' }, { code: 'asc' }],
    include: {
      parentAccount: { select: { name: true, code: true } }
    }
  });
};

export const getAccountById = async (organizationId: string, accountId: string) => {
  return prisma.account.findFirst({
    where: { id: accountId, organizationId },
    include: {
      parentAccount: { select: { name: true, code: true } }
    }
  });
};

export const createAccount = async (organizationId: string, data: any) => {
  return prisma.account.create({
    data: {
      ...data,
      organizationId,
    },
  });
};

export const updateAccount = async (organizationId: string, accountId: string, data: any) => {
  return prisma.account.updateMany({
    where: { id: accountId, organizationId },
    data,
  });
};

export const deleteAccount = async (organizationId: string, accountId: string) => {
  // Check if it has sub-accounts first or if it's used in ledgers
  return prisma.account.deleteMany({
    where: { id: accountId, organizationId },
  });
};
