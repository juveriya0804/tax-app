"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorLead = exports.createVendorLead = exports.getVendorLeads = exports.deleteVendor = exports.updateVendor = exports.createVendor = exports.getVendorById = exports.getVendors = void 0;
const prisma_1 = require("../../lib/prisma");
const getVendors = async (organizationId) => {
    return prisma_1.prisma.vendor.findMany({
        where: { organizationId },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getVendors = getVendors;
const getVendorById = async (organizationId, vendorId) => {
    return prisma_1.prisma.vendor.findFirst({
        where: {
            id: vendorId,
            organizationId,
        },
    });
};
exports.getVendorById = getVendorById;
const createVendor = async (organizationId, data) => {
    return prisma_1.prisma.vendor.create({
        data: {
            ...data,
            organizationId,
        },
    });
};
exports.createVendor = createVendor;
const updateVendor = async (organizationId, vendorId, data) => {
    return prisma_1.prisma.vendor.updateMany({
        where: {
            id: vendorId,
            organizationId,
        },
        data,
    });
};
exports.updateVendor = updateVendor;
const deleteVendor = async (organizationId, vendorId) => {
    return prisma_1.prisma.vendor.deleteMany({
        where: {
            id: vendorId,
            organizationId,
        },
    });
};
exports.deleteVendor = deleteVendor;
const getVendorLeads = async (organizationId) => {
    return prisma_1.prisma.vendorLead.findMany({
        where: { organizationId },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getVendorLeads = getVendorLeads;
const createVendorLead = async (organizationId, data) => {
    return prisma_1.prisma.vendorLead.create({
        data: {
            ...data,
            organizationId,
        },
    });
};
exports.createVendorLead = createVendorLead;
const updateVendorLead = async (organizationId, leadId, data) => {
    return prisma_1.prisma.vendorLead.updateMany({
        where: {
            id: leadId,
            organizationId,
        },
        data,
    });
};
exports.updateVendorLead = updateVendorLead;
