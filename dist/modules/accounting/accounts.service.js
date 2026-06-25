"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAccount = exports.createAccount = exports.getAccountById = exports.getAccounts = void 0;
const prisma_1 = require("../../lib/prisma");
const getAccounts = async (organizationId) => {
    return prisma_1.prisma.account.findMany({
        where: { organizationId },
        orderBy: [{ type: 'asc' }, { code: 'asc' }],
        include: {
            parentAccount: { select: { name: true, code: true } }
        }
    });
};
exports.getAccounts = getAccounts;
const getAccountById = async (organizationId, accountId) => {
    return prisma_1.prisma.account.findFirst({
        where: { id: accountId, organizationId },
        include: {
            parentAccount: { select: { name: true, code: true } }
        }
    });
};
exports.getAccountById = getAccountById;
const createAccount = async (organizationId, data) => {
    return prisma_1.prisma.account.create({
        data: {
            ...data,
            organizationId,
        },
    });
};
exports.createAccount = createAccount;
const updateAccount = async (organizationId, accountId, data) => {
    return prisma_1.prisma.account.updateMany({
        where: { id: accountId, organizationId },
        data,
    });
};
exports.updateAccount = updateAccount;
const deleteAccount = async (organizationId, accountId) => {
    // Check if it has sub-accounts first or if it's used in ledgers
    return prisma_1.prisma.account.deleteMany({
        where: { id: accountId, organizationId },
    });
};
exports.deleteAccount = deleteAccount;
