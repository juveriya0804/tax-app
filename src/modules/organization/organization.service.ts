import { prisma } from '../../lib/prisma';
import { Jurisdiction } from '@prisma/client';

export class OrganizationService {
  async getOrganization(organizationId: string) {
    return prisma.organization.findUnique({
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

  async updateOrganization(organizationId: string, data: { companyName?: string, trn?: string, jurisdiction?: Jurisdiction, vatPercentage?: number }) {
    return prisma.organization.update({
      where: { id: organizationId },
      data,
    });
  }
}
