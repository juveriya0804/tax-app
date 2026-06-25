"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const reports_service_1 = require("./reports.service");
const reportsService = new reports_service_1.ReportsService();
class ReportsController {
    async getDashboardStats(req, res) {
        try {
            const organizationId = req.user?.organizationId;
            if (!organizationId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const stats = await reportsService.getDashboardStats(organizationId);
            res.status(200).json({ status: 'success', data: stats });
        }
        catch (error) {
            console.error('[ReportsController] getDashboardStats error:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
        }
    }
    async getRevenueTrends(req, res) {
        try {
            const organizationId = req.user?.organizationId;
            if (!organizationId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const trends = await reportsService.getRevenueTrends(organizationId);
            res.status(200).json({ status: 'success', data: trends });
        }
        catch (error) {
            console.error('[ReportsController] getRevenueTrends error:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
        }
    }
    async getVatBreakdown(req, res) {
        try {
            const organizationId = req.user?.organizationId;
            if (!organizationId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const breakdown = await reportsService.getVatBreakdown(organizationId);
            res.status(200).json({ status: 'success', data: breakdown });
        }
        catch (error) {
            console.error('[ReportsController] getVatBreakdown error:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
        }
    }
    async getCustomerGrowth(req, res) {
        try {
            const organizationId = req.user?.organizationId;
            if (!organizationId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const growth = await reportsService.getCustomerGrowth(organizationId);
            res.status(200).json({ status: 'success', data: growth });
        }
        catch (error) {
            console.error('[ReportsController] getCustomerGrowth error:', error);
            res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
        }
    }
}
exports.ReportsController = ReportsController;
