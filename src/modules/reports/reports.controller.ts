import { Request, Response } from 'express';
import { ReportsService } from './reports.service';

const reportsService = new ReportsService();

export class ReportsController {
  async getDashboardStats(req: Request, res: Response) {
    try {
      const organizationId = req.user?.organizationId;
      if (!organizationId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const stats = await reportsService.getDashboardStats(organizationId);
      res.status(200).json({ status: 'success', data: stats });
    } catch (error: any) {
      console.error('[ReportsController] getDashboardStats error:', error);
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  async getRevenueTrends(req: Request, res: Response) {
    try {
      const organizationId = req.user?.organizationId;
      if (!organizationId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const trends = await reportsService.getRevenueTrends(organizationId);
      res.status(200).json({ status: 'success', data: trends });
    } catch (error: any) {
      console.error('[ReportsController] getRevenueTrends error:', error);
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  async getVatBreakdown(req: Request, res: Response) {
    try {
      const organizationId = req.user?.organizationId;
      if (!organizationId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const breakdown = await reportsService.getVatBreakdown(organizationId);
      res.status(200).json({ status: 'success', data: breakdown });
    } catch (error: any) {
      console.error('[ReportsController] getVatBreakdown error:', error);
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  async getCustomerGrowth(req: Request, res: Response) {
    try {
      const organizationId = req.user?.organizationId;
      if (!organizationId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const growth = await reportsService.getCustomerGrowth(organizationId);
      res.status(200).json({ status: 'success', data: growth });
    } catch (error: any) {
      console.error('[ReportsController] getCustomerGrowth error:', error);
      res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }
}

