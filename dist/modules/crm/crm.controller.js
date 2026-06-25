"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmController = void 0;
const crm_service_1 = require("./crm.service");
class CrmController {
    constructor() {
        this.crmService = new crm_service_1.CrmService();
        this.getLeads = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const leads = await this.crmService.getLeads(organizationId);
                res.status(200).json({ data: leads });
            }
            catch (error) {
                next(error);
            }
        };
        this.createLead = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const { name, email, phone, status } = req.body;
                const lead = await this.crmService.createLead(organizationId, {
                    name, email, phone, status
                });
                res.status(201).json({ data: lead, message: 'Lead created successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateLeadStatus = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const { leadId } = req.params;
                const { status } = req.body;
                await this.crmService.updateLeadStatus(organizationId, leadId, status);
                res.status(200).json({ message: 'Lead status updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CrmController = CrmController;
