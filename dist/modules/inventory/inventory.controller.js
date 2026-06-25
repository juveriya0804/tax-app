"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const inventory_service_1 = require("./inventory.service");
const inventoryService = new inventory_service_1.InventoryService();
class InventoryController {
    async getProducts(req, res) {
        try {
            const organizationId = req.user.organizationId;
            const products = await inventoryService.getProducts(organizationId);
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createProduct(req, res) {
        try {
            const organizationId = req.user.organizationId;
            const product = await inventoryService.createProduct(organizationId, req.body);
            res.status(201).json(product);
        }
        catch (error) {
            if (error.code === 'P2002' || (error.message && error.message.includes('Unique constraint failed'))) {
                return res.status(400).json({ error: 'A product with this SKU already exists.' });
            }
            res.status(400).json({ error: error.message });
        }
    }
    async updateStock(req, res) {
        try {
            const organizationId = req.user.organizationId;
            const { id } = req.params;
            const { stockQuantity } = req.body;
            await inventoryService.updateStock(organizationId, id, stockQuantity);
            res.json({ success: true });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.InventoryController = InventoryController;
