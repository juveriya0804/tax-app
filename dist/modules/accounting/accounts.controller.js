"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAccount = exports.createAccount = exports.getAccountById = exports.getAccounts = void 0;
const accountsService = __importStar(require("./accounts.service"));
const getAccounts = async (req, res) => {
    try {
        const accounts = await accountsService.getAccounts(req.user.organizationId);
        res.json(accounts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAccounts = getAccounts;
const getAccountById = async (req, res) => {
    try {
        const account = await accountsService.getAccountById(req.user.organizationId, req.params.id);
        if (!account)
            return res.status(404).json({ error: 'Account not found' });
        res.json(account);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAccountById = getAccountById;
const createAccount = async (req, res) => {
    try {
        const account = await accountsService.createAccount(req.user.organizationId, req.body);
        res.status(201).json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createAccount = createAccount;
const updateAccount = async (req, res) => {
    try {
        await accountsService.updateAccount(req.user.organizationId, req.params.id, req.body);
        const account = await accountsService.getAccountById(req.user.organizationId, req.params.id);
        res.json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateAccount = updateAccount;
const deleteAccount = async (req, res) => {
    try {
        await accountsService.deleteAccount(req.user.organizationId, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteAccount = deleteAccount;
