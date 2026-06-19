import { Request, Response, NextFunction } from 'express';
import { CrmService } from './crm.service';

export class CrmController {
  private crmService = new CrmService();

  getLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const leads = await this.crmService.getLeads(organizationId);
      res.status(200).json({ data: leads });
    } catch (error) {
      next(error);
    }
  };

  createLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const { name, email, phone, status } = req.body;
      const lead = await this.crmService.createLead(organizationId, {
        name, email, phone, status
      });
      res.status(201).json({ data: lead, message: 'Lead created successfully' });
    } catch (error) {
      next(error);
    }
  };

  updateLeadStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const { leadId } = req.params;
      const { status } = req.body;
      await this.crmService.updateLeadStatus(organizationId, leadId as string, status);
      res.status(200).json({ message: 'Lead status updated successfully' });
    } catch (error) {
      next(error);
    }
  };
}
