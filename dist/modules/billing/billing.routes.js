"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const billing_controller_1 = require("./billing.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const billingController = new billing_controller_1.BillingController();
// Apply auth middleware to all billing routes to extract organizationId
router.use(auth_middleware_1.authMiddleware);
// Customer routes
router.post('/customers', billingController.createCustomer);
router.get('/customers', billingController.getCustomers);
router.put('/customers/:id', billingController.updateCustomer);
// Invoice routes
router.post('/invoices', billingController.createInvoice);
router.get('/invoices', billingController.getInvoices);
exports.default = router;
