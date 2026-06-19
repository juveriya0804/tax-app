import { Request, Response, NextFunction } from 'express';
import { OrganizationService } from './organization.service';

export class OrganizationController {
  private organizationService = new OrganizationService();

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const profile = await this.organizationService.getOrganization(organizationId);

      if (!profile) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      res.status(200).json({ data: profile });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const { companyName, trn, jurisdiction, vatPercentage } = req.body;

      const updated = await this.organizationService.updateOrganization(organizationId, {
        companyName,
        trn,
        jurisdiction,
        vatPercentage: vatPercentage !== undefined ? Number(vatPercentage) : undefined,
      });

      res.status(200).json({ data: updated, message: 'Organization profile updated successfully' });
    } catch (error) {
      next(error);
    }
  };
}
