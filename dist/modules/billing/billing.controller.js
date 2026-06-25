"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const billing_service_1 = require("./billing.service");
class BillingController {
    constructor() {
        this.billingService = new billing_service_1.BillingService();
        this.createCustomer = async (req, res, next) => {
            try {
                const { name, phone, email } = req.body;
                const organizationId = req.user.organizationId;
                const customer = await this.billingService.createCustomer({
                    name,
                    phone,
                    email,
                    organizationId,
                });
                res.status(201).json({ data: customer });
            }
            catch (error) {
                next(error);
            }
        };
        this.getCustomers = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const customers = await this.billingService.getCustomersByOrganization(organizationId);
                res.status(200).json({ data: customers });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCustomer = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { name, phone, email } = req.body;
                const organizationId = req.user.organizationId;
                await this.billingService.updateCustomer(id, organizationId, {
                    name,
                    phone,
                    email,
                });
                res.status(200).json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.createInvoice = async (req, res, next) => {
            try {
                const { invoiceNumber, amount, vatAmount, dueDate, customerId } = req.body;
                const organizationId = req.user.organizationId;
                const invoice = await this.billingService.createInvoice({
                    invoiceNumber,
                    amount,
                    vatAmount,
                    dueDate: new Date(dueDate),
                    customerId,
                    organizationId,
                });
                res.status(201).json({ data: invoice });
            }
            catch (error) {
                next(error);
            }
        };
        this.getInvoices = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const invoices = await this.billingService.getInvoicesByOrganization(organizationId);
                res.status(200).json({ data: invoices });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.BillingController = BillingController;
