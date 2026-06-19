import { Request, Response, NextFunction } from 'express';
import { AccountingService } from './accounting.service';

export class AccountingController {
  private accountingService = new AccountingService();

  getLedger = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const ledger = await this.accountingService.getLedger(organizationId);
      res.status(200).json({ data: ledger });
    } catch (error) {
      next(error);
    }
  };
}
