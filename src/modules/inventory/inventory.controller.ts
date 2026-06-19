import { Request, Response } from 'express';
import { InventoryService } from './inventory.service';

const inventoryService = new InventoryService();

export class InventoryController {
  async getProducts(req: Request, res: Response) {
    try {
      const organizationId = req.user!.organizationId;
      const products = await inventoryService.getProducts(organizationId);
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const organizationId = req.user!.organizationId;
      const product = await inventoryService.createProduct(organizationId, req.body);
      res.status(201).json(product);
    } catch (error: any) {
      if (error.code === 'P2002' || (error.message && error.message.includes('Unique constraint failed'))) {
        return res.status(400).json({ error: 'A product with this SKU already exists.' });
      }
      res.status(400).json({ error: error.message });
    }
  }

  async updateStock(req: Request, res: Response) {
    try {
      const organizationId = req.user!.organizationId;
      const { id } = req.params;
      const { stockQuantity } = req.body;
      await inventoryService.updateStock(organizationId, id as string, stockQuantity);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
