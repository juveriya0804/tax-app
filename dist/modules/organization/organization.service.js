"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const prisma_1 = require("../../lib/prisma");
class OrganizationService {
    async getOrganization(organizationId) {
        return prisma_1.prisma.organization.findUnique({
            where: { id: organizationId },
            select: {
                id: true,
                companyName: true,
                trn: true,
                jurisdiction: true,
                vatPercentage: true,
                createdAt: true,
            }
        });
    }
    async updateOrganization(organizationId, data) {
        return prisma_1.prisma.organization.update({
            where: { id: organizationId },
            data,
        });
    }
}
exports.OrganizationService = OrganizationService;
