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
exports.updateVendorLead = exports.createVendorLead = exports.getVendorLeads = exports.deleteVendor = exports.updateVendor = exports.createVendor = exports.getVendorById = exports.getVendors = void 0;
const vendorsService = __importStar(require("./vendors.service"));
const getVendors = async (req, res) => {
    try {
        const vendors = await vendorsService.getVendors(req.user.organizationId);
        res.json(vendors);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getVendors = getVendors;
const getVendorById = async (req, res) => {
    try {
        const vendor = await vendorsService.getVendorById(req.user.organizationId, req.params.id);
        if (!vendor)
            return res.status(404).json({ error: 'Vendor not found' });
        res.json(vendor);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getVendorById = getVendorById;
const createVendor = async (req, res) => {
    try {
        const vendor = await vendorsService.createVendor(req.user.organizationId, req.body);
        res.status(201).json(vendor);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createVendor = createVendor;
const updateVendor = async (req, res) => {
    try {
        await vendorsService.updateVendor(req.user.organizationId, req.params.id, req.body);
        const vendor = await vendorsService.getVendorById(req.user.organizationId, req.params.id);
        res.json(vendor);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateVendor = updateVendor;
const deleteVendor = async (req, res) => {
    try {
        await vendorsService.deleteVendor(req.user.organizationId, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteVendor = deleteVendor;
const getVendorLeads = async (req, res) => {
    try {
        const leads = await vendorsService.getVendorLeads(req.user.organizationId);
        res.json({ data: leads });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getVendorLeads = getVendorLeads;
const createVendorLead = async (req, res) => {
    try {
        const lead = await vendorsService.createVendorLead(req.user.organizationId, req.body);
        res.status(201).json({ data: lead });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createVendorLead = createVendorLead;
const updateVendorLead = async (req, res) => {
    try {
        await vendorsService.updateVendorLead(req.user.organizationId, req.params.id, req.body);
        res.json({ success: true });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateVendorLead = updateVendorLead;
