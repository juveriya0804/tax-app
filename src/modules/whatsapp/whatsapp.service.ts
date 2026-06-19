import { prisma } from '../../lib/prisma';
import { DunningLogStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

export class WhatsAppService {
  async sendInvoiceReminder(invoiceId: string, organizationId: string) {
    // 1. Fetch invoice to ensure it exists, belongs to org, and has a customer phone
    const invoice = await prisma.invoice.findFirst({
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
    const mockMessageSid = `SM_${randomUUID().replace(/-/g, '')}`;
    
    // 3. Create a DunningLog entry
    const dunningLog = await prisma.dunningLog.create({
      data: {
        invoiceId: invoice.id,
        recipientPhone: invoice.customer.phone,
        status: DunningLogStatus.QUEUED,
        messageSid: mockMessageSid,
        lastAttempted: new Date(),
        retryCount: 0,
      },
    });

    return dunningLog;
  }

  async handleWebhookUpdate(messageSid: string, rawStatus: string) {
    // Map provider status to our DunningLogStatus enum
    let status: DunningLogStatus;
    switch (rawStatus.toLowerCase()) {
      case 'sent':
        status = DunningLogStatus.SENT;
        break;
      case 'delivered':
        status = DunningLogStatus.DELIVERED;
        break;
      case 'read':
        status = DunningLogStatus.READ;
        break;
      case 'failed':
      case 'undelivered':
        status = DunningLogStatus.FAILED;
        break;
      default:
        // If status is unknown, ignore or just mark as queued
        status = DunningLogStatus.QUEUED;
    }

    const updatedLog = await prisma.dunningLog.update({
      where: { messageSid },
      data: { status },
    });

    return updatedLog;
  }
}
