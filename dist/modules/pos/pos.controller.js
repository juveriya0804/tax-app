"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosController = void 0;
const pos_service_1 = require("./pos.service");
const posService = new pos_service_1.PosService();
class PosController {
    async checkout(req, res) {
        try {
            const organizationId = req.user.organizationId;
            const { items, customerId } = req.body;
            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: 'Cart is empty' });
            }
            const invoice = await posService.checkout(organizationId, items, customerId);
            res.json({ success: true, invoice });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.PosController = PosController;
