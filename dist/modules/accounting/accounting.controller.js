"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingController = void 0;
const accounting_service_1 = require("./accounting.service");
class AccountingController {
    constructor() {
        this.accountingService = new accounting_service_1.AccountingService();
        this.getLedger = async (req, res, next) => {
            try {
                const organizationId = req.user.organizationId;
                const ledger = await this.accountingService.getLedger(organizationId);
                res.status(200).json({ data: ledger });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AccountingController = AccountingController;
