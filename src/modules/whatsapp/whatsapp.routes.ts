import { Router } from 'express';
import { WhatsAppController } from './whatsapp.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const whatsappController = new WhatsAppController();

// Send reminder endpoint (requires auth)
router.post('/send-reminder', authMiddleware, whatsappController.sendReminder);

// Webhook endpoint for provider (usually public, but validates a signature)
// We will leave it public for scaffolding
router.post('/webhook', whatsappController.webhook);

export default router;
