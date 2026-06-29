"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const organization_service_1 = require("./organization.service");
class OrganizationController {
    constructor() {
        this.organizationService = new organization_service_1.OrganizationService();
        this.getProfile = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const profile = await this.organizationService.getOrganization(organizationId);
                if (!profile) {
                    return res.status(404).json({ message: 'Organization not found' });
                }
                res.status(200).json({ data: profile });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProfile = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const { companyName, trn, jurisdiction, vatPercentage, logoUrl } = req.body;
                const updated = await this.organizationService.updateOrganization(organizationId, {
                    companyName,
                    trn,
                    jurisdiction,
                    vatPercentage: vatPercentage !== undefined ? Number(vatPercentage) : undefined,
                    logoUrl,
                });
                res.status(200).json({ data: updated, message: 'Organization profile updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.OrganizationController = OrganizationController;
