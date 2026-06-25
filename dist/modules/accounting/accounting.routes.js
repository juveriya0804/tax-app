"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accounting_controller_1 = require("./accounting.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const accounts_routes_1 = __importDefault(require("./accounts.routes"));
const router = (0, express_1.Router)();
const accountingController = new accounting_controller_1.AccountingController();
router.use(auth_middleware_1.authMiddleware);
router.use('/accounts', accounts_routes_1.default);
router.get('/ledger', accountingController.getLedger);
exports.default = router;
