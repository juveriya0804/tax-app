"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const whatsapp_controller_1 = require("./whatsapp.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const whatsappController = new whatsapp_controller_1.WhatsAppController();
// Send reminder endpoint (requires auth)
router.post('/send-reminder', auth_middleware_1.authMiddleware, whatsappController.sendReminder);
// Webhook endpoint for provider (usually public, but validates a signature)
// We will leave it public for scaffolding
router.post('/webhook', whatsappController.webhook);
exports.default = router;
