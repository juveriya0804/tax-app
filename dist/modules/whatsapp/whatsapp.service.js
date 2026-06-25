"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppService = void 0;
const prisma_1 = require("../../lib/prisma");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
class WhatsAppService {
    async sendInvoiceReminder(invoiceId, organizationId) {
        // 1. Fetch invoice to ensure it exists, belongs to org, and has a customer phone
        const invoice = await prisma_1.prisma.invoice.findFirst({
            where: {
                id: invoiceId,
                organizationId: organizationId,
            },
            include: {
                customer: true,
            },
        });
        if (!invoice) {
            throw Object.assign(new Error('Invoice not found or unauthorized'), { status: 404 });
        }
        if (!invoice.customer || !invoice.customer.phone) {
            throw Object.assign(new Error('Customer does not exist or does not have a phone number'), { status: 400 });
        }
        // 2. Mock external API call to WhatsApp provider (e.g. Twilio)
        console.log(`[WhatsApp Provider] Sending message to ${invoice.customer.phone} for invoice ${invoice.invoiceNumber}`);
        // Simulate a response ID from the provider
        const mockMessageSid = `SM_${(0, crypto_1.randomUUID)().replace(/-/g, '')}`;
        // 3. Create a DunningLog entry
        const dunningLog = await prisma_1.prisma.dunningLog.create({
            data: {
                invoiceId: invoice.id,
                recipientPhone: invoice.customer.phone,
                status: client_1.DunningLogStatus.QUEUED,
                messageSid: mockMessageSid,
                lastAttempted: new Date(),
                retryCount: 0,
            },
        });
        return dunningLog;
    }
    async handleWebhookUpdate(messageSid, rawStatus) {
        // Map provider status to our DunningLogStatus enum
        let status;
        switch (rawStatus.toLowerCase()) {
            case 'sent':
                status = client_1.DunningLogStatus.SENT;
                break;
            case 'delivered':
                status = client_1.DunningLogStatus.DELIVERED;
                break;
            case 'read':
                status = client_1.DunningLogStatus.READ;
                break;
            case 'failed':
            case 'undelivered':
                status = client_1.DunningLogStatus.FAILED;
                break;
            default:
                // If status is unknown, ignore or just mark as queued
                status = client_1.DunningLogStatus.QUEUED;
        }
        const updatedLog = await prisma_1.prisma.dunningLog.update({
            where: { messageSid },
            data: { status },
        });
        return updatedLog;
    }
}
exports.WhatsAppService = WhatsAppService;
