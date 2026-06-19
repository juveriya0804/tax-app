import { Request, Response } from 'express';
import { PosService } from './pos.service';

const posService = new PosService();

export class PosController {
  async checkout(req: Request, res: Response) {
    try {
      const organizationId = req.user!.organizationId;
      const { items, customerId } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }

      const invoice = await posService.checkout(organizationId, items, customerId);
      res.json({ success: true, invoice });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
