"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const billing_routes_1 = __importDefault(require("./modules/billing/billing.routes"));
const whatsapp_routes_1 = __importDefault(require("./modules/whatsapp/whatsapp.routes"));
const reports_routes_1 = __importDefault(require("./modules/reports/reports.routes"));
const inventory_routes_1 = __importDefault(require("./modules/inventory/inventory.routes"));
const pos_routes_1 = __importDefault(require("./modules/pos/pos.routes"));
const organization_routes_1 = __importDefault(require("./modules/organization/organization.routes"));
const expenses_routes_1 = __importDefault(require("./modules/expenses/expenses.routes"));
const crm_routes_1 = __importDefault(require("./modules/crm/crm.routes"));
const accounting_routes_1 = __importDefault(require("./modules/accounting/accounting.routes"));
const quotations_routes_1 = __importDefault(require("./modules/quotations/quotations.routes"));
const vendors_routes_1 = __importDefault(require("./modules/vendors/vendors.routes"));
const delivery_challans_routes_1 = __importDefault(require("./modules/delivery-challans/delivery-challans.routes"));
const credit_notes_routes_1 = __importDefault(require("./modules/credit-notes/credit-notes.routes"));
const app = (0, express_1.default)();
// Global Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/billing', billing_routes_1.default);
app.use('/api/whatsapp', whatsapp_routes_1.default);
app.use('/api/reports', reports_routes_1.default);
app.use('/api/inventory', inventory_routes_1.default);
app.use('/api/pos', pos_routes_1.default);
app.use('/api/organization', organization_routes_1.default);
app.use('/api/expenses', expenses_routes_1.default);
app.use('/api/crm', crm_routes_1.default);
app.use('/api/accounting', accounting_routes_1.default);
app.use('/api/quotations', quotations_routes_1.default);
app.use('/api/vendors', vendors_routes_1.default);
app.use('/api/delivery-challans', delivery_challans_routes_1.default);
app.use('/api/credit-notes', credit_notes_routes_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});
exports.default = app;
