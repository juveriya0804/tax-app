import { Request, Response, NextFunction } from 'express';
import { WhatsAppService } from './whatsapp.service';

export class WhatsAppController {
  private whatsappService = new WhatsAppService();

  sendReminder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invoiceId } = req.body;
      const organizationId = req.user!.organizationId;

      const result = await this.whatsappService.sendInvoiceReminder(invoiceId, organizationId);

      res.status(200).json({
        message: 'Reminder process started',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  webhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { MessageSid, MessageStatus } = req.body;
      
      if (!MessageSid || !MessageStatus) {
         res.status(400).json({ message: 'Missing required webhook payload' });
         return;
      }

      const updatedLog = await this.whatsappService.handleWebhookUpdate(MessageSid, MessageStatus);

      res.status(200).json({ message: 'Webhook received', data: updatedLog });
    } catch (error) {
      next(error);
    }
  };
}
