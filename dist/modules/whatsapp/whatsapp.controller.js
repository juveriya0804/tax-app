"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppController = void 0;
const whatsapp_service_1 = require("./whatsapp.service");
class WhatsAppController {
    constructor() {
        this.whatsappService = new whatsapp_service_1.WhatsAppService();
        this.sendReminder = async (req, res, next) => {
            try {
                const { invoiceId } = req.body;
                const organizationId = req.user.organizationId;
                const result = await this.whatsappService.sendInvoiceReminder(invoiceId, organizationId);
                res.status(200).json({
                    message: 'Reminder process started',
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.webhook = async (req, res, next) => {
            try {
                const { MessageSid, MessageStatus } = req.body;
                if (!MessageSid || !MessageStatus) {
                    res.status(400).json({ message: 'Missing required webhook payload' });
                    return;
                }
                const updatedLog = await this.whatsappService.handleWebhookUpdate(MessageSid, MessageStatus);
                res.status(200).json({ message: 'Webhook received', data: updatedLog });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.WhatsAppController = WhatsAppController;
