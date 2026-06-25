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
exports.deleteQuotation = exports.updateQuotation = exports.getQuotationById = exports.getQuotations = exports.createQuotation = void 0;
const quotationsService = __importStar(require("./quotations.service"));
const createQuotation = async (req, res) => {
    try {
        const quotation = await quotationsService.createQuotation(req.user.organizationId, req.body);
        res.status(201).json(quotation);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createQuotation = createQuotation;
const getQuotations = async (req, res) => {
    try {
        const quotations = await quotationsService.getQuotations(req.user.organizationId);
        res.json(quotations);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getQuotations = getQuotations;
const getQuotationById = async (req, res) => {
    try {
        const quotation = await quotationsService.getQuotationById(req.user.organizationId, req.params.id);
        if (!quotation) {
            return res.status(404).json({ error: 'Quotation not found' });
        }
        res.json(quotation);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getQuotationById = getQuotationById;
const updateQuotation = async (req, res) => {
    try {
        const quotation = await quotationsService.updateQuotation(req.user.organizationId, req.params.id, req.body);
        res.json(quotation);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateQuotation = updateQuotation;
const deleteQuotation = async (req, res) => {
    try {
        await quotationsService.deleteQuotation(req.user.organizationId, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteQuotation = deleteQuotation;
