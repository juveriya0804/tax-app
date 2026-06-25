"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmService = void 0;
const prisma_1 = require("../../lib/prisma");
class CrmService {
    async getLeads(organizationId) {
        return prisma_1.prisma.lead.findMany({
            where: { organizationId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createLead(organizationId, data) {
        return prisma_1.prisma.lead.create({
            data: {
                organizationId,
                name: data.name,
                email: data.email,
                phone: data.phone,
                status: data.status || 'NEW',
            },
        });
    }
    async updateLeadStatus(organizationId, leadId, status) {
        return prisma_1.prisma.lead.updateMany({
            where: { id: leadId, organizationId },
            data: { status },
        });
    }
}
exports.CrmService = CrmService;
