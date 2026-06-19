import { prisma } from '../../lib/prisma';

export class CrmService {
  async getLeads(organizationId: string) {
    return prisma.lead.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createLead(organizationId: string, data: { name: string; email?: string; phone?: string; status?: string }) {
    return prisma.lead.create({
      data: {
        organizationId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        status: data.status || 'NEW',
      },
    });
  }

  async updateLeadStatus(organizationId: string, leadId: string, status: string) {
    return prisma.lead.updateMany({
      where: { id: leadId, organizationId },
      data: { status },
    });
  }
}
