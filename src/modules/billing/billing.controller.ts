import { Request, Response, NextFunction } from 'express';
import { BillingService } from './billing.service';

export class BillingController {
  private billingService = new BillingService();

  createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, phone, email } = req.body;
      const organizationId = req.user!.organizationId;

      const customer = await this.billingService.createCustomer({
        name,
        phone,
        email,
        organizationId,
      });

      res.status(201).json({ data: customer });
    } catch (error) {
      next(error);
    }
  };

  getCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const customers = await this.billingService.getCustomersByOrganization(organizationId);
      
      res.status(200).json({ data: customers });
    } catch (error) {
      next(error);
    }
  };

  updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, phone, email } = req.body;
      const organizationId = req.user!.organizationId;

      await this.billingService.updateCustomer(id as string, organizationId, {
        name,
        phone,
        email,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  createInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invoiceNumber, amount, vatAmount, dueDate, customerId } = req.body;
      const organizationId = req.user!.organizationId;

      const invoice = await this.billingService.createInvoice({
        invoiceNumber,
        amount,
        vatAmount,
        dueDate: new Date(dueDate),
        customerId,
        organizationId,
      });

      res.status(201).json({ data: invoice });
    } catch (error) {
      next(error);
    }
  };

  getInvoices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organizationId = req.user!.organizationId;
      const invoices = await this.billingService.getInvoicesByOrganization(organizationId);
      
      res.status(200).json({ data: invoices });
    } catch (error) {
      next(error);
    }
  };
}
